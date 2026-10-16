const fs = require('fs');
const HITS = JSON.parse(fs.readFileSync('C:/Users/Daniel/projects/topmusiciangear/temp/audit_es_v2.json', 'utf8'));
['driver (revisar)', 'clipping (revisar)'].forEach(pat => {
  console.log('\n############ ' + pat + ' ############');
  const hs = HITS.filter(h => h.patron === pat).slice(0, 14);
  hs.forEach(h => {
    console.log('\n  [' + h.guia + ' :: ' + h.campo + '] x' + h.n);
    h.ejs.forEach(e => console.log('    ...' + e + '...'));
  });
  const total = HITS.filter(h => h.patron === pat).length;
  console.log('  (... ' + total + ' combinaciones en total)');
});
