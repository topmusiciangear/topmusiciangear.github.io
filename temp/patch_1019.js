const fs = require('fs');
const B = 'C:/Users/Daniel/projects/topmusiciangear/';
const eur = v => (v / 1.0084).toFixed(2);
const gbp = v => ((v / 1.0084) * 0.7959).toFixed(2);
const PB_EUR = 240.00;
const PB_US = eur(PB_EUR), PB_UK = gbp(PB_EUR);
const PB_MAX = 'https://www.pluginboutique.com/product/2-Effects/18-Amp-Simulator/12444-AmpliTube-5-MAX-v2?a_aid=6a01e859cbe1a';
const FOTO = 'https://r2.gear4music.com/media/71/711975/1200/preview.jpg';

// ============ 1. products.json ============
const pp = B + 'data/products.json';
const products = JSON.parse(fs.readFileSync(pp, 'utf8'));
const p = products.find(x => x.id === 1019);
if (!p) { console.log('1019 no existe'); process.exit(1); }
p.img = FOTO; p.image = FOTO;
p.stores.musicstore = 'https://www.musicstore.com/en_OE/EUR/IK-Multimedia-AmpliTube-5-License-Code/art-PCM0016735-000';
p.stores.andertons = 'https://www.andertons.co.uk/ik-multimedia-amplitube-5-esd/';
p.stores.zzounds = 'https://www.zzounds.com/item--IKMAMPLITUBE5';
p.desc = 'Amp and pedal emulation suite: 177 gear models in the Standard box, Tonex capture and 10,000+ presets. The full 400+ model catalogue needs the MAX version.';
p.desc_es = 'Suite de amplificadores y pedales: 177 modelos en la versión Standard, captura Tonex y más de 10.000 presets. Los 400+ modelos del catálogo requieren la MAX.';
fs.writeFileSync(pp, JSON.stringify(products, null, 2), 'utf8');
console.log('1019: img=' + p.img);
console.log('  stores=' + Object.keys(p.stores).join(', '));
console.log('  desc (' + p.desc.length + 'c): ' + p.desc);
console.log('  desc_es (' + p.desc_es.length + 'c): ' + p.desc_es);

// ============ 2. guides.json ============
const gp = B + 'data/guides.json';
const guides = JSON.parse(fs.readFileSync(gp, 'utf8'));
const g = guides.find(x => x.id === 'best-guitar-plugins');
if (!g) { console.log('guia no encontrada'); process.exit(1); }
g.image = FOTO;
console.log('\nportada de la guia: ' + g.image);

const s0 = g.sections[0];
// --- prosa de la seccion con la aclaracion + enlace MAX ---
s0.content = '<p><strong>IK Multimedia AmpliTube 5 is one of the largest amp and pedal emulation suites available.</strong> The Standard edition includes 177 gear models: classic Marshall, Fender, Vox and Mesa amps, vintage pedals from Boss, Ibanez and Electro-Harmonix, and modern high-gain units. The Tonex integration adds captured tones from real rigs, and the preset library exceeds 10,000.</p><p><strong>One thing to know before you buy: 177 is the Standard count, not 400.</strong> If you want the entire catalogue — every artist signature and top brand release — that lives in <a href="' + PB_MAX + '" target="_blank" rel="noopener noreferrer sponsored">IK Multimedia AmpliTube 5 MAX</a>, which is a different and pricier licence.</p><p>The interface is functional if not beautiful: you build your signal chain by dragging amps, cabs, pedals and rack effects. The sound quality is excellent for the price point. For home recording guitarists who want variety and constant expansion, IK Multimedia AmpliTube 5 is a production workhorse.</p>';
s0.content_es = '<p><strong>IK Multimedia AmpliTube 5 es uno de los suites más grandes de emulación de amplificadores y pedales disponibles.</strong> La edición Standard incluye 177 modelos de equipo: amplificadores clásicos Marshall, Fender, Vox y Mesa, pedales vintage de Boss, Ibanez y Electro-Harmonix, y unidades modernas de alta ganancia. La integración Tonex añade tonos capturados de rigs reales, y la biblioteca de presets supera los 10.000.</p><p><strong>Una cosa que conviene saber antes de comprar: 177 es la cifra de la versión Standard, no 400.</strong> Si quieres el catálogo completo —todas las firmas de artistas y los lanzamientos de las marcas top— eso está en <a href="' + PB_MAX + '" target="_blank" rel="noopener noreferrer sponsored">IK Multimedia AmpliTube 5 MAX</a>, que es otra licencia y bastante más cara.</p><p>La interfaz es funcional aunque no hermosa: construyes tu cadena de señal arrastrando amplificadores, cabs, pedales y efectos de rack. La calidad de sonido es excelente para el precio. Para guitarristas que graban en casa y quieren variedad y expansión constante, IK Multimedia AmpliTube 5 es un caballo de batalla de producción.</p>';
console.log('  seccion[0]: prosa con aclaracion 177 vs MAX + enlace');

// --- pros/cons de la seccion ---
s0.pros[0] = '177 gear models in Standard; 400+ only in MAX';
s0.pros_es[0] = '177 modelos en Standard; los 400+ solo en la MAX';
s0.cons[1] = 'The full 400+ model catalogue only comes in the pricier MAX edition';
s0.cons_es[1] = 'El catálogo completo de 400+ modelos solo viene en la MAX, que cuesta más';
console.log('  seccion[0]: pros/cons corregidos');

// --- veredictos (reviews) ---
const v = g.verdictProsCons[0];
v.pros[0] = '177 models in the Standard box; MAX unlocks 400+';
v.pros_es[0] = '177 modelos en la caja Standard; la MAX desbloquea los 400+';
v.cons[1] = 'Wanting the full catalogue means moving up to MAX';
v.cons_es[1] = 'Querer el catálogo completo implica subir a la MAX';
console.log('  verdictProsCons[0]: pros/cons corregidos');

// --- tabla comparativa ---
const fila = (g.productTable.rows || []).find(r => JSON.stringify(r).includes('AmpliTube'));
if (fila) {
  const celdas = fila.values || [];
  celdas.forEach(c => {
    if (c.value && /400\+/.test(c.value)) c.value = '177 models in Standard; 400+ need MAX, with Tonex capture';
    if (c.value_es && /400\+/.test(c.value_es)) c.value_es = '177 modelos en Standard; los 400+ requieren MAX, con captura Tonex';
  });
  console.log('  productTable: fila corregida -> ' + JSON.stringify(fila.values[0]));
}

// --- veredicto de la guia ---
g.verdict = g.verdict.replace('with 400+ gear models and Tonex capture integration', 'with 177 models in the Standard edition (the full 400+ catalogue needs MAX) and Tonex capture integration');
g.verdict_es = g.verdict_es.replace('con más de 400 modelos e integración de capturas Tonex', 'con 177 modelos en la edición Standard (el catálogo completo de 400+ requiere la MAX) e integración de capturas Tonex');
console.log('  verdict EN: ' + /400\+ gear models/.test(g.verdict) ? 'SIN CAMBIAR' : 'corregido');
console.log('  verdict ES: ' + /más de 400 modelos/.test(g.verdict_es) ? 'SIN CAMBIAR' : 'corregido');

fs.writeFileSync(gp, JSON.stringify(guides, null, 2), 'utf8');

// ============ 3. build-guides.js: precios 1019 ============
let bg = fs.readFileSync(B + 'build-guides.js', 'utf8');
const viejo = '\n1019: {prices:{pluginboutique:"\u20AC200.67"},pbCur:{us:"$199.00",uk:"\u00A3158.38"}},';
const nuevo = '\n1019: {prices:{pluginboutique:"\u20AC' + PB_EUR.toFixed(2) +
  '",musicstore:"\u20AC229.00",andertons:"\u00A3189.00",zzounds:"$299.00"},pbCur:{us:"$' + PB_US + '",uk:"\u00A3' + PB_UK + '"}},';
if (!bg.includes(viejo)) { console.log('\nlinea 1019 NO encontrada'); process.exit(1); }
bg = bg.replace(viejo, nuevo);
fs.writeFileSync(B + 'build-guides.js', bg, 'utf8');
console.log('\nTEST_SHOP_BTN 1019 -> ' + nuevo.trim());
console.log('PB geo: EU \u20AC' + PB_EUR.toFixed(2) + ' | US $' + PB_US + ' | UK \u00A3' + PB_UK);
console.log('\nenlace MAX en prosa: ' + PB_MAX);