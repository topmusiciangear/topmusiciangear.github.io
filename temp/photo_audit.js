const fs = require('fs');
const DIR = 'C:/Users/Daniel/projects/topmusiciangear/';
const G = require(DIR + 'data/guides.json');
const P = require(DIR + 'data/products.json');
// replicate build logic minimally: normHead/prodTokens/topicScore/sectionTopicProduct
function normHead(s) { return (s || '').toLowerCase(); }
function prodTokens(pr) {
  const t = ((pr.title || '') + ' ' + (pr.title_es || '')).toLowerCase().split(/[^a-z0-9+]+/).filter(x => x.length > 1 && !/^(the|and|with|para|los|las|del|una|con|for|pro| Series)$/.test(x));
  return [...new Set(t)];
}
function topicScore(head, toks) {
  let s = 0;
  toks.forEach(t => { if (head.includes(t)) s += t.length > 4 ? 2 : 1; });
  return s;
}
function sectionTopicProduct(s, prods) {
  const head = normHead((s.heading_es || '') + ' ' + (s.heading || ''));
  let best = null, bs = -1;
  prods.forEach(p => { const sc = topicScore(head, prodTokens(p)); if (sc > bs) { bs = sc; best = p; } });
  return best || prods[0];
}
const report = [];
G.forEach(g => {
  const products = P;
  const rendered = new Set();
  const photoOwner = {};
  const byPid = {};
  g.sections.forEach((s, si) => {
    if (s.skipMedia) return;
    const prods = s.products || [];
    if (prods.length !== 1) return;
    const pid = prods[0];
    const head = normHead((s.heading_es || '') + ' ' + (s.heading || ''));
    const pr = products.find(x => x.id === pid);
    const score = pr ? topicScore(head, prodTokens(pr)) : 0;
    (byPid[pid] = byPid[pid] || []).push({ si, score });
  });
  Object.keys(byPid).forEach(pid => {
    const c = byPid[pid].sort((a, b) => (b.score - a.score) || (a.si - b.si));
    photoOwner[pid] = c[0].si;
  });
  g.sections.forEach((s, si) => {
    if (s.skipMedia) return;
    const sps = (s.products || []).map(pid => products.find(pr => pr.id === pid)).filter(Boolean);
    if (!sps.length) return;
    if (s.splitProducts && sps.length > 1) {
      const shown = sps.filter(p => !rendered.has(p.id) && !((p.id in photoOwner) && photoOwner[p.id] !== si));
      shown.forEach(p => rendered.add(p.id));
      if (!shown.length) report.push({ guide: g.id, sec: si, heading: s.heading, issue: 'splitProducts but ALL photos already rendered/owned elsewhere', products: sps.map(p => p.title) });
    } else {
      const fp = sectionTopicProduct(s, sps);
      const ownedElse = fp && (fp.id in photoOwner) && photoOwner[fp.id] !== si;
      if (!fp) return;
      if (rendered.has(fp.id)) report.push({ guide: g.id, sec: si, heading: s.heading, issue: 'topic photo already rendered in earlier section', topic: fp.title });
      else if (ownedElse) report.push({ guide: g.id, sec: si, heading: s.heading, issue: 'topic photo owned by section ' + photoOwner[fp.id], topic: fp.title });
      else rendered.add(fp.id);
    }
  });
});
console.log('SECTIONS WITHOUT PHOTO: ' + report.length);
const byGuide = {};
report.forEach(r => { (byGuide[r.guide] = byGuide[r.guide] || []).push(r); });
Object.entries(byGuide).forEach(([gid, rs]) => {
  console.log('\n##### ' + gid + ' (' + rs.length + ')');
  rs.forEach(r => console.log('  S' + r.sec + ' "' + r.heading + '" :: ' + r.issue + (r.topic ? ' [' + r.topic + ']' : '')));
});
fs.writeFileSync(DIR + 'temp/photo_audit.json', JSON.stringify(report, null, 1));