import { init, reduced } from '../lib/core.js';

const { lenis } = init();

const story = document.querySelector('.story');
const track = story.querySelector('.story__track');
const stage = story.querySelector('.story__stage');
const chapters = [...story.querySelectorAll('.chapter')];
const segs = [...story.querySelectorAll('.seg')];
const label = story.querySelector('.story__label');
const titles = JSON.parse(story.dataset.titles);
const n = chapters.length;

if (!reduced) {
  // Every line in the chapter art can be drawn: normalise path lengths to 1.
  story.querySelectorAll('.chapter .art__ink path:not([stroke-dasharray])').forEach((p) => p.setAttribute('pathLength', '1'));

  const clamp = (v, a, b) => Math.min(b, Math.max(a, v));
  let index = -1;
  let ticking = false;

  const setIndex = (i) => {
    index = i;
    chapters.forEach((c, k) => {
      c.dataset.state = k === i ? 'active' : k < i ? 'prev' : 'next';
      c.style.setProperty('--cp', k < i ? 1 : 0);
      c.toggleAttribute('inert', k !== i);
    });
    segs.forEach((s, k) => s.style.setProperty('--f', k < i ? 1 : 0));
    label.textContent = `Chapter ${i + 1} of ${n}: ${titles[i]}`;
    segs.forEach((s, k) => (k === i ? s.setAttribute('aria-current', 'step') : s.removeAttribute('aria-current')));
  };

  const update = () => {
    ticking = false;
    const dist = track.offsetHeight - stage.offsetHeight;
    const progress = clamp(-track.getBoundingClientRect().top / dist, 0, 1);
    const f = progress * n;
    const i = Math.min(n - 1, Math.floor(f));
    const p = progress >= 1 ? 1 : f - i;
    if (i !== index) setIndex(i);
    chapters[i].style.setProperty('--cp', p.toFixed(3));
    segs[i].style.setProperty('--f', p.toFixed(3));
  };

  const onScroll = () => {
    if (ticking) return;
    ticking = true;
    requestAnimationFrame(update);
  };
  window.addEventListener('scroll', onScroll, { passive: true });
  window.addEventListener('resize', onScroll);
  update();

  // Progress segments jump to a chapter.
  segs.forEach((s, k) =>
    s.addEventListener('click', () => {
      const top = track.getBoundingClientRect().top + window.scrollY;
      const y = top + (k + 0.02) * stage.offsetHeight;
      if (lenis) lenis.scrollTo(y, { duration: 1.1 });
      else window.scrollTo({ top: y, behavior: 'smooth' });
    })
  );
}
