import { init, reduced } from '../lib/core.js';

init();

const menu = document.querySelector('.menu');
const host = menu.querySelector('[data-tabs-host]');
const panels = [...menu.querySelectorAll('.menu-panel')];
const EASE = 'cubic-bezier(0.23, 1, 0.32, 1)';

menu.classList.add('menu--tabs');


const tabs = [...host.querySelectorAll('.tab')];
const tabsEl = host.querySelector('.tabs');
const on = host.querySelector('.tabs__on');
const scroller = host.querySelector('.tabs');
const inner = host.querySelector('.tabs__inner');
let running = [];
let current = null;

panels.forEach((p, i) => {
  p.setAttribute('role', 'tabpanel');
  p.setAttribute('aria-labelledby', `tab-${p.dataset.panel}`);
  p.setAttribute('tabindex', '0');
});

function moveHighlight(tab) {
  const total = inner.offsetWidth;
  const left = tab.offsetLeft;
  const right = total - (left + tab.offsetWidth);
  on.style.clipPath = `inset(0 ${right}px 0 ${left}px round 999px)`;
  // Keep the active tab in view on narrow screens.
  const pad = 16;
  if (left - pad < scroller.scrollLeft) scroller.scrollTo({ left: left - pad, behavior: reduced ? 'auto' : 'smooth' });
  else if (left + tab.offsetWidth + pad > scroller.scrollLeft + scroller.clientWidth)
    scroller.scrollTo({ left: left + tab.offsetWidth + pad - scroller.clientWidth, behavior: reduced ? 'auto' : 'smooth' });
}

// Switching is interruptible: any running entrance is cancelled and the new one starts from rest.
function select(id, { animate = true, hash = true } = {}) {
  if (id === current) return;
  current = id;
  running.forEach((a) => a.cancel());
  running = [];
  panels.forEach((p) => (p.hidden = p.dataset.panel !== id));
  tabs.forEach((t) => {
    const active = t.dataset.id === id;
    t.setAttribute('aria-selected', String(active));
    t.tabIndex = active ? 0 : -1;
    if (active) moveHighlight(t);
  });
  if (hash) history.replaceState(null, '', `#${id}`);
  if (!animate) return;
  const panel = panels.find((p) => p.dataset.panel === id);
  if (reduced) {
    running.push(panel.animate([{ opacity: 0 }, { opacity: 1 }], { duration: 120 }));
    return;
  }
  panel.querySelectorAll('.card').forEach((card, i) => {
    running.push(
      card.animate(
        [
          { opacity: 0, transform: 'translateY(8px)' },
          { opacity: 1, transform: 'none' },
        ],
        { duration: 200, delay: i * 24, easing: EASE, fill: 'backwards' }
      )
    );
  });
}

tabs.forEach((t) => {
  t.addEventListener('click', () => select(t.dataset.id));
  t.addEventListener('keydown', (e) => {
    const i = tabs.indexOf(t);
    const to = { ArrowRight: i + 1, ArrowLeft: i - 1, Home: 0, End: tabs.length - 1 }[e.key];
    if (to === undefined) return;
    e.preventDefault();
    const target = tabs[(to + tabs.length) % tabs.length];
    target.focus();
    select(target.dataset.id);
  });
});

const fromHash = () => {
  const id = location.hash.slice(1);
  return panels.some((p) => p.dataset.panel === id) ? id : panels[0].dataset.panel;
};
select(fromHash(), { animate: false, hash: false });
window.addEventListener('hashchange', () => select(fromHash(), { hash: false }));
window.addEventListener('resize', () => moveHighlight(tabs.find((t) => t.getAttribute('aria-selected') === 'true')));
// Fonts change label widths; re-measure once they are in.
// Until the real label widths are known the selected tab is styled by CSS alone; then hand over to the clip-path pill.
(document.fonts?.ready ?? Promise.resolve()).then(() => {
  on.style.transition = 'none';
  moveHighlight(tabs.find((t) => t.getAttribute('aria-selected') === 'true'));
  on.getBoundingClientRect();
  tabsEl.classList.add('is-ready');
  requestAnimationFrame(() => (on.style.transition = ''));
});
