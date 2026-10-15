const fs = require('fs');
const F = 'C:/Users/Daniel/projects/topmusiciangear/data/guides.json';
const g = JSON.parse(fs.readFileSync(F, 'utf8'));
let n = 0;

// "El 32 bits en coma flotante evita" -> concordancia de plural
const REGLAS = [
  ['El 32 bits en coma flotante evita que la toma sature',
   'Los 32 bits en coma flotante evitan que la toma sature']
];

function rec(o) {
  if (typeof o === 'string') return REGLAS.reduce((a, [x, y]) => { if (a.includes(x)) n += a.split(x).length - 1; return a.split(x).join(y); }, o);
  if (Array.isArray(o)) return o.map(rec);
  if (o && typeof o === 'object') { Object.keys(o).forEach(k => { o[k] = rec(o[k]); }); }
  return o;
}
rec(g);
fs.writeFileSync(F, JSON.stringify(g, null, 2) + '\n', 'utf8');
console.log('  reemplazos: ' + n);

// revisar TODAS las frases con "coma flotante" para descartar mas concordancias raras
const t = JSON.stringify(g);
console.log('\n=== todas las frases con "coma flotante" ===');
[...new Set(t.match(/[^"\\]{0,80}coma flotante[^"\\]{0,80}/g) || [])]
  .filter(x => !/\\n/.test(x)).slice(0, 25)
  .forEach(x => console.log('  ...' + x.trim() + '...'));

console.log('\n  mojibake: ' + (fs.readFileSync(F, 'utf8').match(/â‚¬|Â£|Â°/g) || []).length);
