const fs = require('fs');
const src = fs.readFileSync('C:/Users/Daniel/projects/topmusiciangear/build-guides.js', 'utf8');
const lines = src.split('\n');
const line = lines[6141];

const searchPart = "hasAmazon ? '<span style=\\' + SHOP_PRIMARY_FONT + '\\'>Amazon</span>' : '<span style=\"' + SHOP_PRIMARY_FONT + '\">' + (SHOP_LOGO_TEXT[primaryStoreKey]||primaryStoreKey) + '</span>'))";

console.log('Line length:', lines[6141].length);
console.log('Search length:', searchPart.length);
console.log('Line includes search:', lines[6141].includes(searchPart));

const idx = lines[6141].indexOf('hasAmazon ?');
if (idx > -1) {
  const actual = lines[6141].slice(idx, idx + searchPart.length);
  console.log('Actual  :', JSON.stringify(actual));
  console.log('Expected:', JSON.stringify(searchPart));
  console.log('Match:', actual === searchPart);
}