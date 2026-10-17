const fs = require('fs');
const B = 'C:/Users/Daniel/projects/topmusiciangear/';
['best-guitar-plugins.html', 'best-guitar-plugins_es.html'].forEach(f => {
  const h = fs.readFileSync(B + 'guides/' + f, 'utf8');
  console.log('=== ' + f);
  console.log('  portada og:image: ' + (h.match(/property="og:image" content="([^"]+)"/) || [])[1]);
  console.log('  hero: ' + (h.match(/class="guide-detail-img"><img src="([^"]+)"/) || [])[1]);
  const i = h.indexOf('guide-product-card-title">IK Multimedia AmpliTube 5');
  const img = (h.slice(i - 1400, i).match(/guide-product-card-img"><img src="([^"]+)"/) || [])[1] || 'sin img';
  const desc = (h.slice(i, i + 3000).match(/guide-product-card-desc">([^<]*)/) || [])[1];
  console.log('  card img: ' + (img.indexOf('71/711975') > -1 ? 'OK' : 'FALTA ' + img));
  console.log('  card desc: ' + (desc || '').slice(0, 150));
  console.log('  stores: ' + ['gear4music', 'musicstore', 'andertons', 'zzounds', 'pluginboutique'].filter(k => h.indexOf(k) > -1).join(', '));
  console.log('  enlace MAX v2: ' + (h.indexOf('12444-AmpliTube-5-MAX-v2') > -1 ? 'OK' : 'FALTA'));
  console.log('  pbCur en el boton: ' + ['238.00', '189.42'].map(v => v + '=' + (h.includes(v) ? 'si' : 'no')).join(', '));
});
const sb = fs.readFileSync(B + 'js/shop-buttons.js', 'utf8');
console.log('\nmapa 1019: ' + (sb.match(/\n1019: \{prices:\{[^}]*\}[^\n]*/) || [''])[0].trim());