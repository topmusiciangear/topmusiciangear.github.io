const fs = require('fs');
const data = JSON.parse(fs.readFileSync('C:\\Users\\Daniel\\projects\\topmusiciangear\\data\\guides.json', 'utf8'));
const g = data.find(x => x.id === 'acoustic-guitars-guide');
g.verdictProsCons.forEach((pc, i) => {
  console.log('--- verdictProsCons[' + i + '] ---');
  console.log('pros:', JSON.stringify(pc.pros, null, 1));
  console.log('pros_es:', JSON.stringify(pc.pros_es, null, 1));
});