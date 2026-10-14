const fs = require('fs');
const src = fs.readFileSync('C:/Users/Daniel/projects/topmusiciangear/build-guides.js', 'utf8');
const lines = src.split('\n');
const line = lines[6141];
const search = "hasAmazon ? '<span style=\\' + SHOP_PRIMARY_FONT + '\\'>Amazon</span>' : '<span style=\"' + SHOP_PRIMARY_FONT + '\">' + (SHOP_LOGO_TEXT[primaryStoreKey]||primaryStoreKey) + '</span>')";

console.log('Line includes search:', line.includes(search));

const idx = line.indexOf('hasAmazon ?');
const actual = line.slice(idx, idx + 180);
console.log('Actual   :', actual);
console.log('Expected:', search);
console.log('Match:', actual === search);

// Char by char
for (let i = 0; i < Math.min(actual.length, search.length); i++) {
  if (actual[i] !== search[i]) {
    console.log('Mismatch at', i, 'actual=', actual.charCodeAt(i), 'search=', search.charCodeAt(i), 'actualChar=', actual[i], 'searchChar=', search[i]);
    break;
  }
}