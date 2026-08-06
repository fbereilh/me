<script lang="ts">
	import { page } from '$app/state';
	import {
		SITE_AUTHOR,
		SITE_DESCRIPTION,
		SITE_IMAGE,
		SITE_TITLE,
		SITE_URL,
		type SeoData
	} from '$lib/site';

	let {
		title = SITE_TITLE,
		description = SITE_DESCRIPTION,
		image = SITE_IMAGE,
		type = 'website',
		canonical = new URL(page.url.pathname, SITE_URL).href,
		publishedAt,
		noindex = false
	}: SeoData = $props();

	const absoluteImage = $derived(new URL(image, SITE_URL).href);
</script>

<svelte:head>
	<title>{title}</title>
	<meta name="description" content={description} />
	<meta name="author" content={SITE_AUTHOR} />

	{#if noindex}
		<!-- An error page is not a page: no canonical claiming a URL that does not resolve,
		     and nothing for a crawler to index or a social card to preview. -->
		<meta name="robots" content="noindex" />
	{:else}
		<link rel="canonical" href={canonical} />

		<meta property="og:type" content={type} />
		<meta property="og:url" content={canonical} />
		<meta property="og:title" content={title} />
		<meta property="og:description" content={description} />
		<meta property="og:image" content={absoluteImage} />
		{#if publishedAt}
			<meta property="article:published_time" content={publishedAt} />
		{/if}

		<meta name="twitter:card" content="summary_large_image" />
		<meta name="twitter:url" content={canonical} />
		<meta name="twitter:title" content={title} />
		<meta name="twitter:description" content={description} />
		<meta name="twitter:image" content={absoluteImage} />
	{/if}
</svelte:head>
