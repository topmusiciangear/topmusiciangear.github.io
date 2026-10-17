const fs = require('fs');
const B = 'C:/Users/Daniel/projects/topmusiciangear/';
['best-piano-keyboard-vsts.html', 'best-piano-keyboard-vsts_es.html'].forEach(f => {
  const h = fs.readFileSync(B + 'guides/' + f, 'utf8');
  const i = h.indexOf('guide-product-card-title">Native Instruments Noire');
  const img = (h.slice(i - 1400, i).match(/guide-product-card-img"><img src="([^"]+)"/) || [])[1] || 'sin img';
  console.log(f + ' -> ' + img);
  console.log('  banner correcto: ' + (img.includes('oq40l98skd6uogdulc20z92udwkh') ? 'SI' : 'NO'));
});