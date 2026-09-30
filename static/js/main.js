(function () {
  'use strict';

  var menuToggle = document.querySelector('[data-menu-toggle]');
  var siteNav = document.querySelector('[data-site-nav]');
  var header = document.querySelector('[data-header]');
  var lightbox = document.querySelector('#lightbox');
  var lightboxImage = document.querySelector('#lightbox-image');
  var lightboxCaption = document.querySelector('#lightbox-caption');
  var lastFocusedElement = null;

  function closeMenu() {
    if (!menuToggle || !siteNav) {
      return;
    }
    menuToggle.setAttribute('aria-expanded', 'false');
    menuToggle.querySelector('.sr-only').textContent = 'Mở menu';
    siteNav.classList.remove('is-open');
  }

  if (menuToggle && siteNav) {
    menuToggle.addEventListener('click', function () {
      var isOpen = menuToggle.getAttribute('aria-expanded') === 'true';
      menuToggle.setAttribute('aria-expanded', String(!isOpen));
      menuToggle.querySelector('.sr-only').textContent = isOpen ? 'Mở menu' : 'Đóng menu';
      siteNav.classList.toggle('is-open', !isOpen);
    });

    siteNav.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', closeMenu);
    });

    document.addEventListener('click', function (event) {
      if (siteNav.classList.contains('is-open') && !siteNav.contains(event.target) && !menuToggle.contains(event.target)) {
        closeMenu();
      }
    });
  }

  if (header) {
    var updateHeader = function () {
      header.classList.toggle('is-scrolled', window.scrollY > 20);
    };
    updateHeader();
    window.addEventListener('scroll', updateHeader, { passive: true });
  }

  var revealItems = document.querySelectorAll('[data-reveal]');
  if ('IntersectionObserver' in window && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    var revealObserver = new IntersectionObserver(function (entries, observer) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          var delay = entry.target.getAttribute('data-reveal-delay');
          if (delay) {
            entry.target.style.transitionDelay = delay + 'ms';
          }
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    }, { rootMargin: '0px 0px -8% 0px', threshold: 0.08 });

    revealItems.forEach(function (item) {
      revealObserver.observe(item);
    });
  } else {
    revealItems.forEach(function (item) {
      item.classList.add('is-visible');
    });
  }

  function closeLightbox() {
    if (!lightbox) {
      return;
    }
    lightbox.hidden = true;
    document.body.style.overflow = '';
    if (lastFocusedElement) {
      lastFocusedElement.focus();
    }
  }

  function openLightbox(button) {
    if (!lightbox || !lightboxImage || !lightboxCaption) {
      return;
    }
    lastFocusedElement = button;
    lightboxImage.src = button.getAttribute('data-image');
    lightboxImage.alt = button.getAttribute('data-alt') || '';
    lightboxCaption.textContent = button.getAttribute('data-caption') || '';
    lightbox.hidden = false;
    document.body.style.overflow = 'hidden';
    var closeButton = lightbox.querySelector('.lightbox-close');
    if (closeButton) {
      closeButton.focus();
    }
  }

  document.querySelectorAll('.js-lightbox-trigger').forEach(function (button) {
    button.addEventListener('click', function () {
      openLightbox(button);
    });
  });

  if (lightbox) {
    lightbox.querySelectorAll('[data-lightbox-close]').forEach(function (button) {
      button.addEventListener('click', closeLightbox);
    });

    document.addEventListener('keydown', function (event) {
      if (event.key === 'Escape' && !lightbox.hidden) {
        closeLightbox();
      }
    });
  }

  var year = document.querySelector('#current-year');
  if (year) {
    year.textContent = new Date().getFullYear();
  }
}());
