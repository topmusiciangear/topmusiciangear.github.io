// Ultimos residuos: 2 "en lugar de con" reales, "sobrevivible", "EQ Doppler" en el
// veredicto del KRK, y "float de 32 bits" -> "coma flotante de 32 bits" en todo el sitio.
const fs = require('fs');
const F = 'C:/Users/Daniel/projects/topmusiciangear/data/guides.json';
const g = JSON.parse(fs.readFileSync(F, 'utf8'));
let n = 0;

// Solo estos dos son errores reales de gramatica; los demas "en lugar de" son correctos.
const REGLAS = [
  ['con geometría en lugar de con procesamiento', 'con geometría en lugar de procesamiento'],
  ['ajustas curvas desde menús en lugar de con mandos', 'ajustas curvas desde menús en lugar de mandos'],

  ['una pared detrás es sobrevivible', 'una pared detrás se puede tolerar'],

  ['Doppler EQ and room calibration presets you set once and forget',
   'A desk filter and boundary EQ presets in the rear-panel DSP that you set once and forget'],
  ['EQ Doppler y presets de calibración de sala que configuras una vez y olvidas',
   'Un filtro de escritorio y presets de contorno en el DSP trasero que configuras una vez y olvidas'],

  // "32 bits float" y "float de 32 bits" son spanglish
  ['salida digital float de 32 bits', 'salida digital en coma flotante de 32 bits'],
  ['El float de 32 bits', 'La coma flotante de 32 bits'],
  ['el float de 32 bits', 'la coma flotante de 32 bits'],
  ['sin float de 32 bits', 'sin coma flotante de 32 bits'],
  ['float de 32 bits', 'coma flotante de 32 bits'],
  ['32 bits float', '32 bits en coma flotante'],
  ['a 32 bits float', 'a 32 bits en coma flotante']
];

function rec(o) {
  if (typeof o === 'string') return REGLAS.reduce((a, [x, y]) => { if (a.includes(x)) { n += a.split(x).length - 1; } return a.split(x).join(y); }, o);
  if (Array.isArray(o)) return o.map(rec);
  if (o && typeof o === 'object') { Object.keys(o).forEach(k => { o[k] = rec(o[k]); }); }
  return o;
}
rec(g);

fs.writeFileSync(F, JSON.stringify(g, null, 2) + '\n', 'utf8');
console.log('  reemplazos: ' + n);

/* CONTROL GLOBAL */
const t = JSON.stringify(g);
console.log('\n=== CONTROL ===');
console.log('  "en lugar de con"        : ' + (t.match(/en lugar de con /g) || []).length + ' (debe ser 0)');
console.log('  "sobrevivible"           : ' + (t.match(/sobrevivible/gi) || []).length + ' (0)');
console.log('  "Doppler"                : ' + (t.match(/Doppler/g) || []).length + ' (0)');
console.log('  "float de 32 bits"       : ' + (t.match(/float de 32 bits/g) || []).length + ' (0)');
console.log('  "32 bits float"          : ' + (t.match(/32 bits float/g) || []).length + ' (0)');
console.log('  "coma flotante" (nuevo)  : ' + (t.match(/coma flotante/g) || []).length);
console.log('  mojibake                 : ' + (fs.readFileSync(F, 'utf8').match(/â‚¬|Â£|Â°/g) || []).length);

// comprobar que las guias afectadas siguen con 4+4 y celdas llenas
const st = g.find(x => x.id === 'starter-studio');
console.log('\n  starter-studio veredictos 4+4: ' + st.verdictProsCons.filter(v => v.pros.length >= 4 && v.cons.length >= 4 && v.pros_es.length >= 4 && v.cons_es.length >= 4).length + '/' + st.verdictProsCons.length);
console.log('  tabla sin celdas vacias     : ' + (st.productTable.rows.every(r => r.values.every(v => (v.value || '').trim() && (v.value_es || '').trim())) ? 'si' : 'NO'));
console.log('\n  celda del microfono ES: ' + st.productTable.rows[2].values[1].value_es);
console.log('  celda puntos fuertes ES: ' + st.productTable.rows[6].values[1].value_es);
console.log('  veredicto KRK pros_es[1]  : ' + st.verdictProsCons[6].pros_es[1]);
console.log('  seccion 6 ES (frag)     : ' + st.sections[6].content_es.replace(/<[^>]+>/g, '').match(/El Eris Studio 5 lo resuelve[^.]*\./)[0]);
