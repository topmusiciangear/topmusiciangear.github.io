const fs = require('fs');
const P = require('../data/products.json');
console.log(JSON.stringify(P.find(x => x.id === 412), null, 1));
const t = fs.readFileSync('build-guides.js', 'utf8');
const i = t.indexOf('  412: {');
let d = 0, q = null, j = i;
for (; j < t.length; j++) {
  const c = t[j];
  if (q) { if (c === '\\') j++; else if (c === q) q = null; continue; }
  if (c === '"' || c === "'" || c === '`') { q = c; continue; }
  if (c === '{') d++;
  else if (c === '}') { d--; if (d === 0) break; }
}
console.log('BTN412: ' + t.slice(i, j + 1).replace(/\s+/g, ' '));
const G = require('../data/guides.json');
const g = G.find(x => x.id === 'best-32-channel-digital-mixers');
console.log('CONCL: ' + JSON.stringify(g.conclusion).slice(0, 600));
console.log('SNIP: ' + JSON.stringify({ t: g.featuredSnippet && g.featuredSnippet.text_en, te: g.featuredSnippet && g.featuredSnippet.text_es }));
Object.keys(g.featuredSnippet || {}).filter(k => /^faq_/.test(k)).forEach(k => {
  const v = g.featuredSnippet[k];
  if (/M32R|X32 Rack|32-channel USB|How many aux/.test(v)) console.log(k + ': ' + JSON.stringify(v).slice(0, 500));
});