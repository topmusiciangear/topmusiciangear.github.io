const fs = require('fs');
const DIR = 'C:/Users/Daniel/projects/topmusiciangear/';
const raw = fs.readFileSync(DIR + 'data/guides.json', 'utf8');
// where is the FAQ stored?
let i = raw.indexOf('Which digital piano is the best for home use?');
console.log('FAQ Q1 at char:', i);
if (i > -1) {
  // find enclosing key by scanning backwards for a "key": pattern at low depth
  const pre = raw.slice(Math.max(0, i - 6000), i);
  const keys = [...pre.matchAll(/"([a-zA-Z_]+)"\s*:/g)].map(m => m[1]);
  console.log('recent keys:', keys.slice(-12).join(', '));
}
const G = JSON.parse(raw);
const g = G.find(x => x.id === 'best-digital-pianos');
const t = g.productTable;
console.log('productTable keys:', Object.keys(t).join(', '));
const rows = t.rows || t.data || t.body || [];
console.log('rows:', rows.length);
rows.forEach((r, ri) => {
  const cells = r.cells || r.cols || r.row || r;
  const vals = (Array.isArray(cells) ? cells : Object.values(cells)).map(c => (typeof c === 'string' ? c : (c.en || c.text || JSON.stringify(c))).toString().slice(0, 46));
  console.log('R' + ri + ':', vals.join(' | '));
});
