const fs = require('fs');
const DIR = 'C:/Users/Daniel/projects/topmusiciangear/';
const G = require(DIR + 'data/guides.json');
const P = require(DIR + 'data/products.json');
// reload all my batch entries
const allMine = [];
['rw_b', 'rw_c', 'rw_d', 'rw_e', 'rw_f'].forEach(f => {
  try { require(DIR + 'temp/' + f + '.js').forEach(e => allMine.push(e)); } catch (e) {}
});
try { require(DIR + 'temp/batch1b.json').forEach(e => allMine.push(e)); } catch (e) {}
try { require(DIR + 'temp/rw_last38.js').forEach(e => allMine.push(e)); } catch (e) { console.log('no last38'); }
console.log('my total entries: ' + allMine.length);
function normHead(s) { return (s || '').toLowerCase().replace(/[^a-z0-9\s]/g, ' ').replace(/\s+/g, ' ').trim(); }
const STOP = new Set(['audio', 'pro', 'live', 'series', 'edition', 'studio', 'best', 'microphone', 'monitor', 'guitar', 'bass', 'drums', 'piano', 'synth', 'pedal', 'interface', 'mixer', 'headphones', 'keyboard', 'amp', 'speaker', 'dynamic', 'condenser', 'wireless', 'digital', 'system', 'acoustic', 'electric']);
// STRICT: dedicated review = heading has model token OR >=2 name tokens OR (single-product + 1 name token)
function isReview(head, pr) {
  const toks = normHead((pr.title || '') + ' ' + (pr.brand || '')).split(' ').filter(w => w.length > 1);
  const model = toks.filter(t => /[0-9]/.test(t) && t.length > 2);
  const names = toks.filter(t => t.length >= 4 && !STOP.has(t));
  if (model.some(t => head.includes(t))) return true;
  if (names.filter(t => head.includes(t)).length >= 2) return true;
  return false;
}
function isReviewLoose(head, pr, single) {
  if (isReview(head, pr)) return true;
  const toks = normHead((pr.title || '') + ' ' + (pr.brand || '')).split(' ').filter(w => w.length > 1);
  const names = toks.filter(t => t.length >= 4 && !STOP.has(t));
  return single && names.some(t => head.includes(t));
}
// find my entries currently missing from guides
const missing = [];
allMine.forEach(e => {
  const g = G.find(x => x.id === e.g);
  if (!g) return;
  const present = g.sections.some(s => s.heading === e.sec.heading);
  if (!present) missing.push(e);
});
console.log('my entries missing from guides: ' + missing.length);
// for each missing: re-add ONLY if no strict dedicated review exists
let readd = 0;
missing.forEach(e => {
  const g = G.find(x => x.id === e.g);
  const pid = e.sec.products[0];
  const pr = P.find(p => p.id === pid);
  const hasReview = g.sections.some(s => isReview(normHead((s.heading_es || '') + ' ' + (s.heading || '')), pr));
  if (!hasReview) {
    g.sections.push({ heading: e.sec.heading, heading_es: e.sec.heading_es, content: e.sec.content, content_es: e.sec.content_es, products: e.sec.products });
    readd++;
    console.log('RE-ADD ' + e.g + ' ' + pid);
  } else {
    console.log('SKIP (has review) ' + e.g + ' ' + pid);
  }
});
fs.writeFileSync(DIR + 'data/guides.json', JSON.stringify(G, null, 2));
console.log('readded=' + readd);