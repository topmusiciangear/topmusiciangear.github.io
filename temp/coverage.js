const fs = require('fs');
const DIR = 'C:/Users/Daniel/projects/topmusiciangear/';
const G = require(DIR + 'data/guides.json');
const P = require(DIR + 'data/products.json');
function normHead(s) { return (s || '').toLowerCase().replace(/[^a-z0-9\s]/g, ' ').replace(/\s+/g, ' ').trim(); }
const STOP = new Set(['audio', 'pro', 'live', 'series', 'edition', 'mk', 'the', 'and', 'vs', 'for', 'your', 'studio', 'best', 'what', 'which', 'with', 'from', 'how', 'why', 'es', 'el', 'la', 'los', 'las', 'para', 'una', 'un', 'mejor', 'del', 'de', 'y', 'o', 'a', 'en', 'que', 'como', 'cuando', 'donde', 'cual', 'son', 'se', 'su', 'this', 'that', 'are', 'is', 'do', 'does', 'should', 'buy', 'get', 'use', 'system', 'wireless', 'digital', 'microphone', 'mic', 'interface', 'monitor', 'monitors', 'guitar', 'bass', 'drums', 'piano', 'synth', 'pedal', 'pedals', 'speaker', 'speakers', 'mixer', 'mixers', 'headphones', 'keyboard', 'keyboards', 'amp', 'amps', 'preamp', 'console', 'software', 'usb', 'pair']);
function prodTokens(p) { const t = normHead((p.title || '') + ' ' + (p.brand || '')); return t.split(' ').filter(w => w.length > 2 && !STOP.has(w)); }
const report = [];
G.forEach(g => {
  // products in guide = union of section products
  const ids = new Set();
  (g.sections || []).forEach(s => (s.products || []).forEach(id => ids.add(id)));
  (g.featuredProducts || []).forEach(id => ids.add(id));
  const missing = [];
  [...ids].forEach(pid => {
    const pr = P.find(x => x.id === pid);
    if (!pr) { missing.push(pid + ' (UNKNOWN PRODUCT!)'); return; }
    const toks = prodTokens(pr).filter(t => /[0-9]/.test(t) || t.length > 4);
    const hit = (g.sections || []).some(s => {
      const head = normHead((s.heading_es || '') + ' ' + (s.heading || ''));
      return toks.some(t => head.includes(t));
    });
    if (!hit) missing.push(pid + ': ' + pr.title);
  });
  if (missing.length) report.push({ guide: g.id, total: ids.size, missing });
});
console.log('guides with gaps: ' + report.length);
report.forEach(r => {
  console.log('\n##### ' + r.guide + ' (' + r.total + ' products, ' + r.missing.length + ' without review)');
  r.missing.forEach(m => console.log('  - ' + m));
});
fs.writeFileSync(DIR + 'temp/coverage.json', JSON.stringify(report, null, 1));