var g = require('C:/Users/Daniel/projects/topmusiciangear/data/guides.json');
function getPath(o, p) { return p.split(/[.\[\]]+/).filter(Boolean).reduce(function (a, k) { return a == null ? a : a[k]; }, o); }
function byId(id) { return g.find(function (x) { return x.id === id; }); }

console.log('== budget-pa-systems ==');
var p = byId('budget-pa-systems');
console.log('price1=' + JSON.stringify(p.price1) + ' price2=' + JSON.stringify(p.price2) + ' rating1=' + JSON.stringify(p.rating1) + ' rating2=' + JSON.stringify(p.rating2));
(p.productTable && p.productTable.rows || []).forEach(function (r, i) { console.log('row[' + i + '].label=' + JSON.stringify(r.label) + ' values=' + JSON.stringify((r.values || []).map(function (v) { return v.value; })) + ' values_es=' + JSON.stringify((r.values || []).map(function (v) { return v.value_es; }))); });

console.log('\n== budget-bass-like-expensive ==');
var b = byId('budget-bass-like-expensive');
console.log('price1=' + JSON.stringify(b.price1) + ' price2=' + JSON.stringify(b.price2));
(b.productTable && b.productTable.rows || []).forEach(function (r, i) { console.log('row[' + i + '].label=' + JSON.stringify(r.label)); });

console.log('\n== ts9-vs-bd2 ==');
var t = byId('ts9-vs-bd2');
console.log('price1=' + JSON.stringify(t.price1) + ' price2=' + JSON.stringify(t.price2));

console.log('\n== xr18 guides ==');
['xr18-vs-m32r', 'xr18-vs-cq18t'].forEach(function (id) {
  var x = byId(id);
  console.log('[' + id + '] price1=' + JSON.stringify(x.price1) + ' price2=' + JSON.stringify(x.price2) + ' rating1=' + JSON.stringify(x.rating1) + ' rating2=' + JSON.stringify(x.rating2));
});

console.log('\n== pro-daw ==');
var pd = byId('pro-daw');
console.log('price1=' + JSON.stringify(pd.price1) + ' price2=' + JSON.stringify(pd.price2));
console.log('featuredSnippet keys: ' + JSON.stringify(Object.keys(pd.featuredSnippet)));
Object.keys(pd.featuredSnippet).forEach(function (k) { var v = pd.featuredSnippet[k]; if (typeof v === 'string') console.log('  ' + k + '=' + JSON.stringify(v)); });
(pd.comparison && pd.comparison.rows || []).forEach(function (r, i) { if (/(perpetual|year|yr|dollar|licen|null)/i.test(r.val1 + r.val2)) console.log('  cmp row[' + i + '].val1=' + JSON.stringify(r.val1) + ' val2=' + JSON.stringify(r.val2)); });

console.log('\n== budget-interfaces ==');
var bi = byId('budget-interfaces');
console.log('price1=' + JSON.stringify(bi.price1) + ' price2=' + JSON.stringify(bi.price2));
console.log('conclusion=' + JSON.stringify(bi.conclusion));
console.log('conclusion_es=' + JSON.stringify(bi.conclusion_es));

console.log('\n== best-live-sound-mixers prose ==');
var lm = byId('best-live-sound-mixers');
console.log(JSON.stringify(lm.conclusion).slice(0, 400));