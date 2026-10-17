const fs = require('fs');
const B = 'C:/Users/Daniel/projects/topmusiciangear/';
['best-guitar-plugins.html', 'best-guitar-plugins_es.html'].forEach(f => {
  const h = fs.readFileSync(B + 'guides/' + f, 'utf8');
  const i = h.indexOf('guide-product-card-title">Kiive Audio Lunchbox Amp Sim');
  const img = (h.slice(i - 1400, i).match(/guide-product-card-img"><img src="([^"]+)"/) || [])[1] || 'sin img';
  console.log(f);
  console.log('  img: ' + (img.indexOf('u5zmzsa7enh2qle445s66qd3sumn') > -1 ? 'OK' : 'FALTA ' + img));
  console.log('  foto vieja Overloud fuera: ' + (!h.includes('overloud.com')));
  const card = h.slice(i, i + 2400);
  console.log('  precio boton: ' + (card.match(/- ([€$£][\d.]+)/) || [])[1]);
});