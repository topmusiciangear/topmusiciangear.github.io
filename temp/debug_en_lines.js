const fs = require('fs');
const raw = fs.readFileSync('C:/Users/Daniel/projects/topmusiciangear/data/guides.json', 'utf8');
const lines = raw.split('\n');
let c = 0;
for (let i = 0; i < lines.length; i++) {
  const l = lines[i];
  if (l.includes('_es.html') && /^\s*"[^"_ ]+":/.test(l)) {
    console.log('L' + (i + 1) + ': ' + l.trim().slice(0, 160));
    c++;
    if (c > 25) break;
  }
}
console.log('total shown:', c);
