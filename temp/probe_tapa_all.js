const fs = require('fs');
for (const f of ['data/guides.json', 'data/products.json']) {
  const raw = fs.readFileSync(f, 'utf8');
  for (const n of ['tapa sólida', 'Tapa sólida', 'tapas sólidas', 'Tapas sólidas']) {
    const c = raw.split(n).length - 1;
    if (c) console.log(f, c, '|', n);
  }
}
// where in guides.json
const raw = fs.readFileSync('data/guides.json', 'utf8');
let i = -1;
const seen = {};
while ((i = raw.indexOf('tapa sólida', i + 1)) >= 0) {
  const gid = raw.slice(0, i).lastIndexOf('"id": "');
  const id = raw.slice(gid + 7, raw.indexOf('"', gid + 7));
  seen[id] = (seen[id] || 0) + 1;
}
i = -1;
while ((i = raw.indexOf('Tapa sólida', i + 1)) >= 0) {
  const gid = raw.slice(0, i).lastIndexOf('"id": "');
  const id = raw.slice(gid + 7, raw.indexOf('"', gid + 7));
  seen[id] = (seen[id] || 0) + 1;
}
console.log('guides.json by guide:', JSON.stringify(seen, null, 1));
