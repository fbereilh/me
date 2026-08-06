/** Canonical origin of the deployed site. Used for canonical URLs, sitemap and RSS. */
export const SITE_URL = 'https://fbereilh.com';

/** Defaults used by `<Seo />` when a page does not override them. */
export const SITE_TITLE = 'Felipe Bereilh - Senior Data Scientist';
export const SITE_DESCRIPTION =
	'Building intelligent systems that learn from data. Specializing in ML engineering and production systems.';
export const SITE_IMAGE = `${SITE_URL}/hero.png`;
export const SITE_AUTHOR = 'Felipe Bereilh';

/**
 * Per-page SEO overrides. A route supplies these from its `load` as `seo`, and the root
 * layout feeds them to the single `<Seo />` instance so no page emits duplicate head tags.
 */
export interface SeoData {
	title?: string;
	description?: string;
	image?: string;
	type?: 'website' | 'article';
	canonical?: string;
	publishedAt?: string;
	/** Keep the page out of search results and emit no canonical or social tags. */
	noindex?: boolean;
}

/** What an error page calls itself. Shared so its `<h1>` and its `<title>` cannot drift apart. */
export function errorHeading(status: number): string {
	return status === 404 ? 'Page not found' : 'Something went wrong';
}
