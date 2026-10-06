const fs = require('fs');
const g = JSON.parse(fs.readFileSync('data/guides.json', 'utf8'));
const x = g.find(y => y.slug === 'best-digital-pianos');
console.log('idx', g.indexOf(x));
const t = x.productTable;
console.log('cols:', JSON.stringify(t.columns));
t.rows.forEach(r => console.log('  ' + JSON.stringify(r)));
console.log('--- verdict keys:', Object.keys(x.verdictProsCons || {}));
console.log('--- featured:', JSON.stringify(x.featuredProducts));
