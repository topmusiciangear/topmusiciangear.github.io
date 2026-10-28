const fs = require('fs');
const arr = JSON.parse(fs.readFileSync('data/guides.json', 'utf8'));
const g = (Array.isArray(arr) ? arr : arr.guides).find(x => x.id === 'best-nylon-guitars-for-beginners');
console.log(Object.keys(g));
for (const k of Object.keys(g)) {
  const v = g[k];
  console.log(k, Array.isArray(v) ? 'array(' + v.length + ')' : typeof v);
}
