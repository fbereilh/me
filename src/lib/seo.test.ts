import { render } from 'svelte/server';
import { describe, expect, it } from 'vitest';
import Seo from './components/Seo.svelte';
import { SITE_DESCRIPTION } from './site';

/** `canonical` is passed so the component never reaches for `page.url` outside a request. */
function head(props: Record<string, unknown>): string {
	return render(Seo, { props: { title: 'A Page', canonical: 'https://fbereilh.com/x', ...props } })
		.head;
}

describe('Seo', () => {
	it('falls back to the site blurb for a route with no description of its own', () => {
		const rendered = head({});
		expect(rendered).toContain(`<meta name="description" content="${SITE_DESCRIPTION}">`);
		expect(rendered).toContain(`<meta property="og:description" content="${SITE_DESCRIPTION}">`);
		expect(rendered).toContain(`<meta name="twitter:description" content="${SITE_DESCRIPTION}">`);
	});

	it('emits a per-page description across all three surfaces', () => {
		const rendered = head({ description: 'My todo list mocks me.' });
		expect(rendered).toContain('<meta name="description" content="My todo list mocks me.">');
		expect(rendered).toContain('<meta property="og:description" content="My todo list mocks me.">');
		expect(rendered).toContain(
			'<meta name="twitter:description" content="My todo list mocks me.">'
		);
	});

	it('omits the description tags entirely rather than borrowing the site blurb', () => {
		const rendered = head({ description: null });
		expect(rendered).not.toContain('name="description"');
		expect(rendered).not.toContain('og:description');
		expect(rendered).not.toContain('twitter:description');
		expect(rendered).not.toContain(SITE_DESCRIPTION);
	});
});
