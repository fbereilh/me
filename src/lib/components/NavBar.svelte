<script lang="ts">
	import { Button } from '$lib/components/ui/button';
</script>

<header class="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
	<div class="container flex h-14 items-center">
		<div class="mr-4 flex">
			<a href="/" class="mr-6 flex items-center space-x-2">
				<span class="font-bold">My Portfolio</span>
			</a>
		</div>
		<div class="flex flex-1 items-center justify-between space-x-2 md:justify-end">
			<nav class="flex items-center space-x-6">
				<a href="/" class="text-sm font-medium transition-colors hover:text-primary">
					Home
				</a>
				<a href="/projects" class="text-sm font-medium transition-colors hover:text-primary">
					Projects
				</a>
				<a href="/about" class="text-sm font-medium transition-colors hover:text-primary">
					About
				</a>
				<a href="/contact" class="text-sm font-medium transition-colors hover:text-primary">
					Contact
				</a>
			</nav>
			<div class="flex items-center space-x-2">
				<Button variant="ghost" size="icon">
					<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="h-5 w-5">
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
				</Button>
			</div>
		</div>
	</div>
</header> 