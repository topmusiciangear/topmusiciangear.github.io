const fs = require('fs');
const h = fs.readFileSync('C:/Users/Daniel/projects/topmusiciangear/guides/best-drum-machine.html', 'utf8');
let bad = 0;
const ck = (c, n) => { console.log((c ? 'ok ' : 'FAIL ') + n); if (!c) bad++; };
ck(h.includes('82/829101/1200/preview.jpg'), 'new T-8 photo');
ck(!h.includes('71JTv9j0UmL'), 'old photo gone');
ck(h.includes('178'), 'G4M 178 present');
ck(h.includes('ROLT8'), 'zzounds ROLT8 link present');
// andertons row for T-8 should NOT be grey oos
const t = h.indexOf('AIRA Compact T-8');
const region = h.slice(t, t + 9000);
const aRow = region.indexOf('Andertons');
const aChunk = region.slice(Math.max(0, aRow - 200), aRow + 400);
ck(!/Out of stock|Agotado/i.test(aChunk), 'andertons row not grey: ' + aChunk.slice(0, 120).replace(/\n/g, ' '));
process.exit(bad ? 1 : 0);
