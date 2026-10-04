const fs = require('fs');
const F = 'C:/Users/Daniel/projects/topmusiciangear/build-guides.js';
let t = fs.readFileSync(F, 'utf8');
const old264 = '  264: { prices: { gear4music: "£229.99", amazon: "$229.99" }, oos: [ "andertons" ] }';
const nu264 = '  264: { prices: { gear4music: "£229.99", amazon: "$349.99" }, oos: [ "andertons" ] }';
if (!t.includes(old264)) { console.log('BTN264 PATTERN MISSING'); process.exit(1); }
t = t.split(old264).join(nu264);
fs.writeFileSync(F, t);
const VF = 'C:/Users/Daniel/projects/topmusiciangear/temp/pb_verify_data.js';
let v = fs.readFileSync(VF, 'utf8');
const anchor = "  '185': {";
const entry = "  '264': { 'prices.amazon': ['$229.99', '$349.99'] },\n";
v = v.split(anchor).join(entry + anchor);
fs.writeFileSync(VF, v);
console.log('BTN264 fixed');