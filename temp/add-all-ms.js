var fs = require('fs');
var b = fs.readFileSync('build-guides.js', 'utf8');

var newPrices = {
  // Basses
  66: "€949.00",   // Fender Player P-Bass (en_OT €797.30 × 1.19)
  67: "€949.00",   // Fender Player J-Bass (en_OT €797.30 × 1.19)
  155: "€2,113.00", // Fender Am Pro II P-Bass (de_LU)
  156: "€2,199.00", // Fender Am Pro II J-Bass (en_OT €1,847.90 × 1.19)
  157: "€449.00",   // Squier CV 60s J-Bass (en_OT €377.30 × 1.19)
  158: "€295.00",   // Squier Affinity P-Bass PJ (en_OT €247.90 × 1.19)
  159: "€335.00",   // Yamaha TRBX304
  160: "€335.00",   // Ibanez SR300E (de_DE)

  // Subwoofers
  105: "€1,621.00", // QSC KS118 (en_OT × 1.19)
  216: "€1,149.00", // RCF NX 912-SMA (de_DE)
  217: "€949.00",   // EV PXM-12MP (de_DE)

  // Speakers
  106: "€549.00",   // EV ZLX-12P-G2 (de_DE)
  108: "€755.00",   // Yamaha DXR12mkII (de_DE)
  109: "€1,569.00", // JBL PRX ONE (de_DE)
  154: "€459.00",   // Yamaha DBR12 (de_DE)

  // Acoustic
  8: "€3,212.00",   // Taylor 314ce (en_OT × 1.19)
  102: "€319.00",   // Yamaha FG800 (en_OT × 1.19)
  104: "€4,299.00", // Martin D-28 (en_OT × 1.19)
  64: "€2,399.00",  // Fender Am Ultra Strat

  // Microphones
  208: "€899.00",   // Neumann KM 184
  210: "€399.00",   // Sennheiser e906
  211: "€549.00",   // Beyerdynamic M 201 TG
  212: "€379.00",   // Shure Beta 52A
  213: "€379.00",   // Audix D6
  226: "€179.00",   // Shure Beta 58A
  228: "€399.00",   // Sennheiser e945
  229: "€899.00",   // Telefunken M80
  230: "€149.00",   // AKG D5
  231: "€399.00",   // Audix OM7
  343: "€449.00",   // Audio-Technica AT897

  // Monitors
  178: "€1,199.00", // Audeze LCD-X
  221: "€1,999.00", // Dynaudio Core 7
  223: "€2,999.00", // Focal Trio6 ST6
  224: "€3,499.00", // Focal Twin6 ST6

  // Live sound
  218: "€569.00",   // LD Systems MON 12 A G3
  219: "€649.00",   // Yamaha DHR12M
  225: "€549.00",   // RCF ART 710-A MK5

  // Pedals
  100: "€149.00",   // TC Electronic Hall of Fame 2
  101: "€99.00",    // Electro-Harmonix Small Stone

  // Other
  370: "€399.00",   // Roland GO:KEYS 3
  365: "€539.00",   // sE Voodoo VR2 (already confirmed)
};

// Find TEST_SHOP_BTN and update
function findBlock(src, startMarker) {
  var idx = src.indexOf(startMarker);
  if (idx === -1) return null;
  var depth = 0, inStr = false, sc = '';
  var braceStart = src.indexOf('{', idx);
  for (var i = braceStart; i < src.length; i++) {
    var c = src[i];
    if (inStr) { if (c === sc && src[i-1] !== '\\') inStr = false; }
    else {
      if (c === "'" || c === '"' || c === '`') { inStr = true; sc = c; }
      else if (c === '{') depth++;
      else if (c === '}') { depth--; if (depth === 0) return src.substring(idx, i + 1); }
    }
  }
  return null;
}

var oldBlock = findBlock(b, 'const TEST_SHOP_BTN');
if (!oldBlock) { console.log('ERROR: TEST_SHOP_BTN not found'); process.exit(1); }

// Parse and update entries
var lines = oldBlock.split('\n');
var count = 0;

for (var i = 0; i < lines.length; i++) {
  var idMatch = lines[i].match(/^(\s*)(\d+):\s*\{/);
  if (!idMatch) continue;
  var id = parseInt(idMatch[2]);
  if (newPrices[id] === undefined) continue;

  // Check if musicstore already exists
  var hasMs = false;
  for (var j = i; j < Math.min(i + 20, lines.length); j++) {
    if (lines[j].indexOf('musicstore:') > -1) {
      hasMs = true;
      // Update price
      lines[j] = lines[j].replace(/musicstore:\s*["'][^"']+["']/, 'musicstore: "' + newPrices[id] + '"');
      break;
    }
  }

  if (!hasMs) {
    // Find end of this entry's prices object and insert musicstore
    for (var j = i; j < Math.min(i + 20, lines.length); j++) {
      if (lines[j].indexOf('}') > -1 && (lines[j].indexOf('oos:') > -1 || lines[j].match(/\}\s*\},?\s*$/))) {
        // Insert before the closing
        lines[j] = lines[j].replace(/\}\s*\}/, ', musicstore: "' + newPrices[id] + '" }');
        break;
      }
    }
    count++;
  }
}

var newBlock = lines.join('\n');
var result = b.replace(oldBlock, newBlock);
fs.writeFileSync('build-guides.js', result, 'utf8');
console.log('Added ' + count + ' new musicstore prices, updated ' + (Object.keys(newPrices).length - count) + ' existing');
