const P = require('C:/Users/Daniel/projects/topmusiciangear/data/products.json');
const G = require('C:/Users/Daniel/projects/topmusiciangear/data/guides.json');
function normHead(s) {
  return (s || '').toLowerCase().replace(/[^a-z0-9\s]/g, ' ').replace(/\s+/g, ' ').trim();
}
const STOP = new Set(['audio','pro','live','series','edition','mk','the','and','vs','for','your','studio','best','what','which','with','from','how','why','es','el','la','los','las','para','una','un','mejor','del','de','y','o','a','en','que','como','cuando','donde','cual','son','se','su','this','that','are','is','do','does','should','buy','get','use']);
function prodTokens(p) {
  const t = normHead((p.title || '') + ' ' + (p.brand || ''));
  return t.split(' ').filter(w => w.length > 2 && !STOP.has(w));
}
// for each section, find best-matching product by heading; report if section's products lack it (and it exists)
G.forEach(g => {
  (g.sections || []).forEach((s, i) => {
    const head = normHead((s.heading || '') + ' ' + (s.heading_es || ''));
    if (!head) return;
    let best = null, bestCount = 0;
    P.forEach(p => {
      const toks = prodTokens(p);
      if (toks.length < 2) return;
      const c = toks.filter(t => head.indexOf(t) > -1).length;
      if (c > bestCount && c >= toks.length - 1) { best = p; bestCount = c; }
    });
    if (best && !(s.products || []).includes(best.id)) {
      const hasPhoto = true;
      console.log(g.id + ' sec' + i + ' [' + s.heading + '] prods=' + JSON.stringify(s.products) + ' PERO nombra a ' + best.id + ':' + best.title);
    }
  });
});