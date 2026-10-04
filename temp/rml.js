const fs = require('fs');
const F = 'C:/Users/Daniel/projects/topmusiciangear/temp/pb_verify_data.js';
const lines = fs.readFileSync(F, 'utf8').split('\n');
const out = lines.filter(ln => ln.indexOf("'264-g4m'") === -1);
fs.writeFileSync(F, out.join('\n'));
console.log('removed. remaining 264 lines:', out.filter(ln => ln.indexOf("'264'") > -1).length);