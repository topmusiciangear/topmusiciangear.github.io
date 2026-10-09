const fs = require('fs');
const t = fs.readFileSync('C:/Users/Daniel/projects/topmusiciangear/data/guides.json', 'utf8');

const i = t.indexOf('"228 s per pack + microSD"');
const seg = t.slice(i - 60, i + 260);
console.log(JSON.stringify(seg));
console.log('---');
const lines = seg.split('\n');
for (const l of lines) {
  console.log(JSON.stringify(l), 'len=' + l.length);
}
