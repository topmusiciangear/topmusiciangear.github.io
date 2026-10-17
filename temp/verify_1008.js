const fs = require('fs');
const B = 'C:/Users/Daniel/projects/topmusiciangear/';
['best-midi-theory-plugins.html', 'best-midi-theory-plugins_es.html'].forEach(f => {
  const h = fs.readFileSync(B + 'guides/' + f, 'utf8');
  const i = h.indexOf('guide-product-card-title">SongWish reMIDI 4');
  const card = h.slice(i, i + 2200);
  const eu = (card.match(/data-pb-eu-p="([^"]*)"/) || [])[1];
  const us = (card.match(/data-pb-us-p="([^"]*)"/) || [])[1];
  const uk = (card.match(/data-pb-uk-p="([^"]*)"/) || [])[1];
  console.log(f + ' -> EU=' + eu + ' US=' + us + ' UK=' + uk);
  console.log('  precio viejo 129.08 presente: ' + (h.includes('129.08') ? 'SI (mal)' : 'no'));
});
const sb = fs.readFileSync(B + 'js/shop-buttons.js', 'utf8');
console.log('\nmapa: ' + (sb.match(/\n1008: \{prices:\{[^}]*\}[^\n]*/) || [''])[0].trim());