const fs = require('fs');
const B = 'C:/Users/Daniel/projects/topmusiciangear/';
let bg = fs.readFileSync(B + 'build-guides.js', 'utf8');
let n = 0;
bg = bg.replace(/(\(?p\.img)(\.startsWith)/g, () => { n++; return '(p.img||"").startsWith'; });
bg = bg.replace(/(firstProduct\.img)(\.startsWith)/g, () => { n++; return '(firstProduct.img||"").startsWith'; });
fs.writeFileSync(B + 'build-guides.js', bg, 'utf8');
console.log('Guards added: ' + n);
try { new Function(bg); console.log('SYNTAX OK'); }
catch (e) { console.log('SYNTAX ERROR: ' + e.message); }
