const fs = require('fs');
const content = fs.readFileSync('C:/Users/Daniel/projects/topmusiciangear/js/shop-buttons.js', 'utf8');

const startMarker = 'TEST_SHOP_BTN = {';
const startIdx = content.indexOf('TEST_SHOP_BTN = {');
if (startIdx === -1) {
  console.log('No encontrado');
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

// Intentar limpiar el string para JSON válido
// Reemplazar claves sin comillas por claves con comillas
// Eliminar comas finales

let cleanStr = objStr
  .replace(/([{,]\s*)([a-zA-Z_$][\w$]*)\s*:/g, '$1"$2":')  // Claves sin comillas -> con comillas
  .replace(/,\s*([}\]])/g, '$1')  // Eliminar comas finales antes de } o ]
  .replace(/,\s*$/gm, ''); // Comas al final de línea

try {
  const testShopBtn = JSON.parse(cleanStr);
  console.log('Parseado OK, productos:', Object.keys(testShopBtn).length);
  
  const ids = [116, 117, 20, 19, 21, 199, 303, 305, 331, 304, 307, 1054];
  ids.forEach(id => {
    const btn = testShopBtn[id];
    if (btn) {
      console.log('ID ' + id + ': prices=' + Object.keys(btn.prices || {}).join(',') + ' | urls=' + Object.keys(btn.urls || {}).join(','));
    } else {
      console.log('ID ' + id + ': NO ENCONTRADO');
    }
  });
} catch (e) {
  console.log('Error parse:', e.message);
  // Mostrar contexto del error
  const errPos = e.message.match(/position (\d+)/);
  if (errPos) {
    const pos = parseInt(errPos[1]);
    console.log('Error en posicion:', pos);
    console.log('Contexto:', cleanStr.substring(Math.max(0, pos - 50), pos + 50));
  }
}