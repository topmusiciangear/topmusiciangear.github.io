function normHead(s) {
  return (s || '').toLowerCase().replace(/[^a-z0-9\s]/g, ' ').replace(/\s+/g, ' ').trim();
}
const STOP_TOKENS = new Set(['audio','pro','live','series','edition','mk','the','and','vs','for','your','studio','best','what','which','with','from','how','why','es','el','la','los','las','para','una','un','mejor','del','de','y','o','a','en','que','como','cuando','donde','cual','son','se','su','this','that','are','is','do','does','should','buy','get','use']);
function prodTokens(p) {
  const t = normHead((p.title || '') + ' ' + (p.brand || ''));
  return t.split(' ').filter(function (w) { return w.length > 2 && !STOP_TOKENS.has(w); });
}
function sectionTopicProduct(s, prods) {
  const head = normHead((s.heading_es || '') + ' ' + (s.heading || ''));
  let best = null, bestCount = 0;
  prods.forEach(function (p) {
    const toks = prodTokens(p);
    const count = toks.filter(function (t) { return head.indexOf(t) > -1; }).length;
    if (count > bestCount) { best = p; bestCount = count; }
  });
  return bestCount > 0 ? best : (prods.length ? prods[0] : null);
}
const P = require('C:/Users/Daniel/projects/topmusiciangear/data/products.json');
const G = require('C:/Users/Daniel/projects/topmusiciangear/data/guides.json');
const g = G.find(x => x.id === 'beat-making');
g.sections.forEach((s, i) => {
  const prods = (s.products || []).map(pid => P.find(pr => pr.id === pid)).filter(Boolean);
  const tp = sectionTopicProduct(s, prods);
  console.log('SEC' + (i + 1), 'prods=' + JSON.stringify(s.products), 'topic=' + (tp ? tp.id : null), 'skipMedia=' + !!s.skipMedia, 'split=' + !!s.splitProducts);
});