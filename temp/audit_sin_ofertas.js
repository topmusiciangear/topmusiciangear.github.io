const fs = require('fs'), path = require('path');
const B = 'C:/Users/Daniel/projects/topmusiciangear/guides/';
const files = fs.readdirSync(B).filter(f => f.endsWith('.html'));
let sinOfertas = [];
files.forEach(f => {
  const d = fs.readFileSync(path.join(B, f), 'utf8');
  // bloques Product en JSON-LD sin offers/review/aggregateRating
  [...d.matchAll(/"@type":\s*"Product"([\s\S]{0,3000}?)(?="position"|"@type":\s*"(Product|ItemList|FAQPage|Article|WebPage|BreadcrumbList)"|$)/g)].forEach(m => {
    const b = m[1];
    if (!/"offers"|"review"|"aggregateRating"/.test(b)) {
      const nm = ((b.match(/"name":\s*"([^"]{0,60})/) || [])[1] || '?');
      sinOfertas.push(f + ' :: ' + nm);
    }
  });
});
console.log('items Product sin offers/review/aggregateRating: ' + sinOfertas.length);
[...new Set(sinOfertas)].slice(0, 20).forEach(x => console.log('  - ' + x));
