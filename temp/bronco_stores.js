const fs = require('fs');
const BASE = 'C:/Users/Daniel/projects/topmusiciangear/';
const die = (m) => { console.log('!! ' + m); process.exit(1); };

const raw = {
  gear4music: 'https://www.gear4music.com/Guitar-and-Bass/Squier-Sonic-Bronco-Bass-Black/5E5O',
  zzounds: 'https://www.zzounds.com/item--SQU0373800?siid=334385',
  andertons: 'https://www.andertons.co.uk/squier-sonic-bronco-bass-guitar-black/?im_ref=RXMUIbRfWxyZTGWz-ZyhoTUcUkr1igXv5Sfr3I0&sharedid=&irpid=7292297&irgwc=1&afsrc=1',
  musicstore: 'https://www.musicstore.com/en_OE/EUR/Squier-Sonic-Bronco-Bass-IL-Black/art-BAS0012451-000?utm_source=awin&sv1=affiliate&sv_campaign_id=2891111&awc=63816_1792002030_39c2c8c452e5613efa90f53100a9b635&ProgramUUID=_FwKAQMErFkAAAGNPHB7dnnu'
};
// Awin: mismo patron que el resto del catalogo
const awin = (mid, url) => 'https://www.awin1.com/cread.php?awinmid=' + mid + '&awinaffid=2891111&ued=' + encodeURIComponent(url);
const U = {
  gear4music: awin(1117, raw.gear4music),
  zzounds: raw.zzounds,
  andertons: raw.andertons,
  musicstore: raw.musicstore
};
const P = { gear4music: '\u00a3170.00', zzounds: '$259.00', andertons: '\u00a3159.00', musicstore: '\u20ac199.00' };

const pj = BASE + 'data/products.json';
const PJ = JSON.parse(fs.readFileSync(pj, 'utf8'));
const arr = Array.isArray(PJ) ? PJ : PJ.products;
const p = arr.find(x => x.id === 680);
if (!p) die('680 no existe');
p.stores = U;
fs.writeFileSync(pj, JSON.stringify(PJ, null, 2));
console.log('catalogo 680: URLs Awin aplicadas');

const bj = BASE + 'build-guides.js';
let src = fs.readFileSync(bj, 'utf8');
const ini = src.indexOf('  680: {');
if (ini === -1) die('TEST 680 no encontrado');
const nm = /\n  \d+: \{/.exec(src.slice(ini + 1));
const fin = ini + 1 + nm.index + 1;
const q = (s) => '"' + s.replace(/"/g, '\\"') + '"';
const block = '  680: {\n    prices: {\n      gear4music: ' + q(P.gear4music) + ',\n      zzounds: ' + q(P.zzounds) + ',\n      andertons: ' + q(P.andertons) + ',\n      musicstore: ' + q(P.musicstore) + '\n    },\n    urls: {\n      gear4music: ' + q(U.gear4music) + ',\n      zzounds: ' + q(U.zzounds) + ',\n      andertons: ' + q(U.andertons) + ',\n      musicstore: ' + q(U.musicstore) + '\n    }\n  },\n';
src = src.slice(0, ini) + block + src.slice(fin);
fs.writeFileSync(bj, src);
try { new Function(fs.readFileSync(bj, 'utf8')); } catch (e) { die('build roto: ' + e.message); }
console.log('TEST 680: URLs Awin aplicadas');