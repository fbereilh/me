<script lang="ts">
  import { onMount } from 'svelte';
  
  let mounted = false;
  
  onMount(() => {
    mounted = true;
  });
</script>

<div class="container mx-auto px-4 py-12">
  <div class="max-w-4xl mx-auto space-y-8">
    <h1 class="text-4xl font-bold">Quantum Circuit Simulator</h1>
    
    <div class="aspect-video rounded-xl overflow-hidden bg-card">
      <img src="/project1.jpg" alt="Quantum Circuit Simulator" class="w-full h-full object-cover" />
    </div>
    
    <div class="prose prose-lg dark:prose-invert max-w-none">
      <p>
        A web-based quantum circuit simulator that allows users to design and test quantum algorithms.
        Built with React and TypeScript, this project makes quantum computing concepts accessible to students and enthusiasts.
      </p>
      
      <h2>Key Features</h2>
      <ul>
        <li>Interactive quantum gate manipulation</li>
        <li>Real-time state vector visualization</li>
        <li>Support for common quantum algorithms</li>
        <li>Built-in tutorial system</li>
      </ul>
      
      <h2>Technical Details</h2>
      <p>
        The simulator implements a custom quantum state vector manipulation system using WebAssembly
        for efficient computation. The frontend uses React with TypeScript for type safety and
        better development experience.
      </p>
      
      <h2>Implementation Challenges</h2>
      <p>
        One of the main challenges was optimizing the quantum state calculations for the web browser.
        This was solved by implementing core calculations in Rust and compiling to WebAssembly,
        achieving near-native performance.
      </p>
      
      <h2>Results</h2>
      <p>
        The simulator has been used by several universities in their quantum computing courses,
        helping students understand quantum algorithms through hands-on experimentation.
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