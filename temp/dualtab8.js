const G = require('C:/Users/Daniel/projects/topmusiciangear/data/guides.json');
const g = G.find(x => x.id === 'portable-interfaces');
function* walk(o, path) {
  if (typeof o === 'string') { yield [path, o]; return; }
  if (Array.isArray(o)) { for (let i = 0; i < o.length; i++) yield* walk(o[i], path + '[' + i + ']'); return; }
  if (o && typeof o === 'object') { for (const k of Object.keys(o)) yield* walk(o[k], path ? path + '.' + k : k); }
}
for (const [p, v] of walk(g, '')) {
  if (typeof v === 'string' && (v.includes('guide-comparison-table') || v.includes('Compacta 2-Canales'))) console.log(p, 'LEN=' + v.length);
}
console.log('top keys:', Object.keys(g).join(','));