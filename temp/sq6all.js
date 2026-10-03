const G = require('../data/guides.json');
G.forEach(g => {
  const s = JSON.stringify(g);
  const n = s.split('SQ-6').length - 1;
  if (n) {
    const inSecs = (g.sections || []).some(x => (x.products || []).includes(414));
    console.log(g.id, 'SQ-6 x' + n, 'hasProduct414:' + inSecs);
  }
});