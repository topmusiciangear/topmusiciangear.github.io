const fs = require('fs');
const h = fs.readFileSync('C:/Users/Daniel/projects/topmusiciangear/guides/live-sound-pa.html', 'utf8');
const e = h.indexOf('Electro-Voice EVERSE 12 (each)');
const region = h.slice(e, e + 8000);
let bad = 0;
const ck = (c, n) => { console.log((c ? 'ok ' : 'FAIL ') + n); if (!c) bad++; };
['866', '1,099', '1,069', 'ELEEVERSE12US', 'everse-12-potable-speaker', 'PAH0023691'].forEach(n => ck(region.includes(n), 'EVERSE card has ' + n));
ck(!region.includes('PAH0022714'), 'old MS article gone from card');
process.exit(bad ? 1 : 0);
