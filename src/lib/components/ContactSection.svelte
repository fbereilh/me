<script lang="ts">
  // Social media links
  const socialLinks = {
    github: "https://github.com/fbereilh",
    linkedin: "https://linkedin.com/in/felipebereilh",
    email: "mailto:felipe@bereilh.com"
  };
</script>

<section id="contact" class="contact">
  <div class="contact-container">
    <h2 class="section-title">
      Let's <span class="highlight">Talk</span> 💬
    </h2>
    
    <div class="contact-card">
      <p class="contact-text">
        Working on something interesting? Need a second opinion on your ML pipeline? 
        Or just want to chat about data? Drop me a line.
      </p>
      
      <!-- Social Links -->
      <div class="social-links">

        <a 
          href={socialLinks.linkedin} 
          target="_blank" 
          rel="noopener noreferrer" 
          class="social-link"
          aria-label="LinkedIn Profile"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
            <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
          </svg>
          <span>LinkedIn</span>
        </a>
        
        <a 
          href={socialLinks.github} 
          target="_blank" 
          rel="noopener noreferrer" 
          class="social-link"
          aria-label="GitHub Profile"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"/>
            <path d="M9 18c-4.51 2-5-2-7-2"/>
          </svg>
          <span>GitHub</span>
        </a>
      </div>
    </div>
  </div>
</section>

<style>
  .contact {
    padding: 5rem 2rem;
    background: var(--bg-primary);
  }

  .contact-container {
    max-width: 800px;
    margin: 0 auto;
  }

  .section-title {
    font-size: 3rem;
    font-weight: 700;
    text-align: center;
    margin-bottom: 3rem;
    color: var(--text-primary);
  }

  .highlight {
    color: var(--primary);
  }

  .contact-card {
    background: #ffffff;
    border: 1px solid var(--border);
    border-radius: 1rem;
    padding: 3rem;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 2.5rem;
    transition: all 0.3s;
  }

  .contact-card:hover {
    box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1);
    transform: translateY(-4px);
  }

  .contact-text {
    font-size: 1.125rem;
    line-height: 1.7;
    color: var(--text-secondary);
    text-align: center;
    max-width: 600px;
  }

  .social-links {
    display: flex;
    gap: 1.5rem;
    flex-wrap: wrap;
    justify-content: center;
  }

  .social-link {
    display: flex;
    align-items: center;
    gap: 0.75rem;
    padding: 0.875rem 1.5rem;
    background: var(--bg-primary);
    border: 2px solid var(--primary);
    border-radius: 0.5rem;
    color: var(--primary);
    font-weight: 600;
    transition: all 0.2s;
  }

  .social-link:hover {
    background: var(--primary);
    color: white;
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(30, 64, 175, 0.2);
  }

  .social-link svg {
    flex-shrink: 0;
  }

  /* Responsive */
  @media (max-width: 768px) {
    .contact {
      padding: 4rem 1.5rem;
    }

    .section-title {
      font-size: 2.5rem;
    }

    .contact-card {
      padding: 2rem 1.5rem;
    }

    .social-links {
      flex-direction: column;
      width: 100%;
    }

    .social-link {
      width: 100%;
      justify-content: center;
    }
  }
</style> 