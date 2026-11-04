// Shared behaviour for every page: fonts and styles, smooth scroll, header sheet,
// live open/closed status, scroll reveals.
import Lenis from 'lenis';
import { site } from '../content.js';

export const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const finePointer = window.matchMedia('(hover: hover) and (pointer: fine)').matches;

// ------------------------------------------------------------------ open / closed (India time)
const DAY = { Sun: 0, Mon: 1, Tue: 2, Wed: 3, Thu: 4, Fri: 5, Sat: 6 };

function istNow() {
  const parts = new Intl.DateTimeFormat('en-GB', {
    timeZone: 'Asia/Kolkata',
    weekday: 'short',
    hour: 'numeric',
    minute: 'numeric',
    hourCycle: 'h23',
  }).formatToParts(new Date());
  const get = (t) => parts.find((p) => p.type === t)?.value;
  return { day: DAY[get('weekday')], minutes: Number(get('hour')) * 60 + Number(get('minute')) };
}

export function statusInfo() {
  const { day, minutes } = istNow();
  const { openHour, closeHour, closedDay } = site.hours;
  if (day === closedDay) return { open: false, today: day, text: 'Closed on Mondays. Opens Tuesday at 4 pm' };
  if (minutes >= openHour * 60 && minutes < closeHour * 60) return { open: true, today: day, text: 'Open now, until 10 pm' };
  if (minutes < openHour * 60) return { open: false, today: day, text: 'Opens today at 4 pm' };
  const tomorrowClosed = (day + 1) % 7 === closedDay;
  return {
    open: false,
    today: day,
    text: tomorrowClosed ? 'Closed for tonight. Opens Tuesday at 4 pm' : 'Closed for tonight. Opens tomorrow at 4 pm',
  };
}

function setupStatus() {
  const paint = () => {
    const s = statusInfo();
    document.querySelectorAll('[data-status]').forEach((el) => {
      el.textContent = s.text;
      el.classList.toggle('is-open', s.open);
    });
    document.querySelectorAll('[data-hours-row]').forEach((row) => {
      const days = row.dataset.days.split(',').map(Number);
      row.classList.toggle('is-today', days.includes(s.today));
    });
  };
  paint();
  setInterval(paint, 60_000);
}

// ------------------------------------------------------------------ smooth scroll
function setupScroll() {
  // Touch devices keep native momentum; reduced motion keeps native scroll.
  if (reduced || !finePointer) return null;
  const lenis = new Lenis({ lerp: 0.1 });
  const raf = (t) => {
    lenis.raf(t);
    requestAnimationFrame(raf);
  };
  requestAnimationFrame(raf);
  document.addEventListener('click', (e) => {
    const a = e.target.closest('a[href^="#"]');
    if (!a || a.hash.length < 2) return;
    const target = document.querySelector(a.hash);
    if (!target) return;
    e.preventDefault();
    lenis.scrollTo(target, { offset: -72, duration: 1.1 });
    history.pushState(null, '', a.hash);
  });
  return lenis;
}

// ------------------------------------------------------------------ header sheet (phones)
function setupHeader(lenis) {
  const header = document.querySelector('.site-header');
  const toggle = header?.querySelector('.nav-toggle');
  const sheet = header?.querySelector('.nav-sheet');
  if (!toggle || !sheet) return;
  const set = (open) => {
    header.classList.toggle('is-open', open);
    toggle.setAttribute('aria-expanded', String(open));
    toggle.setAttribute('aria-label', open ? 'Close navigation' : 'Open navigation');
    sheet.inert = !open;
    document.documentElement.classList.toggle('nav-open', open);
    if (open) lenis?.stop();
    else lenis?.start();
  };
  toggle.addEventListener('click', () => set(!header.classList.contains('is-open')));
  sheet.addEventListener('click', (e) => {
    if (e.target.closest('a')) set(false);
  });
  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && header.classList.contains('is-open')) {
      set(false);
      toggle.focus();
    }
  });
  window.matchMedia('(min-width: 768px)').addEventListener('change', (m) => m.matches && set(false));
}

// ------------------------------------------------------------------ scroll reveal, once
function setupReveals() {
  const items = document.querySelectorAll('[data-reveal]');
  if (!items.length) return;
  if (!('IntersectionObserver' in window)) {
    items.forEach((el) => el.classList.add('is-in'));
    return;
  }
  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        const el = entry.target;
        io.unobserve(el);
        el.classList.add('is-in');
        // Hand the element back to its own transitions (a button keeps its press feedback).
        const delay = Number(getComputedStyle(el).getPropertyValue('--i') || 0) * 60;
        setTimeout(() => el.removeAttribute('data-reveal'), 280 + delay + 80);
      });
    },
    { threshold: 0.12, rootMargin: '0px 0px -6% 0px' }
  );
  items.forEach((el) => io.observe(el));
}

export function init() {
  const lenis = setupScroll();
  setupHeader(lenis);
  setupStatus();
  setupReveals();
  return { lenis };
}
