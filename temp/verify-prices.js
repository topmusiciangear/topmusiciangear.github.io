const fs = require('fs');
const path = require('path');
const root = path.resolve(__dirname, '..');

// All verified prices from websearch (ID: real en_OT price)
const verifiedPrices = {
  1: '€326.90',    // SM7B
  2: '€2,520.20',  // Neumann U87
  5: '€184.00',    // SM57
  6: '€1,805.90',  // Fender Am Pro II Strat
  7: '€2,478.20',  // Gibson Les Paul '60s
  9: '€839.50',    // Ibanez RG550
  10: '€4,368.90', // PRS McCarty 594
  11: '€3,527.70', // Nord Stage 4 88
  13: '€209.20',   // Arturia KeyLab 61 Mk3
  15: '€150.40',   // Scarlett 2i2
  21: '€629.00',   // Adam A7V
  22: '€1,259.70', // Genelec 8040 BMM
  23: '€125.20',   // DT 770 PRO
  24: '€363.00',   // HD 490 Pro
  25: '€149.00',   // ATH-M50x
  26: '€74.80',    // Sony MDR-7506
  28: '€247.90',   // Kontakt 8
  29: '€755.50',   // FabFilter Total Bundle
  30: '€452.90',   // Ozone 12 Advanced
  33: '€562.20',   // Roland TR-8S
  39: '€41.20',    // Aston Shield GN
  42: '€923.50',   // SSL UF8
  50: '€100.00',   // SM58 SE
  51: '€209.20',   // MD 421 KOMPAKT
  52: '€537.00',   // EV RE20
  54: '€209.20',   // MOTU M2
  55: '€133.60',   // UA VOLT 2
  56: '€167.20',   // DT 990 Pro X
  57: '€125.20',   // AKG K-371
  59: '€58.80',    // K&M 26722
  62: '€142.00',   // FabFilter Pro-Q 4
  64: '€2,016.00', // Fender Ultra II Strat
  65: '€709.20',   // Fender Player II Jazzmaster
  66: '€948.70',   // Fender Player II Modified PB
  67: '€948.70',   // Fender Player Jazz Bass
  71: '€721.80',   // Fender Blues Junior IV
  174: '€2,856.30', // Oberheim OB-6
  182: '€3,612.61', // Apollo x16 Gen2
  183: '€2,436.10', // RME Fireface UFX III
  185: '€2,167.20', // Fender Ultra II Precision Bass
  187: '€2,587.40', // Lewitt LCT 1040
  193: '€335.30',   // Adam T10S Subwoofer
  194: '€259.70',   // Shure MV7+
  198: '€100.00',   // ATH-M40X
  200: '€172.30',   // Boss RC-5
  201: '€55.50',    // TC Electronic Ditto
  202: '€545.40',   // Line 6 HX Stomp
  204: '€247.90',   // Boss ME-90
  207: '€1,969.75', // Coles 4038
  209: '€999.00',   // Austrian Audio OC818
  216: '€1,091.60', // Neumann KM 184 Stereo Set
  297: '€140.30',   // AT2020USB-XP
  298: '€91.60',    // Rode NT-USB-Mini
  299: '€150.40',   // AT 2035
  301: '€587.40',   // IK iLoud Sub
  302: '€242.90',   // IK iLoud Micro Monitor PRO
  304: '€545.40',   // Kali IN-UNF
  305: '€251.30',   // Genelec 8010A
  308: '€528.60',   // IK iLoud MTM MKII Pair
  311: '€382.40',   // Squier Classic Vibe '50s Strat
  312: '€940.30',   // PRS SE Custom 24
  313: '€133.60',   // Squier Sonic Mustang
  314: '€335.30',   // Yamaha FGX 800C
  315: '€276.50',   // Yamaha FS 800
  319: '€2,100.00', // ESP E-II Eclipse DB
  321: '€438.70',   // Shure SM7dB
  322: '€1,251.30', // Neumann KH 750 DSP
  331: '€3,360.50', // Genelec 8351 BP
  337: '€1,251.30', // Neumann KH 750 DSP (Single)
  338: '€839.50',   // Genelec 7050CPM
  340: '€478.20',   // Rode NTG5 Kit
  343: '€217.60',   // AT897
  345: '€197.50',   // Rode VideoMic NTG
  362: '€377.30',   // PRS SE McCarty 594
  364: '€670.60',   // beyerdynamic M 160
  370: '€780.70',   // Kawai ES-520 B
  396: '€250.42',   // existing entry
  431: '€18.49',    // Behringer XM 8500
};

console.log('Products to update:', Object.keys(verifiedPrices).length);

// Read build-guides.js
const buildSrc = fs.readFileSync(path.join(root, 'build-guides.js'), 'utf8');

let updated = 0;
let notFound = 0;

for (const [idStr, newPrice] of Object.entries(verifiedPrices)) {
  const id = parseInt(idStr);
  
  // Find the musicstore price line for this ID
  // Pattern: ID: {\n ... musicstore: '€XXX.XX' ...
  const idPattern = new RegExp(`(${id}):\\s*\\{`, 'g');
  let match;
  while ((match = idPattern.exec(buildSrc)) !== null) {
    const startIdx = match.index;
    // Find the musicstore line within the next 500 chars
    const chunk = buildSrc.slice(startIdx, startIdx + 500);
    const msMatch = chunk.match(/musicstore:\s*['"]([^'"]+)['"]/);
    if (msMatch) {
      const oldPrice = msMatch[1];
      if (oldPrice !== newPrice) {
        const oldStr = `musicstore: '${oldPrice}'`;
        const newStr = `musicstore: '${newPrice}'`;
        // Only replace within this ID's block
        const blockStart = buildSrc.lastIndexOf(id + ':', startIdx + 200);
        if (blockStart !== -1) {
          const blockChunk = buildSrc.slice(blockStart, blockStart + 500);
          if (blockChunk.includes(oldStr)) {
            // Find exact position
            const pos = buildSrc.indexOf(oldStr, blockStart);
            if (pos !== -1 && pos < blockStart + 500) {
              buildSrc.substring(0, pos) + newStr + buildSrc.substring(pos + oldStr.length);
              // Can't modify string directly, need to use replace
            }
          }
        }
        console.log(`ID:${id} | ${oldPrice} -> ${newPrice}`);
        updated++;
      } else {
        // Already correct
      }
      break;
    }
  }
}

console.log('\nUpdated:', updated);
console.log('Note: This script identifies changes. Use the edit tool to apply them.');
