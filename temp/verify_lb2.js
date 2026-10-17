const fs = require('fs');
const B = 'C:/Users/Daniel/projects/topmusiciangear/';
const h = fs.readFileSync(B + 'guides/best-guitar-plugins.html', 'utf8');
[['Kiive Audio Lunchbox Amp Sim', 'Lunchbox'], ['Universal Audio UAD Sound City Studios', 'UAD Sound City']].forEach(([n, l]) => {
  const i = h.indexOf('guide-product-card-title">' + n);
  const c = h.slice(i, i + 2600);
  const g = k => (c.match(new RegExp('data-pb-' + k + '-p="([^"]*)"')) || [])[1];
  console.log(l + ': eu=' + g('eu') + ' us=' + g('us') + ' uk=' + g('uk'));
});