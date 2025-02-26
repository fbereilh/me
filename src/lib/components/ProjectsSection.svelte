<script lang="ts">
  import { onMount } from 'svelte';

  interface Project {
    title: string;
    description: string;
    image: string;
    technologies: string[];
    link: string;
    github?: string;
  }

  const projects: Project[] = [
    {
      title: "Project 1",
      description: "A brief description of project 1. This could be a few sentences about what the project does and what technologies it uses.",
      image: "/project1.jpg",
      technologies: ["React", "Node.js", "MongoDB"],
      link: "https://project1.com",
      github: "https://github.com/username/project1"
    },
    {
      title: "Project 2",
      description: "A brief description of project 2. Highlighting the main features and technical challenges overcome.",
      image: "/project2.jpg",
      technologies: ["Vue", "Express", "PostgreSQL"],
      link: "https://project2.com"
    },
    {
      title: "Project 3",
      description: "A brief description of project 3. Focusing on the problem solved and the solution implemented.",
      image: "/project3.jpg",
      technologies: ["Svelte", "FastAPI", "Redis"],
      link: "https://project3.com",
      github: "https://github.com/username/project3"
    }
  ];

  let currentIndex = 0;
  let isTransitioning = false;

  function nextProject() {
    if (isTransitioning) return;
    isTransitioning = true;
    currentIndex = (currentIndex + 1) % projects.length;
    setTimeout(() => {
      isTransitioning = false;
    }, 500);
  }

  function prevProject() {
    if (isTransitioning) return;
    isTransitioning = true;
    currentIndex = (currentIndex - 1 + projects.length) % projects.length;
    setTimeout(() => {
      isTransitioning = false;
    }, 500);
  }

  let autoplayInterval: number;

  onMount(() => {
    // Start autoplay
    autoplayInterval = setInterval(nextProject, 5000);

    return () => {
      clearInterval(autoplayInterval);
    };
  });
</script>

<section id="projects" class="min-h-screen bg-background py-20">
  <div class="container mx-auto px-4">
    <h2 class="text-4xl font-bold text-center mb-12">Projects</h2>
    
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {#each projects as project}
        <div class="group relative bg-card rounded-xl overflow-hidden border border-border hover:border-primary/50 transition-all duration-300">
          <!-- Image -->
          <div class="relative aspect-video overflow-hidden">
            <img
              src={project.image}
              alt={project.title}
              class="object-cover w-full h-full group-hover:scale-105 transition-transform duration-300"
            />
          </div>

          <!-- Content -->
          <div class="p-6 space-y-4">
            <h3 class="text-xl font-bold">{project.title}</h3>
            <p class="text-muted-foreground text-sm line-clamp-3">{project.description}</p>

            <!-- Technologies -->
            <div class="flex flex-wrap gap-2">
              {#each project.technologies as tech}
                <span class="px-2 py-1 rounded-full bg-primary/10 text-primary text-xs">
                  {tech}
                </span>
              {/each}
            </div>

            <!-- Links -->
            <div class="flex gap-3 pt-2">
              <a
                href={project.link}
                target="_blank"
                rel="noopener noreferrer"
                class="inline-flex h-9 items-center justify-center rounded-md bg-primary px-4 text-sm font-medium text-primary-foreground ring-offset-background transition-colors hover:bg-primary/90 flex-1"
              >
                View Project
              </a>
              {#if project.github}
                <a
                  href={project.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="View project on GitHub"
                  class="inline-flex h-9 items-center justify-center rounded-md border border-input hover:bg-accent hover:text-accent-foreground px-4"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-github">
                    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"/>
                    <path d="M9 18c-4.51 2-5-2-7-2"/>
                  </svg>
                </a>
              {/if}
            </div>
          </div>
        </div>
      {/each}
    </div>
  </div>
</section>

<style>
  .line-clamp-3 {
    display: -webkit-box;
    -webkit-line-clamp: 3;
    line-clamp: 3;
    -webkit-box-orient: vertical;
    overflow: hidden;
  }
</style> 