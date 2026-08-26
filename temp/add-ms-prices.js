var fs = require('fs');
var b = fs.readFileSync('build-guides.js', 'utf8');

// All confirmed Music Store prices (EUR with German IVA)
var newPrices = {
  1: "€389.00", 2: "€2,999.00", 3: "€199.00", 4: "€98.00", 5: "€105.00",
  10: "€359.00", 11: "€4,199.00", 12: "€4,728.00", 13: "€249.00",
  19: "€289.00", 20: "€266.00", 21: "€629.00", 22: "€879.00", 23: "€149.00",
  24: "€415.00", 26: "€89.00",
  50: "€105.00", 51: "€395.00", 52: "€522.00",
  91: "€595.00", 93: "€675.00", 95: "€80.00",
  116: "€159.00", 117: "€199.00",
  131: "€279.00",
  140: "€500.00", 141: "€520.00", 142: "€611.00", 143: "€1,992.00",
  187: "€3,190.00",
  194: "€309.00", 196: "€98.00",
  252: "€239.00",
  276: "€89.00",
  291: "€129.00", 292: "€109.00",
  297: "€392.00", 298: "€179.00",
  303: "€522.00",
  321: "€522.00",
  340: "€569.00",
  364: "€798.00", 365: "€539.00", 366: "€137.00",
  206: "€1,935.00", 207: "€1,279.00",
  // Headphones
  23: "€149.00",  // DT 770 Pro
  25: "€148.00",  // DT 990 Pro
  39: "€148.00",  // ATH-M50x
  56: "€72.00",   // HD 280 Pro
  57: "€144.50",  // AKG K371
  99: "€69.00",   // AKG K240 Studio
  // Interfaces
  130: "€179.00", // Scarlett 2i2
  133: "€99.00",  // Scarlett Solo
  134: "€159.00", // Volt 2
  135: "€199.00", // iD14
  136: "€249.00", // MOTU M2
  137: "€298.00", // SSL 2+
  127: "€889.00", // RME Babyface
  145: "€155.00", // Steinberg UR22C
  // Synths/Keys
  153: "€89.00",  // Akai MPK Mini
};

// Find TEST_SHOP_BTN block
var startMarker = 'const TEST_SHOP_BTN = {';
var startIdx = b.indexOf(startMarker);
if (startIdx === -1) { console.log('TEST_SHOP_BTN not found'); process.exit(1); }

// Find the end of TEST_SHOP_BTN (matching closing brace)
var depth = 0;
var inString = false;
var stringChar = '';
var endIdx = -1;
for (var i = startIdx + startMarker.length - 1; i < b.length; i++) {
  var ch = b[i];
  if (inString) {
    if (ch === stringChar && b[i-1] !== '\\') inString = false;
  } else {
    if (ch === "'" || ch === '"' || ch === '`') { inString = true; stringChar = ch; }
    else if (ch === '{') depth++;
    else if (ch === '}') {
      depth--;
      if (depth === 0) { endIdx = i + 1; break; }
    }
  }
}

var block = b.substring(startIdx, endIdx);

// For each new price, check if ID already has musicstore in the block
// If yes, update the price. If no, add new entry.
var lines = block.split('\n');
var newLines = [];
var addedIds = {};

for (var i = 0; i < lines.length; i++) {
  var line = lines[i];
  var idMatch = line.match(/^\s*(\d+):\s*\{/);
  
  if (idMatch) {
    var id = parseInt(idMatch[1]);
    if (newPrices[id] !== undefined) {
      // Check if musicstore already exists on this line or nearby
      var hasMusicstore = false;
      var combinedLine = line;
      for (var j = i; j < Math.min(i + 15, lines.length); j++) {
        if (lines[j].indexOf('musicstore:') > -1) {
          hasMusicstore = true;
          // Replace the price
          lines[j] = lines[j].replace(/musicstore:\s*["'][^"']+["']/, 'musicstore: "' + newPrices[id] + '"');
          break;
        }
      }
      if (!hasMusicstore) {
        // Add musicstore before closing of prices object
        // Find the line with the closing } of this entry
        for (var j = i; j < Math.min(i + 15, lines.length); j++) {
          if (lines[j].match(/\}\s*\}/) || lines[j].match(/\}\s*\}\s*,?$/)) {
            // Insert musicstore before the closing
            lines[j] = lines[j].replace(/\}\s*\}/, ', musicstore: "' + newPrices[id] + '" }');
            break;
          }
        }
      }
      addedIds[id] = true;
    }
  }
}

var result = lines.join('\n');

// Write back
fs.writeFileSync('build-guides.js', result, 'utf8');
console.log('Updated TEST_SHOP_BTN with ' + Object.keys(addedIds).length + ' musicstore prices');
console.log('IDs updated: ' + Object.keys(addedIds).sort(function(a,b){return a-b;}).join(', '));
