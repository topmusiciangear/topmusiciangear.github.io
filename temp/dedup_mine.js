const fs = require('fs');
const DIR = 'C:/Users/Daniel/projects/topmusiciangear/';
const G = require(DIR + 'data/guides.json');
const P = require(DIR + 'data/products.json');
// collect all headings I added (batches B-F + batch1b + last38)
const mine = []; // [guideId, heading]
function loadBatch(path, isWrapped) {
  try {
    const arr = require(path);
    const list = Array.isArray(arr) ? arr : [];
    list.forEach(e => { if (e && e.g && e.sec && e.sec.heading) mine.push([e.g, e.sec.heading]); });
  } catch (e) { console.log('load fail ' + path); }
}
['rw_b', 'rw_c', 'rw_d', 'rw_e', 'rw_f'].forEach(() => {});
// rw files export arrays? they use module.exports = [...] yes for b-f? verify shape instead:
const path = require('path');
const glob = fs.readdirSync(DIR + 'temp').filter(f => /^rw_[b-f]\.js$/.test(f));
console.log('batch files: ' + glob.join(','));
function normHead(s) { return (s || '').toLowerCase().replace(/[^a-z0-9\s]/g, ' ').replace(/\s+/g, ' ').trim(); }
const STOP = new Set(['audio', 'pro', 'live', 'series', 'edition', 'studio', 'best', 'microphone', 'monitor', 'guitar', 'bass', 'drums', 'piano', 'synth', 'pedal', 'interface', 'mixer', 'headphones', 'keyboard', 'amp', 'speaker', 'dynamic', 'condenser', 'wireless', 'digital', 'system', 'acoustic', 'electric']);
function namesOf(title, brand) {
  return normHead((title || '') + ' ' + (brand || '')).split(' ').filter(w => w.length > 1)
    .filter(t => /[0-9]/.test(t) ? t.length > 2 : (t.length >= 4 && !STOP.has(t)));
}
let removed = 0;
const allMine = [];
glob.forEach(f => {
  try {
    const arr = require(DIR + 'temp/' + f);
    (Array.isArray(arr) ? arr : []).forEach(e => { if (e && e.g && e.sec && e.sec.heading) allMine.push(e); });
  } catch (e) { console.log('load fail ' + f); }
});
// batch1b.json + last38 (rw_last38 exports E)
try { require(DIR + 'temp/batch1b.json').forEach(e => allMine.push(e)); } catch (e) { console.log('no batch1b'); }
try { require(DIR + 'temp/rw_last38.js').forEach(e => allMine.push(e)); } catch (e) { console.log('no last38: ' + e.message); }
console.log('my total entries: ' + allMine.length);
allMine.forEach(e => {
  const g = G.find(x => x.id === e.g);
  if (!g) return;
  const idx = g.sections.findIndex(s => s.heading === e.sec.heading);
  if (idx === -1) return; // not present (already filtered)
  const pid = e.sec.products[0];
  const pr = P.find(p => p.id === pid);
  if (!pr) return;
  const toks = namesOf(pr.title, pr.brand);
  const earlier = g.sections.slice(0, idx).some(s => {
    const head = normHead((s.heading_es || '') + ' ' + (s.heading || ''));
    return toks.some(t => head.includes(t));
  });
  if (earlier) {
    console.log('REMOVE-DUP ' + e.g + ' "' + e.sec.heading + '" (earlier review exists)');
    g.sections.splice(idx, 1);
    removed++;
  }
});
fs.writeFileSync(DIR + 'data/guides.json', JSON.stringify(G, null, 2));
console.log('removed=' + removed);