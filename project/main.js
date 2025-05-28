import './style.css';
import javascriptLogo from './javascript.svg';
import viteLogo from '/vite.svg';

// Initialize header scroll effect
function initHeaderScroll() {
  const header = document.getElementById('header');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  });
}

// Mobile navigation toggle
function initMobileNav() {
  const mobileNavToggle = document.querySelector('.mobile-nav-toggle');
  const navLinks = document.querySelector('.nav-links');

  if (mobileNavToggle && navLinks) {
    mobileNavToggle.addEventListener('click', () => {
      mobileNavToggle.classList.toggle('active');
      navLinks.classList.toggle('active');
    });

    // Close mobile nav when clicking on a link
    const links = document.querySelectorAll('.nav-links a');
    links.forEach(link => {
      link.addEventListener('click', () => {
        mobileNavToggle.classList.remove('active');
        navLinks.classList.remove('active');
      });
    });
  }
}

// Smooth scrolling for anchor links
function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      e.preventDefault();
      const targetId = this.getAttribute('href');
      const targetElement = document.querySelector(targetId);
      
      if (targetElement) {
        const headerHeight = document.getElementById('header').offsetHeight;
        const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - headerHeight;
        
        window.scrollTo({
          top: targetPosition,
          behavior: 'smooth'
        });
      }
    });
  });
}

// Curriculum module toggles
function initCurriculumToggles() {
  const modules = document.querySelectorAll('.timeline-module');
  
  modules.forEach(module => {
    const header = module.querySelector('.module-header');
    
    header.addEventListener('click', () => {
      module.classList.toggle('active');
    });
  });
}

// FAQ accordion
function initFaqAccordion() {
  const faqItems = document.querySelectorAll('.faq-item');
  
  faqItems.forEach(item => {
    const question = item.querySelector('.faq-question');
    
    question.addEventListener('click', () => {
      // Close other open items
      faqItems.forEach(otherItem => {
        if (otherItem !== item && otherItem.classList.contains('active')) {
          otherItem.classList.remove('active');
        }
      });
      
      item.classList.toggle('active');
    });
  });
}

// Testimonial carousel
function initTestimonialCarousel() {
  const track = document.getElementById('testimonial-track');
  const prevBtn = document.getElementById('prev-testimonial');
  const nextBtn = document.getElementById('next-testimonial');
  const dotsContainer = document.getElementById('carousel-dots');
  
  if (!track || !prevBtn || !nextBtn || !dotsContainer) return;
  
  const testimonials = track.querySelectorAll('.testimonial-card');
  let currentIndex = 0;
  
  // Create dots
  testimonials.forEach((_, index) => {
    const dot = document.createElement('div');
    dot.classList.add('carousel-dot');
    if (index === 0) dot.classList.add('active');
    dot.addEventListener('click', () => goToSlide(index));
    dotsContainer.appendChild(dot);
  });
  
  // Update dots
  function updateDots() {
    const dots = dotsContainer.querySelectorAll('.carousel-dot');
    dots.forEach((dot, index) => {
      if (index === currentIndex) {
        dot.classList.add('active');
      } else {
        dot.classList.remove('active');
      }
    });
  }
  
  // Go to specific slide
  function goToSlide(index) {
    if (index < 0) {
      index = testimonials.length - 1;
    } else if (index >= testimonials.length) {
      index = 0;
    }
    
    currentIndex = index;
    track.style.transform = `translateX(-${currentIndex * 100}%)`;
    updateDots();
  }
  
  // Event listeners
  prevBtn.addEventListener('click', () => goToSlide(currentIndex - 1));
  nextBtn.addEventListener('click', () => goToSlide(currentIndex + 1));
  
  // Auto slide every 5 seconds
  let interval = setInterval(() => goToSlide(currentIndex + 1), 5000);
  
  // Pause auto-slide on hover
  track.addEventListener('mouseenter', () => clearInterval(interval));
  track.addEventListener('mouseleave', () => {
    clearInterval(interval);
    interval = setInterval(() => goToSlide(currentIndex + 1), 5000);
  });
}

// Countdown timer
function initCountdown() {
  const countdown = document.getElementById('countdown');
  if (!countdown) return;
  
  // Set the countdown date (7 days from now)
  const countdownDate = new Date();
  countdownDate.setDate(countdownDate.getDate() + 7);
  
  function updateCountdown() {
    const now = new Date().getTime();
    const distance = countdownDate - now;
    
    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);
    
    countdown.querySelector('.days').textContent = days.toString().padStart(2, '0');
    countdown.querySelector('.hours').textContent = hours.toString().padStart(2, '0');
    countdown.querySelector('.minutes').textContent = minutes.toString().padStart(2, '0');
    countdown.querySelector('.seconds').textContent = seconds.toString().padStart(2, '0');
    
    if (distance < 0) {
      clearInterval(countdownInterval);
      countdown.innerHTML = "Offer Expired";
    }
  }
  
  updateCountdown();
  const countdownInterval = setInterval(updateCountdown, 1000);
}

// Animate on scroll effect
function initScrollAnimations() {
  const animatedElements = document.querySelectorAll('[data-aos]');
  
  const checkIfInView = () => {
    animatedElements.forEach(element => {
      const elementPosition = element.getBoundingClientRect();
      const elementTop = elementPosition.top;
      const windowHeight = window.innerHeight;
      
      if (elementTop < windowHeight * 0.85) {
        element.classList.add('aos-animate');
      }
    });
  };
  
  // Add animate class
  animatedElements.forEach(element => {
    element.classList.add('aos-init');
    
    // Get delay attribute
    const delay = element.getAttribute('data-aos-delay');
    if (delay) {
      element.style.transitionDelay = `${delay}ms`;
    }
  });
  
  window.addEventListener('scroll', checkIfInView);
  window.addEventListener('resize', checkIfInView);
  window.addEventListener('load', checkIfInView);
  
  // Initial check
  checkIfInView();
}

// Initialize all functions
document.addEventListener('DOMContentLoaded', () => {
  initHeaderScroll();
  initMobileNav();
  initSmoothScroll();
  initCurriculumToggles();
  initFaqAccordion();
  initTestimonialCarousel();
  initCountdown();
  initScrollAnimations();
});