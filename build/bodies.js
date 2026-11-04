import { site, menu, signature, story, gallery, confirm } from '../src/content.js';
import { plateSVG, chapterArt, storyBgSVG } from '../src/lib/art.js';
import { hoursRows } from './partials.js';

const wa = site.whatsappUrl;

const plate = ({ motif, tone, w, h, title, note, ratio }) => `
<figure class="plate">
  <div class="plate__media" style="--ratio:${ratio || `${w} / ${h}`}">${plateSVG({ motif, tone, w, h, label: `Placeholder: ${title}` })}</div>
  <figcaption class="plate__note"><strong>Photo placeholder.</strong> ${note}</figcaption>
</figure>`;

// ------------------------------------------------------------------ HOME
function home() {
  const plus =
    '<svg viewBox="0 0 24 24" width="22" height="22" aria-hidden="true"><path d="M12 5v14M5 12h14" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round"/></svg>';
  const panels = signature
    .map((s, i) => {
      const name = s.slot ? confirm(s.slot) : s.name;
      const desc = s.slot ? confirm('short description') : s.desc;
      const big = plateSVG({ motif: s.motif, tone: s.tone, w: 640, h: 640, label: '' });
      const small = plateSVG({ motif: s.motif, tone: s.tone, w: 160, h: 160, label: '' });
      return `
      <li class="spanel" data-open="false">
        <div class="spanel__media" aria-hidden="true">${big}</div>
        <h3 class="spanel__head">
          <button class="spanel__btn" type="button" aria-expanded="false" aria-controls="sp-${i}">
            <span class="spanel__thumb" aria-hidden="true">${small}</span>
            <span class="spanel__name">${name}</span>
            <span class="spanel__plus" aria-hidden="true">${plus}</span>
          </button>
        </h3>
        <div class="spanel__body" id="sp-${i}" inert>
          <div class="spanel__inner">
            <div class="spanel__content">
              <div class="spanel__bodymedia" aria-hidden="true">${big}</div>
              <p class="spanel__desc">${desc}</p>
              <p class="spanel__price">${confirm('price')}</p>
              <p class="spanel__note"><strong>Photo placeholder.</strong> ${s.note}</p>
            </div>
          </div>
        </div>
      </li>`;
    })
    .join('');

  return `
<section class="hero field--dark" aria-labelledby="hero-title">
  <div class="hero__visual" data-hero-visual>
    <img class="hero__img" src="/assets/hero-table.jpg" width="1170" height="659" alt="A wooden cafe table with glasses of chai and five slices of cake" fetchpriority="high" decoding="async" />
  </div>
  <div class="hero__veil" aria-hidden="true"></div>
  <div class="wrap hero__grid">
    <div class="hero__text">
      <h1 id="hero-title" class="hero__title">
        <span class="line"><span>Chai and cake</span></span>
        <span class="line"><span>from four.</span></span>
      </h1>
      <p class="hero__lede" data-intro>Irani-style chai, bun maska and cake, Tuesday to Sunday in Thammanam, Kochi.</p>
      <div class="hero__actions" data-intro>
        <a class="btn" href="${wa}">Order on WhatsApp</a>
        <a class="btn btn--light" href="menu.html">View Menu</a>
        <a class="link" href="#visit">Visit Us</a>
      </div>
      <p class="status" data-status data-intro></p>
    </div>
  </div>
</section>

<section class="section field--light sig" aria-labelledby="sig-title">
  <div class="wrap">
    <div class="sig__head">
      <h2 id="sig-title" data-reveal>On the counter.</h2>
      <div class="sig__side" data-reveal style="--i:1">
        <p class="statement">Chai, bun maska and cake. ${confirm('signature items')}</p>
        <a class="btn btn--dark" href="menu.html">See the full menu</a>
      </div>
    </div>
    <ul class="spanels" data-reveal>${panels}</ul>
  </div>
</section>

<section class="section field--tone teaser" aria-labelledby="teaser-title">
  <div class="wrap teaser__grid">
    <div class="teaser__text">
      <h2 id="teaser-title" data-reveal>It began with one flask.</h2>
      <p class="statement" data-reveal style="--i:1">A borrowed table, twenty cups of tea and a couple who came home to Kochi.</p>
      <p data-reveal style="--i:2"><mark class="confirm">DRAFT: verify with owners</mark></p>
      <a class="btn btn--dark" href="story.html" data-reveal style="--i:3">Read our story</a>
    </div>
    <div class="teaser__art" aria-hidden="true" data-reveal style="--i:2">${chapterArt('chai')}</div>
  </div>
</section>`;
}

// ------------------------------------------------------------------ STORY
function storyPage() {
  const n = story.length;
  const chapters = story
    .map(
      (c, i) => `
      <article class="chapter" data-chapter="${i}" data-state="${i === 0 ? 'active' : 'next'}" aria-labelledby="ch-${c.id}">
        <div class="chapter__art">${chapterArt(c.motif)}</div>
        <div class="chapter__text">
          <h2 id="ch-${c.id}">${c.title}</h2>
          <p>${c.body}</p>
          ${
            i === n - 1
              ? `<div class="chapter__actions"><a class="btn" href="menu.html">View Menu</a><a class="btn btn--light" href="${site.mapsUrl}">Get directions</a></div>`
              : ''
          }
        </div>
      </article>`
    )
    .join('');

  const segs = story
    .map(
      (c, i) =>
        `<button class="seg" type="button" data-seg="${i}" aria-label="Chapter ${i + 1} of ${n}: ${c.title}"><span class="seg__fill"></span></button>`
    )
    .join('');

  return `
<h1 class="sr-only">Our story</h1>
<section class="story field--dark" style="--n:${n}" data-titles='${JSON.stringify(story.map((c) => c.title))}' aria-label="Our story, in five chapters">
  <div class="story__track">
    <div class="story__stage">
      <div class="story__bg" aria-hidden="true">${storyBgSVG()}</div>
      <div class="story__veil" aria-hidden="true"></div>
      <div class="story__hud wrap">
        <div class="story__progress">${segs}</div>
        <p class="story__label" aria-live="polite">${story[0].title}</p>
        <p class="story__flags"><mark class="confirm">DRAFT: verify with owners</mark></p>
      </div>
      <div class="story__chapters wrap">${chapters}</div>
      <p class="story__bgnote wrap"><mark class="confirm">Background is a drawn placeholder. Swap in a real photo: warm cafe at dusk, chai and cake on a wooden counter, shallow focus.</mark></p>
    </div>
  </div>
</section>`;
}

// ------------------------------------------------------------------ GALLERY
function galleryPage() {
  const tiles = gallery
    .map((g, i) => {
      const ratio = (g.w / g.h).toFixed(3);
      return `
    <figure class="tile" data-reveal>
      <button class="tile__btn" type="button" data-index="${i}" data-title="${g.title}" data-note="${g.note.replace(/"/g, '&quot;')}" data-ratio="${ratio}" aria-label="Open photo placeholder: ${g.title}">
        <span class="plate__media" style="--ratio:${g.w} / ${g.h}">${plateSVG({ motif: g.motif, tone: g.tone, w: g.w, h: g.h, label: `Placeholder: ${g.title}` })}</span>
      </button>
      <figcaption class="tile__note"><strong>${g.title}.</strong> ${g.note}</figcaption>
    </figure>`;
    })
    .join('');

  return `
<section class="page-head field--light">
  <div class="wrap page-head__grid">
    <h1>Evenings, in pictures.</h1>
    <p class="statement">Placeholders for now. Each tile says what the real photograph should show.</p>
  </div>
</section>
<section class="gallery field--light" aria-label="Photo gallery">
  <div class="wrap"><div class="masonry">${tiles}</div></div>
</section>
<dialog class="lightbox" aria-label="Photo viewer">
  <div class="lightbox__inner">
    <div class="lightbox__bar">
      <p class="lightbox__count" aria-live="polite"></p>
      <button class="lightbox__close" type="button" aria-label="Close viewer"><span></span><span></span></button>
    </div>
    <div class="lightbox__stage"><div class="lightbox__media"></div></div>
    <div class="lightbox__foot">
      <div class="lightbox__cap"><h2 class="lightbox__title"></h2><p class="lightbox__note"></p></div>
      <div class="lightbox__nav">
        <button class="round" type="button" data-dir="-1" aria-label="Previous photo"><svg viewBox="0 0 24 24" width="22" height="22" aria-hidden="true"><path d="M15 5l-7 7 7 7" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"/></svg></button>
        <button class="round" type="button" data-dir="1" aria-label="Next photo"><svg viewBox="0 0 24 24" width="22" height="22" aria-hidden="true"><path d="M9 5l7 7-7 7" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"/></svg></button>
      </div>
    </div>
  </div>
</dialog>`;
}

// ------------------------------------------------------------------ MENU
function menuPage() {
  const panels = menu
    .map((cat, ci) => {
      const cards = cat.items
        .map((it) => {
          const name = it.slot ? confirm(it.slot) : it.name;
          const desc = it.slot ? confirm('short description') : it.desc;
          const veg =
            it.veg === true
              ? `<span class="tag tag--veg"><svg viewBox="0 0 16 16" width="16" height="16" aria-hidden="true"><rect x="1" y="1" width="14" height="14" rx="2.5" fill="none" stroke="currentColor" stroke-width="2"/><circle cx="8" cy="8" r="3.6" fill="currentColor"/></svg>Veg</span>`
              : `<span class="tag">${confirm('veg tag')}</span>`;
          return `<li class="card">
            <div class="card__top">${veg}</div>
            <h3 class="card__name">${name}</h3>
            <p class="card__desc">${desc}</p>
            <p class="card__price">${confirm('price')}</p>
          </li>`;
        })
        .join('');
      return `
      <section class="menu-panel" id="panel-${cat.id}" data-panel="${cat.id}" data-label="${cat.label}" role="tabpanel" aria-labelledby="tab-${cat.id}"${ci ? ' hidden' : ''}>
        <h2 class="menu-panel__title">${cat.label}</h2>
        <ul class="menu-grid">${cards}</ul>
      </section>`;
    })
    .join('');

  return `
<section class="page-head field--light">
  <div class="wrap page-head__grid">
    <h1>Chai, cake and bakes.</h1>
    <p class="statement">Names, prices and veg tags marked <mark class="confirm">[CONFIRM]</mark> are waiting on the owners.</p>
  </div>
</section>
<section class="menu field--light menu--tabs" aria-label="Menu">
  <div class="menu__tabs" data-tabs-host>
    <div class="wrap">
      <div class="tabs">
        <div class="tabs__inner" role="tablist" aria-label="Menu categories">
          ${menu.map((c, i) => `<button class="tab" type="button" role="tab" id="tab-${c.id}" aria-controls="panel-${c.id}" aria-selected="${i === 0}" tabindex="${i ? -1 : 0}" data-id="${c.id}">${c.label}</button>`).join('')}
          <div class="tabs__on" aria-hidden="true">${menu.map((c) => `<span>${c.label}</span>`).join('')}</div>
        </div>
      </div>
    </div>
  </div>
  <noscript><style>.menu-panel[hidden]{display:block!important}</style></noscript>
  <div class="wrap menu__panels">${panels}</div>
</section>`;
}

export const bodies = { home, story: storyPage, gallery: galleryPage, menu: menuPage };
