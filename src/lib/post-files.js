import { existsSync, readdirSync, readFileSync } from 'node:fs';
import { join } from 'node:path';
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
