const fs = require('fs');
const P = JSON.parse(fs.readFileSync('C:/Users/Daniel/projects/topmusiciangear/data/products.json', 'utf8'));
const arr = Array.isArray(P) ? P : P.products;
[62, 63, 223, 224, 18, 5, 208, 214, 215].forEach(id => {
  const p = arr.find(x => x.id === id);
  console.log('\n=== ' + id + ' === ' + (p ? p.title : 'FALTA'));
  if (!p) return;
  console.log('  $' + p.price + ' | ' + p.category + ' | img: ' + String(p.img).slice(0, 80));
  console.log('  desc: ' + p.desc);
  console.log('  desc_es: ' + (p.desc_es || 'NO'));
});
const src = fs.readFileSync('C:/Users/Daniel/projects/topmusiciangear/build-guides.js', 'utf8');
console.log('\n--- precios TEST_SHOP_BTN ---');
[62, 63, 223, 224].forEach(id => {
  const re = new RegExp('\\n  ' + id + ': \\{[\\s\\S]{0,500}?\\n  \\},');
  const m = re.exec(src);
  console.log(id + ': ' + (m ? m[0].replace(/\s+/g, ' ').slice(0, 260) : 'sin bloque'));
});