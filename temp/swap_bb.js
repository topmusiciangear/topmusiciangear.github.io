const fs = require('fs');
const BASE = 'C:/Users/Daniel/projects/topmusiciangear/';
const die = (m) => { console.log('!! ' + m); process.exit(1); };
const gj = BASE + 'data/guides.json';
const guides = JSON.parse(fs.readFileSync(gj, 'utf8'));
const g = guides.find(x => x.id === 'beginner-bass-guitars');

const OUT_IDS = [441, 442, 155, 156, 185, 165];
const OUT_NAMES = ['Fender Player II Precision Bass', 'Fender Player II Jazz Bass', 'Fender American Professional II Precision Bass', 'Fender American Professional II Jazz Bass', 'Fender American Ultra II Precision Bass', 'ESP LTD B-204SM Bass Guitar'];
console.log('menciones salientes antes: ' + OUT_NAMES.map(n => (JSON.stringify(g).split(n).length - 1)).join(','));

// 1. featured
g.featuredProducts = [158, 159, 160, 161, 157, 326, 163];
console.log('featured: 7');

// 2. Secciones dedicadas salientes fuera (9,10,11,12,13,15); conservar 14 (V5)
const dropIdx = [9, 10, 11, 12, 13, 15];
dropIdx.forEach(i => {
  const s = g.sections[i];
  if (!s || !OUT_IDS.includes((s.products || [])[0])) die('seccion ' + i + ' no es saliente');
});
g.sections = g.sections.filter((_, i) => !dropIdx.includes(i));
console.log('secciones:', g.sections.length + ' (14 era dedup: 16-6=10)');

// 3. Overviews: productos + texto SEC2 (era indice 2, sigue siendolo)
[0, 1, 2].forEach(i => {
  g.sections[i].products = g.sections[i].products.filter(id => !OUT_IDS.includes(id));
});
const s2 = g.sections[2];
const s2en = 'the Squier and Player II picks below cover both at every budget';
if (!s2.content.includes(s2en)) die('SEC2 EN no coincide');
s2.content = s2.content.split(s2en).join('the Squier picks below cover both on a beginner budget');
const s2es = 'las elecciones Squier y Player II de abajo cubren ambos en cada presupuesto';
if (!s2.content_es.includes(s2es)) die('SEC2 ES no coincide');
s2.content_es = s2.content_es.split(s2es).join('las elecciones Squier de abajo cubren ambos con presupuesto de principiante');
console.log('overviews actualizados; SEC2 products: ' + JSON.stringify(s2.products));

// 4. Tabla: 13 -> 7 columnas (orden original relativo)
const keepTitles = ['Squier Affinity Series Precision Bass PJ', 'Yamaha TRBX304', 'Ibanez SR300E', 'Sterling by Music Man StingRay Ray4', "Squier Classic Vibe '60s Jazz Bass", 'Sire Marcus Miller V5R', 'Sire Marcus Miller V5 4-String Bass'];
const keepIdx = {};
keepTitles.forEach(t => {
  const i = g.productTable.columns.findIndex(c => c.title === t);
  if (i === -1) die('columna keeper no encontrada: ' + t);
  keepIdx[t] = i;
});
g.productTable.columns = keepTitles.map(t => ({ title: t, title_es: t }));
g.productTable.rows.forEach(r => {
  if (r.values.length !== 13) die('fila con ' + r.values.length + ' valores: ' + r.label);
  r.values = keepTitles.map(t => r.values[keepIdx[t]]);
});
// Peso V5R: normalizar "—"
const wrow = g.productTable.rows.find(r => r.label === 'Weight');
const wi = keepTitles.indexOf('Sire Marcus Miller V5R');
if (wrow.values[wi].value !== '—') die('peso V5R no es —');
wrow.values[wi] = { value: 'Not published (varies by unit)', value_es: 'No publicado (varía por unidad)' };
console.log('tabla: 7 columnas + peso V5R normalizado');

// 5. Veredictos: fuera los 6
const nv0 = g.verdictProsCons.length;
g.verdictProsCons = g.verdictProsCons.filter(v => v && !OUT_NAMES.includes(v.name));
if (nv0 - g.verdictProsCons.length !== 6) die('veredictos eliminados != 6');
g.verdictProsCons.sort((a, b) => {
  const order = [...keepTitles];
  return order.indexOf(a.name) - order.indexOf(b.name);
});
console.log('veredictos:', g.verdictProsCons.length);

// 6. Veredicto general: nombres reales (TRBX174 y Squier generica no existen en la guia)
const vEn1 = 'Yamaha TRBX174 for the best all-around beginner bass';
if (!g.verdict.includes(vEn1)) die('veredicto EN no coincide');
g.verdict = g.verdict.split(vEn1).join('Yamaha TRBX304 for the best all-around beginner bass');
const vEn2 = 'Squier Precision Bass for classic P-Bass tone';
if (!g.verdict.includes(vEn2)) die('veredicto EN2 no coincide');
g.verdict = g.verdict.split(vEn2).join('Squier Affinity PJ for classic P-Bass tone');
const vEs1 = 'El Yamaha TRBX174 para el mejor bajo de iniciación todo terreno';
if (!g.verdict_es.includes(vEs1)) die('veredicto ES no coincide');
g.verdict_es = g.verdict_es.split(vEs1).join('El Yamaha TRBX304 para el mejor bajo de iniciación todo terreno');
const vEs2 = 'la Squier Precision Bass para el tono P-Bass clásico';
if (!g.verdict_es.includes(vEs2)) die('veredicto ES2 no coincide');
g.verdict_es = g.verdict_es.split(vEs2).join('el Squier Affinity PJ para el tono P-Bass clásico');

// 7. Conclusion: mismos nombres
const cEn = 'Start with a Yamaha TRBX174 or Squier Precision Bass for the best combination';
if (!g.conclusion.includes(cEn)) die('conclusion EN no coincide');
g.conclusion = g.conclusion.split(cEn).join('Start with a Yamaha TRBX304 or Squier Affinity PJ for the best combination');
const cEs = 'Empieza con una Yamaha TRBX174 o Squier Precision Bass para la mejor combinación';
if (!g.conclusion_es.includes(cEs)) die('conclusion ES no coincide');
g.conclusion_es = g.conclusion_es.split(cEs).join('Empieza con un Yamaha TRBX304 o Squier Affinity PJ para la mejor combinación');

fs.writeFileSync(gj, JSON.stringify(guides, null, 2));

// ---------- VERIFICACION ----------
const all = JSON.stringify(g);
const rest = OUT_NAMES.map(n => all.split(n).length - 1);
console.log('salientes restantes: ' + rest.join(','));
['TRBX174'].forEach(w => console.log('"' + w + '" restante: ' + (all.split(w).length - 1)));
console.log('veredictos:', g.verdictProsCons.length, '| featured:', g.featuredProducts.length);
console.log('desalineadas:', g.productTable.rows.filter(r => r.values.length !== 7).length);
console.log('paridad:', g.verdictProsCons.every(v => v.pros.length === v.pros_es.length && v.cons.length === v.cons_es.length && v.pros.length >= 4 && v.cons.length >= 4));
