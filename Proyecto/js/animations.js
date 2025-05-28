/**
 * Sets up animations for elements with data-animate attributes
 * Uses Intersection Observer to trigger animations when elements enter viewport
 */
export function setupAnimations() {
  // Check if IntersectionObserver is supported
  if ('IntersectionObserver' in window) {
    const animatedElements = document.querySelectorAll('[data-animate]');
    
    const animationObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          // Add the animated class when element is visible
          entry.target.classList.add('animated');
          
          // Stop observing once animation has been triggered
          animationObserver.unobserve(entry.target);
        }
      });
    }, {
      root: null, // Use viewport as root
      threshold: 0.1, // Trigger when at least 10% of the element is visible
      rootMargin: '0px 0px -50px 0px' // Adjust when animations trigger
    });
    
    // Start observing all elements with data-animate attribute
    animatedElements.forEach(element => {
      animationObserver.observe(element);
    });
  } else {
    // Fallback for browsers that don't support IntersectionObserver
    const animatedElements = document.querySelectorAll('[data-animate]');
    animatedElements.forEach(element => {
      element.classList.add('animated');
    });
  }

  // Animate header on page load
  const header = document.querySelector('.header');
  if (header) {
    setTimeout(() => {
      header.classList.add('fade-in-down');
    }, 100);
  }

  // Animate hero section on page load
  const heroContent = document.querySelector('.hero-content');
  const heroImage = document.querySelector('.hero-image');
  
  if (heroContent) {
    setTimeout(() => {
      heroContent.classList.add('fade-in-up');
    }, 300);
  }
  
  if (heroImage) {
    setTimeout(() => {
      heroImage.classList.add('fade-in');
    }, 600);
  }
}