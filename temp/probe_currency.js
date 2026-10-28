const fs = require('fs');
const raw = fs.readFileSync('data/guides.json', 'utf8');
const s = raw.indexOf('"id": "best-nylon-guitars-for-beginners"');
const region = raw.slice(s, s + 52000);
const syms = ['\u00a3', '$', '\u20ac'];
for (const sym of syms) console.log(JSON.stringify(sym), region.split(sym).length - 1);
let i = -1;
while ((i = region.indexOf('\u00a3', i + 1)) >= 0) {
  console.log('...' + region.slice(Math.max(0, i - 140), i + 80));
}
