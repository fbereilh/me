<script lang="ts">
	import '../app.css';
	import NavBar from '$lib/components/NavBar.svelte';
	import { onNavigate } from '$app/navigation';
	import { goto } from '$app/navigation';
	let { children } = $props();

	// Reset scroll position on navigation
	onNavigate((navigation) => {
		if (navigation.to?.route.id !== '/') {
			return new Promise((resolve) => {
				navigation.complete.then(() => {
					window.scrollTo(0, 0);
					resolve();
				});
			});
		}
	});
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
