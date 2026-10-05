// Reconcile: revert my 49 skipMedia adds, then apply only faithful-theft fixes.
const fs = require('fs');
const DIR = 'C:/Users/Daniel/projects/topmusiciangear/';
const G = require(DIR + 'data/guides.json');
const P = require(DIR + 'data/products.json');
const { execSync } = require('child_process');
// 1. Find sections where *I* added skipMedia: compare against git HEAD version
const headGuides = JSON.parse(execSync('git show HEAD:data/guides.json', { cwd: DIR, maxBuffer: 200 * 1024 * 1024 }).toString());
const headSkip = new Set();
headGuides.forEach(g => g.sections.forEach((s, si) => { if (s.skipMedia) headSkip.add(g.id + '|' + si); }));
// my additions = current skipMedia not in HEAD
const mine = [];
G.forEach(g => g.sections.forEach((s, si) => { if (s.skipMedia && !headSkip.has(g.id + '|' + si)) mine.push([g.id, si, s.heading]); }));
console.log('my skipMedia adds: ' + mine.length);
// 2. Revert them all
mine.forEach(([gid, si]) => { delete G.find(x => x.id === gid).sections[si].skipMedia; });
console.log('reverted all');
// 3. Faithful simulation (exact build logic)
function normHead(s) { return (s || '').toLowerCase().replace(/[^a-z0-9\s]/g, ' ').replace(/\s+/g, ' ').trim(); }
const STOP = new Set(['audio', 'pro', 'live', 'series', 'edition', 'mk', 'the', 'and', 'vs', 'for', 'your', 'studio', 'best', 'what', 'which', 'with', 'from', 'how', 'why', 'es', 'el', 'la', 'los', 'las', 'para', 'una', 'un', 'mejor', 'del', 'de', 'y', 'o', 'a', 'en', 'que', 'como', 'cuando', 'donde', 'cual', 'son', 'se', 'su', 'this', 'that', 'are', 'is', 'do', 'does', 'should', 'buy', 'get', 'use', 'system', 'wireless', 'digital', 'microphone', 'mic', 'interface', 'monitor', 'monitors', 'guitar', 'bass', 'drums', 'piano', 'synth', 'pedal', 'pedals', 'speaker', 'speakers', 'mixer', 'mixers', 'headphones', 'keyboard', 'keyboards', 'amp', 'amps', 'preamp', 'console', 'software', 'usb', 'pair']);
function prodTokens(p) { const t = normHead((p.title || '') + ' ' + (p.brand || '')); return t.split(' ').filter(w => w.length > 2 && !STOP.has(w)); }
function topicScore(head, toks) { var s = 0; toks.forEach(t => { if (head.indexOf(t) > -1) s += /[0-9]/.test(t) ? 3 : 1; }); return s; }
function headOf(s) { return normHead((s.heading_es || '') + ' ' + (s.heading || '')); }
function topicOf(s, sps) {
  const head = headOf(s);
  let best = null, bs = 0;
  sps.forEach(p => { const sc = topicScore(head, prodTokens(p)); if (sc > bs) { bs = sc; best = p; } });
  return best && bs > 0 ? { p: best, score: bs } : (sps.length ? { p: sps[0], score: 0 } : null);
}
// dedicated = single-product section whose heading matches its product (score>0)
function simulate(g) {
  const rendered = new Map(); // pid -> si
  const photoOwner = {};
  const byPid = {};
  g.sections.forEach((s, si) => {
    if (s.skipMedia) return;
    const prods = s.products || [];
    if (prods.length !== 1) return;
    const pr = P.find(x => x.id === prods[0]);
    const score = pr ? topicScore(headOf(s), prodTokens(pr)) : 0;
    (byPid[prods[0]] = byPid[prods[0]] || []).push({ si, score });
  });
  Object.keys(byPid).forEach(pid => { const c = byPid[pid].sort((a, b) => (b.score - a.score) || (a.si - b.si)); photoOwner[pid] = c[0].si; });
  const shownIn = {}; // si -> [pids rendered]
  g.sections.forEach((s, si) => {
    shownIn[si] = [];
    if (s.skipMedia) return;
    const sps = (s.products || []).map(pid => P.find(pr => pr.id === pid)).filter(Boolean);
    if (!sps.length) return;
    if (s.splitProducts && sps.length > 1) {
      sps.forEach(p => {
        if (!rendered.has(p.id) && !((p.id in photoOwner) && photoOwner[p.id] !== si)) { rendered.set(p.id, si); shownIn[si].push(p.id); }
      });
    } else {
      const t = topicOf(s, sps);
      if (!t) return;
      const ownedElse = (t.p.id in photoOwner) && photoOwner[t.p.id] !== si;
      if (!rendered.has(t.p.id) && !ownedElse) { rendered.set(t.p.id, si); shownIn[si].push(t.p.id); }
    }
  });
  return { rendered, photoOwner, shownIn };
}
// 4. Find thefts: dedicated review R (single-product, or multi with strong topic>=3)
// whose hero product is rendered in an earlier, non-dedicated section
const fixes = [];
G.forEach(g => {
  const sim = simulate(g);
  g.sections.forEach((s, si) => {
    if (s.skipMedia) return;
    const sps = (s.products || []).map(pid => P.find(pr => pr.id === pid)).filter(Boolean);
    if (!sps.length) return;
    let hero = null, hscore = 0, dedicated = false;
    if (sps.length === 1) {
      hero = sps[0];
      hscore = topicScore(headOf(s), prodTokens(hero));
      dedicated = hscore > 0;
    } else if (!s.splitProducts) {
      const t = topicOf(s, sps);
      if (t && t.score >= 3) { hero = t.p; hscore = t.score; dedicated = true; }
    }
    if (!dedicated) return;
    const where = sim.rendered.get(hero.id);
    if (where !== undefined && where !== si) {
      const e = g.sections[where];
      const eProds = e.products || [];
      const eDedicated = eProds.length === 1 && eProds[0] === hero.id && topicScore(headOf(e), prodTokens(hero)) > 0;
      if (!eDedicated) fixes.push([g.id, where, s.heading, hero.title]);
    }
  });
});
console.log('thefts to fix: ' + fixes.length);
// dedupe + apply (set skipMedia on thief)
const seen = new Set();
fixes.forEach(([gid, si]) => {
  const k = gid + '|' + si;
  if (seen.has(k)) return;
  seen.add(k);
  G.find(x => x.id === gid).sections[si].skipMedia = true;
});
fixes.forEach(([gid, si, rh, pt]) => console.log('  SKIP ' + gid + ' S' + si + ' (photo goes to review of ' + pt + ')'));
fs.writeFileSync(DIR + 'data/guides.json', JSON.stringify(G, null, 2));