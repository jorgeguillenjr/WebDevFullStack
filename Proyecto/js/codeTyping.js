/**
 * Sets up the code typing animation in the hero section
 */
export function setupCodeTyping() {
  const codeElement = document.getElementById('typingText');
  
  if (!codeElement) return;
  
  // Sample code to display in the typing animation
  const codeSnippet = `// Welcome to Full Stack Web Development
function createWebDeveloper(person) {
  // Start with a beginner
  let developer = {
    name: person.name,
    skills: [],
    projects: [],
    experience: 0
  };
  
  // Learn front-end skills
  const frontEndSkills = [
    'HTML', 'CSS', 'JavaScript', 
    'React', 'Responsive Design'
  ];
  
  // Learn back-end skills
  const backEndSkills = [
    'Node.js', 'Express', 
    'MongoDB', 'API Development',
    'Authentication'
  ];
  
  // Add all skills to developer
  developer.skills = [
    ...frontEndSkills,
    ...backEndSkills
  ];
  
  // Build awesome projects
  developer.projects.push(
    'Personal Portfolio',
    'E-commerce Platform',
    'Social Media App'
  );
  
  // Become job-ready
  developer.experience = 'Ready for Employment';
  
  return developer;
}

// Your journey starts here
const you = createWebDeveloper({
  name: 'Future Developer',
  motivation: 'Very High'
});

console.log('Ready to start your career!');`;

  // Split the code into characters for typing effect
  const characters = codeSnippet.split('');
  let charIndex = 0;
  
  // Function to type one character at a time
  function typeNextCharacter() {
    if (charIndex < characters.length) {
      codeElement.textContent += characters[charIndex];
      charIndex++;
      
      // Scroll to the bottom of the code container to show the latest typed text
      const codeContent = codeElement.closest('.code-content');
      if (codeContent) {
        codeContent.scrollTop = codeContent.scrollHeight;
      }
      
      // Randomize the typing speed slightly for a more realistic effect
      const typingSpeed = Math.random() * 30 + 20; // Between 20-50ms
      setTimeout(typeNextCharacter, typingSpeed);
    } else {
      // When typing is complete, add a blinking cursor effect
      codeElement.classList.add('typing-complete');
      
      // After a pause, restart the animation
      setTimeout(() => {
        codeElement.textContent = '';
        charIndex = 0;
        typeNextCharacter();
      }, 5000); // 5 second pause before restarting
    }
  }
  
  // Start the typing animation with a slight delay after page load
  setTimeout(() => {
    typeNextCharacter();
  }, 1000);
}