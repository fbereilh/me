<script lang="ts">
	import { page } from '$app/state';

	const heading = $derived(page.status === 404 ? 'Page not found' : 'Something went wrong');
	const message = $derived(
		page.status === 404
			? "That page doesn't exist - it may have moved, or never existed at all."
			: (page.error?.message ?? 'An unexpected error occurred.')
	);
</script>

<section class="error">
	<p class="status">{page.status}</p>
	<h1 class="heading">{heading}</h1>
	<p class="message">{message}</p>
	<div class="actions">
		<a class="action" href="/blog">Read the blog</a>
		<a class="action secondary" href="/">Go home</a>
	</div>
</section>

<style>
	.error {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		/* Fill the space between the nav bar and the footer instead of leaving a void. */
		min-height: calc(100vh - 14rem);
		max-width: 42rem;
		margin: 0 auto;
		padding: 4rem 2rem;
		text-align: center;
	}

	.status {
		font-size: 1rem;
		font-weight: 700;
		letter-spacing: 0.2em;
		text-transform: uppercase;
		color: var(--primary);
	}

	.heading {
		font-size: 2.5rem;
		font-weight: 700;
		color: var(--text-primary);
		margin: 0.75rem 0 1rem;
		line-height: 1.2;
	}

	.message {
		font-size: 1.125rem;
		color: var(--text-secondary);
		line-height: 1.7;
	}

	.actions {
		display: flex;
		justify-content: center;
		gap: 1rem;
		flex-wrap: wrap;
		margin-top: 2rem;
	}

	.action {
		padding: 0.75rem 1.5rem;
		border-radius: 2rem;
		background: var(--primary);
		color: white;
		font-weight: 600;
	}

	.action.secondary {
		background: transparent;
		border: 2px solid var(--border);
		color: var(--text-primary);
	}
</style>
