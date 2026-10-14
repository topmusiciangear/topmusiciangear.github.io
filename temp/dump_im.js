const fs = require('fs');
const P = JSON.parse(fs.readFileSync('C:/Users/Daniel/projects/topmusiciangear/data/products.json', 'utf8'));
const arr = Array.isArray(P) ? P : P.products;
[51, 52, 207, 215, 214, 226, 5, 206, 208, 209].forEach(id => {
  const p = arr.find(x => x.id === id);
  if (!p) { console.log('=== ' + id + ' FALTA'); return; }
  console.log('=== ' + id + ' | ' + p.title + ' | $' + p.price);
  console.log('  ' + p.desc);
  console.log('  ES: ' + (p.desc_es || 'NO'));
});
const src = fs.readFileSync('C:/Users/Daniel/projects/topmusiciangear/build-guides.js', 'utf8');
console.log('\n--- TEST_SHOP_BTN ---');
[51, 52, 207, 215, 214, 226, 5, 206, 208, 209].forEach(id => {
  const m = new RegExp('\\n  ' + id + ': \\{[\\s\\S]{0,420}?\\n  \\},').exec(src);
  console.log(id + ': ' + (m ? m[0].replace(/\s+/g, ' ').slice(0, 240) : 'sin bloque'));
});