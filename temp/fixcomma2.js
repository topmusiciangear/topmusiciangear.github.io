const fs = require('fs');
const p = 'C:/Users/Daniel/projects/topmusiciangear/data/guides.json';
let s = fs.readFileSync(p, 'utf8');
s = s.replace('  }\r\n     "productTable": {', '  },\r\n     "productTable": {');
fs.writeFileSync(p, s);
console.log('done');
