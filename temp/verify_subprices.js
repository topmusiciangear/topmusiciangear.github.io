const fs = require('fs');
const h = fs.readFileSync('C:/Users/Daniel/projects/topmusiciangear/guides/best-live-subwoofers.html', 'utf8');
let bad = 0;
const ck = (c, n) => { console.log((c ? 'ok ' : 'FAIL ') + n); if (!c) bad++; };
// TS18S rows
ck(h.includes('APATS18SXUS'), 'TS18S zzounds link');
ck(h.includes('alto-professional-ts18s-x-subwoofer'), 'TS18S andertons link');
// prices near product cards (TS18S card region + EON card region)
const t = h.indexOf('Alto Professional TS18S');
const e = h.indexOf('JBL EON718S');
const tRegion = h.slice(t, t + 6000);
const eRegion = h.slice(e, e + 6000);
['575', '579', '799'].forEach(p => ck(tRegion.includes(p), 'TS18S card has ' + p));
['833', '825', '1,099'].forEach(p => ck(eRegion.includes(p), 'EON718S card has ' + p));
process.exit(bad ? 1 : 0);
