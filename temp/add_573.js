const fs = require('fs');
const DIR = 'C:/Users/Daniel/projects/topmusiciangear/';
// 1) products.json
const pFile = DIR + 'data/products.json';
const P = JSON.parse(fs.readFileSync(pFile, 'utf8'));
if (P.some(x => x.id === 573)) throw new Error('573 already exists');
P.push({
  id: 573,
  title: 'Yamaha Arius YDP-146 Digital Piano',
  title_es: 'Yamaha Arius YDP-146 Piano Digital',
  brand: 'Yamaha',
  category: 'keyboards',
  price: 1299.99,
  desc: 'Entry-level Arius furniture console with 88-key GHS hammer action, CFX concert-grand sampling with VRM Lite, 192-note polyphony and Bluetooth audio/MIDI. Fixed cabinet with sliding key cover, half-pedal three-pedal unit and 8W+8W speakers.',
  desc_es: 'Mueble Arius de entrada con 88 teclas de martillo GHS, muestras del gran cola CFX con VRM Lite, polifon\u00eda de 192 notas y Bluetooth audio/MIDI. Mueble fijo con tapa deslizante, triple pedalera con medio pedal y altavoces de 8W+8W.',
  img: 'https://m.media-amazon.com/images/I/71VocqX4AfL._AC_SL1500_.jpg',
  stores: {
    amazon: 'https://www.amazon.com/dp/B0H27BB6JC',
    zzounds: 'https://www.zzounds.com/item--YAMYDP146',
    gear4music: 'https://www.gear4music.com/Keyboards-and-Pianos/Yamaha-YDP-146-Digital-Piano-Black/86R5',
    andertons: 'https://www.andertons.co.uk/yamaha-ydp-146-digital-home-piano-in-black/'
  }
});
fs.writeFileSync(pFile, JSON.stringify(P, null, 2) + '\n');
console.log('573 added to products.json');
// 2) TEST_SHOP_BTN
const bFile = DIR + 'build-guides.js';
let s = fs.readFileSync(bFile, 'utf8');
const eol = s.includes('\r\n') ? '\r\n' : '\n';
const anchor = '  572: { prices: { amazon: "$499.99", andertons: "£399.00", gear4music: "£355.00", musicstore: "€419.00" }, oos: ["zzounds"] },';
if (!s.includes(anchor)) throw new Error('572 anchor not found');
const entry = eol + '  573: { prices: { amazon: "$1,299.99", zzounds: "$1,299.99", andertons: "£935.00" }, urls: { gear4music: "https://www.gear4music.com/Keyboards-and-Pianos/Yamaha-YDP-146-Digital-Piano-Black/86R5" } },';
s = s.replace(anchor, anchor + entry);
fs.writeFileSync(bFile, s);
console.log('573 added to TEST_SHOP_BTN');
// 3) ADDED_OK
const vFile = DIR + 'temp/pb_verify_data.js';
let v = fs.readFileSync(vFile, 'utf8');
if (!v.includes("'572'")) throw new Error('572 not in ADDED_OK');
if (v.includes("'573'")) throw new Error('573 already whitelisted');
v = v.replace("'572']", "'572', '573']");
fs.writeFileSync(vFile, v);
console.log('573 whitelisted');
