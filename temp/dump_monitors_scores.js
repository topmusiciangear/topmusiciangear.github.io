const fs = require('fs');
const gs = JSON.parse(fs.readFileSync('data/guides.json', 'utf8'));
const g = gs.find(x => x.id === 'best-studio-monitors-under-150');
const sc = fs.readFileSync('js/guide-scores.js', 'utf8');
const i = sc.indexOf('best-studio-monitors-under-150');
console.log('--- guide-scores block ---');
console.log(sc.slice(i - 40, sc.indexOf('}', i) + 1));
console.log('\n--- productTable keys ---');
console.log(Object.keys(g.productTable).join(', '));
console.log('headers:', JSON.stringify(g.productTable.headers));
console.log('headers_es:', JSON.stringify(g.productTable.headers_es));
console.log('\n--- sections ---');
(g.sections || []).forEach((s, k) => {
  console.log((k + 1) + '. ' + s.heading + ' | score=' + s.score + ' | products=' + JSON.stringify((s.products || []).map(p => p.name || p)));
});
console.log('\n--- numeric mentions in text ---');
const fields = ['intro', 'intro_es', 'verdict', 'verdict_es', 'conclusion', 'conclusion_es', 'featuredSnippet'];
for (const f of fields) {
  const v = g[f] || '';
  const m = v.match(/\b9[.,]\d\b|\b10\b/g);
  console.log(f + ': ' + (m ? [...new Set(m)].join(', ') : 'none'));
}
console.log('\n--- verdict paragraph names ---');
for (const f of ['verdict', 'verdict_es']) {
  const names = (g[f].match(/product-name">([^<]+)</g) || []).map(x => x.split('>')[1]);
  console.log(f + ' (' + names.length + '): ' + names.join(' | '));
}
