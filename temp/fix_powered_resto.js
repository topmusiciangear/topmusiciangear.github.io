const fs = require('fs');
const F = 'C:/Users/Daniel/projects/topmusiciangear/data/guides.json';
const g = JSON.parse(fs.readFileSync(F, 'utf8'));
const s = g.find(x => x.id === 'starter-studio');

const REGLAS = [
  // EN: sintagmas restantes. NO se toca "Bus-powered" (alimentacion USB).
  ['ships with powered studio monitors', 'ships with active studio monitors'],
  ['a pair of powered 5.25-inch monitors', 'a pair of active 5.25-inch monitors'],
  ['usable powered stereo pair', 'usable active stereo pair'],
  // ES: comprobamos que no queden restos
  ['monitores de estudio alimentados', 'monitores de estudio activos'],
  ['un par de monitores alimentados', 'un par de monitores activos'],
  ['par estéreo alimentado', 'par estéreo activo'],
  ['potencia alimentada', 'potencia activa']
];
let n = 0;
function rec(o) {
  if (typeof o === 'string') return REGLAS.reduce((a, [x, y]) => {
    if (a.includes(x)) { n += a.split(x).length - 1; console.log('    ' + a.split(x).length - 1 + ' x "' + x + '"'); }
    return a.split(x).join(y);
  }, o);
  if (Array.isArray(o)) return o.map(rec);
  if (o && typeof o === 'object') { Object.keys(o).forEach(k => { o[k] = rec(o[k]); }); }
  return o;
}
rec(s);
fs.writeFileSync(F, JSON.stringify(g, null, 2) + '\n', 'utf8');
console.log('  total: ' + n);

/* CONTROL */
const s2 = JSON.parse(fs.readFileSync(F, 'utf8')).find(x => x.id === 'starter-studio');
const t = JSON.stringify(s2);
console.log('\n=== "powered" que quedan (deben ser solo tecnicos, no "powered monitor") ===');
(t.match(/[^"\\]{0,70}[Pp]owered[^"\\]{0,70}/g) || []).map(x => x.trim()).forEach(x => console.log('  ...' + x + '...'));
console.log('\n  "alimentados" que quedan:');
(t.match(/[^"\\]{0,70}alimentad[^"\\]{0,70}/g) || []).map(x => x.trim()).forEach(x => console.log('  ...' + x + '...'));
console.log('\n  mojibake: ' + (fs.readFileSync(F, 'utf8').match(/â‚¬|Â£|Â°/g) || []).length);
