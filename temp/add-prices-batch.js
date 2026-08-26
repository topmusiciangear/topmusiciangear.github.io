const fs = require('fs');
const lines = fs.readFileSync('build-guides.js', 'utf8').split('\n');

// Prices to add: {id: {gear4music: '£xxx', musicstore: '€xxx'}}
const prices = {
  146: { gear4music: '£302.50' },
  147: { gear4music: '£835' },
  189: { gear4music: '£1,649' },
  190: { gear4music: '£1,891' },
  226: { gear4music: '£161.50' },
  239: { gear4music: '£899' },
  255: { gear4music: '£549' },
  256: { gear4music: '£829' },
  260: { gear4music: '£329.99' },
  267: { gear4music: '£1,399' },
  269: { gear4music: '£813' },
  271: { gear4music: '£519' },
  308: { gear4music: '£650' },
  310: { gear4music: '£229' },
  311: { gear4music: '£379' },
  312: { gear4music: '£829' },
  349: { gear4music: '£881' },
  372: { gear4music: '£540' },
  6: { musicstore: '€1,805.90' },
  62: { musicstore: '€142' },
  66: { musicstore: '€755.50' },
  67: { musicstore: '€948.70' },
  71: { musicstore: '€761.60' },
  72: { musicstore: '€339' },
  74: { musicstore: '€587.40' },
  96: { musicstore: '€124.40' },
  100: { musicstore: '€139' },
  198: { musicstore: '€100' },
  199: { musicstore: '€369' },
  201: { musicstore: '€55.50' },
  252: { musicstore: '€200.80' },
  304: { musicstore: '€298' },
  305: { musicstore: '€394.10' },
  307: { musicstore: '€298' },
  308: { musicstore: '€377.30' },
  365: { musicstore: '€388.20' },
  370: { musicstore: '€299' },
  371: { musicstore: '€199.90' },
  372: { musicstore: '€540' }
};

// Find TEST_SHOP_BTN block
let inBlock = false;
let added = 0;

for (let i = 0; i < lines.length; i++) {
  const line = lines[i];
  if (line.includes('const TEST_SHOP_BTN')) { inBlock = true; continue; }
  if (!inBlock) continue;
  if (line.match(/^\s*};/) && !line.includes('{')) { break; } // end of block

  // Check if this line starts an ID entry
  const idMatch = line.match(/^\s+(\d+):\s*\{/);
  if (!idMatch) continue;
  const id = parseInt(idMatch[1]);
  if (!prices[id]) continue;

  const cfg = prices[id];
  const lineStr = line;

  // Add gear4music inside prices object
  if (cfg.gear4music && !lineStr.includes('gear4music:')) {
    // Find the closing } of prices and insert before it
    // Pattern: ... } } or ... }, musicstore or ... } },
    if (lineStr.includes("prices: {")) {
      // Single-line entry with prices
      lineStr.replace(/\}\s*\}/, (m) => {
        // This doesn't work for multi-line. Need different approach.
      });
    }
    // Multi-line approach: find the prices closing brace on subsequent lines
    let j = i;
    let depth = 0;
    let foundPricesClose = false;
    while (j < lines.length && j < i + 10) {
      for (const ch of lines[j]) {
        if (ch === '{') depth++;
        if (ch === '}') depth--;
      }
      if (depth === 0) {
        // Found closing of this entry
        // Check if gear4music is in this entry
        const entry = lines.slice(i, j + 1).join('\n');
        if (!entry.includes('gear4music:')) {
          // Insert before the last closing }
          const lastClose = lines[j].lastIndexOf('}');
          if (lastClose >= 0) {
            lines[j] = lines[j].substring(0, lastClose) + ",\n        gear4music: '" + cfg.gear4music + "'" + lines[j].substring(lastClose);
            added++;
            console.log('ID ' + id + ': added gear4music ' + cfg.gear4music);
          }
        }
        break;
      }
      j++;
    }
  }

  // Add musicstore as sibling after prices
  if (cfg.musicstore) {
    const entry = lines.slice(i, Math.min(i + 10, lines.length)).join('\n');
    if (!entry.includes('musicstore:')) {
      // Find the prices closing brace
      let j = i;
      let depth = 0;
      while (j < lines.length && j < i + 10) {
        for (const ch of lines[j]) {
          if (ch === '{') depth++;
          if (ch === '}') depth--;
        }
        if (depth === 0) {
          // This is the entry closing. Insert musicstore before the final }
          const lastClose = lines[j].lastIndexOf('}');
          if (lastClose >= 0) {
            lines[j] = lines[j].substring(0, lastClose) + ", musicstore: '" + cfg.musicstore + "'" + lines[j].substring(lastClose);
            added++;
            console.log('ID ' + id + ': added musicstore ' + cfg.musicstore);
          }
          break;
        }
        j++;
      }
    }
  }
}

console.log('\nTotal added: ' + added);
fs.writeFileSync('build-guides.js', lines.join('\n'));
