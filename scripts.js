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
    // Example: Voice prompts for ages 1-5
    if (e.target.value === '1-5') {
      speak('Welcome to Curiosity Cosmos! Let\'s have fun learning!');
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

  // Language Toggle (Placeholder - Would require translation library for full implementation in this demo)
  languageToggle.addEventListener('change', (e) => {
    alert(`Switching to ${e.target.value}. (Translation not implemented in this demo)`);
  });

  // Carousel Scrolling
  const carousels = document.querySelectorAll('.carousel, .topic-carousel');
  carousels.forEach(carousel => {
    carousel.addEventListener('wheel', (e) => {
      e.preventDefault();
      carousel.scrollLeft += e.deltaY;
    });
  });

  // Dynamic Content for Try Free Activity
  tryFree.addEventListener('click', (e) => {
    e.preventDefault();
    fetch('data/sample-activity.html')
      .then(response => response.text())
      .then(html => {
        const dynamicArea = document.createElement('div');
        dynamicArea.innerHTML = html;
        document.body.appendChild(dynamicArea);
      });
  });

  // Hover Effects for Interactive Elements
  const cards = document.querySelectorAll('.feature-card, .topic-card, .reward-card, blockquote');
  cards.forEach(card => {
    card.addEventListener('mouseenter', () => {
      card.style.transform = 'scale(1.05)';
    });
    card.addEventListener('mouseleave', () => {
      card.style.transform = 'scale(1)';
    });
  });

  // Gamification: Add confetti on button click (simple animation)
  const buttons = document.querySelectorAll('.btn');
  buttons.forEach(button => {
    button.addEventListener('click', () => {
      const confetti = document.createElement('div');
      confetti.classList.add('confetti');
      button.appendChild(confetti);
      setTimeout(() => confetti.remove(), 1000);
    });
  });
});
