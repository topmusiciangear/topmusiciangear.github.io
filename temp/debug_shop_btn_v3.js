const fs = require('fs');
const content = fs.readFileSync('C:/Users/Daniel/projects/topmusiciangear/js/shop-buttons.js', 'utf8');

// Encontrar el inicio de TEST_SHOP_BTN
const startMarker = 'TEST_SHOP_BTN = {';
const startIdx = content.indexOf(startMarker);
if (startIdx === -1) {
  console.log('No encontrado TEST_SHOP_BTN');
  process.exit(1);
}

// Mostrar una muestra del contenido alrededor del final esperado
const sampleStart = startIdx + 100000;
console.log('Muestra alrededor de 100000 chars:');
console.log(content.substring(sampleStart, sampleStart + 500));
console.log('---');

// Buscar el final del objeto buscando '};' seguido de código
let searchIdx = 100000;
let found = false;
for (let i = sampleStart; i < content.length - 10; i++) {
  if (content[i] === '}' && content[i+1] === ';' && content[i+2] === '\n' && content[i+3] !== ' ' && content[i+3] !== '\t') {
    console.log('Encontrado posible final en:', i);
    console.log('Contexto:', content.substring(i-50, i+50));
    break;
  }
}

// También mostrar últimas 50000 chars
const endSample = content.length - 5000;
console.log('---');
console.log('Ultimos 5000 chars:');
console.log(content.substring(endSample));