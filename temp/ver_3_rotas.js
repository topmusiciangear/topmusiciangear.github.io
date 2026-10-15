const fs = require('fs');
const p = JSON.parse(fs.readFileSync('C:/Users/Daniel/projects/topmusiciangear/data/products.json', 'utf8'));
[360, 595, 667].forEach(id => {
  const x = p.find(y => y.id === id);
  console.log('\n=== ' + id + '  ' + x.title + ' ===');
  console.log('  img  : ' + x.img);
  console.log('  brand: ' + x.brand + '   cat: ' + x.category + '   precio: ' + x.price);
  console.log('  stores:');
  Object.entries(x.stores || {}).forEach(([k, v]) => console.log('     ' + k.padEnd(12) + v));
});
