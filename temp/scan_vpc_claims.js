// Escanea pros/cons por afirmaciones de ganador
const fs = require('fs');
const raw = fs.readFileSync('C:/Users/Daniel/projects/topmusiciangear/data/guides.json', 'utf8');
const g = JSON.parse(raw);
const gu = g.find(x => x.id === 'best-monitors-for-small-rooms');
const pats = ['top pick', 'winner', 'best overall', 'number one', '#1', 'elegido', 'ganador', 'mejor overall', 'número uno'];
(gu.verdictProsCons || []).forEach((v, i) => {
  ['pros', 'cons', 'pros_es', 'cons_es'].forEach(f => {
    (v[f] || []).forEach((item, k) => {
      pats.forEach(p => {
        if (item.toLowerCase().includes(p.toLowerCase())) console.log('vpc[' + i + '].' + f + '[' + k + '] "' + p + '": ' + item.slice(0, 150));
      });
    });
  });
});
console.log('done');
