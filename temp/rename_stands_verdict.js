const fs = require('fs');
let s = fs.readFileSync('data/guides.json', 'utf8');

const pairs = [
  ['<span class="product-name">IsoAcoustics ISO-200 (Pair)</span>', '<span class="product-name">IsoAcoustics ISO-200 Studio Monitor Stands (Pair)</span>'],
  ['<span class="product-name">IsoAcoustics ISO-200 (Par)</span>', '<span class="product-name">Soportes de monitor IsoAcoustics ISO-200 (par)</span>'],
  ['<span class="product-name">Ultimate Support MS-100 (Pair)</span>', '<span class="product-name">Ultimate Support MS-100 Studio Monitor Stands (Pair)</span>'],
  ['<span class="product-name">Ultimate Support MS-100 (Par)</span>', '<span class="product-name">Soportes de monitor Ultimate Support MS-100 (par)</span>']
];

for (const [from, to] of pairs) {
  const n = s.split(from).length - 1;
  console.log(n + ' x ' + from.slice(0, 60));
  s = s.split(from).join(to);
}

JSON.parse(s);
fs.writeFileSync('data/guides.json', s, 'utf8');
for (const n of ['IsoAcoustics ISO-200 (Pair)', 'IsoAcoustics ISO-200 (Par)', 'Ultimate Support MS-100 (Pair)', 'Ultimate Support MS-100 (Par)']) {
  console.log('restos ' + n + ': ' + (s.split(n).length - 1));
}
