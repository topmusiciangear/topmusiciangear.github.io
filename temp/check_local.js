const fs = require('fs');
const content = fs.readFileSync('C:/Users/Daniel/projects/topmusiciangear/guides/best-monitors.html', 'utf8');

const imgMatches = content.match(/img\/products\/[^"]+\.webp/g);
console.log('Imagenes LOCAL:', imgMatches ? imgMatches.length : 0);
if (imgMatches) {
  const unique = [...new Set(imgMatches)];
  console.log('Unicas LOCAL:', unique.length);
  unique.forEach((img, i) => console.log('  ' + i + ': ' + img));
}

const ldMatches = content.match(/"position": \d+, "item": \{/g);
console.log('\nJSON-LD positions LOCAL:', ldMatches ? ldMatches.length : 0);