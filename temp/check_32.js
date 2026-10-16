const fs = require('fs');
const t = JSON.stringify(JSON.parse(fs.readFileSync('C:/Users/Daniel/projects/topmusiciangear/data/guides.json', 'utf8')).find(x => x.id === 'best-32-channel-digital-mixers'));
console.log('confiable: ' + (t.match(/confiable/g) || []).length);
console.log('fiable: ' + (t.match(/fiable/g) || []).length);
