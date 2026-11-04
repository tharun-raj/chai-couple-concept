# The Chai Couple: concept site

    npm install
    npm run dev        # http://localhost:5173
    npm run build      # static output in dist/
    npm run preview    # serve dist/ to test the production build

Static site (Vite, vanilla JS, Lenis for desktop scroll). Stylesheets are linked in each page's head, so pages never paint unstyled.

## Structure
    index.html story.html gallery.html menu.html   page shells
    build/        fills shared header, footer, bottom bar and page bodies at build time
    src/content.js    every word and fact, with [CONFIRM] helper (single source of truth)
    src/styles/   tokens.css (colour, type, space, easing) base.css components.css + one css per page
    src/lib/      core.js (scroll, header, open-now status, reveals) art.js motifs.js
    src/pages/    one entry script per page
    public/assets logo files

## Motion (named, with where it is used)
- Page-load intro: masked line Reveal + Stagger + Scale in of the hero photo (once per session)
- Smooth scroll: Lenis, fine pointers only; touch keeps native momentum
- Scroll reveal: fade + 16px rise, 280ms, once
- Story: scroll-driven chapters, direction-aware transition, line drawing, progress segments
- Menu tabs: clip-path pill, interruptible card Stagger (24ms, 200ms)
- Card/tile hover: tone step, pointer-fine only. Button press: scale(.97), 120ms
- Reduced motion: no Lenis, no 3D, story stacks, reveals become 150ms fades
Rejected: tilt on menu cards, tab-bar animations, cursor effects, price tickers, parallax on repeat-use pages.
