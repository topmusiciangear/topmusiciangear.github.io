const fs = require('fs');
const B = 'C:/Users/Daniel/projects/topmusiciangear/';
['best-piano-keyboard-vsts.html', 'best-piano-keyboard-vsts_es.html'].forEach(f => {
  const h = fs.readFileSync(B + 'guides/' + f, 'utf8');
  const i = h.indexOf('guide-product-card-title">Arturia Augmented GRAND PIANO');
  const img = (h.slice(i - 1400, i).match(/guide-product-card-img"><img src="([^"]+)"/) || [])[1] || 'sin img';
  const card = h.slice(i, i + 3200);
  const stores = [...new Set([...card.matchAll(/data-store="([a-z]+)"/g)].map(m => m[1]))];
  const pb = (card.match(/data-pb-eu-p="([^"]*)"/) || [])[1];
  console.log(f);
  console.log('  img: ' + img);
  console.log('  pb-eu: ' + pb + ' | estaticos: ' + stores.join(', '));
  [['G4M 5GDL', /5GDL/], ['Andertons', /arturia-augmented-grand-piano/], ['zZounds', /ARAAUGGRANDPIANO/], ['foto vieja UVI fuera', /uvi\.net/]].forEach(([l, re]) => console.log('  ' + l + ': ' + (re.test(h) ? 'OK' : 'FALTA')));
});