#!/usr/bin/env node
/**
 * Post-build guard: every published post must ship as a complete static page.
 *
 * The blog used to fetch and inject post HTML in the browser, so what crawlers and
 * link unfurlers actually received was an empty shell. This check fails the build if
 * that ever comes back.
 *
 * Usage: node scripts/check-prerender.mjs   (after `npm run build`)
 */
import { readFileSync, existsSync } from 'node:fs';
import { join } from 'node:path';
import { pathToFileURL } from 'node:url';
import { parse } from 'node-html-parser';
import { placeholderDescription, publishedSlugs } from '../src/lib/post-files.js';

const PRERENDERED = join(process.cwd(), 'build', 'prerendered');
const SERVER_MANIFEST = join(process.cwd(), 'build', 'server', 'manifest.js');
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
	const highlighted = document
		.querySelectorAll('link[rel="stylesheet"]')
		.some((node) => (node.getAttribute('href') ?? '').includes('syntax-highlighting'));
	check(
		!body?.querySelector('div.sourceCode') || highlighted,
		`${slug}: ships source listings but no syntax-highlighting stylesheet - check the asset name extractPost matches in src/lib/post-html.ts against what Quarto now emits`
	);
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
