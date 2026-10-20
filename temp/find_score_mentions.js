const fs = require('fs');
const gs = JSON.parse(fs.readFileSync('data/guides.json', 'utf8'));
const g = gs.find(x => x.id === 'best-studio-monitors-under-150');
const blob = JSON.stringify(g);
for (const term of ['9.5', '9.6', '9.4', '9.3', '9.8', 'segundo', 'segunda', 'tercer', 'mejor nota', 'puntuaci', 'nota m']) {
  const re = new RegExp(term, 'gi');
  const m = blob.match(re);
  console.log(term + ': ' + (m ? m.length : 0));
}
console.log('\n--- contexts for 9.x ---');
const str = JSON.stringify(g);
let idx = 0;
while ((idx = str.indexOf('9.', idx)) !== -1) {
  console.log('...' + str.slice(Math.max(0, idx - 90), idx + 40).replace(/\\n/g, ' ') + '...');
  idx += 2;
}
