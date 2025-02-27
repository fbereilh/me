<script lang="ts">
  // Custom action for tilt effect
  function tilt(node: HTMLElement) {
    const handleMouseMove = (event: MouseEvent) => {
      const rect = node.getBoundingClientRect();
      
      // Calculate mouse position relative to the card (from -1 to 1)
      const x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
      const y = ((event.clientY - rect.top) / rect.height) * 2 - 1;
      
      // Apply the transform with more pronounced effect
      requestAnimationFrame(() => {
        node.style.transform = `perspective(1000px) rotateX(${-y * 10}deg) rotateY(${x * 10}deg) scale3d(1.05, 1.05, 1.05)`;
      });
    };
    
    const handleMouseEnter = () => {
      // Ensure proper initial state when mouse enters
      node.style.transition = 'transform 0.2s ease-out';
      node.style.transformStyle = 'preserve-3d';
    };
    
    const handleMouseLeave = () => {
      // Reset transform when mouse leaves
      node.style.transition = 'transform 0.5s ease';
      node.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale3d(1, 1, 1)';
    };
    
    // Set initial styles
    node.style.willChange = 'transform';
    node.style.transformStyle = 'preserve-3d';
    node.style.transform = 'perspective(1000px) rotateX(0) rotateY(0)';
    
    // Add event listeners
    node.addEventListener('mouseenter', handleMouseEnter);
    node.addEventListener('mousemove', handleMouseMove);
    node.addEventListener('mouseleave', handleMouseLeave);
    
    return {
      destroy() {
        // Clean up event listeners on component destruction
        node.removeEventListener('mouseenter', handleMouseEnter);
        node.removeEventListener('mousemove', handleMouseMove);
        node.removeEventListener('mouseleave', handleMouseLeave);
      }
    };
  }
</script>

<div use:tilt style="transform-style: preserve-3d;">
  <slot />
</div> 