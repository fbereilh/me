<script lang="ts">
  // Skills data structure
  interface Skill {
    name: string;
    level: number; // 1-10
  }

  // Core data science skills based on LinkedIn certifications
  const coreSkills: Skill[] = [
    { name: 'Machine Learning', level: 9 },
    { name: 'Deep Learning', level: 9 },
    { name: 'Neural Networks', level: 8 },
    { name: 'Statistical Modeling', level: 9 },
    { name: 'Data Visualization', level: 8 },
    { name: 'Sequence Models', level: 8 },
    { name: 'Convolutional Neural Networks', level: 8 }
  ];

  // Technologies from LinkedIn certifications
  const technologies: string[] = [
    'Python', 'TensorFlow', 'PyTorch', 'scikit-learn', 'Pandas',
    'SQL', 'JavaScript', 'Google Cloud', 'Algorithms', 'Hyperparameter Tuning'
  ];

  // Career highlights
  interface Experience {
    title: string;
    company: string;
    period: string;
    description: string;
  }

  const experiences: Experience[] = [
    {
      title: 'Data Scientist',
      company: 'ByRatings',
      period: '2022 - Present',
      description: 'Pioneering the integration of machine learning models for data analysis and insights. Developing advanced analytics solutions for business intelligence.'
    },
    {
      title: 'Teaching Assistant',
      company: 'Instituto Tecnológico de Buenos Aires',
      period: '2017 - 2018',
      description: 'Instructed engineering students in machine learning algorithms and statistical modeling techniques.'
    },
    {
      title: 'Data Engineer',
      company: 'Freelance',
      period: '2016 - 2018',
      description: 'Designed data pipelines and analytics solutions. Implemented ETL processes for machine learning applications.'
    }
  ];
</script>

<section id="about" class="py-20 bg-background/[0.03] border-t border-primary/5">
  <div class="container mx-auto px-6">
    <div class="max-w-4xl mx-auto">
      <h2 class="text-5xl font-bold mb-14 text-center">About <span class="text-primary">Me</span></h2>
      
      <!-- Bio with subtle reveal animation -->
      <div class="mb-16 animate-fadeIn">
        <p class="text-xl leading-relaxed text-center mx-auto max-w-2xl">
          Data Scientist based in Barcelona with expertise in machine learning and deep neural networks.
          I transform complex datasets into actionable business insights using advanced statistical methods
          and AI technologies.
        </p>
      </div>
      
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-10">
        <!-- Skills Section -->
        <div class="space-y-8 p-8">
          <h3 class="text-2xl font-bold relative inline-block">
            <span class="relative z-10">Technical Skills</span>
            <span class="absolute bottom-0 left-0 w-full h-2 bg-primary/20 -z-10"></span>
          </h3>
          
          <!-- Core Skills -->
          <div class="space-y-6">
            <div class="flex flex-wrap gap-3">
              {#each coreSkills as skill}
                <span class="px-4 py-1.5 rounded-full bg-primary/10 text-primary font-medium transition-all hover:bg-primary/20">
                  {skill.name}
                </span>
              {/each}
            </div>
            
            <!-- Technologies -->
            <div class="space-y-4">
              <h4 class="font-semibold text-base">Technologies</h4>
              <div class="flex flex-wrap gap-2">
                {#each technologies as tech}
                  <span class="px-3 py-1 rounded-full bg-primary/5 text-primary/80 text-sm transition-all hover:bg-primary/10">
                    {tech}
                  </span>
                {/each}
              </div>
            </div>
          </div>
        </div>
        
        <!-- Experience Section -->
        <div class="space-y-8 p-8">
          <h3 class="text-2xl font-bold relative inline-block">
            <span class="relative z-10">Experience</span>
            <span class="absolute bottom-0 left-0 w-full h-2 bg-primary/20 -z-10"></span>
          </h3>
          
          <div class="space-y-6">
            {#each experiences as experience}
              <div class="pb-5 border-b border-border/20 last:border-0 last:pb-0 transition-all hover:translate-x-1">
                <h4 class="text-lg font-semibold text-primary">{experience.title}</h4>
                <p class="text-base mb-2 flex items-center gap-2">
                  <span class="font-medium">{experience.company}</span>
                  <span class="w-1.5 h-1.5 rounded-full bg-primary/40"></span>
                  <span class="text-muted-foreground text-sm">{experience.period}</span>
                </p>
                <p class="text-muted-foreground">{experience.description}</p>
              </div>
            {/each}
          </div>
        </div>
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

  /* Extra small text for compact legends */
  .text-2xs {
    font-size: 0.65rem;
    line-height: 1rem;
  }
</style> 