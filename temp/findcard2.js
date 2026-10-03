const fs = require('fs');
const h = fs.readFileSync('C:/Users/Daniel/projects/topmusiciangear/guides/best-5-string-basses.html', 'utf8');
const card = h.slice(467400, 472000);
// extract musicstore row
const mi = card.indexOf('musicstore');
console.log('--- MS ROW HTML (Ultra II card) ---');
console.log(card.slice(mi - 1200, mi + 800));