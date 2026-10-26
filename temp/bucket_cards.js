const fs = require('fs');
const src = fs.readFileSync('build-guides.js', 'utf8');
const block = src.slice(src.indexOf('const CARD_WORDS_TARGET'), src.indexOf('function productCard'));
eval(block);

const d = JSON.parse(fs.readFileSync('data/products.json', 'utf8'));
const buckets = { '<15': [], '15-24': [], '25-31': [], '32-35': [], '36-45': [], '46-50': [], '>50': [] };
for (const p of d) {
  for (const f of ['desc', 'desc_es']) {
    const t = p[f] || '';
    if (!t) continue;
    const w = cardDesc(t).split(/\s+/).length;
    const k = w < 15 ? '<15' : w < 25 ? '15-24' : w < 32 ? '25-31' : w < 36 ? '32-35' : w <= 45 ? '36-45' : w <= 50 ? '46-50' : '>50';
    buckets[k].push({ id: p.id, f, w, title: p.title, out: cardDesc(t) });
  }
}
for (const k of Object.keys(buckets)) console.log(k, buckets[k].length);

const short = buckets['<15'].concat(buckets['15-24']);
console.log('\nshortest samples:');
for (const r of short.sort((a, b) => a.w - b.w).slice(0, 12)) {
  console.log(r.w, r.id, r.f, r.title);
  console.log('   ', r.out);
}
fs.writeFileSync('temp/short_cards.json', JSON.stringify(short, null, 1));
fs.writeFileSync('temp/all_card_counts.json', JSON.stringify(Object.values(buckets).flat(), null, 1));
