const fs = require('fs');
const img = 'https://r2.gear4music.com/media/113/1132477/1200/preview.jpg';
fetch(img, { method: 'HEAD' }).then(r => {
  const ct = r.headers.get('content-type');
  console.log('foto Kontakt 8 G4M: ' + r.status + ' | ' + ct);
  if (r.status !== 200 || !/^image\//.test(ct || '')) { console.log('RECHAZADA'); return; }
  const pp = 'C:/Users/Daniel/projects/topmusiciangear/data/products.json';
  const products = JSON.parse(fs.readFileSync(pp, 'utf8'));
  const p = products.find(x => x.id === 1014);
  const old = p.image;
  p.image = img;
  fs.writeFileSync(pp, JSON.stringify(products, null, 2), 'utf8');
  console.log('1014 image: ' + old + '\n        -> ' + p.image);
}).catch(e => console.log('ERROR ' + e.message));