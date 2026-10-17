const fs = require('fs');
const B = 'C:/Users/Daniel/projects/topmusiciangear/';
const h = fs.readFileSync(B + 'guides/best-piano-keyboard-vsts.html', 'utf8');
const names = ['MeldaProduction MeldwayGrand', 'Native Instruments Kontakt 8', 'Arturia V Collection 11 Pro'];
names.forEach(name => {
  const i = h.indexOf('guide-product-card-title">' + name);
  // img de la card: la ULTIMA img antes del h3 (la de la propia card)
  const before = h.slice(Math.max(0, i - 1200), i);
  const imgs = [...before.matchAll(/<img[^>]+src="([^"]+)"/g)].map(m => m[1]);
  const img = imgs[imgs.length - 1] || 'sin img';
  const s = h.slice(i, i + 2000);
  console.log('=== ' + name);
  console.log('  img: ' + img);
  console.log('  pb href ok: ' + /pluginboutique\.com\/product\/[^"]*a_aid=6a01e859cbe1a/.test(s));
});
console.log('\n--- URLs de tienda embebidas en la pagina ---');
[['Kontakt 8 G4M', 'Native-Instruments-Kontakt-8/6NPI'],
 ['VColl G4M', 'Arturia-V-Collection-11-Pro/73TV'],
 ['VColl zZ', 'item--ARAVCOLL11PRO'],
 ['VColl Andertons', 'arturia-vcollection-11-pro--esd'],
 ['VColl MS', 'art-PCM0018468-000'],
 ['Meldway PB banner', 'ptnotkmxcgncqbh5xzau13vw5bje']].forEach(([l, u]) => {
  console.log('  ' + l + ': ' + (h.indexOf(u) > -1 ? 'OK' : 'FALTA'));
});
console.log('\n--- imagenes de producto en products.json ---');
const products = JSON.parse(fs.readFileSync(B + 'data/products.json', 'utf8'));
[1013, 1014, 1015].forEach(id => {
  const p = products.find(x => x.id === id);
  console.log('  ' + id + ' ' + p.title + ' -> ' + p.image);
});