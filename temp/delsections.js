const fs = require('fs');
const F = 'C:/Users/Daniel/projects/topmusiciangear/data/guides.json';
const G = require(F);
let del = 0;
G.forEach(g => {
  const keep = [];
  (g.sections || []).forEach((s, i) => {
    const isCloser = /Closer Look/i.test(s.heading || '');
    const len = (s.content || '').length;
    const prods = s.products || [];
    if (isCloser) {
      const twin = (g.sections || []).some((o, j) => {
        if (j === i || /Closer Look/i.test(o.heading || '')) return false;
        return (o.products || []).some(p => prods.includes(p)) && (o.content || '').length > len;
      });
      if (twin) { del++; return; }
    }
    keep.push(s);
  });
  g.sections = keep;
});
fs.writeFileSync(F, JSON.stringify(G, null, 2));
console.log('secciones eliminadas:', del);