const fs = require('fs');
const BASE = 'C:/Users/Daniel/projects/topmusiciangear/';
const die = (m) => { console.log('!! ' + m); process.exit(1); };

// ---------- 1. CATALOGO: alta 675 ----------
const pj = BASE + 'data/products.json';
const P = JSON.parse(fs.readFileSync(pj, 'utf8'));
const arr = Array.isArray(P) ? P : P.products;
if (arr.some(x => x.id === 675)) die('675 ya existe');
arr.push({
  id: 675,
  title: 'sE Electronics X1 R',
  title_es: 'sE Electronics X1 R',
  brand: 'sE Electronics',
  category: 'microphones',
  price: 149,
  badge: 'budget',
  desc: 'Passive figure-8 ribbon mic with hand-crafted 2.5µm aluminum element, 20Hz-16kHz response and 135dB SPL handling. HF-extension tech keeps vocals airy while ribbon smoothness tames harsh, sibilant voices without EQ fights. Phantom-protected all-metal build; swivel clip included.',
  desc_es: 'Micrófono de cinta pasivo en figura-8 con elemento de aluminio de 2,5 µm, respuesta 20Hz-16kHz y 135dB SPL. Su extensión de agudos mantiene la voz con aire mientras la cinta doma voces ásperas y sibilantes sin pelear con el EQ. Chasis metálico protegido contra phantom; pinza incluida.',
  img: 'https://seelectronics.com/wp-content/uploads/2021/11/X1-R-Product-Page-Featured-Image-V2-1.png',
  image: 'https://seelectronics.com/wp-content/uploads/2021/11/X1-R-Product-Page-Featured-Image-V2-1.png',
  stores: {
    musicstore: 'https://www.musicstore.com/en_OE/EUR/sE-electronics-X1R-Ribbon-Microphone-/art-REC0009426-000',
    gear4music: 'https://www.gear4music.com/Recording-and-Computers/sE-Electronics-sE-X1R-Ribbon-Microphone/I6K'
  },
  excludeStores: ['reverb']
});
fs.writeFileSync(pj, JSON.stringify(P, null, 2));
console.log('catalogo: alta 675 sE Electronics X1 R');

// ---------- 2. TEST_SHOP_BTN 675 (solo URLs verificadas, sin precios inventados) ----------
const bj = BASE + 'build-guides.js';
let src = fs.readFileSync(bj, 'utf8');
const ini = src.indexOf('const TEST_SHOP_BTN');
const abre = src.indexOf('{', ini);
let depth = 0, i = abre, modo = null, esc = false, cierra = -1;
for (; i < src.length; i++) {
  const c = src[i], n = src[i + 1];
  if (modo === 'linea') { if (c === '\n') modo = null; continue; }
  if (modo === 'bloque') { if (c === '*' && n === '/') { modo = null; i++; } continue; }
  if (modo) {
    if (esc) { esc = false; continue; }
    if (c === '\\') { esc = true; continue; }
    if (c === modo) modo = null;
    continue;
  }
  if (c === '/' && n === '/') { modo = 'linea'; i++; continue; }
  if (c === '/' && n === '*') { modo = 'bloque'; i++; continue; }
  if (c === '"' || c === "'" || c === '`') { modo = c; continue; }
  if (c === '{') depth++;
  else if (c === '}') { depth--; if (depth === 0) { cierra = i; break; } }
}
if (src.slice(abre, cierra + 1).includes('675: {')) die('TEST 675 ya existe');
const anchor = '  674: {';
const ai = src.indexOf(anchor, abre);
if (ai === -1 || ai > cierra) die('ancla 674 no encontrada');
const entry675 = '  675: {\n    prices: {\n    },\n    urls: {\n      musicstore: "https://www.musicstore.com/en_OE/EUR/sE-electronics-X1R-Ribbon-Microphone-/art-REC0009426-000",\n      gear4music: "https://www.gear4music.com/Recording-and-Computers/sE-Electronics-sE-X1R-Ribbon-Microphone/I6K"\n    }\n  },\n';
src = src.slice(0, ai) + entry675 + src.slice(ai);
fs.writeFileSync(bj, src);
try { new Function(fs.readFileSync(bj, 'utf8')); console.log('TEST 675 creado + build-guides.js OK'); }
catch (err) { die('ROTO: ' + err.message); }

// ---------- 3. GUIA best-microphone ----------
const gj = BASE + 'data/guides.json';
const guides = JSON.parse(fs.readFileSync(gj, 'utf8'));
const g = guides.find(x => x.id === 'best-microphone');

// 3a. Tabla: columna + valores
const ci = g.productTable.columns.findIndex(c => c.title === 'MXL R144');
if (ci === -1) die('columna MXL R144 no encontrada');
g.productTable.columns[ci] = { title: 'sE Electronics X1 R', title_es: 'sE Electronics X1 R' };
const cellVals = {
  'Best For': ['Taming sibilant harsh vocals', 'Domar voces ásperas y sibilantes'],
  'Estimated Price': ['~$149', '~$149'],
  'Frequency Response': ['20 Hz – 16 kHz', '20 Hz – 16 kHz']
};
g.productTable.rows.forEach(r => {
  if (r.values.length !== g.productTable.columns.length) die('fila desalineada: ' + r.label);
  const v = cellVals[r.label];
  if (v) r.values[ci] = { value: v[0], value_es: v[1]};
});
console.log('tabla: columna X1 R + BestFor/Precio/FR actualizados (Type/Pattern/XLR iguales)');

// 3b. Veredictos
const vi = g.verdictProsCons.findIndex(v => v && v.name === 'MXL R144');
if (vi === -1) die('veredicto MXL R144 no encontrado');
g.verdictProsCons[vi] = {
  name: 'sE Electronics X1 R', name_es: 'sE Electronics X1 R',
  pros: ['Naturally smooths harsh highs and sibilance — no EQ fight', 'Figure-8 proximity effect adds deep body and intimate warmth to thin voices', 'HF-extension tech keeps air and detail instead of muddy old-ribbon sound', '135dB SPL handling with phantom-protected all-metal build'],
  cons: ['Low 1.8 mV/Pa output wants a clean high-gain preamp or inline booster', 'Still darker than condensers — not the pick for modern airy pop', 'Figure-8 also hears the room behind you', 'Shockmount costs extra — only a swivel clip ships in the box'],
  pros_es: ['Suaviza agudos ásperos y sibilancia al natural, sin pelear con el EQ', 'El efecto de proximidad en ocho da cuerpo profundo y calidez íntima a voces delgadas', 'La extensión de agudos mantiene aire y detalle en vez del sonido lodoso de cintas viejas', '135dB SPL con chasis metálico protegido contra phantom'],
  cons_es: ['Sus 1,8 mV/Pa piden un previo limpio con ganancia o un booster en línea', 'Sigue más oscuro que un condensador: no es para pop moderno con aire', 'La figura-8 también escucha la sala detrás', 'El soporte cuesta aparte: solo trae pinza en la caja']
};
console.log('veredictos: X1 R 4+4 EN/ES');

// 3c. Seccion dedicada
const sec = g.sections.find(s => s && s.heading === 'MXL R144: Real Ribbon Warmth Without the Price of Admission');
if (!sec) die('seccion MXL R144 no encontrada');
sec.heading = 'sE Electronics X1 R: The Ribbon That Tames Sibilance';
sec.heading_es = 'sE Electronics X1 R: la cinta que doma la sibilancia';
sec.products = [675];
sec.content = '<p><strong>Sibilant voices don\'t need another bright condenser — they need a ribbon.</strong> The sE X1 R pairs a hand-crafted 2.5 µm aluminum ribbon with figure-8 pickup, covering 20 Hz to 16 kHz with 1.8 mV/Pa sensitivity and 135 dB SPL handling. The built-in HF-extension tech borrowed from the VR1/VR2 adds a gentle lift that keeps vocals airy instead of muddy, while the ribbon itself rounds off the harsh \'S\' and \'T\' sounds that budget condensers exaggerate. All-metal housing, phantom-protected, swivel clip in the box.</p><p><strong>Know the limits.</strong> As a passive ribbon its output runs low, so budget interfaces with weak preamps will want an inline booster like the sE Dynamite or a Cloudlifter. Figure-8 hears the room behind you too, and the shockmount costs extra. Around ~$149, it is the shortcut to silky vintage broadcast tone for sharp, thin voices.</p>';
sec.content_es = '<p><strong>Las voces sibilantes no necesitan otro condensador brillante: necesitan una cinta.</strong> El sE X1 R une cinta de aluminio de 2,5 µm con captación en figura-8, cubriendo 20 Hz a 16 kHz con 1,8 mV/Pa y 135 dB SPL. La extensión de agudos heredada de los VR1/VR2 suma un realce gentil que mantiene la voz con aire en vez de lodosa, mientras la cinta redondea las eses y tes ásperas que los condensadores baratos exageran. Chasis metálico, protegido contra phantom, pinza en la caja.</p><p><strong>Conviene saber los límites.</strong> Como cinta pasiva su salida es baja, así que interfaces económicas con previos flojos pedirán un booster como el sE Dynamite o un Cloudlifter. La figura-8 también escucha la sala detrás y el soporte cuesta aparte. Por ~$149, es el atajo al tono broadcast vintage y sedoso para voces afiladas y delgadas.</p>';
console.log('seccion dedicada reescrita EN+ES');

// 3d. Overview ribbon
const rib = g.sections.find(s => s && s.heading === 'Ribbon Microphones: Vintage Warmth for the Modern Studio');
if (!rib) die('overview ribbon no encontrado');
rib.products = [675];
const ribEn = 'the MXL R144 at $99 gives you 90% of the ribbon character at a fraction of the price.';
if (!rib.content.includes(ribEn)) die('texto overview ribbon EN no coincide');
rib.content = rib.content.split(ribEn).join('the sE X1 R at ~$149 gives you genuine ribbon smoothness for harsh voices at a fraction of the boutique price.');
const ribEs = 'el MXL R144 a $99 te da el 90% del carácter ribbon a una fracción del precio.';
if (!rib.content_es.includes(ribEs)) die('texto overview ribbon ES no coincide');
rib.content_es = rib.content_es.split(ribEs).join('el sE X1 R por ~$149 te da suavidad de cinta real para voces ásperas a una fracción del precio boutique.');

// 3e. featuredProducts
const fi = g.featuredProducts.indexOf(366);
if (fi === -1) die('366 no esta en featured');
g.featuredProducts[fi] = 675;

// 3f. Veredicto
const vEn = 'the MXL R144 smooths what condensers exaggerate';
if (!g.verdict.includes(vEn)) die('veredicto EN no coincide');
g.verdict = g.verdict.split(vEn).join('the sE X1 R smooths what condensers exaggerate');
const vEs = 'el MXL R144 suaviza lo que los condensadores exageran';
if (!g.verdict_es.includes(vEs)) die('veredicto ES no coincide');
g.verdict_es = g.verdict_es.split(vEs).join('el sE X1 R suaviza lo que los condensadores exageran');

// 3g. Conclusion
const cEn = 'The MXL R144 ribbon smooths harsh sources that condensers exaggerate.';
if (!g.conclusion.includes(cEn)) die('conclusion EN no coincide');
g.conclusion = g.conclusion.split(cEn).join('The sE X1 R ribbon smooths harsh sources that condensers exaggerate.');
const cEs = 'El ribbon MXL R144 suaviza las fuentes ásperas que los condensadores exageran.';
if (!g.conclusion_es.includes(cEs)) die('conclusion ES no coincide');
g.conclusion_es = g.conclusion_es.split(cEs).join('El ribbon sE X1 R suaviza las fuentes ásperas que los condensadores exageran.');

fs.writeFileSync(gj, JSON.stringify(guides, null, 2));

// ---------- VERIFICACION ----------
const all = JSON.stringify(g);
['MXL R144', 'R144'].forEach(w => {
  const n = (all.match(new RegExp(w, 'g')) || []).length;
  console.log('"' + w + '" restante: ' + n);
});
console.log('X1 R menciones: ' + ((all.match(/X1 R/g) || []).length));
console.log('paridad veredicto X1R:', g.verdictProsCons[vi].pros.length === 4 && g.verdictProsCons[vi].pros_es.length === 4 && g.verdictProsCons[vi].cons.length === 4 && g.verdictProsCons[vi].cons_es.length === 4);
const heads = g.sections.map(s => s.heading);
console.log('headings duplicados EN:', heads.filter((x, i, a) => a.indexOf(x) !== i).length);
