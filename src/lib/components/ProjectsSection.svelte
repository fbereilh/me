<script lang="ts">
  import CardWrapper from '$lib/components/ui/card/CardWrapper.svelte';
  import { goto } from '$app/navigation';

  interface Project {
    title: string;
    description: string;
    image: string;
    technologies: string[];
    link: string;
  }

  const projects: Project[] = [
    {
      title: "Advanced Time Series Forecasting",
      description: "Developed a state-of-the-art forecasting system using ensemble methods and deep learning, achieving 30% improvement in prediction accuracy for complex time series data.",
      image: "/project1.jpg",
      technologies: ["PyTorch", "Prophet", "PySpark", "MLflow"],
      link: "/projects/project1"
    },
    {
      title: "Climate Data Analysis Platform",
      description: "Interactive platform for climate data analysis using distributed computing and advanced visualization techniques. Processes terabytes of satellite data in near real-time.",
      image: "/project2.jpg",
      technologies: ["Python", "Dask", "D3.js", "FastAPI"],
      link: "/projects/project2"
    },
    {
      title: "Neural Network Visualization Tool",
      description: "Interactive deep learning visualization tool with real-time training metrics and architecture exploration. Used in production for model interpretability and debugging.",
      image: "/project3.jpg",
      technologies: ["TensorFlow.js", "React", "WebGL", "scikit-learn"],
      link: "/projects/project3"
    }
  ];

  async function handleProjectClick(link: string) {
    try {
      await goto(link, { replaceState: false });
    } catch (error) {
      console.error('Navigation error:', error);
    }
  }
</script>

<section id="projects" class="py-20 bg-background/50">
  <div class="container mx-auto px-6">
    <div class="max-w-5xl mx-auto">
      <h2 class="text-5xl font-bold text-center mb-14">
        <span class="relative z-10">My <span class="text-primary">Projects</span></span>
      </h2>
      
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {#each projects as project}
          <CardWrapper>
            <div class="group relative bg-background/50 rounded-xl overflow-hidden border border-border/10 shadow-sm hover:shadow-md hover:border-primary/30 transition-all duration-300 h-full flex flex-col">
              <!-- Image -->
              <div class="relative aspect-video overflow-hidden">
                <img
                  src={project.image}
                  alt={project.title}
                  class="object-cover w-full h-full group-hover:scale-105 transition-transform duration-500"
                />
                <div class="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </div>

              <!-- Content -->
              <div class="p-6 space-y-4 flex flex-col flex-grow">
                <h3 class="text-xl font-bold relative inline-block">
                  <span class="relative z-10">{project.title}</span>
                  <span class="absolute bottom-0 left-0 w-full h-2 bg-primary/10 -z-10 group-hover:bg-primary/20 transition-colors duration-300"></span>
                </h3>
                <p class="text-muted-foreground line-clamp-3 flex-grow">{project.description}</p>

                <!-- Technologies -->
                <div class="flex flex-wrap gap-2 pt-2">
                  {#each project.technologies as tech}
                    <span class="px-3 py-1 rounded-full bg-primary/5 text-primary/80 text-xs transition-all hover:bg-primary/10">
                      {tech}
                    </span>
                  {/each}
                </div>

                <!-- Link -->
                <a
                  href={project.link}
                  class="inline-flex h-10 items-center justify-center rounded-md bg-primary/10 text-primary px-4 text-sm font-medium transition-all hover:bg-primary hover:text-primary-foreground w-full mt-4 hover:translate-y-[-2px]"
                >
                  View Project
                </a>
              </div>
            </div>
          </CardWrapper>
        {/each}
      </div>
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

  .line-clamp-3 {
    display: -webkit-box;
    -webkit-line-clamp: 3;
    line-clamp: 3;
    -webkit-box-orient: vertical;
    overflow: hidden;
  }
</style> 