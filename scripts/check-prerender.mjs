#!/usr/bin/env node
/**
 * Post-build guard: every published post must ship as a complete static page.
 *
 * The blog used to fetch and inject post HTML in the browser, so what crawlers and
 * link unfurlers actually received was an empty shell. This check fails the build if
 * that ever comes back. On top of that it asserts what a post is only worth shipping
 * with: its own title, canonical and description (never the template's placeholder), a
 * non-empty body, a highlighting stylesheet that is really on disk whenever it ships source
 * listings, frontmatter
 * still in sync with the committed rendered HTML, no cell-output script whose library never
 * comes across, an entry in the sitemap and the RSS feed, and a server manifest that can
 * still render a 404.
 *
 * Usage: node scripts/check-prerender.mjs   (after `npm run build`)
 */
import { readFileSync, existsSync } from 'node:fs';
import { join } from 'node:path';
import { pathToFileURL } from 'node:url';
import { parse } from 'node-html-parser';
import {
	metadataDrift,
	notebookPath,
	placeholderDescription,
	publishedSlugs,
	renderedPostPath
} from '../src/lib/post-files.js';

const PRERENDERED = join(process.cwd(), 'build', 'prerendered');
const SERVER_MANIFEST = join(process.cwd(), 'build', 'server', 'manifest.js');
const CLIENT = join(process.cwd(), 'build', 'client');
const STATIC = join(process.cwd(), 'static');
const failures = [];

/**
 * `src/lib/site.ts` owns the canonical origin. This script is plain node run after the
 * build, so it cannot resolve the `$lib` alias - read the one constant out of the source
 * instead of pinning a second copy of the domain here.
 */
function siteUrl() {
	const source = readFileSync(join(process.cwd(), 'src', 'lib', 'site.ts'), 'utf-8');
	const match = source.match(/export const SITE_URL\s*=\s*['"]([^'"]+)['"]/);
	if (!match) {
		console.error('Could not read SITE_URL from src/lib/site.ts.');
		process.exit(1);
	}
	return match[1].replace(/\/$/, '');
}

const SITE_URL = siteUrl();

function check(condition, message) {
	if (!condition) failures.push(message);
}

if (!existsSync(PRERENDERED)) {
	console.error(`No prerendered output at ${PRERENDERED}. Run "npm run build" first.`);
	process.exit(1);
}

const slugs = publishedSlugs();

check(slugs.length > 0, 'No published posts found in nbs/ - expected at least one.');

/**
 * Fail on metadata the notebook and its committed rendered HTML disagree on: an edited
 * frontmatter that was never re-rendered prerenders a fresh title over a stale body.
 * `metadataDrift` owns which fields are compared and how they are folded first.
 */
function checkMetadataInSync(slug) {
	const drift = metadataDrift(
		readFileSync(notebookPath(slug), 'utf-8'),
		readFileSync(renderedPostPath(slug), 'utf-8')
	);
	for (const { field, notebook, rendered } of drift) {
		failures.push(
			`${slug}: notebook ${field} is "${notebook}" but static/posts/${slug}.html was rendered with "${rendered}" - run "quarto render" and commit the result`
		);
	}
}

/**
 * Whether a site-absolute asset URL out of a prerendered page resolves to a real file.
 *
 * The build copies `static/` into `build/client/`, so either location counts. Anything not
 * site-absolute is external and not ours to vouch for.
 */
function assetIsOnDisk(href) {
	const [path] = href.split(/[?#]/);
	if (!path.startsWith('/')) return true;
	const segments = decodeURI(path).split('/').filter(Boolean);
	return existsSync(join(CLIENT, ...segments)) || existsSync(join(STATIC, ...segments));
}

/**
 * The blurb `scripts/new_post.py` seeds a new notebook with, read from the template itself
 * so it cannot drift. A post still carrying it never had its own written, and it would ship
 * as the page description, the blog-index card and the RSS item.
 */
const PLACEHOLDER_DESCRIPTION = placeholderDescription();

for (const slug of slugs) {
	const page = join(PRERENDERED, 'blog', `${slug}.html`);
	if (!existsSync(page)) {
		failures.push(`${slug}: not prerendered (${page} is missing)`);
		continue;
	}

	const html = readFileSync(page, 'utf-8');
	// Read the head through the parser, not by regex: attribute values are HTML-escaped, and
	// a description is only comparable to the template's once the entities are decoded back.
	const document = parse(html);
	const title = document.querySelector('title')?.textContent.trim();
	const canonical = document.querySelector('link[rel="canonical"]')?.getAttribute('href');
	const description = document
		.querySelector('meta[name="description"]')
		?.getAttribute('content')
		?.trim();

	check(Boolean(title), `${slug}: prerendered page has no <title>`);
	check(
		Boolean(description),
		`${slug}: prerendered page ships no description - write a real one in the notebook frontmatter`
	);
	check(
		!PLACEHOLDER_DESCRIPTION || description !== PLACEHOLDER_DESCRIPTION,
		`${slug}: still ships the template's placeholder description - write a real one in the notebook frontmatter`
	);
	check(
		canonical === `${SITE_URL}/blog/${slug}`,
		`${slug}: canonical is "${canonical}", expected the post's own URL`
	);
	check(!html.includes('>Loading...<'), `${slug}: prerendered page still ships a loading shell`);

	const body = document.querySelector('.post-content');
	check(Boolean(body), `${slug}: prerendered page has no .post-content element`);
	check(
		Boolean(body?.textContent.trim()),
		`${slug}: prerendered page ships an empty .post-content`
	);

	// `extractPost` picks Quarto's highlighting stylesheet out of the rendered page by name.
	// If a Quarto upgrade renames that asset the match quietly yields nothing, so a post full
	// of code would ship uncoloured with the build still green. Pair the two here instead.
	const stylesheets = document
		.querySelectorAll('link[rel="stylesheet"]')
		.map((node) => node.getAttribute('href') ?? '')
		.filter((href) => href.includes('syntax-highlighting'));
	check(
		!body?.querySelector('div.sourceCode') || stylesheets.length > 0,
		`${slug}: ships source listings but no syntax-highlighting stylesheet - check the asset name extractPost matches in src/lib/post-html.ts against what Quarto now emits`
	);
	// A link to a stylesheet that is not on disk leaves the code just as uncoloured as no link
	// at all, so the reference has to resolve too - Quarto fingerprints that filename, and a
	// re-render that was not committed alongside the page leaves it dangling.
	for (const href of stylesheets) {
		check(
			assetIsOnDisk(href),
			`${slug}: links the syntax-highlighting stylesheet "${href}", but no such file ships under static/posts/ - commit the "_files" directory "quarto render" wrote alongside the page`
		);
	}

	// `extractPost` keeps a script that belongs to a cell output, but carries no `<head>`
	// scripts across, so the library it calls into is not on the page. Rather than shipping an
	// empty figure container with a green build, stop here and make it a deliberate decision.
	check(
		!body?.querySelector('script'),
		`${slug}: ships a cell-output script, but extractPost carries no library bundle from Quarto's <head> - an interactive figure (plotly, altair, bokeh, ipywidgets) would render as an empty container. Teach src/lib/post-html.ts to carry that post's head scripts across, or publish the figure as a static image`
	);

	checkMetadataInSync(slug);
}

for (const file of ['sitemap.xml', 'rss.xml']) {
	const path = join(PRERENDERED, file);
	if (!existsSync(path)) {
		failures.push(`${file}: not prerendered`);
		continue;
	}
	const xml = readFileSync(path, 'utf-8');
	for (const slug of slugs) {
		check(xml.includes(`/blog/${slug}`), `${file}: missing /blog/${slug}`);
	}
}

/**
 * The server manifest must still carry route nodes.
 *
 * Prerendering every route leaves adapter-node with an empty manifest, and an unmatched URL
 * then crashes on `manifest._.nodes[0]` instead of rendering `+error.svelte`. The one
 * server-rendered catch-all route is what keeps the layout and error nodes in there.
 */
const CATCHALL_CAUSE =
	'server manifest carries no route nodes - adapter-node will crash on any unmatched URL ' +
	'instead of rendering +error.svelte. Keep src/routes/[...catchall]/+page.ts and its ' +
	'"export const prerender = false", and declare prerender per route, never on the root layout.';

if (!existsSync(SERVER_MANIFEST)) {
	failures.push(`${SERVER_MANIFEST} is missing - ${CATCHALL_CAUSE}`);
} else {
	const { manifest } = await import(pathToFileURL(SERVER_MANIFEST).href);
	check(manifest?._?.nodes?.length > 0, CATCHALL_CAUSE);
	check(manifest?._?.routes?.length > 0, `No server-rendered routes: ${CATCHALL_CAUSE}`);
}

if (failures.length > 0) {
	console.error('Prerender check failed:');
	for (const failure of failures) console.error(`  - ${failure}`);
	process.exit(1);
}

console.log(`Prerender check passed for ${slugs.length} post(s).`);
