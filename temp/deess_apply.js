const fs = require('fs');
const B = 'C:/Users/Daniel/projects/topmusiciangear/';
const products = JSON.parse(fs.readFileSync(B + 'data/products.json', 'utf8'));
const p = products.find(x => x.id === 1027);
if (!p) { console.log('1027 NO EXISTE'); process.exit(1); }
p.image = 'https://banners.pluginboutique.com/f0ra3uhncubiuc7j5lkjzv380y7b';
p.img = 'https://banners.pluginboutique.com/f0ra3uhncubiuc7j5lkjzv380y7b';
fs.writeFileSync(B + 'data/products.json', JSON.stringify(products, null, 2), 'utf8');
console.log('1027 foto OK: ' + p.brand + ' ' + p.title);
