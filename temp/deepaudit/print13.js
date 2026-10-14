var g = require('C:/Users/Daniel/projects/topmusiciangear/data/guides.json');
function byId(id) { return g.find(function (x) { return x.id === id; }); }
['budget-pa-systems', 'budget-bass-like-expensive', 'ts9-vs-bd2', 'xr18-vs-m32r', 'xr18-vs-cq18t', 'budget-interfaces', 'best-live-sound-mixers'].forEach(function (id) {
  var s = byId(id).featuredSnippet || {};
  console.log('== ' + id + ' ==');
  ['price1', 'price2', 'rating1', 'rating2'].forEach(function (k) { console.log('  ' + k + '=' + JSON.stringify(s[k])); });
});

var bb = byId('budget-bass-like-expensive');
['Body Wood', 'Pickups', 'Electronics', 'Tuners'].forEach(function (lbl) {
  var r = bb.productTable.rows.find(function (r) { return r.label === lbl; });
  if (r) { console.log('budget-bass row ' + JSON.stringify(lbl) + ' values=' + JSON.stringify(r.values.map(function (v) { return v.value; })) + ' es=' + JSON.stringify(r.values.map(function (v) { return v.value_es; }))); }
});

console.log('\n== grep "It is easier" ==');
g.forEach(function (x, i) { (function walk(o) { if (typeof o === 'string' && o.indexOf('It is easier') >= 0) console.log('[' + i + '] ' + o.match(/[^"]{0,80}It is easier[^"]{0,40}/)[0]); else if (o && typeof o === 'object') Object.keys(o).forEach(function (k) { walk(o[k]); }); })(x); });
console.log('== grep "less is the smarter" ==');
g.forEach(function (x, i) { (function walk(o) { if (typeof o === 'string' && o.indexOf('less is the smarter') >= 0) console.log('[' + i + '] ' + o.match(/[^"]{0,60}less is the smarter[^"]{0,40}/)[0]); else if (o && typeof o === 'object') Object.keys(o).forEach(function (k) { walk(o[k]); }); })(x); });