<script lang="ts">
	import type { PageData } from './$types';

	let { data }: { data: PageData } = $props();

	const post = $derived(data.post);
</script>

<svelte:head>
	<!-- Syntax highlighting and friends, lifted straight out of Quarto's rendered page. -->
	{#each data.stylesheets as stylesheet (stylesheet)}
		<link rel="stylesheet" href={stylesheet} />
	{/each}
	{@html `<style>${data.css}</style>`}
</svelte:head>

<div class="post-page">
	<article class="post">
		<header class="post-header">
			<h1 class="post-title">{post.title}</h1>
			{#if post.description}
				<p class="post-subtitle">{post.description}</p>
			{/if}
			<div class="post-meta">
				{#if post.date}
					<time datetime={post.date}>{post.displayDate}</time>
				{/if}
				<span>{data.readingTimeMinutes} min read</span>
			</div>
			{#if post.categories.length > 0}
				<div class="post-categories">
					{#each post.categories as category (category)}
						<span class="tag">{category}</span>
					{/each}
				</div>
			{/if}
		</header>

		<div class="post-content">
			{@html data.html}
		</div>

		<footer class="post-footer">
			<a class="back-link" href="/blog">← Back to all posts</a>
		</footer>
	</article>
</div>

<style>
	.post-page {
		min-height: 100vh;
		padding: 6rem 2rem 4rem;
		background: var(--bg-primary);
	}

	.post {
		max-width: 900px;
		margin: 0 auto;
		background: white;
		padding: 3rem;
		border-radius: 1rem;
		box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
		font-size: 1.125rem;
		line-height: 1.75;
	}

	.post-header {
		margin-bottom: 2.5rem;
	}

	.post-title {
		font-size: 2.75rem;
		font-weight: 700;
		color: var(--text-primary);
		line-height: 1.2;
		letter-spacing: -0.025em;
		margin-bottom: 1rem;
	}

	.post-subtitle {
		font-size: 1.25rem;
		color: var(--text-secondary);
		line-height: 1.6;
		margin-bottom: 1.25rem;
	}

	.post-meta {
		display: flex;
		flex-wrap: wrap;
		gap: 0.75rem;
		font-size: 0.875rem;
		font-weight: 500;
		text-transform: uppercase;
		letter-spacing: 0.05em;
		color: var(--text-secondary);
	}

	.post-meta > :not(:first-child)::before {
		content: '·';
		margin-right: 0.75rem;
	}

	.post-categories {
		display: flex;
		flex-wrap: wrap;
		gap: 0.5rem;
		margin-top: 1rem;
	}

	.tag {
		padding: 0.375rem 0.875rem;
		background: linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%);
		border-radius: 1.25rem;
		font-size: 0.75rem;
		color: var(--text-primary);
		font-weight: 600;
		text-transform: uppercase;
		letter-spacing: 0.05em;
	}

	.post-footer {
		margin-top: 3rem;
		padding-top: 2rem;
		border-top: 2px solid var(--border);
	}

	.back-link {
		color: var(--primary);
		font-weight: 700;
		font-size: 0.875rem;
	}

	/* Responsive */
	@media (max-width: 768px) {
		.post-page {
			padding: 5rem 1rem 3rem;
		}

		.post {
			padding: 2rem 1.5rem;
		}

		.post-title {
			font-size: 2rem;
		}
	}

	/* Style the Quarto content */
	:global(.post-content h1) {
		font-size: 2.75rem;
		font-weight: 700;
		color: var(--text-primary);
		margin-bottom: 1.5rem;
		line-height: 1.2;
		letter-spacing: -0.025em;
	}

	:global(.post-content h2) {
		font-size: 2rem;
		font-weight: 600;
		color: var(--text-primary);
		margin-top: 3rem;
		margin-bottom: 1rem;
		line-height: 1.3;
		letter-spacing: -0.02em;
	}

	:global(.post-content h3) {
		font-size: 1.5rem;
		font-weight: 600;
		color: var(--text-primary);
		margin-top: 2rem;
		margin-bottom: 8.75rem;
		line-height: 1.4;
	}

	:global(.post-content p) {
		line-height: 1.8;
		color: var(--text-primary);
		margin-bottom: 1.25rem;
	}

	:global(.post-content strong) {
		font-weight: 600;
	}

	:global(.post-content em) {
		font-style: italic;
	}

	:global(.post-content li) {
		color: var(--text-primary);
		margin-bottom: 0.75rem;
		line-height: 1.7;
	}

	:global(.post-content ul),
	:global(.post-content ol) {
		margin: 1rem 0;
		padding-left: 1.5rem;
	}

	:global(.post-content blockquote) {
		color: var(--text-secondary);
		border-left: 4px solid var(--primary);
		padding-left: 1.5rem;
		margin: 1.5rem 0;
		font-style: italic;
	}

	:global(.post-content hr) {
		border: none;
		border-top: 2px solid var(--border);
		margin: 3rem 0;
	}

	:global(.post-content img) {
		max-width: 100%;
		height: auto;
		border-radius: 0.5rem;
		margin: 1.5rem 0;
	}

	:global(.post-content div.sourceCode) {
		background: #f8fafc !important;
		padding: 0 !important;
		border-radius: 0.5rem !important;
		overflow-x: auto;
		margin: 1rem 0 !important;
		border: 1px solid #e2e8f0;
	}

	/* When a cell contains both code and output, group them */
	:global(.post-content .cell:has(.cell-output)) {
		margin: 1rem 0 !important;
	}

	:global(.post-content .cell:has(.cell-output) .code-copy-outer-scaffold) {
		margin: 0 !important;
		display: block !important;
		line-height: 0 !important;
		font-size: 0 !important;
	}

	:global(.post-content .cell:has(.cell-output) .sourceCode),
	:global(.post-content .cell:has(.cell-output) .cell-code) {
		margin: 0 !important;
		border-bottom-left-radius: 0 !important;
		border-bottom-right-radius: 0 !important;
		border-bottom: none !important;
	}

	:global(.post-content .cell-output),
	:global(.post-content .cell-output-stdout) {
		background: #ffffff !important;
		border: 1px solid #e2e8f0 !important;
		border-left: 4px solid var(--primary) !important;
		padding: 0 !important;
		border-radius: 0.5rem !important;
		margin: 0 !important;
		overflow: hidden;
	}

	/* When output is in same cell as code, connect them */
	:global(.post-content .cell .cell-output) {
		margin: -3px 0 0 0 !important;
		border-top-left-radius: 0 !important;
		border-top-right-radius: 0 !important;
	}

	/* Add spacing after cells with outputs */
	:global(.post-content .cell:has(.cell-output)) {
		margin-bottom: 1rem !important;
	}

	:global(.post-content div.sourceCode pre) {
		background: transparent !important;
		border: none !important;
		margin: 0 !important;
		padding: 1rem !important;
	}

	:global(.post-content pre) {
		background: #f8fafc !important;
		padding: 1rem !important;
		border-radius: 0.5rem !important;
		overflow-x: auto;
		margin: 1rem 0;
		border: 1px solid #e2e8f0;
	}

	:global(.post-content .cell-output),
	:global(.post-content .cell-output-stdout) {
		background: #ffffff !important;
		border: 1px solid #e2e8f0 !important;
		border-left: 4px solid var(--primary) !important;
		padding: 0 !important;
		border-radius: 0.5rem !important;
		margin: 1rem 0;
		overflow: hidden;
	}

	:global(.post-content .cell-output pre),
	:global(.post-content .cell-output-stdout pre) {
		background: transparent !important;
		border: none !important;
		margin: 0 !important;
		padding: 1rem !important;
		border-radius: 0 !important;
		color: var(--text-primary);
	}

	:global(.post-content code) {
		font-family: 'Monaco', 'Courier New', monospace;
		font-size: 0.875rem;
	}
</style>
