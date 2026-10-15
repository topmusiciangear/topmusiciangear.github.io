// 1) Los tres textos de "Puntos fuertes" queRewrite.
// 2) "altavoces/monitores alimentados" -> "activos" y "powered speakers/monitors" ->
//    "active ..." para que no queden dos terminologias en la misma tabla.
//    NO se toca "alimentados por 120 vatios" (describe los amplificadores).
const fs = require('fs');
const F = 'C:/Users/Daniel/projects/topmusiciangear/data/guides.json';
const g = JSON.parse(fs.readFileSync(F, 'utf8'));
const s = g.find(x => x.id === 'starter-studio');

/* ── 1) PUNTOS FUERTES ── */
const fila = s.productTable.rows[6];
fila.values[0] = {
  value: 'A complete chain with active speakers from day one. The waveguide throws the treble sideways, keeping the desk from colouring the top end.',
  value_es: 'Cadena completa con altavoces activos desde el primer día. La guía de onda manda los agudos hacia los lados, evitando que el escritorio coloree la parte alta.'
};
fila.values[1] = {
  value: 'The microphone’s 32-bit float rescues a take that would have clipped, and in the studio it runs XLR into the SSL: USB-C is for when you record away from the desk.',
  value_es: 'Los 32 bits en coma flotante del micrófono salvan una toma que se habría saturado, y en el estudio entra por XLR a la SSL: el USB-C queda para cuando grabas fuera del escritorio.'
};
fila.values[2] = {
  value: 'Unison preamps and a Neumann capsule: the analogue modelling and the DSP compression both happen before the converter.',
  value_es: 'Previos Unison y cápsula Neumann: el modelado analógico y la compresión por DSP ocurren antes de llegar al convertidor.'
};
console.log('  ok    fila Puntos fuertes · los 3 niveles, EN y ES');

/* ── 2) HARMONIZAR TERMINOLOGIA ── */
const REGLAS = [
  ['altavoces alimentados', 'altavoces activos'],
  ['monitores alimentados', 'monitores activos'],
  ['monitores de estudio alimentados', 'monitores de estudio activos'],
  ['powered speakers', 'active speakers'],
  ['powered monitors', 'active monitors']
];
let n = 0;
function rec(o) {
  if (typeof o === 'string') return REGLAS.reduce((a, [x, y]) => {
    if (a.includes(x)) n += a.split(x).length - 1;
    return a.split(x).join(y);
  }, o);
  if (Array.isArray(o)) return o.map(rec);
  if (o && typeof o === 'object') { Object.keys(o).forEach(k => { o[k] = rec(o[k]); }); }
  return o;
}
rec(s);
console.log('  ok    ' + n + ' sintagmas harmonizados');

fs.writeFileSync(F, JSON.stringify(g, null, 2) + '\n', 'utf8');

/* CONTROL */
const s2 = JSON.parse(fs.readFileSync(F, 'utf8')).find(x => x.id === 'starter-studio');
const t = JSON.stringify(s2);
console.log('\n=== CONTROL ===');
console.log('  ES "altavoces/monitores alimentados" : ' + (t.match(/altavoces alimentados|monitores alimentados/gi) || []).length + ' (debe ser 0)');
console.log('  ES "altavoces/monitores activos"     : ' + (t.match(/altavoces activos|monitores activos/gi) || []).length);
console.log('  EN "powered speakers/monitors"       : ' + (t.match(/powered (?:speakers|monitors)/gi) || []).length + ' (debe ser 0)');
console.log('  EN "active speakers/monitors"        : ' + (t.match(/active (?:speakers|monitors)/gi) || []).length);
console.log('  "alimentados por 120 vatios" (intacto): ' + (t.match(/alimentados por 120 vatios/g) || []).length);
console.log('\n  "powered" que quedan (revisar): ' + (t.match(/[^"\\]{0,60}powered[^"\\]{0,60}/g) || []).map(x => x.trim()).join('\n                        '));
console.log('\n  mojibake: ' + (fs.readFileSync(F, 'utf8').match(/â‚¬|Â£|Â°/g) || []).length);

console.log('\n=== PUNTOS FUERTES FINALES ===');
s2.productTable.rows[6].values.forEach((v, i) => {
  console.log('\n  N' + (i + 1) + ' EN: ' + v.value);
  console.log('  N' + (i + 1) + ' ES: ' + v.value_es);
});
