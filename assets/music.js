(() => {
  const button = document.querySelector('[data-music-toggle]');
  if (!button) return;

  const music = new Audio('assets/background-music');
  music.loop = true;
  music.volume = 0.35;
  let isPlaying = false;

  function updateButtonState() {
    button.textContent = isPlaying ? 'Sound: on' : 'Sound: off';
    button.setAttribute('aria-pressed', String(isPlaying));
  }

  async function toggleMusic() {
    try {
      if (music.paused) {
        await music.play();
        isPlaying = true;
      } else {
        music.pause();
        music.currentTime = 0;
        isPlaying = false;
      }
    } catch (error) {
      console.warn('Background music playback failed:', error);
      isPlaying = false;
    }

    updateButtonState();
  }

  button.addEventListener('click', toggleMusic);
  button.addEventListener('keydown', (event) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      toggleMusic();
    }
  });

  updateButtonState();
})();
