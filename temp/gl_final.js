const fs = require('fs');
const BASE = 'C:/Users/Daniel/projects/topmusiciangear/';
const die = (m) => { console.log('!! ' + m); process.exit(1); };
const dieAll = [];

// ================= 1. CATALOGO 683 =================
const pj = BASE + 'data/products.json';
const PJ = JSON.parse(fs.readFileSync(pj, 'utf8'));
const arr = Array.isArray(PJ) ? PJ : PJ.products;
const p = arr.find(x => x.id === 683);
if (!p) die('683 no existe');

p.img = 'https://r2.gear4music.com/media/26/260332/1200/preview.jpg?_gl=1*vzpdf*_gcl_aw*R0NMLjE3OTE5OTMyNzcuQ2p3S0NBancwTHpXQmhCT0Vpd0FLUWQwY0VaVTQyR1Q0MEJBNm5jNEZod0x3ek9XRVJrbnpqajdUc1Q3S043MlVCcDZkZ1BaaDhMcEVSb0NVMkVRQXZEX0J3RQ..';
p.image = p.img;
p.discontinued = true;
p.availabilityNote = 'G&L ceased operations in 2025. Stock is now limited to independent dealers and second-hand sellers.';
const awin = (mid, url) => 'https://www.awin1.com/cread.php?awinmid=' + mid + '&awinaffid=2891111&ued=' + encodeURIComponent(url);
p.stores = {
  gear4music: awin(1117, 'https://www.gear4music.com/us/en/Guitar-and-Bass/GandL-Tribute-L-2000-Electric-Bass-Black-Gloss/1YLG'),
  zzounds: 'https://www.zzounds.com/item--GLGTL2000',
  musicstore: awin(63816, 'https://www.musicstore.com/en_OE/EUR/G-L-Tribute-L-2000-Premium-MN-BB-Blueburst/art-BAS0002876-000')
};
fs.writeFileSync(pj, JSON.stringify(PJ, null, 2));
console.log('catalogo 683: foto G4M oficial + 3 tiendas (G4M/zzounds/MS), sin precios');

// ================= 2. TEST_SHOP_BTN 683 =================
const bj = BASE + 'build-guides.js';
let src = fs.readFileSync(bj, 'utf8');
const i683 = src.indexOf('\n  683: {');
if (i683 === -1) die('TEST 683 no encontrado');
const mNext = /\n  \d+: \{/.exec(src.slice(i683 + 2));
const fin683 = i683 + 2 + mNext.index + 1;
const q = (s) => '"' + s.replace(/"/g, '\\"') + '"';
const blk = '  683: {\n    prices: {\n    },\n    urls: {\n      gear4music: ' + q(p.stores.gear4music) + ',\n      zzounds: ' + q(p.stores.zzounds) + ',\n      musicstore: ' + q(p.stores.musicstore) + '\n    },\n    oos: [ "andertons" ]\n  },\n';
src = src.slice(0, i683 + 1) + blk + src.slice(fin683);
fs.writeFileSync(bj, src);
try { new Function(fs.readFileSync(bj, 'utf8')); } catch (e) { die('build roto: ' + e.message); }
console.log('TEST 683: 3 tiendas sin precio + andertons marcado OOS (no lo vende)');

// ================= 3. GUIA: nota de disponibilidad EN+ES =================
const gj = BASE + 'data/guides.json';
const guides = JSON.parse(fs.readFileSync(gj, 'utf8'));
const g = guides.find(x => x.id === 'budget-bass-like-expensive');
const s = g.sections.find(x => (x.products || [])[0] === 683);
if (!s) die('review del L-2000 no encontrada');

const enAnchor = '<p><strong>Editor\'s note: do not expect plug-and-play.</strong>';
if (!s.content.includes(enAnchor)) die('ancla EN no encontrada');
s.content = s.content.replace(enAnchor,
  '<p><strong>Editor\'s note: G&L has stopped making instruments, and that changes how you buy this one.</strong> The Fullerton factory founded by Leo Fender closed at the end of September 2025 — staff were furloughed on 15 September and let go on 29 September, and the parent company BBE Sound dissolved its corporate status that October. Fender acquired the Leo Fender trademark and the intellectual property, while the remaining US-made stock went to the liquidation firm MIRC in Tennessee. This is not a new version replacing an old one; it is the end of a production line.</p>' +
  '<p><strong>What that means in practice.</strong> Do not expect to walk into a big chain and find one. Independent dealers and second-hand sellers such as Reverb are now the realistic route, either new-old-stock or lightly used. It also means the price is no longer the mid-range figure this bass used to command — units in independent shops now sit around $899 against a historical street price of roughly $700–800, and good examples move quickly. The MFD pickups still justify every cent, but you are buying a discontinued instrument, not a product line with next year\'s model.</p>' +
  '<p><strong>If you want this territory and it is in stock today.</strong> The <strong>Sterling by Music Man StingRay Ray4</strong> and the <strong>Sire Marcus Miller V5</strong> are the live alternatives: the Ray4 is the best aggressive active tone under $400, the V5 the best-feeling passive build, and both are in normal mass distribution.</p>' +
  enAnchor);
console.log('review EN: nota de disponibilidad + alternativas añadida');

const esAnchor = '<p><strong>Nota del editor: no esperes enchufar y tocar.</strong>';
if (!s.content_es.includes(esAnchor)) die('ancla ES no encontrada');
s.content_es = s.content_es.replace(esAnchor,
  '<p><strong>Nota del editor: G&L ha dejado de fabricar instrumentos, y eso cambia cómo se compra este bajo.</strong> La fábrica de Fullerton fundada por Leo Fender cerró a finales de septiembre de 2025 — la plantilla fue suspendida el 15 de septiembre y despedida el 29, y la matriz BBE Sound anuló su personalidad jurídica ese mismo octubre. Fender compró la marca "Leo Fender" y la propiedad intelectual, mientras el stock fabricado en Estados Unidos fue a la empresa de liquidación MIRC, en Tennessee. No es que haya salido una versión nueva que sustituya a la anterior: es el final de una línea de producción.</p>' +
  '<p><strong>Qué significa eso en la práctica.</strong> No esperes entrar en una cadena grande y encontrarlo. Tiendas independientes y vendedores de segunda mano como Reverb son ahora la vía realista, ya sea stock antiguo sin estrenar o seminuevo. También significa que el precio ya no es la cifra de gama media de siempre: las unidades en tiendas independientes rondan los $899 frente a un precio de calle histórico de unos $700–800, y las buenas vuelan. Las pastillas MFD siguen justificando cada céntimo, pero estás comprando un instrumento descatalogado, no una gama con el modelo del año que viene.</p>' +
  '<p><strong>Si quieres este terreno y lo tienes hoy en stock.</strong> El <strong>Sterling by Music Man StingRay Ray4</strong> y el <strong>Sire Marcus Miller V5</strong> son las alternativas vivas: el Ray4 es el mejor tono activo agresivo por menos de $400, el V5 la mejor construcción pasiva en tacto, y los dos se distribuyen con normalidad.</p>' +
  esAnchor);
console.log('review ES: nota de disponibilidad + alternativas añadida');

// ---- tabla: precio sigue "No publicado" (las 3 tiendas no lo muestran) ----
const ti = g.productTable.columns.map(c => c.title);
const i = ti.indexOf('G&L Tribute L-2000');
if (i === -1) die('columna L-2000 no encontrada');
const pr = g.productTable.rows.find(r => r.label === 'Estimated Price');
if (pr.values[i].value !== 'Not published') die('precio inesperado: ' + pr.values[i].value);
console.log('tabla: precio se mantiene "Not published" (ninguna de las 3 tiendas lo muestra)');

fs.writeFileSync(gj, JSON.stringify(guides, null, 2));
console.log('\nGL STEP OK');