var fs = require('fs');
var arr = JSON.parse(fs.readFileSync('C:/Users/Daniel/projects/topmusiciangear/data/guides.json', 'utf8'));
var out = [];
var g = null;
arr.forEach(function (x, i) { if (String(x.slug || x.id || '') === 'premium-interfaces') g = x; });
if (!g) { out.push('premium NOT FOUND'); }
else {
  out.push('premium FOUND keys: ' + Object.keys(g).join(','));
  out.push('title: ' + JSON.stringify(g.title));
  out.push('title_es: ' + JSON.stringify(g.title_es));
  var comp = g.comparison;
  if (comp) {
    out.push('comparison.headers: ' + JSON.stringify(comp.headers));
    out.push('comparison.headers_es: ' + JSON.stringify(comp.headers_es));
    out.push('comparison.rows len: ' + (comp.rows || []).length);
  }
  var prods = g.products;
  out.push('products key: ' + (prods ? JSON.stringify(Array.isArray(prods) ? prods.map(function (p) { return p.name; }) : 'OBJECT')) : 'NONE');
  var vk = null, vv = null;
  Object.keys(g).forEach(function (k) { if (/verdict|sideBySide|prosCons/i.test(k) && g[k]) { vk = k; vv = g[k]; } });
  out.push('verdict keys found: ' + JSON.stringify(Object.keys(g).filter(function (k) { return /verdict|sideBySide|prosCons/i.test(k); })));
  out.push('verdict[' + vk + '] type: ' + (Array.isArray(vv) ? 'ARRAY len=' + vv.length : (vv && typeof vv === 'object' ? 'OBJECT keys=' + Object.keys(vv).join(',') : String(vv))));
}
fs.writeFileSync('C:/Users/Daniel/projects/topmusiciangear/temp/cons_patch/prem_probe3.txt', out.join('\n'), 'utf8');
console.log('wrote ' + out.length + ' lines');
