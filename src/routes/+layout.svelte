<script lang="ts">
	import '../app.css';
	import { page } from '$app/state';
	import Footer from '$lib/components/Footer.svelte';
	import NavBar from '$lib/components/NavBar.svelte';
	import Seo from '$lib/components/Seo.svelte';
	import type { SeoData } from '$lib/site';

	let { children } = $props();

	// Routes describe themselves by returning `seo` from their load function, so the whole
	// site emits exactly one set of head tags, from one place.
	const seo = $derived((page.data.seo ?? {}) as SeoData);
</script>

<svelte:head>
	<link
		href="https://fonts.googleapis.com/css2?family=Shadows+Into+Light&display=swap"
		rel="stylesheet"
	/>
	<link rel="alternate" type="application/rss+xml" title="Felipe Bereilh" href="/rss.xml" />
</svelte:head>

<Seo {...seo} />

<div class="bg-background min-h-screen font-sans antialiased">
	<NavBar />
	<main class="container py-6">
		{@render children()}
	</main>
	<Footer />
</div>
