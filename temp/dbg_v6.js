const fs = require('fs');
const d = JSON.parse(fs.readFileSync('data/products.json', 'utf8'));
const src = fs.readFileSync('temp/card_v6.js', 'utf8');
// reuse helpers from card_v6 by eval of everything before the buckets section
const upto = src.slice(0, src.indexOf('const buckets'));
eval(upto.replace(/const d = JSON\.parse[^;]+;/, ''));

for (const id of [557, 488, 330, 470]) {
  const p = d.find(x => x.id === id);
  const f = id === 470 ? 'desc' : 'desc_es';
  const t = p[f];
  console.log('===', id, f, wc(t));
  const sentences = t.split(/(?<=[.!?])\s+(?=[A-Z\u00C0-\u00DE\u00BF\u00A1"'0-9(])/).filter(Boolean);
  sentences.forEach((s, i) => console.log('  S' + i, wc(s), JSON.stringify(s.slice(0, 60))));
  console.log('  OUT:', JSON.stringify(cardDesc(t)));
  // show cuts of sentence 1
  if (sentences[1]) {
    console.log('  CUTS S1:', clauseCuts(sentences[1]).map(c => [c.idx, c.strength, wc(sentences[1].slice(0, c.idx)), JSON.stringify(sentences[1].slice(Math.max(0, c.idx - 12), c.idx + 12))]));
  }
}
