const fs = require('fs');

const pairs = [
  ['IsoAcoustics ISO-200 (Pair)', 'IsoAcoustics ISO-200 Studio Monitor Stands (Pair)'],
  ['IsoAcoustics ISO-200 (Par)', 'Soportes de monitor IsoAcoustics ISO-200 (par)'],
  ['Ultimate Support MS-100 (Pair)', 'Ultimate Support MS-100 Studio Monitor Stands (Pair)'],
  ['Ultimate Support MS-100 (Par)', 'Soportes de monitor Ultimate Support MS-100 (par)']
];

for (const f of ['js/guide-scores.js', 'temp/score_overrides.js']) {
  if (!fs.existsSync(f)) { console.log(f + ': no existe'); continue; }
  let s = fs.readFileSync(f, 'utf8');
  for (const [from, to] of pairs) {
    const n = s.split('"' + from + '"').length - 1;
    if (n) {
      s = s.split('"' + from + '"').join('"' + to + '"');
      console.log(f + ': ' + n + ' x ' + from);
    }
  }
  fs.writeFileSync(f, s, 'utf8');
}
