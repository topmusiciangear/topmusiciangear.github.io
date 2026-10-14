const fs = require('fs');
const f = 'C:/Users/Daniel/projects/topmusiciangear/temp/fix_eg_bm.js';
const lines = fs.readFileSync(f, 'utf8').split('\n');
const out = lines.filter(l => !/esanam/i.test(l) && !/quesequently|Block|_action|jangly/.test(l));
fs.writeFileSync(f, out.join('\n'), 'utf8');
console.log('lineas Timing: ' + lines.length + ' -> ' + out.length);