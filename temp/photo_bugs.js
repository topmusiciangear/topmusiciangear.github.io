const fs = require('fs');
const DIR = 'C:/Users/Daniel/projects/topmusiciangear/';
const G = require(DIR + 'data/guides.json');
const P = require(DIR + 'data/products.json');
const flagged = require(DIR + 'temp/photo_sitewide.json');
function normHead(s) { return (s || '').toLowerCase().replace(/[^a-z0-9\s]/g, ' ').replace(/\s+/g, ' ').trim(); }
const STOP = new Set(['audio', 'pro', 'live', 'series', 'edition', 'studio', 'best', 'microphone', 'monitor', 'guitar', 'bass', 'drums', 'piano', 'synth', 'pedal', 'interface', 'mixer', 'headphones', 'keyboard', 'amp', 'speaker', 'dynamic', 'condenser', 'wireless', 'digital', 'system', 'acoustic', 'electric', 'the', 'and', 'for', 'your', 'what', 'which', 'with', 'usb', 'pair']);
function toks(title, brand) {
  return normHead((title || '') + ' ' + (brand || '')).split(' ').filter(w => w.length > 1 && !STOP.has(w));
}
const bugs = [];
flagged.forEach(d => {
  const g = G.find(x => x.id === d.g);
  d.secs.forEach(s => {
    const si = parseInt(s.slice(1).split(':')[0], 10) - 1;
    const sec = g.sections[si];
    if (!sec || sec.skipMedia) return;
    const head = normHead((sec.heading_es || '') + ' ' + (sec.heading || ''));
    // dedicated review = heading strongly names exactly ONE listed product
    const named = (sec.products || []).filter(pid => {
      const pr = P.find(p => p.id === pid);
      if (!pr) return false;
      const ts = toks(pr.title, pr.brand);
      const model = ts.filter(t => /[0-9]/.test(t) && t.length > 2);
      if (model.some(t => head.includes(t))) return true;
      const names = ts.filter(t => t.length >= 4);
      return names.filter(t => head.includes(t)).length >= 2;
    });
    if (named.length === 1) {
      // does this product's photo render in an EARLIER section?
      bugs.push({ guide: d.g, sec: si, heading: sec.heading, hero: named[0] });
    }
  });
});
console.log('DEDICATED REVIEWS WITHOUT PHOTO: ' + bugs.length);
bugs.forEach(b => console.log(b.guide + ' S' + (b.sec + 1) + ' "' + b.heading.slice(0, 55) + '" hero=' + b.hero));
fs.writeFileSync(DIR + 'temp/photo_bugs.json', JSON.stringify(bugs, null, 1));