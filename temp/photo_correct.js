const fs = require('fs');
const DIR = 'C:/Users/Daniel/projects/topmusiciangear/';
const G = require(DIR + 'data/guides.json');
const P = require(DIR + 'data/products.json');
function normHead(s) { return (s || '').toLowerCase().replace(/[^a-z0-9\s]/g, ' ').replace(/\s+/g, ' ').trim(); }
const STOP = new Set(['audio', 'pro', 'live', 'series', 'edition', 'mk', 'the', 'and', 'vs', 'for', 'your', 'studio', 'best', 'what', 'which', 'with', 'from', 'how', 'why', 'es', 'el', 'la', 'los', 'las', 'para', 'una', 'un', 'mejor', 'del', 'de', 'y', 'o', 'a', 'en', 'que', 'como', 'cuando', 'donde', 'cual', 'son', 'se', 'su', 'this', 'that', 'are', 'is', 'do', 'does', 'should', 'buy', 'get', 'use', 'system', 'wireless', 'digital', 'microphone', 'mic', 'interface', 'monitor', 'monitors', 'guitar', 'bass', 'drums', 'piano', 'synth', 'pedal', 'pedals', 'speaker', 'speakers', 'mixer', 'mixers', 'headphones', 'keyboard', 'keyboards', 'amp', 'amps', 'preamp', 'console', 'software', 'usb', 'pair']);
function prodTokens(p) { const t = normHead((p.title || '') + ' ' + (p.brand || '')); return t.split(' ').filter(w => w.length > 2 && !STOP.has(w)); }
function topicScore(head, toks) { var s = 0; toks.forEach(t => { if (head.indexOf(t) > -1) s += /[0-9]/.test(t) ? 3 : 1; }); return s; }
function topicOf(s, sps) {
  const head = normHead((s.heading_es || '') + ' ' + (s.heading || ''));
  let best = null, bs = 0;
  sps.forEach(p => { const sc = topicScore(head, prodTokens(p)); if (sc > bs) { bs = sc; best = p; } });
  return best && bs > 0 ? best : (sps.length ? sps[0] : null);
}
// faithful dedicated owners (mirror build block exactly, incl. skipMedia sections skipped)
function owners(g) {
  const byPid = {};
  g.sections.forEach((s, si) => {
    if (s.skipMedia) return;
    const prods = s.products || [];
    if (prods.length !== 1) return;
    const head = normHead((s.heading_es || '') + ' ' + (s.heading || ''));
    const pr = P.find(x => x.id === prods[0]);
    const score = pr ? topicScore(head, prodTokens(pr)) : 0;
    (byPid[prods[0]] = byPid[prods[0]] || []).push({ si, score });
  });
  const o = {};
  Object.keys(byPid).forEach(pid => { const c = byPid[pid].sort((a, b) => (b.score - a.score) || (a.si - b.si)); o[pid] = c[0].si; });
  return o;
}
// NOTE: compute correct set IGNORING my 49 additions: temporarily clear skipMedia flags
// added by fix_photos run (all current skipMedia that are NOT on Contenders-style sections).
// Simpler: correct set = sections where faithful-topic has faithful-dedicated elsewhere,
// computed on data WITHOUT any skipMedia except pre-existing Contenders ones.
// We approximate: remove all skipMedia, then re-add Contenders (heading contains Contenders/contendientes), compute, then reconcile.
const hadSkip = [];
G.forEach(g => g.sections.forEach((s, si) => { if (s.skipMedia) hadSkip.push(g.id + ' S' + si + ' "' + s.heading + '"'); }));
console.log('current skipMedia count: ' + hadSkip.length);
// What SHOULD have skipMedia per faithful logic (computed with only Contenders skipped,
// since those are the long-standing ones)? Instead: compute topic/dedicated with NO skips at all,
// then skip = multi non-split sections whose topic is owned by a single-product section.
let correct = [];
G.forEach(g => {
  const byPid = {};
  g.sections.forEach((s, si) => {
    const prods = s.products || [];
    if (prods.length !== 1) return;
    const head = normHead((s.heading_es || '') + ' ' + (s.heading || ''));
    const pr = P.find(x => x.id === prods[0]);
    const score = pr ? topicScore(head, prodTokens(pr)) : 0;
    (byPid[prods[0]] = byPid[prods[0]] || []).push({ si, score });
  });
  const ded = {};
  Object.keys(byPid).forEach(pid => { const c = byPid[pid].sort((a, b) => (b.score - a.score) || (a.si - b.si)); if (c[0].score > 0) ded[pid] = c[0].si; });
  g.sections.forEach((s, si) => {
    if (s.splitProducts) return;
    const sps = (s.products || []).map(pid => P.find(pr => pr.id === pid)).filter(Boolean);
    if (sps.length < 2) return;
    const t = topicOf(s, sps);
    if (t && ded[t.id] !== undefined && ded[t.id] !== si) correct.push(g.id + ' S' + si + ' "' + s.heading + '"');
  });
});
console.log('faithful-correct skipMedia count: ' + correct.length);
correct.forEach(c => console.log('  SHOULD-SKIP ' + c));