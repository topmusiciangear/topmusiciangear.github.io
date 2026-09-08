var G = require('../data/guides.json');
var ids = ['best-pa-speakers', 'active-vs-passive-pa'];
ids.forEach(function (id) {
  var g = G.find(x => x.id === id);
  if (!g) { console.log(id, 'NOT FOUND'); return; }
  console.log('== ' + id + ' | idx ' + G.indexOf(g) + ' | ' + g.title);
  console.log(' featured: ' + JSON.stringify(g.featuredProducts));
  console.log(' sections: ' + g.sections.length);
  g.sections.forEach(function (s, i) {
    console.log('   sec' + i + ' products=' + JSON.stringify(s.products) + ' | ' + s.heading.slice(0, 60));
  });
  console.log(' vpc: ' + JSON.stringify((g.verdictProsCons || []).map(v => v.name)));
  console.log(' table cols: ' + JSON.stringify((g.productTable && g.productTable.columns || []).map(c => c.title)));
});
// also search for a "best-pa-systems" guide by title fuzzy
var hosts = {};
G.forEach(function (g) { hosts[g.id] = g.title; });
Object.keys(hosts).forEach(function (id) {
  if (/pa-systems|live-sound-pa|pa-systems/.test(id)) console.log('CANDIDATE: ' + id + ' | ' + hosts[id]);
});