var guides = JSON.parse(require('fs').readFileSync('C:/Users/Daniel/projects/topmusiciangear/data/guides.json', 'utf8'));
var prods = JSON.parse(require('fs').readFileSync('C:/Users/Daniel/projects/topmusiciangear/data/products.json', 'utf8'));
var byId = {};
prods.forEach(function (p) { byId[p.id] = p.title; });
var g = guides.filter(function (x) { return (x.slug || x.id) === 'best-hardware-samplers'; })[0];
console.log('featured:', JSON.stringify(g.featuredProducts.map(function (id) { return id + ':' + byId[id]; })));
console.log('verdictN:', g.verdictProsCons.length);
g.verdictProsCons.forEach(function (it, i) {
  var keys = Object.keys(it);
  console.log('[' + i + '] keys:' + keys.join(',') + ' prod:' + (it.product || it.id || it.title || '?'));
});
var words = 0, fields = [];
(function walk(v, path) {
  if (typeof v === 'string') {
    var isES = /_es(\.|$|\[)/.test(path + '.') || /(^|\.)[a-z0-9_]*_es$/.test(path);
    if (!isES && /[áéíóúñ¿¡]/.test(v)) { words += v.split(/\s+/).length; fields.push(path + ' (' + v.split(/\s+/).length + 'w)'); }
    return;
  }
  if (Array.isArray(v)) v.forEach(function (x, i) { walk(x, path + '[' + i + ']'); });
  else if (v && typeof v === 'object') Object.keys(v).forEach(function (k) { walk(v[k], path ? path + '.' + k : k); });
})(g, '');
console.log('ES-in-EN words:' + words + ' fields:' + fields.length);
fields.forEach(function (f) { console.log('  ' + f); });
