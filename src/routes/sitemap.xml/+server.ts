import type { RequestHandler } from './$types';

export const prerender = true;

export const GET: RequestHandler = async () => {
  const baseUrl = 'https://fbereilh.com';
  
  const pages = [
    { url: '', priority: '1.0', changefreq: 'monthly' },
    { url: '/blog', priority: '0.8', changefreq: 'weekly' },
    { url: '/blog/example', priority: '0.6', changefreq: 'monthly' },
    { url: '/blog/example2', priority: '0.6', changefreq: 'monthly' },
  ];

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${pages.map(page => `  <url>
    <loc>${baseUrl}${page.url}</loc>
    <changefreq>${page.changefreq}</changefreq>
    <priority>${page.priority}</priority>
  </url>`).join('\n')}
</urlset>`;

  return new Response(sitemap, {
    headers: {
      'Content-Type': 'application/xml',
      'Cache-Control': 'max-age=3600'
    }
  });
};