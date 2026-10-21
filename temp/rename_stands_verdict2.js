const fs = require('fs');
let s = fs.readFileSync('data/guides.json', 'utf8');

const pairs = [
  ['IsoAcoustics ISO-200 (Pair)', 'IsoAcoustics ISO-200 Studio Monitor Stands (Pair)'],
  ['IsoAcoustics ISO-200 (Par)', 'Soportes de monitor IsoAcoustics ISO-200 (par)'],
  ['Ultimate Support MS-100 (Pair)', 'Ultimate Support MS-100 Studio Monitor Stands (Pair)'],
  ['Ultimate Support MS-100 (Par)', 'Soportes de monitor Ultimate Support MS-100 (par)']
];

for (const [from, to] of pairs) {
  const n = s.split(from).length - 1;
  console.log(n + ' x ' + from);
  s = s.split(from).join(to);
}

JSON.parse(s);
fs.writeFileSync('data/guides.json', s, 'utf8');
for (const [from] of pairs) {
  console.log('restos ' + from + ': ' + (s.split(from).length - 1));
}
