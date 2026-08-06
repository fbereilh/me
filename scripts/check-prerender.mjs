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
import { readFileSync, readdirSync, existsSync } from 'node:fs';
import { join } from 'node:path';
import { parse } from 'node-html-parser';

const PRERENDERED = join(process.cwd(), 'build', 'prerendered');
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

const slugs = readdirSync(join(process.cwd(), 'nbs'))
	.filter((file) => file.endsWith('.ipynb') && !file.startsWith('_'))
	.map((file) => file.slice(0, -'.ipynb'.length))
	.filter((slug) => existsSync(join(process.cwd(), 'static', 'posts', `${slug}.html`)));

check(slugs.length > 0, 'No published posts found in nbs/ - expected at least one.');

for (const slug of slugs) {
	const page = join(PRERENDERED, 'blog', `${slug}.html`);
	if (!existsSync(page)) {
		failures.push(`${slug}: not prerendered (${page} is missing)`);
		continue;
	}

	const html = readFileSync(page, 'utf-8');
	const title = html.match(/<title>([\s\S]*?)<\/title>/)?.[1]?.trim();
	const canonical = html.match(/<link rel="canonical" href="([^"]*)"/)?.[1];

	check(Boolean(title), `${slug}: prerendered page has no <title>`);
	check(
		canonical === `${SITE_URL}/blog/${slug}`,
		`${slug}: canonical is "${canonical}", expected the post's own URL`
	);
	check(!html.includes('>Loading...<'), `${slug}: prerendered page still ships a loading shell`);

	const body = parse(html).querySelector('.post-content');
	check(Boolean(body), `${slug}: prerendered page has no .post-content element`);
	check(
		Boolean(body?.textContent.trim()),
		`${slug}: prerendered page ships an empty .post-content`
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

if (failures.length > 0) {
	console.error('Prerender check failed:');
	for (const failure of failures) console.error(`  - ${failure}`);
	process.exit(1);
}

console.log(`Prerender check passed for ${slugs.length} post(s).`);
