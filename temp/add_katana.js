const fs = require('fs');
// ============ 1. catalog: add 552 ============
const P = JSON.parse(fs.readFileSync('data/products.json', 'utf8'));
P.push({
  id: 552,
  title: 'Boss Katana-110 Bass',
  title_es: 'Boss Katana-110 Bass',
  brand: 'Boss',
  category: 'amps',
  price: 449.99,
  rating: 4.8,
  reviews: 5,
  desc: '60W RMS (110W peak) Class AB modeling combo with 1x10-inch custom woofer plus switchable tweeter. Three amp voices (Vintage/Flat/Modern) with 3-way Shape switch, 4-band EQ with Blend dry mix, 4 FX sections with 60+ Boss effects and 6 memories. XLR DI with cab emulation, USB recording, FX loop, power control down to 1W. 16.8 kg.',
  desc_es: 'Combo de modelado Clase AB de 60W RMS (110W pico) con woofer custom de 10 pulgadas más tweeter conmutable. Tres voces de ampli (Vintage/Flat/Modern) con Shape de 3 vías, EQ de 4 bandas con mezcla dry Blend, 4 secciones FX con más de 60 efectos Boss y 6 memorias. DI XLR con emulación de cabina, grabación USB, loop de efectos, control de potencia hasta 1W. 16,8 kg.',
  img: 'https://cdn11.bigcommerce.com/s-4hc0jwsnnq/images/stencil/1280x1280/products/16431/58090/498763-Boss%2520Katana%2520110B%25201x10%252060w%2520Bass%2520Amp%2520Combo__06644.1715121687.jpg?c=1',
  stores: {
    andertons: 'https://andertonsmusiccompany.pxf.io/c/7292297/3326127/43829?u=https%3A%2F%2Fwww.andertons.co.uk%2Fboss-katana-110b-1x10-60w-bass-amp-combo%2F',
    gear4music: 'https://www.awin1.com/cread.php?awinmid=1117&awinaffid=2891111&ued=https%3A%2F%2Fwww.gear4music.com%2FGuitar-and-Bass%2FBoss-Katana-110-Bass-Amplifier-Combo-with-Bluetooth-Adaptor%2F4QGP'
  }
});
fs.writeFileSync('data/products.json', JSON.stringify(P, null, 2));
// ============ 2. BTN 552 + whitelist ============
let t = fs.readFileSync('build-guides.js', 'utf8');
const ins = t.indexOf('};function hollyDefaultRegion()');
const entry552 = `  552: {
    prices: {
      andertons: "£379.00",
      gear4music: "£339.00"
    }
  },
`;
t = t.slice(0, ins) + entry552 + t.slice(ins);
fs.writeFileSync('build-guides.js', t);
let v = fs.readFileSync('temp/pb_verify_data.js', 'utf8');
v = v.replace("'549', '550', '551'];", "'549', '550', '551', '552'];");
fs.writeFileSync('temp/pb_verify_data.js', v);
console.log('catalog+btn ok');