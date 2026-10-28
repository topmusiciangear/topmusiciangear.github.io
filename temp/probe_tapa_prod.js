const fs = require('fs');
const raw = fs.readFileSync('data/products.json', 'utf8');
let i = -1;
while ((i = raw.indexOf('tapa sólida', i + 1)) >= 0) {
  const ctx = raw.slice(Math.max(0, i - 200), i + 120).replace(/\s+/g, ' ');
  const idm = raw.slice(0, i).lastIndexOf('"id": ');
  console.log('id~' + raw.slice(idm + 6, idm + 12).trim(), '::', ctx, '\n');
}
