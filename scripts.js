document.addEventListener('DOMContentLoaded', () => {
  const body = document.body;
  const ageGroup = document.getElementById('ageGroup');
  const textToSpeech = document.getElementById('textToSpeech');
  const tryFree = document.querySelector('.try-free');
  const languageToggle = document.getElementById('languageToggle');
  const navToggle = document.querySelector('.nav-toggle');
  const navLinks = document.querySelector('.nav-links');

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
    carousel.add
