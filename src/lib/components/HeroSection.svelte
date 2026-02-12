<section id="home" class="hero">
  <div class="hero-container">
    <!-- Text content -->
    <div class="hero-content">
      <h1 class="hero-title">
        Hi, I'm <span class="highlight">Felipe Bereilh</span>
      </h1>
      <p class="hero-subtitle">
        Building systems that learn from data
      </p>
      <p class="hero-description">
        I design and deploy ML systems, from prototype to production.
      </p>
      <div class="hero-buttons">
        <a href="/#contact" class="btn btn-primary">Get in Touch</a>
        <a href="/blog" class="btn btn-secondary">Explore My Work</a>
      </div>
    </div>

    <!-- Hero Image -->
    <div class="hero-image">
      <img 
        src="/hero.png" 
        alt="Felipe Bereilh"
      />
    </div>
  </div>
</section>

<style>
  .hero {
    min-height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;
    padding: 6rem 2rem 4rem;
    background: var(--bg-primary);
  }

  .hero-container {
    max-width: 1200px;
    width: 100%;
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 4rem;
    align-items: center;
  }

  .hero-content {
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
  }

  .hero-title {
    font-size: 3.5rem;
    font-weight: 700;
    line-height: 1.1;
    color: var(--text-primary);
  }

  .highlight {
    color: var(--primary);
  }

  .hero-subtitle {
    font-size: 1.5rem;
    font-weight: 600;
    color: var(--text-secondary);
  }

  .hero-description {
    font-size: 1.125rem;
    line-height: 1.7;
    color: var(--text-secondary);
    max-width: 500px;
  }

  .hero-buttons {
    display: flex;
    gap: 1rem;
    margin-top: 1rem;
  }

  .btn {
    padding: 0.75rem 2rem;
    font-size: 1rem;
    font-weight: 600;
    border-radius: 0.5rem;
    cursor: pointer;
    transition: all 0.2s;
    border: 2px solid transparent;
  }

  .btn-primary {
    background: var(--primary);
    color: white;
  }

  .btn-primary:hover {
    background: var(--primary-hover);
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(30, 64, 175, 0.3);
  }

  .btn-secondary {
    background: white;
    color: var(--primary);
    border-color: var(--primary);
  }

  .btn-secondary:hover {
    background: rgba(30, 64, 175, 0.1);
    transform: translateY(-2px);
  }

  .hero-image {
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .hero-image img {
    width: 100%;
    max-width: 500px;
    height: auto;
    border-radius: 60%;
    transition: transform 0.3s;
  }

  .hero-image img:hover {
    transform: scale(1.05);
  }

  /* Responsive */
  @media (max-width: 1024px) {
    .hero-image img {
      max-width: 300px;
    }
  }

  @media (max-width: 1024px) {
    .hero-container {
      grid-template-columns: 1fr;
      text-align: center;
    }

    .hero-content {
      align-items: center;
    }

    .hero-description {
      margin: 0 auto;
    }

    .hero-buttons {
      justify-content: center;
    }

    .hero-image {
      order: -1;
    }
  }

  @media (max-width: 768px) {
    .hero {
      padding: 5rem 1.5rem 3rem;
    }

    .hero-title {
      font-size: 2.5rem;
    }

    .hero-subtitle {
      font-size: 1.25rem;
    }

    .hero-image img {
      max-width: 300px;
    }

    .hero-buttons {
      flex-direction: column;
      width: 100%;
    }

    .btn {
      width: 100%;
    }
  }
</style> 