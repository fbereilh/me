<script lang="ts">
  // Social media links
  const socialLinks = {
    github: "https://github.com/yourusername",
    linkedin: "https://linkedin.com/in/yourusername"
  };
</script>

<section id="contact" class="min-h-screen py-20 bg-background">
  <div class="container mx-auto px-4">
    <div class="max-w-2xl mx-auto text-center space-y-8">
      <h2 class="text-4xl font-bold mb-6">Get In Touch</h2>
      
      <p class="text-lg text-muted-foreground leading-relaxed">
        Whether you have a project in mind, a question about my work, or just want to say hello, 
        I'd love to hear from you. Feel free to connect with me on LinkedIn or check out my projects on GitHub.
      </p>
      
      <!-- Social Media Icons -->
      <div class="flex items-center justify-center gap-12 mt-12">
        <a 
          href={socialLinks.github} 
          target="_blank" 
          rel="noopener noreferrer" 
          aria-label="GitHub Profile"
          class="social-icon github p-4 rounded-full transition-all duration-300"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
            <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"/>
            <path d="M9 18c-4.51 2-5-2-7-2"/>
          </svg>
        </a>
        
        <a 
          href={socialLinks.linkedin} 
          target="_blank" 
          rel="noopener noreferrer" 
          aria-label="LinkedIn Profile"
          class="social-icon linkedin p-4 rounded-full transition-all duration-300"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="currentColor">
            <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
          </svg>
        </a>
      </div>
    </div>
  </div>
</section>

<style>
  .social-icon {
    transition: all 0.3s ease;
  }

  .social-icon:hover {
    transform: translateY(-3px);
  }

  .social-icon.github:hover {
    color: #171515;
  }

  .social-icon.linkedin:hover {
    color: #0077B5;
  }
</style> 