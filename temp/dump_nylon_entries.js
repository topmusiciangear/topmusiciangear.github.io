const fs = require('fs');
const t = fs.readFileSync('data/products.json', 'utf8');
for (const id of [1058, 1059, 1060, 1061, 1062, 1063, 1064, 1065]) {
  const i = t.indexOf('"id": ' + id + ',');
  const j = t.indexOf('\n    },', i);
  console.log('=== ' + id + ' ===');
  console.log(t.slice(i, j + 7));
}
