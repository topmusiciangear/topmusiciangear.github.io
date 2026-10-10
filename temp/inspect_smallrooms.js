const fs = require('fs');
const g = JSON.parse(fs.readFileSync('data/guides.json', 'utf8'));
const guide = g.find(x => x.id === 'best-monitors-for-small-rooms');
console.log('ROWS:');
guide.productTable.rows.forEach(r => console.log(' - ' + r.label + ' / ' + (r.label_es || '')));
const blob = JSON.stringify({
  c: guide.conclusion, ce: guide.conclusion_es,
  v: guide.verdict, ve: guide.verdict_es,
  fs: guide.featuredSnippet
});
const parts = blob.split('Rokit');
console.log('ROKIT MENTIONS:', parts.length - 1);
for (let i = 1; i < parts.length && i < 12; i++) {
  console.log(' * Rokit' + parts[i].slice(0, 60).replace(/\s+/g, ' '));
}
// check other guides referencing product 20
const refs = [];
g.forEach(gd => {
  const s = JSON.stringify(gd);
  if (gd.id !== 'best-monitors-for-small-rooms' && s.includes('"products":[20') || (gd.featuredProducts || []).includes(20)) {
    refs.push(gd.id);
  }
});
console.log('OTHER GUIDES USING PID 20:', JSON.stringify(refs));
