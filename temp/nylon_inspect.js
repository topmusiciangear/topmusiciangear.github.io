const fs = require('fs');
const g = JSON.parse(fs.readFileSync('data/guides.json', 'utf8'));
const x = g.find(v => v.id === 'best-nylon-guitars-for-beginners');
console.log('keys:', Object.keys(x).join(', '));
console.log('\n--- sections headings (EN) ---');
(x.sections || []).forEach((s, i) => console.log(i, '|', s.heading, '||', s.heading_es));
console.log('\n--- quickfacts-like fields ---');
for (const k of Object.keys(x)) {
  const v = x[k];
  if (typeof v === 'string' && /in\b|mm\b/.test(v) && v.length < 4000) {
    // skip big html
  }
}
console.log(JSON.stringify(x.productTable, null, 2).slice(0, 3000));
