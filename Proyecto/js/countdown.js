/**
 * Sets up countdown timer for enrollment deadline
 */
export function setupCountdown() {
  const daysElement = document.getElementById('timerDays');
  const hoursElement = document.getElementById('timerHours');
  const minutesElement = document.getElementById('timerMinutes');
  const secondsElement = document.getElementById('timerSeconds');
  
  if (!daysElement || !hoursElement || !minutesElement || !secondsElement) return;
  
  // Set the date we're counting down to (2 weeks from now)
  const currentDate = new Date();
  const targetDate = new Date();
  targetDate.setDate(currentDate.getDate() + 14);
  targetDate.setHours(23, 59, 59, 0);
  
  // Update the countdown every second
  const countdownInterval = setInterval(updateCountdown, 1000);
  
  // Initial call to display countdown immediately
  updateCountdown();
  
  function updateCountdown() {
    // Get current date and time
    const now = new Date().getTime();
    
    // Find the distance between now and the countdown date
    const distance = targetDate.getTime() - now;
    
    // Time calculations for days, hours, minutes and seconds
    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);
    
    // Update the elements with the calculated values
    daysElement.textContent = days.toString().padStart(2, '0');
    hoursElement.textContent = hours.toString().padStart(2, '0');
    minutesElement.textContent = minutes.toString().padStart(2, '0');
    secondsElement.textContent = seconds.toString().padStart(2, '0');
    
    // If the countdown is finished, display expired message
    if (distance < 0) {
      clearInterval(countdownInterval);
      
      daysElement.textContent = "00";
      hoursElement.textContent = "00";
      minutesElement.textContent = "00";
      secondsElement.textContent = "00";
      
      const timerLabel = document.querySelector('.timer-label');
      if (timerLabel) {
        timerLabel.textContent = "Registration closed!";
      }
    }
  }
}