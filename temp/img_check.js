const fs = require('fs');
const h = fs.readFileSync('C:/Users/Daniel/projects/topmusiciangear/guides/best-piano-keyboard-vsts.html', 'utf8');
['MeldaProduction MeldwayGrand', 'Native Instruments Kontakt 8', 'Arturia V Collection 11 Pro'].forEach(n => {
  const i = h.indexOf('guide-product-card-title">' + n);
  const before = h.slice(i - 1400, i);
  const img = (before.match(/guide-product-card-img"><img src="([^"]+)"/) || [])[1] || 'sin img';
  console.log(n + ' -> ' + img);
});