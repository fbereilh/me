<script lang="ts">
  // Social media links
  const socialLinks = {
    github: "https://github.com/yourusername",
    linkedin: "https://linkedin.com/in/yourusername"
  };
</script>

<section id="contact" class="min-h-screen py-20 bg-background">
  <div class="container mx-auto px-4">
    <h2 class="text-4xl font-bold text-center mb-12">Get In Touch</h2>
    
    <div class="max-w-3xl mx-auto grid gap-12 md:grid-cols-2">
      <!-- Contact Info -->
      <div class="space-y-6">
        <h3 class="text-2xl font-semibold">Let's Connect</h3>
        <p class="text-muted-foreground">
          Whether you have a project in mind, a question about my work, or just want to say hello, 
          I'd love to hear from you. Feel free to reach out through any of these channels.
        </p>
        
        <div class="space-y-4 mt-8">
          <!-- Email -->
          <div class="flex items-center gap-4">
            <div class="bg-primary/10 p-3 rounded-full">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="text-primary">
                <rect width="20" height="16" x="2" y="4" rx="2"/>
                <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/>
              </svg>
            </div>
            <div>
              <h4 class="font-medium">Email</h4>
              <a href="mailto:hello@example.com" class="text-muted-foreground hover:text-primary transition-colors">
                hello@example.com
              </a>
            </div>
          </div>
          
          <!-- Location -->
          <div class="flex items-center gap-4">
            <div class="bg-primary/10 p-3 rounded-full">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="text-primary">
                <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/>
                <circle cx="12" cy="10" r="3"/>
              </svg>
            </div>
            <div>
              <h4 class="font-medium">Location</h4>
              <span class="text-muted-foreground">Quito, Ecuador</span>
            </div>
          </div>
          
          <!-- Social Media -->
          <div class="flex items-center gap-4 mt-8">
            <a 
              href={socialLinks.github} 
              target="_blank" 
              rel="noopener noreferrer" 
              aria-label="GitHub Profile"
              class="bg-background border border-border hover:bg-accent hover:text-accent-foreground transition-colors p-3 rounded-full"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"/>
                <path d="M9 18c-4.51 2-5-2-7-2"/>
              </svg>
            </a>
           
            <div class="flex items-center mt-4">
              <a href="https://www.linkedin.com/in/felipebereilh/" target="_blank" rel="noopener noreferrer" 
                 class="flex items-center gap-2 px-4 py-2 bg-[#0077B5]/10 text-[#0077B5] rounded-lg hover:bg-[#0077B5]/20 transition-colors">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                </svg>
                <span>LinkedIn</span>
              </a>
            </div>
          </div>
        </div>
      </div>
      
      <!-- Contact Form -->
      <div class="bg-card p-8 rounded-lg border border-border">
        <h3 class="text-2xl font-semibold mb-4">Send a Message</h3>
        <form class="space-y-4">
          <div>
            <label for="name" class="block text-sm font-medium mb-1">Name</label>
            <input 
              type="text" 
              id="name" 
              placeholder="Your name" 
              class="w-full h-10 px-3 rounded-md border border-input bg-background text-sm ring-offset-background"
            />
          </div>
          <div>
            <label for="email" class="block text-sm font-medium mb-1">Email</label>
            <input 
              type="email" 
              id="email" 
              placeholder="Your email" 
              class="w-full h-10 px-3 rounded-md border border-input bg-background text-sm ring-offset-background"
            />
          </div>
          <div>
            <label for="message" class="block text-sm font-medium mb-1">Message</label>
            <textarea 
              id="message" 
              rows="4" 
              placeholder="Your message" 
              class="w-full px-3 py-2 rounded-md border border-input bg-background text-sm ring-offset-background resize-none"
            ></textarea>
          </div>
          <button 
            type="submit" 
            class="w-full inline-flex h-10 items-center justify-center rounded-md bg-primary px-4 text-sm font-medium text-primary-foreground ring-offset-background transition-colors hover:bg-primary/90"
          >
            Send Message
          </button>
        </form>
      </div>
    </div>
  </div>
</section> 