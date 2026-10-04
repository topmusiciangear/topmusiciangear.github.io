const G = require('C:/Users/Daniel/projects/topmusiciangear/data/guides.json');
const P = require('C:/Users/Daniel/projects/topmusiciangear/data/products.json');
const list = [];
G.forEach(g => {
  const allPids = [...new Set((g.sections || []).flatMap(s => s.products || []))];
  if (!allPids.length) console.log('SIN PRODUCTOS: ' + g.id);
  (g.sections || []).forEach((s, i) => {
    const len = (s.content || '').length;
    const prods = s.products || [];
    if (prods.length === 1 && len < 550 && !/^(The|How|What|Why|Which|Verdict|Decision|Buying|Pros|Active|Passive)/i.test(s.heading || '')) {
      const p = P.find(x => x.id === prods[0]);
      list.push({ g: g.id, i, h: s.heading, len, pid: prods[0], ptitle: p ? p.title : 'NOPROD' });
    }
  });
});
console.log('a expandir:', list.length);
const fs = require('fs');
fs.writeFileSync('C:/Users/Daniel/projects/topmusiciangear/temp/expandlist.json', JSON.stringify(list, null, 1));
list.slice(0, 30).forEach(e => console.log(' ' + e.g + ' sec' + e.i + ' [' + e.h + '] len=' + e.len));