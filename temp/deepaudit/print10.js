var fs = require('fs');
var g = require('C:/Users/Daniel/projects/topmusiciangear/data/guides.json');
var prods = JSON.parse(fs.readFileSync('C:/Users/Daniel/projects/topmusiciangear/data/products.json', 'utf8'));
['DXR12mkII', 'ETX', 'EVOX'].forEach(function (q) {
  prods.forEach(function (x) { if ((x.title || '').toLowerCase().indexOf(q.toLowerCase()) >= 0) console.log('CAT ' + q + ' => ' + x.id + ' | ' + x.title + ' | $' + x.price); });
});
function getPath(o, p) { return p.split(/[.\[\]]+/).filter(Boolean).reduce(function (a, k) { return a == null ? a : a[k]; }, o); }
var bp = g.find(function (x) { return x.id === 'budget-pa-systems'; });
['verdictProsCons[0].pros[0]', 'verdictProsCons[0].pros_es[0]', 'verdictProsCons[0].name', 'verdictProsCons[0].cons[0]', 'verdictProsCons[0].cons_es[0]'].forEach(function (f) { console.log('[budget-pa].' + f + ' = ' + JSON.stringify(getPath(bp, f))); });
['faq_a1_en', 'faq_a1_es', 'faq_a2_en', 'faq_a2_es', 'faq_a3_en', 'faq_a3_es'].forEach(function (k) { if (bp.featuredSnippet[k]) console.log(' faq ' + k + ' = ' + JSON.stringify(bp.featuredSnippet[k])); });