const fs = require('fs');
const h = fs.readFileSync('C:/Users/Daniel/projects/topmusiciangear/guides/live-sound-pa.html', 'utf8');
let bad = 0;
const ck = (c, n) => { console.log((c ? 'ok ' : 'FAIL ') + n); if (!c) bad++; };
ck(h.includes('856'), 'K12.2 G4M 856 present');
ck(h.includes('315'), 'TS412 G4M 315 present');
ck(!h.includes('862'), 'old 862 gone');
ck(!h.includes('322'), 'old 322 gone');
process.exit(bad ? 1 : 0);
