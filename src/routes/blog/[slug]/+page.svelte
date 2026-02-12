<script lang="ts">
  import { page } from '$app/stores';
  import { onMount } from 'svelte';

  let postContent = '';
  let loading = true;
  let styles = '';
  let stylesheets: string[] = [];

  onMount(async () => {
    try {
      const response = await fetch(`/posts/${$page.params.slug}.html`);
      
      if (!response.ok) {
        throw new Error(`Failed to load post: ${response.status}`);
      }
      
      const html = await response.text();
      
      // Extract just the body content
      const parser = new DOMParser();
      const doc = parser.parseFromString(html, 'text/html');
      const main = doc.querySelector('main') || doc.querySelector('body');
      
      // Extract inline styles from head
      const styleElements = doc.querySelectorAll('style');
      styles = Array.from(styleElements).map(style => style.textContent).join('\n');
      
      // Extract external stylesheets - but exclude Bootstrap to avoid layout issues
      const linkElements = doc.querySelectorAll('link[rel="stylesheet"]');
      stylesheets = Array.from(linkElements)
        .filter(link => {
          const href = link.getAttribute('href');
          // Only include syntax highlighting CSS, exclude Bootstrap
          return href && href.includes('syntax-highlighting');
        })
        .map(link => {
          const href = link.getAttribute('href');
          if (href && !href.startsWith('http') && !href.startsWith('/')) {
            return `/posts/${href}`;
          }
          return href;
        }).filter(Boolean) as string[];
      
      if (main) {
        // Fix relative image paths
        const images = main.querySelectorAll('img');
        images.forEach(img => {
          const src = img.getAttribute('src');
          if (src && !src.startsWith('http') && !src.startsWith('/')) {
            img.setAttribute('src', `/posts/${src}`);
          }
        });
        
        postContent = main.innerHTML;
      } else {
        postContent = '<p>Could not load post content</p>';
      }
      
      // Remove Quarto body classes that cause layout issues
      document.body.classList.remove('quarto-light', 'fullcontent');
      
    } catch (error) {
      console.error('Failed to load post:', error);
      postContent = `<p>Error loading post: ${error}</p>`;
    } finally {
      loading = false;
    }
  });
</script>

<svelte:head>
  {#each stylesheets as stylesheet}
    <link rel="stylesheet" href={stylesheet}>
  {/each}
  {#if styles}
    {@html `<style>${styles}</style>`}
  {/if}
  <!-- Override Quarto styles immediately -->
  <style>
    #quarto-content,
    .page-columns,
    .page-rows-contents,
    body.quarto-light {
      padding: 0 !important;
      margin: 0 !important;
      max-width: 100% !important;
      width: 100% !important;
    }
    .column-page,
    .column-body {
      max-width: 100% !important;
      width: 100% !important;
    }
  </style>
</svelte:head>

<div class="post-page">
  {#if loading}
    <div class="loading">Loading...</div>
  {:else}
    <article class="post-content">
      {@html postContent}
    </article>
  {/if}
</div>

<style>
  .post-page {
    min-height: 100vh;
    padding: 6rem 2rem 4rem;
    background: var(--bg-primary);
  }

  .loading {
    text-align: center;
    padding: 4rem;
    color: var(--text-secondary);
  }

  .post-content {
    max-width: 900px;
    margin: 0 auto;
    background: white;
    padding: 3rem;
    border-radius: 1rem;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Inter', 'Roboto', 'Helvetica Neue', Arial, sans-serif;
    font-size: 1.125rem;
    line-height: 1.75;
  }

  /* Override Quarto's page layout */
  :global(#quarto-content),
  :global(.page-columns),
  :global(.page-rows-contents),
  :global(body) {
    padding: 0 !important;
    margin: 0 !important;
    max-width: 100% !important;
    width: 100% !important;
  }

  :global(.column-page),
  :global(.column-body) {
    max-width: 100% !important;
    width: 100% !important;
  }

  /* Hide Quarto's title block metadata */
  :global(.post-content #title-block-header) {
    display: none;
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

  /* Responsive */
  @media (max-width: 768px) {
    .post-page {
      padding: 5rem 1rem 3rem;
    }

    .post-content {
      padding: 2rem 1.5rem;
    }
  }
</style>
