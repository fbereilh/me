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

  // Certifications
  interface Certification {
    name: string;
    issuer: string;
    date: string;
    credentialId?: string;
    url?: string;
    logoUrl?: string;
  }

  const certifications: Certification[] = [
    {
      name: 'Machine Learning',
      issuer: 'Coursera',
      date: 'Jan 2022',
      credentialId: '65A369CYKLX2',
      url: 'https://www.coursera.org/account/accomplishments/verify/65A369CYKLX2',
      logoUrl: 'https://logo.clearbit.com/coursera.org'
    },
    {
      name: 'Deep Learning',
      issuer: 'Coursera',
      date: 'Dec 2020',
      credentialId: '3V9L4WBH782L',
      url: 'https://www.coursera.org/account/accomplishments/verify/3V9L4WBH782L',
      logoUrl: 'https://logo.clearbit.com/coursera.org'
    },
    {
      name: 'Sequence Models',
      issuer: 'Coursera',
      date: 'Dec 2020',
      credentialId: '642LREVVTQYU',
      url: 'https://www.coursera.org/account/accomplishments/verify/642LREVVTQYU',
      logoUrl: 'https://logo.clearbit.com/coursera.org'
    },
    {
      name: 'Convolutional Neural Networks',
      issuer: 'Coursera',
      date: 'Nov 2020',
      credentialId: 'PYLVXRWREKQ3',
      url: 'https://www.coursera.org/account/accomplishments/verify/PYLVXRWREKQ3',
      logoUrl: 'https://logo.clearbit.com/coursera.org'
    },
    {
      name: 'Improving Deep Neural Networks',
      issuer: 'Coursera',
      date: 'Oct 2020',
      credentialId: 'A83SNX96PRZK',
      url: 'https://www.coursera.org/account/accomplishments/verify/A83SNX96PRZK',
      logoUrl: 'https://logo.clearbit.com/coursera.org'
    },
    {
      name: 'How Google does Machine Learning',
      issuer: 'Google',
      date: 'Sep 2020',
      credentialId: 'LGR7YDZ4EB6J',
      url: 'https://www.coursera.org/account/accomplishments/verify/LGR7YDZ4EB6J',
      logoUrl: 'https://logo.clearbit.com/google.com'
    },
    {
      name: 'Neural Networks and Deep Learning',
      issuer: 'Coursera',
      date: 'Sep 2020',
      credentialId: '6BB35SRGNBQF',
      url: 'https://www.coursera.org/account/accomplishments/verify/6BB35SRGNBQF',
      logoUrl: 'https://logo.clearbit.com/coursera.org'
    },
    {
      name: 'Structuring Machine Learning Projects',
      issuer: 'Coursera',
      date: 'Sep 2020',
      credentialId: '9Z8EKGP3XN4M',
      url: 'https://www.coursera.org/account/accomplishments/verify/9Z8EKGP3XN4M',
      logoUrl: 'https://logo.clearbit.com/coursera.org'
    },
    {
      name: 'JavaScript Algorithms and Data Structures',
      issuer: 'freeCodeCamp',
      date: 'Mar 2020',
      url: 'https://www.freecodecamp.org/certification/fcc/javascript-algorithms-and-data-structures',
      logoUrl: 'https://logo.clearbit.com/freecodecamp.org'
    },
    {
      name: 'Data Scientist',
      issuer: 'Workera',
      date: 'Jan 2020',
      credentialId: 'LKPVCBGK',
      url: 'https://workera.ai/candidates/certificate/LKPVCBGK',
      logoUrl: 'https://logo.clearbit.com/workera.ai'
    }
  ];

  // For interactive experience and education cards
  import { writable } from 'svelte/store';
  import { onMount } from 'svelte';
  import TiltCard from '$lib/components/ui/tilt/TiltCard.svelte';
  
  // Create a store for the currently selected item
  const selectedItemId = writable(timelineItems[0]?.id || '');
  
  // For certifications carousel
  let carouselContainer: HTMLElement;
  let scrollAmount = 300;
  let currentScrollPosition = 0;
  let maxScroll = 0;
  
  function scrollCarousel(direction: 'left' | 'right') {
    if (!carouselContainer) return;
    
    if (direction === 'left') {
      currentScrollPosition = Math.max(0, currentScrollPosition - scrollAmount);
    } else {
      currentScrollPosition = Math.min(maxScroll, currentScrollPosition + scrollAmount);
    }
    
    carouselContainer.scrollTo({
      left: currentScrollPosition,
      behavior: 'smooth'
    });
  }
  
  function openCertificateUrl(cert: Certification) {
    if (cert.url) {
      window.open(cert.url, '_blank');
    }
  }

  onMount(() => {
    if (carouselContainer) {
      maxScroll = carouselContainer.scrollWidth - carouselContainer.clientWidth;
    }
  });
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
        <h3 class="text-2xl font-bold mb-4">Professional Journey</h3>
        
        <!-- Timeline with side-by-side layout -->
        <div class="flex flex-col md:flex-row gap-4">
          <!-- Timeline Cards (stacked in column) -->
          <div class="md:w-1/3 space-y-2">
            {#each timelineItems as item}
              <TiltCard>
                <div 
                  class="p-3 bg-card/20 backdrop-blur-sm rounded-xl border {$selectedItemId === item.id ? 'border-primary shadow-md bg-card/40' : 'border-border/50'} cursor-pointer transition-all duration-200 hover:shadow-md hover:border-primary/50 hover:bg-card/30"
                  on:mouseenter={() => selectedItemId.set(item.id)}
                  on:focus={() => selectedItemId.set(item.id)}
                  on:keydown={(e) => e.key === 'Enter' && selectedItemId.set(item.id)}
                  role="button"
                  tabindex="0"
                  aria-label="View details for {item.title} at {item.organization}"
                >
                  <div class="flex items-center gap-3">
                    <div class="flex-shrink-0 flex items-center justify-center w-10 h-10 bg-background rounded-lg overflow-hidden">
                      {#if item.logoUrl}
                        <img src={item.logoUrl} alt={item.organization} class="w-8 h-8 object-contain" />
                      {:else}
                        <div class="w-8 h-8 flex items-center justify-center bg-primary/10 text-primary font-bold text-base">
                          {item.organization.charAt(0)}
                        </div>
                      {/if}
                    </div>
                    <div>
                      <h4 class="font-semibold text-sm {$selectedItemId === item.id ? 'text-primary' : ''}">{item.title}</h4>
                      <div class="text-xs text-muted-foreground">{item.organization}</div>
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
                      <h5 class="text-sm font-medium mb-2">Tools Used</h5>
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

      <!-- Certifications Carousel -->
      <div class="mt-8">
        <h3 class="text-2xl font-bold mb-4">Certifications</h3>
        
        <div class="relative">
          <!-- Carousel Navigation Buttons -->
          <div class="absolute left-0 top-1/2 -translate-y-1/2 -ml-4 z-10">
            <button 
              class="w-10 h-10 rounded-full bg-background border border-border/50 flex items-center justify-center shadow-md hover:bg-card/30 transition-colors"
              on:click={() => scrollCarousel('left')}
              aria-label="Scroll left"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <polyline points="15 18 9 12 15 6"></polyline>
              </svg>
            </button>
          </div>
          
          <!-- Carousel Container -->
          <div 
            bind:this={carouselContainer}
            class="carousel-container overflow-x-auto flex flex-nowrap gap-4 pb-4 hide-scrollbar"
          >
            {#each certifications as cert}
              <div 
                class="flex-shrink-0 w-[250px] p-3 bg-card/10 backdrop-blur-sm rounded-xl border border-border/30 hover:bg-card/20 transition-colors cursor-pointer" 
                on:click={() => openCertificateUrl(cert)}
                role="button"
                tabindex="0"
                on:keydown={(e) => e.key === 'Enter' && openCertificateUrl(cert)}
                aria-label="View {cert.name} certificate"
              >
                <div class="flex gap-3">
                  <div class="flex-shrink-0 flex items-center justify-center w-10 h-10 bg-background rounded-lg overflow-hidden">
                    {#if cert.logoUrl}
                      <img src={cert.logoUrl} alt={cert.issuer} class="w-8 h-8 object-contain" />
                    {:else}
                      <div class="w-8 h-8 flex items-center justify-center bg-primary/10 text-primary font-bold text-base">
                        {cert.issuer.charAt(0)}
                      </div>
                    {/if}
                  </div>
                  
                  <div class="flex-grow">
                    <h4 class="font-medium text-sm">{cert.name}</h4>
                    <div class="text-xs text-muted-foreground">
                      {cert.issuer}
                    </div>
                    {#if cert.url}
                      <div class="text-xs text-primary mt-1 inline-flex items-center group">
                        <span class="group-hover:underline">View</span>
                        <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="ml-1">
                          <line x1="7" y1="17" x2="17" y2="7"></line>
                          <polyline points="7 7 17 7 17 17"></polyline>
                        </svg>
                      </div>
                    {/if}
                  </div>
                </div>
              </div>
            {/each}
          </div>
          
          <!-- Right Navigation Button -->
          <div class="absolute right-0 top-1/2 -translate-y-1/2 -mr-4 z-10">
            <button 
              class="w-10 h-10 rounded-full bg-background border border-border/50 flex items-center justify-center shadow-md hover:bg-card/30 transition-colors"
              on:click={() => scrollCarousel('right')}
              aria-label="Scroll right"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <polyline points="9 18 15 12 9 6"></polyline>
              </svg>
            </button>
          </div>
        </div>
      </div>
      

      <!-- Download CV Button -->
      <div class="mt-8 flex justify-center">
        <a 
          href="#" 
          class="download-cv-btn inline-flex items-center gap-3 px-8 py-4 bg-primary text-primary-foreground rounded-xl hover:bg-primary/90 transition-all duration-300 hover:scale-105 hover:shadow-xl hover:shadow-primary/20 text-lg font-medium animate-subtle-pulse"
        >
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            width="24" 
            height="24" 
            viewBox="0 0 24 24" 
            fill="none" 
            stroke="currentColor" 
            stroke-width="2" 
            stroke-linecap="round" 
            stroke-linejoin="round"
            class="animate-bounce-gentle"
          >
            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
            <polyline points="7 10 12 15 17 10"></polyline>
            <line x1="12" y1="15" x2="12" y2="3"></line>
          </svg>
          <span>Download CV</span>
        </a>
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

  @keyframes subtle-pulse {
    0% { box-shadow: 0 0 0 0 rgba(var(--primary), 0.4); }
    70% { box-shadow: 0 0 0 10px rgba(var(--primary), 0); }
    100% { box-shadow: 0 0 0 0 rgba(var(--primary), 0); }
  }

  @keyframes bounce-gentle {
    0%, 100% { transform: translateY(0); }
    50% { transform: translateY(3px); }
  }

  .animate-bounce-gentle {
    animation: bounce-gentle 2s ease-in-out infinite;
  }

  .animate-subtle-pulse {
    animation: subtle-pulse 2s infinite;
  }
  
  /* Hide scrollbar for carousel */
  .hide-scrollbar {
    -ms-overflow-style: none;  /* IE and Edge */
    scrollbar-width: none;  /* Firefox */
  }
  
  .hide-scrollbar::-webkit-scrollbar {
    display: none;  /* Chrome, Safari and Opera */
  }
  
  .carousel-container {
    scroll-behavior: smooth;
    -webkit-overflow-scrolling: touch;
    scroll-snap-type: x mandatory;
  }

  .carousel-container > div {
    scroll-snap-align: start;
  }
  
  /* Extra small text for compact legends */
  .text-2xs {
    font-size: 0.65rem;
    line-height: 1rem;
  }

  .download-cv-btn {
    position: relative;
    isolation: isolate;
    overflow: hidden;
  }

  .download-cv-btn:hover::before {
    content: '';
    position: absolute;
    inset: 0;
    background: linear-gradient(
      45deg,
      transparent 25%,
      rgba(255, 255, 255, 0.1) 50%,
      transparent 75%
    );
    transform: translateX(-100%);
    animation: shine 1.5s infinite;
    z-index: -1;
  }

  @keyframes shine {
    100% {
      transform: translateX(100%);
    }
  }
</style> 