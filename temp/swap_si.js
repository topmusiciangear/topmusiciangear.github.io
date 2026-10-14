const fs = require('fs');
const BASE = 'C:/Users/Daniel/projects/topmusiciangear/';
const die = (m) => { console.log('!! ' + m); process.exit(1); };

// ---------- 1. CATALOGO 678 ----------
const pj = BASE + 'data/products.json';
const P = JSON.parse(fs.readFileSync(pj, 'utf8'));
const arr = Array.isArray(P) ? P : P.products;
if (arr.some(x => x.id === 678)) die('678 ya existe');
arr.push({
  id: 678, title: 'Yamaha URX44V', title_es: 'Yamaha URX44V', brand: 'Yamaha',
  category: 'interfaces', price: 699, badge: 'streaming',
  desc: '6x4 USB-C streaming interface with 4 URX pres (78dB), HDMI 4K/60 capture and passthrough, microSD 16-track recording and DSP FX on a 4.3-inch touchscreen. Dual USB MAIN/SUB, Cubase AI included.',
  desc_es: 'Interfaz de streaming 6x4 USB-C con 4 previos URX (78dB), captura y passthrough HDMI 4K/60, grabación microSD de 16 pistas y DSP en táctil de 4,3 pulgadas. USB dual MAIN/SUB, Cubase AI incluido.',
  img: 'https://r2.gear4music.com/media/132/1326215/1200/preview.jpg',
  image: 'https://r2.gear4music.com/media/132/1326215/1200/preview.jpg',
  stores: { musicstore: 'https://www.musicstore.com/en_OE/EUR/Yamaha-URX44V-Black/art-PCM0018734-000' },
  excludeStores: ['reverb']
});
fs.writeFileSync(pj, JSON.stringify(P, null, 2));
console.log('catalogo: alta 678 Yamaha URX44V (MS €645, resto links pendientes)');

// ---------- 2. TEST 678 ----------
const bj = BASE + 'build-guides.js';
let src = fs.readFileSync(bj, 'utf8');
const ini = src.indexOf('const TEST_SHOP_BTN');
const abre = src.indexOf('{', ini);
const anchor = '  677: {';
const ai = src.indexOf(anchor, abre);
if (ai === -1) die('ancla 677 no encontrada');
src = src.slice(0, ai) + '  678: {\n    prices: {\n      musicstore: "€645.00"\n    },\n    urls: {\n      musicstore: "https://www.musicstore.com/en_OE/EUR/Yamaha-URX44V-Black/art-PCM0018734-000"\n    }\n  },\n' + src.slice(ai);
fs.writeFileSync(bj, src);
try { new Function(fs.readFileSync(bj, 'utf8')); console.log('TEST 678 creado'); }
catch (err) { die('ROTO: ' + err.message); }

// ---------- 3. GUIA streaming-interfaces ----------
const gj = BASE + 'data/guides.json';
const guides = JSON.parse(fs.readFileSync(gj, 'utf8'));
const g = guides.find(x => x.id === 'streaming-interfaces');

// 3a. featured + SEC0 products
const fi = g.featuredProducts.indexOf(665);
if (fi === -1) die('665 no esta en featured');
g.featuredProducts[fi] = 678;
const s0 = g.sections[0];
const pi = s0.products.indexOf(665);
if (pi === -1) die('665 no esta en SEC0');
s0.products[pi] = 678;

// 3b. SEC4 -> URX44V
const sec = g.sections[4];
if (JSON.stringify(sec.products) !== '[665]') die('SEC4 no es Vocaster');
sec.heading = 'Is the Yamaha URX44V the Best Streaming Hub With HDMI?';
sec.heading_es = '¿Es la Yamaha URX44V el mejor hub de streaming con HDMI?';
sec.products = [678];
sec.content = '<p><strong>The Yamaha URX44V is the streamer that outgrew the two-channel box.</strong> Four URX pres with 78 dB gain and phantom take SM7Bs and condensers without boosters, while HDMI IN/THRU captures and passes 4K/60 video from a camera or console. A 4.3-inch touchscreen with five knobs runs DSP mixing and FX (gate, compressor, EQ, reverb, amp sim, voice changer) plus Auto Gain, Clip Safe and Scene Recall — with dual USB MAIN/SUB feeding the PC and a second device at once.</p><p><strong>The backup story seals it.</strong> microSD records 16 tracks while you stream, dual headphone outs and headset/AUX inputs cover guests and calls, and Stream Deck/OBS integration plus Cubase AI in the box mean working from day one. Around ~$699 it costs more than a solo podcaster box — but it replaces an interface, a capture card and a recorder.</p>';
sec.content_es = '<p><strong>La Yamaha URX44V es el streamer que superó la caja de dos canales.</strong> Cuatro previos URX con 78 dB y phantom mueven SM7Bs y condensadores sin boosters, mientras HDMI IN/THRU captura y pasa vídeo 4K/60 de cámara o consola. Una táctil de 4,3 pulgadas con cinco knobs corre mezcla DSP y efectos (puerta, compresor, EQ, reverb, amp sim, voice changer) más Auto Gain, Clip Safe y Scene Recall — con USB dual MAIN/SUB alimentando el PC y un segundo equipo a la vez.</p><p><strong>El respaldo lo remata.</strong> La microSD graba 16 pistas mientras emites, doble salida de auriculares y entradas headset/AUX cubren invitados y llamadas, e integración Stream Deck/OBS más Cubase AI en la caja rinden desde el día uno. Por ~$699 cuesta más que una caja de podcast en solitario, pero sustituye interfaz, capturadora y grabadora.</p>';
console.log('seccion URX44V escrita EN+ES');

// 3c. Tabla: col7 + reconstruir 3 filas corruptas
const ci = g.productTable.columns.findIndex(c => c.title === 'Focusrite Vocaster One');
if (ci !== 6) die('columna Vocaster no es la 7 (es ' + ci + ')');
g.productTable.columns[ci] = { title: 'Yamaha URX44V', title_es: 'Yamaha URX44V' };
const setRow = (label, vals) => {
  const r = g.productTable.rows.find(x => x.label === label);
  if (!r) die('fila no encontrada: ' + label);
  if (r.values.length !== 6 && r.values.length !== 7) die('fila ' + label + ' con ' + r.values.length + ' valores');
  const keep = r.values.slice(0, 4);
  r.values = [...keep, ...vals.map(v => ({ value: v[0], value_es: v[1] }))];
};
setRow('Mic Inputs', [
  ['4 XLR (70dB) + TRRS phone in', '4 XLR (70dB) + entrada TRRS'],
  ['2 XLR combo preamps', '2 previos combo XLR'],
  ['4 URX pres, 78dB + headset/AUX', '4 previos URX 78dB + headset/AUX']
]);
setRow('Power', [
  ['2xAA or USB-C powered', '2xAA o por USB-C'],
  ['USB bus-powered', 'Por USB'],
  ['Included power adapter', 'Adaptador incluido']
]);
setRow('Key Extras', [
  ['4 HP outs, microSD, sound pads, AI NR', '4 salidas HP, microSD, pads, NR IA'],
  ['Air mode, Clip Safe, loopback', 'Modo Air, Clip Safe, loopback'],
  ['HDMI 4K capture, microSD 16-track, DSP FX', 'HDMI 4K, microSD 16 pistas, DSP']
]);
// resto de filas: solo celda 7
const cell7 = {
  'Best For': ['Streamers wanting HDMI + multitrack', 'Streamers con HDMI y multipista'],
  'Estimated Price': ['~$699', '~$699'],
  'Type': ['USB-C interface with HDMI capture', 'Interfaz USB-C con captura HDMI'],
  'Video Capture': ['Yes — HDMI 4K/60', 'Sí — HDMI 4K/60']
};
Object.keys(cell7).forEach(label => {
  const r = g.productTable.rows.find(x => x.label === label);
  if (!r) die('fila no encontrada: ' + label);
  if (r.values.length !== 7) die('fila ' + label + ' con ' + r.values.length + ' valores (esperaba 7)');
  r.values[6] = { value: cell7[label][0], value_es: cell7[label][1] };
});
console.log('tabla: col7 URX44V + 3 filas reconstruidas (7/7)');

// 3d. Veredicto: reemplazar Vocaster
const vi = g.verdictProsCons.findIndex(v => v && v.name === 'Focusrite Vocaster One');
if (vi === -1) die('veredicto Vocaster no encontrado');
g.verdictProsCons[vi] = {
  name: 'Yamaha URX44V', name_es: 'Yamaha URX44V',
  pros: ['Four URX pres with 78dB — drives SM7B with room to spare', 'HDMI IN/THRU with 4K/60 capture and passthrough', 'microSD records 16 tracks while you stream', 'DSP FX + Auto Gain/Clip Safe/Scene Recall on a 4.3-inch touchscreen'],
  cons: ['~$699 costs far more than solo podcaster boxes', 'No sound pads for live jingles and intros', 'HDMI adds setup complexity vs plain USB interfaces', 'Overkill if you only ever record one microphone'],
  pros_es: ['Cuatro previos URX de 78dB: mueven un SM7B con margen', 'HDMI IN/THRU con captura y passthrough 4K/60', 'La microSD graba 16 pistas mientras emites', 'DSP + Auto Gain/Clip Safe/Scene Recall en táctil de 4,3 pulgadas'],
  cons_es: ['~$699 cuesta mucho más que cajas de podcast en solitario', 'Sin pads para jingles e intros en directo', 'El HDMI añade complejidad frente a USB simple', 'Exceso si solo grabas un micrófono']
};
console.log('veredicto URX44V 4+4');

// 3e. Veredicto general + conclusion + FAQ A1
g.verdict += ' The Yamaha URX44V is the pick when your stream needs HDMI capture and multitrack backup.';
g.verdict_es += ' La Yamaha URX44V es la opción cuando tu directo necesita captura HDMI y respaldo multipista.';
const cEn = 'the Focusrite Vocaster One is the best simple solo podcaster pick with Auto Gain and Enhance';
if (!g.conclusion.includes(cEn)) die('conclusion EN no coincide');
g.conclusion = g.conclusion.split(cEn).join('the Yamaha URX44V is the streaming-hub pick with HDMI capture and 16-track backup');
const cEs = 'el Focusrite Vocaster One es la mejor opción simple para podcasters en solitario con Auto Gain y Enhance';
if (!g.conclusion_es.includes(cEs)) die('conclusion ES no coincide');
g.conclusion_es = g.conclusion_es.split(cEs).join('la Yamaha URX44V es la opción hub de streaming con captura HDMI y respaldo de 16 pistas');
const f = g.featuredSnippet;
const a1en = 'The Focusrite Vocaster One (on sale), the Zoom PodTrak P4next or Audient EVO 4 give you';
if (!f.faq_a1_en.includes(a1en)) die('FAQ A1 EN no coincide');
f.faq_a1_en = f.faq_a1_en.split(a1en).join('The Zoom PodTrak P4next or Audient EVO 4 give you');
const a1es = 'El Focusrite Vocaster One (en oferta), el Zoom PodTrak P4next o el Audient EVO 4 te dan';
if (!f.faq_a1_es.includes(a1es)) die('FAQ A1 ES no coincide');
f.faq_a1_es = f.faq_a1_es.split(a1es).join('El Zoom PodTrak P4next o el Audient EVO 4 te dan');

fs.writeFileSync(gj, JSON.stringify(guides, null, 2));

// ---------- VERIFICACION ----------
const all = JSON.stringify(g);
['Focusrite Vocaster One', 'Vocaster'].forEach(w => {
  console.log('"' + w + '" restante: ' + (all.split(w).length - 1));
});
console.log('URX44V menciones:', (all.match(/URX44V/g) || []).length);
console.log('columnas:', g.productTable.columns.length);
console.log('filas desalineadas:', g.productTable.rows.filter(r => r.values.length !== 7).length);
console.log('paridad veredictos:', g.verdictProsCons.every(v => v.pros.length === v.pros_es.length && v.cons.length === v.cons_es.length && v.pros.length >= 4 && v.cons.length >= 4));
