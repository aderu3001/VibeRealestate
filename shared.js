/* ═══════════════════════════════════════════════════════════
   VIBE REAL ESTATE — SHARED JAVASCRIPT
   Mobile nav toggle, scroll reveal, sticky nav, filter buttons,
   contact form handler
   ═══════════════════════════════════════════════════════════ */

(function () {
  'use strict';

  /* ── MOBILE NAV TOGGLE ── */
  var navToggle = document.getElementById('navToggle');
  var navMobile = document.getElementById('navMobile');

  if (navToggle && navMobile) {
    navToggle.setAttribute('aria-expanded', 'false');
    navToggle.addEventListener('click', function () {
      var isOpen = navMobile.classList.toggle('open');
      navToggle.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
      navToggle.setAttribute('aria-label', isOpen ? 'Close menu' : 'Open menu');
    });

    /* Close menu when a link is clicked */
    navMobile.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', function () {
        navMobile.classList.remove('open');
        navToggle.setAttribute('aria-expanded', 'false');
        navToggle.setAttribute('aria-label', 'Open menu');
      });
    });
  }

  /* ── STICKY NAV SHADOW ON SCROLL ── */
  var siteNav = document.querySelector('.site-nav');
  if (siteNav) {
    window.addEventListener('scroll', function () {
      if (window.scrollY > 10) {
        siteNav.classList.add('scrolled');
      } else {
        siteNav.classList.remove('scrolled');
      }
    }, { passive: true });
  }

  /* ── SCROLL REVEAL (IntersectionObserver) ── */
  if ('IntersectionObserver' in window) {
    var revealObserver = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          revealObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

    document.querySelectorAll('.reveal').forEach(function (el) {
      revealObserver.observe(el);
    });
  } else {
    /* Fallback: show all reveal elements immediately */
    document.querySelectorAll('.reveal').forEach(function (el) {
      el.classList.add('visible');
    });
  }

  /* ── ACTIVE FILTER BUTTONS ── */
  document.querySelectorAll('.filter-bar').forEach(function (bar) {
    bar.querySelectorAll('.filter-btn').forEach(function (btn) {
      btn.addEventListener('click', function () {
        bar.querySelectorAll('.filter-btn').forEach(function (b) {
          b.classList.remove('active');
        });
        btn.classList.add('active');
      });
    });
  });

  /* ── CONTACT FORM SUBMISSION HANDLER ── */
  var contactForm = document.getElementById('contactForm');
  if (contactForm) {
    contactForm.addEventListener('submit', function (e) {
      e.preventDefault();

      /* Basic validation */
      var firstName = contactForm.querySelector('#first-name');
      var email = contactForm.querySelector('#email');
      var message = contactForm.querySelector('#message');

      var errors = [];
      if (!firstName || !firstName.value.trim()) {
        errors.push('First name is required.');
      }
      if (!email || !email.value.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value.trim())) {
        errors.push('A valid email address is required.');
      }
      if (!message || !message.value.trim()) {
        errors.push('Message is required.');
      }

      /* Remove existing feedback */
      var existing = contactForm.querySelector('.form-feedback');
      if (existing) existing.remove();

      var feedback = document.createElement('div');
      feedback.className = 'form-feedback';

      if (errors.length > 0) {
        feedback.style.cssText = 'margin-top:16px;padding:14px 18px;border-radius:8px;background:rgba(220,53,69,.12);border:1px solid rgba(220,53,69,.3);color:#ff6b6b;font-size:14px;';
        feedback.innerHTML = errors.join('<br>');
        contactForm.appendChild(feedback);
      } else {
        feedback.style.cssText = 'margin-top:16px;padding:14px 18px;border-radius:8px;background:rgba(37,211,102,.1);border:1px solid rgba(37,211,102,.3);color:#25D366;font-size:14px;text-align:center;';
        feedback.textContent = "Thank you, we'll be in touch!";
        contactForm.appendChild(feedback);
        contactForm.reset();
      }
    });
  }

})();
