const fs = require('fs');
const h = fs.readFileSync('guides/best-digital-pianos.html', 'utf8');
console.log('gear4music data-store count:', (h.match(/data-store="gear4music"/g) || []).length);
['£1,175', '£799', '£839', '£2,146', '£355', '£399', '€505', '€989', '€499'].forEach(p => console.log(p, ':', (h.split(p).length - 1)));

// per-card: find which products render and which stores appear
const cards = h.split('guide-product-card-title">').slice(1);
cards.forEach(c => {
  const title = c.slice(0, 70).split('<')[0];
  const stores = (c.match(/data-store="([a-z]+)"/g) || []).map(s => s.slice(12, -1));
  console.log('CARD:', title, '->', stores.join(','));
});

// products 555-564 exist?
const p = JSON.parse(fs.readFileSync('data/products.json', 'utf8'));
const ids = p.map(x => x.id);
const missing = [];
for (let i = 555; i <= 572; i++) if (!ids.includes(i)) missing.push(i);
console.log('products 555-572 missing from catalog:', missing.join(',') || 'none');
