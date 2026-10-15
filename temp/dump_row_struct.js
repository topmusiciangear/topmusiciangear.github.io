const fs = require('fs');
const BASE = 'C:/Users/Daniel/projects/topmusiciangear/';
const guides = JSON.parse(fs.readFileSync(BASE+'data/guides.json','utf8'));
const g = guides.find(x=>x.id==='live-sound-pa');
const r0 = g.productTable.rows[0];
console.log('estructura de una fila:');
console.log(JSON.stringify(r0, null, 2));
console.log('\ncolumnas[0]:');
console.log(JSON.stringify(g.productTable.columns[0], null, 2));