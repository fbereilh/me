import { describe, expect, it } from 'vitest';
import { getPosts, parseNotebookFrontmatter, sortPosts, toPost, type Post } from './posts';

function notebook(cells: Array<{ cell_type: string; source: string }>): string {
	return JSON.stringify({
		cells: cells.map((cell) => ({ ...cell, metadata: {}, source: cell.source.split(/(?<=\n)/) })),
		metadata: {},
		nbformat: 4,
		nbformat_minor: 5
	});
}

const FRONTMATTER = `---
title: "Building a Smart Scheduling Agent"
author: "Felipe Bereilh"
date: "2026-02-10"
categories: [agents, langchain]
description: "My todo list mocks me."
---`;

describe('parseNotebookFrontmatter', () => {
	it('reads a raw frontmatter cell', () => {
		const parsed = parseNotebookFrontmatter(notebook([{ cell_type: 'raw', source: FRONTMATTER }]));
		expect(parsed).toMatchObject({
			title: 'Building a Smart Scheduling Agent',
			date: '2026-02-10'
		});
	});

	it('reads a markdown frontmatter cell', () => {
		const parsed = parseNotebookFrontmatter(
			notebook([{ cell_type: 'markdown', source: FRONTMATTER }])
		);
		expect(parsed).toMatchObject({ categories: ['agents', 'langchain'] });
	});

	it('skips a leading code cell', () => {
		const parsed = parseNotebookFrontmatter(
			notebook([
				{ cell_type: 'code', source: '#| echo: false\nimport warnings' },
				{ cell_type: 'raw', source: FRONTMATTER }
			])
		);
		expect(parsed).toMatchObject({ title: 'Building a Smart Scheduling Agent' });
	});

	it('ignores a categories line that lives in a code cell', () => {
		const parsed = parseNotebookFrontmatter(
			notebook([
				{ cell_type: 'raw', source: '---\ntitle: "No categories here"\n---' },
				{ cell_type: 'code', source: 'config = "categories: [leaked, wrong]"' }
			])
		);
		expect(toPost('slug', parsed).categories).toEqual([]);
	});

	it('returns null when there is no frontmatter', () => {
		expect(
			parseNotebookFrontmatter(notebook([{ cell_type: 'markdown', source: '# Hi' }]))
		).toBeNull();
		expect(parseNotebookFrontmatter('not json')).toBeNull();
	});
});

describe('toPost', () => {
	it('normalises dates and keeps an ISO value for sorting', () => {
		const post = toPost(
			'a-post',
			parseNotebookFrontmatter(notebook([{ cell_type: 'raw', source: FRONTMATTER }]))
		);
		expect(post.date).toBe('2026-02-10');
		expect(post.displayDate).toBe('February 10, 2026');
	});

	it('keeps the written calendar day for a non-ISO date, whatever the build zone', () => {
		expect(toPost('s', { date: 'February 10, 2026' }).date).toBe('2026-02-10');
		expect(toPost('s', { date: '02/10/2026' }).date).toBe('2026-02-10');
		expect(toPost('s', { date: 'February 10, 2026' }).displayDate).toBe('February 10, 2026');
	});

	it('reads a date carrying an explicit UTC offset in UTC', () => {
		expect(toPost('s', { date: '2026-02-10T23:30:00Z' }).date).toBe('2026-02-10');
		expect(toPost('s', { date: new Date('2026-02-10T00:00:00Z') }).date).toBe('2026-02-10');
	});

	it('drops a date it cannot parse', () => {
		expect(toPost('s', { date: 'sometime last spring' }).date).toBe('');
		expect(toPost('s', { date: '2026-02-31' }).date).toBe('');
	});

	it('falls back to the slug and an unknown date', () => {
		const post = toPost('a-post', null);
		expect(post).toMatchObject({
			title: 'a-post',
			date: '',
			displayDate: 'Unknown date',
			categories: [],
			description: ''
		});
	});

	it('accepts a single category written as a scalar', () => {
		expect(toPost('s', { categories: 'agents' }).categories).toEqual(['agents']);
	});
});

describe('sortPosts', () => {
	const post = (slug: string, date: string): Post => toPost(slug, { title: slug, date });

	it('orders newest first regardless of display formatting', () => {
		const sorted = sortPosts([
			post('april', '2026-04-01'),
			post('december', '2025-12-31'),
			post('may', '2026-05-02')
		]);
		expect(sorted.map((p) => p.slug)).toEqual(['may', 'april', 'december']);
	});

	it('pushes undated posts to the end instead of scrambling the order', () => {
		const sorted = sortPosts([post('undated', ''), post('april', '2026-04-01')]);
		expect(sorted.map((p) => p.slug)).toEqual(['april', 'undated']);
	});
});

describe('getPosts', () => {
	const posts = getPosts();

	it('finds the published notebooks in this repository', () => {
		expect(posts.length).toBeGreaterThan(0);
	});

	it('gives every post a title, an ISO date and a slug that resolves to rendered HTML', () => {
		for (const post of posts) {
			expect(post.title).not.toBe('');
			expect(post.date).toMatch(/^\d{4}-\d{2}-\d{2}$/);
			expect(post.slug).not.toMatch(/^_/);
		}
	});

	it('returns them newest first', () => {
		const dates = posts.map((p) => p.date);
		expect([...dates].sort().reverse()).toEqual(dates);
	});
});
