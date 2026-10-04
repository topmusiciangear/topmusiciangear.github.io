const fs = require('fs');
const t = fs.readFileSync('C:/Users/Daniel/projects/topmusiciangear/data/guides.json', 'utf8');
const G = JSON.parse(t);
G.filter(g => g.aboutName === 'Top Gear' && g.id !== 'beat-making').forEach(g => {
  const keys = Object.keys(g.featuredSnippet).filter(k => /^faq/.test(k));
  const last = keys[keys.length - 1];
  // raw check: find a1_es value end in raw text
  const i = t.indexOf('"faq_a1_es": "' + (g.featuredSnippet.faq_a1_es || '').slice(0, 40));
  const seg = t.slice(i, i + 400);
  const m = seg.match(/silenciosas\.|dinero\.|decide\.|Fireface\.|Paul\.|mezcla densa\.|presupuesto\.|portátil\.|sonidos\.|mejor\.|control\.|ambos\./);
  console.log(g.id, '| lastKey=' + last, '| commaAfter=' + (t[i + seg.indexOf(g.featuredSnippet.faq_a1_es) + 0] ? '?' : '?'));
});