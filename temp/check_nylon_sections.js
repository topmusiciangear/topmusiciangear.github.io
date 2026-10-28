const fs = require('fs');
const raw = JSON.parse(fs.readFileSync('data/guides.json', 'utf8'));
const arr = Array.isArray(raw) ? raw : (raw.guides || Object.values(raw));
const g = arr.find(x => x && (x.id === 'best-nylon-guitars-for-beginners' || x.slug === 'best-nylon-guitars-for-beginners'));
if (!g) { console.log('not found; keys sample:', arr.slice(0,3).map(x=>x&&x.id)); process.exit(1); }
console.log('products:', JSON.stringify(g.products));
g.sections.forEach((s, i) => {
  console.log(i, JSON.stringify(s.products), '|', (s.heading || '').slice(0, 70), '| split:', !!s.splitProducts, '| skipMedia:', !!s.skipMedia);
});
