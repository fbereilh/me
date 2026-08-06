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

/** `foo_files/bar.png` -> `/posts/foo_files/bar.png`; absolute and external URLs are left alone. */
function toPostAssetUrl(value: string): string {
	if (/^(?:[a-z][a-z0-9+.-]*:|\/\/|\/|#)/i.test(value)) return value;
	return `/posts/${value}`;
}

/**
 * Extract the body of a Quarto-rendered post.
 *
 * Quarto writes a complete standalone page; we only want what goes inside our own article
 * shell. Its `#title-block-header` is dropped because the post route renders title, date and
 * categories itself from the typed post metadata - keeping it would duplicate the `<h1>`.
 */
export function extractPost(renderedHtml: string): RenderedPost {
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
	// stray dot next to every code block.
	main.querySelectorAll('script, .code-copy-button').forEach((node) => node.remove());

	for (const attribute of ['src', 'href', 'data-src', 'poster']) {
		for (const node of main.querySelectorAll(`[${attribute}]`)) {
			const value = node.getAttribute(attribute);
			if (value) node.setAttribute(attribute, toPostAssetUrl(value));
		}
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
