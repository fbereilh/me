<script lang="ts">
  import { Footer } from '$lib/components/index';
  
  interface Post {
    title: string;
    date: string;
    description: string;
    slug: string;
    categories?: string[];
  }

  // Get posts from server-side load function
  export let data: { posts: Post[] };
  const posts = data.posts;

  // Get unique categories from all posts
  let allCategories = [...new Set(posts.flatMap(p => p.categories || []))];
  let selectedCategory: string | null = null;

  // Filter posts by selected category
  $: filteredPosts = selectedCategory
    ? posts.filter(p => p.categories?.includes(selectedCategory as string))
    : posts;
</script>

<svelte:head>
  <title>Blog - Felipe Bereilh | Data Science & ML Articles</title>
  <meta name="description" content="Thoughts on data science, machine learning, and production ML systems. Jupyter notebooks and technical articles by Felipe Bereilh." />
</svelte:head>

<section class="blog">
  <div class="blog-container">
    <h1 class="page-title">Blog</h1>
    <p class="page-description">
      Thoughts on data, ML, and things I'm learning along the way.
    </p>

    <!-- Category filters -->
    {#if allCategories.length > 0}
      <div class="filters">
        <button 
          class="filter-pill" 
          class:active={selectedCategory === null}
          on:click={() => selectedCategory = null}
        >
          All
        </button>
        {#each allCategories as category}
          <button 
            class="filter-pill" 
            class:active={selectedCategory === category}
            on:click={() => selectedCategory = category}
          >
            {category}
          </button>
        {/each}
      </div>
    {/if}

    <div class="posts-grid">
      {#each filteredPosts as post}
        <a href="/blog/{post.slug}" class="post-card">
          <h2 class="post-title">{post.title}</h2>
          <time class="post-date">{post.date}</time>
          <p class="post-description">{post.description}</p>
          {#if post.categories && post.categories.length > 0}
            <div class="post-tags">
              {#each post.categories as category}
                <span class="tag">{category}</span>
              {/each}
            </div>
          {/if}
          <span class="read-more">Read more →</span>
        </a>
      {/each}
    </div>
  </div>
</section>

<Footer />

<style>
  .blog {
    min-height: 100vh;
    padding: 6rem 2rem 4rem;
    background: var(--bg-primary);
  }

  .blog-container {
    max-width: 1200px;
    margin: 0 auto;
  }

  .page-title {
    font-size: 3.5rem;
    font-weight: 700;
    color: var(--text-primary);
    margin-bottom: 1rem;
  }

  .page-description {
    font-size: 1.25rem;
    color: var(--text-secondary);
    margin-bottom: 3rem;
  }

  .filters {
    display: flex;
    gap: 0.75rem;
    flex-wrap: wrap;
    margin-bottom: 3rem;
  }

  .filter-pill {
    padding: 0.5rem 1rem;
    background: white;
    border: 2px solid var(--border);
    border-radius: 2rem;
    color: var(--text-secondary);
    font-size: 0.875rem;
    font-weight: 500;
    cursor: pointer;
    transition: all 0.2s;
  }

  .filter-pill:hover {
    border-color: var(--primary);
    color: var(--primary);
  }

  .filter-pill.active {
    background: var(--primary);
    border-color: var(--primary);
    color: white;
  }

  .posts-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
    gap: 2rem;
  }

  .post-card {
    background: #ffffff;
    border: 2px solid transparent;
    border-radius: 1.25rem;
    padding: 2.5rem;
    transition: all 0.3s ease;
    display: flex;
    flex-direction: column;
    gap: 1rem;
    position: relative;
    overflow: hidden;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.04);
  }

  .post-card::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 4px;
    background: linear-gradient(90deg, var(--primary), #6366f1);
    transform: scaleX(0);
    transform-origin: left;
    transition: transform 0.3s ease;
  }

  .post-card:hover {
    transform: translateY(-6px);
    box-shadow: 0 12px 24px rgba(0, 0, 0, 0.08);
    border-color: var(--border);
  }

  .post-card:hover::before {
    transform: scaleX(1);
  }

  .post-title {
    font-size: 1.625rem;
    font-weight: 700;
    color: var(--text-primary);
    line-height: 1.3;
    letter-spacing: -0.02em;
  }

  .post-date {
    font-size: 0.875rem;
    color: var(--text-secondary);
    font-weight: 500;
    text-transform: uppercase;
    letter-spacing: 0.05em;
  }

  .post-description {
    color: var(--text-secondary);
    line-height: 1.7;
    flex-grow: 1;
    font-size: 1rem;
  }

  .post-tags {
    display: flex;
    flex-wrap: wrap;
    gap: 0.5rem;
    margin-top: 0.5rem;
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

  .read-more {
    color: var(--primary);
    font-weight: 700;
    font-size: 0.875rem;
    display: inline-flex;
    align-items: center;
    gap: 0.5rem;
    transition: gap 0.2s ease;
  }

  .post-card:hover .read-more {
    gap: 0.75rem;
  }

  /* Responsive */
  @media (max-width: 768px) {
    .blog {
      padding: 5rem 1.5rem 3rem;
    }

    .page-title {
      font-size: 2.5rem;
    }

    .posts-grid {
      grid-template-columns: 1fr;
    }
  }
</style>
