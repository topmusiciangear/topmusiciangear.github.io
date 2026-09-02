const fs = require('fs');
let bg = fs.readFileSync('build-guides.js', 'utf8');

const priceAdds = [
  { btn: 422, price: '304.00' },
  { btn: 419, price: '74.80' },
  { btn: 420, price: '98.00' },
  { btn: 421, price: '180.70' },
  { btn: 423, price: '285.00' },
  { btn: 424, price: '458.00' },
  { btn: 427, price: '83.20' },
  { btn: 425, price: '335.29' },
  { btn: 360, price: '1,368.90' },
  { btn: 411, price: '1,427.70' },
  { btn: 352, price: '158.80' },
  { btn: 357, price: '604.20' },
  { btn: 309, price: '189.00' },
  { btn: 300, price: '503.40' },
  { btn: 293, price: '333.00' },
];

const lines = bg.split('\n');
let modified = 0;

for (const { btn, price } of priceAdds) {
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    if (line.trimStart().startsWith(btn + ':')) {
      if (line.includes('musicstore:')) {
        console.log('SKIP ' + btn + ' - already has musicstore');
        break;
      }
      
      // Strategy: find "prices:{" and insert musicstore before its closing "}"
      // The prices object ends at the first "}" after "prices:{"
      const pricesIdx = line.indexOf('prices:{');
      if (pricesIdx < 0) { console.log('SKIP ' + btn + ' - no prices block'); break; }
      
      // Find the closing } of prices:{...}
      let depth = 0;
      let pricesEnd = -1;
      for (let j = pricesIdx + 8; j < line.length; j++) {
        if (line[j] === '{') depth++;
        if (line[j] === '}') {
          if (depth === 0) { pricesEnd = j; break; }
          depth--;
        }
      }
      
      if (pricesEnd < 0) { console.log('SKIP ' + btn + ' - cant find prices end'); break; }
      
      // Insert ",musicstore:"€PRICE"" before the closing } of prices
      const insert = ',musicstore:"\u20ac' + price + '"';
      lines[i] = line.substring(0, pricesEnd) + insert + line.substring(pricesEnd);
      
      // Also remove btn from oos array if present
      if (lines[i].includes('oos:[')) {
        lines[i] = lines[i].replace(new RegExp(',?"musicstore"'), '').replace(/,\s*,/g, ',').replace(/\[,/g, '[').replace(/,\]/g, ']');
      }
      
      modified++;
      console.log('ADD ' + btn + ' musicstore:\u20ac' + price);
      break;
    }
  }
}

fs.writeFileSync('build-guides.js', lines.join('\n'));
console.log('\n' + modified + ' prices added');
