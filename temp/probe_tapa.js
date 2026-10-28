const fs = require('fs');
const arr = JSON.parse(fs.readFileSync('data/guides.json', 'utf8'));
const g = (Array.isArray(arr) ? arr : arr.guides).find(x => x.id === 'best-nylon-guitars-for-beginners');
const s = JSON.stringify(g);
const counts = {};
for (const t of ['tapa sólida', 'tapa solida', 'tapa maciza', 'Tapa sólida', 'actualización', 'versus']) {
  counts[t] = s.split(t).length - 1;
}
console.log(counts);
// show contexts of "tapa sólida"
let i = -1;
while ((i = s.indexOf('tapa sólida', i + 1)) >= 0) console.log('...', s.slice(Math.max(0, i - 90), i + 60).replace(/\\n/g, ' '));
