import { describe, expect, it } from 'vitest';
import { extractPost } from './post-html';

const RENDERED = `<!DOCTYPE html>
<html><head>
<title>A Post</title>
<style>code { white-space: pre-wrap; }</style>
<link rel="stylesheet" href="a-post_files/libs/quarto-html/quarto-syntax-highlighting-abc.css">
<link rel="stylesheet" href="a-post_files/libs/bootstrap/bootstrap.min.css">
</head>
<body class="quarto-light">
<main class="content" id="quarto-document-content">
<header id="title-block-header"><h1 class="title">A Post</h1></header>
<p>Body text goes here.</p>
<img src="a-post_files/figure-html/cell-1.png" srcset="a-post_files/small.png 1x, a-post_files/big.png 2x">
<a href="https://example.com">external</a>
<a href="/blog">internal</a>
<a href="another-post.html">sibling notebook</a>
<a href="another-post.html#section">sibling notebook anchor</a>
<a href="not-a-post.html">unpublished sibling</a>
<a href="a-post_files/report.html">an asset that happens to be html</a>
<script>window.quartoThing()</script>
<button title="Copy to Clipboard" class="code-copy-button"><i class="bi"></i></button>
</main>
</body></html>`;

describe('extractPost', () => {
	const post = extractPost(RENDERED, { postSlugs: ['a-post', 'another-post'] });

	it('returns the body of <main> without the Quarto title block', () => {
		expect(post.html).toContain('Body text goes here.');
		expect(post.html).not.toContain('title-block-header');
		expect(post.html).not.toContain('<h1 class="title">');
	});

	it('rewrites relative asset paths to /posts and leaves absolute ones alone', () => {
		expect(post.html).toContain('src="/posts/a-post_files/figure-html/cell-1.png"');
		expect(post.html).toContain(
			'srcset="/posts/a-post_files/small.png 1x, /posts/a-post_files/big.png 2x"'
		);
		expect(post.html).toContain('href="https://example.com"');
		expect(post.html).toContain('href="/blog"');
	});

	it('sends a link to another published post to its /blog page', () => {
		expect(post.html).toContain('href="/blog/another-post"');
		expect(post.html).toContain('href="/blog/another-post#section"');
	});

	it('leaves a page that is not a published post mapped to /posts', () => {
		expect(post.html).toContain('href="/posts/not-a-post.html"');
		expect(post.html).toContain('href="/posts/a-post_files/report.html"');
	});

	it('drops markup that has nothing to wire it up here', () => {
		expect(post.html).not.toContain('quartoThing');
		expect(post.html).not.toContain('code-copy-button');
	});

	it('carries the inline head CSS across', () => {
		expect(post.css).toContain('white-space: pre-wrap');
	});

	it('keeps only the syntax highlighting stylesheet, not Quarto bootstrap', () => {
		expect(post.stylesheets).toEqual([
			'/posts/a-post_files/libs/quarto-html/quarto-syntax-highlighting-abc.css'
		]);
	});

	it('always reports at least one minute of reading', () => {
		expect(post.readingTimeMinutes).toBeGreaterThanOrEqual(1);
	});
});

describe('extractPost reading time', () => {
	const prose = (words: number) => `<p>${'word '.repeat(words).trim()}</p>`;
	const page = (body: string) => `<html><body><main>${body}</main></body></html>`;

	it('counts prose', () => {
		expect(extractPost(page(prose(2000))).readingTimeMinutes).toBe(10);
	});

	it('does not count source listings or cell outputs at prose speed', () => {
		const codeHeavy = page(`
			${prose(400)}
			<div class="cell">
				<div class="sourceCode cell-code" id="cb1"><pre class="sourceCode python"><code>${'token '.repeat(3000)}</code></pre></div>
				<div class="cell-output cell-output-stdout"><pre><code>${'output '.repeat(3000)}</code></pre></div>
			</div>
		`);
		expect(extractPost(codeHeavy).readingTimeMinutes).toBe(2);
	});
});
