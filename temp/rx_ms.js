const fs = require('fs');
const B = 'C:/Users/Daniel/projects/topmusiciangear/';
const products = JSON.parse(fs.readFileSync(B + 'data/products.json', 'utf8'));
products.find(x => x.id === 1025).stores.musicstore = 'https://www.musicstore.com/en_OE/EUR/iZotope-RX-12-Standard/art-PCM0018851-000';
fs.writeFileSync(B + 'data/products.json', JSON.stringify(products, null, 2), 'utf8');
let bg = fs.readFileSync(B + 'build-guides.js', 'utf8');
const oldE = '1025: {prices:{pluginboutique:"€442.00",gear4music:"£389.00",andertons:"£389.00"},pbCur:{us:"$438.32",uk:"£348.86"}},\n';
const newE = '1025: {prices:{pluginboutique:"€442.00",gear4music:"£389.00",andertons:"£389.00",musicstore:"€429.00"},pbCur:{us:"$438.32",uk:"£348.86"}},\n';
if (!bg.includes(oldE)) { console.log('ENTRADA 1025 NO ENCONTRADA'); process.exit(1); }
bg = bg.split(oldE).join(newE);
fs.writeFileSync(B + 'build-guides.js', bg, 'utf8');
new Function(bg);
const guides = JSON.parse(fs.readFileSync(B + 'data/guides.json', 'utf8'));
guides.find(x => x.id === 'best-audio-repair-plugins').image = 'https://r2.gear4music.com/media/137/1374743/1200/preview.jpg';
fs.writeFileSync(B + 'data/guides.json', JSON.stringify(guides, null, 2), 'utf8');
console.log('1025 MS 429 + portada repair OK');
