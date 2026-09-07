const fs = require('fs');
const guides = JSON.parse(fs.readFileSync('./data/guides.json', 'utf8'));
const guide = guides.find((g) => g.id === 'studio-subwoofers-setup');
const full = JSON.stringify(guide);
[471, 469, 338].forEach((id) => {
  const found = full.includes(JSON.stringify(id)) || full.includes('[' + id + ']') || full.includes(',' + id + ',');
  console.log('old id', id, 'referenced in guide:', found);
});
console.log('section product refs:', guide.sections.map((s) => JSON.stringify(s.products)).join(' | '));
console.log('featuredProducts:', JSON.stringify(guide.featuredProducts));
