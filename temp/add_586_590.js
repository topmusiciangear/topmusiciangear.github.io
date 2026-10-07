const fs = require('fs');
const DIR = 'C:/Users/Daniel/projects/topmusiciangear/';
// 1) products.json
const pFile = DIR + 'data/products.json';
const P = JSON.parse(fs.readFileSync(pFile, 'utf8'));
[586, 587, 588, 589, 590].forEach(id => { if (P.some(x => x.id === id)) throw new Error(id + ' already exists'); });
P.push({
  id: 586,
  title: 'Boss RC-500 Loop Station',
  title_es: 'Boss RC-500 Loop Station',
  brand: 'Boss',
  category: 'pedals',
  price: 351.99,
  desc: 'Boss\u2019s dual-track looper with 32-bit audio: 13 hours stereo recording, 99 memories, 57 rhythms with 16 kits, Loop FX, XLR mic input with phantom power, TRS MIDI, USB backup and 4xAA or adapter power.',
  desc_es: 'El looper de dos pistas de Boss con audio de 32 bits: 13 horas estéreo, 99 memorias, 57 ritmos con 16 kits, Loop FX, entrada micro XLR con fantasma, MIDI TRS, backup USB y pilas 4xAA o adaptador.',
  img: 'https://static.roland.com/assets/images/products/main/rc-500_main.jpg',
  stores: { zzounds: 'https://www.zzounds.com/item--BOSRC500' }
});
P.push({
  id: 587,
  title: 'TC Electronic Ditto X4 Looper',
  title_es: 'TC Electronic Ditto X4 Looper',
  brand: 'TC Electronic',
  category: 'pedals',
  price: 219.00,
  desc: 'TC Electronic\u2019s dual-track looper: two stereo loops with sync/serial modes, 7 loop FX, decay control, MIDI sync, 5 minutes of 24-bit audio, USB backup and true bypass.',
  desc_es: 'El looper de dos pistas de TC Electronic: dos loops estéreo con modos sync/serial, 7 efectos, decay, MIDI sync, 5 minutos a 24 bits, backup USB y true bypass.',
  img: 'https://r2.gear4music.com/media/18/180274/1200/preview.jpg',
  stores: {
    zzounds: 'https://www.zzounds.com/item--TCEDITTOX4LOOPER',
    gear4music: 'https://www.gear4music.com/Guitar-and-Bass/TC-Electronic-Ditto-X4-Dual-Track-Looper-Pedal/1JQZ'
  }
});
P.push({
  id: 588,
  title: 'Electro-Harmonix 720 Stereo Looper',
  title_es: 'Electro-Harmonix 720 Stereo Looper',
  brand: 'Electro-Harmonix',
  category: 'pedals',
  price: 181.40,
  desc: 'EHX\u2019s simple stereo looper: 12 minutes across 10 loops, undo/redo, reverse and half-speed, fadeout mode, silent footswitches, 9V battery or adapter.',
  desc_es: 'El looper estéreo simple de EHX: 12 minutos en 10 loops, undo/redo, reverse y half-speed, modo fadeout, footswitches silenciosos, pila 9V o adaptador.',
  img: 'https://www.ehx.com/wp-content/uploads/2020/10/720looper-f.jpg',
  stores: { zzounds: 'https://www.zzounds.com/item--EHX720LOOPER' }
});
P.push({
  id: 589,
  title: 'Pigtronix Infinity 2',
  title_es: 'Pigtronix Infinity 2',
  brand: 'Pigtronix',
  category: 'pedals',
  price: 199.00,
  desc: 'Pigtronix\u2019s hi-fi stereo double looper: two seamless-switching loops, five selectable modes, 24-bit/48kHz audio, USB backup, buffered bypass, 9V and 100mA.',
  desc_es: 'El double looper estéreo hi-fi de Pigtronix: dos loops con cambio fluido, cinco modos, audio 24 bits/48 kHz, backup USB, bypass con buffer, 9V y 100 mA.',
  img: 'https://www.pigtronix.com/uploads/pigtronix/2020/11/Infinity_2_Product_Page_Image-01-1440x1278.png',
  stores: { official: 'https://www.pigtronix.com/pedals/infinity-2-double-looper/' }
});
P.push({
  id: 590,
  title: 'MXR Clone Looper',
  title_es: 'MXR Clone Looper',
  brand: 'MXR',
  category: 'pedals',
  price: 149.99,
  desc: 'MXR\u2019s hi-fi mini looper: 6 minutes with unlimited overdubs, half/double speed, reverse, Play Once mode, expression/tap control, true/buffered switching and included adapter.',
  desc_es: 'El mini looper hi-fi de MXR: 6 minutos con overdubs ilimitados, half/double speed, reverse, modo Play Once, control por expresión/tap, true/buffered conmutable y adaptador incluido.',
  img: 'https://cdn11.bigcommerce.com/s-n26aknlnlm/products/1565/images/8637/11303000001.MAIN__11561.1663874800.386.513.jpg?c=2',
  stores: { zzounds: 'https://www.zzounds.com/item--MXRM303' }
});
fs.writeFileSync(pFile, JSON.stringify(P, null, 2) + '\n');
console.log('586-590 added to products.json');
// 2) TEST_SHOP_BTN
const bFile = DIR + 'build-guides.js';
let s = fs.readFileSync(bFile, 'utf8');
const eol = s.includes('\r\n') ? '\r\n' : '\n';
const anchor = '  585: { prices: { zzounds: "$186.99" } },';
if (!s.includes(anchor)) throw new Error('585 anchor not found');
const entry = eol + '  586: { prices: { zzounds: "$351.99" } },'
  + eol + '  587: { prices: { gear4music: "£146.50" }, urls: { zzounds: "https://www.zzounds.com/item--TCEDITTOX4LOOPER" }, oos: ["zzounds"] },'
  + eol + '  588: { prices: { zzounds: "$181.40" } },'
  + eol + '  590: { prices: { zzounds: "$159.99" } },';
s = s.replace(anchor, anchor + entry);
fs.writeFileSync(bFile, s);
console.log('586-588+590 added to TEST_SHOP_BTN (589 has no button-store price)');
// 3) ADDED_OK
const vFile = DIR + 'temp/pb_verify_data.js';
let v = fs.readFileSync(vFile, 'utf8');
if (!v.includes("'585'")) throw new Error('585 not in ADDED_OK');
['586', '587', '588', '590'].forEach(k => { if (v.includes("'" + k + "'")) throw new Error(k + ' already whitelisted'); });
v = v.replace("'584', '585']", "'584', '585', '586', '587', '588', '590']");
fs.writeFileSync(vFile, v);
console.log('586-588+590 whitelisted');
