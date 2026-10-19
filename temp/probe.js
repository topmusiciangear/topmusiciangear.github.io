const fs = require('fs');
const B = 'C:/Users/Daniel/projects/topmusiciangear/';
const guides = JSON.parse(fs.readFileSync(B + 'data/guides.json', 'utf8'));
const g = guides.find(x => x.id === 'fix-clipping-scarlett');

console.log('sections:', g.sections ? g.sections.length : 0);
if (g.sections) {
  g.sections.forEach((s, i) => {
    console.log('  Section ' + i + ': products=' + (s.products ? s.products.length : 0));
    if (s.products) console.log('    ', s.products);
  });
}