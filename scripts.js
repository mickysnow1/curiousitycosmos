document.addEventListener('DOMContentLoaded', () => {
  const body = document.body;
  const ageGroup = document.getElementById('ageGroup');
  const textToSpeech = document.getElementById('textToSpeech');
  const tryFree = document.querySelector('.try-free');
  const languageToggle = document.getElementById('languageToggle');

  // Age Differentiation
  ageGroup.addEventListener('change', (e) => {
    body.className = '';
    body.classList.add(`age${e.target.value}`);
    if (e.target.value === '1-5') {
      speak('Welcome to Curiosity Cosmos! Let’s have fun learning!');
    }
  });

  // Text-to-Speech
  function speak(text) {
    if ('speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(text);
      speechSynthesis.speak(utterance);
    }
  }
  textToSpeech.addEventListener('click', () => {
    const text = document.body.innerText;
    speak(text);
  });

  // Language Toggle
  languageToggle.addEventListener('change', (e) => {
    alert(`Switching to ${e.target.value}. (Translation not implemented)`);
  });

  // Carousel Scrolling
  const carousels = document.querySelectorAll('.carousel, .topic-carousel');
  carousels.forEach(carousel => {
    carousel.addEventListener('wheel', (e) => {
      e.preventDefault();
      carousel.scrollLeft += e.deltaY;
    });
  });

  // Dynamic Content (Fixed to remove existing popup)
  tryFree.addEventListener('click', (e) => {
    e.preventDefault();
    // Remove any existing popup
    const existingPopup = document.querySelector('.activity-popup');
    if (existingPopup) {
      existingPopup.remove();
    }
    // Create new popup
    const activity = `<div class="activity-popup"><h3>Make a Paper Crane!</h3><p>Fold a paper into a crane shape. Share a photo with us!</p><button class="btn close">Done</button></div>`;
    const popup = document.createElement('div');
    popup.innerHTML = activity;
    document.body.appendChild(popup);
    // Add event listener to close popup
    popup.querySelector('.close').addEventListener('click', () => popup.remove());
  });

  // Hover Effects
  const cards = document.querySelectorAll('.feature-card, .topic-card, .reward-card, .support-card, blockquote');
  cards.forEach(card => {
    card.addEventListener('mouseenter', () => {
      card.style.transform = 'scale(1.05)';
    });
    card.addEventListener('mouseleave', () => {
      card.style.transform = 'scale(1)';
    });
  });
});
