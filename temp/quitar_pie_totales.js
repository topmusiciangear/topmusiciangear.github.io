// Quitar el pie K&M 210/2 ($108.99) de los totales:
//   899.97 -> 790.98 => ~$791
//   1356.98 -> 1247.99 => ~$1,248
//   2796.97 -> 2687.98 => ~$2,688
const fs = require('fs');
const F = 'C:/Users/Daniel/projects/topmusiciangear/data/guides.json';
const g = JSON.parse(fs.readFileSync(F, 'utf8'));
const s = g.find(x => x.id === 'starter-studio');

const REGLAS = [
  ['~$900', '~$791'],
  ['Tier 1 comes to <strong>$900</strong>', 'Tier 1 comes to <strong>$791</strong>'],
  ['Tier 1 at $900', 'Tier 1 at $791'],
  ['El Nivel 1 sale por <strong>$900</strong>', 'El Nivel 1 sale por <strong>$791</strong>'],
  ['El Nivel 1 por $900', 'El Nivel 1 por $791'],
  ['~$1,357', '~$1,248'],
  ['~$1.357', '~$1.248'],
  ['Tier 2 to <strong>$1,357</strong>', 'Tier 2 to <strong>$1,248</strong>'],
  ['Tier 2 at $1,357', 'Tier 2 at $1,248'],
  ['el Nivel 2 por <strong>$1.357</strong>', 'el Nivel 2 por <strong>$1.248</strong>'],
  ['El Nivel 2 por $1.357', 'El Nivel 2 por $1.248'],
  ['~$2,797', '~$2,688'],
  ['~$2.797', '~$2.688'],
  ['definitive studio to <strong>$2,797</strong>', 'definitive studio to <strong>$2,688</strong>'],
  ['Tier 3 at $2,797', 'Tier 3 at $2,688'],
  ['estudio definitivo por <strong>$2.797</strong>', 'estudio definitivo por <strong>$2.688</strong>'],
  ['El Nivel 3 por $2.797', 'El Nivel 3 por $2.688'],
  ['What $900, $1,357 and $2,797 actually buy', 'What $791, $1,248 and $2,688 actually buy'],
  ['Qué compran $900, $1.357 y $2.797', 'Qué compran $791, $1.248 y $2.688']
];
let n = 0; const fallos = [];
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
fs.writeFileSync(F, JSON.stringify(g, null, 2) + '\n', 'utf8');
console.log('  reemplazos: ' + n);

/* CONTROL */
const s2 = JSON.parse(fs.readFileSync(F, 'utf8')).find(x => x.id === 'starter-studio');
const t = JSON.stringify(s2);
console.log('\n=== CONTROL ===');
[['\\$900[^0-9]|\\$900$', 'restos $900'], ['\\$1,357|\\$1\\.357', 'restos $1,357'],
 ['\\$2,797|\\$2\\.797', 'restos $2,797'],
 ['~\\$791', 'nuevo ~$791'], ['~\\$1,248|~\\$1\\.248', 'nuevo ~$1,248'], ['~\\$2,688|~\\$2\\.688', 'nuevo ~$2,688']
].forEach(([re, et]) => console.log('  ' + String((t.match(new RegExp(re, 'g')) || []).length).padStart(3) + '  ' + et));
console.log('\n  fila Inversión estimada:');
s2.productTable.rows[7].values.forEach((v, i) => console.log('    N' + (i + 1) + ': ' + v.value + ' / ' + v.value_es));
console.log('  desc EN (' + s2.description.length + '): ' + s2.description);
console.log('  desc ES (' + s2.description_es.length + '): ' + s2.description_es);
console.log('  mojibake: ' + (fs.readFileSync(F, 'utf8').match(/â‚¬|Â£|Â°/g) || []).length);
