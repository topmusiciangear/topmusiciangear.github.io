const fs = require('fs');
const B = 'C:/Users/Daniel/projects/topmusiciangear/';
const products = JSON.parse(fs.readFileSync(B + 'data/products.json', 'utf8'));
const p = products.find(x => x.id === 1006);
const clean = 'https://r2.gear4music.com/media/119/1197659/1200/preview.jpg';
p.image = clean;
p.img = clean;
p.stores.gear4music = 'https://www.gear4music.com/Recording-and-Computers/Native-Instruments-Massive-X/72HB';
p.stores.zzounds = 'https://www.zzounds.com/item--NAT25890';
p.stores.musicstore = 'https://www.musicstore.com/en_OE/EUR/Native-Instruments-Massive-X/art-PCM0018396-000';
fs.writeFileSync(B + 'data/products.json', JSON.stringify(products, null, 2), 'utf8');
let bg = fs.readFileSync(B + 'build-guides.js', 'utf8');
const oldE = '1006: {prices:{pluginboutique:"€200.67"},pbCur:{us:"$199.00",uk:"£158.38"}},\n';
const newE = '1006: {prices:{pluginboutique:"€200.67",gear4music:"£168.00",zzounds:"$199.00",musicstore:"€189.00"},pbCur:{us:"$199.00",uk:"£158.38"}},\n';
if (!bg.includes(oldE)) { console.log('ENTRADA 1006 NO ENCONTRADA'); process.exit(1); }
bg = bg.split(oldE).join(newE);
fs.writeFileSync(B + 'build-guides.js', bg, 'utf8');
new Function(bg);
console.log('1006 OK: foto + 3 tiendas + precios');
