const fs = require('fs');
const g = JSON.parse(fs.readFileSync('data/guides.json', 'utf8'));
const x = g.find(v => v.id === 'best-nylon-guitars-for-beginners');
const s = x.sections[6];
console.log('section keys:', Object.keys(s).join(', '));
console.log(JSON.stringify({ id: s.id, products: s.products, product: s.product, headings: s.heading }, null, 1));
// who references 273 / 554 by any means
const raw = fs.readFileSync('data/guides.json', 'utf8');
for (const id of [273, 554, 459]) {
  const re = new RegExp('"(?:products|[a-zA-Z_]*ids?)":\\s*\\[[^\\]]*\\b' + id + '\\b', 'g');
  const m = raw.match(re);
  console.log(id, 'array-refs:', m ? m.length : 0, m ? m.slice(0, 3) : '');
}
