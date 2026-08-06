import { getPosts } from '$lib/posts';
import { SITE_URL } from '$lib/site';
import { escapeXml } from '$lib/xml';
import type { RequestHandler } from './$types';

export const prerender = true;

export const GET: RequestHandler = async () => {
	const entries = [
		{ path: '/', priority: '1.0', changefreq: 'monthly', lastmod: '' },
		{ path: '/blog', priority: '0.8', changefreq: 'weekly', lastmod: '' },
		...getPosts().map((post) => ({
			path: `/blog/${post.slug}`,
			priority: '0.6',
			changefreq: 'monthly',
			lastmod: post.date
		}))
	];

	const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${entries
	.map(
		(entry) => `  <url>
    <loc>${escapeXml(new URL(entry.path, SITE_URL).href)}</loc>${
			entry.lastmod ? `\n    <lastmod>${entry.lastmod}</lastmod>` : ''
		}
    <changefreq>${entry.changefreq}</changefreq>
    <priority>${entry.priority}</priority>
  </url>`
	)
	.join('\n')}
</urlset>
`;

	return new Response(sitemap, {
		headers: {
			'Content-Type': 'application/xml',
			'Cache-Control': 'max-age=3600'
		}
	});
};
