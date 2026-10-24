const fs = require('fs');
const content = fs.readFileSync('C:/Users/Daniel/projects/topmusiciangear/guides/best-monitors.html', 'utf8');

const ldMatches = content.match(/"position": \d+, "item": \{/g);
const imgMatches = content.match(/img\/products\/[^"]+\.webp/g);
const unique = imgMatches ? [...new Set(imgMatches)] : [];

console.log('HTML LOCAL:');
console.log('JSON-LD positions:', ldMatches ? ldMatches.length : 0);
console.log('Imagenes unicas:', unique.length);
if (unique.length > 0) {
  console.log('Primeras 5:');
  unique.slice(0, 5).forEach((img, i) => console.log('  ' + i + ': ' + img));
}