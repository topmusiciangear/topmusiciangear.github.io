const fs = require('fs');
const files = [
  'guides/open-headphones.html',
  'guides/open-headphones_es.html',
  'guides/best-headphones.html',
  'guides/best-headphones_es.html',
  'guides/best-headphones-for-mixing.html',
  'guides/best-headphones-for-mixing_es.html',
  'guides/hd490-pro-vs-dt990.html',
  'guides/hd490-pro-vs-dt990_es.html'
];
const count = (h, s) => h.split(s).length - 1;
for (const f of files) {
  const h = fs.readFileSync(f, 'utf8');
  console.log(
    f.split('/').pop(),
    '| PlusCard:', count(h, 'guide-product-card-title">Sennheiser HD 490 Pro Plus'),
    '| ProCard:', count(h, 'guide-product-card-title">Sennheiser HD 490 Pro<'),
    '| UKPro:', count(h, 'B0CP6C4J5W'),
    '| UKPlus:', count(h, 'B0CP6B497Z'),
    '| zZoundsPlus:', count(h, 'SENHD490PROPLUS')
  );
}
