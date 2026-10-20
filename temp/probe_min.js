const fs = require('fs');
const s = fs.readFileSync('js/app.min.js', 'utf8');
const pats = ['image:p.img', 'image":p.img', 'aggregateRating'];
for (const p of pats) {
  const i = s.indexOf(p);
  console.log(JSON.stringify(p), '->', i);
  if (i >= 0) console.log('   ...' + s.slice(Math.max(0, i - 120), i + 80).replace(/\n/g, ' ') + '...');
}
