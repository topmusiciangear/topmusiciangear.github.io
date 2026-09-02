const fs = require('fs');
const path = require('path');
const root = path.resolve(__dirname, '..');

const verifiedPrices = {
  1: '€326.90',
  2: '€2,520.20',
  5: '€184.00',
  6: '€1,805.90',
  7: '€2,478.20',
  9: '€839.50',
  10: '€4,368.90',
  11: '€3,527.70',
  13: '€209.20',
  15: '€150.40',
  21: '€629.00',
  22: '€1,259.70',
  23: '€125.20',
  24: '€363.00',
  25: '€149.00',
  26: '€74.80',
  28: '€247.90',
  29: '€755.50',
  30: '€452.90',
  33: '€562.20',
  39: '€41.20',
  42: '€923.50',
  50: '€100.00',
  51: '€209.20',
  52: '€537.00',
  54: '€209.20',
  55: '€133.60',
  56: '€167.20',
  57: '€125.20',
  59: '€58.80',
  62: '€142.00',
  64: '€2,016.00',
  65: '€709.20',
  66: '€948.70',
  67: '€948.70',
  71: '€721.80',
  174: '€2,856.30',
  182: '€3,612.61',
  183: '€2,436.10',
  185: '€2,167.20',
  187: '€2,587.40',
  193: '€335.30',
  194: '€259.70',
  198: '€100.00',
  200: '€172.30',
  201: '€55.50',
  202: '€545.40',
  204: '€247.90',
  207: '€1,969.75',
  209: '€999.00',
  297: '€140.30',
  298: '€91.60',
  299: '€150.40',
  301: '€587.40',
  302: '€242.90',
  304: '€545.40',
  305: '€251.30',
  308: '€528.60',
  311: '€382.40',
  312: '€940.30',
  313: '€133.60',
  314: '€335.30',
  315: '€276.50',
  319: '€2,100.00',
  321: '€438.70',
  322: '€1,251.30',
  331: '€3,360.50',
  337: '€1,251.30',
  338: '€839.50',
  340: '€478.20',
  343: '€217.60',
  345: '€197.50',
  364: '€670.60',
  370: '€780.70',
  431: '€18.49',
};

const buildSrc = fs.readFileSync(path.join(root, 'build-guides.js'), 'utf8');
const lines = buildSrc.split('\n');

// Find each ID block and its musicstore price
const changes = [];
for (const [idStr, newPrice] of Object.entries(verifiedPrices)) {
  const id = parseInt(idStr);
  
  // Find the line with "ID: {" pattern
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i].trim();
    if (line.startsWith(id + ':') && line.includes('{')) {
      // Look for musicstore price in next 30 lines
      for (let j = i; j < Math.min(i + 30, lines.length); j++) {
        const msLine = lines[j];
        const msMatch = msLine.match(/musicstore:\s*['"]([^'"]+)['"]/);
        if (msMatch) {
          const oldPrice = msMatch[1];
          if (oldPrice !== newPrice) {
            changes.push({
              id,
              lineNum: j + 1,
              oldPrice,
              newPrice,
              line: msLine.trim()
            });
          }
          break;
        }
      }
      break;
    }
  }
}

console.log(`Found ${changes.length} price changes needed:\n`);
changes.forEach(c => {
  console.log(`Line ${c.lineNum} | ID:${c.id} | ${c.oldPrice} -> ${c.newPrice}`);
});
