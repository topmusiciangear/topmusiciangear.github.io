const fs = require('fs');
const B = 'C:/Users/Daniel/projects/topmusiciangear/';
const EUR = 251.00;
const us = (EUR / 1.0084).toFixed(2);
const uk = ((EUR / 1.0084) * 0.7959).toFixed(2);
const FOTO = 'https://r2.gear4music.com/media/102/1022509/1200/preview.jpg';

const pp = B + 'data/products.json';
const products = JSON.parse(fs.readFileSync(pp, 'utf8'));
const p = products.find(x => x.id === 1021);
if (!p) { console.log('1021 no existe'); process.exit(1); }
p.img = FOTO; p.image = FOTO;
p.stores.gear4music = 'https://www.gear4music.com/Recording-and-Computers/Universal-Audio-Sound-City-Studios/6375';
p.stores.zzounds = 'https://www.zzounds.com/item--UADSOUNDCITYSTU';
p.stores.andertons = 'https://www.andertons.co.uk/universal-audio-sound-city-studios--esd/';
p.stores.musicstore = 'https://www.musicstore.com/en_OE/EUR/Universal-Audio-Sound-City-Studios/art-PCM0018298-000';
fs.writeFileSync(pp, JSON.stringify(products, null, 2), 'utf8');
console.log('1021 img=' + p.img);
console.log('  stores=' + Object.keys(p.stores).join(', '));

let bg = fs.readFileSync(B + 'build-guides.js', 'utf8');
const viejo = '\n1021: {prices:{pluginboutique:"\u20AC150.25"},pbCur:{us:"$149.00",uk:"\u00A3118.59"}},';
const nuevo = '\n1021: {prices:{pluginboutique:"\u20AC' + EUR.toFixed(2) +
  '",gear4music:"\u00A373.00",zzounds:"$79.00",andertons:"\u00A370.00",musicstore:"\u20AC77.00"},pbCur:{us:"$' + us + '",uk:"\u00A3' + uk + '"}},';
if (!bg.includes(viejo)) { console.log('linea 1021 NO encontrada'); process.exit(1); }
if (bg.indexOf(viejo) !== bg.lastIndexOf(viejo)) { console.log('AMBIGUA'); process.exit(1); }
bg = bg.replace(viejo, nuevo);
fs.writeFileSync(B + 'build-guides.js', bg, 'utf8');
console.log('\nTEST_SHOP_BTN 1021 -> ' + nuevo.trim());
console.log('PB geo: EU \u20AC' + EUR.toFixed(2) + ' | US $' + us + ' | UK \u00A3' + uk);