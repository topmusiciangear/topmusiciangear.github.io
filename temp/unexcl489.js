const fs = require('fs');
const P = JSON.parse(fs.readFileSync('data/products.json', 'utf8'));
const p = P.find(x => x.id === 489);
p.excludeStores = (p.excludeStores || []).filter(k => k !== 'gear4music');
if (!p.excludeStores.length) delete p.excludeStores;
fs.writeFileSync('data/products.json', JSON.stringify(P, null, 2));
console.log('excludeStores now:', JSON.stringify(P.find(x => x.id === 489).excludeStores || null));