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
<script>window.quartoThing()</script>
<button title="Copy to Clipboard" class="code-copy-button"><i class="bi"></i></button>
</main>
</body></html>`;

describe('extractPost', () => {
	const post = extractPost(RENDERED);

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
