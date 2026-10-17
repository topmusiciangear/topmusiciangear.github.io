const fs = require('fs');
const B = 'C:/Users/Daniel/projects/topmusiciangear/';
['best-midi-theory-plugins.html', 'best-midi-theory-plugins_es.html'].forEach(f => {
  const h = fs.readFileSync(B + 'guides/' + f, 'utf8');
  const i = h.indexOf('guide-product-card-title">Audiomodern Riffer 4');
  const img = (h.slice(i - 1400, i).match(/guide-product-card-img"><img src="([^"]+)"/) || [])[1] || 'sin img';
  const og = (h.match(/property="og:image" content="([^"]+)"/) || [])[1];
  const hero = (h.match(/class="guide-detail-img"><img src="([^"]+)"/) || [])[1];
  console.log('=== ' + f);
  console.log('  img card: ' + img);
  console.log('  og:image: ' + og);
  console.log('  hero: ' + hero);
  console.log('  link G4M 43YY: ' + (/43YY/.test(h) ? 'OK' : 'FALTA'));
  console.log('  foto vieja landr fuera: ' + (!/landr\.com/.test(h)));
});
const sb = fs.readFileSync(B + 'js/shop-buttons.js', 'utf8');
console.log('\nmapa 1011: ' + (sb.match(/\n1011: \{prices:\{[^}]*\}[^\n]*/) || [''])[0].trim());