const fs = require('fs');
const content = fs.readFileSync('C:/Users/Daniel/projects/topmusiciangear/js/shop-buttons.js', 'utf8');

// Encontrar el inicio de TEST_SHOP_BTN
const startMarker = 'TEST_SHOP_BTN = {';
const startIdx = content.indexOf(startMarker);
if (startIdx === -1) {
  console.log('No encontrado TEST_SHOP_BTN');
  process.exit(1);
}

// Encontrar el final del objeto contando llaves
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
  
  if (char === '"' && !escapeNext) {
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
  console.log('No se encontró el final del objeto');
  process.exit(1);
}

const objStr = content.substring(startIdx + 'TEST_SHOP_BTN = '.length, endIdx + 1);
console.log('Longitud del objeto:', objStr.length);

const testShopBtn = JSON.parse(objStr);
console.log('Total productos en TEST_SHOP_BTN:', Object.keys(testShopBtn).length);

// Verificar IDs de productos de best-monitors
const ids = [116, 117, 20, 19, 21, 199, 303, 305, 331, 304, 307, 1054];
ids.forEach(id => {
  const btn = testShopBtn[id];
  if (btn) {
    console.log('ID ' + id + ': prices=' + Object.keys(btn.prices || {}).join(',') + ', urls=' + Object.keys(btn.urls || {}).join(','));
  } else {
    console.log('ID ' + id + ': NO ENCONTRADO EN TEST_SHOP_BTN');
  }
});