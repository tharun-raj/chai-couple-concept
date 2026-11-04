// Single source of truth for every word and fact on the site.
// VERIFIED = given by the client or confirmed in public sources.
// Anything else is wrapped in confirm(...) and shows up as [CONFIRM: ...] on the page.

export const confirm = (label) => `<mark class="confirm">[CONFIRM: ${label}]</mark>`;

const addressFull =
  'Thammanam - Pullepady Rd, Kathrikadavu, Thammanam, Ernakulam, Keralam 682032'; // VERIFIED (brief)

export const site = {
  name: 'The Chai Couple',
  address: {
    lines: ['Thammanam - Pullepady Rd', 'Kathrikadavu, Thammanam', 'Ernakulam, Keralam 682032'],
    full: addressFull,
  },
  // VERIFIED (brief); the same number appears on the public Zomato listing.
  phone: { display: '080784 99215', tel: '+918078499215' },
  // VERIFIED (brief): Monday closed, Tuesday to Sunday 4 to 10 pm.
  hours: {
    closedDay: 1, // Monday (0 = Sunday)
    openHour: 16,
    closeHour: 22,
    rows: [
      { days: 'Monday', time: 'Closed', dayIndexes: [1] },
      { days: 'Tuesday to Sunday', time: '4 pm to 10 pm', dayIndexes: [2, 3, 4, 5, 6, 0] },
    ],
  },
  designer: 'Tharun',
};

// The number is verified; whether it is on WhatsApp is not, see CONFIRM.md.
site.whatsappUrl =
  'https://wa.me/' +
  site.phone.tel.replace('+', '') +
  '?text=' +
  encodeURIComponent('Hi! I would like to order from The Chai Couple.');
site.mapsUrl =
  'https://www.google.com/maps/search/?api=1&query=' + encodeURIComponent(`The Chai Couple, ${addressFull}`);

export const nav = [
  { href: 'index.html', label: 'Home', page: 'home' },
  { href: 'menu.html', label: 'Menu', page: 'menu' },
  { href: 'story.html', label: 'Our Story', page: 'story' },
  { href: 'gallery.html', label: 'Gallery', page: 'gallery' },
];

// ---------------------------------------------------------------- Menu
// Verified in public sources: Irani-style special tea and bun maska.
// Everything else is a slot: the card layout is real, the content is for the owners to fill.
export const menu = [
  {
    id: 'chai',
    label: 'Chai and drinks',
    motif: 'glass',
    items: [
      { name: 'Irani chai', desc: 'Irani-style special tea.', veg: true },
      { slot: 'drink name' },
      { slot: 'drink name' },
      { slot: 'drink name' },
    ],
  },
  {
    id: 'cakes',
    label: 'Cakes',
    motif: 'slice',
    items: [{ slot: 'cake name' }, { slot: 'cake name' }, { slot: 'cake name' }, { slot: 'cake name' }],
  },
  {
    id: 'bakes',
    label: 'Bakes and snacks',
    motif: 'bun',
    items: [
      { name: 'Bun maska', desc: 'A soft bun split and buttered. Made for dipping in chai.', veg: null },
      { slot: 'snack name' },
      { slot: 'snack name' },
      { slot: 'snack name' },
    ],
  },
];

// Signature tiles. Each one shows a gallery-style placeholder with an art-direction note for the real photo.
export const signature = [
  { name: 'Irani chai', desc: 'Irani-style special tea, poured hot.', motif: 'glass', tone: 'roast', note: 'A steel tray with a glass of Irani chai, steam visible, warm low evening light, shallow depth of field.' },
  { name: 'Bun maska', desc: 'A soft bun split and buttered. Made for dipping in chai.', motif: 'bun', tone: 'cream', note: 'A bun split open, butter just starting to melt, torn-edge close-up.' },
  { slot: 'cake name', motif: 'slice', tone: 'caramel', note: 'A single cake slice on a plain plate, side light, crumb and frosting in focus.' },
  { slot: 'snack name', motif: 'cup', tone: 'roast', note: 'Whatever is warm and snackable next to the chai, shot at the counter in evening light.' },
];

// ---------------------------------------------------------------- Story (DRAFT)
// Written only from public information:
//  - Onmanorama, 7 Nov 2025: "After spending a few years in Belgium and Canada..." (couple left abroad for Kochi)
//  - Onmanorama, 13 Nov 2025: borrowed table, flask from a grandmother's kitchen, 20 cups of tea with 20 buns;
//    "bun maska and a special tea"; the couple met at Chinmaya College, Ernakulam, later married.
//  - Same article (Nov 2025) says they ran a pop-up that moved location daily. The Thammanam address comes
//    from the client brief, so "they now have a fixed shop" is a CONFIRM item, not a claim on the page.
// The press spells the owners' names inconsistently (Saran / Sharan), so no names are used.
export const story = [
  {
    id: 'spark',
    title: 'The spark',
    motif: 'spark',
    body: `After a few years in Belgium and Canada, the two of them came home to Kochi.`,
  },
  {
    id: 'chai',
    title: 'The first chai',
    motif: 'chai',
    body: `One borrowed table, a flask from a grandmother's kitchen, twenty cups of tea and twenty buns. A short menu: bun maska and a special tea.`,
  },
  {
    id: 'cake',
    title: 'The first cake',
    motif: 'cake',
    body: `Cake came to the counter beside the chai. ${confirm('when cakes began and which cake came first')}`,
  },
  {
    id: 'couple',
    title: 'The couple behind it',
    motif: 'couple',
    body: `They met at college in Ernakulam, married, and now run the counter together. ${confirm("owners' names, and whether to name them")}`,
  },
  {
    id: 'today',
    title: 'Today in Kochi',
    motif: 'today',
    body: `Find them on Thammanam–Pullepady Road, Tuesday to Sunday, four till ten.`,
  },
];

// ---------------------------------------------------------------- Gallery
// Every tile is a placeholder with an art-direction note for the real photograph.
export const gallery = [
  { id: 'g1', motif: 'glass', tone: 'roast', w: 400, h: 500, title: 'The first pour', note: 'Irani chai in a glass on a steel tray, steam visible, warm low light, shallow depth of field.' },
  { id: 'g2', motif: 'slice', tone: 'cream', w: 400, h: 400, title: 'One slice', note: 'A single cake slice on a plain plate, side light, crumb and frosting in focus.' },
  { id: 'g3', motif: 'couple', tone: 'caramel', w: 400, h: 520, title: 'The two of them', note: 'The owners at the counter, candid, mid-laugh. Needs their permission and a real portrait.' },
  { id: 'g4', motif: 'cup', tone: 'cream', w: 400, h: 500, title: 'Evening hands', note: 'Hands wrapped around a cup, the street blurred behind, early evening blue-hour light.' },
  { id: 'g5', motif: 'flask', tone: 'roast', w: 400, h: 400, title: 'Where it started', note: 'The flask and a stack of buns on a wooden table. Use their own first-day photo if one exists.' },
  { id: 'g6', motif: 'storefront', tone: 'roast', w: 560, h: 380, title: 'The shopfront', note: 'The shopfront at dusk with the sign lit, shot from across Thammanam–Pullepady Road.' },
  { id: 'g7', motif: 'steam', tone: 'cream', w: 400, h: 520, title: 'Steam', note: 'Macro of steam rising from a fresh pour against a dark background.' },
  { id: 'g8', motif: 'leaf', tone: 'caramel', w: 400, h: 400, title: 'Tea and spice', note: 'Tea leaves, cardamom and sugar in small bowls, shot straight down on wood.' },
  { id: 'g9', motif: 'interior', tone: 'roast', w: 520, h: 400, title: 'A table for two', note: 'The seating area, empty, golden hour through the window. No people, no phones.' },
  { id: 'g10', motif: 'bun', tone: 'cream', w: 400, h: 500, title: 'Bun maska', note: 'A bun split open, butter just starting to melt, torn-edge close-up.' },
];
