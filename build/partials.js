import { site, nav, confirm } from '../src/content.js';

const wa = site.whatsappUrl;

const current = (page, item) => (item.page === page ? ' aria-current="page"' : '');

const hoursRows = () =>
  site.hours.rows
    .map(
      (r) =>
        `<div class="hours__row" data-hours-row data-days="${r.dayIndexes.join(',')}"><dt>${r.days}</dt><dd>${r.time}</dd></div>`
    )
    .join('');

export function header(page) {
  const links = nav
    .map((n) => `<a href="${n.href}"${current(page, n)}>${n.label}</a>`)
    .join('');
  const sheetLinks = nav
    .map((n) => `<a class="sheet-link" href="${n.href}"${current(page, n)}>${n.label}</a>`)
    .join('');
  return `
<a class="skip" href="#main">Skip to content</a>
<header class="site-header">
  <div class="site-header__bar wrap">
    <a class="brand" href="index.html" aria-label="${site.name}, home">
      <img class="brand__mark" src="/assets/logo-coin.png" alt="" width="44" height="44" />
      <span class="brand__name">${site.name}</span>
    </a>
    <nav class="nav" aria-label="Primary">${links}</nav>
    <a class="btn btn--sm nav__cta" href="${wa}">Order on WhatsApp</a>
    <button class="nav-toggle" type="button" aria-expanded="false" aria-controls="nav-sheet" aria-label="Open navigation">
      <span></span><span></span>
    </button>
  </div>
  <div class="nav-sheet" id="nav-sheet" inert>
    <nav aria-label="Primary mobile">${sheetLinks}</nav>
    <div class="nav-sheet__foot">
      <p class="status" data-status></p>
      <a class="btn" href="${wa}">Order on WhatsApp</a>
    </div>
  </div>
</header>`;
}

export function footer(page) {
  const id = 'visit';
  return `
<footer class="site-footer field--dark" id="${id}">
  <div class="wrap">
    <div class="site-footer__word" aria-hidden="true">${site.name}</div>
    <div class="site-footer__grid">
      <section aria-labelledby="f-visit">
        <h2 class="foot-h" id="f-visit">Visit</h2>
        <address>${site.address.lines.join('<br />')}</address>
        <p><a class="link" href="tel:${site.phone.tel}">${site.phone.display}</a></p>
        <p><a class="link" href="${site.mapsUrl}">Get directions</a></p>
      </section>
      <section aria-labelledby="f-hours">
        <h2 class="foot-h" id="f-hours">Hours</h2>
        <dl class="hours">${hoursRows()}</dl>
      </section>
      <section aria-labelledby="f-hello">
        <h2 class="foot-h" id="f-hello">Say hello</h2>
        <p>Instagram ${confirm('handle')}</p>
        <p><a class="btn" href="${wa}">Order on WhatsApp</a></p>
      </section>
    </div>
    <p class="site-footer__credit">Concept design by ${site.designer}</p>
  </div>
</footer>`;
}

export function bottomBar(page) {
  const hidden = page === 'home' ? ' is-hidden' : '';
  return `
<div class="bottom-bar${hidden}" data-bottom-bar>
  <a class="btn btn--tone" href="tel:${site.phone.tel}">Call</a>
  <a class="btn" href="${wa}">Order on WhatsApp</a>
</div>`;
}

export { hoursRows };
