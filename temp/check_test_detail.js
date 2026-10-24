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

// Verificar JBL 305P MkII (id 116)
const jblIdx = objStr.indexOf('116:');
if (jblIdx !== -1) {
  const jblData = objStr.substring(jblIdx, jblIdx + 800);
  console.log('JBL 305P MkII (116):');
  console.log(jblData.substring(0, 500));
  console.log('---');
}

// Kali Audio LP-6 V2 (117)
const kaliIdx = objStr.indexOf('117:');
if (kaliIdx !== -1) {
  const kaliData = objStr.substring(kaliIdx, kaliIdx + 800);
  console.log('Kali LP-6 V2 (117):');
  console.log(kaliData.substring(0, 500));
  console.log('---');
}