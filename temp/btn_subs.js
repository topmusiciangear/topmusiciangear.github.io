const fs = require('fs');
const F = 'C:/Users/Daniel/projects/topmusiciangear/build-guides.js';
let src = fs.readFileSync(F, 'utf8');
const anchor = src.match(/^  626:.*$/m);
if (!anchor) throw new Error('626 anchor not found');
src = src.replace(anchor[0], anchor[0] + '\n  631: { prices: { gear4music: "£877.00" } },');
fs.writeFileSync(F, src);
console.log('631 added');
