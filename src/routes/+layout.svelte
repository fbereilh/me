<script lang="ts">
	import '../app.css';
	import NavBar from '$lib/components/NavBar.svelte';
	let { children } = $props();
</script>

<svelte:head>
	<link href="https://fonts.googleapis.com/css2?family=Shadows+Into+Light&display=swap" rel="stylesheet">
</svelte:head>

<div class="min-h-screen bg-background font-sans antialiased">
	<NavBar />
	<main class="container py-6">
		{@render children()}
	</main>
</div>
