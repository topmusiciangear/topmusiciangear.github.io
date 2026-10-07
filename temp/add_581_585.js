const fs = require('fs');
const DIR = 'C:/Users/Daniel/projects/topmusiciangear/';
// 1) products.json
const pFile = DIR + 'data/products.json';
const P = JSON.parse(fs.readFileSync(pFile, 'utf8'));
[581, 582, 583, 584, 585].forEach(id => { if (P.some(x => x.id === id)) throw new Error(id + ' already exists'); });
P.push({
  id: 581,
  title: 'Fulltone OCD v2',
  title_es: 'Fulltone OCD v2',
  brand: 'Fulltone',
  category: 'pedals',
  price: 168.45,
  desc: 'Fulltone\u2019s touch-sensitive MOSFET overdrive: Class-A JFET input, switchable Enhanced or True bypass, HP/LP voicing switch, 9V battery or 9\u201318V adapter and 8mA draw.',
  desc_es: 'El overdrive MOSFET sensible al tacto de Fulltone: entrada JFET en clase A, bypass Enhanced o True conmutable, switch de voicing HP/LP, pila 9V o adaptador 9\u201318V y consumo de 8 mA.',
  img: 'https://www.fulltoneusa.com/cdn/shop/files/web6.png?v=1715197558',
  stores: { zzounds: 'https://www.zzounds.com/item--FULOCDV2' }
});
P.push({
  id: 582,
  title: 'Wampler Tumnus Deluxe',
  title_es: 'Wampler Tumnus Deluxe',
  brand: 'Wampler',
  category: 'pedals',
  price: 199.97,
  desc: 'Wampler\u2019s Klon-style overdrive with full 3-band EQ: active bass and mids plus treble, Normal/Hot gain switch, switchable buffered or true bypass, top-mounted jacks, 9V only.',
  desc_es: 'El overdrive estilo Klon de Wampler con EQ de 3 bandas: graves y medios activos más agudos, switch de ganancia Normal/Hot, bypass con buffer o true conmutable, jacks superiores, solo 9V.',
  img: 'https://www.wamplerpedals.com/wp-content/uploads/2019/10/tumnus-deluxe-top.png',
  stores: { zzounds: 'https://www.zzounds.com/item--WAMTUMNUSDLX' }
});
P.push({
  id: 583,
  title: 'JHS Morning Glory V4',
  title_es: 'JHS Morning Glory V4',
  brand: 'JHS',
  category: 'pedals',
  price: 199.00,
  desc: 'JHS\u2019s transparent low-gain overdrive: JFET design with 2x headroom, gain toggle with Red Remote support, side bright-cut switch, true bypass, 9V and 43mA.',
  desc_es: 'El overdrive transparente de baja ganancia de JHS: diseño JFET con doble headroom, toggle de ganancia con soporte Red Remote, bright-cut lateral, true bypass, 9V y 43 mA.',
  img: 'https://jhspedals.info/cdn/shop/files/JHSPedalsMorningGloryV4_1100x.png?v=1698363259',
  stores: { zzounds: 'https://www.zzounds.com/item--JHSMGV4' }
});
P.push({
  id: 584,
  title: 'MXR Distortion+',
  title_es: 'MXR Distortion+',
  brand: 'MXR',
  category: 'pedals',
  price: 99.99,
  desc: 'MXR\u2019s classic 70s distortion: germanium diode clipping with just Output and Distortion knobs, hardwire bypass, 9V battery or adapter and 2.5mA draw.',
  desc_es: 'La distorsión clásica 70s de MXR: clipping con diodos de germanio con solo mandos Output y Distortion, bypass hardwire, pila 9V o adaptador y consumo de 2,5 mA.',
  img: 'https://cdn11.bigcommerce.com/s-n26aknlnlm/products/593/images/6217/11104000001.MAIN__35453.1663874793.386.513.jpg?c=2',
  stores: { zzounds: 'https://www.zzounds.com/item--DAVM104' }
});
P.push({
  id: 585,
  title: 'Boss BD-2W Blues Driver Waza Craft',
  title_es: 'Boss BD-2W Blues Driver Waza Craft',
  brand: 'Boss',
  category: 'pedals',
  price: 186.99,
  desc: 'Boss\u2019s Waza Craft Blues Driver: all-discrete analog circuit made in Japan, Standard and Custom modes, responsive dynamics, buffered bypass, 9V battery or adapter and 18mA draw.',
  desc_es: 'El Blues Driver Waza Craft de Boss: circuito analógico discreto hecho en Japón, modos Standard y Custom, dinámica sensible, bypass con buffer, pila 9V o adaptador y consumo de 18 mA.',
  img: 'https://static.roland.com/assets/images/products/main/bd-2w_top_main.jpg',
  stores: { zzounds: 'https://www.zzounds.com/item--BOSBD2W' }
});
fs.writeFileSync(pFile, JSON.stringify(P, null, 2) + '\n');
console.log('581-585 added to products.json');
// 2) TEST_SHOP_BTN
const bFile = DIR + 'build-guides.js';
let s = fs.readFileSync(bFile, 'utf8');
const eol = s.includes('\r\n') ? '\r\n' : '\n';
const anchor = '  580: { prices: { musicstore: "€599.00" }, urls: { gear4music: "https://www.gear4music.com/Guitar-and-Bass/Mooer-GE300-Multi-Effects-Pedal/2UHQ" }, oos: ["gear4music"] },';
if (!s.includes(anchor)) throw new Error('580 anchor not found');
const entry = eol + '  581: { prices: { zzounds: "$168.45" } },'
  + eol + '  582: { prices: { zzounds: "$199.97" } },'
  + eol + '  583: { prices: { zzounds: "$199.00" } },'
  + eol + '  584: { prices: { zzounds: "$99.99" } },'
  + eol + '  585: { prices: { zzounds: "$186.99" } },';
s = s.replace(anchor, anchor + entry);
fs.writeFileSync(bFile, s);
console.log('581-585 added to TEST_SHOP_BTN');
// 3) ADDED_OK
const vFile = DIR + 'temp/pb_verify_data.js';
let v = fs.readFileSync(vFile, 'utf8');
if (!v.includes("'580'")) throw new Error('580 not in ADDED_OK');
['581', '582', '583', '584', '585'].forEach(k => { if (v.includes("'" + k + "'")) throw new Error(k + ' already whitelisted'); });
v = v.replace("'579', '580']", "'579', '580', '581', '582', '583', '584', '585']");
fs.writeFileSync(vFile, v);
console.log('581-585 whitelisted');
