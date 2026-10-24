const fs = require('fs');
const content = fs.readFileSync('C:/Users/Daniel/projects/topmusiciangear/js/shop-buttons.js', 'utf8');

// Encontrar TEST_SHOP_BTN y extraer el objeto
const startMarker = 'TEST_SHOP_BTN = {';
const startIdx = content.indexOf('TEST_SHOP_BTN = {');
if (startIdx === -1) {
  console.log('No encontrado');
  process.exit(1);
}

// Buscar el final del objeto contando llaves, manejando strings y escapes
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
console.log('Longitud objeto:', objStr.length);

// Convertir a JSON válido: claves sin comillas -> con comillas, eliminar comas finales
let cleanStr = objStr
  .replace(/([{,]\s*)([a-zA-Z_$][\w$]*)\s*:/g, '$1"$2":')  // claves sin comillas
  .replace(/,\s*([}\]])/g, '$1')  // comas finales antes de } o ]
  .replace(/,\s*$/gm, ''); // comas al final de línea

// Intentar parsear
try {
  const testShopBtn = JSON.parse(cleanStr);
  console.log('Parseado OK, productos:', Object.keys(testShopBtn).length);
  
  const ids = [116, 117, 20, 19, 21, 199, 303, 305, 331, 304, 307, 1054];
  let found = 0, notFound = 0;
  ids.forEach(id => {
    const btn = testShopBtn[id];
    if (btn) {
      found++;
      console.log('ID ' + id + ': prices=' + Object.keys(btn.prices || {}).join(',') + ' | urls=' + Object.keys(btn.urls || {}).join(','));
    } else {
      notFound++;
      console.log('ID ' + id + ': NO ENCONTRADO');
    }
  });
  console.log('\nEncontrados:', found, '| No encontrados:', notFound);
} catch (e) {
  console.log('Error parse:', e.message);
  const errPos = e.message.match(/position (\d+)/);
  if (errPos) {
    const pos = parseInt(errPos[1]);
    console.log('Error en pos:', pos);
    console.log('Contexto:', cleanStr.substring(Math.max(0, pos - 50), pos + 50));
  }
}