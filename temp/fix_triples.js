const fs = require('fs');
const F = 'C:/Users/Daniel/projects/topmusiciangear/data/guides.json';
const g = JSON.parse(fs.readFileSync(F, 'utf8'));
const s = g.find(x => x.id === 'starter-studio');
const de = 'Tier 3 at $2,688</strong> is the one that doubles the budget';
const t0 = JSON.stringify(s);
console.log(t0.includes(de) ? 'encontrado' : 'FALLA');
(function rec(o) {
  if (typeof o === 'string') return o.split(de).join('Tier 3 at $2,688</strong> is the one that triples the budget');
  if (Array.isArray(o)) return o.map(rec);
  if (o && typeof o === 'object') { Object.keys(o).forEach(k => { o[k] = rec(o[k]); }); }
  return o;
})(s);
fs.writeFileSync(F, JSON.stringify(g, null, 2) + '\n', 'utf8');
const t = JSON.stringify(JSON.parse(fs.readFileSync(F, 'utf8')).find(x => x.id === 'starter-studio'));
console.log('restos doubles: ' + (t.match(/doubles the budget/g) || []).length + ' (queda el legitimo "doubles as your monitor controller")');
console.log('triples: ' + (t.match(/triples the budget/g) || []).length);
