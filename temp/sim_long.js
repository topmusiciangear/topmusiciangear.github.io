const fs = require('fs');
const src = fs.readFileSync('build-guides.js', 'utf8');
const block = src.slice(src.indexOf('const CARD_WORDS_TARGET'), src.indexOf('function productCard'));
eval(block);

const d = JSON.parse(fs.readFileSync('data/products.json', 'utf8'));
const out = { '<15': [], '15-24': [], '25-31': [], '32-37': [], '38-46': [], '>=47': [] };
let longCutShort = [];
for (const p of d) {
  for (const f of ['desc', 'desc_es']) {
    const t = p[f] || '';
    if (!t) continue;
    const n = t.split(/\s+/).filter(Boolean).length;
    const c = cardDesc(t);
    const w = c.split(/\s+/).filter(Boolean).length;
    const k = w < 15 ? '<15' : w < 25 ? '15-24' : w < 32 ? '25-31' : w < 38 ? '32-37' : w <= 46 ? '38-46' : '>=47';
    out[k].push({ id: p.id, f, src: n, w, title: p.title, end: c.slice(-50) });
    if (n >= 38 && w < 38) longCutShort.push({ id: p.id, f, src: n, w, title: p.title, first: t.slice(0, 90), end: c.slice(-40) });
  }
}
console.log('source >=38 but card <38:', longCutShort.length);
for (const k of Object.keys(out)) console.log(k, out[k].length);
longCutShort.sort((a, b) => a.w - b.w);
for (const r of longCutShort.slice(0, 20)) console.log(r.w, '/', r.src, r.id, r.f, r.title, '|', r.end);
fs.writeFileSync('temp/long_cut_short.json', JSON.stringify(longCutShort, null, 1));
