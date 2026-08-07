import { describe, expect, it } from 'vitest';
import { comparableMetadata, metadataDrift } from './post-files.js';

function notebook(frontmatter: string): string {
	return JSON.stringify({
		cells: [
			{
				cell_type: 'markdown',
				metadata: {},
				source: `---\n${frontmatter}\n---`.split(/(?<=\n)/)
			}
		],
		metadata: {},
		nbformat: 4,
		nbformat_minor: 5
	});
}

function rendered({
	title = 'A Post',
	date = '2026-02-10',
	description = 'A blurb.'
}: { title?: string; date?: string; description?: string } = {}): string {
	return `<!DOCTYPE html>
<html><head>
<title>${title}</title>
<meta name="dcterms.date" content="${date}">
<meta name="description" content="${description}">
</head><body><main><p>Body.</p></main></body></html>`;
}

describe('comparableMetadata', () => {
	it('folds pandoc smart typography back to its ASCII source', () => {
		expect(comparableMetadata('Don’t “ship” this — yet…')).toBe(
			comparableMetadata('Don\'t "ship" this --- yet...')
		);
	});

	it('ignores inline markdown markers and whitespace runs', () => {
		expect(comparableMetadata('Reading `pandas`  *frames*\nfast')).toBe(
			'Reading pandas frames fast'
		);
	});
});

describe('metadataDrift', () => {
	it('reports nothing when the notebook and the rendered page agree', () => {
		expect(
			metadataDrift(
				notebook('title: "A Post"\ndate: "2026-02-10"\ndescription: "A blurb."'),
				rendered()
			)
		).toEqual([]);
	});

	it('accepts a title and description Quarto rendered with smart typography', () => {
		expect(
			metadataDrift(
				notebook(
					`title: "Don't ship this"\ndate: "2026-02-10"\ndescription: "It's a guide - part one..."`
				),
				rendered({
					title: 'Don’t ship this',
					description: 'It’s a guide – part one…'
				})
			)
		).toEqual([]);
	});

	it('accepts a description whose entities the parser decodes', () => {
		expect(
			metadataDrift(
				notebook('title: "A Post"\ndate: "2026-02-10"\ndescription: "Agents & tools"'),
				rendered({ description: 'Agents &amp; tools' })
			)
		).toEqual([]);
	});

	it('reports a title that was edited without re-rendering', () => {
		expect(
			metadataDrift(
				notebook('title: "A Better Post"\ndate: "2026-02-10"\ndescription: "A blurb."'),
				rendered()
			)
		).toEqual([{ field: 'title', notebook: 'A Better Post', rendered: 'A Post' }]);
	});

	it('reports a stale date and description', () => {
		expect(
			metadataDrift(
				notebook('title: "A Post"\ndate: "2026-03-01"\ndescription: "A new blurb."'),
				rendered()
			)
		).toEqual([
			{ field: 'date', notebook: '2026-03-01', rendered: '2026-02-10' },
			{ field: 'description', notebook: 'A new blurb.', rendered: 'A blurb.' }
		]);
	});

	it('compares dates as calendar days, not as written', () => {
		expect(
			metadataDrift(
				notebook('title: "A Post"\ndate: "February 10, 2026"\ndescription: "A blurb."'),
				rendered()
			)
		).toEqual([]);
	});
});
