<script lang="ts">
</script>

<section id="home" class="relative min-h-screen flex flex-col bg-background overflow-hidden">
  <div class="container mx-auto px-6 py-6 flex flex-col h-screen">
    <!-- Main content area - explicitly limit height to leave room for arrow -->
    <div class="flex items-center h-[85vh] md:h-[88vh]">
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center w-full">
        <!-- Left side - Text content -->
        <div class="space-y-6 text-center lg:text-left animate-fadeIn">
          <h1 class="text-5xl md:text-7xl font-bold tracking-tighter">
            Felipe <span class="text-primary">Bereilh</span>
          </h1>
          <p class="text-xl md:text-2xl text-muted-foreground">
            Data Scientist & Machine Learning Engineer
          </p>
          <p class="text-lg text-muted-foreground/80 max-w-md mx-auto lg:mx-0">
            Transforming complex data into actionable insights through advanced analytics and machine learning solutions.
          </p>
          <div class="flex gap-6 pt-4 justify-center lg:justify-start">
            <a href="#contact" class="inline-flex h-11 items-center justify-center rounded-md bg-primary px-8 text-sm font-medium text-primary-foreground ring-offset-background transition-all hover:bg-primary/90 hover:shadow-lg hover:translate-y-[-2px]">
              Contact Me
            </a>
            <a href="#projects" class="inline-flex h-11 items-center justify-center rounded-md border border-primary/20 bg-background px-8 text-sm font-medium ring-offset-background transition-all hover:bg-primary/10 hover:border-primary/50 hover:translate-y-[-2px]">
              View Projects
            </a>
          </div>
        </div>

        <!-- Right side - Hero Image as a circle -->
        <div class="relative w-full h-full flex items-center justify-center order-first lg:order-last">
          <div class="relative w-[300px] h-[300px] md:w-[650px] md:h-[650px] rounded-full overflow-hidden  shadow-xl animate-fadeIn">

            
            <!-- Portrait image -->
            <img 
              src="/hero.png" 
              alt="Felipe Bereilh" 
              class="absolute inset-0 w-full h-full object-cover mix-blend-normal"
            />

          </div>
        </div>
      </div>
    </div>
    
    <!-- Scroll indicator - now positioned as an absolute element at the bottom -->
    <div class="sticky bottom-4 left-0 right-0 flex justify-center">
      <a href="#about" class="animate-bounce rounded-full bg-background/80 backdrop-blur-sm p-3 shadow-md border border-border/10 text-primary hover:text-primary/90 transition-colors">
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <path d="M12 5v14M5 12l7 7 7-7"/>
        </svg>
      </a>
    </div>
  </div>
</section>

<style>
  @keyframes fadeIn {
    from { opacity: 0; transform: translateY(10px); }
    to { opacity: 1; transform: translateY(0); }
  }
  
  .animate-fadeIn {
    animation: fadeIn 0.8s ease-out;
  }
  
  @keyframes bounce {
    0%, 100% {
      transform: translateY(0);
    }
    50% {
      transform: translateY(-8px);
    }
  }
  
  .animate-bounce {
    animation: bounce 2s infinite;
  }
</style> 