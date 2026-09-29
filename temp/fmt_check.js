const fs = require('fs');
const g = JSON.parse(fs.readFileSync('data/guides.json', 'utf8'));
const gu = g.find(x => x.id === 'best-electric-guitars-2026');
const s7 = gu.sections[6];
console.log('section7 heading:', s7.heading);
console.log('section7 products:', JSON.stringify(s7.products));
console.log('featuredProducts:', JSON.stringify(gu.featuredProducts));
const txt = JSON.stringify(s7);
console.log('PRS mentions in section7:', (txt.match(/PRS[^"]{0,60}/g) || []).join(' | '));
console.log('PRS mentions whole guide:', (JSON.stringify(gu).match(/PRS[^"]{0,50}/g) || []).slice(0, 20).join(' | '));
const p = JSON.parse(fs.readFileSync('data/products.json', 'utf8'));
const list = Array.isArray(p) ? p : (p.products || Object.values(p));
[312, 320].forEach(id => {
  const e = list.find(x => x.id === id);
  console.log('product ' + id + ':', e.title, '| desc:', (e.desc || '').slice(0, 90));
});
