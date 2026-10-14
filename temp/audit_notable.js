const fs = require('fs');
const guides = JSON.parse(fs.readFileSync('C:/Users/Daniel/projects/topmusiciangear/data/guides.json', 'utf8'));
const noTable = guides.filter(g => !g.productTable);
const isVs = g => /-vs-|^pro-/.test(g.id);
const real = noTable.filter(g => !isVs(g));
console.log('sin productTable: ' + noTable.length);
console.log('  comparativas "X vs Y" o hubs "pro-*": ' + noTable.filter(isVs).length + '  (sin tabla por diseno)');
console.log('  REALES sin tabla: ' + real.length);
real.forEach(g => console.log('    - ' + g.id + ' | ' + g.title + ' | ' + JSON.stringify(g.featuredProducts)));