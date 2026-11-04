// Drawn artwork: photo placeholders, the story scenes and the atmospheric story backdrop.
// Pure string functions, used by the Node build (prerender) and by the browser.
import { motifMarkup } from './motifs.js';

const INK = 'fill="none" stroke-width="3.2" stroke-linecap="round" stroke-linejoin="round"';

/** A flat placeholder for a real photograph, built from the logo's motifs. */
export function plateSVG({ motif = 'cup', tone = 'roast', w = 400, h = 500, label = '' }) {
  const k = (Math.min(w, h) / 200) * 0.66;
  const tx = w / 2 - 100 * k;
  const ty = h / 2 - 100 * k;
  const r = Math.min(w, h) * 0.37;
  return (
    `<svg class="ph ph--${tone}" viewBox="0 0 ${w} ${h}" preserveAspectRatio="xMidYMid slice" role="img" aria-label="${label}" xmlns="http://www.w3.org/2000/svg">` +
    `<rect class="ph__bg" width="${w}" height="${h}"/>` +
    `<circle class="ph__disc" cx="${w / 2}" cy="${h / 2}" r="${r}"/>` +
    `<g class="ph__ink" transform="translate(${tx.toFixed(1)} ${ty.toFixed(1)}) scale(${k.toFixed(3)})" ${INK}>${motifMarkup(motif)}</g>` +
    `</svg>`
  );
}

// Couple halves: reuse the couple motif's two heads by clipping the paths into left/right groups.
function coupleScene(gap, { cup = false } = {}) {
  const left = ['M36 96 a26 26 0 1 0 52 0 a26 26 0 1 0 -52 0', 'M86 92 l8 7 l-8 4', 'M38 104 C42 132 82 132 86 106', 'M54 66 a8 8 0 1 0 16 0 a8 8 0 1 0 -16 0', 'M26 172 C28 142 96 142 98 172'];
  const right = ['M112 96 a26 26 0 1 0 52 0 a26 26 0 1 0 -52 0', 'M114 92 l-8 7 l8 4', 'M142 62 a8 8 0 1 0 16 0 a8 8 0 1 0 -16 0', 'M102 172 C104 142 172 142 174 172'];
  const p = (arr) => arr.map((d) => `<path d="${d}"/>`).join('');
  const cupG = cup
    ? `<g transform="translate(150 118) scale(.5)">${motifMarkup('cup', { draw: true })}</g>`
    : '';
  return (
    `<g transform="translate(${100 - gap} 0)">${p(left)}</g>` +
    `<g transform="translate(${100 + gap} 0)">${p(right)}</g>` +
    cupG
  );
}

/** Art for each story chapter. `today` returns the real logo. */
export function chapterArt(id) {
  const open = `<svg class="art" viewBox="0 0 400 200" role="img" aria-hidden="true" xmlns="http://www.w3.org/2000/svg"><g class="art__ink" ${INK}>`;
  const close = `</g></svg>`;
  switch (id) {
    case 'spark':
      return (
        open +
        coupleScene(78) +
        `<path d="M128 50 Q200 -6 272 50" stroke-dasharray="1 9"/>` +
        close
      );
    case 'chai':
      return (
        open +
        `<g transform="translate(24 8)">${motifMarkup('flask')}</g>` +
        `<g transform="translate(176 8)">${motifMarkup('cup', { draw: true })}</g>` +
        close
      );
    case 'cake':
      return open + `<g transform="translate(100 0)">${motifMarkup('slice')}</g>` + close;
    case 'couple':
      return open + coupleScene(4, { cup: false }) + close;
    case 'today':
    default:
      return `<img class="art art--logo" src="/assets/logo-coin.png" alt="" width="260" height="260" />`;
  }
}

/** Atmospheric backdrop for the story: a warm cafe at dusk, drawn flat. Placeholder for a real photograph. */
export function storyBgSVG() {
  const windows = [150, 560, 970, 1380]
    .map((x) => `<path class="sb-win" d="M${x} 640 V300 A120 120 0 0 1 ${x + 240} 300 V640 Z"/>`)
    .join('');
  const glasses = [330, 470, 640, 800, 930, 1090]
    .map((x) => `<path class="sb-glass" d="M${x} 640 l6 -52 h30 l6 52 Z"/>`)
    .join('');
  const bulbs = [60, 200, 340, 480, 620, 760, 900, 1040, 1180, 1320, 1460, 1560]
    .map((x, i) => {
      const y = 120 + Math.sin((x / 1600) * Math.PI * 4) * 34 + 26;
      return `<circle class="sb-halo" cx="${x}" cy="${y.toFixed(0)}" r="22"/><circle class="sb-bulb" cx="${x}" cy="${y.toFixed(0)}" r="7"/>`;
    })
    .join('');
  return (
    `<svg class="sb" viewBox="0 0 1600 900" preserveAspectRatio="xMidYMid slice" aria-hidden="true" xmlns="http://www.w3.org/2000/svg">` +
    `<rect class="sb-wall" width="1600" height="900"/>` +
    windows +
    `<path class="sb-wire" d="M0 120 Q400 220 800 140 T1600 150" fill="none" stroke-width="2"/>` +
    bulbs +
    `<rect class="sb-counter" y="640" width="1600" height="260"/>` +
    `<rect class="sb-top" y="632" width="1600" height="18"/>` +
    glasses +
    `<path class="sb-dome" d="M1210 632 A64 64 0 0 1 1338 632 Z"/>` +
    `<rect class="sb-top" x="1196" y="626" width="156" height="8"/>` +
    `</svg>`
  );
}
