var fs = require('fs');
var g = JSON.parse(fs.readFileSync('data/guides.json', 'utf8'));
function byId(id) { return g.find(function (x) { return x.id === id; }); }

var gd = g[13];
console.log('== [13] = ' + gd.id + ' ==');
gd.verdictProsCons.forEach(function (v, i) {
  console.log('\n## [' + i + '] ' + JSON.stringify(v.name));
  (v.pros || []).forEach(function (p, j) { console.log('  pros[' + j + '] EN=' + JSON.stringify(p)); });
  (v.cons || []).forEach(function (p, j) { console.log('  cons[' + j + '] EN=' + JSON.stringify(p)); });
  (v.pros_es || []).forEach(function (p, j) { console.log('  pros_es[' + j + '] = ' + JSON.stringify(p)); });
  (v.cons_es || []).forEach(function (p, j) { console.log('  cons_es[' + j + '] = ' + JSON.stringify(p)); });
});

var gd2 = g[82];
console.log('\n== [82] = ' + gd2.id + ' verdictProsCons[1] ==');
console.log(JSON.stringify(gd2.verdictProsCons[1], null, 1));

var gd3 = g[14];
console.log('\n== [14] = ' + gd3.id + ' faq_a1 ==');
console.log(JSON.stringify({ q: gd3.featuredSnippet.faq_a1_en, a: gd3.featuredSnippet.faq_a1_en }));