const fs = require('fs');
const BASE = 'C:/Users/Daniel/projects/topmusiciangear/';
const P = JSON.parse(fs.readFileSync(BASE + 'data/products.json', 'utf8'));
const arr = Array.isArray(P) ? P : P.products;
[536, 639].forEach(id => {
  const p = arr.find(x => x.id === id);
  console.log('\n===== id ' + id + ': ' + p.title);
  console.log('price: $' + p.price);
  console.log('img  : ' + p.img);
  console.log('stores:');
  Object.keys(p.stores || {}).forEach(k => console.log('   ' + k + ': ' + p.stores[k]));
  console.log('excludeStores: ' + JSON.stringify(p.excludeStores || []));
});
const b = fs.readFileSync(BASE + 'build-guides.js', 'utf8');
[536, 639].forEach(id => {
  const m = b.match(new RegExp('(^|\\n)\\s*' + id + ':\\s*\\{[\\s\\S]*?\\n\\s*\\},', 'm'));
  console.log('\n=== TEST_SHOP_BTN ' + id + ' ===');
  console.log(m ? m[0].trim() : 'NO TIENE');
});