/* ============================================================
   Tyler Garner Portfolio — JavaScript
   ============================================================ */

(function () {
  'use strict';

  /* ----------------------------------------------------------
     Active nav tab on scroll
  ---------------------------------------------------------- */
  const navTabs = document.querySelectorAll('.nav-tab');
  const sections = document.querySelectorAll('section[id]');

  function setActiveTab(id) {
    navTabs.forEach(tab => {
      tab.classList.toggle('active', tab.getAttribute('data-section') === id);
    });
  }

  function onScroll() {
    const scrollY = window.scrollY + 80;
    let current = 'home';

    sections.forEach(section => {
      if (scrollY >= section.offsetTop) {
        current = section.id;
      }
    });

    setActiveTab(current);
  }

  window.addEventListener('scroll', onScroll, { passive: true });

  /* ----------------------------------------------------------
     Smooth scroll for nav links
  ---------------------------------------------------------- */
  navTabs.forEach(tab => {
    tab.addEventListener('click', function (e) {
      const href = this.getAttribute('href');
      if (href && href.startsWith('#')) {
        e.preventDefault();
        const target = document.querySelector(href);
        if (target) {
          const offset = target.offsetTop - 48;
          window.scrollTo({ top: offset, behavior: 'smooth' });
        }
      }
    });
  });

  /* ----------------------------------------------------------
     Smooth scroll for all anchor links
  ---------------------------------------------------------- */
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const href = this.getAttribute('href');
      const target = document.querySelector(href);
      if (target) {
        e.preventDefault();
        const offset = target.offsetTop - 48;
        window.scrollTo({ top: offset, behavior: 'smooth' });
      }
    });
  });

  /* ----------------------------------------------------------
     Intersection Observer — fade-in animations
  ---------------------------------------------------------- */
  const animTargets = document.querySelectorAll(
    '.metric-card, .perf-card, .proof-card, .review-card, .case-card, .psych-card, .tools-col, .timeline-item, .journey-step'
  );

  animTargets.forEach(el => el.classList.add('fade-in'));

  const observer = new IntersectionObserver(
    entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.1, rootMargin: '0px 0px -40px 0px' }
  );

  animTargets.forEach(el => observer.observe(el));

  /* ----------------------------------------------------------
     Stagger animation for grid children
  ---------------------------------------------------------- */
  document.querySelectorAll('.perf-grid, .reviews-grid, .hero-metrics, .tools-grid').forEach(grid => {
    const children = grid.querySelectorAll('.fade-in');
    children.forEach((child, i) => {
      child.style.transitionDelay = `${i * 0.07}s`;
    });
  });

  /* ----------------------------------------------------------
     Initial call
  ---------------------------------------------------------- */
  onScroll();
})();
