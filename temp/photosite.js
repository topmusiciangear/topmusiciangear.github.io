const fs = require('fs');
const P = require('C:/Users/Daniel/projects/topmusiciangear/data/products.json');
const G = require('C:/Users/Daniel/projects/topmusiciangear/data/guides.json');
function normHead(s) {
  return (s || '').toLowerCase().replace(/[^a-z0-9\s]/g, ' ').replace(/\s+/g, ' ').trim();
}
const STOP = new Set(['audio','pro','live','series','edition','mk','the','and','vs','for','your','studio','best','what','which','with','from','how','why','es','el','la','los','las','para','una','un','mejor','del','de','y','o','a','en','que','como','cuando','donde','cual','son','se','su','this','that','are','is','do','does','should','buy','get','use']);
let bad = 0;
G.forEach(g => {
  const f = 'guides/' + g.id + '.html';
  let h;
  try { h = fs.readFileSync('C:/Users/Daniel/projects/topmusiciangear/' + f, 'utf8'); }
  catch (e) { return; }
  const parts = h.split('guide-section-heading" id="sec-');
  parts.slice(1).forEach(part => {
    const m = part.match(/^\d+">([^<]+)</);
    if (!m) return;
    const title = m[1];
    const head = normHead(title);
    // does heading name a catalog product? (>=2 distinctive tokens)
    const hit = P.find(p => {
      const toks = normHead((p.title || '') + ' ' + (p.brand || '')).split(' ').filter(w => w.length > 2 && !STOP.has(w));
      const c = toks.filter(t => head.indexOf(t) > -1).length;
      return toks.length >= 2 && c >= 2 && c >= toks.length - 1;
    });
    if (hit && !part.includes('guide-section-imgs"><img') && !part.includes('guide-section-prod-imgs"><img')) {
      if (bad < 25) console.log(g.id, 'SIN-FOTO para:', title.slice(0, 60));
      bad++;
    }
  });
});
console.log('secciones que nombran producto sin su foto:', bad);