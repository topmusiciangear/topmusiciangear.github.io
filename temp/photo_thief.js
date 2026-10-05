const fs = require('fs');
const DIR = 'C:/Users/Daniel/projects/topmusiciangear/';
const G = require(DIR + 'data/guides.json');
const P = require(DIR + 'data/products.json');
const bugs = require(DIR + 'temp/photo_bugs.json');
function normHead(s) { return (s || '').toLowerCase().replace(/[^a-z0-9\s]/g, ' ').replace(/\s+/g, ' ').trim(); }
const STOP = new Set(['audio', 'pro', 'live', 'series', 'edition', 'studio', 'best', 'microphone', 'monitor', 'guitar', 'bass', 'drums', 'piano', 'synth', 'pedal', 'interface', 'mixer', 'headphones', 'keyboard', 'amp', 'speaker', 'dynamic', 'condenser', 'wireless', 'digital', 'system', 'acoustic', 'electric', 'the', 'and', 'for', 'your', 'what', 'which', 'with', 'usb', 'pair']);
function prodTokens(p) { const t = normHead((p.title || '') + ' ' + (p.brand || '')); return t.split(' ').filter(w => w.length > 2 && !STOP.has(w)); }
function topicScore(head, toks) { var s = 0; toks.forEach(t => { if (head.indexOf(t) > -1) s += /[0-9]/.test(t) ? 3 : 1; }); return s; }
bugs.forEach(b => {
  const g = G.find(x => x.id === b.guide);
  // simulate render order to find who rendered hero first
  const rendered = new Map();
  const photoOwner = {};
  const byPid = {};
  g.sections.forEach((s, si) => {
    if (s.skipMedia) return;
    const prods = s.products || [];
    if (prods.length !== 1) return;
    const pr = P.find(x => x.id === prods[0]);
    const score = pr ? topicScore(normHead((s.heading_es || '') + ' ' + (s.heading || '')), prodTokens(pr)) : 0;
    (byPid[prods[0]] = byPid[prods[0]] || []).push({ si, score });
  });
  Object.keys(byPid).forEach(pid => { const c = byPid[pid].sort((a, b) => (b.score - a.score) || (a.si - b.si)); photoOwner[pid] = c[0].si; });
  let thief = null;
  for (let si = 0; si < b.sec; si++) {
    const s = g.sections[si];
    if (s.skipMedia) continue;
    const sps = (s.products || []).map(pid => P.find(pr => pr.id === pid)).filter(Boolean);
    if (!sps.length) continue;
    let fp = null;
    if (s.splitProducts && sps.length > 1) {
      fp = sps.find(p => p.id === b.hero && !rendered.has(p.id) && !((p.id in photoOwner) && photoOwner[p.id] !== si)) || null;
      if (fp) { sps.forEach(p => { if (!rendered.has(p.id) && !((p.id in photoOwner) && photoOwner[p.id] !== si)) rendered.set(p.id, si); }); }
    } else {
      const head = normHead((s.heading_es || '') + ' ' + (s.heading || ''));
      let best = null, bs = 0;
      sps.forEach(p => { const sc = topicScore(head, prodTokens(p)); if (sc > bs) { bs = sc; best = p; } });
      fp = best && bs > 0 ? best : (sps.length ? sps[0] : null);
      if (fp && !rendered.has(fp.id) && !((fp.id in photoOwner) && photoOwner[fp.id] !== si)) rendered.set(fp.id, si);
    }
    if (fp && fp.id === b.hero) { thief = si; break; }
  }
  const es = thief !== null ? g.sections[thief] : null;
  console.log(b.guide + ' review-S' + (b.sec + 1) + ' hero=' + b.hero + ' <- rendered in S' + (thief !== null ? thief + 1 : '?') + (es ? ' "' + es.heading.slice(0, 50) + '" prods=' + (es.products || []).join(',') : ''));
});