const fs = require('fs');
const p = JSON.parse(fs.readFileSync('data/products.json', 'utf8'));
const prod = p.find(x => x.id === 1053);
if (!prod) { console.error('1053 not found'); process.exit(1); }
prod.price = 499;
prod.stores.zzounds = 'https://www.zzounds.com/item--SENHD490PROPLUS?siid=346774';
prod.stores.musicstore = 'https://www.musicstore.com/en_OE/EUR/Sennheiser-HD-490-Pro-Plus/art-REC0016605-000';
prod.stores.andertons = 'https://www.andertons.co.uk/senneheiser-hd-490-pro-plus-headphones/?search_query=Sennheiser%20HD%20490%20Pro';
fs.writeFileSync('data/products.json', JSON.stringify(p, null, 2), 'utf8');
console.log(JSON.stringify(prod.stores, null, 2));
console.log('price', prod.price);
console.log('done');
