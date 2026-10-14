var fs = require('fs');
var g = JSON.parse(fs.readFileSync('data/guides.json', 'utf8'));
function byId(id) { return g.find(function (x) { return x.id === id; }); }

function getPath(obj, path) {
  var parts = path.split(/[.\[\]]+/).filter(Boolean);
  return parts.reduce(function (o, k) { return o == null ? o : o[k]; }, obj);
}
function show(id, field) { var x = byId(id); console.log('[' + id + '].' + field + ' = ' + JSON.stringify(getPath(x, field))); }

show('starter-studio', 'verdictProsCons[0].pros[3]');
show('starter-studio', 'verdictProsCons[0].pros_es[3]');
show('best-monitors-for-small-rooms', 'verdictProsCons[3].name');
show('best-monitors-for-small-rooms', 'verdictProsCons[7].name');
show('best-monitors-for-small-rooms', 'verdictProsCons[3].pros[3]');
show('best-monitors-for-small-rooms', 'verdictProsCons[7].cons[0]');
show('best-monitors-for-small-rooms', 'verdictProsCons[8].name');
show('best-monitors-for-small-rooms', 'verdictProsCons[7].name_es');
show('best-monitors-for-small-rooms', 'verdictProsCons[3].name_es');
show('best-monitors-for-small-rooms', 'verdictProsCons[3].cons[0]');
show('best-monitors-for-small-rooms', 'verdictProsCons[3].pros_es[3]');
show('best-monitors-for-small-rooms', 'verdictProsCons[7].cons_es[0]');

['starter-studio', 'monitor-setup', 'sm57-vs-sm58', 'adam-vs-genelec', 'jbl-vs-kali', 'atc-vs-genelec', 'best-monitors', 'budget-interfaces', 'budget-pa-systems'].forEach(function (id) {
  var x = byId(id);
  var fs2 = x.featuredSnippet || {};
  Object.keys(fs2).sort().forEach(function (k) {
    if (/^faq/.test(k) && typeof fs2[k] === 'string' && /_es$/.test(k)) {
      var pair = k.replace(/_es$/, '');
      if (fs2[pair] && /\(\s*(each|a pair|per pair| cada uno|el par| por par)/.test(fs2[pair])) console.log('NUK ' + id + '.' + k + ' = ' + JSON.stringify(fs2[k]));
    }
  });
});

var prods = JSON.parse(fs.readFileSync('data/products.json', 'utf8'));
['LCT', 'iLoud', 'MTM', '8351B', 'Scarlett 2i2 4th', 'A7V', 'KRK Rokit', 'Volt', 'Catalyst'].forEach(function (q) {
  prods.forEach(function (x) { if ((x.title || '').toLowerCase().indexOf(q.toLowerCase()) >= 0) console.log('CAT ' + q + ' => ' + x.id + ' | ' + x.title + ' | $' + x.price); });
});

console.log('\n== stage-wireless all faq fields ==');
var sw = byId('stage-wireless');
Object.keys(sw).sort().forEach(function (k) { if (/faq/i.test(k)) console.log(k + ' = ' + JSON.stringify(sw[k])); });