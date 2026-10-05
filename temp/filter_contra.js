const fs = require('fs');
const DIR = 'C:/Users/Daniel/projects/topmusiciangear/';
const { report } = require(DIR + 'temp/table_audit.json');
const nums = s => ((s || '').match(/[\d.,]+/g) || []).map(x => x.replace(',', '.'));
const real = [];
for (const r of report) {
  for (const { v, guides } of r.vals) {
    // group by normalized numeric signature
  }
  const sigs = new Map();
  r.vals.forEach(({ v, guides }) => {
    const key = nums(v).join('|') + 'arketing' + v.toLowerCase().replace(/[\d.,\s]/g, '').slice(0, 40);
    if (!sigs.has(key)) sigs.set(key, []);
    sigs.get(key).push({ v, guides });
  });
  // real contradiction = different numbers
  const numSets = new Set(r.vals.map(({ v }) => nums(v).join('|')));
  if (numSets.size > 1) real.push(r);
}
console.log('REAL numeric contradictions: ' + real.length);
real.forEach(r => {
  console.log('\n### ' + [...r.names].join(' / ') + ' [' + r.label + ']');
  r.vals.forEach(({ v, guides }) => console.log('  "' + v + '" <- ' + guides.join(', ')));
});
fs.writeFileSync(DIR + 'temp/table_contra_real.json', JSON.stringify(real, null, 1));