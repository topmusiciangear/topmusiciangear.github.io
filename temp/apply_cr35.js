(async () => {
const fs = require('fs');
const H = { 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 Chrome/126.0.0.0 Safari/537.36' };
const B = 'C:/Users/Daniel/projects/topmusiciangear/';

// validar foto
const foto = 'https://r2.gear4music.com/media/127/1274511/1200/preview.jpg';
const r = await fetch(foto, { headers: H });
const tipo = r.headers.get('content-type');
const bytes = (await r.arrayBuffer()).byteLength;
console.log('=== FOTO MACKIE CR3.5 ===');
console.log('  ' + foto);
console.log('  status=' + r.status + ' | ' + tipo + ' | ' + bytes + ' bytes');
const ok = r.status === 200 && /^image\//.test(tipo || '');
console.log('  valida (200 + image/*): ' + (ok ? 'SI' : 'NO'));
if (!ok) process.exit(1);

// ficha
const rp = B + 'data/products.json';
const products = JSON.parse(fs.readFileSync(rp, 'utf8'));
const p = products.find(x => x.id === 1046);
p.img = foto;

const g4m = 'https://www.gear4music.com/Recording-and-Computers/Mackie-CR35-35-Powered-Studio-Monitors-with-Tone-Control/7IXP';
p.stores.gear4music = 'https://www.awin1.com/cread.php?awinmid=1117&awinaffid=2891111&ued=' + encodeURIComponent(g4m);
// el enlace traia ?search_query=Mackie%20CR3.5 -> se elimina
p.stores.andertons = 'https://www.andertons.co.uk/mackie-cr35--35-multimedia-monitors/';
p.stores.zzounds = 'https://www.zzounds.com/item--MACCR35';
p.stores.musicstore = 'https://www.awin1.com/cread.php?awinmid=63816&awinaffid=2891111&ued=' +
  encodeURIComponent('https://www.musicstore.com/en_OE/EUR/Mackie-CR3-5/art-REC0016818-000');

fs.writeFileSync(rp, JSON.stringify(products, null, 2), 'utf8');
console.log('\n=== FICHA 1046 ' + p.title + ' ===');
Object.entries(p.stores).forEach(([k, v]) => {
  const limpio = v.includes('awin') ? decodeURIComponent((v.match(/ued=([^\s]*)/) || [])[1] || v) : v;
  console.log('  ' + k.padEnd(12) + limpio);
});
const sucios = Object.entries(p.stores).filter(([, v]) => /[?&](siid|sr|rdr|search_query|_gl|gcl_aw)=/.test(v));
console.log('  parametros residuales: ' + sucios.length);

// TEST_SHOP_BTN
const rb = B + 'build-guides.js';
let s = fs.readFileSync(rb, 'utf8');
if (!/^  1046: \{/m.test(s)) {
  const entrada = '  1046: {\n' +
    '    prices: {\n' +
    '      gear4music: "\u00A382.00",\n' +
    '      andertons: "\u00A3105.00",\n' +
    '      musicstore: "\u20AC87.00",\n' +
    '      zzounds: "$100.00",\n' +
    '      amazon: "$99.99"\n' +
    '    }\n' +
    '  },\n';
  const i = s.indexOf('const TEST_SHOP_BTN = {');
  const pos = s.indexOf('\n', i) + 1;
  s = s.slice(0, pos) + entrada + s.slice(pos);
  fs.writeFileSync(rb, s, 'utf8');
  console.log('\nTEST_SHOP_BTN: entrada 1046 anadida');
}

// estado
const ids = [1042, 1043, 1044, 1046, 1047, 1048];
const txt = fs.readFileSync(rb, 'utf8');
console.log('\n=== ESTADO DE LA GUIA ===');
products.filter(x => ids.includes(x.id)).forEach(x => {
  const enMapa = new RegExp('(^|\\n)\\s*' + x.id + ':\\s*\\{').test(txt);
  console.log('  ' + x.id + ' ' + x.title.padEnd(28) +
    (x.img ? 'foto OK   ' : 'SIN FOTO ') +
    (enMapa ? 'precios OK' : 'SIN PRECIOS') +
    ' | ' + Object.keys(x.stores || {}).length + ' tiendas');
});
const completos = products.filter(x => ids.includes(x.id) && x.img && new RegExp('(^|\\n)\\s*' + x.id + ':\\s*\\{').test(txt)).length;
console.log('  completos: ' + completos + '/6');
})();
