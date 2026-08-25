const fs = require('fs');
const g = JSON.parse(fs.readFileSync('data/guides.json', 'utf8'));
let removed = 0;
g.forEach(h => {
  if (h.productTable && h.productTable.rows) {
    const before = h.productTable.rows.length;
    h.productTable.rows = h.productTable.rows.filter(r => {
      const label = (r.label || r.label_es || '').toLowerCase();
      if (label.includes('price') || label.includes('precio')) {
        return false;
      }
      return true;
    });
    if (h.productTable.rows.length < before) {
      removed += before - h.productTable.rows.length;
      console.log(h.id + ': removed ' + (before - h.productTable.rows.length) + ' price rows');
    }
  }
});
fs.writeFileSync('data/guides.json', JSON.stringify(g, null, 2));
console.log('Total price rows removed:', removed);
