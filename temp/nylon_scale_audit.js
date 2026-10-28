const fs = require('fs');
const g = JSON.parse(fs.readFileSync('data/guides.json', 'utf8'));
const x = g.find(v => v.id === 'best-nylon-guitars-for-beginners');
for (const r of x.productTable.rows) {
  if (!/scale/i.test(r.label)) continue;
  console.log('label:', r.label, '|', r.label_es);
  r.values.forEach((v, i) => console.log('  ', x.productTable.columns[i].title, '=>', JSON.stringify(v.value), '|', JSON.stringify(v.value_es)));
}
console.log('\n--- prose mentions of scale/nut (EN) ---');
for (const s of x.sections) {
  const t = (s.content || '').replace(/<[^>]+>/g, '');
  const hits = t.match(/[^.]*?(scale|nut width|mm|inch)[^.]*\./gi);
  if (hits) { console.log('* ' + s.heading); hits.forEach(h => console.log('   ' + h.trim())); }
}
console.log('\n--- prose ES ---');
for (const s of x.sections) {
  const t = (s.content_es || '').replace(/<[^>]+>/g, '');
  const hits = t.match(/[^.]*?(escala|ceja|mm|pulgadas)[^.]*\./gi);
  if (hits) { console.log('* ' + (s.heading_es || s.heading)); hits.forEach(h => console.log('   ' + h.trim())); }
}
