const fs = require('fs');
const DIR = 'C:/Users/Daniel/projects/topmusiciangear/';
let bad = 0;
const ck = (c, n) => { console.log((c ? 'ok ' : 'FAIL ') + n); if (!c) bad++; };
const h = fs.readFileSync(DIR + 'guides/best-live-subwoofers.html', 'utf8');
ck(h.includes('musicstore.com/en_OE/EUR/ALTO-TS18S/art-PAH0023624-003'), 'TS18S MS product link present');
ck(h.includes('musicstore.com/en_OE/EUR/JBL-EON-718S/art-PAH0022714-000'), 'EON718S MS product link present');
ck(!h.includes('musicstore.com/en_OE/EUR/search?SearchText=Alto'), 'no MS search fallback for TS18S');
process.exit(bad ? 1 : 0);
