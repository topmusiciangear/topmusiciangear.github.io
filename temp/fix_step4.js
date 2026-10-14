const fs = require('fs');
const f = 'C:/Users/Daniel/projects/topmusiciangear/temp/bbl_step4.js';
let s = fs.readFileSync(f, 'utf8');
const bad = [
  ['Los másitors veredictos:', 'Los más claros veredictos:'],
  ['FAQs ya扩展 -> 5', 'FAQs ya扩展 -> 5'],
  ['FAQs ya扩展', 'FAQs ya Extended'],
  ['cEs = \'\';\n', '']
];
let n = 0;
bad.forEach(([a, b]) => { if (s.includes(a)) { s = s.split(a).join(b); n++; } });
s = s.replace(/FAQs ya \w+ -> 5/, 'FAQs ya a 5');
fs.writeFileSync(f, s, 'utf8');
console.log('fixes: ' + n);
const left = s.match(/[^\x00-\x7F\u00A0-\u024F\u2010-\u203A]/g);
console.log('caracteres no latinos restantes: ' + JSON.stringify([...new Set(left || [])]));