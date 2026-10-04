const G = require('C:/Users/Daniel/projects/topmusiciangear/data/guides.json');
function* walk(o, path) {
  if (typeof o === 'string') { yield [path, o]; return; }
  if (Array.isArray(o)) { for (let i = 0; i < o.length; i++) yield* walk(o[i], path + '[' + i + ']'); return; }
  if (o && typeof o === 'object') { for (const k of Object.keys(o)) yield* walk(o[k], path ? path + '.' + k : k); }
}
G.forEach(g => {
  for (const [p, v] of walk(g, '')) {
    if (typeof v === 'string' && /<table[\s>]/.test(v)) console.log(g.id, '|', p, '| len=' + v.length);
  }
});