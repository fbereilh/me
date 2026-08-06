import { readFileSync, statSync } from 'node:fs';
import {
	notebookPath,
	parseNotebookFrontmatter,
	publishedSlugs,
	renderedPostPath
} from './post-files.js';

export { parseNotebookFrontmatter, renderedPostPath };

/**
 * The single source of truth for blog post metadata.
 *
 * Posts are Quarto notebooks in `nbs/`. Cell 0 of every notebook is a frontmatter
 * cell (see `AGENTS.md`) holding the YAML that Quarto reads. We parse that same YAML
 * here so the SvelteKit site and the rendered HTML can never disagree about a post's
 * title, date or categories.
 */
export interface Post {
	slug: string;
	title: string;
	description: string;
	/** ISO `YYYY-MM-DD`. Empty when the notebook has no usable date. Sort on this. */
	date: string;
	/** Human readable form of `date`, e.g. `February 10, 2026`. */
	displayDate: string;
	categories: string[];
}

/** Raw YAML frontmatter of a post notebook, before normalisation. */
type Frontmatter = NonNullable<ReturnType<typeof parseNotebookFrontmatter>>;

const UNKNOWN_DATE = 'Unknown date';

const dateFormatter = new Intl.DateTimeFormat('en-US', {
	year: 'numeric',
	month: 'long',
	day: 'numeric',
	timeZone: 'UTC'
});

const ISO_DATE_ONLY = /^\d{4}-\d{2}-\d{2}$/;
const HAS_EXPLICIT_ZONE = /(?:Z|[+-]\d{2}:?\d{2})$/i;

/** The calendar day a `Date` falls on, read in UTC or in the build machine's zone. */
function calendarDay(date: Date, inUtc: boolean): string {
	const year = inUtc ? date.getUTCFullYear() : date.getFullYear();
	const month = inUtc ? date.getUTCMonth() : date.getMonth();
	const day = inUtc ? date.getUTCDate() : date.getDate();
	return new Date(Date.UTC(year, month, day)).toISOString().slice(0, 10);
}

/**
 * Normalise a frontmatter `date` to ISO `YYYY-MM-DD`, or `''` when unusable.
 *
 * A frontmatter date is a calendar day, not an instant, so it must normalise to the same
 * day on every build machine. `YYYY-MM-DD` passes straight through. Anything carrying an
 * explicit UTC offset is read in UTC; anything else (`February 10, 2026`, `02/10/2026`)
 * is parsed by the engine as local time, so its day is read locally too - reading it in
 * UTC would shift it a day backwards in every zone east of Greenwich.
 */
function normaliseDate(value: unknown): string {
	if (value instanceof Date) {
		return Number.isNaN(value.getTime()) ? '' : calendarDay(value, true);
	}
	if (typeof value !== 'string' && typeof value !== 'number') return '';
	const raw = String(value).trim();
	if (!raw) return '';
	const parsed = new Date(raw);
	if (Number.isNaN(parsed.getTime())) return '';
	// A date-only ISO string parses as UTC, so a roundtrip that comes back unchanged proves
	// the day exists - `2026-02-31` silently rolls forward instead of failing to parse.
	if (ISO_DATE_ONLY.test(raw)) return calendarDay(parsed, true) === raw ? raw : '';
	return calendarDay(parsed, HAS_EXPLICIT_ZONE.test(raw));
}

function normaliseCategories(value: unknown): string[] {
	if (Array.isArray(value)) {
		return value.map((c) => String(c).trim()).filter(Boolean);
	}
	if (typeof value === 'string' && value.trim()) return [value.trim()];
	return [];
}

/** Build a `Post` from a slug and its parsed frontmatter. */
export function toPost(slug: string, frontmatter: Frontmatter | null): Post {
	const date = normaliseDate(frontmatter?.date);
	return {
		slug,
		title: typeof frontmatter?.title === 'string' ? frontmatter.title : slug,
		description: typeof frontmatter?.description === 'string' ? frontmatter.description : '',
		date,
		displayDate: date ? dateFormatter.format(new Date(`${date}T00:00:00Z`)) : UNKNOWN_DATE,
		categories: normaliseCategories(frontmatter?.categories)
	};
}

/** Newest first. Posts with no usable date sort last, in stable slug order. */
export function sortPosts(posts: Post[]): Post[] {
	return [...posts].sort((a, b) => {
		if (a.date && b.date) return b.date.localeCompare(a.date) || a.slug.localeCompare(b.slug);
		if (a.date) return -1;
		if (b.date) return 1;
		return a.slug.localeCompare(b.slug);
	});
}

const frontmatterCache = new Map<string, { mtimeMs: number; frontmatter: Frontmatter | null }>();

/**
 * Parse a notebook's frontmatter, reusing the last result while the file is unchanged.
 *
 * `getPosts()` runs several times per build (prerender entries, each post's load, the blog
 * index, the sitemap, the RSS feed) and notebooks carry their saved outputs, so they are
 * large. Keying on mtime keeps the dev server honest when a notebook is edited.
 */
function readFrontmatter(path: string): Frontmatter | null {
	const { mtimeMs } = statSync(path);
	const cached = frontmatterCache.get(path);
	if (cached?.mtimeMs === mtimeMs) return cached.frontmatter;

	const frontmatter = parseNotebookFrontmatter(readFileSync(path, 'utf-8'));
	frontmatterCache.set(path, { mtimeMs, frontmatter });
	return frontmatter;
}

/**
 * Every published post, newest first.
 *
 * `publishedSlugs` (see `post-files.js`) decides what counts as published; the build guard
 * reads the same function, so the two can never check different sets of posts.
 */
export function getPosts(cwd: string = process.cwd()): Post[] {
	const posts = publishedSlugs(cwd).map((slug) =>
		toPost(slug, readFrontmatter(notebookPath(slug, cwd)))
	);

	return sortPosts(posts);
}
