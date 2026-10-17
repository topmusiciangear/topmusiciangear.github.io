const fs = require('fs');
const B = 'C:/Users/Daniel/projects/topmusiciangear/';
['best-guitar-plugins.html', 'best-guitar-plugins_es.html'].forEach(f => {
  const h = fs.readFileSync(B + 'guides/' + f, 'utf8');
  const i = h.indexOf('guide-product-card-title">Softube Amp Room Marshall Suite');
  const img = (h.slice(i - 1400, i).match(/guide-product-card-img"><img src="([^"]+)"/) || [])[1] || 'sin img';
  const c = h.slice(i, i + 2400);
  const g = k => (c.match(new RegExp('data-pb-' + k + '-p="([^"]*)"')) || [])[1];
  console.log(f);
  console.log('  img: ' + (img.indexOf('jw9d7a7qkh6x0oas55mvpwqt7d16') > -1 ? 'OK' : 'FALTA ' + img));
  console.log('  precio boton: eu=' + g('eu') + ' us=' + g('us') + ' uk=' + g('uk'));
  console.log('  foto vieja softube fuera de la card: ' + (!h.slice(i - 1400, i).includes('softube.com')));
});
// resumen final de la guia
const h = fs.readFileSync(B + 'guides/best-guitar-plugins.html', 'utf8');
const cards = [...h.matchAll(/guide-product-card-title">([^<]+)<\/h3>[\s\S]{0,1400}?guide-product-card-desc">([^<]{0,80})/g)];
console.log('\n--- cards de la guia ---');
cards.forEach(m => console.log('  ' + m[1] + '\n     ' + m[2].slice(0, 70) + '...'));