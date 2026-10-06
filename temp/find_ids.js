const fs = require('fs');
const g = JSON.parse(fs.readFileSync('data/guides.json', 'utf8'));
const p = JSON.parse(fs.readFileSync('data/products.json', 'utf8'));
const titles = {};
p.forEach(x => { titles[x.id] = x.title; });
[565, 566, 567, 568, 569, 570, 571, 572].forEach(id => {
  console.log('===== id ' + id + ' (' + titles[id] + ') =====');
  g.forEach((x, i) => {
    const s = JSON.stringify(x);
    if (!s.includes('"' + id + '"')) return;
    // find price-ish mentions in this guide near the product title
    const t = titles[id].replace(/^.*? /, ''); // model name-ish
    const re = new RegExp('.{0,80}(\\$[\\d,]+|£[\\d,]+|€[\\d,]+).{0,80}', 'g');
    const hits = s.match(re) || [];
    const rel = hits.filter(h => new RegExp(id + '|' + t.replace(/[^A-Za-z0-9\-]/g, ''), 'i').test(h));
    console.log('  guide[' + i + '] ' + x.slug + ' priceHits=' + hits.length);
    rel.slice(0, 6).forEach(h => console.log('     ~ ' + h));
  });
});
