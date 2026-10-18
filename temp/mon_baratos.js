const fs = require('fs');
const p = JSON.parse(fs.readFileSync('data/products.json', 'utf8'));
const m = p.filter(x => x.category === 'monitors' && Number(x.price) <= 160).sort((a, b) => a.price - b.price);
console.log('MONITORES EN CATALOGO <= $160:');
m.forEach(x => {
  const st = Object.keys(x.stores || {});
  console.log('  ' + String(x.id).padEnd(5) + String(x.title).slice(0, 33).padEnd(34) +
    ('$' + x.price).padEnd(10) + String(st.length) + ' tiendas  ' + (x.image ? 'img' : 'SIN IMG') + '  ' + st.join(','));
});
console.log('total: ' + m.length);
