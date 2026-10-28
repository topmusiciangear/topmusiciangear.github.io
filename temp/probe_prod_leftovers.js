const fs = require('fs');
const arr = JSON.parse(fs.readFileSync('data/products.json', 'utf8'));
const ids = [459, 553, 1058, 1059, 1060, 1061, 1062, 1063, 1064, 1065];
const needles = ['tapa sólida', 'Tapa sólida', 'punchy', '50.8', 'electro-clásica', 'sin romper la banca', 'jugabilidad', 'se siente rápido', 'jugadores', 'arranque listo'];
for (const id of ids) {
  const p = arr.find(x => x.id === id);
  const s = JSON.stringify({ desc: p.desc, desc_es: p.desc_es, facts: p.facts, stores: p.stores });
  const hits = needles.filter(n => s.includes(n));
  if (hits.length) console.log(id, '->', hits.join(', '));
}
console.log('\n-- global counts in file --');
const raw = fs.readFileSync('data/products.json', 'utf8');
for (const n of needles) console.log((raw.split(n).length - 1) + ' | ' + n);
