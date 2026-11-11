const fs = require('fs');
const s = fs.readFileSync('C:/Users/Daniel/projects/topmusiciangear/data/guides.json','utf8');
const needle = '"name": "Zynaptiq Unveil"';
const i = s.indexOf(needle);
console.log('index', i);
console.log(JSON.stringify(s.substring(i, i+40)));
console.log(JSON.stringify(s.substring(i+40, i+80)));
