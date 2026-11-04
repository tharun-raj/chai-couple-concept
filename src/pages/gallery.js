import { init, reduced } from '../lib/core.js';

const { lenis } = init();

const dlg = document.querySelector('.lightbox');
const stage = dlg.querySelector('.lightbox__stage');
const media = dlg.querySelector('.lightbox__media');
const count = dlg.querySelector('.lightbox__count');
const title = dlg.querySelector('.lightbox__title');
const note = dlg.querySelector('.lightbox__note');
const prev = dlg.querySelector('[data-dir="-1"]');
const next = dlg.querySelector('[data-dir="1"]');
const tiles = [...document.querySelectorAll('.tile__btn')];
const EASE = 'cubic-bezier(0.23, 1, 0.32, 1)';

let index = 0;
let trigger = null;

function render(i, dir = 0) {
  index = i;
  const t = tiles[i];
  const svg = t.querySelector('svg').cloneNode(true);
  media.style.setProperty('--ratio', t.dataset.ratio);
  media.replaceChildren(svg);
  count.textContent = `${i + 1} of ${tiles.length}`;
  title.textContent = t.dataset.title;
  note.textContent = `Photo placeholder. ${t.dataset.note}`;
  prev.disabled = i === 0;
  next.disabled = i === tiles.length - 1;
  if (dir && !reduced) {
    media.animate(
      [
        { transform: `translateX(${dir * 48}px)`, opacity: 0 },
        { transform: 'none', opacity: 1 },
      ],
      { duration: 220, easing: EASE }
    );
  }
}

function go(dir) {
  const i = index + dir;
  if (i < 0 || i >= tiles.length) return;
  render(i, dir);
}

function open(i, from) {
  trigger = from;
  render(i);
  dlg.showModal();
  lenis?.stop();
  // Shared-element feel: the viewer grows out of the tile that was tapped.
  if (!reduced) {
    const a = from.getBoundingClientRect();
    const b = media.getBoundingClientRect();
    const dx = a.left + a.width / 2 - (b.left + b.width / 2);
    const dy = a.top + a.height / 2 - (b.top + b.height / 2);
    media.animate(
      [
        { transform: `translate(${dx}px, ${dy}px) scale(${a.width / b.width})` },
        { transform: 'none' },
      ],
      { duration: 280, easing: 'cubic-bezier(0.32, 0.72, 0, 1)' }
    );
  }
}

tiles.forEach((t, i) => t.addEventListener('click', () => open(i, t)));
dlg.querySelector('.lightbox__close').addEventListener('click', () => dlg.close());
prev.addEventListener('click', () => go(-1));
next.addEventListener('click', () => go(1));
dlg.addEventListener('close', () => {
  lenis?.start();
  trigger?.focus({ preventScroll: true });
});
dlg.addEventListener('keydown', (e) => {
  if (e.key === 'ArrowLeft') go(-1);
  if (e.key === 'ArrowRight') go(1);
});

// Swipe: the image follows the finger 1:1, resists at the ends, and a quick flick is enough to turn the page.
let drag = null;
stage.addEventListener('pointerdown', (e) => {
  if (drag || (e.pointerType === 'mouse' && e.button !== 0)) return; // ignore second touch points
  drag = { id: e.pointerId, x: e.clientX, t: performance.now(), dx: 0 };
  stage.setPointerCapture(e.pointerId);
});
stage.addEventListener('pointermove', (e) => {
  if (!drag || e.pointerId !== drag.id) return;
  let dx = e.clientX - drag.x;
  drag.dx = dx;
  const atEnd = (dx > 0 && index === 0) || (dx < 0 && index === tiles.length - 1);
  if (atEnd) dx *= 0.3; // rubber-band
  media.style.transform = `translateX(${dx}px)`;
});
const endDrag = (e) => {
  if (!drag || e.pointerId !== drag.id) return;
  const { dx } = drag;
  const velocity = Math.abs(dx) / Math.max(1, performance.now() - drag.t);
  drag = null;
  media.style.transform = '';
  if (Math.abs(dx) > 70 || (velocity > 0.11 && Math.abs(dx) > 16)) {
    go(dx < 0 ? 1 : -1);
  } else if (!reduced && dx) {
    media.animate([{ transform: `translateX(${dx}px)` }, { transform: 'none' }], { duration: 220, easing: EASE });
  }
};
stage.addEventListener('pointerup', endDrag);
stage.addEventListener('pointercancel', endDrag);
