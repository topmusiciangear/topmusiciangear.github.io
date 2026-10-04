const G = require('C:/Users/Daniel/projects/topmusiciangear/data/guides.json');
const g = G.find(x => x.id === 'scarlett-vs-motu');
function norm(s) {
  return (s || '').toLowerCase().replace(/[^a-z0-9áéíóúñü ]/gi, ' ').replace(/\s+/g, ' ').trim();
}
console.log('OLD norm:', JSON.stringify(norm('Same $199 price, different interface')));
let n = 0;
JSON.stringify(ghengis = g, (k, v) => v, 0);
function* walk(o, path) {
  if (typeof o === 'string') { yield [path, o]; return; }
  if (Array.isArray(o)) { for (let i = 0; i < o.length; i++) yield* walk(o[i], path + '[' + i + ']'); return; }
  if (o && typeof o === 'object') { for (const k of Object.keys(o)) yield* walk(o[k], path ? path + '.' + k : k); }
}
for (const [p, v] of walk(g, '')) {
  if (typeof v === 'string' && /Same.*199/.test(v)) { console.log('[' + p + '] => ' + JSON.stringify(v.slice(0, 120))); n++; }
}
console.log('candidatos con Same+199:', n);