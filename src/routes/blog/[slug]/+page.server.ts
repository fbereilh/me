import { readFileSync } from 'node:fs';
import { join } from 'node:path';
import { error } from '@sveltejs/kit';
import { extractPost } from '$lib/post-html';
import { getPost, getPosts } from '$lib/posts';
import type { EntryGenerator, PageServerLoad } from './$types';

export const prerender = true;

/** Prerender one static page per published post. */
export const entries: EntryGenerator = () => getPosts().map(({ slug }) => ({ slug }));

export const load: PageServerLoad = ({ params }) => {
	const post = getPost(params.slug);
	if (!post) throw error(404, `No post named "${params.slug}"`);

	let renderedHtml: string;
	try {
		renderedHtml = readFileSync(
			join(process.cwd(), 'static', 'posts', `${post.slug}.html`),
			'utf-8'
		);
	} catch {
		throw error(404, `"${post.slug}" has not been rendered yet`);
	}

	const { html, css, stylesheets, readingTimeMinutes } = extractPost(renderedHtml);
	return {
		post,
		html,
		css,
		stylesheets,
		readingTimeMinutes,
		seo: {
			title: `${post.title} - Felipe Bereilh`,
			description: post.description,
			type: 'article' as const,
			publishedAt: post.date || undefined
		}
	};
};
