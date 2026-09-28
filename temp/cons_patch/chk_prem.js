var fs = require('fs');
var P = 'C:/Users/Daniel/projects/topmusiciangear/data/products.json';
var A = JSON.parse(fs.readFileSync(P, 'utf8'));
var list = Array.isArray(A) ? A : (A.products || []);
var L = [];
[512, 513, 514, 515].forEach(function (id) {
  list.forEach(function (p, i) {
    if (p.id !== id) return;
    L.push('idx=' + i + ' id=' + p.id + ' name=' + JSON.stringify(p.name) + ' title=' + JSON.stringify(p.title) + ' image=' + JSON.stringify(String(p.image || '').slice(0, 70)));
  });
});
var g = JSON.parse(fs.readFileSync('C:/Users/Daniel/projects/topmusiciangear/data/guides.json', 'utf8'));
g.forEach(function (gg) {
  if (String(gg.slug || gg.id || '') !== 'premium-interfaces') return;
  L.push('--- premium featuredProducts: ' + JSON.stringify((gg.featuredProducts || []).map(function (x) { return typeof x === 'object' ? (x.id || x.name || JSON.stringify(x).slice(0, 40)) : x; })));
  ['productTable', 'comparison', 'comparisonTable', 'verdictSideBySide', 'verdictProsCons'].forEach(function (k) {
    var v = gg[k];
    if (!v) return;
    L.push(k + ' type=' + (Array.isArray(v) ? 'array[' + v.length + ']' : typeof v) + ' keys=' + (v && !Array.isArray(v) ? Object.keys(v).join(',') : ''));
  });
});
fs.writeFileSync('C:/Users/Daniel/projects/topmusiciangear/temp/cons_patch/chk_prem.txt', L.join('\n'), 'utf8');
console.log('wrote ' + L.length);
