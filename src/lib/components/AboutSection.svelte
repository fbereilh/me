<script lang="ts">
  // Skills data structure
  interface Skill {
    name: string;
    level: number; // 1-10
  }

  // Frontend skills
  const frontendSkills: Skill[] = [
    { name: 'HTML/CSS', level: 9 },
    { name: 'JavaScript', level: 9 },
    { name: 'React', level: 8 },
    { name: 'Svelte', level: 7 },
    { name: 'TypeScript', level: 8 }
  ];

  // Backend skills
  const backendSkills: Skill[] = [
    { name: 'Node.js', level: 8 },
    { name: 'Python', level: 7 },
    { name: 'SQL', level: 7 },
    { name: 'MongoDB', level: 7 },
    { name: 'API Design', level: 8 }
  ];

  // Other skills
  const otherSkills: Skill[] = [
    { name: 'Git', level: 8 },
    { name: 'DevOps', level: 6 },
    { name: 'Agile', level: 7 },
    { name: 'UI/UX', level: 7 }
  ];
</script>

<section id="about" class="min-h-screen py-20 bg-background">
  <div class="container mx-auto px-4">
    <h2 class="text-4xl font-bold text-center mb-12">About Me</h2>
    
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
      <!-- Bio and Info -->
      <div class="space-y-6">
        <p class="text-lg">
          I'm a passionate full-stack developer with a focus on creating elegant, efficient, and user-friendly web applications. 
          With several years of experience in both frontend and backend development, I enjoy tackling complex problems and turning them into simple solutions.
        </p>
        
        <p class="text-lg">
          My journey in software development started with a curiosity about how things work behind the scenes on the web. 
          This curiosity has evolved into a career where I continuously learn and adapt to new technologies and methodologies.
        </p>
        
        <div class="grid grid-cols-2 gap-4 mt-8">
          <div>
            <h3 class="text-xl font-semibold mb-2">Location</h3>
            <p>Quito, Ecuador</p>
          </div>
          <div>
            <h3 class="text-xl font-semibold mb-2">Experience</h3>
            <p>5+ Years</p>
          </div>
          <div>
            <h3 class="text-xl font-semibold mb-2">Education</h3>
            <p>Computer Science, EPN</p>
          </div>
          <div>
            <h3 class="text-xl font-semibold mb-2">Availability</h3>
            <p>Freelance & Full-time</p>
          </div>
        </div>

        <div class="bg-card/20 backdrop-blur-sm rounded-xl p-6 border border-border/50">
            <h3 class="text-xl font-semibold mb-3">Data-Driven Insights</h3>
            <p class="text-muted-foreground mb-4">
              Specializing in statistical analysis, machine learning, and data visualization 
              to extract meaningful patterns and actionable insights from complex datasets.
            </p>
            <div class="grid grid-cols-2 gap-3 text-sm">
              <div class="bg-background/30 p-3 rounded-lg">
                <div class="font-medium mb-1">Statistical Modeling</div>
                <div class="text-xs text-muted-foreground">Regression, classification, time series analysis</div>
              </div>
              <div class="bg-background/30 p-3 rounded-lg">
                <div class="font-medium mb-1">Machine Learning</div>
                <div class="text-xs text-muted-foreground">Supervised/unsupervised learning, deep learning</div>
              </div>
              <div class="bg-background/30 p-3 rounded-lg">
                <div class="font-medium mb-1">Data Visualization</div>
                <div class="text-xs text-muted-foreground">Interactive dashboards, custom visualizations</div>
              </div>
              <div class="bg-background/30 p-3 rounded-lg">
                <div class="font-medium mb-1">Big Data Processing</div>
                <div class="text-xs text-muted-foreground">Distributed computing, real-time analytics</div>
              </div>
            </div>
          </div>
      </div>
      
      <!-- Skills -->
      <div class="space-y-8">
        <div class="space-y-4">
          <h3 class="text-xl font-semibold">Frontend Development</h3>
          <div class="space-y-3">
            {#each frontendSkills as skill}
              <div>
                <div class="flex justify-between mb-1">
                  <span>{skill.name}</span>
                  <span class="text-sm text-muted-foreground">{skill.level * 10}%</span>
                </div>
                <div class="h-2 rounded-full bg-muted overflow-hidden">
                  <div class="h-full bg-primary rounded-full" style="width: {skill.level * 10}%"></div>
                </div>
              </div>
            {/each}
          </div>
        </div>
        
        <div class="space-y-4">
          <h3 class="text-xl font-semibold">Backend Development</h3>
          <div class="space-y-3">
            {#each backendSkills as skill}
              <div>
                <div class="flex justify-between mb-1">
                  <span>{skill.name}</span>
                  <span class="text-sm text-muted-foreground">{skill.level * 10}%</span>
                </div>
                <div class="h-2 rounded-full bg-muted overflow-hidden">
                  <div class="h-full bg-primary rounded-full" style="width: {skill.level * 10}%"></div>
                </div>
              </div>
            {/each}
          </div>
        </div>
        
        <div class="space-y-4">
          <h3 class="text-xl font-semibold">Other Skills</h3>
          <div class="flex flex-wrap gap-2">
            {#each otherSkills as skill}
              <span class="px-3 py-1 rounded-full bg-primary/10 text-primary">
                {skill.name}
              </span>
            {/each}
          </div>
        </div>
      </div>
    </div>
  </div>
</section> 