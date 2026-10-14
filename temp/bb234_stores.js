const fs = require('fs');
const BASE = 'C:/Users/Daniel/projects/topmusiciangear/';
const die = (m) => { console.log('!! ' + m); process.exit(1); };

const IMG = 'https://r2.gear4music.com/media/27/272785/1200/preview.jpg?_gl=1*8ljvoj*_gcl_aw*R0NMLjE3OTE5OTMyNzcuQ2p3S0NBancwTHpXQmhCT0Vpd0FLUWQwY0VaVTQyR1Q0MEJBNm5jNEZod0x3ek9XRVJrbnpqajdUc1Q3S043MlVCcDZkZ1BaaDhMcEVSb0NVMkVRQXZEX0J3RQ..';
const raw = {
  gear4music: 'https://www.gear4music.com/Guitar-and-Bass/Yamaha-BB-234-4-String-Bass-Guitar-Black/21QT',
  zzounds: 'https://www.zzounds.com/item--YAMBB234',
  andertons: 'https://www.andertons.co.uk/yamaha-bb234-bass-guitar-in-black/',
  musicstore: 'https://www.musicstore.com/en_OE/EUR/Yamaha-BB234-Black/art-BAS0009147-000'
};
const awin = (mid, url) => 'https://www.awin1.com/cread.php?awinmid=' + mid + '&awinaffid=2891111&ued=' + encodeURIComponent(url);
const U = {
  gear4music: awin(1117, raw.gear4music),
  zzounds: raw.zzounds,
  andertons: raw.andertons,
  musicstore: raw.musicstore
};
const P = { gear4music: '\u00a3369.00', andertons: '\u00a3379.00', musicstore: '\u20ac399.00' };
const q = (s) => '"' + s.replace(/"/g, '\\"') + '"';
const plist = Object.keys(P).map(k => '      ' + k + ': ' + q(P[k])).join(',\n');
const ulist = Object.keys(U).map(k => '      ' + k + ': ' + q(U[k])).join(',\n');

// ---- catalogo ----
const pj = BASE + 'data/products.json';
const PJ = JSON.parse(fs.readFileSync(pj, 'utf8'));
const arr = Array.isArray(PJ) ? PJ : PJ.products;
const p = arr.find(x => x.id === 681);
if (!p) die('681 no existe');
p.img = IMG; p.image = IMG;
p.stores = U;
fs.writeFileSync(pj, JSON.stringify(PJ, null, 2));
console.log('catalogo 681: img G4M + 4 tiendas (zzounds sin precio)');

// ---- TEST ----
const bj = BASE + 'build-guides.js';
let src = fs.readFileSync(bj, 'utf8');
const ini = src.indexOf('\n  681: {');
if (ini === -1) die('TEST 681 no encontrado');
const nm = /\n  \d+: \{/.exec(src.slice(ini + 2));
const fin = ini + 2 + nm.index + 1;
const block = '  681: {\n    prices: {\n' + plist + '\n    },\n    urls: {\n' + ulist + '\n    }\n  },\n';
src = src.slice(0, ini + 1) + block + src.slice(fin);
fs.writeFileSync(bj, src);
try { new Function(fs.readFileSync(bj, 'utf8')); } catch (e) { die('build roto: ' + e.message); }
const chk = fs.readFileSync(bj, 'utf8');
const ci = chk.indexOf('\n  681: {');
console.log(chk.slice(ci, ci + 200));
console.log('siguiente clave tras 681:', /\n  \d+: \{/.exec(chk.slice(ci + 2))[0].trim());