const fs = require('fs');
const DIR = 'C:/Users/Daniel/projects/topmusiciangear/';
const G = require(DIR + 'data/guides.json');
const P = require(DIR + 'data/products.json');
// EXACT copy of build-guides.js logic (lines 6-31) + photoOwner block (5744-5764)
function normHead(s) {
  return (s || '').toLowerCase().replace(/[^a-z0-9\s]/g, ' ').replace(/\s+/g, ' ').trim();
}
const STOP_TOKENS = new Set(['audio', 'pro', 'live', 'series', 'edition', 'mk', 'the', 'and', 'vs', 'for', 'your', 'studio', 'best', 'what', 'which', 'with', 'from', 'how', 'why', 'es', 'el', 'la', 'los', 'las', 'para', 'una', 'un', 'mejor', 'del', 'de', 'y', 'o', 'a', 'en', 'que', 'como', 'cuando', 'donde', 'cual', 'son', 'se', 'su', 'this', 'that', 'are', 'is', 'do', 'does', 'should', 'buy', 'get', 'use', 'system', 'wireless', 'digital', 'microphone', 'mic', 'interface', 'monitor', 'monitors', 'guitar', 'bass', 'drums', 'piano', 'synth', 'pedal', 'pedals', 'speaker', 'speakers', 'mixer', 'mixers', 'headphones', 'keyboard', 'keyboards', 'amp', 'amps', 'preamp', 'console', 'software', 'usb', 'pair']);
function prodTokens(p) {
  const t = normHead((p.title || '') + ' ' + (p.brand || ''));
  return t.split(' ').filter(function (w) { return w.length > 2 && !STOP_TOKENS.has(w); });
}
function topicScore(head, toks) {
  var s = 0;
  toks.forEach(function (t) { if (head.indexOf(t) > -1) s += /[0-9]/.test(t) ? 3 : 1; });
  return s;
}
function sectionTopicProduct(s, prods) {
  const head = normHead((s.heading_es || '') + ' ' + (s.heading || ''));
  let best = null, bestCount = 0;
  prods.forEach(function (p) {
    const toks = prodTokens(p);
    const count = topicScore(head, toks);
    if (count > bestCount) { best = p; bestCount = count; }
  });
  return bestCount > 0 ? best : (prods.length ? prods[0] : null);
}
const report = [];
G.forEach(g => {
  const rendered = new Set();
  const photoOwner = {};
  const byPid = {};
  g.sections.forEach(function (s, si) {
    if (s.skipMedia) return;
    var prods = s.products || [];
    if (prods.length !== 1) return;
    var pid = prods[0];
    var head = normHead(((s.heading_es || '') + ' ' + (s.heading || '')));
    var pr = null;
    try { pr = P.find(function (x) { return x.id === pid; }); } catch (e) { pr = null; }
    var score = 0;
    if (pr) { var toks = prodTokens(pr); score = topicScore(head, toks); }
    (byPid[pid] = byPid[pid] || []).push({ si: si, score: score });
  });
  Object.keys(byPid).forEach(function (pid) {
    var c = byPid[pid].sort(function (a, b) { return (b.score - a.score) || (a.si - b.si); });
    photoOwner[pid] = c[0].si;
  });
  g.sections.forEach((s, si) => {
    if (s.skipMedia) return;
    const sps = (s.products || []).map(pid => P.find(pr => pr.id === pid)).filter(Boolean);
    if (!sps.length) return;
    if (s.splitProducts && sps.length > 1) {
      const shown = sps.filter(p => !rendered.has(p.id) && !((p.id in photoOwner) && photoOwner[p.id] !== si));
      shown.forEach(p => rendered.add(p.id));
      if (!shown.length) report.push({ guide: g.id, sec: si, heading: s.heading, issue: 'SPLIT-EMPTY' });
    } else {
      const fp = sectionTopicProduct(s, sps);
      if (!fp) return;
      const ownedElse = (fp.id in photoOwner) && photoOwner[fp.id] !== si;
      if (rendered.has(fp.id)) report.push({ guide: g.id, sec: si, heading: s.heading, issue: 'RENDERED-EARLIER', topic: fp.title });
      else if (ownedElse) report.push({ guide: g.id, sec: si, heading: s.heading, issue: 'OWNED-BY-S' + photoOwner[fp.id], topic: fp.title });
      else rendered.add(fp.id);
    }
  });
});
fs.writeFileSync(DIR + 'temp/photo_audit2.json', JSON.stringify(report, null, 1));
console.log('total flagged: ' + report.length);
// dedicated review sections (single-product) that do NOT get their photo:
const bad = report.filter(r => {
  const g = G.find(x => x.id === r.guide);
  const s = g.sections[r.sec];
  return (s.products || []).length === 1;
});
console.log('single-product sections without photo: ' + bad.length);
bad.forEach(r => console.log('  ' + r.guide + ' S' + r.sec + ' "' + r.heading + '" :: ' + r.issue + ' [' + r.topic + ']')); равномерность
console.log('multi-product flagged: ' + (report.length - bad.length));