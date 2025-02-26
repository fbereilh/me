<script lang="ts">
	import { Button } from '$lib/components/ui/button';
	import { onMount } from 'svelte';
	
	// Track active section
	let activeSection = 'home';
	
	// Theme toggle functionality
	let isDarkTheme = true; // Default to dark theme
	
	function toggleTheme() {
		isDarkTheme = !isDarkTheme;
		if (isDarkTheme) {
			document.documentElement.classList.remove('light');
		} else {
			document.documentElement.classList.add('light');
		}
		localStorage.setItem('theme', isDarkTheme ? 'dark' : 'light');
	}
	
	// Handle smooth scrolling
	function scrollToSection(event: MouseEvent, id: string) {
		event.preventDefault();
		const element = document.getElementById(id);
		if (element) {
			element.scrollIntoView({ behavior: 'smooth' });
		}
		activeSection = id;
	}
	
	// Update active section based on scroll position
	function updateActiveSection() {
		const sections = ['home', 'about', 'projects', 'contact'];
		let currentSection = activeSection;
		
		for (const section of sections) {
			const element = document.getElementById(section);
			if (!element) continue;
			
			const rect = element.getBoundingClientRect();
			// If the section is in view (with a small buffer for navbar height)
			if (rect.top <= 100 && rect.bottom >= 100) {
				currentSection = section;
				break;
			}
		}
		
		activeSection = currentSection;
	}
	
	onMount(() => {
		// Set initial theme from localStorage or default to dark
		const savedTheme = localStorage.getItem('theme') || 'dark';
		isDarkTheme = savedTheme === 'dark';
		if (!isDarkTheme) {
			document.documentElement.classList.add('light');
		} else {
			document.documentElement.classList.remove('light');
		}
		
		// Add scroll event listener with throttling
		let ticking = false;
		window.addEventListener('scroll', () => {
			if (!ticking) {
				window.requestAnimationFrame(() => {
					updateActiveSection();
					ticking = false;
				});
				ticking = true;
			}
		});
		
		// Set initial active section
		updateActiveSection();
	});
</script>

<header class="sticky top-0 z-50 w-full border-b bg-background">
	<div class="container flex h-14 items-center">
		<div class="mr-4 flex">
			<a 
				href="#home" 
				class="mr-6 flex items-center space-x-2"
				on:click={(e) => scrollToSection(e, 'home')}
			>
				<span class="font-bold text-4xl" style="font-family: 'Shadows Into Light', cursive;">FB</span>
			</a>
		</div>
		<div class="flex flex-1 items-center justify-between space-x-2 md:justify-end">
			<nav class="flex items-center space-x-6">
				<a 
					href="#home" 
					class="text-sm font-medium transition-colors hover:text-primary {activeSection === 'home' ? 'text-primary' : ''}"
					on:click={(e) => scrollToSection(e, 'home')}
				>
					Home
				</a>
				<a 
					href="#about" 
					class="text-sm font-medium transition-colors hover:text-primary {activeSection === 'about' ? 'text-primary' : ''}"
					on:click={(e) => scrollToSection(e, 'about')}
				>
					About
				</a>
				<a 
					href="#projects" 
					class="text-sm font-medium transition-colors hover:text-primary {activeSection === 'projects' ? 'text-primary' : ''}"
					on:click={(e) => scrollToSection(e, 'projects')}
				>
					Projects
				</a>
				<a 
					href="#contact" 
					class="text-sm font-medium transition-colors hover:text-primary {activeSection === 'contact' ? 'text-primary' : ''}"
					on:click={(e) => scrollToSection(e, 'contact')}
				>
					Contact
				</a>
				
				<!-- Theme Toggle Button -->
				<button 
					aria-label="Toggle theme"
					class="p-2 rounded-md text-muted-foreground hover:text-primary"
					on:click={toggleTheme}
				>
					{#if isDarkTheme}
						<!-- Sun icon for dark mode -->
						<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
							<circle cx="12" cy="12" r="4"></circle>
							<path d="M12 2v2"></path>
							<path d="M12 20v2"></path>
							<path d="m4.93 4.93 1.41 1.41"></path>
							<path d="m17.66 17.66 1.41 1.41"></path>
							<path d="M2 12h2"></path>
							<path d="M20 12h2"></path>
							<path d="m6.34 17.66-1.41 1.41"></path>
							<path d="m19.07 4.93-1.41 1.41"></path>
						</svg>
					{:else}
						<!-- Moon icon for light mode -->
						<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
							<path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z"></path>
						</svg>
					{/if}
				</button>
			</nav>
		</div>
	</div>
</header> 