const fs = require('fs');
const BASE = 'C:/Users/Daniel/projects/topmusiciangear/';
const die = (m) => { console.log('!! ' + m); process.exit(1); };

// ---------- 1. CATALOGO 676 + 677 ----------
const pj = BASE + 'data/products.json';
const P = JSON.parse(fs.readFileSync(pj, 'utf8'));
const arr = Array.isArray(P) ? P : P.products;
if (arr.some(x => x.id === 676 || x.id === 677)) die('676/677 ya existen');
arr.push({
  id: 676, title: 'Audient Horizon 8P', title_es: 'Audient Horizon 8P', brand: 'Audient',
  category: 'interfaces', price: 2199, badge: 'flagship',
  desc: 'Flagship 24x32 Thunderbolt 3 interface with 8 discrete console pres (75dB, Smartgain, ORBIT impedance), ESS 32-bit/192kHz conversion at 133dB and 0.99ms native tracking. DB25, ADAT, dual speakers; macOS only.',
  desc_es: 'Insignia 24x32 Thunderbolt 3 con 8 previos discretos de consola (75dB, Smartgain, impedancia ORBIT), conversión ESS 32 bits/192kHz a 133dB y tracking nativo a 0,99ms. DB25, ADAT, doble monitor; solo macOS.',
  img: 'https://audient.com/wp-content/uploads/2026/08/horizon8p-angled.jpg',
  image: 'https://audient.com/wp-content/uploads/2026/08/horizon8p-angled.jpg',
  stores: {}, excludeStores: []
});
arr.push({
  id: 677, title: 'Antelope Orion Studio Synergy Core', title_es: 'Antelope Orion Studio Synergy Core', brand: 'Antelope Audio',
  category: 'interfaces', price: 2895, badge: 'flagship',
  desc: '1U 30x44 Thunderbolt/USB interface with 12 discrete 75dB pres and 6DSP+2FPGA running 50 FX at near-zero latency. AFC clocking, 130dB conversion, room correction, dual-host backup recording.',
  desc_es: 'Interfaz 1U 30x44 Thunderbolt/USB con 12 previos discretos de 75dB y 6DSP+2FPGA con 50 efectos en latencia casi cero. Reloj AFC, conversión 130dB, room correction, doble host de respaldo.',
  img: 'https://en.antelopeaudio.com/wp-content/uploads/2026/06/Orion_Studio_SC_Front-1_new_logo.png',
  image: 'https://en.antelopeaudio.com/wp-content/uploads/2026/06/Orion_Studio_SC_Front-1_new_logo.png',
  stores: {}, excludeStores: []
});
fs.writeFileSync(pj, JSON.stringify(P, null, 2));
console.log('catalogo: alta 676 Horizon 8P + 677 Orion Studio SC (sin tiendas: pedir links)');

// ---------- 2. TEST 676/677 vacios ----------
const bj = BASE + 'build-guides.js';
let src = fs.readFileSync(bj, 'utf8');
const ini = src.indexOf('const TEST_SHOP_BTN');
const abre = src.indexOf('{', ini);
const anchor = '  675: {';
const ai = src.indexOf(anchor, abre);
if (ai === -1) die('ancla 675 no encontrada');
src = src.slice(0, ai) + '  676: {\n    prices: {\n    },\n    urls: {\n    }\n  },\n  677: {\n    prices: {\n    },\n    urls: {\n    }\n  },\n' + src.slice(ai);
fs.writeFileSync(bj, src);
try { new Function(fs.readFileSync(bj, 'utf8')); console.log('TEST 676/677 creados'); }
catch (err) { die('ROTO: ' + err.message); }

// ---------- 3. GUIA ----------
const gj = BASE + 'data/guides.json';
const guides = JSON.parse(fs.readFileSync(gj, 'utf8'));
const g = guides.find(x => x.id === 'premium-interfaces');

// 3a. featured
g.featuredProducts = [512, 515, 513, 183, 676, 677];
console.log('featured: 6 finales');

// 3b. Overviews: headings + repurpose 5/6
const setH = (i, en, es) => {
  const s = g.sections[i];
  if (!s) die('seccion ' + i + ' no existe');
  s.heading = en; s.heading_es = es;
};
setH(0, 'What Flagship Money Actually Buys', 'Lo que el dinero insignia compra de verdad');
setH(1, 'Neumann MT 48: The Desktop That Speaks Dante', 'Neumann MT 48: el sobremesa que habla Dante');
setH(2, 'Audient ORIA: Atmos Without a Second Box', 'Audient ORIA: Atmos sin segunda caja');
setH(3, 'Apollo x8p Gen 2: The UAD Tracking Room', 'Apollo x8p Gen 2: la sala de tracking UAD');
setH(4, 'RME Fireface UFX III: The Uptime Guarantee', 'RME Fireface UFX III: la garantía de no fallar');
const s5 = g.sections[5];
s5.heading = 'Audient Horizon 8P: Console Pres, ORBIT Brains';
s5.heading_es = 'Audient Horizon 8P: previos de consola, cerebro ORBIT';
s5.products = [676];
s5.content = '<p><strong>The Audient Horizon 8P is the console-front-end pick.</strong> Eight discrete console pres with 75 dB gain, Smartgain and digital recall, plus relay-based ORBIT variable impedance that re-voices dynamics and ribbons before conversion. Around them: 24x32 Thunderbolt 3 I/O, ESS 32-bit/192 kHz conversion with 133 dB dynamic range, 0.99 ms round-trip for native plugin tracking, DB25 line I/O, dual speaker outs and ADAT — all in 1U. macOS only.</p>';
s5.content_es = '<p><strong>La Audient Horizon 8P es la elección con frontal de consola.</strong> Ocho previos discretos de consola con 75 dB, Smartgain y recall digital, más impedancia variable ORBIT por relés que re-vocea dinámicos y cintas antes de convertir. Alrededor: E/S 24x32 Thunderbolt 3, conversión ESS 32 bits/192 kHz con 133 dB, 0,99 ms ida y vuelta para tracking con plugins nativos, DB25, doble monitor y ADAT — todo en 1U. Solo macOS.</p>';
const s6 = g.sections[6];
s6.heading = 'Antelope Orion Studio: 12 Pres and 50 FX in 1U';
s6.heading_es = 'Antelope Orion Studio: 12 previos y 50 efectos en 1U';
s6.products = [677];
s6.content = '<p><strong>The Antelope Orion Studio Synergy Core is the connectivity-per-pound pick.</strong> Twelve discrete 75 dB pres, 30x44 I/O on Thunderbolt 3 plus USB with dual-host backup recording, and 50 Synergy Core FX running on 6 DSP + 2 FPGA chips at near-zero latency. AFC clocking, 130 dB conversion, room correction and Atmos monitoring support — all in 1U.</p>';
s6.content_es = '<p><strong>El Antelope Orion Studio Synergy Core es el rey de conectividad por libra.</strong> Doce previos discretos de 75 dB, E/S 30x44 por Thunderbolt 3 más USB con grabación de respaldo en doble host, y 50 efectos Synergy Core en 6 DSP + 2 FPGA con latencia casi cero. Reloj AFC, conversión 130 dB, room correction y soporte Atmos — todo en 1U.</p>';
console.log('overviews: 7 headings unicos');

// 3c. Reviews: renombrar keepers + reemplazar salientes
const setR = (i, en, es, prod, content, content_es) => {
  const s = g.sections[i];
  if (!s) die('review ' + i + ' no existe');
  s.heading = en; s.heading_es = es;
  if (prod) s.products = prod;
  if (content) { s.content = content; s.content_es = content_es; }
};
setR(7, 'Neumann MT 48: Touchscreen Control Meets Network Audio', 'Neumann MT 48: control táctil con audio en red');
setR(8, 'Audient ORIA: Built for 9.1.6 From Day One', 'Audient ORIA: hecha para 9.1.6 desde el día uno');
setR(9, 'Apollo x8p Gen 2: Tracking Through UAD Colour', 'Apollo x8p Gen 2: grabar con el color UAD');
setR(10, 'RME Fireface UFX III: Drivers You Keep for a Decade', 'RME Fireface UFX III: drivers para una década');
setR(11, 'Audient Horizon 8P: Analogue Character, Native Speed', 'Audient Horizon 8P: carácter analógico, velocidad nativa', [676],
  '<p><strong>Eight real console pres with hardware impedance control — no DSP tax.</strong> The Horizon 8P packs David Dearden-designed discrete pres with 75 dB gain, Smartgain and digital recall, plus relay-based ORBIT impedance (High/Mid/Low) that re-voices dynamics and ribbons before conversion. Around them: 24x32 Thunderbolt 3 I/O, ESS 32-bit/192 kHz conversion with 133 dB dynamic range, 0.99 ms round-trip for native plugin tracking, DB25 line I/O, dual speaker outs and ADAT — in 1U.</p><p><strong>Know the limits.</strong> macOS only at launch, Thunderbolt only with no USB fallback, and no onboard DSP — heavy native chains need a fast Mac. Around £2,115–£2,199, it is the tracking front-end for studios that want console character without a closed ecosystem.</p>',
  '<p><strong>Ocho previos reales de consola con impedancia en hardware, sin impuesto DSP.</strong> La Horizon 8P monta previos discretos de David Dearden con 75 dB, Smartgain y recall digital, más impedancia ORBIT por relés (High/Mid/Low) que re-vocea dinámicos y cintas antes de convertir. Alrededor: E/S 24x32 Thunderbolt 3, conversión ESS 32 bits/192 kHz con 133 dB, 0,99 ms para tracking con plugins nativos, DB25, doble monitor y ADAT — en 1U.</p><p><strong>Conviene saber los límites.</strong> Solo macOS de lanzamiento, solo Thunderbolt sin vía USB y sin DSP a bordo: las cadenas nativas pesadas piden un Mac rápido. Por £2.115–£2.199, es el frontal de tracking para estudios que quieren carácter de consola sin ecosistema cerrado.</p>');
setR(12, 'Antelope Orion Studio: The 1U Hybrid Hub', 'Antelope Orion Studio: el hub híbrido en 1U', [677],
  '<p><strong>Twelve pres and fifty FX in one rack unit.</strong> The Orion Studio Synergy Core combines 12 discrete ultra-linear pres with 75 dB gain, 30x44 I/O over Thunderbolt 3 plus USB with dual-host backup recording, and a 6xDSP + 2xFPGA platform running 50 analog-modeled FX at near-zero latency. AFC clocking, 130 dB conversion, room correction and Atmos monitoring support make it the hybrid-studio hub.</p><p><strong>Know the limits.</strong> 24-bit/192 kHz maximum with no 32-bit float path, immersive monitoring needs a separate MRC license, and the box demands online activation before it works. Around ~£2,039, it is the connectivity-per-pound pick for bands and hybrid rooms.</p>',
  '<p><strong>Doce previos y cincuenta efectos en una unidad de rack.</strong> El Orion Studio Synergy Core combina 12 previos discretos ultralineales de 75 dB, E/S 30x44 por Thunderbolt 3 más USB con respaldo en doble host, y plataforma 6xDSP + 2xFPGA con 50 efectos analógicos en latencia casi cero. Reloj AFC, conversión 130 dB, room correction y soporte Atmos lo vuelven el hub del estudio híbrido.</p><p><strong>Conviene saber los límites.</strong> Máximo 24 bits/192 kHz sin vía de 32 flotantes, el monitoreo inmersivo pide licencia MRC aparte y la caja exige activación online antes de funcionar. Por ~£2.039, es el rey de conectividad por libra para bandas y salas híbridas.</p>');
console.log('reviews: 4 renombradas + 2 nuevas');

// 3d. Tabla: 7 -> 6 columnas
const keepCols = {};
g.productTable.columns.forEach((c, i) => { keepCols[c.title] = i; });
['Neumann MT 48 (U)', 'Audient ORIA', 'Universal Audio Apollo x8p Gen 2', 'RME Fireface UFX III'].forEach(t => {
  if (keepCols[t] === undefined) die('columna keeper no encontrada: ' + t);
});
const order = [
  { t: 'Neumann MT 48 (U)', keep: true }, { t: 'Audient ORIA', keep: true },
  { t: 'Universal Audio Apollo x8p Gen 2', keep: true }, { t: 'RME Fireface UFX III', keep: true },
  { t: 'Audient Horizon 8P', keep: false }, { t: 'Antelope Orion Studio Synergy Core', keep: false }
];
const newVals = {
  'Audient Horizon 8P': {
    'Best For': ['Console-pres tracking, no DSP lock-in', 'Tracking con previos de consola sin DSP cerrado'],
    'Estimated Price': ['£2,115–£2,199', '£2,115–£2,199'],
    'Form Factor': ['1U rack, 24x32 TB3', '1U rack, 24x32 TB3'],
    'Connectivity': ['Thunderbolt 3, ADAT, DB25, WC', 'Thunderbolt 3, ADAT, DB25, WC'],
    'Conversion / Clock': ['32-bit/192kHz ESS, 133dB', '32-bit/192kHz ESS, 133dB'],
    'Preamp Character': ['8x console, 75dB, ORBIT impedance', '8x consola, 75dB, impedancia ORBIT'],
    'Monitoring / Extras': ['Dual speakers, 4 cue mixes', 'Doble monitor, 4 mezclas cue'] },
  'Antelope Orion Studio Synergy Core': {
    'Best For': ['DSP tracking with 12 pres in 1U', 'Tracking con DSP y 12 previos en 1U'],
    'Estimated Price': ['~£2,039', '~£2,039'],
    'Form Factor': ['1U rack, 30x44', '1U rack, 30x44'],
    'Connectivity': ['Thunderbolt 3 + USB, ADAT, DB25', 'Thunderbolt 3 + USB, ADAT, DB25'],
    'Conversion / Clock': ['130dB, AFC clock', '130dB, reloj AFC'],
    'Preamp Character': ['12x discrete, 75dB', '12x discretos, 75dB'],
    'Monitoring / Extras': ['50 FX, room correction', '50 efectos, room correction'] }
};
g.productTable.columns = order.map(o => ({ title: o.t, title_es: o.t }));
g.productTable.rows = g.productTable.rows.map(r => {
  const values = order.map(o => {
    if (o.keep) return r.values[keepCols[o.t]];
    const v = (newVals[o.t] || {})[r.label];
    if (!v) die('sin valores ' + o.t + ' / ' + r.label);
    return { value: v[0], value_es: v[1] };
  });
  return { label: r.label, label_es: r.label_es, values };
});
console.log('tabla: 6 columnas en tu orden');

// 3e. Veredictos: 7 -> 6
const keepV = {};
g.verdictProsCons.forEach(v => { keepV[v.name] = v; });
['Neumann MT 48 (U)', 'Universal Audio Apollo x8p Gen 2', 'RME Fireface UFX III', 'Audient ORIA Immersive Audio Interface'].forEach(n => {
  if (!keepV[n]) die('veredicto keeper no encontrado: ' + n);
});
const mkV = (name, pros, cons, pros_es, cons_es) => ({ name, name_es: name, pros, cons, pros_es, cons_es });
g.verdictProsCons = [
  keepV['Neumann MT 48 (U)'],
  mkV('Audient ORIA Immersive Audio Interface', keepV['Audient ORIA Immersive Audio Interface'].pros, keepV['Audient ORIA Immersive Audio Interface'].cons, keepV['Audient ORIA Immersive Audio Interface'].pros_es, keepV['Audient ORIA Immersive Audio Interface'].cons_es),
  keepV['Universal Audio Apollo x8p Gen 2'],
  keepV['RME Fireface UFX III'],
  mkV('Audient Horizon 8P',
    ['Eight discrete console pres with 75dB, Smartgain and recall', 'ORBIT hardware impedance re-voices dynamics and ribbons pre-converter', '0.99ms native tracking with no closed DSP ecosystem', 'ESS 32-bit 133dB conversion with DB25 outboard integration'],
    ['macOS only at launch — no Windows driver', 'Thunderbolt only, no USB fallback', 'No onboard DSP — heavy chains need a fast Mac', '~£2,199 flagship price'],
    ['Ocho previos discretos de consola con 75dB, Smartgain y recall', 'La impedancia ORBIT en hardware re-vocea dinámicos y cintas antes del conversor', 'Tracking nativo a 0,99ms sin ecosistema DSP cerrado', 'Conversión ESS 32 bits 133dB con integración outboard por DB25'],
    ['Solo macOS de lanzamiento, sin driver Windows', 'Solo Thunderbolt, sin vía USB', 'Sin DSP a bordo: cadenas pesadas piden un Mac rápido', 'Precio insignia ~£2.199']),
  mkV('Antelope Orion Studio Synergy Core',
    ['Twelve discrete 75dB pres — most in this guide', '6 DSP + 2 FPGA run 50 FX at near-zero latency', '130dB AFC conversion with room correction onboard', 'Thunderbolt + USB dual-host backup recording'],
    ['24-bit/192kHz max — no 32-bit float path', 'Immersive monitoring needs a separate MRC license', 'Mandatory online activation before it works', '~£2,039 for the full DSP platform'],
    ['Doce previos discretos de 75dB: más que nadie aquí', '6 DSP + 2 FPGA con 50 efectos en latencia casi cero', 'Conversión AFC 130dB con room correction a bordo', 'Doble host Thunderbolt + USB con grabación de respaldo'],
    ['Máximo 24 bits/192kHz, sin vía de 32 bits flotantes', 'El monitoreo inmersivo pide licencia MRC aparte', 'Activación online obligatoria antes de funcionar', '~£2.039 por la plataforma DSP completa'])
];
console.log('veredictos: 6 (4 keepers + 2 nuevos 4+4)');

// 3f. Veredicto general
g.verdict = 'Need UAD colour while tracking? Apollo x8p Gen 2. Need a desk controller that also does network audio? Neumann MT 48. Need Atmos without a separate monitor controller? Audient ORIA. Need MADI and DURec that never misses? RME UFX III. Need console pres with hardware impedance and native-speed tracking? Audient Horizon 8P. Need twelve pres and fifty DSP FX in one rack unit? Orion Studio Synergy Core. For most pro rooms, the sane split is UAD or Audient for the tracking core and RME, Antelope or Neumann for routing, FX and monitoring — match the job, not the logo.';
g.verdict_es = '¿Buscas el color UAD al grabar? Apollo x8p Gen 2. ¿Necesitas un controlador de sobremesa con audio en red? Neumann MT 48. ¿Quieres Atmos sin otro controlador? Audient ORIA. ¿Dependes de MADI y DURec que no puede fallar? RME UFX III. ¿Previos de consola con impedancia en hardware y tracking nativo veloz? Audient Horizon 8P. ¿Doce previos y cincuenta efectos DSP en 1U? Orion Studio Synergy Core. En la mayoría de salas pro, lo sensato es UAD o Audient para el núcleo de tracking y RME, Antelope o Neumann para ruteo, efectos y monitoreo: elige según el trabajo, no según el logo.';

// 3g. Conclusion
const cEn1 = 'Apogee Symphony I/O Mk II wins the modular studio that grows 16→32. Lynx Aurora-n 16 wins mastering and critical printing where transparency is the whole point.';
if (!g.conclusion.includes(cEn1)) die('conclusion EN p1 no coincide');
g.conclusion = g.conclusion.split(cEn1).join('Audient Horizon 8P wins console-character tracking without a DSP ecosystem. Orion Studio Synergy Core wins connectivity-per-pound with twelve pres and fifty onboard FX.');
const cEn2 = 'Module growth? Apogee. Pure conversion? Lynx.';
if (!g.conclusion.includes(cEn2)) die('conclusion EN p2 no coincide');
g.conclusion = g.conclusion.split(cEn2).join('Console pres with hardware voicing? Horizon. Everything in 1U? Orion.');
const cEs1 = 'La Apogee Symphony I/O Mk II encaja en el estudio modular que crece de 16 a 32 canales. Y la Lynx Aurora-n 16 es la referencia cuando prima la transparencia más absoluta para mastering.';
if (!g.conclusion_es.includes(cEs1)) die('conclusion ES p1 no coincide');
g.conclusion_es = g.conclusion_es.split(cEs1).join('La Audient Horizon 8P gana el tracking con carácter de consola sin ecosistema DSP. El Orion Studio Synergy Core gana en conectividad por libra con doce previos y cincuenta efectos a bordo.');
const cEs2 = '¿Crecimiento por módulos? Apogee. ¿Conversión pura? Lynx.';
if (!g.conclusion_es.includes(cEs2)) die('conclusion ES p2 no coincide');
g.conclusion_es = g.conclusion_es.split(cEs2).join('¿Previos de consola con voz en hardware? Horizon. ¿Todo en 1U? Orion.');

// 3h. Intro
const iEn = 'and the rack trio — RME Fireface UFX III, Apogee Symphony I/O Mk II 16×16 SE and Lynx Aurora-n 16 — cover touring rigs, modular HD/Dante installs and mastering-grade transparency.';
if (!g.intro.includes(iEn)) die('intro EN no coincide');
g.intro = g.intro.split(iEn).join('and the rack ranks — RME Fireface UFX III, Audient Horizon 8P and Orion Studio Synergy Core — cover touring uptime, console-character tracking and DSP hybrid power.');
const iEs = 'y el trío de rack — RME Fireface UFX III, Apogee Symphony I/O Mk II 16×16 SE y Lynx Aurora-n 16 — resuelve directo para giras, estudios con HD/Dante modular y conversión transparente de mastering.';
if (!g.intro_es.includes(iEs)) die('intro ES no coincide');
g.intro_es = g.intro_es.split(iEs).join('y las filas de rack — RME Fireface UFX III, Audient Horizon 8P y Orion Studio Synergy Core — cubren giras sin fallos, tracking con carácter de consola y potencia híbrida con DSP.');

fs.writeFileSync(gj, JSON.stringify(guides, null, 2));

// ---------- VERIFICACION ----------
const all = JSON.stringify(g);
['Apogee Symphony', 'Lynx Aurora', 'Galaxy 32', 'A Closer Look', 'análisis detallado'].forEach(w => {
  console.log('"' + w + '" restante: ' + ((all.match(new RegExp(w.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'g')) || []).length));
});
console.log('Horizon menciones:', (all.match(/Horizon/g) || []).length);
console.log('Orion Studio menciones:', (all.match(/Orion Studio/g) || []).length);
const heads = g.sections.map(s => s.heading);
console.log('headings nulos:', heads.filter(x => !x).length, '| duplicados:', heads.filter((x, i, a) => a.indexOf(x) !== i).length);
console.log('columnas:', g.productTable.columns.length, '| veredictos:', g.verdictProsCons.length, '| featured:', g.featuredProducts.length);
console.log('filas desalineadas:', g.productTable.rows.filter(r => r.values.length !== 6).length);
console.log('paridad veredictos:', g.verdictProsCons.every(v => v.pros.length === v.pros_es.length && v.cons.length === v.cons_es.length && v.pros.length >= 4 && v.cons.length >= 4));
