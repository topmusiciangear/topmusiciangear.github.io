const fs = require('fs');
const products = JSON.parse(fs.readFileSync('C:/Users/Daniel/projects/topmusiciangear/data/products.json', 'utf8'));
[73, 376, 518, 648, 670, 564, 679, 234, 110, 18].forEach(id => {
  const p = products.find(x => x.id === id);
  console.log('=== ' + id + ' ' + p.title);
  console.log('  EN: ' + p.desc);
  console.log('  ES: ' + p.desc_es + '\n');
});