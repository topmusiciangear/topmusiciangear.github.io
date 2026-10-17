const fs = require('fs');
const B = 'C:/Users/Daniel/projects/topmusiciangear/';
['best-guitar-plugins.html', 'best-guitar-plugins_es.html'].forEach(f => {
  const h = fs.readFileSync(B + 'guides/' + f, 'utf8');
  const i = h.indexOf('guide-product-card-title">Two Notes Audio Engineering GENOME');
  const img = (h.slice(i - 1400, i).match(/guide-product-card-img"><img src="([^"]+)"/) || [])[1] || 'sin img';
  const card = h.slice(i, i + 2600);
  const pb = [card.match(/data-pb-eu-p="([^"]*)"/), card.match(/data-pb-us-p="([^"]*)"/), card.match(/data-pb-uk-p="([^"]*)"/)].map(m => m ? m[1] : '?');
  console.log('=== ' + f);
  console.log('  img: ' + (img.indexOf('5g25exhl6gnvjuf00ezqtz9zgjca') > -1 ? 'OK' : 'FALTA ' + img));
  console.log('  precio boton: EU=' + pb[0] + ' US=' + pb[1] + ' UK=' + pb[2]);
  console.log('  JSON-LD price: ' + (h.slice(Math.max(0, h.indexOf('11868-GENOME') - 400), h.indexOf('11868-GENOME') + 120).match(/"price":\s*"?([\d.]+)/) || [])[1]);
  console.log('  precio viejo 200.67: ' + (h.includes('200.67') ? 'AUN PRESENTE' : 'fuera'));
  console.log('  foto vieja positivegrid fuera: ' + (!/positivegrid\.com/.test(h)));
});