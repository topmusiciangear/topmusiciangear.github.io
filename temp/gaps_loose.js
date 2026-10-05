const fs = require('fs');
const DIR = 'C:/Users/Daniel/projects/topmusiciangear/';
const G = require(DIR + 'data/guides.json');
const P = require(DIR + 'data/products.json');
function normHead(s) { return (s || '').toLowerCase().replace(/[^a-z0-9\s]/g, ' ').replace(/\s+/g, ' ').trim(); }
const STOP = new Set(['audio', 'pro', 'live', 'series', 'edition', 'studio', 'best', 'microphone', 'monitor', 'guitar', 'bass', 'drums', 'piano', 'synth', 'pedal', 'interface', 'mixer', 'headphones', 'keyboard', 'amp', 'speaker', 'dynamic', 'condenser', 'wireless', 'digital', 'system', 'acoustic', 'electric', 'the', 'and', 'for', 'your', 'what', 'which', 'with', 'from', 'how', 'usb', 'pair']);
function toks(title, brand) {
  return normHead((title || '') + ' ' + (brand || '')).split(' ').filter(w => w.length > 1 && !STOP.has(w));
}
const report = [];
G.forEach(g => {
  const ids = new Set();
  (g.sections || []).forEach(s => (s.products || []).forEach(id => ids.add(id)));
  (g.featuredProducts || []).forEach(id => ids.add(id));
  const missing = [];
  [...ids].forEach(pid => {
    const pr = P.find(x => x.id === pid);
    if (!pr) { missing.push(pid + ':UNKNOWN'); return; }
    const ts = toks(pr.title, pr.brand);
    const hit = (g.sections || []).some(s => {
      const words = new Set(normHead((s.heading_es || '') + ' ' + (s.heading || '')).split(' '));
      return ts.some(t => words.has(t));
    });
    if (!hit) missing.push(pid + ':' + pr.title);
  });
  if (missing.length) report.push({ guide: g.id, nprod: ids.size, missing });
});
console.log('guides with gaps: ' + report.length);
report.forEach(r => {
  console.log('\n##### ' + r.guide + ' (' + r.nprod + ' products, ' + r.missing.length + ' unnamed)');
  r.missing.forEach(m => console.log('  - ' + m));
});
fs.writeFileSync(DIR + 'temp/gaps_loose.json', JSON.stringify(report, null, 1));