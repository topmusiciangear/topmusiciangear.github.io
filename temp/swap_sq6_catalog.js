const fs = require('fs');
// ============ 1. products.json ============
const P = JSON.parse(fs.readFileSync('data/products.json', 'utf8'));
// 414 SQ-6+
let p = P.find(x => x.id === 414);
p.title = 'Allen & Heath SQ-6+';
p.title_es = 'Allen & Heath SQ-6+';
p.price = 5999;
p.desc = '2026 successor to the best-selling SQ-6: 25 motorized faders, 24 local XLR preamps with the latest converters, 9-inch dark-GUI touchscreen, 16 SoftKeys + 4 SoftRotaries. Same 48-channel 96 kHz XCVI core at 0.7 ms with 8 RackExtra + 4 RackUltra FX engines, 44-bus architecture, 32x32 USB and SQ-Drive multitrack. 15.15 kg.';
p.desc_es = 'Sucesora 2026 de la superventas SQ-6: 25 faders motorizados, 24 previos XLR locales con los últimos conversores, pantalla táctil oscura de 9 pulgadas, 16 SoftKeys + 4 SoftRotaries. Mismo núcleo XCVI 96 kHz de 48 canales a 0,7 ms con 8 motores RackExtra + 4 RackUltra FX, arquitectura de 44 buses, USB 32x32 y multitrack SQ-Drive. 15,15 kg.';
p.description = p.desc;
const newImg = 'https://r2.gear4music.com/media/138/1383296/1200/preview.jpg';
p.img = newImg; p.image = newImg;
p.priceUSD = '$5,999'; p.priceGBP = '£3,799';
p.stores = {
  gear4music: 'https://www.awin1.com/cread.php?awinmid=1117&awinaffid=2891111&ued=https%3A%2F%2Fwww.gear4music.com%2FPA-DJ-and-Lighting%2FAllen-and-Heath-SQ6and-Digital-Mixing-Desk%2F84EM',
  musicstore: 'https://www.awin1.com/cread.php?awinmid=63816&awinaffid=2891111&ued=https%3A%2F%2Fwww.musicstore.com%2Fen_OE%2FEUR%2FAllen-Heath-SQ-6-Digital-Mixer%2Fart-PAH0024530-000',
  zzounds: 'https://www.zzounds.com/item--ALLAHSQ6PLUS?siid=390718',
  reverb: 'https://reverb.com/marketplace?query=allen+heath+sq-6'
};
delete p.stores.amazon;
// 406 SE 32R zzounds
P.find(x => x.id === 406).stores.zzounds = 'https://www.zzounds.com/item--PRSSLIIISE32R?siid=389034';
// 418 TF3 zzounds + G4M
const t3 = P.find(x => x.id === 418);
t3.stores.zzounds = 'https://www.zzounds.com/item--YAMTF3?siid=177041';
t3.stores.gear4music = 'https://www.gear4music.com/PA-DJ-and-Lighting/Yamaha-TouchFlow-TF3-24-Channel-Digital-Mixer-Nearly-New/5QUA';
fs.writeFileSync('data/products.json', JSON.stringify(P, null, 2));
console.log('catalog ok');

// ============ 2. build-guides.js BTN ============
function replaceEntry(t, id, nu) {
  const start = t.indexOf('  ' + id + ': {');
  let d = 0, q = null, i = start;
  for (; i < t.length; i++) {
    const c = t[i];
    if (q) { if (c === '\\') i++; else if (c === q) q = null; continue; }
    if (c === '"' || c === "'" || c === '`') { q = c; continue; }
    if (c === '{') d++;
    else if (c === '}') { d--; if (d === 0) break; }
  }
  return t.slice(0, start) + nu + t.slice(i + 2);
}
let t = fs.readFileSync('build-guides.js', 'utf8');
t = replaceEntry(t, 414, `  414: {
    prices: {
      zzounds: "$5,999.00",
      gear4music: "£3,799.00",
      musicstore: "€4,499.00",
      andertons: "£3,799.00"
    },
    urls: {
      andertons: "https://www.andertons.co.uk/allen-heath-sq-6-digital-mixer-2/?search_query=Allen%20%26%20Heath%20SQ-6"
    }
  },`);
t = replaceEntry(t, 406, `  406: {
    prices: {
      zzounds: "$1,599.00",
      gear4music: "£1,510.00",
      amazon: "$1,599.99",
      andertons: "£1,510.00",
      musicstore: "€1,789.00"
    }
  },`);
t = replaceEntry(t, 418, `  418: {
    prices: {
      amazon: "$2,999.00",
      zzounds: "$3,099.00",
      andertons: "£3,449.00",
      musicstore: "€4,498.00"
    }
  },`);
fs.writeFileSync('build-guides.js', t);
console.log('btn ok');

// ============ 3. whitelist ============
let v = fs.readFileSync('temp/pb_verify_data.js', 'utf8');
const anchor = "  '185': {";
const entry = "  '414': { 'prices.amazon': ['$5,199.00', undefined], 'prices.gear4music': ['£4,499.00', '£3,799.00'], 'prices.musicstore': ['€2,889.92', '€4,499.00'], 'prices.zzounds': [undefined, '$5,999.00'], 'prices.andertons': [undefined, '£3,799.00'], 'urls.andertons': [undefined, 'https://www.andertons.co.uk/allen-heath-sq-6-digital-mixer-2/?search_query=Allen%20%26%20Heath%20SQ-6'], 'oos': ['[\"andertons\"]', undefined] },\n  '406': { 'prices.zzounds': ['$1,599.99', '$1,599.00'], 'prices.musicstore': ['€1,503.36', '€1,789.00'] },\n  '418': { 'prices.zzounds': [undefined, '$3,099.00'], 'prices.musicstore': ['€3,360.50', '€4,498.00'] },\n";
v = v.split(anchor).join(entry + anchor);
fs.writeFileSync('temp/pb_verify_data.js', v);
console.log('whitelist ok');