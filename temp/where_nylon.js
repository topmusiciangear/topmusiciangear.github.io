const fs = require('fs');
const g = JSON.parse(fs.readFileSync('data/guides.json', 'utf8'));
const ids = [273, 459, 553, 554, 1058, 1059, 1060, 1061, 1062, 1063, 1064, 1065];
for (const id of ids) {
  const hits = [];
  for (const gd of g) {
    const inTable = (gd.productTable?.columns || []).some(c => String(c.product_id) === String(id) || String(c.id) === String(id));
    const txt = JSON.stringify(gd).includes('"product_id":' + id);
    if (inTable || txt) hits.push(gd.id);
  }
  console.log(id + ' -> ' + (hits.join(', ') || '(no guide)'));
}
