const fs = require('fs');
const B = 'C:/Users/Daniel/projects/topmusiciangear/';
const guides = JSON.parse(fs.readFileSync(B + 'data/guides.json', 'utf8'));

const g = guides.find(x => x.id === 'fix-clipping-scarlett');
console.log('VEREDICTO:');
console.log(g.verdict);
console.log('\nCONCLUSION:');
console.log(g.conclusion);
console.log('\nPRODUCT TABLE:');
console.log(JSON.stringify(g.productTable, null, 2));