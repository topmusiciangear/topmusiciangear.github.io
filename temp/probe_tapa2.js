const fs = require('fs');
const arr = JSON.parse(fs.readFileSync('data/guides.json', 'utf8'));
const g = (Array.isArray(arr) ? arr : arr.guides).find(x => x.id === 'best-nylon-guitars-for-beginners');
const s = JSON.stringify(g);
let i = -1;
while ((i = s.indexOf('Tapa sólida', i + 1)) >= 0) console.log('...', s.slice(Math.max(0, i - 110), i + 80));
console.log('=== versus ===');
i = -1;
while ((i = s.indexOf('versus', i + 1)) >= 0) console.log('...', s.slice(Math.max(0, i - 90), i + 60));
