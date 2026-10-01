const fs = require('fs');
const now = fs.readFileSync('guides/starter-studio.html', 'utf8');
console.log('EUR cells:', (now.match(/data-price='\u20ac[\d,.]+/g) || []).sort().join(' | '));
console.log('currencies:', [...now.matchAll(/"priceCurrency"\s*:\s*"([A-Z]{3})"/g)].map(m => m[1]).sort().join(','));

const G = JSON.parse(fs.readFileSync('data/guides.json', 'utf8'));
const g = G.find(x => x.id === 'starter-studio');
console.log('\nGuide productTable columns:', g.productTable.columns.map(c => c.title));
console.log('Guide productTable rows:', g.productTable.rows.map(r => r.label));