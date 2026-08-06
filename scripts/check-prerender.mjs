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

const PRERENDERED = join(process.cwd(), 'build', 'prerendered');
const failures = [];

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
		canonical === `https://fbereilh.com/blog/${slug}`,
		`${slug}: canonical is "${canonical}", expected the post's own URL`
	);
	check(!html.includes('>Loading...<'), `${slug}: prerendered page still ships a loading shell`);
	check(
		html.includes('class="post-content"') && html.length > 10_000,
		`${slug}: prerendered page has no post body (${html.length} bytes)`
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
