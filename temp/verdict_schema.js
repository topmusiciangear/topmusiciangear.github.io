const fs = require('fs');
const guides = JSON.parse(fs.readFileSync('C:/Users/Daniel/projects/topmusiciangear/data/guides.json','utf8'));
const g = guides.find(x => x.id === 'best-reverb-delay');
const v = g.verdictProsCons[0];
console.log('claves del veredicto: ' + Object.keys(v).join(', '));
console.log(JSON.stringify(v, null, 1).slice(0, 900));
console.log('\n--- fila "Estimated Price" completa ---');
const r = g.productTable.rows.find(x => x.label === 'Estimated Price');
console.log(JSON.stringify(r, null, 1).slice(0, 700));