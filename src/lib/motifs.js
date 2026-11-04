// Line motifs taken from the logo's world: cup, steam, the couple, cake, leaf.
// Pure data (path strings) so the Node build, the browser and Three.js can all use them.
// Every motif is drawn in a 200 x 200 box.

export const motifs = {
  cup: {
    body: [
      'M60 104 H140 C140 140 122 158 100 158 C78 158 60 140 60 104 Z',
      'M139 112 C160 108 162 138 134 138',
      'M48 168 H152',
    ],
    steam: [
      'M84 92 C74 80 94 72 84 60 C79 54 85 48 85 42',
      'M104 92 C94 80 114 72 104 60 C99 54 105 48 105 42',
      'M124 92 C114 80 134 72 124 60 C119 54 125 48 125 42',
    ],
  },
  glass: {
    body: ['M76 78 L83 150 C84 156 116 156 117 150 L124 78 Z', 'M78.5 102 H121.5', 'M58 164 H142'],
    steam: ['M90 64 C82 54 98 48 90 38', 'M112 64 C104 54 120 48 112 38'],
  },
  slice: {
    body: [
      'M44 152 H156 V114 H44 Z',
      'M44 133 H156',
      'M44 114 C58 100 68 124 84 112 C98 100 108 124 122 112 C136 100 146 120 156 114',
      'M92 96 a8 8 0 1 0 16 0 a8 8 0 1 0 -16 0',
      'M100 88 C100 82 102 78 106 74',
      'M30 162 H170',
    ],
    steam: [],
  },
  bun: {
    body: [
      'M44 128 C44 92 70 72 100 72 C130 72 156 92 156 128 Z',
      'M44 128 C44 144 60 152 100 152 C140 152 156 144 156 128',
      'M76 102 C86 94 114 94 124 102',
      'M90 82 H110 V90 H90 Z',
    ],
    steam: [],
  },
  flask: {
    body: [
      'M82 58 H118 V74 H82 Z',
      'M76 74 H124 V160 C124 168 118 172 112 172 H88 C82 172 76 168 76 160 Z',
      'M76 98 H124',
      'M76 140 H124',
    ],
    steam: [],
  },
  leaf: {
    body: [
      'M54 154 C44 96 88 52 150 48 C152 112 112 152 54 154 Z',
      'M54 154 C84 124 112 92 142 60',
      'M120 176 C112 150 134 128 164 126 C168 154 148 174 120 176 Z',
    ],
    steam: [],
  },
  storefront: {
    body: [
      'M30 92 H170 V168 H30 Z',
      'M24 92 L36 66 H164 L176 92 Z',
      'M52 168 V120 H92 V168',
      'M108 110 H152 V142 H108 Z',
    ],
    steam: [],
  },
  interior: {
    body: [
      'M30 168 H170',
      'M44 168 V112 H84 V168',
      'M116 168 V112 H156 V168',
      'M100 36 V70',
      'M80 70 H120 L112 90 H88 Z',
    ],
    steam: [],
  },
  couple: {
    body: [
      'M36 96 a26 26 0 1 0 52 0 a26 26 0 1 0 -52 0',
      'M86 92 l8 7 l-8 4',
      'M38 104 C42 132 82 132 86 106',
      'M54 66 a8 8 0 1 0 16 0 a8 8 0 1 0 -16 0',
      'M26 172 C28 142 96 142 98 172',
      'M112 96 a26 26 0 1 0 52 0 a26 26 0 1 0 -52 0',
      'M114 92 l-8 7 l8 4',
      'M142 62 a8 8 0 1 0 16 0 a8 8 0 1 0 -16 0',
      'M102 172 C104 142 172 142 174 172',
    ],
    steam: [],
  },
  steam: {
    body: [],
    steam: [
      'M70 160 C54 136 86 122 70 98 C60 84 72 72 70 56',
      'M100 160 C84 136 116 122 100 98 C90 84 102 72 100 56',
      'M130 160 C114 136 146 122 130 98 C120 84 132 72 130 56',
    ],
  },
  pin: {
    body: ['M100 170 C70 130 62 114 62 98 a38 38 0 1 1 76 0 C138 114 130 130 100 170 Z', 'M88 98 a12 12 0 1 0 24 0 a12 12 0 1 0 -24 0'],
    steam: [],
  },
};

/** SVG markup for a motif. `draw` marks steam paths so CSS can line-draw them. */
export function motifMarkup(name, { draw = false } = {}) {
  const m = motifs[name];
  if (!m) return '';
  const body = m.body.map((d) => `<path d="${d}"/>`).join('');
  const steam = m.steam
    .map((d, i) => `<path class="steam${draw ? ' draw' : ''}" style="--i:${i}" ${draw ? 'pathLength="1"' : ''} d="${d}"/>`)
    .join('');
  return body + steam;
}
