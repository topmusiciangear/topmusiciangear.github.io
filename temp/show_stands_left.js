const fs = require('fs');
const s = fs.readFileSync('data/guides.json', 'utf8');
for (const n of ['IsoAcoustics ISO-200 (Pair)', 'IsoAcoustics ISO-200 (Par)', 'Ultimate Support MS-100 (Pair)', 'Ultimate Support MS-100 (Par)']) {
  let i = -1;
  while ((i = s.indexOf(n, i + 1)) !== -1) {
    console.log('### ' + n);
    console.log(s.slice(Math.max(0, i - 160), i + 160).replace(/\s+/g, ' '));
  }
}
