const fs = require('fs');
const raw = fs.readFileSync('C:/Users/Daniel/projects/topmusiciangear/data/guides.json', 'utf8');
const i = raw.indexOf('A compact studio subweofer with two 6.5-inch');
if (i === -1) { console.log('NO encontrado'); process.exit(1); }
const seg = raw.slice(i - 220, i + 60);
console.log('SEGMENTO CRUDO (codes):');
const arr = [...seg];
console.log(arr.map(ch => ch.codePointAt(0) > 126 || ch === '\\' ? 'U+' + ch.codePointAt(0).toString(16) : ch).join(''));
console.log('');
console.log('SEGMENTO CRUDO (JSON.stringify):');
console.log(JSON.stringify(seg));
