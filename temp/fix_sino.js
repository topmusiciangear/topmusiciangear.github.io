const fs = require('fs');
const F = 'C:/Users/Daniel/projects/topmusiciangear/data/guides.json';
const g = JSON.parse(fs.readFileSync(F, 'utf8'));
const s = g.find(x => x.id === 'starter-studio');
const de = 'y no porque sea el mejor auricular.</strong> Sino porque es el que nunca se actualiza.';
const a = 'y no porque sea el mejor, sino porque es el que nunca pasa de moda.</strong>';
const t0 = JSON.stringify(s);
if (!t0.includes(de)) { console.log('FALLA'); process.exit(1); }
(function rec(o) {
  if (typeof o === 'string') return o.split(de).join(a);
  if (Array.isArray(o)) return o.map(rec);
  if (o && typeof o === 'object') { Object.keys(o).forEach(k => { o[k] = rec(o[k]); }); }
  return o;
})(s);
fs.writeFileSync(F, JSON.stringify(g, null, 2) + '\n', 'utf8');
console.log('ok (mueve </strong> y funde la frase)');
