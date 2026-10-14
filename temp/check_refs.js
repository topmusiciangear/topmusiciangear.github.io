const fs = require('fs');
const guides = JSON.parse(fs.readFileSync('C:/Users/Daniel/projects/topmusiciangear/data/guides.json', 'utf8'));
const g = guides.find(x => x.id === 'best-interface');
function hits(t) {
  if (typeof t !== 'string') return [];
  const out = [];
  ['Rodecaster', 'Rodecaster Duo', 'Bridge Cast'].forEach(k => {
    let i = t.indexOf(k);
    while (i > -1) { out.push({ k, ctx: t.slice(Math.max(0, i - 60), i + 100).replace(/\n/g, ' ') }); i = t.indexOf(k, i + 1); }
  });
  return out;
}
console.log('featuredProducts:', JSON.stringify(g.featuredProducts));
console.log('\n--- INTRO hits ---'); hits(g.intro).forEach(h => console.log('[' + h.k + '] ...' + h.ctx));
console.log('--- INTRO_ES hits ---'); hits(g.intro_es).forEach(h => console.log('[' + h.k + '] ...' + h.ctx));
console.log('--- VERDICT hits ---'); hits(g.verdict).forEach(h => console.log('[' + h.k + '] ...' + h.ctx));
console.log('--- VERDICT_ES hits ---'); hits(g.verdict_es).forEach(h => console.log('[' + h.k + '] ...' + h.ctx));
console.log('--- CONCLUSION hits ---'); (hits(g.conclusion) || []).forEach(h => console.log('[' + h.k + '] ...' + h.ctx));
console.log('--- CONCLUSION_ES hits ---'); (hits(g.conclusion_es) || []).forEach(h => console.log('[' + h.k + '] ...' + h.ctx));
// Seccion streaming completa
const st = g.sections.find(s => s && JSON.stringify(s.products) === '[239,240]');
console.log('\n--- Seccion streaming ---');
console.log('heading:', st.heading);
console.log('content:', st.content.slice(0, 600));