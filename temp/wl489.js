const fs = require('fs');
let v = fs.readFileSync('temp/pb_verify_data.js', 'utf8');
const anchor = "  '185': {";
const entry = "  '489': { 'oos': [undefined, '[\"gear4music\"]'] },\n";
v = v.split(anchor).join(entry + anchor);
fs.writeFileSync('temp/pb_verify_data.js', v);
console.log('done');