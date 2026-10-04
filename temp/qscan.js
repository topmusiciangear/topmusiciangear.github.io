const fs = require('fs');
const t = fs.readFileSync('C:/Users/Daniel/projects/topmusiciangear/data/guides.json', 'utf8');
const seg = t.slice(619000, 619590);
const out = [];
for (let i = 0; i < seg.length; i++) {
  if (seg[i] === '"') {
    let bs = 0, j = i - 1;
    while (seg[j] === '\\') { bs++; j--; }
    out.push((619000 + i) + ':' + (bs % 2 ? 'ESC' : 'BARE'));
  }
}
console.log(out.join(' '));