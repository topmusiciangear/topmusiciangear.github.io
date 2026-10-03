const fs = require('fs');
// ============ 1. products.json 412 -> StudioLive 32S ============
const P = JSON.parse(fs.readFileSync('data/products.json', 'utf8'));
const p = P.find(x => x.id === 412);
p.title = 'PreSonus StudioLive 32S';
p.title_es = 'PreSonus StudioLive 32S';
p.brand = 'PreSonus';
p.price = 2499.99;
p.desc = '40-channel digital console (32 mic + 8 aux) with 32 recallable XMAX-R preamps and 33 touch-sensitive motorized faders. Dual-core FLEX DSP (286 processors), 26 mix buses with 16 FlexMixes, Fat Channel vintage EQ/compression per channel, FLEX FX 4-slot engine. 64x64 USB interface plus onboard SD multitrack with Virtual Soundcheck. AVB/Milan networking (Dante via AVB-D16), 7-inch touchscreen. 16.9 kg.';
p.desc_es = 'Consola digital de 40 canales (32 mic + 8 aux) con 32 previos XMAX-R recallables y 33 faders motorizados táctiles. DSP FLEX de doble núcleo (286 procesadores), 26 buses de mezcla con 16 FlexMixes, Fat Channel con EQ vintage/compresión por canal, motor FLEX FX de 4 slots. Interfaz USB 64x64 más multitrack SD a bordo con Virtual Soundcheck. Red AVB/Milan (Dante vía AVB-D16), pantalla táctil de 7 pulgadas. 16,9 kg.';
p.img = 'https://r2.gear4music.com/media/46/460515/1200/preview_1.jpg';
p.stores = {
  gear4music: 'https://www.awin1.com/cread.php?awinmid=1117&awinaffid=2891111&ued=https%3A%2F%2Fwww.gear4music.com%2FPA-DJ-and-Lighting%2FPreSonus-StudioLive-32S%2F2WNP',
  andertons: 'https://andertonsmusiccompany.pxf.io/c/7292297/3326127/43829?u=https%3A%2F%2Fwww.andertons.co.uk%2Fpresonus-studiolive-32s-digital-mixing-console%2F',
  musicstore: 'https://www.awin1.com/cread.php?awinmid=63816&awinaffid=2891111&ued=https%3A%2F%2Fwww.musicstore.com%2Fen_OE%2FEUR%2FPresonus-StudioLive-32S%2Fart-REC0014236-000',
  zzounds: 'https://www.zzounds.com/item--PRSSTUDIOLIVE32S'
};
delete p.rating; delete p.reviews; delete p.badge;
fs.writeFileSync('data/products.json', JSON.stringify(P, null, 2));
console.log('catalog ok');

// ============ 2. BTN 412 ============
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
t = replaceEntry(t, 412, `  412: {
    prices: {
      gear4music: "£2,399.00",
      andertons: "£2,159.00"
    },
    urls: {
      zzounds: "https://www.zzounds.com/item--PRSSTUDIOLIVE32S",
      musicstore: "https://www.awin1.com/cread.php?awinmid=63816&awinaffid=2891111&ued=https%3A%2F%2Fwww.musicstore.com%2Fen_OE%2FEUR%2FPresonus-StudioLive-32S%2Fart-REC0014236-000"
    }
  },`);
fs.writeFileSync('build-guides.js', t);
console.log('btn ok');

// ============ 3. whitelist (replace prior 412 entry) ============
let v = fs.readFileSync('temp/pb_verify_data.js', 'utf8');
const oldRe = /  '412': \{[^}]*\},\n/;
if (!oldRe.test(v)) throw new Error('412 whitelist entry not found');
v = v.replace(oldRe, `  '412': { 'prices.amazon': ['$2,499.00', undefined], 'prices.andertons': ['£1,614.00', '£2,159.00'], 'prices.musicstore': ['€1,678.99', undefined], 'prices.gear4music': [undefined, '£2,399.00'], 'urls.zzounds': [undefined, 'https://www.zzounds.com/item--PRSSTUDIOLIVE32S'], 'urls.musicstore': [undefined, 'https://www.awin1.com/cread.php?awinmid=63816&awinaffid=2891111&ued=https%3A%2F%2Fwww.musicstore.com%2Fen_OE%2FEUR%2FPresonus-StudioLive-32S%2Fart-REC0014236-000'] },\n`);
fs.writeFileSync('temp/pb_verify_data.js', v);
console.log('whitelist ok');