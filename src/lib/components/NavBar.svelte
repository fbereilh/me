<script lang="ts">
	import { Button } from '$lib/components/ui/button';
</script>

<header class="sticky top-0 z-50 w-full border-b bg-background">
	<div class="container flex h-14 items-center">
		<div class="mr-4 flex">
			<a href="/" class="mr-6 flex items-center space-x-2">
				<span class="font-bold text-4xl" style="font-family: 'Shadows Into Light', cursive;">FB</span>
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
		</div>
	</div>
</header> 