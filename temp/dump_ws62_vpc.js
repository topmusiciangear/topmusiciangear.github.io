const fs = require('fs');
const g = JSON.parse(fs.readFileSync('C:/Users/Daniel/projects/topmusiciangear/data/guides.json', 'utf8'));
const sub = g.find(x => x.id === 'studio-subwoofers');
console.log('=== verdictProsCons ===');
(sub.verdictProsCons || []).forEach((v, i) => {
  console.log(i, '| name:', JSON.stringify(v.name), '| name_es:', JSON.stringify(v.name_es), '| pros:', (v.pros || []).length, '| cons:', (v.cons || []).length, '| pros_es:', (v.pros_es || []).length, '| cons_es:', (v.cons_es || []).length);
});
console.log('=== productTable rows labels ===');
(sub.productTable.rows || []).forEach(r => console.log('-', r.label));
console.log('=== sections[4] otros campos ===');
const s = sub.sections[4];
console.log('specs:', JSON.stringify(s.specs));
console.log('verdict:', JSON.stringify((s.verdict || '').slice(0, 120)));
console.log('pros:', JSON.stringify((s.pros || []).slice(0, 2)));
console.log('cons:', JSON.stringify((s.cons || []).slice(0, 2)));
