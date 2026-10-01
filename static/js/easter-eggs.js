(function () {
  'use strict';
  var script = document.currentScript;
  var pawSrc = script && script.dataset.pawSrc;
  var companion = document.querySelector('[data-cat-companion]');
  if (!companion || !pawSrc) { return; }
  var cat = companion.querySelector('[data-corner-cat]');
  var art = companion.querySelector('.cat-art');
  var sound = companion.querySelector('[data-cat-sound]');
  var audio = companion.querySelector('[data-cat-audio]');
  var status = companion.querySelector('[data-cat-status]');
  var reduced = window.matchMedia('(prefers-reduced-motion: reduce)');
  var animations = new Set();
  var catTimer = 0;
  var catBusy = false;
  var catGeneration = 0;
  var muted = false;
  var activePaw = null;
  companion.hidden = false;
  audio.volume = .4;

  function animate(element, frames, duration) {
    if (typeof element.animate !== 'function') { return null; }
    var animation = element.animate(frames, { duration: duration, easing: 'linear' });
    animations.add(animation);
    animation.finished.then(function () { animations.delete(animation); }, function () { animations.delete(animation); });
    return animation;
  }

  function finishCat() {
    catGeneration += 1;
    clearTimeout(catTimer);
    catTimer = 0;
    catBusy = false;
    cat.classList.remove('is-meowing');
    audio.pause();
    audio.currentTime = 0;
  }

  cat.addEventListener('click', function () {
    if (catBusy || document.hidden) { return; }
    catBusy = true;
    var generation = ++catGeneration;
    cat.classList.add('is-meowing');
    status.textContent = '';
    if (!reduced.matches) {
      animate(art, [
        { transform: 'none', offset: 0 },
        { transform: 'translateY(-4px) rotate(-3deg)', offset: .3, easing: 'ease-out' },
        { transform: 'translateY(-1px) rotate(2deg)', offset: .65, easing: 'ease-in-out' },
        { transform: 'none', offset: 1 }
      ], 650);
    }
    // Sound is only requested synchronously from this explicit button activation.
    catTimer = setTimeout(finishCat, 5000);
    if (muted) {
      status.textContent = 'Mèo chào bạn, đang tắt tiếng.';
      clearTimeout(catTimer);
      catTimer = setTimeout(finishCat, 700);
      return;
    }
    audio.currentTime = 0;
    var playing = audio.play();
    if (playing && typeof playing.catch === 'function') {
      playing.catch(function () {
        if (generation !== catGeneration) { return; }
        status.textContent = 'Mèo chào bạn. Trình duyệt chưa phát được tiếng.';
        clearTimeout(catTimer);
        catTimer = setTimeout(finishCat, 700);
      });
    }
  });
  audio.addEventListener('playing', function () {
    if (muted || !catBusy || document.hidden) { audio.pause(); return; }
    status.textContent = 'Meo!';
  });
  audio.addEventListener('ended', finishCat);
  audio.addEventListener('error', function () {
    status.textContent = 'Mèo chào bạn. Âm thanh chưa tải được.';
    finishCat();
  });
  sound.addEventListener('click', function () {
    muted = !muted;
    sound.setAttribute('aria-pressed', String(muted));
    sound.setAttribute('aria-label', muted ? 'Bật tiếng mèo' : 'Tắt tiếng mèo');
    sound.title = muted ? 'Bật tiếng mèo' : 'Tắt tiếng mèo';
    status.textContent = muted ? 'Đã tắt tiếng mèo.' : 'Đã bật tiếng mèo.';
    if (muted) { finishCat(); }
  });

  function stopPaw() {
    if (!activePaw) { return; }
    activePaw.animations.forEach(function (animation) { animation.cancel(); });
    clearTimeout(activePaw.timer);
    activePaw.shell.classList.remove('is-paw-reaching');
    activePaw = null;
  }

  document.querySelectorAll('.js-lightbox-trigger').forEach(function (button) {
    var shell = document.createElement('div');
    shell.className = 'photo-peek';
    button.before(shell);
    shell.appendChild(button);
    var paws = ['back', 'front'].map(function (face) {
      var paw = document.createElement('img');
      paw.src = pawSrc;
      paw.alt = '';
      paw.setAttribute('aria-hidden', 'true');
      paw.className = 'photo-paw photo-paw--' + face;
      paw.width = 800;
      paw.height = 846;
      shell.appendChild(paw);
      return paw;
    });
    var lastReach = -Infinity;
    function reach() {
      var now = performance.now();
      if (document.hidden || document.querySelector('.lightbox[open]') || now - lastReach < 1800) { return; }
      if (typeof paws[0].animate !== 'function') { return; }
      lastReach = now;
      stopPaw();
      shell.classList.add('is-paw-reaching');
      var motion;
      if (reduced.matches) {
        motion = [animate(paws[1], [
          { opacity: 0, transform: 'translateX(-4px) rotate(-88deg)' },
          { opacity: 1, transform: 'translateX(-4px) rotate(-88deg)', offset: .2 },
          { opacity: 1, transform: 'translateX(-4px) rotate(-88deg)', offset: .65 },
          { opacity: 0, transform: 'translateX(-4px) rotate(-88deg)' }
        ], 450)];
      } else {
        var positions = [
          { transform: 'translateX(-36px) rotate(-78deg)', offset: 0, easing: 'cubic-bezier(.16,1,.3,1)' },
          { transform: 'translateX(8px) rotate(-78deg)', offset: .32, easing: 'ease-in-out' },
          { transform: 'translateX(-8px) rotate(-103deg)', offset: .52, easing: 'ease-in-out' },
          { transform: 'translateX(-4px) rotate(-93deg)', offset: .65, easing: 'ease-in' },
          { transform: 'translateX(-36px) rotate(-78deg)', offset: 1 }
        ];
        motion = paws.map(function (paw, index) {
          var opacity = index ? [0, 0, 1, 1, 0] : [1, 1, 1, 1, 0];
          return animate(paw, positions.map(function (frame, i) { return Object.assign({ opacity: opacity[i] }, frame); }), 1100);
        });
      }
      activePaw = { shell: shell, animations: motion, timer: setTimeout(stopPaw, reduced.matches ? 460 : 1110) };
    }
    shell.addEventListener('pointerenter', function (event) { if (event.pointerType !== 'touch') { reach(); } }, { passive: true });
    shell.addEventListener('pointerdown', function (event) { if (event.pointerType === 'touch') { reach(); } }, { passive: true });
    button.addEventListener('focus', reach);
  });

  function stop() {
    stopPaw();
    finishCat();
    animations.forEach(function (animation) { animation.cancel(); });
    animations.clear();
  }
  document.addEventListener('visibilitychange', function () { if (document.hidden) { stop(); } });
  window.addEventListener('pagehide', stop);
  reduced.addEventListener('change', stop);
  var lightbox = document.querySelector('#lightbox');
  if (lightbox) {
    new MutationObserver(function () { if (lightbox.open) { stop(); } }).observe(lightbox, { attributes: true, attributeFilter: ['open'] });
  }
})();
