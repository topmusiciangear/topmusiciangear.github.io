const fs = require('fs');
const B = 'C:/Users/Daniel/projects/topmusiciangear/';
const products = JSON.parse(fs.readFileSync(B + 'data/products.json', 'utf8'));
const bg = fs.readFileSync(B + 'build-guides.js', 'utf8');
const a = bg.indexOf('const TEST_SHOP_BTN = {');
const seg = bg.slice(a, a + 140000);
[1025, 472, 1027, 1028, 1030].forEach(id => {
  const p = products.find(x => x.id === id);
  const re = new RegExp('\\n' + id + ':\\s*\\{');
  const i = seg.search(re);
  console.log(id + ' price-field=' + p.price + ' | TEST: ' + (i > -1 ? seg.slice(i + 1, i + 220).replace(/\n\s*/g, ' ') : 'SIN ENTRADA'));
});
