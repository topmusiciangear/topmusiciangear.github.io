const fs = require('fs');
const b = fs.readFileSync('C:/Users/Daniel/projects/topmusiciangear/temp/rw_last38.js', 'utf8');
// find suspicious chars: replacement char or latin-extended oddities in Spanish text
const odd = new Set();
for (const ch of b) {
  const c = ch.codePointAt(0);
  if (c === 0xFFFD || (c >= 0x0100 && c <= 0x05FF)) odd.add('U+' + c.toString(16) + ' ' + ch);
}
console.log('odd chars:', [...odd].join(' | ') || 'NONE');
// check a known word
console.log('has análisis:', b.includes('análisis'));
console.log('has anlisis-broken:', /an[^a-z]lisis/.test(b));