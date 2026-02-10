<script lang="ts">
  const currentYear = new Date().getFullYear();
</script>

<footer class="footer">
  <div class="footer-container">
    <div class="footer-content">
      <!-- Copyright -->
      <div class="copyright">
        <span>© {currentYear} Felipe Bereilh</span>
      </div>
      
      <!-- Social Links -->
      <div class="social-links">
        <a 
          href="https://github.com/felipebereilh"
          target="_blank" 
          rel="noopener noreferrer" 
          aria-label="GitHub"
          class="social-icon"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"/>
            <path d="M9 18c-4.51 2-5-2-7-2"/>
          </svg>
        </a>
        <a 
          href="https://linkedin.com/in/felipebereilh"
          target="_blank" 
          rel="noopener noreferrer" 
          aria-label="LinkedIn"
          class="social-icon"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/>
            <rect width="4" height="12" x="2" y="9"/>
            <circle cx="4" cy="4" r="2"/>
          </svg>
        </a>
      </div>
    </div>
  </div>
</footer>

<style>
  .footer {
    padding: 2.5rem 2rem;
    background: var(--bg-primary);
    border-top: 1px solid var(--border);
  }

  .footer-container {
    max-width: 1200px;
    margin: 0 auto;
  }

  .footer-content {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .copyright {
    font-size: 0.875rem;
    color: var(--text-secondary);
  }

  .social-links {
    display: flex;
    gap: 1rem;
  }

  .social-icon {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 2.5rem;
    height: 2.5rem;
    border-radius: 50%;
    color: var(--text-secondary);
    transition: all 0.2s;
  }

  .social-icon:hover {
    color: var(--primary);
    background: rgba(30, 64, 175, 0.1);
  }

  /* Responsive */
  @media (max-width: 768px) {
    .footer {
      padding: 2rem 1.5rem;
    }

    .footer-content {
      flex-direction: column;
      gap: 1.5rem;
    }
  }
</style> 