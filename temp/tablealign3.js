const G = require('C:/Users/Daniel/projects/topmusiciangear/data/guides.json');
['best-samplers-drum-computers', 'best-grooveboxes', 'best-digital-pianos', 'stream-controllers'].forEach(id => {
  const g = G.find(x => x.id === id);
  console.log('=== ' + id + ' cols=' + g.productTable.columns.length);
  g.productTable.rows.forEach(r => {
    console.log(' row "' + r.label + '" vals=' + r.values.length);
  });
  // sections products for reference
  console.log(' sections:', g.sections.map(s => (s.heading || '').slice(0, 40) + '=' + JSON.stringify(s.products)).join(' || '));
});