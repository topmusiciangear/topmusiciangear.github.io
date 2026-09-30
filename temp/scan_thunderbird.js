const fs = require('fs');
const G = JSON.parse(fs.readFileSync('data/guides.json', 'utf8'));
const RE = /thunderbird/gi;
const rows = [];
for (const g of G) {
  const hits = [];
  const scan = (obj, path) => {
    if (typeof obj === 'string') {
      const m = obj.match(RE);
      if (m) hits.push({ path, n: m.length, ctx: obj.replace(/\s+/g, ' ').slice(0, 90) });
    } else if (Array.isArray(obj)) {
      obj.forEach((v, i) => scan(v, path + '[' + i + ']'));
    } else if (obj && typeof obj === 'object') {
      for (const [k, v] of Object.entries(obj)) scan(v, path ? path + '.' + k : k);
    }
  };
  scan(g, '');
  if (hits.length) rows.push({ slug: g.slug, cat: g.category, hits });
}
console.log('guias con "Thunderbird":', rows.length, '| total menciones:', rows.reduce((a, r) => a + r.hits.reduce((b, h) => b + h.n, 0), 0));
for (const r of rows) {
  console.log('\n== ' + r.slug + ' (' + r.cat + ') -> ' + r.hits.length + ' campos');
  for (const h of r.hits) console.log('   [' + h.path + '] x' + h.n + ' :: ' + h.ctx);
}
