/**
 * Sets up FAQ accordion functionality
 */
export function setupFaq() {
  const faqItems = document.querySelectorAll('.faq-item');
  
  faqItems.forEach(item => {
    const question = item.querySelector('.faq-question');
    
    if (question) {
      question.addEventListener('click', () => {
        // Check if this item is already active
        const isActive = item.classList.contains('active');
        
        // Close all other FAQ items first
        faqItems.forEach(otherItem => {
          if (otherItem !== item) {
            otherItem.classList.remove('active');
          }
        });
        
        // Toggle the active state of the clicked item
        if (isActive) {
          item.classList.remove('active');
        } else {
          item.classList.add('active');
        }
      });
    }
  });
  
  // Open the first FAQ item by default
  if (faqItems.length > 0) {
    faqItems[0].classList.add('active');
  }
}