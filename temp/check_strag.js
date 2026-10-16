const fs = require('fs');
const B = 'C:/Users/Daniel/projects/topmusiciangear/';
const guides = JSON.parse(fs.readFileSync(B + 'data/guides.json', 'utf8'));
// stragglers
const s = JSON.stringify(guides);
['autotune-vs-melodyne', 'Auto-Tune Pro 11', 'AutoTune 2026'].forEach(k => {
  const c = s.split(k).length - 1;
  console.log(k + ': ' + c + ' menciones');
});
// TEST map check
const bg = fs.readFileSync(B + 'build-guides.js', 'utf8');
console.log('TEST 1031: ' + (bg.includes('1031:') ? 'SIGUE!' : 'fuera'));
console.log('TEST 1040: ' + (bg.includes('1040:') ? 'OK' : 'FALTA'));
// new guide sanity
const g = guides.find(x => x.id === 'repitch-vs-melodyne');
console.log('title EN: ' + g.title.length + ' chars | ES: ' + g.title_es);
console.log('meta EN: ' + g.metaDesc.length + ' chars | ES: ' + g.metaDesc_es.length + ' chars');
console.log('faq keys: ' + g.faq.map(f => Object.keys(f).join('/')).join(' ; '));
console.log('table: ' + g.productTable.columns.length + ' cols x ' + g.productTable.rows.length + ' rows');
