const fs = require('fs');
const B = 'C:/Users/Daniel/projects/topmusiciangear/';
const products = JSON.parse(fs.readFileSync(B + 'data/products.json', 'utf8'));

const hosts = {};
products.forEach(x => { const m = (x.img || '').match(/^https?:\/\/([^/]+)/); const h = m ? m[1] : 'SIN IMG'; hosts[h] = (hosts[h] || 0) + 1; });
console.log('=== HOSTS (campo correcto: img) ===');
Object.entries(hosts).sort((a, b) => b[1] - a[1]).forEach(([h, n]) => console.log('  ' + String(n).padEnd(5) + h));

console.log('\n=== LOS 7 CANDIDATOS <$150 ===');
[116, 684].forEach(id => {
  const p = products.find(x => x.id === id);
  console.log('  ' + id + ' | ' + p.title);
  console.log('      img: ' + (p.img || 'NINGUNA'));
  console.log('      unit: ' + p.unit + ' / ' + p.unit_es + ' | rating: ' + p.rating + ' (' + p.reviews + ')');
});

console.log('\n=== MONITORES CON img Y SIN img ===');
const mon = products.filter(x => x.category === 'monitors');
console.log('  con img: ' + mon.filter(x => x.img).length + ' | sin img: ' + mon.filter(x => !x.img).length);
mon.filter(x => !x.img).forEach(x => console.log('    SIN IMG: ' + x.id + ' ' + x.title));
