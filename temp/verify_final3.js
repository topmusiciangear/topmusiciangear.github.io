const fs = require('fs');
const B = 'C:/Users/Daniel/projects/topmusiciangear/';
const h = fs.readFileSync(B + 'guides/best-piano-keyboard-vsts.html', 'utf8');
const hEs = fs.readFileSync(B + 'guides/best-piano-keyboard-vsts_es.html', 'utf8');
[['MeldaProduction MeldwayGrand', 1013], ['Native Instruments Kontakt 8', 1014], ['Arturia V Collection 11 Pro', 1015]].forEach(([name, id]) => {
  const i = h.indexOf('guide-product-card-title">' + name);
  const card = h.slice(i, i + 3000);
  const img = (card.match(/guide-product-card-img"><img src="([^"]+)"/) || [])[1] || 'sin img';
  const stores = [...new Set([...card.matchAll(/data-store="([a-z]+)"/g)].map(m => m[1]))];
  const rows = [...card.matchAll(/shop-btn-more-item[\s\S]{0,180}?data-store="([a-z]+)"[\s\S]{0,220}?(-|€|£|\$)\s?([\d.,]+)/g)];
  console.log('=== ' + name);
  console.log('  img: ' + img);
  console.log('  render estatico: ' + stores.join(', '));
  console.log('  filas con precio visibles: ' + (rows.length ? rows.map(r => r[1] + ' ' + r[2] + r[3]).join(' | ') : 'se pintan en runtime'));
});
console.log('\nES card Meldway: ' + (hEs.includes('ptnotkmxcgncqbh5xzau13vw5bje') ? 'imagen OK' : 'FALTA'));
console.log('ES precio 1013 en HTML: ' + ((hEs.match(/data-pb-eu-p="([^"]*)"/) || [])[1] || 'n/a'));