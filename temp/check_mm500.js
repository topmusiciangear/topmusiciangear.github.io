const fs = require('fs');
const B = 'C:/Users/Daniel/projects/topmusiciangear/';
const products = JSON.parse(fs.readFileSync(B + 'data/products.json', 'utf8'));
const p = products.find(x => x.id === 1050);
console.log('=== Audeze MM-500 ===');
console.log('id:', p.id, '| price:', p.price, '| score:', p.score);
console.log('img:', p.img);
console.log('desc:', p.desc);
console.log('desc_es:', p.desc_es);
console.log('stores:', Object.keys(p.stores).join(', '));

// Verificar que el enlace de G4M no tiene afiliado y el de Amazon si
console.log('\ngear4music:', p.stores.gear4music);
console.log('amazon:', p.stores.amazon);
console.log('musicstore:', p.stores.musicstore);
