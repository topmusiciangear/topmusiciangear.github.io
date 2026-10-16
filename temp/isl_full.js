const fs = require('fs');
const B = 'C:/Users/Daniel/projects/topmusiciangear/';
const clean = 'https://r2.gear4music.com/media/88/882775/1200/preview.jpg';
fetch(clean, { method: 'HEAD' })
  .then(r => {
    console.log('foto: ' + r.status + ' | ' + r.headers.get('content-type'));
    if (r.status !== 200) process.exit(1);
    const products = JSON.parse(fs.readFileSync(B + 'data/products.json', 'utf8'));
    const p = products.find(x => x.id === 1038);
    console.log('1038 stores antes: ' + JSON.stringify(p.stores));
    p.image = clean;
    p.img = clean;
    p.stores.pluginboutique = 'https://www.pluginboutique.com/product/2-Effects/9-Limiter/1787-ISL-2st';
    p.stores.gear4music = 'https://www.gear4music.com/Recording-and-Computers/NUGEN-ISL-2ST/4WXD';
    p.stores.musicstore = 'https://www.musicstore.com/en_OE/EUR/NUGEN-Audio-ISL-2-License-Code/art-PCM0016569-000';
    fs.writeFileSync(B + 'data/products.json', JSON.stringify(products, null, 2), 'utf8');
    // geo: EUR 146 -> USD 146/1.0084=144.78 -> GBP x0.7959=115.23
    const us = (146 / 1.0084).toFixed(2);
    const uk = (us * 0.7959).toFixed(2);
    console.log('geo: EUR 146 -> USD ' + us + ' -> GBP ' + uk);
    let bg = fs.readFileSync(B + 'build-guides.js', 'utf8');
    const oldE = '1038: {prices:{pluginboutique:"€150.25"},pbCur:{us:"$149.00",uk:"£118.59"}},\n';
    const newE = '1038: {prices:{pluginboutique:"€146.00",gear4music:"£149.00",musicstore:"€194.00"},pbCur:{us:"$' + us + '",uk:"£' + uk + '"}},\n';
    if (!bg.includes(oldE)) { console.log('ENTRADA 1038 NO ENCONTRADA'); process.exit(1); }
    bg = bg.split(oldE).join(newE);
    fs.writeFileSync(B + 'build-guides.js', bg, 'utf8');
    new Function(bg);
    console.log('1038 completo OK');
  })
  .catch(e => { console.log('ERROR: ' + e.message); process.exit(1); });
