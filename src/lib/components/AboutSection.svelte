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
  }

  const experiences: Experience[] = [
    {
      company: 'ByRatings',
      role: 'Data Scientist',
      period: '2022 - Present',
      description: 'Pioneering the integration of machine learning models for data analysis and insights. Developing advanced analytics solutions for business intelligence and decision-making processes.',
      logoUrl: 'https://logo.clearbit.com/byratings.com'
    },
    {
      company: 'Instituto Tecnológico de Buenos Aires',
      role: 'Teaching Assistant',
      period: '2017 - 2018',
      description: 'Assisted in teaching programming and algorithms courses to engineering students. Provided guidance on practical assignments and evaluated student performance.',
      logoUrl: 'https://logo.clearbit.com/itba.edu.ar'
    },
    {
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
  }

  const education: Education[] = [
    {
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
      
      <!-- Experience Section -->
      <div class="mt-12">
        <h3 class="text-2xl font-bold mb-6">Professional Experience</h3>
        
        <div class="space-y-8">
          {#each experiences as experience}
            <div class="flex flex-col md:flex-row gap-4 p-6 bg-card/20 backdrop-blur-sm rounded-xl border border-border/50">
              <div class="flex-shrink-0 flex items-center justify-center w-16 h-16 bg-background rounded-lg overflow-hidden">
                {#if experience.logoUrl}
                  <img src={experience.logoUrl} alt={experience.company} class="w-12 h-12 object-contain" />
                {:else}
                  <div class="w-12 h-12 flex items-center justify-center bg-primary/10 text-primary font-bold text-xl">
                    {experience.company.charAt(0)}
                  </div>
                {/if}
              </div>
              
              <div class="flex-grow">
                <h4 class="text-xl font-semibold">{experience.role}</h4>
                <div class="flex items-center text-sm text-muted-foreground mb-2">
                  <span class="font-medium">{experience.company}</span>
                  <span class="mx-2">•</span>
                  <span>{experience.period}</span>
                </div>
                <p class="text-muted-foreground">{experience.description}</p>
              </div>
            </div>
          {/each}
        </div>
      </div>

      <!-- Education Section -->
      <div class="mt-12">
        <h3 class="text-2xl font-bold mb-6">Education</h3>
        
        <div class="space-y-6">
          {#each education as edu}
            <div class="flex flex-col md:flex-row gap-4 p-6 bg-card/20 backdrop-blur-sm rounded-xl border border-border/50">
              <div class="flex-shrink-0 flex items-center justify-center w-16 h-16 bg-background rounded-lg overflow-hidden">
                {#if edu.logoUrl}
                  <img src={edu.logoUrl} alt={edu.institution} class="w-12 h-12 object-contain" />
                {:else}
                  <div class="w-12 h-12 flex items-center justify-center bg-primary/10 text-primary font-bold text-xl">
                    {edu.institution.charAt(0)}
                  </div>
                {/if}
              </div>
              
              <div class="flex-grow">
                <h4 class="text-xl font-semibold">{edu.degree}</h4>
                <div class="flex items-center text-sm text-muted-foreground mb-2">
                  <span class="font-medium">{edu.institution}</span>
                  <span class="mx-2">•</span>
                  <span>{edu.period}</span>
                </div>
                {#if edu.description}
                  <p class="text-muted-foreground">{edu.description}</p>
                {/if}
              </div>
            </div>
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
      
      <!-- Certifications -->
      <div class="mt-12">
        <h3 class="text-2xl font-bold mb-6">Certifications</h3>
        
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          {#each certifications as cert}
            <div class="flex gap-3 p-4 bg-card/10 backdrop-blur-sm rounded-lg border border-border/30 hover:bg-card/20 transition-colors">
              <div class="flex-shrink-0 flex items-center justify-center w-10 h-10 bg-background rounded overflow-hidden">
                {#if cert.logoUrl}
                  <img src={cert.logoUrl} alt={cert.issuer} class="w-8 h-8 object-contain" />
                {:else}
                  <div class="w-8 h-8 flex items-center justify-center bg-primary/10 text-primary font-bold text-sm">
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
                  <div class="text-xs text-muted-foreground mt-1">Credential ID: {cert.credentialId}</div>
                {/if}
                {#if cert.url}
                  <a href={cert.url} target="_blank" rel="noopener noreferrer" class="text-xs text-primary mt-1 inline-block hover:underline">
                    View Certificate
                  </a>
                {/if}
              </div>
            </div>
          {/each}
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