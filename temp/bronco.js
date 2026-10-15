const fs = require('fs');
const BASE = 'C:/Users/Daniel/projects/topmusiciangear/';
const P = JSON.parse(fs.readFileSync(BASE + 'data/products.json', 'utf8'));
const arr = Array.isArray(P) ? P : P.products;
const guides = JSON.parse(fs.readFileSync(BASE + 'data/guides.json', 'utf8'));
const b = fs.readFileSync(BASE + 'build-guides.js', 'utf8');
[536, 680].forEach(id => {
  console.log('\n=== id ' + id + ' ===');
  const p = arr.find(x => x.id === id);
  console.log('  ' + p.title + ' | $' + p.price + ' | cat ' + p.category);
  console.log('  img: ' + p.img);
  console.log('  tiendas: ' + Object.keys(p.stores || {}).join(', '));
  console.log('  desc: ' + String(p.desc || '').slice(0, 150));
  const re = new RegExp('(^|\\n)\\s*' + id + ':\\s*\\{[\\s\\S]*?\\n\\s*\\},', 'm');
  const m = b.match(re);
  console.log('  TEST_SHOP_BTN: ' + (m ? m[0].trim().replace(/\s+/g, ' ').slice(0, 220) : 'NO TIENE'));
  const usos = [];
  guides.forEach(g => {
    if ((g.featuredProducts || []).indexOf(id) > -1) usos.push(g.id + ' (featured)');
    (g.sections || []).forEach((s, i) => { if ((s.products || []).indexOf(id) > -1) usos.push(g.id + ' sec ' + i); });
  });
  console.log('  usado en: ' + (usos.length ? usos.join(', ') : 'NINGUNA GUIA'));
});