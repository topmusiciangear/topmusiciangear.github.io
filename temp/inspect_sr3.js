const fs = require('fs');
const d = JSON.parse(fs.readFileSync('data/products.json', 'utf8'));
[20, 116].forEach(id => {
  console.log('=== PRODUCT ' + id + ' ===');
  console.log(JSON.stringify(d.find(x => x.id === id), null, 1));
});
const g = JSON.parse(fs.readFileSync('data/guides.json', 'utf8'));
const guide = g.find(x => x.id === 'best-monitors-for-small-rooms');
console.log('=== TITLE/DESC ===');
console.log('title: ' + guide.title);
console.log('description: ' + guide.description);
console.log('description_es: ' + guide.description_es);
const bg = fs.readFileSync('build-guides.js', 'utf8');
const lines = bg.split('\n');
lines.forEach((l, i) => {
  if (/^\s*20:/.test(l) || /^\s*116:/.test(l)) console.log('BTN line ' + (i + 1) + ': ' + l.slice(0, 400));
});
