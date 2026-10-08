const fs = require('fs');
const f = 'C:/Users/Daniel/projects/topmusiciangear/build-guides.js';
let s = fs.readFileSync(f, 'utf8');
const bs = String.fromCharCode(92);
const old604 = '  604: {\n    prices: {\n      zzounds: "$89.00",\n      andertons: "' + bs + 'u00A358.00",\n      gear4music: "' + bs + 'u00A358.00"\n    },';
if (!s.includes(old604)) { console.log('OLD NOT FOUND'); process.exit(1); }
const nw = '  604: {\n    prices: {\n      zzounds: "$99.00",\n      andertons: "£58.00",\n      gear4music: "£58.00",\n      musicstore: "€75.00"\n    },';
s = s.replace(old604, nw);
fs.writeFileSync(f, s);
console.log('604 updated');
