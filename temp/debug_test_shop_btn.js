const fs = require('fs');
const content = fs.readFileSync('C:/Users/Daniel/projects/topmusiciangear/js/shop-buttons.js', 'utf8');

const match = content.match(/TEST_SHOP_BTN\s*=\s*(\{[\s\S]*?\n\});/);
if (match) {
  // Mostrar primeros 200 chars del match para ver el formato
  console.log('Primeros 200 chars del match:');
  console.log(match[1].substring(0, 200));
  console.log('---');
  console.log('Ultimos 200 chars del match:');
  console.log(match[1].substring(match[1].length - 200));
}