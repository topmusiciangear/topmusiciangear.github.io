const G = require('C:/Users/Daniel/projects/topmusiciangear/data/guides.json');
let skipSecs = 0, noPhotoProds = 0;
const examples = [];
G.forEach(g => {
  const photoHome = {}; // pid -> sec index where photo would render (first non-skip section containing it)
  (g.sections || []).forEach((s, i) => {
    if (s.skipMedia) skipSecs++;
  });
  // simulate builder: renderedProducts in order, skipMedia skipped
  const rendered = new Set();
  (g.sections || []).forEach(s => {
    if (s.skipMedia) return;
    const prods = s.products || [];
    if (!prods.length) return;
    // simplified: first unrendered product gets photo (approx of topic logic)
    const first = prods.find(p => !rendered.has(p));
    if (first) rendered.add(first);
  });
  const allPids = [...new Set((g.sections || []).flatMap(s => s.products || []))];
  const missing = allPids.filter(p => !rendered.has(p));
  if (missing.length) {
    noPhotoProds += missing.length;
    if (examples.length < 15) examples.push(g.id + ': sin foto en sección ' + missing.join(','));
  }
});
console.log('secciones skipMedia:', skipSecs);
console.log('productos sin foto en sección:', noPhotoProds);
examples.forEach(e => console.log(' ' + e));