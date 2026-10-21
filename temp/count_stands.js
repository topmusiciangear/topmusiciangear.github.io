const fs = require('fs');
const guides = JSON.parse(fs.readFileSync('data/guides.json', 'utf8'));

const needles = ['IsoAcoustics ISO-200 (Pair)', 'IsoAcoustics ISO-200 (Par)', 'Ultimate Support MS-100 (Pair)', 'Ultimate Support MS-100 (Par)'];
for (const n of needles) {
  console.log('\n### ' + n);
  for (const g of guides) {
    const s = JSON.stringify(g);
    const c = s.split(n).length - 1;
    if (c) console.log('  ' + g.id + ': ' + c);
  }
}
