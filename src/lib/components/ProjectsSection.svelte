<script lang="ts">
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

<section id="projects" class="py-20 bg-base-100">
  <div class="container mx-auto px-6">
    <div class="max-w-6xl mx-auto">
      <h2 class="text-5xl font-bold text-center mb-14">
        My <span class="text-primary">Projects</span>
      </h2>
      
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {#each projects as project}
          <div class="card bg-base-100 shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-2">
            <figure>
              <img
                src={project.image}
                alt={project.title}
                class="w-full h-48 object-cover"
              />
            </figure>
            <div class="card-body">
              <h3 class="card-title">{project.title}</h3>
              <p class="flex-grow">{project.description}</p>

              <!-- Technologies -->
              <div class="flex flex-wrap gap-2 mt-2">
                {#each project.technologies as tech}
                  <div class="badge badge-primary badge-sm">{tech}</div>
                {/each}
              </div>

              <div class="card-actions justify-end mt-4">
                <a href={project.link} class="btn btn-primary btn-block">
                  View Project
                </a>
              </div>
            </div>
          </div>
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
</style> 