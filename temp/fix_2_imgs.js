// Arreglar las 2 imagenes realmente rotas que quedan:
//   595 Keeley Caverns V2 -> robertkeeley.com devuelve 202 text/html (reto de Cloudflare) -> zZounds
//   667 Shure MV6         -> products.shureweb.eu devuelve 403 (hotlink bloqueado)      -> Gear4Music
// El 360 (Sennheiser MKH 50-P48) NO se toca: es un JPEG valido, se ve bien aunque el
// Content-Type sea "jpg"; la unica alternativa es panoramica y en una tarjeta 4/3 se cortaria.
const fs = require('fs');
const F = 'C:/Users/Daniel/projects/topmusiciangear/data/products.json';
const p = JSON.parse(fs.readFileSync(F, 'utf8'));

const CAMBIOS = [
  [595, 'Keeley Caverns V2',
    'https://cf1.zzounds.com/media/productmedia/fit%2C1200by630/quality%2C85/CavernsFaceNewLogoHiRes-5c215819a8740c25e8c220cdcb52b2b5.jpg',
    'zZounds (G4M no lo tiene)'],
  [667, 'Shure MV6',
    'https://r2.gear4music.com/media/112/1126877/1200/preview.jpg',
    'Gear4Music (CDN, tiene el producto)']
];

CAMBIOS.forEach(([id, nombre, nueva, origen]) => {
  const x = p.find(y => y.id === id);
  if (!x) { console.log('  ' + id + ' NO ENCONTRADO'); return; }
  console.log('\n=== ' + id + '  ' + nombre + ' ===');
  console.log('  origen de la nueva: ' + origen);
  console.log('  antes: ' + x.img);
  x.img = nueva;
  if ('image' in x) { console.log('  image antes: ' + x.image); x.image = nueva; }
  console.log('  despues: ' + x.img);
});

fs.writeFileSync(F, JSON.stringify(p, null, 2) + '\n', 'utf8');

const raw = fs.readFileSync(F, 'utf8');
console.log('\n=== CONTROL ===');
console.log('  mojibake            : ' + (raw.match(/â‚¬|Â£|Â°/g) || []).length);
console.log('  productos           : ' + JSON.parse(raw).length);
console.log('  URLs de robertkeeley: ' + (raw.match(/robertkeeley\.com\/wp-content/g) || []).length);
console.log('  URLs de shureweb    : ' + (raw.match(/products\.shureweb\.eu/g) || []).length);
CAMBIOS.forEach(([id]) => {
  const y = JSON.parse(raw).find(z => z.id === id);
  console.log('  ' + id + '.img -> ' + y.img);
});
