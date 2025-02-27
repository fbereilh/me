<script lang="ts">
	import '../app.css';
	import NavBar from '$lib/components/NavBar.svelte';
	import { onMount } from 'svelte';
	let { children } = $props();
	
	// Initialize theme on the client side
	onMount(() => {
		// Set default theme to dark if no preference is stored
		const savedTheme = localStorage.getItem('theme') || 'dark';
		if (savedTheme === 'light') {
			document.documentElement.classList.add('light');
		} else {
			document.documentElement.classList.remove('light');
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
