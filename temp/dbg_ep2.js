const fs = require('fs');
const h = fs.readFileSync('C:/Users/Daniel/projects/topmusiciangear/guides/best-samplers-drum-computers.html', 'utf8');
let bad = 0;
const ck = (c, n) => { console.log((c ? 'ok ' : 'FAIL ') + n); if (!c) bad++; };
// JSON-LD offers for EP-133 should carry 289/329/349
const i = h.indexOf('TEEEP133KOII');
const chunk = h.slice(Math.max(0, i - 300), i + 300);
console.log(chunk.replace(/\n/g, ' ').slice(0, 400));
ck(h.includes("data-price='$329'") || h.includes('329'), '329 somewhere');
process.exit(bad ? 1 : 0);
