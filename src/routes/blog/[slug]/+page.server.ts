import { readFileSync } from 'node:fs';
import { error } from '@sveltejs/kit';
import { extractPost } from '$lib/post-html';
import { getPost, getPosts, renderedPostPath } from '$lib/posts';
import type { EntryGenerator, PageServerLoad } from './$types';

export const prerender = true;

/** Prerender one static page per published post. */
export const entries: EntryGenerator = () => getPosts().map(({ slug }) => ({ slug }));

export const load: PageServerLoad = ({ params }) => {
	const post = getPost(params.slug);
	if (!post) throw error(404, `No post named "${params.slug}"`);

	let renderedHtml: string;
	try {
		renderedHtml = readFileSync(renderedPostPath(post.slug), 'utf-8');
	} catch {
		throw error(404, `"${post.slug}" has not been rendered yet`);
	}

	const { html, css, stylesheets, readingTimeMinutes } = extractPost(renderedHtml, {
		postSlugs: getPosts().map((published) => published.slug)
	});
	return {
		post,
		html,
		css,
		stylesheets,
		readingTimeMinutes,
		seo: {
			title: `${post.title} - Felipe Bereilh`,
			description: post.description || undefined,
			type: 'article' as const,
			publishedAt: post.date || undefined
		}
	};
};
