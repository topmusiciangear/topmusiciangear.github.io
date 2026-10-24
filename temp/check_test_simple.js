const fs = require('fs');
const content = fs.readFileSync('C:/Users/Daniel/projects/topmusiciangear/js/shop-buttons.js', 'utf8');

const startMarker = 'TEST_SHOP_BTN = {';
const startIdx = content.indexOf('TEST_SHOP_BTN = {');
if (startIdx === -1) {
  console.log('No encontrado');
  process.exit(1);
}

let braceCount = 0;
let inString = false;
let escapeNext = false;
let endIdx = -1;

for (let i = startIdx + 'TEST_SHOP_BTN = '.length; i < content.length; i++) {
  const char = content[i];
  
  if (escapeNext) {
    escapeNext = false;
    continue;
  }
  
  if (char === '\\') {
    escapeNext = true;
    continue;
  }
  
  if (char === '"') {
    inString = !inString;
    continue;
  }
  
  if (inString) continue;
  
  if (char === '{') braceCount++;
  else if (char === '}') {
    braceCount--;
    if (braceCount === 0) {
      endIdx = i;
      break;
    }
  }
}

if (endIdx === -1) {
  console.log('No se encontró el final');
  process.exit(1);
}

const objStr = content.substring(startIdx + 'TEST_SHOP_BTN = '.length, endIdx + 1);
console.log('Longitud:', objStr.length);

// Buscar IDs directamente en el string sin parsear JSON
const ids = [116, 117, 20, 19, 21, 199, 303, 305, 331, 304, 307, 1054];

ids.forEach(id => {
  const idStr = id + ':';
  const idx = objStr.indexOf(idStr);
  if (idx !== -1) {
    // Buscar 'prices:' y 'urls:' después de este ID
    const afterId = objStr.substring(idx + idStr.length, idx + 500);
    const hasPrices = afterId.includes('prices:');
    const hasUrls = afterId.includes('urls:');
    console.log('ID ' + id + ': ENCONTRADO | prices=' + hasPrices + ' | urls=' + hasUrls);
  } else {
    console.log('ID ' + id + ': NO ENCONTRADO');
  }
});