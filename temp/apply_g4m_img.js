const fs = require('fs');
const B = 'C:/Users/Daniel/projects/topmusiciangear/';
const clean = 'https://r2.gear4music.com/media/130/1304045/1200/preview_1.jpg';
fetch(clean, { method: 'HEAD' })
  .then(r => {
    console.log('G4M img status: ' + r.status + ' | type: ' + r.headers.get('content-type'));
    if (r.status === 200 && (r.headers.get('content-type') || '').startsWith('image/')) {
      const products = JSON.parse(fs.readFileSync(B + 'data/products.json', 'utf8'));
      const p = products.find(x => x.id === 1040);
      p.image = clean;
      fs.writeFileSync(B + 'data/products.json', JSON.stringify(products, null, 2), 'utf8');
      console.log('1040.image = G4M');
    } else { console.log('IMAGEN NO VALIDA, no se aplica'); process.exit(1); }
  })
  .catch(e => { console.log('ERROR: ' + e.message); process.exit(1); });
