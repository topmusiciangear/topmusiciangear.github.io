var G = require('../data/guides.json');
['live-sound-pa', 'budget-pa-systems'].forEach(function (id) {
  var g = G.find(x => x.id === id);
  if (!g) { console.log(id, 'NOT FOUND'); return; }
  console.log('== ' + id + ' | idx ' + G.indexOf(g) + ' | ' + g.title);
  console.log(' featured: ' + JSON.stringify(g.featuredProducts));
  console.log(' sections: ' + g.sections.length);
  g.sections.forEach(function (s, i) {
    console.log('   sec' + i + ' products=' + JSON.stringify(s.products) + ' | ' + s.heading.slice(0, 70));
  });
  console.log(' vpc: ' + JSON.stringify((g.verdictProsCons || []).map(v => v.name)));
  console.log(' table cols: ' + JSON.stringify((g.productTable && g.productTable.columns || []).map(c => c.title)));
  console.log(' table rows labels: ' + JSON.stringify((g.productTable && g.productTable.rows || []).map(r => r.label)));
});