/**
 * Portfolio – Main JavaScript
 * Vanilla JS · No dependencies
 */

document.addEventListener('DOMContentLoaded', () => {

  /* ──────────────────────────────────────────────
     1. Typewriter Effect
     ────────────────────────────────────────────── */
  const typewriterEl = document.querySelector('.hero__typewriter-text');
  const cursor       = document.querySelector('.hero__cursor');
  const words        = ['AI/ML Engineer', 'Python Developer', 'LLM Specialist', 'RAG Pipeline Builder'];
  let wordIdx  = 0;
  let charIdx  = 0;
  let deleting = false;

  function typewrite() {
    const current = words[wordIdx];

    if (!deleting) {
      typewriterEl.textContent = current.substring(0, charIdx + 1);
      charIdx++;

      if (charIdx === current.length) {
        deleting = true;
        setTimeout(typewrite, 2000);
        return;
      }
      setTimeout(typewrite, 80);
    } else {
      typewriterEl.textContent = current.substring(0, charIdx - 1);
      charIdx--;

      if (charIdx === 0) {
        deleting = false;
        wordIdx  = (wordIdx + 1) % words.length;
        setTimeout(typewrite, 300);
        return;
      }
      setTimeout(typewrite, 40);
    }
  }

  if (typewriterEl) typewrite();

  /* ──────────────────────────────────────────────
     2. Scroll Reveal (IntersectionObserver)
     ────────────────────────────────────────────── */
  const revealEls = document.querySelectorAll('.reveal');

  const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('revealed');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15, rootMargin: '-50px' });

  revealEls.forEach(el => revealObserver.observe(el));

  /* ──────────────────────────────────────────────
     3. Navbar Scroll Effect
     ────────────────────────────────────────────── */
  const navbar = document.querySelector('.navbar');

  function handleNavbarScroll() {
    if (!navbar) return;
    navbar.classList.toggle('scrolled', window.scrollY > 50);
  }

  window.addEventListener('scroll', handleNavbarScroll, { passive: true });

  /* ──────────────────────────────────────────────
     4. Active Nav Link Highlighting
     ────────────────────────────────────────────── */
  const navLinks = document.querySelectorAll('.navbar__link');
  const sections = document.querySelectorAll('section[id]');

  function highlightNavLink() {
    const scrollY = window.scrollY + 120;

    sections.forEach(section => {
      const top    = section.offsetTop;
      const height = section.offsetHeight;
      const id     = section.getAttribute('id');

      if (scrollY >= top && scrollY < top + height) {
        navLinks.forEach(link => {
          link.classList.remove('active');
          if (link.getAttribute('href') === `#${id}`) {
            link.classList.add('active');
          }
        });
      }
    });
  }

  window.addEventListener('scroll', highlightNavLink, { passive: true });

  /* ──────────────────────────────────────────────
     5. Mobile Menu Toggle
     ────────────────────────────────────────────── */
  const menuToggle = document.querySelector('.navbar__toggle');
  const navLinksEl = document.querySelector('.navbar__links');
  const navOverlay = document.querySelector('.nav-overlay');

  function toggleMobileMenu() {
    navLinksEl?.classList.toggle('open');
    menuToggle?.classList.toggle('active');
    navOverlay?.classList.toggle('open');
  }

  function closeMobileMenu() {
    navLinksEl?.classList.remove('open');
    menuToggle?.classList.remove('active');
    navOverlay?.classList.remove('open');
  }

  menuToggle?.addEventListener('click', toggleMobileMenu);
  navOverlay?.addEventListener('click', closeMobileMenu);

  /* ──────────────────────────────────────────────
     6. Smooth Scroll for Anchor Links
     7. Close Mobile Menu on Nav Link Click
     ────────────────────────────────────────────── */
  navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      const href = link.getAttribute('href');
      if (!href || !href.startsWith('#')) return;

      e.preventDefault();
      const target = document.querySelector(href);
      if (target) {
        target.scrollIntoView({ behavior: 'smooth' });
      }

      closeMobileMenu();
    });
  });

  /* ── Initial calls ─────────────────────────── */
  handleNavbarScroll();
  highlightNavLink();
});
