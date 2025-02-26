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

  // Experience data
  interface Experience {
    company: string;
    role: string;
    period: string;
    description: string;
    logoUrl?: string;
    id: string;
  }

  const experiences: Experience[] = [
    {
      id: 'exp-byratings',
      company: 'ByRatings',
      role: 'Data Scientist',
      period: '2022 - Present',
      description: 'Pioneering the integration of machine learning models for data analysis and insights. Developing advanced analytics solutions for business intelligence and decision-making processes.',
      logoUrl: 'https://logo.clearbit.com/byratings.com'
    },
    {
      id: 'exp-itba',
      company: 'Instituto Tecnológico de Buenos Aires',
      role: 'Teaching Assistant',
      period: '2017 - 2018',
      description: 'Assisted in teaching programming and algorithms courses to engineering students. Provided guidance on practical assignments and evaluated student performance.',
      logoUrl: 'https://logo.clearbit.com/itba.edu.ar'
    },
    {
      id: 'exp-freelance',
      company: 'Freelance',
      role: 'Full Stack Developer',
      period: '2016 - 2018',
      description: 'Developed web applications and data solutions for various clients. Implemented responsive designs, RESTful APIs, and database architectures to meet client requirements.',
      logoUrl: ''
    }
  ];

  // Education data
  interface Education {
    institution: string;
    degree: string;
    period: string;
    description?: string;
    logoUrl?: string;
    id: string;
  }

  const education: Education[] = [
    {
      id: 'edu-itba',
      institution: 'Instituto Tecnológico de Buenos Aires',
      degree: 'Engineering',
      period: '2011 - 2018',
      description: 'Specialized in computer science and data engineering with focus on algorithms and machine learning applications.',
      logoUrl: 'https://logo.clearbit.com/itba.edu.ar'
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

  // Languages
  interface Language {
    name: string;
    proficiency: string;
  }

  const languages: Language[] = [
    { name: 'English', proficiency: 'Professional' },
    { name: 'Spanish', proficiency: 'Native' }
  ];

  // For interactive experience and education cards
  import { writable } from 'svelte/store';
  import { onMount } from 'svelte';
  
  // Combine experiences and education for the timeline
  const timelineItems = [...experiences, ...education];
  
  // Create a store for the currently selected item
  const selectedItemId = writable(timelineItems[0]?.id || '');
  
  // For certifications carousel
  let carouselContainer: HTMLElement;
  let scrollAmount = 300;
  let currentScrollPosition = 0;
  let maxScroll = 0;
  
  onMount(() => {
    if (carouselContainer) {
      maxScroll = carouselContainer.scrollWidth - carouselContainer.clientWidth;
    }
  });
  
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
  
  function getItemRole(item: typeof timelineItems[0]) {
    return 'role' in item ? item.role : item.degree;
  }
  
  function getItemCompany(item: typeof timelineItems[0]) {
    return 'company' in item ? item.company : item.institution;
  }
</script>

<section id="about" class="min-h-screen py-20 bg-background">
  <div class="container mx-auto px-4">
    <h2 class="text-4xl font-bold text-center mb-12">About Me</h2>
    
    <div class="grid grid-cols-1 gap-12">
      <!-- Bio and Info -->
      <div class="space-y-6">
        <div class="flex flex-col md:flex-row gap-6 items-start">
          <div class="flex-grow">
            <p class="text-lg mb-4">
              I'm a data scientist and full-stack developer based in Barcelona, with a focus on creating elegant, 
              efficient solutions to complex problems through advanced analytics and clean code. With expertise in 
              machine learning and software development, I enjoy bridging the gap between data science and 
              application development.
            </p>
            
            <div class="flex items-center mt-4">
              <a href="https://www.linkedin.com/in/felipebereilh/" target="_blank" rel="noopener noreferrer" 
                 class="flex items-center gap-2 px-4 py-2 bg-[#0077B5]/10 text-[#0077B5] rounded-lg hover:bg-[#0077B5]/20 transition-colors">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                </svg>
                <span>LinkedIn Profile</span>
              </a>
            </div>
          </div>
        </div>
        
        <div class="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8">
          <div>
            <h3 class="text-xl font-semibold mb-2">Location</h3>
            <p>Barcelona, Catalonia, Spain</p>
          </div>
          <div>
            <h3 class="text-xl font-semibold mb-2">Languages</h3>
            <div class="space-y-1">
              {#each languages as language}
                <p>{language.name} ({language.proficiency})</p>
              {/each}
            </div>
          </div>
          <div>
            <h3 class="text-xl font-semibold mb-2">Education</h3>
            <p>Engineering, ITBA</p>
          </div>
          <div>
            <h3 class="text-xl font-semibold mb-2">Availability</h3>
            <p>Selected Projects</p>
          </div>
        </div>
      </div>
      
      <!-- Combined Experience & Education Timeline -->
      <div class="mt-12">
        <h3 class="text-2xl font-bold mb-6">Professional Journey</h3>
        
        <!-- Timeline Cards -->
        <div class="grid grid-cols-1 md:grid-cols-4 gap-4">
          {#each experiences as exp}
            <div 
              class="p-4 bg-card/20 backdrop-blur-sm rounded-xl border border-border/50 cursor-pointer transition-all duration-200 hover:shadow-md hover:border-primary/50 hover:bg-card/30"
              on:mouseenter={() => selectedItemId.set(exp.id)}
              on:focus={() => selectedItemId.set(exp.id)}
            >
              <div class="flex items-center gap-3 mb-3">
                <div class="flex-shrink-0 flex items-center justify-center w-12 h-12 bg-background rounded-lg overflow-hidden">
                  {#if exp.logoUrl}
                    <img src={exp.logoUrl} alt={exp.company} class="w-10 h-10 object-contain" />
                  {:else}
                    <div class="w-10 h-10 flex items-center justify-center bg-primary/10 text-primary font-bold text-lg">
                      {exp.company.charAt(0)}
                    </div>
                  {/if}
                </div>
                <div>
                  <h4 class="font-semibold text-base">{exp.role}</h4>
                  <div class="text-xs text-muted-foreground">{exp.company}</div>
                </div>
              </div>
              <div class="text-xs text-muted-foreground mt-2 flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-3 w-3 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                <span>{exp.period}</span>
              </div>
            </div>
          {/each}
          
          {#each education as edu}
            <div 
              class="p-4 bg-card/20 backdrop-blur-sm rounded-xl border border-border/50 cursor-pointer transition-all duration-200 hover:shadow-md hover:border-primary/50 hover:bg-card/30"
              on:mouseenter={() => selectedItemId.set(edu.id)}
              on:focus={() => selectedItemId.set(edu.id)}
            >
              <div class="flex items-center gap-3 mb-3">
                <div class="flex-shrink-0 flex items-center justify-center w-12 h-12 bg-background rounded-lg overflow-hidden">
                  {#if edu.logoUrl}
                    <img src={edu.logoUrl} alt={edu.institution} class="w-10 h-10 object-contain" />
                  {:else}
                    <div class="w-10 h-10 flex items-center justify-center bg-primary/10 text-primary font-bold text-lg">
                      {edu.institution.charAt(0)}
                    </div>
                  {/if}
                </div>
                <div>
                  <h4 class="font-semibold text-base">{edu.degree}</h4>
                  <div class="text-xs text-muted-foreground">{edu.institution}</div>
                </div>
              </div>
              <div class="text-xs text-muted-foreground mt-2 flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-3 w-3 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                <span>{edu.period}</span>
              </div>
            </div>
          {/each}
        </div>
        
        <!-- Description Panel -->
        <div class="mt-6 p-6 bg-card/10 backdrop-blur-sm rounded-xl border border-border/50 min-h-[100px] transition-all duration-300">
          {#each timelineItems as item}
            {#if $selectedItemId === item.id}
              <div class="animate-fadeIn">
                <h4 class="text-lg font-semibold mb-2">
                  {getItemRole(item)} at {getItemCompany(item)}
                </h4>
                <p class="text-muted-foreground">{item.description}</p>
              </div>
            {/if}
          {/each}
        </div>
      </div>

      <!-- Data Science Panel -->
      <div class="mt-12">
        <div class="bg-card/20 backdrop-blur-sm rounded-xl p-6 border border-border/50">
          <h3 class="text-xl font-semibold mb-3">Data-Driven Insights</h3>
          <p class="text-muted-foreground mb-4">
            Specializing in statistical analysis, machine learning, and data visualization 
            to extract meaningful patterns and actionable insights from complex datasets.
          </p>
          <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3 text-sm">
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
      
      <!-- Certifications Carousel -->
      <div class="mt-12">
        <h3 class="text-2xl font-bold mb-6">Certifications</h3>
        
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
                class="flex-shrink-0 w-[280px] p-4 bg-card/10 backdrop-blur-sm rounded-xl border border-border/30 hover:bg-card/20 transition-colors cursor-pointer" 
                on:click={() => openCertificateUrl(cert)}
                role="button"
                tabindex="0"
                on:keydown={(e) => e.key === 'Enter' && openCertificateUrl(cert)}
                aria-label="View {cert.name} certificate"
              >
                <div class="flex gap-3">
                  <div class="flex-shrink-0 flex items-center justify-center w-12 h-12 bg-background rounded-lg overflow-hidden">
                    {#if cert.logoUrl}
                      <img src={cert.logoUrl} alt={cert.issuer} class="w-10 h-10 object-contain" />
                    {:else}
                      <div class="w-10 h-10 flex items-center justify-center bg-primary/10 text-primary font-bold text-lg">
                        {cert.issuer.charAt(0)}
                      </div>
                    {/if}
                  </div>
                  
                  <div class="flex-grow">
                    <h4 class="font-medium text-base">{cert.name}</h4>
                    <div class="flex items-center text-xs text-muted-foreground">
                      <span>{cert.issuer}</span>
                      <span class="mx-1">•</span>
                      <span>{cert.date}</span>
                    </div>
                    {#if cert.credentialId}
                      <div class="text-xs text-muted-foreground mt-1">ID: {cert.credentialId}</div>
                    {/if}
                    {#if cert.url}
                      <div class="text-xs text-primary mt-2 inline-flex items-center group">
                        <span class="group-hover:underline">View Certificate</span>
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
      
      <!-- Skills Section -->
      <div class="mt-12 grid grid-cols-1 md:grid-cols-2 gap-8">
        <div class="space-y-4">
          <h3 class="text-xl font-semibold">Machine Learning</h3>
          <div class="space-y-3">
            {#each mlSkills as skill}
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
          <h3 class="text-xl font-semibold">Programming</h3>
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

      <!-- Download CV Button -->
      <div class="mt-12 flex justify-center">
        <a href="#" class="inline-flex items-center gap-2 px-6 py-3 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors">
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
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
  }
</style> 