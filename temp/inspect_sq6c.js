const G = require('../data/guides.json');
const g = G.find(x => x.id === 'best-32-channel-digital-mixers');
console.log('CONCL:', JSON.stringify(g.conclusion));
console.log('CONCL_ES:', JSON.stringify(g.conclusion_es));
console.log('DESC:', JSON.stringify(g.description));
console.log('DESC_ES:', JSON.stringify(g.description_es));
console.log('VERDICT:', JSON.stringify(g.verdict));
console.log('VERDICT_ES:', JSON.stringify(g.verdict_es));
console.log('FAQ:', JSON.stringify(g.faq, null, 1).slice(0, 4000));
console.log('SNIP:', JSON.stringify({ t: g.featuredSnippet && g.featuredSnippet.text_en, te: g.featuredSnippet && g.featuredSnippet.text_es }));
const fs = require('fs');
const t = fs.readFileSync('build-guides.js', 'utf8');
const i = t.indexOf('  406: {');
let d = 0, q = null, j = i;
for (; j < t.length; j++) {
  const c = t[j];
  if (q) { if (c === '\\') j++; else if (c === q) q = null; continue; }
  if (c === '"' || c === "'" || c === '`') { q = c; continue; }
  if (c === '{') d++;
  else if (c === '}') { d--; if (d === 0) break; }
}
console.log('BTN 406:', t.slice(i, j + 1));