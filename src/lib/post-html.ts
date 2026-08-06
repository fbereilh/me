import { parse } from 'node-html-parser';

/** The pieces of a rendered Quarto page that the post route needs. */
export interface RenderedPost {
	/** Inner HTML of `<main>`, with asset paths rewritten and Quarto's title block removed. */
	html: string;
	/** Inline CSS Quarto emits in `<head>` (syntax highlighting and friends). */
	css: string;
	/** Quarto's syntax highlighting stylesheet, as a site-absolute URL. */
	stylesheets: string[];
	/** Estimated reading time of the prose in whole minutes, minimum 1. */
	readingTimeMinutes: number;
}

const WORDS_PER_MINUTE = 200;

/** Source listings and cell outputs are not read at prose speed, so they do not count. */
const NON_PROSE_SELECTOR = 'div.sourceCode, .cell-output';

/**
 * Where a script that belongs to a cell's output lives.
 *
 * Quarto wraps every executed cell in `div.cell`, so the JS half of a figure (plotly, altair,
 * bokeh, ipywidgets) is always inside one. Any other script in `<main>` is Quarto's own page
 * chrome - clipboard, tippy, anchors, the `quarto.js` wiring - which is not loaded here.
 */
const CELL_OUTPUT_SELECTOR = '.cell, .cell-output, .cell-output-display';

const ABSOLUTE_URL = /^(?:[a-z][a-z0-9+.-]*:|\/\/|\/|#)/i;

/** A bare `slug.html`, optionally followed by a query or fragment. */
const SIBLING_PAGE = /^([^/?#]+)\.html(?=$|[?#])/;

/** `foo_files/bar.png` -> `/posts/foo_files/bar.png`; absolute and external URLs are left alone. */
function toPostAssetUrl(value: string): string {
	if (ABSOLUTE_URL.test(value)) return value;
	return `/posts/${value}`;
}

/**
 * Rewrite a link out of a rendered post.
 *
 * Quarto turns a markdown link to a sibling notebook into `other-post.html`. That file does
 * exist under `/posts/`, but it is the raw standalone Quarto page - no nav, no footer, no
 * canonical, and disallowed in `robots.txt` - so a cross-post link is sent to the real
 * `/blog/<slug>` page instead. Anything else is an asset and keeps the `/posts/` mapping.
 */
function toPostHref(value: string, postSlugs: ReadonlySet<string>): string {
	if (ABSOLUTE_URL.test(value)) return value;
	const match = SIBLING_PAGE.exec(value);
	if (match && postSlugs.has(match[1])) return `/blog/${match[1]}${value.slice(match[0].length)}`;
	return toPostAssetUrl(value);
}

/**
 * Extract the body of a Quarto-rendered post.
 *
 * Quarto writes a complete standalone page; we only want what goes inside our own article
 * shell. Its `#title-block-header` is dropped because the post route renders title, date and
 * categories itself from the typed post metadata - keeping it would duplicate the `<h1>`.
 *
 * `postSlugs` is the set of published post slugs; links between notebooks resolve to their
 * `/blog/<slug>` pages instead of the raw rendered HTML.
 */
export function extractPost(
	renderedHtml: string,
	{ postSlugs = [] }: { postSlugs?: Iterable<string> } = {}
): RenderedPost {
	const slugs = new Set(postSlugs);

	const document = parse(renderedHtml, { blockTextElements: { style: true, script: true } });

	const css = document
		.querySelectorAll('head style')
		.map((node) => node.textContent)
		.join('\n');

	// Quarto's Bootstrap bundle would fight this site's layout, so only the syntax
	// highlighting stylesheet comes across.
	const stylesheets = document
		.querySelectorAll('head link[rel="stylesheet"]')
		.map((node) => node.getAttribute('href') ?? '')
		.filter((href) => href.includes('syntax-highlighting'))
		.map(toPostAssetUrl);

	const main = document.querySelector('main') ?? document.querySelector('body');
	if (!main) return { html: '', css, stylesheets, readingTimeMinutes: 1 };

	main.querySelector('#title-block-header')?.remove();
	// Quarto's own scripts (clipboard, tooltips, anchors) are not loaded here, so drop the
	// markup that only exists to be wired up by them - an unwired copy button renders as a
	// stray dot next to every code block. A script inside a cell is that cell's output, not
	// chrome, so it stays; `scripts/check-prerender.mjs` fails the build on the first one,
	// because its library bundle still lives in a `<head>` we do not carry across.
	main.querySelectorAll('script').forEach((node) => {
		if (!node.closest(CELL_OUTPUT_SELECTOR)) node.remove();
	});
	main.querySelectorAll('.code-copy-button').forEach((node) => node.remove());

	for (const attribute of ['src', 'data-src', 'poster']) {
		for (const node of main.querySelectorAll(`[${attribute}]`)) {
			const value = node.getAttribute(attribute);
			if (value) node.setAttribute(attribute, toPostAssetUrl(value));
		}
	}
	for (const node of main.querySelectorAll('[href]')) {
		const value = node.getAttribute('href');
		if (value) node.setAttribute('href', toPostHref(value, slugs));
	}
	for (const node of main.querySelectorAll('[srcset]')) {
		const srcset = node.getAttribute('srcset');
		if (!srcset) continue;
		node.setAttribute(
			'srcset',
			srcset
				.split(',')
				.map((candidate) => {
					const [url, ...rest] = candidate.trim().split(/\s+/);
					return [toPostAssetUrl(url), ...rest].join(' ');
				})
				.join(', ')
		);
	}

	const html = main.innerHTML;

	const prose = parse(html);
	prose.querySelectorAll(NON_PROSE_SELECTOR).forEach((node) => node.remove());
	const words = prose.textContent.trim().split(/\s+/).filter(Boolean).length;

	return {
		html,
		css,
		stylesheets,
		readingTimeMinutes: Math.max(1, Math.round(words / WORDS_PER_MINUTE))
	};
}
