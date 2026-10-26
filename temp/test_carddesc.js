const fs = require('fs');
const src = fs.readFileSync('build-guides.js', 'utf8');
const m = src.match(/const CARD_DESC_LIMIT[\s\S]*?\n}\n/)[0];
eval(m);
const d = JSON.parse(fs.readFileSync('data/products.json', 'utf8'));
const rows = [];
for (const p of d) {
  for (const f of ['desc', 'desc_es']) {
    const t = p[f] || '';
    if (t.length > 380) rows.push([t.length, f, p.id, p.title.slice(0, 30), cardDesc(t)]);
  }
}
rows.sort((a, b) => b[0] - a[0]);
console.log('affected (source >380):', rows.length);
for (const r of rows.slice(0, 4)) {
  console.log('---', r[0], r[1], r[2], r[3]);
  console.log('  ->', r[4].length, JSON.stringify(r[4].slice(0, 150)));
  console.log('  end:', JSON.stringify(r[4].slice(-70)));
}
const bad = rows.filter(r => !/[.!?]["')\]]?$/.test(r[4]) || r[4].length > 430);
console.log('bad', bad.length, bad.slice(0, 3).map(b => [b[2], b[4].slice(-50)]));
