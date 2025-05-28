/**
 * Sets up testimonial slider functionality
 */
export function setupTestimonials() {
  const testimonialSlider = document.getElementById('testimonialSlider');
  
  if (!testimonialSlider) return;
  
  const slides = testimonialSlider.querySelectorAll('.testimonial-slide');
  const nextButton = document.getElementById('nextTestimonial');
  const prevButton = document.getElementById('prevTestimonial');
  const indicators = document.getElementById('testimonialIndicators');
  
  if (!slides.length) return;
  
  let currentSlide = 0;
  const totalSlides = slides.length;
  
  // Function to update the active slide
  function updateSlide(index) {
    // Remove active class from all slides
    slides.forEach(slide => {
      slide.classList.remove('active');
    });
    
    // Update indicators if they exist
    if (indicators) {
      const indicatorButtons = indicators.querySelectorAll('.indicator');
      indicatorButtons.forEach((indicator, i) => {
        if (i === index) {
          indicator.classList.add('active');
        } else {
          indicator.classList.remove('active');
        }
      });
    }
    
    // Add active class to the current slide
    currentSlide = index;
    slides[currentSlide].classList.add('active');
  }
  
  // Next button functionality
  if (nextButton) {
    nextButton.addEventListener('click', () => {
      const nextIndex = (currentSlide + 1) % totalSlides;
      updateSlide(nextIndex);
    });
  }
  
  // Previous button functionality
  if (prevButton) {
    prevButton.addEventListener('click', () => {
      const prevIndex = (currentSlide - 1 + totalSlides) % totalSlides;
      updateSlide(prevIndex);
    });
  }
  
  // Indicator buttons functionality
  if (indicators) {
    const indicatorButtons = indicators.querySelectorAll('.indicator');
    indicatorButtons.forEach((indicator, index) => {
      indicator.addEventListener('click', () => {
        updateSlide(index);
      });
    });
  }
  
  // Auto-advance slides every 5 seconds
  let slideInterval = setInterval(() => {
    const nextIndex = (currentSlide + 1) % totalSlides;
    updateSlide(nextIndex);
  }, 5000);
  
  // Pause auto-advance on hover
  testimonialSlider.addEventListener('mouseenter', () => {
    clearInterval(slideInterval);
  });
  
  // Resume auto-advance when mouse leaves
  testimonialSlider.addEventListener('mouseleave', () => {
    slideInterval = setInterval(() => {
      const nextIndex = (currentSlide + 1) % totalSlides;
      updateSlide(nextIndex);
    }, 5000);
  });
  
  // Initialize the first slide
  updateSlide(0);
  
  // Add touch swipe functionality for mobile
  let startX = 0;
  let endX = 0;
  
  testimonialSlider.addEventListener('touchstart', (e) => {
    startX = e.touches[0].clientX;
  }, false);
  
  testimonialSlider.addEventListener('touchend', (e) => {
    endX = e.changedTouches[0].clientX;
    handleSwipe();
  }, false);
  
  function handleSwipe() {
    const threshold = 50; // Minimum distance for swipe
    
    if (startX - endX > threshold) {
      // Swipe left, go to next slide
      const nextIndex = (currentSlide + 1) % totalSlides;
      updateSlide(nextIndex);
    } else if (endX - startX > threshold) {
      // Swipe right, go to previous slide
      const prevIndex = (currentSlide - 1 + totalSlides) % totalSlides;
      updateSlide(prevIndex);
    }
  }
}