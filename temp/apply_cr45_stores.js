const fs = require('fs');
const B = 'C:/Users/Daniel/projects/topmusiciangear/';

// ---- 1. ficha 1048: tiendas ----
const rp = B + 'data/products.json';
const products = JSON.parse(fs.readFileSync(rp, 'utf8'));
const p = products.find(x => x.id === 1048);

const g4mDestino = 'https://www.gear4music.com/Recording-and-Computers/Mackie-CR45-45-Powered-Studio-Monitors-with-Tone-Control/7IXR';
p.stores.gear4music = 'https://www.awin1.com/cread.php?awinmid=1117&awinaffid=2891111&ued=' + encodeURIComponent(g4mDestino);
p.stores.zzounds = 'https://www.zzounds.com/item--MACCR45';
p.stores.musicstore = 'https://www.awin1.com/cread.php?awinmid=63816&awinaffid=2891111&ued=' +
  encodeURIComponent('https://www.musicstore.com/en_OE/EUR/Mackie-CR4-5/art-REC0016820-000');

fs.writeFileSync(rp, JSON.stringify(products, null, 2), 'utf8');
console.log('=== FICHA 1048 ' + p.title + ' ===');
Object.entries(p.stores).forEach(([k, v]) => {
  const limpio = v.includes('awin') ? decodeURIComponent((v.match(/ued=([^\s]*)/) || [])[1] || v) : v;
  console.log('  ' + k.padEnd(12) + limpio);
});
const conParams = Object.entries(p.stores).filter(([, v]) => /[?&](siid|sr|rdr|search_query|_gl|gcl_aw)=/.test(v));
console.log('  enlaces con parametros de sesion: ' + conParams.length);

// ---- 2. TEST_SHOP_BTN ----
const rb = B + 'build-guides.js';
let s = fs.readFileSync(rb, 'utf8');
if (!/^  1048: \{/m.test(s)) {
  const entrada = '  1048: {\n' +
    '    prices: {\n' +
    '      gear4music: "\u00A3118.00",\n' +
    '      musicstore: "\u20AC139.00",\n' +
    '      zzounds: "$130.00",\n' +
    '      amazon: "$129.99"\n' +
    '    }\n' +
    '  },\n';
  const i = s.indexOf('const TEST_SHOP_BTN = {');
  s = s.slice(0, s.indexOf('\n', i) + 1) + entrada + s.slice(s.indexOf('\n', i) + 1);
  fs.writeFileSync(rb, s, 'utf8');
  console.log('\nTEST_SHOP_BTN: entrada 1048 anadida');
} else {
  console.log('\n1048 ya estaba en TEST_SHOP_BTN');
}

// ---- 3. resumen de lo que queda ----
const ids = [1042, 1043, 1044, 1046, 1047, 1048];
const txt = fs.readFileSync(rb, 'utf8');
console.log('\n=== ESTADO DE LOS 6 PRODUCTOS DE LA GUIA ===');
products.filter(x => ids.includes(x.id)).forEach(x => {
  const enMapa = new RegExp('(^|\\n)\\s*' + x.id + ':\\s*\\{').test(txt);
  console.log('  ' + x.id + ' ' + x.title.padEnd(28) +
    (x.img ? 'foto OK ' : 'SIN FOTO') +
    (enMapa ? 'precios OK' : 'SIN PRECIOS') +
    ' | tiendas: ' + Object.keys(x.stores || {}).length);
});
