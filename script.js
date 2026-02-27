/* =====================================================
   PORTFOLIO JAVASCRIPT
   ===================================================== */

// ── Navbar scroll effect & active link ──────────────
const navbar = document.getElementById('navbar');
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-links a');

window.addEventListener('scroll', () => {
  // Sticky shadow
  navbar.classList.toggle('scrolled', window.scrollY > 40);

  // Highlight active section link
  let current = '';
  sections.forEach(section => {
    if (window.scrollY >= section.offsetTop - 120) {
      current = section.getAttribute('id');
    }
  });
  navLinks.forEach(link => {
    link.classList.toggle('active', link.getAttribute('href') === `#${current}`);
  });
});

// ── Mobile hamburger menu ────────────────────────────
const hamburger = document.getElementById('hamburger');
const navMenu   = document.getElementById('nav-links');

hamburger.addEventListener('click', () => {
  hamburger.classList.toggle('open');
  navMenu.classList.toggle('open');
});

// Close menu on link click
navLinks.forEach(link => {
  link.addEventListener('click', () => {
    hamburger.classList.remove('open');
    navMenu.classList.remove('open');
  });
});

// ── Scroll-reveal (Intersection Observer) ───────────
const fadeEls = document.querySelectorAll(
  '.about-text, .about-details, .skill-category, ' +
  '.timeline-item, .portfolio-card, .contact-card, .contact-form'
);

fadeEls.forEach(el => el.classList.add('fade-in'));

const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        revealObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.12 }
);
fadeEls.forEach(el => revealObserver.observe(el));

// ── Animated skill bars ──────────────────────────────
const fills = document.querySelectorAll('.fill');

const barObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const fill = entry.target;
        fill.style.width = fill.dataset.width + '%';
        barObserver.unobserve(fill);
      }
    });
  },
  { threshold: 0.3 }
);
fills.forEach(fill => barObserver.observe(fill));

// ── Counter animation ────────────────────────────────
const counters = document.querySelectorAll('.stat-number');

const counterObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const el     = entry.target;
        const target = parseInt(el.dataset.target, 10);
        let current  = 0;
        const step   = Math.ceil(target / 40);
        const timer  = setInterval(() => {
          current += step;
          if (current >= target) {
            el.textContent = target;
            clearInterval(timer);
          } else {
            el.textContent = current;
          }
        }, 40);
        counterObserver.unobserve(el);
      }
    });
  },
  { threshold: 0.5 }
);
counters.forEach(el => counterObserver.observe(el));

// ── Portfolio filter ─────────────────────────────────
const filterBtns = document.querySelectorAll('.filter-btn');
const cards      = document.querySelectorAll('.portfolio-card');

filterBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    filterBtns.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');

    const filter = btn.dataset.filter;
    cards.forEach(card => {
      const show = filter === 'all' || card.dataset.category === filter;
      card.classList.toggle('hidden', !show);

      // Re-trigger fade-in on visible cards
      if (show) {
        card.classList.remove('visible');
        setTimeout(() => card.classList.add('visible'), 50);
      }
    });
  });
});

// ── Contact form (simulated submit) ─────────────────
const form       = document.getElementById('contact-form');
const formStatus = document.getElementById('form-status');

form.addEventListener('submit', (e) => {
  e.preventDefault();
  const btn = form.querySelector('button[type="submit"]');
  btn.disabled    = true;
  btn.textContent = 'Sending…';

  // Simulate network delay
  setTimeout(() => {
    formStatus.textContent = "✅ Message sent! I'll get back to you soon.";
    formStatus.className   = 'form-status success';
    form.reset();
    btn.disabled    = false;
    btn.innerHTML   = '<i class="fa-solid fa-paper-plane"></i> Send Message';

    setTimeout(() => { formStatus.textContent = ''; }, 5000);
  }, 1500);
});

// ── Footer year ──────────────────────────────────────
document.getElementById('year').textContent = new Date().getFullYear();
