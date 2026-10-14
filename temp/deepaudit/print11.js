var g = require('C:/Users/Daniel/projects/topmusiciangear/data/guides.json');
function getPath(o, p) { return p.split(/[.\[\]]+/).filter(Boolean).reduce(function (a, k) { return a == null ? a : a[k]; }, o); }
var x = g.find(function (y) { return y.id === 'budget-usb-mics'; });
function show(f) { console.log('[' + f + '] = ' + JSON.stringify(getPath(x, f))); }
console.log('== sections content openers (first 180 chars) ==');
x.sections.forEach(function (s, i) {
  if (s.content && /At the |For the /.test(s.content)) {
    console.log('[' + i + '].content = ' + JSON.stringify(s.content.slice(0, 200)));
  }
});
show('conclusion');
show('conclusion_es');
['faq_a4_en', 'faq_a2_es', 'faq_a3_es', 'faq_a4_es', 'faq_a5_es'].forEach(function (k) { if (x.featuredSnippet[k]) show('featuredSnippet.' + k); });
x.verdictProsCons.forEach(function (v, i) {
  [['pros', 'pros_es'], ['cons', 'cons_es']].forEach(function (pair) {
    (v[pair[1]] || []).forEach(function (p, j) { if (p.indexOf('(') < 0 && /^\s*$/ .test('') && /At |consider |buying|accesorio|at\.|al marca/.test(p)) console.log('vc[' + i + '].' + pair[1] + '[' + j + '] = ' + JSON.stringify(p)); });
  });
});