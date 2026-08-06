import { existsSync, readdirSync } from 'node:fs';
import { join } from 'node:path';

/**
 * Where post files live on disk, and which notebooks count as published.
 *
 * Plain JavaScript on purpose: `src/lib/posts.ts` imports it as part of the SvelteKit app,
 * and `scripts/check-prerender.mjs` imports it as a bare node script after the build. The
 * build guard has to check exactly the set of posts the site ships, so both read it here
 * rather than each spelling out the directory layout.
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
