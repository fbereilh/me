<script lang="ts">
  import { onMount } from 'svelte';
  
  let mounted = false;
  
  onMount(() => {
    mounted = true;
  });
</script>

<div class="container mx-auto px-4 py-12">
  <div class="max-w-4xl mx-auto space-y-8">
    <h1 class="text-4xl font-bold">Climate Data Visualization Platform</h1>
    
    <div class="aspect-video rounded-xl overflow-hidden bg-card">
      <img src="/project2.jpg" alt="Climate Data Visualization" class="w-full h-full object-cover" />
    </div>
    
    <div class="prose prose-lg dark:prose-invert max-w-none">
      <p>
        An interactive platform for visualizing and analyzing climate data from multiple sources.
        This project combines data science with interactive visualizations to make climate science
        more accessible and understandable.
      </p>
      
      <h2>Key Features</h2>
      <ul>
        <li>Real-time data integration from multiple climate databases</li>
        <li>Interactive 3D globe visualization</li>
        <li>Time-series analysis tools</li>
        <li>Customizable data overlays</li>
      </ul>
      
      <h2>Technical Details</h2>
      <p>
        Built using Vue.js and D3.js for the frontend visualizations, with a Python FastAPI
        backend for data processing. The platform uses WebGL for rendering the 3D globe and
        implements efficient data streaming for large datasets.
      </p>
      
      <h2>Data Sources</h2>
      <p>
        The platform integrates data from various sources including:
      </p>
      <ul>
        <li>NASA Earth Observations</li>
        <li>NOAA Climate Data</li>
        <li>World Bank Climate Change Data</li>
        <li>European Climate Assessment & Dataset</li>
      </ul>
      
      <h2>Impact</h2>
      <p>
        This tool has been used by researchers and educators to demonstrate climate patterns
        and changes over time, making complex climate data more accessible to the public.
      </p>
    </div>
  </div>
</div>

<style>
  :global(.dark) {
    --tw-prose-invert-body: theme(colors.foreground);
    --tw-prose-invert-headings: theme(colors.foreground);
    --tw-prose-invert-links: theme(colors.primary);
  }
</style> 