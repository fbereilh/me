<script lang="ts">
  import TiltCard from '$lib/components/ui/tilt/TiltCard.svelte';

  interface Project {
    title: string;
    description: string;
    image: string;
    technologies: string[];
    link: string;
  }

  const projects: Project[] = [
    {
      title: "Project 1",
      description: "A brief description of project 1. This could be a few sentences about what the project does and what technologies it uses.",
      image: "/project1.jpg",
      technologies: ["React", "Node.js", "MongoDB"],
      link: "/projects/project1"
    },
    {
      title: "Project 2",
      description: "A brief description of project 2. Highlighting the main features and technical challenges overcome.",
      image: "/project2.jpg",
      technologies: ["Vue", "Express", "PostgreSQL"],
      link: "/projects/project2"
    },
    {
      title: "Project 3",
      description: "A brief description of project 3. Focusing on the problem solved and the solution implemented.",
      image: "/project3.jpg",
      technologies: ["Svelte", "FastAPI", "Redis"],
      link: "/projects/project3"
    }
  ];
</script>

<section id="projects" class="min-h-screen bg-background py-20">
  <div class="container mx-auto px-4">
    <h2 class="text-4xl font-bold text-center mb-12">Projects</h2>
    
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {#each projects as project}
        <TiltCard>
          <div class="group relative bg-card rounded-xl overflow-hidden border border-border hover:border-primary/50 transition-colors duration-300 h-full flex flex-col">
            <!-- Image -->
            <div class="relative aspect-video overflow-hidden">
              <img
                src={project.image}
                alt={project.title}
                class="object-cover w-full h-full group-hover:scale-105 transition-transform duration-300"
              />
            </div>

            <!-- Content -->
            <div class="p-6 space-y-4 flex flex-col flex-grow">
              <h3 class="text-xl font-bold">{project.title}</h3>
              <p class="text-muted-foreground text-sm line-clamp-3 flex-grow">{project.description}</p>

              <!-- Technologies -->
              <div class="flex flex-wrap gap-2">
                {#each project.technologies as tech}
                  <span class="px-2 py-1 rounded-full bg-primary/10 text-primary text-xs">
                    {tech}
                  </span>
                {/each}
              </div>

              <!-- Link -->
              <a
                href={project.link}
                class="inline-flex h-9 items-center justify-center rounded-md bg-primary px-4 text-sm font-medium text-primary-foreground ring-offset-background transition-colors hover:bg-primary/90 w-full mt-2"
              >
                View Project
              </a>
            </div>
          </div>
        </TiltCard>
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