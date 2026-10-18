(async () => {
const fs = require('fs');
const H = { 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 Chrome/126.0.0.0 Safari/537.36' };
const B = 'C:/Users/Daniel/projects/topmusiciangear/';

// 1. foto
const foto = 'https://r2.gear4music.com/media/61/612295/1200/preview.jpg';
const r = await fetch(foto, { headers: H });
const tipo = r.headers.get('content-type');
const bytes = (await r.arrayBuffer()).byteLength;
console.log('=== FOTO M-AUDIO BX4 ===');
console.log('  ' + foto);
console.log('  status=' + r.status + ' | ' + tipo + ' | ' + bytes + ' bytes');
const ok = r.status === 200 && /^image\//.test(tipo || '');
console.log('  valida (200 + image/*): ' + (ok ? 'SI' : 'NO'));
if (!ok) process.exit(1);

// 2. el enlace de G4M que me has mandado, limpio
const g4mCrudo = 'https://www.gear4music.com/Recording-and-Computers/M-Audio-BX4-Studio-Monitor-Pair/3M5T';
const limpio = g4mCrudo.split('?')[0];
console.log('\n=== ENLACE GEAR4MUSIC QUE ME HAS MANDADO ===');
console.log('  parametros que traia: ' + (g4mCrudo.match(/&/g) || []).length + ' separadores -> todos de rastreo');
console.log('  limpio: ' + limpio);

// 3. ficha
const rp = B + 'data/products.json';
const products = JSON.parse(fs.readFileSync(rp, 'utf8'));
const p = products.find(x => x.id === 1043);
p.img = foto;

// normalizo G4M al envoltorio awin estandar del sitio
p.stores.gear4music = 'https://www.awin1.com/cread.php?awinmid=1117&awinaffid=2891111&ued=' + encodeURIComponent(limpio);
p.stores.musicstore = 'https://www.awin1.com/cread.php?awinmid=63816&awinaffid=2891111&ued=' +
  encodeURIComponent('https://www.musicstore.com/en_OE/EUR/M-Audio-BX4/art-REC0015166-000');

fs.writeFileSync(rp, JSON.stringify(products, null, 2), 'utf8');
console.log('\n=== FICHA 1043 ' + p.title + ' ===');
Object.entries(p.stores).forEach(([k, v]) => {
  const vis = v.includes('awin') ? decodeURIComponent((v.match(/ued=([^\s]*)/) || [])[1] || v) : v;
  console.log('  ' + k.padEnd(12) + vis);
});
const sucios = Object.entries(p.stores).filter(([, v]) => /[?&](siid|sr|rdr|search_query|network|affiliate_id|publisher|utm_|sv1|sv_campaign_id|awc|_gl|gcl_au)=/.test(v));
console.log('  parametros residuales: ' + sucios.length);

// 4. TEST_SHOP_BTN
const rb = B + 'build-guides.js';
let s = fs.readFileSync(rb, 'utf8');
if (!/^  1043: \{/m.test(s)) {
  const entrada = '  1043: {\n' +
    '    prices: {\n' +
    '      gear4music: "\u00A3100.00",\n' +
    '      musicstore: "\u20AC109.00",\n' +
    '      amazon: "$139.00"\n' +
    '    }\n' +
    '  },\n';
  const i = s.indexOf('const TEST_SHOP_BTN = {');
  const pos = s.indexOf('\n', i) + 1;
  s = s.slice(0, pos) + entrada + s.slice(pos);
  fs.writeFileSync(rb, s, 'utf8');
  console.log('\nTEST_SHOP_BTN: entrada 1043 anadida');
}

// 5. estado
const ids = [1042, 1043, 1044, 1046, 1047, 1048];
const txt = fs.readFileSync(rb, 'utf8');
console.log('\n=== ESTADO DE LA GUIA ===');
products.filter(x => ids.includes(x.id)).forEach(x => {
  const enMapa = new RegExp('(^|\\n)\\s*' + x.id + ':\\s*\\{').test(txt);
  console.log('  ' + x.id + ' ' + x.title.padEnd(28) + (x.img ? 'foto OK   ' : 'SIN FOTO ') + (enMapa ? 'precios OK' : 'SIN PRECIOS') + ' | ' + Object.keys(x.stores || {}).length + ' tiendas');
});
const completos = products.filter(x => ids.includes(x.id) && x.img && new RegExp('(^|\\n)\\s*' + x.id + ':\\s*\\{').test(txt)).length;
console.log('  completos: ' + completos + '/6');
})();
