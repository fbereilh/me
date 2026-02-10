<script lang="ts">
  // Skills data structure
  interface Skill {
    name: string;
  }

  const coreSkills: Skill[] = [
    { name: 'Machine Learning'},
    { name: 'Deep Learning' },
    { name: 'Data Visualization'},
    { name: 'A/B Testing' },
    { name: 'Model Deployment' },
    { name: 'Data Engineering' }];

  const technologies: string[] = [
    'Python', 'PyTorch', 'scikit-learn', 'Pandas',
    'SQL', 'TypeScript', 'Svelte', 'Google Cloud Platform','AWS', 'Docker', 'Kubernetes'
  ];
</script>

<section id="about" class="about">
  <div class="about-container">
    <h2 class="section-title">About <span class="highlight">Me</span> 👋</h2>
    
    <!-- Bio -->
    <div class="bio">
      <p>
        I'm based in <strong>Barcelona</strong>, where I spend my days teaching computers to recognize patterns and make predictions.
        Whether it's spotting trends in messy data or building models that actually work in <strong>production</strong>, I focus on solutions that move the needle.
      </p>
    </div>
    
    <div class="content-grid">
      <!-- Skills Section -->
      <div class="card">
        <h3 class="card-title">What I Do</h3>
        
        <div class="skills-content">
          <div class="core-skills">
            {#each coreSkills as skill}
              <span class="skill-badge">{skill.name}</span>
            {/each}
          </div>
          
          <div class="technologies">
            <h4>Tools I Like</h4>
            <div class="tech-list">
              {#each technologies as tech}
                <span class="tech-badge">{tech}</span>
              {/each}
            </div>
          </div>
        </div>
      </div>
      
      <!-- Career Summary -->
      <div class="card">
        <h3 class="card-title">My Journey</h3>
        
        <div class="career-summary">
          <p>
            I started in <strong>marketing analytics</strong> at LATAM Airlines, where I learned that numbers tell better stories than slides. That curiosity led me to <strong>Mercado Libre</strong>, where I spent two years as a data analyst building ETLs and fixing messy catalog data. Turns out I liked wrangling data more than I expected.
          </p>
          <p>
            The shift to <strong>data science</strong> happened at PedidosYa and La Nacion, where I got to build actual <strong>ML models</strong>: audience clustering, purchase prediction, A/B testing for paywalls. At Preply, I focused on product analytics and optimizing mobile funnels.
          </p>
          <p>
            Now at <strong>ByRatings</strong> as a Senior Data Scientist, I take models from idea to <strong>production</strong>. I still do a lot of what data engineers do (pipelines, infrastructure, making sure things don't break), because that's how you ship ML that actually works.
          </p>
        </div>
      </div>
    </div>
  </div>
</section>

<style>
  .about {
    padding: 5rem 2rem;
    background: var(--bg-primary);
  }

  .about-container {
    max-width: 1200px;
    margin: 0 auto;
  }

  .section-title {
    font-size: 3rem;
    font-weight: 700;
    text-align: center;
    margin-bottom: 3.5rem;
    color: var(--text-primary);
  }

  .highlight {
    color: var(--primary);
  }

  .bio {
    max-width: 800px;
    margin: 0 auto 4rem;
    text-align: center;
  }

  .bio p {
    font-size: 1.25rem;
    line-height: 1.8;
    color: var(--text-secondary);
  }

  .content-grid {
    display: grid;
    grid-template-columns: 1fr 2fr;
    gap: 2rem;
  }

  .card {
    background: white;
    border: 1px solid var(--border);
    border-radius: 1rem;
    padding: 2rem;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
    transition: all 0.3s;
  }

  .card:hover {
    box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1);
    transform: translateY(-4px);
  }

  .card-title {
    font-size: 1.5rem;
    font-weight: 600;
    color: var(--text-primary);
    margin-bottom: 1.5rem;
  }

  .skills-content {
    display: flex;
    flex-direction: column;
    gap: 2rem;
  }

  .core-skills {
    display: flex;
    flex-wrap: wrap;
    gap: 0.75rem;
  }

  .skill-badge {
    padding: 0.5rem 1rem;
    background: var(--primary);
    color: white;
    border-radius: 0.5rem;
    font-size: 0.875rem;
    font-weight: 500;
  }

  .technologies h4 {
    font-size: 1rem;
    font-weight: 600;
    color: var(--text-primary);
    margin-bottom: 0.75rem;
  }

  .tech-list {
    display: flex;
    flex-wrap: wrap;
    gap: 0.5rem;
  }

  .tech-badge {
    padding: 0.375rem 0.75rem;
    border: 1px solid var(--primary);
    color: var(--primary);
    border-radius: 0.375rem;
    font-size: 0.875rem;
  }

  .career-summary {
    display: flex;
    flex-direction: column;
    gap: 1.25rem;
  }

  .career-summary p {
    color: var(--text-secondary);
    line-height: 1.7;
    font-size: 1rem;
  }

  /* Responsive */
  @media (max-width: 1024px) {
    .content-grid {
      grid-template-columns: 1fr;
    }
  }

  @media (max-width: 768px) {
    .about {
      padding: 4rem 1.5rem;
    }

    .section-title {
      font-size: 2.5rem;
      margin-bottom: 2.5rem;
    }

    .bio p {
      font-size: 1.125rem;
    }

    .card {
      padding: 1.5rem;
    }
  }
</style> 