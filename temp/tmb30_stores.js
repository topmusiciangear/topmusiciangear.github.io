const fs = require('fs');
const BASE = 'C:/Users/Daniel/projects/topmusiciangear/';
const die = (m) => { console.log('!! ' + m); process.exit(1); };

const IMG = 'https://r2.gear4music.com/media/70/702140/1200/preview.jpg?_gl=1*e98qpf*_gcl_aw*R0NMLjE3OTE5OTMyNzcuQ2p3S0NBancwTHpXQmhCT0Vpd0FLUWQwY0VaVTQyR1Q0MEJBNm5jNEZod0x3ek9XRVJrbnpqajdUc1Q3S043MlVCcDZkZ1BaaDhMcEVSb0NVMkVRQXZEX0J3RQ..';
const raw = {
  gear4music: 'https://www.gear4music.com/Guitar-and-Bass/Ibanez-TMB30-Talman-Bass-Black/297J',
  zzounds: 'https://www.zzounds.com/item--IBATMB30?siid=227612',
  andertons: 'https://www.andertons.co.uk/ibanez-tmb30-bk-30-short-scale-bass-in-black/?search_query=Ibanez%20TMB30%20Talman',
  musicstore: 'https://www.musicstore.com/en_OE/EUR/Ibanez-Standard-TMB30-BK-Black/art-BAS0008306-000'
};
const awin = (mid, url) => 'https://www.awin1.com/cread.php?awinmid=' + mid + '&awinaffid=2891111&ued=' + encodeURIComponent(url);
const U = {
  gear4music: awin(1117, raw.gear4music),
  zzounds: raw.zzounds,
  andertons: raw.andertons,
  musicstore: raw.musicstore
};
U.amazon = 'https://www.amazon.com/Ibanez-TMB30-Talman-Standard-Black/dp/B01BLLE250';
const P = { gear4music: '\u00a3219.00', zzounds: '$249.00', andertons: '\u00a3229.00', musicstore: '\u20ac239.00', amazon: '$249.00' };
const q = (s) => '"' + s.replace(/"/g, '\\"') + '"';
const plist = Object.keys(P).map(k => '      ' + k + ': ' + q(P[k])).join(',\n');
const ulist = Object.keys(U).map(k => '      ' + k + ': ' + q(U[k])).join(',\n');

const pj = BASE + 'data/products.json';
const PJ = JSON.parse(fs.readFileSync(pj, 'utf8'));
const arr = Array.isArray(PJ) ? PJ : PJ.products;
const p = arr.find(x => x.id === 682);
if (!p) die('682 no existe');
p.img = IMG; p.image = IMG;
p.stores = U;
fs.writeFileSync(pj, JSON.stringify(PJ, null, 2));
console.log('catalogo 682: img G4M + 4 tiendas');

const bj = BASE + 'build-guides.js';
let src = fs.readFileSync(bj, 'utf8');
const ini = src.indexOf('\n  682: {');
if (ini === -1) die('TEST 682 no encontrado');
const nm = /\n  \d+: \{/.exec(src.slice(ini + 2));
const fin = ini + 2 + nm.index + 1;
const block = '  682: {\n    prices: {\n' + plist + '\n    },\n    urls: {\n' + ulist + '\n    }\n  },\n';
src = src.slice(0, ini + 1) + block + src.slice(fin);
fs.writeFileSync(bj, src);
try { new Function(fs.readFileSync(bj, 'utf8')); } catch (e) { die('build roto: ' + e.message); }
const chk = fs.readFileSync(bj, 'utf8');
const ci = chk.indexOf('\n  682: {');
console.log('siguiente clave:', /\n  \d+: \{/.exec(chk.slice(ci + 2))[0].trim(), '|TAMBB/amazon fuera?', !chk.slice(ci, ci + 1200).includes('amazon'));