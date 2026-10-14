var fs = require('fs');
var g = JSON.parse(fs.readFileSync('data/guides.json', 'utf8'));
var sw = g[54];
console.log('stage-wireless keys: ' + JSON.stringify(Object.keys(sw)));
console.log('has faq_a1_en: ' + ('faq_a1_en' in sw));
['featuredSnippet'].forEach(function (k) { if (sw[k]) console.log('featuredSnippet keys: ' + JSON.stringify(Object.keys(sw[k]))); });

function getPath(obj, path) { return path.split(/[.\[\]]+/).filter(Boolean).reduce(function (o, k) { return o == null ? o : o[k]; }, obj); }
function show(id, field) { var x = g.find(function (y) { return y.id === id; }); console.log('[' + id + '].' + field + ' = ' + JSON.stringify(getPath(x, field))); }

show('starter-studio', 'verdictProsCons[3].pros[3]');
show('starter-studio', 'verdictProsCons[3].pros_es[3]');
show('starter-studio', 'verdictProsCons[3].cons[3]');
show('starter-studio', 'featuredSnippet.faq_a4_es');
show('monitor-setup', 'featuredSnippet.faq_a1_es');
show('sm57-vs-sm58', 'featuredSnippet.faq_a3_es');
show('adam-vs-genelec', 'featuredSnippet.faq_a1_es');
show('jbl-vs-kali', 'featuredSnippet.faq_a1_es');
show('jbl-vs-kali', 'featuredSnippet.faq_a3_es');
show('atc-vs-genelec', 'featuredSnippet.faq_a1_es');

var prods = JSON.parse(fs.readFileSync('data/products.json', 'utf8'));
['D3V', 'U 87'].forEach(function (q) {
  prods.forEach(function (x) { if ((x.title || '').toLowerCase().indexOf(q.toLowerCase()) >= 0) console.log('CAT ' + q + ' => ' + x.id + ' | ' + x.title + ' | $' + x.price); });
});