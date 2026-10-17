const fs = require('fs');
const B = 'C:/Users/Daniel/projects/topmusiciangear/';
['best-piano-keyboard-vsts.html', 'best-piano-keyboard-vsts_es.html'].forEach(f => {
  const h = fs.readFileSync(B + 'guides/' + f, 'utf8');
  console.log(f + ': MS Kontakt 8 -> ' + (/PCM0018134/.test(h) ? 'OK' : 'FALTA'));
  const i = h.indexOf('guide-product-card-title">Native Instruments Kontakt 8');
  const card = h.slice(i, i + 3200);
  console.log('  img: ' + ((h.slice(i - 1400, i).match(/guide-product-card-img"><img src="([^"]+)"/) || [])[1] || 'sin img'));
  console.log('  pb-eu: ' + ((card.match(/data-pb-eu-p="([^"]*)"/) || [])[1]));
});
const sb = fs.readFileSync(B + 'js/shop-buttons.js', 'utf8');
console.log('\nmapa 1014: ' + (sb.match(/\n1014: \{prices:\{[^}]*\}[^\n]*/) || [''])[0].trim());
console.log('mapa 1018: ' + (sb.match(/\n1018: \{prices:\{[^}]*\}[^\n]*/) || [''])[0].trim());