import '../style.css';
import { setupNavigation } from './navigation.js';
import { setupAnimations } from './animations.js';
import { setupFaq } from './faq.js';
import { setupTestimonials } from './testimonials.js';
import { setupCodeTyping } from './codeTyping.js';
import { setupCountdown } from './countdown.js';
import { setupForm } from './form.js';

// Initialize all components when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  setupNavigation();
  setupAnimations();
  setupFaq();
  setupTestimonials();
  setupCodeTyping();
  setupCountdown();
  setupForm();
});