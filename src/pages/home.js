import { init, reduced } from '../lib/core.js';

init();

const root = document.documentElement;

// Page-load intro: release the hidden state on the next frame so the CSS transitions play.
if (root.classList.contains('intro-pending')) {
  requestAnimationFrame(() =>
    requestAnimationFrame(() => {
      root.classList.remove('intro-pending');
      try {
        sessionStorage.setItem('cc-intro', '1');
      } catch (e) {}
    })
  );
}

// The phone action bar duplicates the hero buttons, so it appears only after the hero has scrolled away.
const bar = document.querySelector('[data-bottom-bar]');
const hero = document.querySelector('.hero');
if (bar && hero && 'IntersectionObserver' in window) {
  new IntersectionObserver(([entry]) => bar.classList.toggle('is-hidden', entry.isIntersecting), {
    threshold: 0.35,
  }).observe(hero);
} else if (bar) {
  bar.classList.remove('is-hidden');
}

// Signature tiles open on click or tap only (never on hover). One at a time; click again or press Esc to close.
const tiles = [...document.querySelectorAll('.spanel')];
const setOpen = (tile, open) => {
  tile.dataset.open = String(open);
  tile.querySelector('.spanel__btn').setAttribute('aria-expanded', String(open));
  tile.querySelector('.spanel__body').inert = !open;
};
tiles.forEach((tile) => {
  tile.querySelector('.spanel__btn').addEventListener('click', () => {
    const open = tile.dataset.open !== 'true';
    tiles.forEach((t) => t !== tile && setOpen(t, false));
    setOpen(tile, open);
    // On phones the list grows downwards: keep the opened tile in view.
    if (open && window.matchMedia('(max-width: 899px)').matches) {
      setTimeout(() => tile.scrollIntoView({ block: 'nearest', behavior: reduced ? 'auto' : 'smooth' }), 320);
    }
  });
});
document.addEventListener('keydown', (e) => {
  if (e.key !== 'Escape') return;
  const open = tiles.find((t) => t.dataset.open === 'true');
  if (open && open.contains(document.activeElement)) {
    setOpen(open, false);
    open.querySelector('.spanel__btn').focus();
  }
});
