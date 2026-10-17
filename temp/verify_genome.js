const fs = require('fs');
const B = 'C:/Users/Daniel/projects/topmusiciangear/';
['best-guitar-plugins.html', 'best-guitar-plugins_es.html'].forEach(f => {
  const h = fs.readFileSync(B + 'guides/' + f, 'utf8');
  const i = h.indexOf('guide-product-card-title">Two Notes Audio Engineering GENOME');
  const c = h.slice(i, i + 2400);
  const g = k => (c.match(new RegExp('data-pb-' + k + '-p="([^"]*)"')) || [])[1];
  console.log(f + ': GENOME eu=' + g('eu') + ' us=' + g('us') + ' uk=' + g('uk'));
});
const sb = fs.readFileSync(B + 'js/shop-buttons.js', 'utf8');
console.log('\nmapa 1020: ' + (sb.match(/\n1020: \{prices:\{[^}]*\}[^\n]*/) || [''])[0].trim());