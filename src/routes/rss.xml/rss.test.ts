import { describe, expect, it, vi } from 'vitest';
import { toPost } from '$lib/posts';

const posts = vi.hoisted(() => ({ value: [] as unknown[] }));
vi.mock('$lib/posts', async (importOriginal) => ({
	...(await importOriginal<typeof import('$lib/posts')>()),
	getPosts: () => posts.value
}));

const { GET } = await import('./+server');

async function feed(): Promise<string> {
	const response = await GET({} as Parameters<typeof GET>[0]);
	return response.text();
}

describe('rss.xml', () => {
	it('carries a post description as the item description', async () => {
		posts.value = [toPost('a-post', { title: 'A Post', description: 'My todo list mocks me.' })];
		expect(await feed()).toContain('<description>My todo list mocks me.</description>');
	});

	it('leaves the element out rather than emitting an empty description', async () => {
		posts.value = [toPost('a-post', { title: 'A Post' })];
		const xml = await feed();
		expect(xml).toContain('<title>A Post</title>');
		expect(xml).not.toContain('<description></description>');
	});
});
