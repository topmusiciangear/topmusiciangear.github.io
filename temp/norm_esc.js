const fs = require('fs');
const f = 'C:/Users/Daniel/projects/topmusiciangear/build-guides.js';
let s = fs.readFileSync(f, 'utf8');
const before = s.length;
// Replace literal backslash-u escapes ONLY inside TEST_SHOP_BTN price strings.
// bs+uXXXX (6 chars) -> actual char. Safe: file is JS source, these occur only in string literals.
s = s.split(String.fromCharCode(92) + 'u00A3').join('£');
s = s.split(String.fromCharCode(92) + 'u20AC').join('€');
s = s.split(String.fromCharCode(92) + 'u0026').join('&');
fs.writeFileSync(f, s);
console.log('normalized, delta bytes:', s.length - before);
const left = (s.match(/\\u[0-9a-fA-F]{4}/g) || []).length;
console.log('remaining backslash-u sequences:', left);
