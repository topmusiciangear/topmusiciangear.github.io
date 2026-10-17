const fs = require('fs');
const B = 'C:/Users/Daniel/projects/topmusiciangear/';
['best-guitar-plugins.html', 'best-guitar-plugins_es.html'].forEach(f => {
  const h = fs.readFileSync(B + 'guides/' + f, 'utf8');
  const i = h.indexOf('guide-product-card-title">Universal Audio UAD Sound City Studios');
  const img = (h.slice(i - 1400, i).match(/guide-product-card-img"><img src="([^"]+)"/) || [])[1] || 'sin img';
  console.log('=== ' + f);
  console.log('  img: ' + (img.indexOf('102/1022509') > -1 ? 'OK' : 'FALTA ' + img));
  [['G4M 6375', /6375/], ['zZounds item--UADSOUNDCITYSTU', /UADSOUNDCITYSTU/], ['Andertons', /universal-audio-sound-city-studios--esd/], ['MS art-PCM0018298', /PCM0018298/]].forEach(([l, re]) => console.log('  ' + l + ': ' + (re.test(h) ? 'OK' : 'FALTA')));
  console.log('  parametros de sesion eliminados: siid=' + (h.includes('siid=345558') ? 'NO' : 'si') + ' search_query=' + (h.includes('search_query=Universal') ? 'NO' : 'si'));
  console.log('  precio viejo 150.25: ' + (h.includes('150.25') ? 'AUN PRESENTE' : 'fuera'));
  const card = h.slice(i, i + 2600);
  console.log('  boton PB: EU=' + (card.match(/data-pb-eu-p="([^"]*)"/) || [])[1] + ' US=' + (card.match(/data-pb-us-p="([^"]*)"/) || [])[1] + ' UK=' + (card.match(/data-pb-uk-p="([^"]*)"/) || [])[1]);
});
const sb = fs.readFileSync(B + 'js/shop-buttons.js', 'utf8');
console.log('\nmapa 1021: ' + (sb.match(/\n1021: \{prices:\{[^}]*\}[^\n]*/) || [''])[0].trim());