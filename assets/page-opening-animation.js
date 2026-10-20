(() => {
  const playedKey = 'nimcraft-home-opening-played';
  if (sessionStorage.getItem(playedKey) === 'true' || window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    window.pageOpeningAnimationPromise = Promise.resolve();
    return;
  }

  const script = document.currentScript;
  if (!script) {
    console.error('Page-opening animation could not determine its video URL.');
    window.pageOpeningAnimationPromise = Promise.resolve();
    return;
  }

  sessionStorage.setItem(playedKey, 'true');
  document.documentElement.style.visibility = 'hidden';

  const overlay = document.createElement('div');
  overlay.className = 'page-opening-animation';
  overlay.setAttribute('aria-hidden', 'true');
  Object.assign(overlay.style, {
    position: 'fixed',
    inset: '0',
    zIndex: '2147483647',
    display: 'grid',
    placeItems: 'center',
    visibility: 'visible',
    backgroundColor: '#050b16',
    opacity: '1',
    transition: 'opacity 400ms ease',
    pointerEvents: 'auto'
  });

  const video = document.createElement('video');
  video.autoplay = true;
  video.muted = true;
  video.playsInline = true;
  video.preload = 'auto';
  video.tabIndex = -1;
  video.src = new URL('1000287626.mp4', script.src).href;
  Object.assign(video.style, {
    width: '100vw',
    height: '100vh',
    objectFit: 'cover'
  });
  overlay.append(video);
  document.documentElement.append(overlay);

  window.pageOpeningAnimationPromise = new Promise((resolve) => {
    let dismissed = false;
    let fallbackTimer;

    function finish() {
      if (dismissed) return;
      dismissed = true;
      window.clearTimeout(fallbackTimer);
      overlay.style.opacity = '0';

      function revealPage() {
        overlay.remove();
        document.documentElement.style.visibility = '';
        resolve();
      }

      overlay.addEventListener('transitionend', (event) => {
        if (event.target === overlay && event.propertyName === 'opacity') revealPage();
      }, { once: true });
      window.setTimeout(revealPage, 500);
    }

    video.addEventListener('ended', finish, { once: true });
    video.addEventListener('error', () => {
      console.warn('Page-opening animation video could not be loaded.');
      finish();
    }, { once: true });

    fallbackTimer = window.setTimeout(finish, 8000);
    video.play().catch((error) => {
      console.warn('Page-opening animation could not autoplay.', error);
      finish();
    });
  });
})();
