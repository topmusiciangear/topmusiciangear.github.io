const fs = require('fs');
const HITS = JSON.parse(fs.readFileSync('C:/Users/Daniel/projects/topmusiciangear/temp/audit_es_v2.json', 'utf8'));
['dB-A', 'caballo de batalla', 'bundle'].forEach(pat => {
  console.log('\n############ ' + pat + ' ############');
  HITS.filter(h => h.patron === pat).forEach(h => {
    console.log('\n  [' + h.guia + ' :: ' + h.campo + '] x' + h.n);
    h.ejs.forEach(e => console.log('    ...' + e + '...'));
  });
});
