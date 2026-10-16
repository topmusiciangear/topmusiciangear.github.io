const fs = require('fs');
const HITS = JSON.parse(fs.readFileSync('C:/Users/Daniel/projects/topmusiciangear/temp/audit_es_v2.json', 'utf8'));
console.log('=== bundle restante: nombres vs generico ===');
HITS.filter(h => h.patron === 'bundle').forEach(h => {
  console.log('\n[' + h.guia + ' :: ' + h.campo + ']');
  h.ejs.forEach(e => console.log('  ...' + e + '...'));
});
['clean', 'flat', 'imaging', 'click', 'hype'].forEach(pat => {
  HITS.filter(h => h.patron === pat).forEach(h => {
    console.log('\n[' + pat + ' :: ' + h.guia + ' :: ' + h.campo + ']');
    h.ejs.forEach(e => console.log('  ...' + e + '...'));
  });
});
