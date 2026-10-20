const fs = require('fs');
const gs = JSON.parse(fs.readFileSync('data/guides.json', 'utf8'));
const g = gs.find(x => x.id === 'best-studio-monitors-under-150');
console.log('--- productTable columns ---');
(g.productTable.columns || []).forEach((c, i) => console.log('  ' + i + '. ' + JSON.stringify(c)));

console.log('\n--- numeric mentions in text ---');
const fields = ['intro', 'intro_es', 'verdict', 'verdict_es', 'conclusion', 'conclusion_es'];
for (const f of fields) {
  const v = g[f] || '';
  const m = typeof v === 'string' ? v.match(/\b9[.,]\d\b|\b10\b/g) : null;
  console.log(f + ': ' + (m ? [...new Set(m)].join(', ') : 'none'));
}
console.log('\n--- verdict paragraph names ---');
for (const f of ['verdict', 'verdict_es']) {
  const names = (g[f].match(/product-name">([^<]+)</g) || []).map(x => x.split('>')[1]);
  console.log(f + ' (' + names.length + '): ' + names.join(' | '));
}
console.log('\n--- section 9 ---');
console.log(JSON.stringify(g.sections[8]).slice(0, 1200));
console.log('\n--- score/rating keys anywhere in guide ---');
console.log(JSON.stringify(g, null, 0).match(/"score"\s*:\s*[0-9.]+/g));
