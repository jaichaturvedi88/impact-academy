'use strict';

// ── Loader ───────────────────────────────────────────────────
const loader = document.getElementById('loader');
window.addEventListener('load', () => {
  setTimeout(() => loader?.classList.add('done'), 350);
});

// ── Footer year ──────────────────────────────────────────────
const yearEl = document.getElementById('footerYear');
if (yearEl) yearEl.textContent = new Date().getFullYear();

// ── Navbar: glass on scroll ──────────────────────────────────
const header = document.getElementById('siteHeader');
window.addEventListener('scroll', () => {
  header?.classList.toggle('scrolled', window.scrollY > 50);
}, { passive: true });

// ── Mobile nav ───────────────────────────────────────────────
const toggle  = document.getElementById('navToggle');
const menu    = document.getElementById('navMenu');
const overlay = document.getElementById('navOverlay');

const closeNav = () => {
  toggle?.classList.remove('open');
  menu?.classList.remove('open');
  overlay?.classList.remove('open');
  toggle?.setAttribute('aria-expanded', 'false');
};
const openNav = () => {
  toggle?.classList.add('open');
  menu?.classList.add('open');
  overlay?.classList.add('open');
  toggle?.setAttribute('aria-expanded', 'true');
};

toggle?.addEventListener('click', () => menu?.classList.contains('open') ? closeNav() : openNav());
overlay?.addEventListener('click', closeNav);
menu?.querySelectorAll('.nav-link').forEach(l => l.addEventListener('click', closeNav));

// ── Smooth scroll with offset ────────────────────────────────
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', e => {
    const id = a.getAttribute('href');
    if (!id || id === '#') return;
    const target = document.querySelector(id);
    if (!target) return;
    e.preventDefault();
    const offset = header?.offsetHeight ?? 72;
    window.scrollTo({ top: target.offsetTop - offset, behavior: 'smooth' });
  });
});

// ── Active nav on scroll ─────────────────────────────────────
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-link:not(.nav-cta)');

const navObs = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (!e.isIntersecting) return;
    navLinks.forEach(l => l.classList.toggle('active', l.getAttribute('href') === `#${e.target.id}`));
  });
}, { threshold: 0.35, rootMargin: `-${header?.offsetHeight ?? 72}px 0px 0px 0px` });

sections.forEach(s => navObs.observe(s));

// ── Scroll reveal ────────────────────────────────────────────
const revealObs = new IntersectionObserver((entries, obs) => {
  entries.forEach(e => {
    if (!e.isIntersecting) return;
    e.target.classList.add('visible');
    obs.unobserve(e.target);
  });
}, { threshold: 0.12 });

document.querySelectorAll('.reveal').forEach(el => revealObs.observe(el));

// ── Stat counter animation ───────────────────────────────────
const countEl = (el) => {
  const target = +el.dataset.count;
  const suffix = el.dataset.suffix ?? '';
  const numEl  = el.querySelector('.stat-num');
  if (!numEl || isNaN(target)) return;
  let current = 0;
  const step = target / 55;
  const timer = setInterval(() => {
    current = Math.min(current + step, target);
    numEl.textContent = Math.round(current) + suffix;
    if (current >= target) clearInterval(timer);
  }, 28);
};

const statObs = new IntersectionObserver((entries, obs) => {
  entries.forEach(e => {
    if (!e.isIntersecting) return;
    countEl(e.target);
    obs.unobserve(e.target);
  });
}, { threshold: 0.5 });

document.querySelectorAll('.stat-item[data-count]').forEach(el => statObs.observe(el));

// ── Gallery lightbox ─────────────────────────────────────────
const lightbox = document.getElementById('lightbox');
const lbImg    = document.getElementById('lightboxImg');
const lbClose  = document.getElementById('lightboxClose');

const openLB = (src, alt) => {
  lbImg.src = src;
  lbImg.alt = alt || '';
  lightbox.hidden = false;
  document.body.style.overflow = 'hidden';
  lbClose?.focus();
};
const closeLB = () => {
  lightbox.hidden = true;
  lbImg.src = '';
  document.body.style.overflow = '';
};

document.querySelectorAll('.gi').forEach(item => {
  item.addEventListener('click', e => {
    e.preventDefault();
    openLB(item.href, item.querySelector('img')?.alt);
  });
});

lbClose?.addEventListener('click', closeLB);
lightbox?.addEventListener('click', e => { if (e.target === lightbox) closeLB(); });
document.addEventListener('keydown', e => { if (e.key === 'Escape') closeLB(); });

// ── Form validation ──────────────────────────────────────────
const form = document.getElementById('enrollForm');
form?.addEventListener('submit', e => {
  if (!form.checkValidity()) {
    e.preventDefault();
    e.stopPropagation();
    form.querySelectorAll('input, textarea').forEach(f => f.reportValidity && f.reportValidity());
  }
});
