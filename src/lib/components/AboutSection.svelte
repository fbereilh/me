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
    { name: 'Python', level: 9 },
    { name: 'SQL', level: 8 },
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

  // Machine Learning skills
  const mlSkills: Skill[] = [
    { name: 'Statistical Modeling', level: 9 },
    { name: 'Deep Learning', level: 8 },
    { name: 'Natural Language Processing', level: 8 },
    { name: 'Computer Vision', level: 7 },
    { name: 'Data Visualization', level: 9 }
  ];

  // Timeline item interface for both experiences and education
  interface TimelineItem {
    id: string;
    type: 'job' | 'education';
    title: string;
    organization: string;
    period: string;
    description: string;
    logoUrl?: string;
    timeAllocation?: {
      name: string;
      percentage: number;
      color: string;
    }[];
    tools?: string[];
  }

  // Timeline
  const timelineItems: TimelineItem[] = [
    {
      id: 'exp-byratings',
      type: 'job',
      title: 'Data Scientist',
      organization: 'ByRatings',
      period: '2022 - Present',
      description: 'Pioneering the integration of machine learning models for data analysis and insights. Developing advanced analytics solutions for business intelligence and decision-making processes.',
      logoUrl: 'https://logo.clearbit.com/byratings.com',
      timeAllocation: [
        { name: 'Machine Learning', percentage: 40, color: 'bg-blue-500' },
        { name: 'Data Analysis', percentage: 30, color: 'bg-green-500' },
        { name: 'Development', percentage: 20, color: 'bg-purple-500' },
        { name: 'Research', percentage: 10, color: 'bg-amber-500' }
      ],
      tools: ['Python', 'TensorFlow', 'PyTorch', 'SQL', 'Pandas', 'Docker']
    },
    {
      id: 'exp-itba',
      type: 'job',
      title: 'Teaching Assistant',
      organization: 'Instituto Tecnológico de Buenos Aires',
      period: '2017 - 2018',
      description: 'Assisted in teaching programming and algorithms courses to engineering students. Provided guidance on practical assignments and evaluated student performance.',
      logoUrl: 'https://logo.clearbit.com/itba.edu.ar',
      timeAllocation: [
        { name: 'Teaching', percentage: 60, color: 'bg-blue-500' },
        { name: 'Grading', percentage: 20, color: 'bg-green-500' },
        { name: 'Preparation', percentage: 20, color: 'bg-purple-500' }
      ],
      tools: ['Java', 'C++', 'Algorithms', 'Data Structures']
    },
    {
      id: 'exp-freelance',
      type: 'job',
      title: 'Full Stack Developer',
      organization: 'Freelance',
      period: '2016 - 2018',
      description: 'Developed web applications and data solutions for various clients. Implemented responsive designs, RESTful APIs, and database architectures to meet client requirements.',
      logoUrl: '',
      timeAllocation: [
        { name: 'Frontend', percentage: 40, color: 'bg-blue-500' },
        { name: 'Backend', percentage: 40, color: 'bg-green-500' },
        { name: 'DevOps', percentage: 10, color: 'bg-purple-500' },
        { name: 'Client Management', percentage: 10, color: 'bg-amber-500' }
      ],
      tools: ['JavaScript', 'React', 'Node.js', 'Express', 'MongoDB', 'CSS3']
    },
    {
      id: 'edu-itba',
      type: 'education',
      title: 'Engineering',
      organization: 'Instituto Tecnológico de Buenos Aires',
      period: '2011 - 2018',
      description: 'Specialized in computer science and data engineering with focus on algorithms and machine learning applications.',
      logoUrl: 'https://logo.clearbit.com/itba.edu.ar',
      timeAllocation: [
        { name: 'Coursework', percentage: 60, color: 'bg-blue-500' },
        { name: 'Projects', percentage: 25, color: 'bg-green-500' },
        { name: 'Research', percentage: 15, color: 'bg-purple-500' }
      ],
      tools: ['Java', 'Python', 'MATLAB', 'Machine Learning', 'Statistics']
    }
  ];

  // For interactive experience and education cards
  import { writable } from 'svelte/store';
  import { onMount } from 'svelte';
  import TiltCard from '$lib/components/ui/tilt/TiltCard.svelte';
  
  // Create a store for the currently selected item
  const selectedItemId = writable(timelineItems[0]?.id || '');
</script>

<section id="about" class="min-h-screen py-16 bg-background">
  <div class="container mx-auto px-4">
    <h2 class="text-4xl font-bold text-center mb-10">About Me</h2>
    
    <div class="grid grid-cols-1 gap-8">
      <!-- Bio and Info -->
      <div class="space-y-4">
        <div class="flex flex-col md:flex-row gap-6 items-start">
          <div class="flex-grow">
            <p class="text-lg">
              I'm a data scientist and full-stack developer based in Barcelona, with a focus on creating elegant, 
              efficient solutions to complex problems through advanced analytics and clean code. With expertise in 
              machine learning and software development, I enjoy bridging the gap between data science and 
              application development.
            </p>
          </div>
        </div>
      </div>
      
      <!-- Combined Experience & Education Timeline -->
      <div class="mt-6">
        <h3 class="text-2xl font-bold mb-4">Experience</h3>
        
        <!-- Timeline with side-by-side layout -->
        <div class="flex flex-col md:flex-row gap-4">
          <!-- Timeline Cards (stacked in column) -->
          <div class="md:w-1/3 space-y-3">
            {#each timelineItems as item}
              <TiltCard>
                <div 
                  class="p-4 bg-card/20 backdrop-blur-sm rounded-xl border {$selectedItemId === item.id ? 'border-primary shadow-md bg-card/40' : 'border-border/50'} cursor-pointer transition-all duration-200 hover:shadow-md hover:border-primary/50 hover:bg-card/30"
                  on:mouseenter={() => selectedItemId.set(item.id)}
                  on:focus={() => selectedItemId.set(item.id)}
                  on:keydown={(e) => e.key === 'Enter' && selectedItemId.set(item.id)}
                  role="button"
                  tabindex="0"
                  aria-label="View details for {item.title} at {item.organization}"
                >
                  <div class="flex items-center gap-4">
                    <div class="flex-shrink-0 flex items-center justify-center w-12 h-12 bg-background rounded-lg overflow-hidden">
                      {#if item.logoUrl}
                        <img src={item.logoUrl} alt={item.organization} class="w-10 h-10 object-contain" />
                      {:else}
                        <div class="w-10 h-10 flex items-center justify-center bg-primary/10 text-primary font-bold text-lg">
                          {item.organization.charAt(0)}
                        </div>
                      {/if}
                    </div>
                    <div>
                      <h4 class="font-semibold text-base {$selectedItemId === item.id ? 'text-primary' : ''}">{item.title}</h4>
                      <div class="text-sm text-muted-foreground">{item.organization}</div>
                    </div>
                  </div>
                </div>
              </TiltCard>
            {/each}
          </div>
          
          <!-- Description Panel with Time Allocation Bar -->
          <div class="md:w-2/3 p-5 bg-card/10 backdrop-blur-sm rounded-xl border border-border/50 min-h-[300px] overflow-y-auto transition-all duration-300">
            {#each timelineItems as item}
              {#if $selectedItemId === item.id}
                <div class="animate-fadeIn space-y-3">
                  <h4 class="text-lg font-semibold">
                    {item.title} at {item.organization}
                  </h4>
                  <p class="text-muted-foreground leading-relaxed">{item.description}</p>
                  
                  <!-- Time Allocation Bar -->
                  {#if item.timeAllocation && item.timeAllocation.length > 0}
                    <div class="mt-4">
                      <h5 class="text-sm font-medium mb-2">Time Allocation</h5>
                      
                      <!-- Clean horizontal bar visualization -->
                      <div class="space-y-2">
                        <div class="h-7 w-full rounded-md overflow-hidden flex">
                          {#each item.timeAllocation as allocation}
                            <div 
                              class="h-full {allocation.color} flex items-center justify-center" 
                              style="width: {allocation.percentage}%"
                              title="{allocation.name}: {allocation.percentage}%"
                            >
                              {#if allocation.percentage >= 15}
                                <span class="text-xs text-white font-medium px-1 truncate drop-shadow-md">
                                  {allocation.name}
                                </span>
                              {/if}
                            </div>
                          {/each}
                        </div>
                      </div>
                    </div>
                  {/if}
                  
                  <!-- Tools Used Badges -->
                  {#if item.tools && item.tools.length > 0}
                    <div class="mt-4">
                      <div class="flex flex-wrap gap-1.5">
                        {#each item.tools as tool}
                          <span class="px-2 py-0.5 rounded-full bg-primary/10 text-primary text-xs">
                            {tool}
                          </span>
                        {/each}
                      </div>
                    </div>
                  {/if}
                </div>
              {/if}
            {/each}
          </div>
        </div>
      </div>
    </div>
  </div>
</section>

<style>
  @keyframes fadeIn {
    from { opacity: 0; }
    to { opacity: 1; }
  }
  
  .animate-fadeIn {
    animation: fadeIn 0.3s ease-in-out;
  }

  /* Extra small text for compact legends */
  .text-2xs {
    font-size: 0.65rem;
    line-height: 1rem;
  }
</style> 