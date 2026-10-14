const fs = require('fs');
const BASE = 'C:/Users/Daniel/projects/topmusiciangear/';
const die = (m) => { console.log('!! ' + m); process.exit(1); };

// ---------- 1. CATALOGO 679 ----------
const pj = BASE + 'data/products.json';
const P = JSON.parse(fs.readFileSync(pj, 'utf8'));
const arr = Array.isArray(P) ? P : P.products;
if (arr.some(x => x.id === 679)) die('679 ya existe');
arr.push({
  id: 679, title: 'IK Multimedia AXE I/O', title_es: 'IK Multimedia AXE I/O', brand: 'IK Multimedia',
  category: 'interfaces', price: 399,
  desc: 'Guitar-first 2-in/5-out USB interface with triple-topology Hi-Z inputs (JFET/PURE/ACTIVE), Z-TONE impedance, onboard tuner and noiseless Amp Out. 2 mic pres with phantom, MIDI, 24-bit/192kHz, AmpliTube 5 SE + TONEX SE included.',
  desc_es: 'Interfaz USB 2-in/5-out pensada para guitarra con Hi-Z de triple topología (JFET/PURE/ACTIVE), impedancia Z-TONE, afinador a bordo y Amp Out sin ruido. 2 previos de micro con phantom, MIDI, 24 bits/192kHz, AmpliTube 5 SE + TONEX SE incluidos.',
  img: 'https://r2.gear4music.com/media/44/448466/1200/preview.jpg',
  image: 'https://r2.gear4music.com/media/44/448466/1200/preview.jpg',
  stores: { amazon: 'https://www.amazon.com/dp/B07MWZ9FMR' },
  excludeStores: ['reverb']
});
fs.writeFileSync(pj, JSON.stringify(P, null, 2));
console.log('catalogo: alta 679 AXE I/O (Amazon verificado, resto pendiente)');

// ---------- 2. TEST 679 ----------
const bj = BASE + 'build-guides.js';
let src = fs.readFileSync(bj, 'utf8');
const ini = src.indexOf('const TEST_SHOP_BTN');
const abre = src.indexOf('{', ini);
const anchor = '  678: {';
const ai = src.indexOf(anchor, abre);
if (ai === -1) die('ancla 678 no encontrada');
src = src.slice(0, ai) + '  679: {\n    prices: {\n    },\n    urls: {\n      amazon: "https://www.amazon.com/dp/B07MWZ9FMR"\n    }\n  },\n' + src.slice(ai);
fs.writeFileSync(bj, src);
try { new Function(fs.readFileSync(bj, 'utf8')); console.log('TEST 679 creado'); }
catch (err) { die('ROTO: ' + err.message); }

// ---------- 3. GUIA best-interface ----------
const gj = BASE + 'data/guides.json';
const guides = JSON.parse(fs.readFileSync(gj, 'utf8'));
const g = guides.find(x => x.id === 'best-interface');

// 3a. featured + review nueva
g.featuredProducts.push(679);
g.sections.push({
  heading: 'IK Multimedia AXE I/O: The Guitar Interface With a Tuner Onboard',
  heading_es: 'IK Multimedia AXE I/O: la interfaz de guitarra con afinador a bordo',
  products: [679],
  content: '<p><strong>The AXE I/O is the only interface here designed from the strings up.</strong> Two front Hi-Z inputs run triple-topology pres — PURE for transparency, JFET for tube-like warmth, ACTIVE for hot pickups — with Z-TONE impedance and a pickup selector shaping tone before a single plugin loads. Behind them: two combo mic/line inputs with phantom, 24-bit/192 kHz conversion at 117 dB, and a noiseless Amp Out for reamping without a DI box.</p><p><strong>Guitar workflow extras seal it.</strong> An onboard tuner with display keeps sessions in tune, the preset encoder browses AmpliTube patches from the desk, dual pedal/switch inputs take wah and volume, and MIDI I/O talks to keyboards and e-drums. AmpliTube 5 SE, TONEX SE and Ableton Live Lite ship in the box. Around ~$399, it is the home-recording pick the moment a guitar is involved — overkill if you only track vocals.</p>',
  content_es: '<p><strong>La AXE I/O es la única interfaz aquí diseñada desde las cuerdas.</strong> Dos entradas Hi-Z frontales corren previos de triple topología — PURE para transparencia, JFET para calidez de tubo, ACTIVE para pastillas calientes — con impedancia Z-TONE y selector de pastilla moldeando el tono antes de cargar un plugin. Detrás: dos combos micro/línea con phantom, conversión 24 bits/192 kHz a 117 dB y Amp Out sin ruido para reamp sin caja DI.</p><p><strong>Los extras de flujo guitarrero lo rematan.</strong> Un afinador a bordo con display mantiene las sesiones afinadas, el encoder de presets navega patches de AmpliTube desde la mesa, doble entrada de pedal/switch recibe wah y volumen, y el MIDI habla con teclados y baterías electrónicas. AmpliTube 5 SE, TONEX SE y Ableton Live Lite viajan en la caja. Por ~$399, es la elección casera en cuanto hay una guitarra de por medio — exceso si solo grabas voces.</p>'
});
console.log('review AXE I/O agregada');

// 3b. Tabla: 9na columna
const NCOL = g.productTable.columns.length;
if (NCOL !== 8) die('columnas inesperadas: ' + NCOL);
g.productTable.columns.push({ title: 'IK Multimedia AXE I/O', title_es: 'IK Multimedia AXE I/O' });
const col9 = {
  'Best For': ['Guitar & bass recording', 'Grabar guitarra y bajo'],
  'Estimated Price': ['~$399', '~$399'],
  'Type': ['Audio interface', 'Interfaz de audio'],
  'Inputs / Outputs': ['2-in / 5-out', '2-in / 5-out'],
  'Preamps': ['2 Hi-Z + 2 mic pres', '2 Hi-Z + 2 previos micro'],
  'Sample Rate': ['192 kHz', '192 kHz'],
  'Bit Depth': ['24-bit', '24-bit'],
  'Connectivity': ['USB 2.0', 'USB 2.0'],
  'Special Features': ['Onboard tuner, Z-TONE, Amp Out, MIDI', 'Afinador a bordo, Z-TONE, Amp Out, MIDI']
};
g.productTable.rows.forEach(r => {
  const v = col9[r.label];
  if (!v) die('sin valores AXE para: ' + r.label);
  if (r.values.length !== NCOL) die('fila desalineada: ' + r.label);
  r.values.push({ value: v[0], value_es: v[1] });
});
console.log('tabla: 9 columnas');

// 3c. Veredicto
g.verdictProsCons.push({
  name: 'IK Multimedia AXE I/O', name_es: 'IK Multimedia AXE I/O',
  pros: ['Guitar-first design: 2 Hi-Z inputs with JFET/PURE/ACTIVE topologies', 'Onboard tuner + Z-TONE impedance shape tone before plugins', 'Dedicated Amp Out for noiseless reamping, no DI box needed', 'AmpliTube 5 SE + TONEX SE + Ableton Live Lite in the box'],
  cons: ['2-in/5-out limits full-band recording', 'USB 2.0 Type-B in a USB-C world', 'Guitar focus wastes features if you only record vocals', 'Preset encoder tied to the AmpliTube workflow'],
  pros_es: ['Diseño guitarrero: 2 Hi-Z con topologías JFET/PURE/ACTIVE', 'Afinador a bordo + impedancia Z-TONE moldean antes de plugins', 'Amp Out dedicado para reamp sin ruido, sin caja DI', 'AmpliTube 5 SE + TONEX SE + Ableton Live Lite en la caja'],
  cons_es: ['Su 2-in/5-out limita grabar bandas completas', 'USB 2.0 tipo B en un mundo USB-C', 'El enfoque guitarra sobra si solo grabas voces', 'El encoder de presets ata al flujo AmpliTube']
});
console.log('veredicto AXE 4+4');

// 3d. Conclusion: clausula guitarra
const cEn = 'Start with a Focusrite Scarlett 2i2 or Audient iD14 for general home recording.';
if (!g.conclusion.includes(cEn)) die('conclusion EN no coincide');
g.conclusion = g.conclusion.split(cEn).join(cEn + ' If you record guitar or bass, start with the AXE I/O — tuner, reamp out and amp software included.');
const cEs = g.conclusion_es;
const cEsAnchor = 'Empieza con';
if (!cEs.includes(cEsAnchor)) die('conclusion ES sin ancla');
g.conclusion_es = cEs + ' Si grabas guitarra o bajo, empieza con la AXE I/O: afinador, salida de reamp y software de amplis incluidos.';
fs.writeFileSync(gj, JSON.stringify(guides, null, 2));

// ---------- VERIFICACION ----------
const all = JSON.stringify(g);
console.log('AXE menciones:', (all.match(/AXE I\/O/g) || []).length);
console.log('columnas:', g.productTable.columns.length);
console.log('filas desalineadas:', g.productTable.rows.filter(r => r.values.length !== 9).length);
console.log('veredictos:', g.verdictProsCons.length);
const heads = g.sections.map(s => s.heading);
console.log('headings duplicados:', heads.filter((x, i, a) => a.indexOf(x) !== i).length);
console.log('paridad veredictos:', g.verdictProsCons.every(v => v.pros.length === v.pros_es.length && v.cons.length === v.cons_es.length && v.pros.length >= 4 && v.cons.length >= 4));
