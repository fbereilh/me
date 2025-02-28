<script lang="ts">
  import { onMount } from 'svelte';
  
  let mounted = false;
  
  onMount(() => {
    mounted = true;
  });
</script>

<div class="container mx-auto px-4 py-12">
  <div class="max-w-4xl mx-auto space-y-8">
    <h1 class="text-4xl font-bold">Neural Network Visualizer</h1>
    
    <div class="aspect-video rounded-xl overflow-hidden bg-card">
      <img src="/project3.jpg" alt="Neural Network Visualizer" class="w-full h-full object-cover" />
    </div>
    
    <div class="prose prose-lg dark:prose-invert max-w-none">
      <p>
        An interactive tool for visualizing and understanding neural networks in real-time.
        This project makes deep learning concepts tangible through dynamic visualizations
        and interactive experiments.
      </p>
      
      <h2>Key Features</h2>
      <ul>
        <li>Real-time neural network training visualization</li>
        <li>Interactive weight and bias adjustment</li>
        <li>Layer-by-layer activation visualization</li>
        <li>Pre-built network architectures for common tasks</li>
      </ul>
      
      <h2>Technical Implementation</h2>
      <p>
        Built with Svelte and Three.js for the visualization frontend, the project uses
        TensorFlow.js for neural network computations. This allows for client-side
        training and inference without requiring a backend server.
      </p>
      
      <h2>Educational Impact</h2>
      <p>
        The visualizer includes several pre-built examples that demonstrate fundamental
        concepts in deep learning:
      </p>
      <ul>
        <li>Image classification with CNNs</li>
        <li>Natural language processing with RNNs</li>
        <li>Autoencoder architectures</li>
        <li>Generative adversarial networks</li>
      </ul>
      
      <h2>Future Development</h2>
      <p>
        Ongoing development includes adding support for more advanced architectures
        and improving the interactive learning features with guided tutorials and
        exercises.
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