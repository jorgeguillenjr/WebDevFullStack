/**
 * Sets up enrollment form functionality
 */
export function setupForm() {
  const enrollForm = document.getElementById('enrollForm');
  
  if (!enrollForm) return;
  
  enrollForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    // Get form data
    const formData = new FormData(enrollForm);
    const formValues = Object.fromEntries(formData.entries());
    
    // Basic form validation
    let isValid = true;
    const requiredFields = ['firstName', 'lastName', 'email', 'phone', 'plan'];
    
    requiredFields.forEach(field => {
      const input = enrollForm.querySelector(`[name="${field}"]`);
      if (!formValues[field]) {
        isValid = false;
        input.classList.add('error');
      } else {
        input.classList.remove('error');
      }
    });
    
    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const emailInput = enrollForm.querySelector('[name="email"]');
    
    if (formValues.email && !emailRegex.test(formValues.email)) {
      isValid = false;
      emailInput.classList.add('error');
    }
    
    // If form is valid, process the submission
    if (isValid) {
      // In a real application, you would send this data to a server
      // For demo purposes, show a success message
      
      // Create success message
      const successMessage = document.createElement('div');
      successMessage.className = 'form-success';
      successMessage.innerHTML = `
        <h3>Enrollment Successful!</h3>
        <p>Thank you, ${formValues.firstName}! Your application has been received.</p>
        <p>We've sent a confirmation email to <strong>${formValues.email}</strong> with next steps.</p>
        <p>A member of our team will contact you shortly at <strong>${formValues.phone}</strong> to discuss your enrollment.</p>
      `;
      
      // Replace form with success message
      enrollForm.innerHTML = '';
      enrollForm.appendChild(successMessage);
      
      // Scroll to the success message
      successMessage.scrollIntoView({ behavior: 'smooth' });
      
      // Log form data to console (for demo purposes)
      console.log('Form submitted with values:', formValues);
    } else {
      // Show error message
      let errorMessage = enrollForm.querySelector('.form-error');
      
      if (!errorMessage) {
        errorMessage = document.createElement('div');
        errorMessage.className = 'form-error';
        errorMessage.textContent = 'Please complete all required fields correctly.';
        enrollForm.querySelector('.form-submit').prepend(errorMessage);
      }
    }
  });
  
  // Add input event listeners to clear error state when user types
  const formInputs = enrollForm.querySelectorAll('input, select');
  formInputs.forEach(input => {
    input.addEventListener('input', () => {
      input.classList.remove('error');
      const errorMessage = enrollForm.querySelector('.form-error');
      if (errorMessage) {
        errorMessage.remove();
      }
    });
  });
}