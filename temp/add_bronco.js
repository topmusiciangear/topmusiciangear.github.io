const fs = require('fs');
const BASE = 'C:/Users/Daniel/projects/topmusiciangear/';
const die = (m) => { console.log('!! ' + m); process.exit(1); };

// ---------- 1. CATALOGO 680 (imagen temporal Andertons hasta G4M) ----------
const pj = BASE + 'data/products.json';
const P = JSON.parse(fs.readFileSync(pj, 'utf8'));
const arr = Array.isArray(P) ? P : P.products;
if (arr.some(x => x.id === 680)) die('680 ya existe');
arr.push({
  id: 680, title: 'Squier Sonic Bronco Bass', title_es: 'Squier Sonic Bronco Bass', brand: 'Squier',
  category: 'bass', price: 259,
  desc: '30-inch short-scale beginner bass with slim C maple neck, light poplar body and a single ceramic pickup. Volume + tone, passive electronics, 19 frets — the cheapest comfortable start.',
  desc_es: 'Bajo de escala corta 30 pulgadas para empezar con mástil C de maple, cuerpo ligero de álamo y una pastilla cerámica. Volumen + tono, electrónica pasiva, 19 trastes: el inicio cómodo más barato.',
  img: 'https://cdn11.bigcommerce.com/s-4hc0jwsnnq/images/stencil/1280x1280/products/22177/76319/0373800506-Squier-Sonic-Bronco-Bass-Guitar-Black-Body__83521.1715214573.jpg?c=1',
  image: 'https://cdn11.bigcommerce.com/s-4hc0jwsnnq/images/stencil/1280x1280/products/22177/76319/0373800506-Squier-Sonic-Bronco-Bass-Guitar-Black-Body__83521.1715214573.jpg?c=1',
  stores: {
    andertons: 'https://www.andertons.co.uk/squier-sonic-bronco-bass-guitar-black/',
    musicstore: 'https://www.musicstore.com/en_OE/EUR/Squier-Sonic-Bronco-Bass-IL-Black/art-BAS0012451-000'
  },
  excludeStores: ['reverb']
});
fs.writeFileSync(pj, JSON.stringify(P, null, 2));
console.log('catalogo: alta 680 Sonic Bronco (img temporal Andertons)');

// ---------- 2. TEST 680 ----------
const bj = BASE + 'build-guides.js';
let src = fs.readFileSync(bj, 'utf8');
const ini = src.indexOf('const TEST_SHOP_BTN');
const abre = src.indexOf('{', ini);
const anchor = '  679: {';
const ai = src.indexOf(anchor, abre);
if (ai === -1) die('ancla 679 no encontrada');
src = src.slice(0, ai) + '  680: {\n    prices: {\n      andertons: "£159.00",\n      musicstore: "€202.30"\n    },\n    urls: {\n      andertons: "https://www.andertons.co.uk/squier-sonic-bronco-bass-guitar-black/",\n      musicstore: "https://www.musicstore.com/en_OE/EUR/Squier-Sonic-Bronco-Bass-IL-Black/art-BAS0012451-000"\n    }\n  },\n' + src.slice(ai);
fs.writeFileSync(bj, src);
try { new Function(fs.readFileSync(bj, 'utf8')); console.log('TEST 680 creado'); }
catch (err) { die('ROTO: ' + err.message); }

// ---------- 3. GUIA ----------
const gj = BASE + 'data/guides.json';
const guides = JSON.parse(fs.readFileSync(gj, 'utf8'));
const g = guides.find(x => x.id === 'beginner-bass-guitars');

// 3a. featured + SEC0 products + hook activa/pasiva
g.featuredProducts.push(680);
const s0 = g.sections[0];
s0.products.push(680);
const hookEn = 'shoulder pain kills practice streaks.';
if (!s0.content.includes(hookEn)) die('SEC0 EN no coincide');
s0.content = s0.content.split(hookEn).join(hookEn + ' Don\'t fall for the more-knobs trap: an active bass runs on a 9V battery that dies overnight if you leave the cable plugged in — passive gives you rock-history tone with zero headaches.');
const hookEs = 'el dolor de hombro mata rachas de práctica.';
if (!s0.content_es.includes(hookEs)) die('SEC0 ES no coincide');
s0.content_es = s0.content_es.split(hookEs).join(hookEs + ' No caigas en la trampa de más botones: un bajo activo tira de una batería de 9V que muere en una noche si dejas el cable conectado; el pasivo te da el tono de la historia del rock sin dolores de cabeza.');
console.log('SEC0 hook + productos');

// 3b. Review nueva
g.sections.push({
  heading: 'Squier Sonic Bronco: Short-Scale Starter',
  heading_es: 'Squier Sonic Bronco: escala corta para empezar',
  products: [680],
  content: '<p><strong>The Sonic Bronco is the shortest path to playing bass.</strong> A 30-inch short scale with slim C maple neck, narrow 1.5-inch nut and light poplar body means small hands reach everything without stretching. One ceramic single-coil with volume and tone keeps the choices to zero — plug in and play.</p><p><strong>The honest trade.</strong> A single middle pickup covers classic thump but not J-style articulation or modern active bite, and 19 frets end the story early for soloists. Around ~$259, it is the cheapest comfortable start here — ideal for kids, guitar converts and small hands.</p>',
  content_es: '<p><strong>El Sonic Bronco es el camino más corto a tocar el bajo.</strong> Escala corta de 30 pulgadas con mástil C de maple, cejuela estrecha de 1,5 pulgadas y cuerpo ligero de álamo: las manos pequeñas llegan a todo sin estirarse. Una single-coil cerámica con volumen y tono deja las decisiones en cero: enchufar y tocar.</p><p><strong>Lo honesto.</strong> Una sola pastilla central cubre el thump clásico pero no la articulación J ni la mordida activa moderna, y 19 trastes cierran pronto la historia para solistas. Por ~$259, es el inicio cómodo más barato aquí: ideal para niños, conversos de guitarra y manos pequeñas.</p>'
});
console.log('review Bronco agregada');

// 3c. Tabla: 8va columna
const NCOL = g.productTable.columns.length;
if (NCOL !== 7) die('columnas inesperadas: ' + NCOL);
g.productTable.columns.push({ title: 'Squier Sonic Bronco Bass', title_es: 'Squier Sonic Bronco Bass' });
const col8 = {
  'Best For': ['Short-scale comfort on a budget', 'Escala corta con poco presupuesto'],
  'Estimated Price': ['~$259', '~$259'],
  'Body Wood': ['Poplar', 'Álamo'],
  'Neck': ['Maple C, 19 frets', 'Maple C, 19 trastes'],
  'Frets & Fretboard': ['19, laurel', '19, laurel'],
  'Pickups': ['1x ceramic single-coil', '1x single-coil cerámica'],
  'Active/Passive': ['Passive', 'Pasiva'],
  'Scale Length': ['30 in (762 mm)', '30 in (762 mm)'],
  'Electronics': ['Volume, tone', 'Volumen, tono'],
  'Tuners': ['Die-cast sealed', 'Selladas die-cast'],
  'Weight': ['Not published (varies by unit)', 'No publicado (varía por unidad)']
};
g.productTable.rows.forEach(r => {
  const v = col8[r.label];
  if (!v) die('sin valores Bronco para: ' + r.label);
  if (r.values.length !== NCOL) die('fila desalineada: ' + r.label);
  r.values.push({ value: v[0], value_es: v[1] });
});
console.log('tabla: 8 columnas');

// 3d. Veredicto
g.verdictProsCons.push({
  name: 'Squier Sonic Bronco Bass', name_es: 'Squier Sonic Bronco Bass',
  pros: ['30-inch short scale — easiest reach for small hands and kids', 'Slim C maple neck with 1.5-inch nut, light poplar body', 'One pickup, two knobs: zero learning curve', 'Cheapest comfortable start at ~$259'],
  cons: ['Single middle pickup — no J articulation or active bite', '19 frets limit upper-register soloing', 'Basic hardware and electronics reflect the price', 'Short scale feels floppy with heavy strings'],
  pros_es: ['Escala corta de 30 pulgadas: alcance fácil para manos pequeñas y niños', 'Mástil C de maple con cejuela de 1,5 pulgadas, cuerpo ligero de álamo', 'Una pastilla, dos knobs: cero curva de aprendizaje', 'Inicio cómodo más barato por ~$259'],
  cons_es: ['Una sola pastilla central: sin articulación J ni mordida activa', '19 trastes limitan solos en registro agudo', 'Hardware y electrónica básicos según el precio', 'La escala corta se afloja con cuerdas gruesas']
});
console.log('veredicto Bronco 4+4');
fs.writeFileSync(gj, JSON.stringify(guides, null, 2));

// ---------- VERIFICACION ----------
const all = JSON.stringify(g);
console.log('Bronco menciones:', (all.match(/Bronco/g) || []).length);
console.log('columnas:', g.productTable.columns.length);
console.log('desalineadas:', g.productTable.rows.filter(r => r.values.length !== 8).length);
console.log('veredictos:', g.verdictProsCons.length);
console.log('paridad:', g.verdictProsCons.every(v => v.pros.length === v.pros_es.length && v.cons.length === v.cons_es.length && v.pros.length >= 4 && v.cons.length >= 4));
