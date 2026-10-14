const fs = require('fs');
const BASE = 'C:/Users/Daniel/projects/topmusiciangear/';
const die = (m) => { console.log('!! ' + m); process.exit(1); };
const IMG = 'https://r2.gear4music.com/media/27/272942/1200/preview.jpg?_gl=1*1p5wync*_gcl_aw*R0NMLjE3OTE5OTMyNzcuQ2p3S0NBancwTHpXQmhCT0Vpd0FLUWQwY0VaVTQyR1Q0MEJBNm5jNEZod0x3ek9XRVJrbnpqajdUc1Q3S043MlVCcDZkZ1BaaDhMcEVSb0NVMkVRQXZEX0J3RQ..*_gcl_au*NTU1MzIwMzg2LjE3OTIwMDU3NDU';

const gj = BASE + 'data/guides.json';
const guides = JSON.parse(fs.readFileSync(gj, 'utf8'));
const g = guides.find(x => x.id === 'budget-bass-like-expensive');
console.log('portada antes: ' + g.image);
g.image = IMG;
fs.writeFileSync(gj, JSON.stringify(guides, null, 2));
console.log('portada ahora: ' + g.image);
const P = JSON.parse(fs.readFileSync(BASE + 'data/products.json', 'utf8'));
const arr = Array.isArray(P) ? P : P.products;
const same = arr.find(p => (p.img || '').split('?')[0] === IMG.split('?')[0]);
console.log('es la foto de: ' + (same ? same.id + ' ' + same.title : 'sin coincidir'));