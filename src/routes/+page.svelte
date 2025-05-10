<script lang="ts">
	import {
		HeroSection,
		AboutSection,
		ProjectsSection,
		ContactSection,
		Footer
	} from '$lib/components/index';
	
	// Add smooth scrolling
	import { onMount } from 'svelte';
	
	onMount(() => {
		// Enable smooth scrolling for anchor links
		document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
			anchor.addEventListener('click', (e) => {
				e.preventDefault();
				
				if (anchor instanceof HTMLAnchorElement) {
					const href = anchor.getAttribute('href');
					if (href) {
						const targetElement = document.querySelector(href);
						
						if (targetElement) {
							targetElement.scrollIntoView({
								behavior: 'smooth'
							});
							
							// Update URL but don't scroll (already handled)
							history.pushState({}, '', href);
						}
					}
				}
			});
		});
	});
</script>

<HeroSection />
<AboutSection />
<ProjectsSection />
<ContactSection />
<Footer />
