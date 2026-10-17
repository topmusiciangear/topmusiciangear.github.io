const fs = require('fs');
const B = 'C:/Users/Daniel/projects/topmusiciangear/';
const products = JSON.parse(fs.readFileSync(B + 'data/products.json', 'utf8'));
['y6ruklv61rrkb4zs70uvs2qaw6a8', 'ol54b93phhlc4evsrjr8txrsj537', 'c2mhr9eoakhqvodf5qwlzp3x8372'].forEach(b => {
  const owners = products.filter(p => (p.image || '').includes(b)).map(p => p.id + ' ' + p.title);
  console.log(b.slice(0, 12) + ' -> ' + (owners.length ? owners.join(' / ') : 'NINGUN producto (esta en el HTML por otra via)'));
});
console.log('\n--- HTML: imagenes por tarjeta (buscando el src justo antes de cada h3) ---');
const h = fs.readFileSync(B + 'guides/best-piano-keyboard-vsts.html', 'utf8');
['MeldaProduction MeldwayGrand', 'Native Instruments Kontakt 8', 'Arturia V Collection 11 Pro', 'XLN Audio Addictive Keys'].forEach(name => {
  const i = h.indexOf('guide-product-card-title">' + name);
  // inicio real de la card: buscar hacia atras el primer "guide-product-card" que no sea parte del cierre
  const seg = h.slice(i, i + 1800);
  const cardImg = (seg.match(/guide-product-card-img"[^>]*src="([^"]+)"/) || [])[1];
  console.log('  ' + name + ' -> ' + (cardImg || 'sin img en card'));
});
console.log('\n--- HTML: URLs de tienda (con encoding) ---');
[['Kontakt 8 G4M', /6NPI/], ['VColl G4M', /73TV/], ['VColl zZ', /ARAVCOLL11PRO/], ['VColl MS', /PCM0018468/], ['VColl Andertons', /vcollection-11-pro--esd/], ['Meldway PB banner', /ptnotkm/]].forEach(([l, re]) => {
  console.log('  ' + l + ': ' + (re.test(h) ? 'OK' : 'FALTA'));
});