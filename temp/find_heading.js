const fs = require('fs');
const B = 'C:/Users/Daniel/projects/topmusiciangear/';
const t = fs.readFileSync(B + 'data/guides.json', 'utf8');
const re = /"heading"\s*:\s*"Best Microphone for Recording Guitar Amps \(2025\)"/;
const m = t.match(re);
if (!m) { console.log('no encontrado'); process.exit(1); }
const i = m.index;
console.log('posicion:' + i);
console.log(t.slice(i - 200, i + 340));
