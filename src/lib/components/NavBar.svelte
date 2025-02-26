<script lang="ts">
	import { Button } from '$lib/components/ui/button';
	import { onMount } from 'svelte';
	
	// Track active section
	let activeSection = 'home';
	
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
				<span class="font-bold text-4xl" style="font-family: 'Shadows Into Light', cursive;">FV</span>
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
			</nav>
		</div>
	</div>
</header> 