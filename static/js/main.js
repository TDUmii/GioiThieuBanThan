(function () {
  'use strict';

  document.documentElement.classList.add('js');

  var menuToggle = document.querySelector('[data-menu-toggle]');
  var siteNav = document.querySelector('[data-site-nav]');
  var header = document.querySelector('[data-header]');
  var lightbox = document.querySelector('#lightbox');
  var lightboxImage = document.querySelector('#lightbox-image');
  var lightboxTitle = document.querySelector('#lightbox-title');
  var lightboxCount = document.querySelector('#lightbox-count');
  var lightboxStatus = document.querySelector('#lightbox-status');
  var gallery = Array.from(document.querySelectorAll('.js-lightbox-trigger[data-image]'));
  var activeImage = 0;
  var lastFocusedElement = null;
  var previousOverflow = '';
  var imageDirection = 0;
  var albumAnimation = null;

  function setMenu(open) {
    menuToggle.setAttribute('aria-expanded', String(open));
    siteNav.classList.toggle('is-open', open);
    var label = menuToggle.querySelector('.sr-only');
    if (label) {
      label.textContent = open ? 'Đóng menu' : 'Mở menu';
    }
    menuToggle.setAttribute('aria-label', open ? 'Đóng menu' : 'Mở menu');
  }

  function closeMenu() {
    if (menuToggle && siteNav) {
      setMenu(false);
    }
  }

  if (menuToggle && siteNav) {
    setMenu(false);
    menuToggle.addEventListener('click', function () {
      setMenu(menuToggle.getAttribute('aria-expanded') !== 'true');
    });

    siteNav.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', closeMenu);
    });

    document.addEventListener('click', function (event) {
      if (!siteNav.contains(event.target) && !menuToggle.contains(event.target)) {
        closeMenu();
      }
    });
    document.addEventListener('keydown', function (event) {
      if (event.key === 'Escape' && menuToggle.getAttribute('aria-expanded') === 'true' && !(lightbox && lightbox.open)) {
        event.preventDefault();
        closeMenu();
        menuToggle.focus();
      }
    });
  }

  var reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
  var runningAnimations = new Set();
  var scene = document.querySelector('[data-hero-scene]');
  var heroPlayed = false;
  var paws = Array.from(document.querySelectorAll('.paw-trail span'));
  var pawAnimations = [];

  function playMotion(element, frames, options) {
    if (!element || reducedMotion.matches || document.hidden || typeof element.animate !== 'function') {
      return null;
    }
    var animation = element.animate(frames, Object.assign({ fill: 'backwards' }, options));
    runningAnimations.add(animation);
    animation.onfinish = animation.oncancel = function () {
      runningAnimations.delete(animation);
    };
    return animation;
  }

  // Two photographs placed on a page: the old memory, then the present.
  // Nothing is hidden before this finite, optional sequence starts.
  function placePhotographs() {
    if (!scene || heroPlayed || document.hidden) { return; }
    heroPlayed = true;
    var past = scene.querySelector('[data-photo-then]');
    var present = scene.querySelector('[data-photo-now]');
    [past, present].forEach(function (photo, index) {
      if (!photo) { return; }
      var resting = getComputedStyle(photo).transform;
      playMotion(photo, [
        { opacity: .45, transform: index ? 'translate(18px, 26px) rotate(9deg) scale(.94)' : 'translate(-18px, 14px) rotate(-15deg) scale(.94)' },
        { opacity: 1, transform: resting }
      ], { duration: 620, delay: index * 100, easing: 'cubic-bezier(.16, 1, .3, 1)' });
    });
    playMotion(scene.querySelector('.icon-flow-line'), [
      { strokeDashoffset: '1', opacity: .2 },
      { strokeDashoffset: '0', opacity: 1 }
    ], { duration: 420, delay: 300, easing: 'ease-out' });
  }

  if (scene && 'IntersectionObserver' in window) {
    var sceneObserver = new IntersectionObserver(function (entries, observer) {
      if (entries.some(function (entry) { return entry.isIntersecting; })) {
        placePhotographs();
        if (heroPlayed) { observer.disconnect(); }
      }
    }, { threshold: .1 });
    sceneObserver.observe(scene);
  } else {
    placePhotographs();
  }

  function greetWithPaws() {
    if (pawAnimations.some(function (animation) { return animation.playState === 'running'; })) { return; }
    pawAnimations = paws.map(function (paw, index) {
      var resting = getComputedStyle(paw).transform;
      return playMotion(paw, [
        { opacity: .2, transform: 'translateY(7px) scale(.8)' },
        { opacity: 1, transform: resting, offset: .45 },
        { opacity: .45, transform: resting }
      ], { duration: 420, delay: index * 70, easing: 'ease-out' });
    }).filter(Boolean);
  }
  var animalPhoto = document.querySelector('[data-animal-photo]');
  if (animalPhoto) {
    animalPhoto.addEventListener('pointerenter', greetWithPaws);
    animalPhoto.addEventListener('focus', greetWithPaws);
  }
  function cancelMotion() {
    runningAnimations.forEach(function (animation) { animation.cancel(); });
    runningAnimations.clear();
  }
  reducedMotion.addEventListener('change', function () {
    if (reducedMotion.matches) { cancelMotion(); }
  });
  document.addEventListener('visibilitychange', function () {
    if (document.hidden) { cancelMotion(); }
    else if (scene && !heroPlayed && scene.getBoundingClientRect().top < window.innerHeight && scene.getBoundingClientRect().bottom > 0) { placePhotographs(); }
  });

  function showImage(index, direction) {
    if (albumAnimation) { albumAnimation.cancel(); }
    imageDirection = direction === undefined ? Math.sign(index - activeImage) : direction;
    activeImage = (index + gallery.length) % gallery.length;
    var trigger = gallery[activeImage];
    var caption = trigger.getAttribute('data-caption') || '';
    if (lightboxTitle) {
      lightboxTitle.textContent = trigger.getAttribute('data-title') || caption || 'Xem ảnh';
    }
    if (lightboxCount) {
      lightboxCount.textContent = (activeImage + 1) + ' / ' + gallery.length;
    }
    if (lightboxStatus) {
      lightboxStatus.textContent = 'Đang tải ảnh...';
    }
    lightboxImage.alt = trigger.getAttribute('data-alt') || '';
    lightboxImage.src = trigger.getAttribute('data-image');
  }

  if (lightbox && lightboxImage && typeof lightbox.showModal === 'function') {
    lightboxImage.addEventListener('load', function () {
      if (lightboxStatus) {
        lightboxStatus.textContent = '';
      }
      if (lightbox.open) {
        albumAnimation = playMotion(lightboxImage, [
          { opacity: .6, transform: 'translateX(' + imageDirection * 24 + 'px)' },
          { opacity: 1, transform: 'translateX(0)' }
        ], { duration: 220, easing: 'cubic-bezier(.16, 1, .3, 1)' });
      }
    });
    lightboxImage.addEventListener('error', function () {
      if (lightboxStatus) {
        lightboxStatus.textContent = 'Không tải được ảnh. Thử ảnh khác.';
      }
    });
    gallery.forEach(function (trigger, index) {
      trigger.addEventListener('click', function (event) {
        event.preventDefault();
        if (lightbox.open) {
          return;
        }
        closeMenu();
        lastFocusedElement = trigger;
        showImage(index, 0);
        previousOverflow = document.body.style.overflow;
        lightbox.hidden = false;
        lightbox.showModal();
        document.body.style.overflow = 'hidden';
      });
    });
    lightbox.querySelectorAll('[data-lightbox-close]').forEach(function (button) {
      button.addEventListener('click', function () {
        lightbox.close();
      });
    });
    lightbox.querySelectorAll('[data-lightbox-prev], [data-lightbox-next]').forEach(function (button) {
      button.addEventListener('click', function () {
        showImage(activeImage + (button.hasAttribute('data-lightbox-prev') ? -1 : 1));
      });
    });
    lightbox.addEventListener('keydown', function (event) {
      if (event.key === 'Tab') {
        var controls = lightbox.querySelectorAll('button:not(:disabled)');
        var first = controls[0];
        var last = controls[controls.length - 1];
        if (event.shiftKey && event.target === first) {
          event.preventDefault();
          last.focus();
        } else if (!event.shiftKey && event.target === last) {
          event.preventDefault();
          first.focus();
        }
        return;
      }
      if (event.altKey || event.ctrlKey || event.metaKey || event.shiftKey || event.target.matches('input, textarea, select, [contenteditable]')) {
        return;
      }
      if (event.key === 'ArrowLeft' || event.key === 'ArrowRight') {
        event.preventDefault();
        showImage(activeImage + (event.key === 'ArrowLeft' ? -1 : 1));
      }
    });
    lightbox.addEventListener('close', function () {
      if (albumAnimation) { albumAnimation.cancel(); }
      document.body.style.overflow = previousOverflow;
      if (lastFocusedElement && lastFocusedElement.isConnected) {
        lastFocusedElement.focus({ preventScroll: true });
      }
    });

    function outsideDialog(event) {
      var bounds = lightbox.getBoundingClientRect();
      return event.target === lightbox && (event.clientX < bounds.left || event.clientX > bounds.right || event.clientY < bounds.top || event.clientY > bounds.bottom);
    }
    var backdropPointer = null;
    lightbox.addEventListener('pointerdown', function (event) {
      backdropPointer = event.button === 0 && outsideDialog(event) ? event.pointerId : null;
    });
    lightbox.addEventListener('pointerup', function (event) {
      if (backdropPointer === event.pointerId && outsideDialog(event)) {
        lightbox.close();
      }
      backdropPointer = null;
    });
    lightbox.addEventListener('pointercancel', function () {
      backdropPointer = null;
    });

    // Adapted gesture pattern from the local Sneaker-Wheel project.
    var swipeStart = null;
    lightboxImage.draggable = false;
    lightboxImage.addEventListener('pointerdown', function (event) {
      if (!event.isPrimary || event.button !== 0) { return; }
      swipeStart = { x: event.clientX, y: event.clientY, id: event.pointerId };
      lightboxImage.setPointerCapture(event.pointerId);
    });
    lightboxImage.addEventListener('pointerup', function (event) {
      if (!swipeStart || swipeStart.id !== event.pointerId) { return; }
      var dx = event.clientX - swipeStart.x;
      var dy = event.clientY - swipeStart.y;
      swipeStart = null;
      if (Math.abs(dx) > 45 && Math.abs(dx) > Math.abs(dy)) {
        showImage(activeImage + (dx < 0 ? 1 : -1));
      }
    });
    lightboxImage.addEventListener('pointercancel', function () { swipeStart = null; });
  }

  var progress = document.querySelector('#reading-progress');
  var sections = siteNav ? Array.from(siteNav.querySelectorAll('a[href^="#"]')).map(function (link) {
    return { link: link, section: document.getElementById(link.getAttribute('href').slice(1)) };
  }).filter(function (item) {
    return item.section;
  }) : [];
  var timeline = document.querySelector('[data-timeline]');
  var timelineFill = document.querySelector('[data-timeline-fill]');
  var chapters = timeline ? Array.from(timeline.querySelectorAll('.timeline-item')) : [];
  var scrollQueued = false;

  function updateScroll() {
    scrollQueued = false;
    var scrollTop = window.scrollY;
    var scrollable = Math.max(0, document.documentElement.scrollHeight - window.innerHeight);
    var readingLine = window.innerHeight * .56;
    if (timeline && timelineFill) {
      var bounds = timeline.getBoundingClientRect();
      var fraction = bounds.height ? Math.max(0, Math.min(1, (readingLine - bounds.top) / bounds.height)) : 0;
      timelineFill.style.transform = 'scaleY(' + fraction + ')';
      chapters.forEach(function (chapter) {
        var chapterBounds = chapter.getBoundingClientRect();
        chapter.classList.toggle('is-past', chapterBounds.bottom < readingLine);
        chapter.classList.toggle('is-current', chapterBounds.top <= readingLine && chapterBounds.bottom >= readingLine);
      });
    }
    if (header) {
      header.classList.toggle('is-scrolled', scrollTop > 20);
    }
    if (progress) {
      var percent = scrollable ? Math.max(0, Math.min(100, scrollTop / scrollable * 100)) : 100;
      if (progress.tagName === 'PROGRESS') {
        progress.max = 100;
        progress.value = percent;
      } else {
        progress.style.transform = 'scaleX(' + percent / 100 + ')';
        progress.style.transformOrigin = 'left';
        if (progress.getAttribute('role') === 'progressbar') {
          progress.setAttribute('aria-valuenow', String(Math.round(percent)));
        }
      }
    }
    var active = null;
    var cutoff = Math.min(window.innerHeight * 0.35, (header ? header.getBoundingClientRect().height : 0) + 80);
    sections.forEach(function (item) {
      if (item.section.getBoundingClientRect().top <= cutoff) {
        active = item;
      }
    });
    if (sections.length && scrollable > 0 && scrollTop >= scrollable - 2) {
      active = sections[sections.length - 1];
    }
    sections.forEach(function (item) {
      if (item === active) {
        item.link.setAttribute('aria-current', 'location');
      } else {
        item.link.removeAttribute('aria-current');
      }
    });
  }

  function queueScroll() {
    if (!scrollQueued) {
      scrollQueued = true;
      window.requestAnimationFrame(updateScroll);
    }
  }
  updateScroll();
  window.addEventListener('scroll', queueScroll, { passive: true });
  window.addEventListener('resize', queueScroll);
  window.addEventListener('load', queueScroll);
  document.querySelectorAll('img').forEach(function (image) {
    image.addEventListener('load', queueScroll);
  });

  var year = document.querySelector('#current-year');
  if (year) {
    year.textContent = new Date().getFullYear();
  }
}());
