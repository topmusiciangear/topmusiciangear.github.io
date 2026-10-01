const cp = require('child_process');
const base = cp.execSync('git show d556fa5ed5:guides/starter-studio.html', {encoding:'utf8',maxBuffer:1e8});
console.log('EUR cells:', (base.match(/data-price='\u20ac[\d,.]+/g) || []).sort().join(' | '));
console.log('currencies:', [...base.matchAll(/"priceCurrency"\s*:\s*"([A-Z]{3})"/g)].map(m => m[1]).sort().join(','));