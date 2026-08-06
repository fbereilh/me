import { getPosts } from '$lib/posts';
import { SITE_DESCRIPTION, SITE_TITLE, SITE_URL } from '$lib/site';
import { escapeXml } from '$lib/xml';
import type { RequestHandler } from './$types';

export const prerender = true;

/** RFC 822 date, as required by RSS 2.0 `pubDate`. */
function toRfc822(isoDate: string): string {
	return new Date(`${isoDate}T00:00:00Z`).toUTCString();
}

export const GET: RequestHandler = async () => {
	const posts = getPosts();
	const feedUrl = new URL('/rss.xml', SITE_URL).href;

	const items = posts
		.map((post) => {
			const url = new URL(`/blog/${post.slug}`, SITE_URL).href;
			const fields = [
				`<title>${escapeXml(post.title)}</title>`,
				`<link>${escapeXml(url)}</link>`,
				`<guid isPermaLink="true">${escapeXml(url)}</guid>`,
				`<description>${escapeXml(post.description)}</description>`,
				...(post.date ? [`<pubDate>${toRfc822(post.date)}</pubDate>`] : []),
				...post.categories.map((category) => `<category>${escapeXml(category)}</category>`)
			];
			return ['    <item>', ...fields.map((field) => `      ${field}`), '    </item>'].join('\n');
		})
		.join('\n');

	const feed = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>${escapeXml(SITE_TITLE)}</title>
    <link>${escapeXml(new URL('/blog', SITE_URL).href)}</link>
    <description>${escapeXml(SITE_DESCRIPTION)}</description>
    <language>en</language>
    <atom:link href="${escapeXml(feedUrl)}" rel="self" type="application/rss+xml" />
${items}
  </channel>
</rss>
`;

	return new Response(feed, {
		headers: {
			'Content-Type': 'application/rss+xml',
			'Cache-Control': 'max-age=3600'
		}
	});
};
