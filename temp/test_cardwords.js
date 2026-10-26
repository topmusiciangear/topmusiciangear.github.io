const fs = require('fs');
const src = fs.readFileSync('build-guides.js', 'utf8');
const start = src.indexOf('const CARD_WORDS_TARGET');
const end = src.indexOf('function productCard');
const block = src.slice(start, end);
eval(block);

const d = JSON.parse(fs.readFileSync('data/products.json', 'utf8'));
const rows = [];
for (const p of d) {
  for (const f of ['desc', 'desc_es']) {
    const t = p[f] || '';
    if (!t) continue;
    const out = cardDesc(t);
    rows.push({ id: p.id, f, srcWords: t.split(/\s+/).length, words: out.split(/\s+/).length, out, title: p.title });
  }
}
const w = rows.map(r => r.words).sort((a, b) => a - b);
const q = p => w[Math.floor(w.length * p)];
console.log('n', w.length, 'min', w[0], 'p10', q(.1), 'median', w[Math.floor(w.length / 2)], 'p90', q(.9), 'p99', q(.99), 'max', w[w.length - 1]);
console.log('>=36 words:', w.filter(x => x >= 36).length, ' >55:', w.filter(x => x > 55).length, ' >65:', w.filter(x => x > 65).length);
const bad = rows.filter(r => !/[.!?]["')\]]?$/.test(r.out) || r.out.length > 420);
console.log('bad endings/too long:', bad.length);
const over = rows.filter(r => r.words > 58).sort((a, b) => b.words - a.words);
console.log('outliers >58 words:', over.length);
for (const r of over.slice(0, 6)) console.log(' ', r.words, r.id, r.f, JSON.stringify(r.out.slice(0, 120)));
// verify every output is a prefix (modulo final punctuation) of the source
let notPrefix = 0;
for (const r of rows) {
  const t = (d.find(p => p.id === r.id)[r.f] || '').replace(/\s+/g, ' ').trim();
  const core = r.out.replace(/[.]$/, '');
  if (!t.startsWith(core) && !t.startsWith(core.replace(/\.$/, ''))) {
    if (!t.startsWith(r.out.slice(0, -1))) notPrefix++;
  }
}
console.log('not a prefix of source:', notPrefix);
for (const r of rows.slice(0, 3)) console.log('sample', r.words, r.f, r.out);
