const fs = require('fs');
const content = fs.readFileSync('C:/Users/Daniel/projects/topmusiciangear/build-guides.js', 'utf8');
const idx = content.indexOf('const TEST_SHOP_BTN = {');
if (idx !== -1) {
  let braceCount = 0;
  let inString = false;
  let escapeNext = false;
  let endIdx = -1;
  const startIdx = idx + 'const TEST_SHOP_BTN = '.length;
  
  for (let i = startIdx; i < content.length; i++) {
    const char = content[i];
    if (escapeNext) { escapeNext = false; continue; }
    if (char === '\\\\') { escapeNext = true; continue; }
    if (char === '\"') { inString = !inString; continue; }
    if (inString) continue;
    if (char === '{') braceCount++;
    else if (char === '}') { braceCount--; if (braceCount === 0) { endIdx = i; break; } }
  }
  
  const objStr = content.substring(idx + 'const TEST_SHOP_BTN = '.length, endIdx + 1);
  console.log('Longitud:', objStr.length);
  
  const ids = [116, 117, 20, 19, 21, 199, 303, 305, 331, 304, 307, 1054];
  ids.forEach(id => {
    const idx2 = objStr.indexOf(id + ':');
    if (idx2 !== -1) {
      const data = objStr.substring(idx2, idx2 + 500);
      const hasPrices = data.includes('prices:');
      const hasUrls = data.includes('urls:');
      console.log('ID ' + id + ': prices=' + hasPrices + ', urls=' + hasUrls);
    } else {
      console.log('ID ' + id + ': NO ENCONTRADO');
    }
  });
} else {
  console.log('NO ENCONTRADO');
}