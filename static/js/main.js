(function () {
  'use strict';

  document.documentElement.classList.add('js');

  var menuToggle = document.querySelector('[data-menu-toggle]');
  var siteNav = document.querySelector('[data-site-nav]');
  var header = document.querySelector('[data-header]');
  var lightbox = document.querySelector('#lightbox');
  var lightboxImage = document.querySelector('#lightbox-image');
  var lightboxTitle = document.querySelector('#lightbox-title');
  var lightboxCaption = document.querySelector('#lightbox-caption');
  var lightboxCount = document.querySelector('#lightbox-count');
  var lightboxStatus = document.querySelector('#lightbox-status');
  var gallery = Array.from(document.querySelectorAll('.js-lightbox-trigger[data-image]'));
  var activeImage = 0;
  var lastFocusedElement = null;
  var previousOverflow = '';

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

  // Readable immediately, including without observers or animation support.
  var revealItems = document.querySelectorAll('[data-reveal]');
  revealItems.forEach(function (item) {
    item.classList.add('is-visible');
  });
  var reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
  if ('IntersectionObserver' in window && !reducedMotion.matches) {
    var revealObserver = new IntersectionObserver(function (entries, observer) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) {
          return;
        }
        observer.unobserve(entry.target);
        if (typeof entry.target.animate === 'function' && !reducedMotion.matches) {
          var delay = Number(entry.target.getAttribute('data-reveal-delay')) || 0;
          entry.target.animate([
            { opacity: 0, transform: 'translateY(16px)' },
            { opacity: 1, transform: 'translateY(0)' }
          ], { duration: 500, delay: Math.max(0, Math.min(delay, 240)), easing: 'ease-out' });
        }
      });
    }, { threshold: 0 });

    revealItems.forEach(function (item) {
      revealObserver.observe(item);
    });
  }

  function showImage(index) {
    activeImage = (index + gallery.length) % gallery.length;
    var trigger = gallery[activeImage];
    var caption = trigger.getAttribute('data-caption') || '';
    if (lightboxTitle) {
      lightboxTitle.textContent = trigger.getAttribute('data-title') || caption || 'Xem ảnh';
    }
    if (lightboxCaption) {
      lightboxCaption.textContent = caption;
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
    });
    lightboxImage.addEventListener('error', function () {
      if (lightboxStatus) {
        lightboxStatus.textContent = 'Không tải được ảnh. Bạn có thể thử ảnh khác hoặc đóng cửa sổ.';
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
        showImage(index);
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
  }

  var progress = document.querySelector('#reading-progress');
  var sections = siteNav ? Array.from(siteNav.querySelectorAll('a[href^="#"]')).map(function (link) {
    return { link: link, section: document.getElementById(link.getAttribute('href').slice(1)) };
  }).filter(function (item) {
    return item.section && ['about', 'journey', 'travel', 'animals', 'contact'].includes(item.section.id);
  }) : [];
  var scrollQueued = false;

  function updateScroll() {
    scrollQueued = false;
    var scrollTop = window.scrollY;
    var scrollable = Math.max(0, document.documentElement.scrollHeight - window.innerHeight);
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
