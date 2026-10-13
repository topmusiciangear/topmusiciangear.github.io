const fs = require('fs');
const BASE = 'C:/Users/Daniel/projects/topmusiciangear/';
const gj = BASE + 'data/guides.json';
const guides = JSON.parse(fs.readFileSync(gj, 'utf8'));
const g = guides.find(x => x.id === 'usb-mics');
const log = [];
let fail = 0;
const ck = (n, ok) => { if (!ok) fail++; console.log('  ' + (ok ? 'OK  ' : '[!!] ') + n); };

// Mics de ESTA guia con salida XLR (segun la tabla):
//   col0 Shure MV7+          "Dynamic (moving coil), USB-C + XLR"
//   col4 Rode NT1 5th Gen    "Condenser (1-inch LDC), XLR + USB-C"
//   col7 Rode PodMic USB     "Dynamic (moving coil), cardioid, USB-C + XLR"
//   col9 Samson Q2U          "Dynamic (moving coil), cardioid, USB-C + XLR"
// => 4 de 10. Las frases "the only mic here with XLR" quedaron obsoletas al meter el Q2U.
const XLR_COLS = [];
g.productTable.rows.find(r => r.label === 'Type').values.forEach((v, i) => {
  if (/\bXLR\b/.test(v.value || '')) XLR_COLS.push(g.productTable.columns[i].title);
});
console.log('Mics con XLR en esta guia (' + XLR_COLS.length + '): ' + XLR_COLS.join(' | '));
ck('son 4, no 1 (la premisa del arreglo)', XLR_COLS.length === 4);

// ============================================================
// 1) conclusion EN / ES
// ============================================================
const cEnOld = 'If you plan to move to a studio preamp someday, the <strong>Rode PodMic USB</strong> is the only mic here that keeps its XLR output.';
const cEnNew = 'If you plan to move to a studio preamp someday, the <strong>Rode PodMic USB</strong> and the <strong>Samson Q2U</strong> are the cheapest ways to keep a 3-pin XLR alongside USB, since the other two with XLR here start well above $200.';
if (g.conclusion.indexOf(cEnOld) === -1) { ck('conclusion EN: frase antigua localizada', false); }
else { g.conclusion = g.conclusion.replace(cEnOld, cEnNew); log.push('conclusion EN: "el unico con XLR" -> los 4 mics con XLR, ordenados por precio'); }

const cEsOld = 'Si algún día piensas pasar a un preamp de estudio, el <strong>Rode PodMic USB</strong> es el único de esta lista que conserva su salida XLR.';
const cEsNew = 'Si algún día piensas pasar a un preamp de estudio, el <strong>Rode PodMic USB</strong> y el <strong>Samson Q2U</strong> son las formas más baratas de conservar un XLR de 3 pines junto al USB, porque los otros dos con XLR de esta lista empiezan bastante por encima de 200 $.';
if (g.conclusion_es.indexOf(cEsOld) === -1) { ck('conclusion ES: frase antigua localizada', false); }
else { g.conclusion_es = g.conclusion_es.replace(cEsOld, cEsNew); log.push('conclusion ES: mismo arreglo'); }

// ============================================================
// 2) VPC PodMic pros[0]  (indice 7)
// ============================================================
const V = g.verdictProsCons;
const pod = V[7], q2u = V[9];
ck('VPC[7] es el PodMic', /PodMic/.test(pod.name), pod.name);
ck('VPC[9] es el Q2U', /Q2U/.test(q2u.name), q2u.name);

pod.pros[0] = 'One of four mics here that pair USB with a 3-pin XLR, and the only one that does it with on-board APHEX processing and 148 dB of headroom, so you can move to a studio preamp later without changing microphones';
pod.pros_es[0] = 'Uno de cuatro micrófonos de aquí que combinan USB con un XLR de 3 pines, y el único que lo hace con procesado APHEX a bordo y 148 dB de margen, así que puedes llevarlo después a un preamp de estudio sin cambiar de micrófono';
log.push('VPC PodMic pros[0]: "el unico con XLR" -> "uno de cuatro", con el diferenciador real (APHEX + 148 dB)');

// ============================================================
// 3) VPC Q2U pros[0]
// ============================================================
q2u.pros[0] = 'By far the cheapest way to get USB-C and XLR in one mic — the other three here with XLR start at $199, this is $70';
q2u.pros_es[0] = 'Con diferencia la forma más barata de tener USB-C y XLR en un solo micrófono: los otros tres de aquí con XLR empiezan en 199 $ y este está en 70 $';
log.push('VPC Q2U pros[0]: anclado a precios reales en vez de "el unico"');

// ============================================================
// VERIFICACION FINAL
// ============================================================
console.log('');
const all = JSON.stringify(g);
ck('ninguna afirmacion "the only mic here" + XLR', !/only mic here[^"]{0,80}XLR/i.test(all));
ck('ninguna afirmacion "unico microfono" + XLR', !/único micrófono[^"]{0,80}XLR/i.test(all));
ck('podmic pros EN/ES alineados', pod.pros.length === pod.pros_es.length);
ck('q2u pros EN/ES alineados', q2u.pros.length === q2u.pros_es.length);
// Regla del sitio: MINIMO 4 pros + 4 contras (no un numero exacto).
ck('podmic cumple minimo 4/4', pod.pros.length >= 4 && pod.cons.length >= 4, pod.pros.length + '/' + pod.cons.length);
ck('q2u cumple minimo 4/4', q2u.pros.length >= 4 && q2u.cons.length >= 4, q2u.pros.length + '/' + q2u.cons.length);

// El Samson Q2U tambien tiene 148 dB: "the highest headroom of any dynamic"
// quedo obsoleto al meterlo en la guia. Ahora es un empate.
const splRow = g.productTable.rows.find(r => r.label === 'Max SPL');
const spl148 = [];
splRow.values.forEach((v, i) => { if (/148/.test(v.value || '')) spl148.push(g.productTable.columns[i].title); });
console.log('Mics con 148 dB en la tabla (' + spl148.length + '): ' + spl148.join(' | '));
ck('hay empate en 148 dB (no hay "el mas alto")', spl148.length >= 2);
if (spl148.length >= 2) {
  pod.pros[2] = '148 dB max SPL, tied with the Samson Q2U for the highest headroom of any dynamic in this guide';
  pod.pros_es[2] = '148 dB de SPL máximo, empatado con el Samson Q2U en el mayor margen de cualquier dinámico de esta guía';
  log.push('VPC PodMic pros[2]: "the highest headroom" -> "tied with the Samson Q2U"');
}

if (fail) { console.log('\nABORTADO (' + fail + '). Nada escrito.'); process.exit(1); }

fs.writeFileSync(gj, JSON.stringify(guides, null, 2));
console.log('\nESCRITO. ' + log.length + ' cambios:');
log.forEach(l => console.log('  - ' + l));