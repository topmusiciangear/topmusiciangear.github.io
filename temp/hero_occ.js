const fs = require('fs');
const h = fs.readFileSync('C:/Users/Daniel/projects/topmusiciangear/guides/best-piano-keyboard-vsts.html', 'utf8');
const occ = [];
let i = -1;
while ((i = h.indexOf('121/1211824', i + 1)) > -1) occ.push(i);
console.log('ocurrencias: ' + occ.length);
occ.forEach(o => console.log('\n@' + o + ': ' + h.slice(Math.max(0, o - 180), o + 90).replace(/\s+/g, ' ')));