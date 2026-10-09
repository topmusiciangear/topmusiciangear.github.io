const fs = require('fs');
const g = JSON.parse(fs.readFileSync('data/guides.json', 'utf8'));
['channel-strip-plugins', 'vocal-plugins'].forEach(id => {
  const guide = g.find(x => x.id === id);
  console.log('=== ' + id + ' ===');
  console.log('table cols: ' + guide.productTable.columns.map(c => c.title).join(' | '));
  guide.sections.forEach((s, i) => {
    if (s.products && s.products.length) console.log(' sec' + i + ' ' + JSON.stringify(s.products) + ' :: ' + (s.heading || '').slice(0, 55));
  });
  console.log('PC: ' + guide.verdictProsCons.map(v => v.name).join(' | '));
  console.log('FP: ' + JSON.stringify(guide.featuredProducts));
});
