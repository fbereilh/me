import { existsSync, readdirSync, readFileSync } from 'node:fs';
import { join } from 'node:path';
import { parse as parseHtml } from 'node-html-parser';
import { parse as parseYaml } from 'yaml';

/**
 * Where post files live on disk, which notebooks count as published, and how a notebook's
 * frontmatter is read.
 *
 * Plain JavaScript on purpose: `src/lib/posts.ts` imports it as part of the SvelteKit app,
 * and `scripts/check-prerender.mjs` imports it as a bare node script after the build. The
 * build guard has to check exactly the set of posts the site ships and read frontmatter the
 * same way the site does, so both read it here rather than each spelling out the rules.
 */

/**
 * Raw YAML frontmatter of a post notebook, before normalisation.
 * @typedef {{ title?: unknown, description?: unknown, date?: unknown, categories?: unknown, author?: unknown }} Frontmatter
 */

const NOTEBOOK_DIR = 'nbs';
const RENDERED_DIR = join('static', 'posts');

/**
 * The source notebook for a post.
 * @param {string} slug
 * @param {string} [cwd]
 * @returns {string}
 */
export function notebookPath(slug, cwd = process.cwd()) {
	return join(cwd, NOTEBOOK_DIR, `${slug}.ipynb`);
}

/**
 * Where Quarto's rendered HTML for a post lives.
 * @param {string} slug
 * @param {string} [cwd]
 * @returns {string}
 */
export function renderedPostPath(slug, cwd = process.cwd()) {
	return join(cwd, RENDERED_DIR, `${slug}.html`);
}

/**
 * The template every new post is seeded from.
 * @param {string} [cwd]
 * @returns {string}
 */
export function templatePath(cwd = process.cwd()) {
	return join(cwd, NOTEBOOK_DIR, '_template.ipynb');
}

/**
 * Pull the YAML frontmatter out of a notebook.
 *
 * The frontmatter lives in cell 0 as a `---` fenced block. Quarto accepts it in either a
 * markdown or a raw cell, so we accept both, and a leading `#| echo: false` code cell may
 * precede it. Only that first prose cell is a candidate: body prose is markdown too, so
 * scanning onward would let a `---` fenced thematic break deep in the post be read as
 * frontmatter and publish a titleless, dateless page instead of failing.
 * @param {string} notebookSource
 * @returns {Frontmatter | null}
 */
export function parseNotebookFrontmatter(notebookSource) {
	/** @type {{ cells?: Array<{ cell_type?: string, source?: string | string[] }> }} */
	let notebook;
	try {
		notebook = JSON.parse(notebookSource);
	} catch {
		return null;
	}

	const cell = (notebook.cells ?? []).find(
		({ cell_type }) => cell_type === 'raw' || cell_type === 'markdown'
	);
	if (!cell) return null;

	const source = Array.isArray(cell.source) ? cell.source.join('') : (cell.source ?? '');
	const match = source.match(/^\s*---\r?\n([\s\S]*?)\r?\n---\s*$/);
	if (!match) return null;

	try {
		const parsed = parseYaml(match[1]);
		return parsed && typeof parsed === 'object' ? parsed : null;
	} catch {
		return null;
	}
}

const ISO_DATE_ONLY = /^\d{4}-\d{2}-\d{2}$/;
const HAS_EXPLICIT_ZONE = /(?:Z|[+-]\d{2}:?\d{2})$/i;

/**
 * The calendar day a `Date` falls on, read in UTC or in the build machine's zone.
 * @param {Date} date
 * @param {boolean} inUtc
 * @returns {string}
 */
function calendarDay(date, inUtc) {
	const year = inUtc ? date.getUTCFullYear() : date.getFullYear();
	const month = inUtc ? date.getUTCMonth() : date.getMonth();
	const day = inUtc ? date.getUTCDate() : date.getDate();
	return new Date(Date.UTC(year, month, day)).toISOString().slice(0, 10);
}

/**
 * Normalise a frontmatter `date` to ISO `YYYY-MM-DD`, or `''` when unusable.
 *
 * A frontmatter date is a calendar day, not an instant, so it must normalise to the same
 * day on every build machine. `YYYY-MM-DD` passes straight through. Anything carrying an
 * explicit UTC offset is read in UTC; anything else (`February 10, 2026`, `02/10/2026`)
 * is parsed by the engine as local time, so its day is read locally too - reading it in
 * UTC would shift it a day backwards in every zone east of Greenwich.
 * @param {unknown} value
 * @returns {string}
 */
export function normaliseDate(value) {
	if (value instanceof Date) {
		return Number.isNaN(value.getTime()) ? '' : calendarDay(value, true);
	}
	if (typeof value !== 'string' && typeof value !== 'number') return '';
	const raw = String(value).trim();
	if (!raw) return '';
	const parsed = new Date(raw);
	if (Number.isNaN(parsed.getTime())) return '';
	// A date-only ISO string parses as UTC, so a roundtrip that comes back unchanged proves
	// the day exists - `2026-02-31` silently rolls forward instead of failing to parse.
	if (ISO_DATE_ONLY.test(raw)) return calendarDay(parsed, true) === raw ? raw : '';
	return calendarDay(parsed, HAS_EXPLICIT_ZONE.test(raw));
}

/**
 * Fold a metadata string to the form both sides of a staleness comparison can agree on.
 *
 * Frontmatter is YAML source; the rendered `<head>` is what pandoc made of it. Pandoc's `smart`
 * extension rewrites quotes, dashes and ellipses, and it reads the value as markdown, so a
 * backticked word arrives as bare prose. Folding is applied to BOTH sides so those rewrites
 * cancel out and only a genuinely stale render is left: a guard that fails on a perfectly good
 * post is worse than no guard, because the next author simply deletes it.
 * @param {unknown} value
 * @returns {string}
 */
export function comparableMetadata(value) {
	return String(value ?? '')
		.replace(/[‘’‚‛′]/g, "'")
		.replace(/[“”„‟″]/g, '"')
		.replace(/[‒–—―−]/g, '-')
		.replace(/-+/g, '-')
		.replace(/…/g, '...')
		.replace(/[`*_]/g, '')
		.replace(/\s+/g, ' ')
		.trim();
}

/**
 * A metadata field whose notebook value and rendered value disagree.
 * @typedef {{ field: string, notebook: string, rendered: string }} MetadataDrift
 */

/**
 * Metadata the notebook and its committed rendered HTML disagree on.
 *
 * A post's metadata comes from its notebook frontmatter and its body from the committed
 * `static/posts/<slug>.html`, so the two can drift apart: edit the frontmatter without
 * re-rendering and the site prerenders a fresh title over a stale body.
 *
 * Only the metadata Quarto writes into its own `<head>` is compared - title, date and
 * description. The rendered body is deliberately not checked: it carries cell ids and
 * execution artefacts that churn on every render for reasons an author cannot act on.
 * @param {string} notebookSource
 * @param {string} renderedHtml
 * @returns {MetadataDrift[]}
 */
export function metadataDrift(notebookSource, renderedHtml) {
	const frontmatter = parseNotebookFrontmatter(notebookSource);
	// Read the head through the parser rather than by regex: it decodes the HTML entities
	// Quarto escapes an apostrophe or an ampersand into.
	const rendered = parseHtml(renderedHtml);
	/** @type {MetadataDrift[]} */
	const drift = [];

	/**
	 * @param {string} selector
	 * @param {string} [attribute]
	 * @returns {string}
	 */
	const head = (selector, attribute) =>
		(attribute
			? rendered.querySelector(selector)?.getAttribute(attribute)
			: rendered.querySelector(selector)?.textContent
		)?.trim() ?? '';

	/**
	 * @param {string} field
	 * @param {string} notebook
	 * @param {string} renderedValue
	 * @param {(value: string) => string} fold
	 */
	const compare = (field, notebook, renderedValue, fold) => {
		if (fold(notebook) !== fold(renderedValue))
			drift.push({ field, notebook, rendered: renderedValue });
	};

	/** @param {unknown} value */
	const text = (value) => (typeof value === 'string' ? value.trim() : '');

	if (frontmatter?.title !== undefined) {
		compare('title', text(frontmatter.title), head('title'), comparableMetadata);
	}
	compare(
		'date',
		normaliseDate(frontmatter?.date),
		normaliseDate(head('meta[name="dcterms.date"]', 'content')),
		(value) => value
	);
	compare(
		'description',
		text(frontmatter?.description),
		head('meta[name="description"]', 'content'),
		comparableMetadata
	);

	return drift;
}

/**
 * The placeholder description `scripts/new_post.py` seeds a new notebook with, or `''` when
 * the template is missing or carries no description.
 *
 * Read from the template rather than pinned anywhere, so it cannot drift: a post that still
 * carries this exact blurb never had its own written, and the build guard rejects it.
 * @param {string} [cwd]
 * @returns {string}
 */
export function placeholderDescription(cwd = process.cwd()) {
	const path = templatePath(cwd);
	if (!existsSync(path)) return '';
	const description = parseNotebookFrontmatter(readFileSync(path, 'utf-8'))?.description;
	return typeof description === 'string' ? description.trim() : '';
}

/**
 * Slugs of every published post, in directory order.
 *
 * A notebook is published once Quarto has rendered it into `static/posts/`; unrendered
 * drafts are skipped so the index, sitemap and RSS can never link to a 404. `_`-prefixed
 * notebooks (e.g. `_template.ipynb`) are ignored by Quarto and by us, as are dotfiles.
 * @param {string} [cwd]
 * @returns {string[]}
 */
export function publishedSlugs(cwd = process.cwd()) {
	const notebookDir = join(cwd, NOTEBOOK_DIR);
	if (!existsSync(notebookDir)) return [];

	return readdirSync(notebookDir)
		.filter((file) => file.endsWith('.ipynb') && !file.startsWith('_') && !file.startsWith('.'))
		.map((file) => file.slice(0, -'.ipynb'.length))
		.filter((slug) => existsSync(renderedPostPath(slug, cwd)));
}
