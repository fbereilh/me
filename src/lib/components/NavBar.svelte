<nav class="navbar">
  <a href="/" class="logo">Felipe Bereilh</a>
  <div class="nav-links">
    <a href="/blog">Blog</a>
    <a href="/#about">About</a>
    <a href="/#contact">Contact</a>
  </div>
</nav>

<style>
  .navbar {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    z-index: 50;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 1rem 2rem;
    background: rgba(255, 255, 255, 0.8);
    backdrop-filter: blur(10px);
    -webkit-backdrop-filter: blur(10px);
    border-bottom: 1px solid var(--border);
  }

  .logo {
    font-size: 1.25rem;
    font-weight: 700;
    color: var(--text-primary);
  }

  .nav-links {
    display: flex;
    gap: 1rem;
  }

  .nav-links a {
    padding: 0.5rem 1rem;
    font-weight: 500;
    color: var(--text-secondary);
    border-radius: 0.375rem;
    transition: all 0.2s;
  }

  .nav-links a:hover {
    color: var(--primary);
    background: rgba(30, 64, 175, 0.1);
  }
</style>
