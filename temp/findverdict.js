const fs = require('fs');
const s = fs.readFileSync('C:/Users/Daniel/projects/topmusiciangear/data/guides.json','utf8');
const i = s.indexOf('Zynaptiq Unveil</span></strong>');
console.log(JSON.stringify(s.substring(i, i+120)));
