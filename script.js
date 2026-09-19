/* ============================================================
   WEBBS ENTREPRENEURSHIP — Interactions
   ============================================================ */

(function () {
  'use strict';

  // --- Header scroll behavior ---
  var header = document.getElementById('header');
  var lastScrollY = 0;

  function handleScroll() {
    var scrollY = window.scrollY;

    if (scrollY > 40) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }

    lastScrollY = scrollY;
  }

  window.addEventListener('scroll', handleScroll, { passive: true });

  // --- Mobile menu toggle ---
  var menuToggle = document.querySelector('.menu-toggle');
  var nav = document.querySelector('.header-nav');

  if (menuToggle && nav) {
    menuToggle.addEventListener('click', function () {
      var isOpen = nav.classList.toggle('open');
      menuToggle.classList.toggle('open', isOpen);
      menuToggle.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
    });

    // Close menu when a nav link is clicked
    nav.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', function () {
        nav.classList.remove('open');
        menuToggle.classList.remove('open');
        menuToggle.setAttribute('aria-expanded', 'false');
      });
    });

    // Close menu when clicking outside
    document.addEventListener('click', function (e) {
      if (!nav.contains(e.target) && !menuToggle.contains(e.target) && nav.classList.contains('open')) {
        nav.classList.remove('open');
        menuToggle.classList.remove('open');
        menuToggle.setAttribute('aria-expanded', 'false');
      }
    });
  }

  // --- Scroll reveal animations ---
  var revealElements = document.querySelectorAll(
    '.vision .container, ' +
    '.worlds .container, ' +
    '.world-card, ' +
    '.founders .container, ' +
    '.legacy-content, ' +
    '.connect .container'
  );

  // Add reveal class only if IntersectionObserver is available
  if ('IntersectionObserver' in window) {
    revealElements.forEach(function (el) {
      el.classList.add('reveal');
    });

    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.05,
      rootMargin: '0px 0px -40px 0px'
    });

    revealElements.forEach(function (el) {
      observer.observe(el);
    });

    // Safety fallback: show everything after 3 seconds in case observer fails
    setTimeout(function () {
      revealElements.forEach(function (el) {
        el.classList.add('visible');
      });
    }, 3000);
  }

  // --- Stagger world card reveals ---
  var worldCards = document.querySelectorAll('.world-card');
  worldCards.forEach(function (card, index) {
    card.style.transitionDelay = (index * 100) + 'ms';
  });

  // --- Smooth scroll for anchor links (with header offset) ---
  document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
    anchor.addEventListener('click', function (e) {
      var targetId = this.getAttribute('href');
      if (targetId === '#') return;

      var target = document.querySelector(targetId);
      if (target) {
        e.preventDefault();
        var headerHeight = header.offsetHeight;
        var targetPosition = target.getBoundingClientRect().top + window.scrollY - headerHeight + 1;

        window.scrollTo({
          top: targetPosition,
          behavior: 'smooth'
        });
      }
    });
  });

  // --- Initialize on load ---
  handleScroll();
})();
