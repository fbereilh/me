import { existsSync, readdirSync, readFileSync } from 'node:fs';
import { join } from 'node:path';
import { parse as parseYaml } from 'yaml';

/**
 * The single source of truth for blog post metadata.
 *
 * Posts are Quarto notebooks in `nbs/`. Cell 0 of every notebook is a frontmatter
 * cell (see `AGENTS.md`) holding the YAML that Quarto reads. We parse that same YAML
 * here so the SvelteKit site and the rendered HTML can never disagree about a post's
 * title, date or categories.
 */
export interface Post {
	slug: string;
	title: string;
	description: string;
	/** ISO `YYYY-MM-DD`. Empty when the notebook has no usable date. Sort on this. */
	date: string;
	/** Human readable form of `date`, e.g. `February 10, 2026`. */
	displayDate: string;
	categories: string[];
	author: string;
}

/** Raw YAML frontmatter of a post notebook, before normalisation. */
interface Frontmatter {
	title?: unknown;
	description?: unknown;
	date?: unknown;
	categories?: unknown;
	author?: unknown;
}

const NOTEBOOK_DIR = 'nbs';
const RENDERED_DIR = join('static', 'posts');
const UNKNOWN_DATE = 'Unknown date';

const dateFormatter = new Intl.DateTimeFormat('en-US', {
	year: 'numeric',
	month: 'long',
	day: 'numeric',
	timeZone: 'UTC'
});

/**
 * Pull the YAML frontmatter out of a notebook.
 *
 * The frontmatter lives in cell 0 as a `---` fenced block. Quarto accepts it in either a
 * markdown or a raw cell, so we accept both. Only the first fenced cell is considered,
 * which is what stops a `categories:` line inside a code cell from leaking in.
 */
export function parseNotebookFrontmatter(notebookSource: string): Frontmatter | null {
	let notebook: { cells?: Array<{ cell_type?: string; source?: string | string[] }> };
	try {
		notebook = JSON.parse(notebookSource);
	} catch {
		return null;
	}

	for (const cell of notebook.cells ?? []) {
		if (cell.cell_type !== 'raw' && cell.cell_type !== 'markdown') continue;

		const source = Array.isArray(cell.source) ? cell.source.join('') : (cell.source ?? '');
		const match = source.match(/^\s*---\r?\n([\s\S]*?)\r?\n---\s*$/);
		if (!match) continue;

		try {
			const parsed = parseYaml(match[1]);
			return parsed && typeof parsed === 'object' ? (parsed as Frontmatter) : null;
		} catch {
			return null;
		}
	}
	return null;
}

/** Normalise a frontmatter `date` to ISO `YYYY-MM-DD`, or `''` when unusable. */
function normaliseDate(value: unknown): string {
	if (value instanceof Date) return value.toISOString().slice(0, 10);
	if (typeof value !== 'string' && typeof value !== 'number') return '';
	const raw = String(value).trim();
	if (!raw) return '';
	const parsed = new Date(raw);
	if (Number.isNaN(parsed.getTime())) return '';
	return parsed.toISOString().slice(0, 10);
}

function normaliseCategories(value: unknown): string[] {
	if (Array.isArray(value)) {
		return value.map((c) => String(c).trim()).filter(Boolean);
	}
	if (typeof value === 'string' && value.trim()) return [value.trim()];
	return [];
}

/** Build a `Post` from a slug and its parsed frontmatter. */
export function toPost(slug: string, frontmatter: Frontmatter | null): Post {
	const date = normaliseDate(frontmatter?.date);
	return {
		slug,
		title: typeof frontmatter?.title === 'string' ? frontmatter.title : slug,
		description: typeof frontmatter?.description === 'string' ? frontmatter.description : '',
		date,
		displayDate: date ? dateFormatter.format(new Date(`${date}T00:00:00Z`)) : UNKNOWN_DATE,
		categories: normaliseCategories(frontmatter?.categories),
		author: typeof frontmatter?.author === 'string' ? frontmatter.author : ''
	};
}

/** Newest first. Posts with no usable date sort last, in stable slug order. */
export function sortPosts(posts: Post[]): Post[] {
	return [...posts].sort((a, b) => {
		if (a.date && b.date) return b.date.localeCompare(a.date) || a.slug.localeCompare(b.slug);
		if (a.date) return -1;
		if (b.date) return 1;
		return a.slug.localeCompare(b.slug);
	});
}

/**
 * Every published post, newest first.
 *
 * A notebook is published once Quarto has rendered it into `static/posts/`; unrendered
 * drafts are skipped so the index, sitemap and RSS can never link to a 404.
 * `_`-prefixed notebooks (e.g. `_template.ipynb`) are ignored by Quarto and by us.
 */
export function getPosts(cwd: string = process.cwd()): Post[] {
	const notebookDir = join(cwd, NOTEBOOK_DIR);
	if (!existsSync(notebookDir)) return [];

	const posts = readdirSync(notebookDir)
		.filter((file) => file.endsWith('.ipynb') && !file.startsWith('_') && !file.startsWith('.'))
		.map((file) => file.slice(0, -'.ipynb'.length))
		.filter((slug) => existsSync(join(cwd, RENDERED_DIR, `${slug}.html`)))
		.map((slug) =>
			toPost(
				slug,
				parseNotebookFrontmatter(readFileSync(join(notebookDir, `${slug}.ipynb`), 'utf-8'))
			)
		);

	return sortPosts(posts);
}

export function getPost(slug: string, cwd: string = process.cwd()): Post | undefined {
	return getPosts(cwd).find((post) => post.slug === slug);
}
