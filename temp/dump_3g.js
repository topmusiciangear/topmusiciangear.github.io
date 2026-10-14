const fs = require('fs');
const P = JSON.parse(fs.readFileSync('C:/Users/Daniel/projects/topmusiciangear/data/products.json', 'utf8'));
const arr = Array.isArray(P) ? P : P.products;
[104, 452, 454, 455, 456, 457, 329, 1, 3, 297, 194, 252, 276, 284, 287, 277, 280, 289].forEach(id => {
  const p = arr.find(x => x.id === id);
  if (!p) { console.log('=== ' + id + ' FALTA'); return; }
  console.log('=== ' + id + ' | ' + p.title + ' | $' + p.price);
  console.log('  ' + p.desc);
});
const src = fs.readFileSync('C:/Users/Daniel/projects/topmusiciangear/build-guides.js', 'utf8');
console.log('\n--- TEST ---');
[104, 452, 454, 455, 456, 457, 329, 1, 3, 297, 194, 252, 276, 284, 287, 277, 280, 289].forEach(id => {
  const m = new RegExp('\\n  ' + id + ': \\{[\\s\\S]{0,400}?\\n  \\},').exec(src);
  console.log(id + ': ' + (m ? m[0].replace(/\s+/g, ' ').slice(0, 200) : 'SIN BLOQUE'));
});
const guides = JSON.parse(fs.readFileSync('C:/Users/Daniel/projects/topmusiciangear/data/guides.json', 'utf8'));
['acoustic-guitars-guide', 'best-mic-for-podcasting', 'budget-usb-mics'].forEach(id => {
  const g = guides.find(x => x.id === id);
  const solo = (g.sections || []).filter(s => (s.products || []).length === 1).map(s => s.products[0]);
  console.log('\n### ' + id);
  console.log('featured: ' + JSON.stringify(g.featuredProducts));
  console.log('reviews: ' + JSON.stringify(solo));
  console.log('verdicts: ' + g.verdictProsCons.length);
});