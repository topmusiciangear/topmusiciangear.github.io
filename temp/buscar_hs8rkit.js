const fs = require('fs');
const g = JSON.parse(fs.readFileSync('C:/Users/Daniel/projects/topmusiciangear/data/guides.json', 'utf8'));
console.log('guias con hs8 o rokit en id/titulo:');
g.filter(x => /hs8|rokit/i.test(x.id + ' ' + x.title)).forEach(x => console.log('  ' + x.id + ' :: ' + x.title_es));
