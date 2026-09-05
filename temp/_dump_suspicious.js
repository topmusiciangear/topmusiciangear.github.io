const fs = require('fs');
const prods = JSON.parse(fs.readFileSync('data/products.json', 'utf8'));
const ids = [53, 170, 270, 272, 273, 274, 275, 295, 296, 414, 415, 416, 417, 418, 429, 430, 431, 432, 433, 434];
for (const id of ids) {
  const it = prods.find(x => x.id === id);
  if (!it) { console.log(`[${id}] NOT FOUND`); continue; }
  const st = Object.keys(it.stores || {});
  console.log(`[${id}] "${it.title}" brand=${JSON.stringify(it.brand)} rating=${it.rating} reviews=${it.reviews} price=${it.price} stores=[${st}] oos=${JSON.stringify(it.oos)}`);
}
const prod = prods.find(x => x.id === 53);
if (prod && prod.stores && prod.stores.musicstore) console.log('\nid53 musicstore:', prod.stores.musicstore);
const oosBad = prods.filter(p => (p.oos || []).some(s => !(p.stores || {})[s]));
console.log('\noos referencing missing store:', oosBad.map(p => `[${p.id}] ${p.title} oos=${JSON.stringify(p.oos)} stores=${Object.keys(p.stores||{})}`).join(' | '));