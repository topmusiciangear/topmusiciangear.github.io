const fs = require('fs');
const B = 'C:/Users/Daniel/projects/topmusiciangear/';
const clean = 'https://r2.gear4music.com/media/115/1156757/1200/preview.jpg';
fetch(clean, { method: 'HEAD' })
  .then(r => {
    console.log('foto: ' + r.status + ' | ' + r.headers.get('content-type'));
    if (r.status !== 200) process.exit(1);
    const products = JSON.parse(fs.readFileSync(B + 'data/products.json', 'utf8'));
    const p = products.find(x => x.id === 1041);
    p.image = clean;
    p.stores.gear4music = 'https://www.gear4music.com/Recording-and-Computers/iZotope-Nectar-4-Advanced/6UQ4';
    p.stores.andertons = 'https://www.andertons.co.uk/izotope-nectar-4-advanced--esd/';
    p.stores.musicstore = 'https://www.musicstore.com/en_OE/EUR/iZotope-Nectar-4-Advanced-License-Code/art-PCM0017758-000';
    fs.writeFileSync(B + 'data/products.json', JSON.stringify(products, null, 2), 'utf8');
    console.log('1041 tiendas+foto OK');
    let bg = fs.readFileSync(B + 'build-guides.js', 'utf8');
    const oldE = '1041: {prices:{pluginboutique:"€331.75"},pbCur:{us:"$299.00",uk:"£237.97"}},\n';
    const newE = '1041: {prices:{pluginboutique:"€331.75",gear4music:"£295.00",andertons:"£289.00",musicstore:"€319.00"},pbCur:{us:"$299.00",uk:"£237.97"}},\n';
    if (!bg.includes(oldE)) { console.log('ENTRADA 1041 NO ENCONTRADA'); process.exit(1); }
    bg = bg.split(oldE).join(newE);
    fs.writeFileSync(B + 'build-guides.js', bg, 'utf8');
    new Function(bg);
    console.log('TEST 1041 4 tiendas OK');
  })
  .catch(e => { console.log('ERROR: ' + e.message); process.exit(1); });
