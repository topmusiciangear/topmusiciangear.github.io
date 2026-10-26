const fs = require('fs');
const raw = fs.readFileSync('C:/Users/Daniel/projects/topmusiciangear/data/guides.json', 'utf8');
const lines = raw.split('\n');
const l = lines[104685]; // L104686 (0-based 104685)
const j = l.indexOf('> </span>');
console.log('empty span at', j);
console.log(JSON.stringify(l.slice(j - 90, j + 200)));
// tambien la linea ES
const l2 = lines[104686];
const j2 = l2.indexOf('> </span>');
console.log('ES empty span at', j2);
console.log(JSON.stringify(l2.slice(j2 - 90, j2 + 200)));
