const fs = require('fs');
const B = 'C:/Users/Daniel/projects/topmusiciangear/';

// ---- 1. FICHA 1042: foto limpia + tiendas ----
const rp = B + 'data/products.json';
const products = JSON.parse(fs.readFileSync(rp, 'utf8'));
const p = products.find(x => x.id === 1042);

p.img = 'https://r2.gear4music.com/media/98/986319/1200/preview_1.jpg';
p.stores.andertons = 'https://www.andertons.co.uk/presonus-eris-35-in-black/';
p.stores.zzounds = 'https://www.zzounds.com/item--PRSERIS35GEN2';
p.stores.musicstore = 'https://www.awin1.com/cread.php?awinmid=63816&awinaffid=2891111&ued=' +
  encodeURIComponent('https://www.musicstore.com/en_OE/EUR/Presonus-Eris-3-5/art-REC0016440-000');

fs.writeFileSync(rp, JSON.stringify(products, null, 2), 'utf8');
console.log('=== FICHA 1042 ===');
console.log('  img: ' + p.img);
console.log('  tiendas: ' + Object.keys(p.stores).join(', '));
Object.entries(p.stores).forEach(([k, v]) => console.log('    ' + k.padEnd(12) + v.slice(0, 105)));

// ---- 2. Añadir 1042 a TEST_SHOP_BTN ----
const rb = B + 'build-guides.js';
let s = fs.readFileSync(rb, 'utf8');
if (!/^  1042: \{/m.test(s)) {
  const entrada = '  1042: {\n' +
    '    prices: {\n' +
    '      gear4music: "\u00A381.50",\n' +
    '      andertons: "\u00A371.00",\n' +
    '      musicstore: "\u20AC114.00",\n' +
    '      zzounds: "$100.00",\n' +
    '      amazon: "$99.99"\n' +
    '    }\n' +
    '  },\n';
  const i = s.indexOf('const TEST_SHOP_BTN = {');
  const fin = s.indexOf('\n', i) + 1;
  s = s.slice(0, fin) + entrada + s.slice(fin);
  fs.writeFileSync(rb, s, 'utf8');
  console.log('\n=== TEST_SHOP_BTN ===');
  console.log('  entrada 1042 anadida');
} else {
  console.log('\n1042 ya estaba en TEST_SHOP_BTN');
}
