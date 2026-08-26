var fs = require('fs');
var b = fs.readFileSync('build-guides.js', 'utf8');

var prices = {
  66: '€949.00', 67: '€949.00', 155: '€2,113.00', 156: '€2,199.00',
  157: '€449.00', 158: '€295.00', 159: '€335.00', 160: '€335.00',
  105: '€1,621.00', 106: '€549.00', 108: '€755.00', 109: '€1,569.00',
  154: '€459.00', 216: '€1,149.00', 217: '€949.00', 218: '€569.00',
  219: '€649.00', 225: '€549.00',
  8: '€3,212.00', 102: '€319.00', 104: '€4,299.00', 64: '€2,399.00',
  208: '€899.00', 210: '€399.00', 211: '€549.00', 212: '€379.00',
  213: '€379.00', 226: '€179.00', 228: '€399.00', 229: '€899.00',
  230: '€149.00', 231: '€399.00', 343: '€449.00',
  178: '€1,199.00', 221: '€1,999.00', 223: '€2,999.00', 224: '€3,499.00',
  100: '€149.00', 101: '€99.00', 370: '€399.00', 365: '€539.00'
};

var lines = b.split('\n');
var added = 0;

for (var i = 0; i < lines.length; i++) {
  var m = lines[i].match(/^\s*(\d+):\s*\{/);
  if (!m) continue;
  var id = parseInt(m[1]);
  if (prices[id] === undefined) continue;

  // Check if musicstore already exists
  var hasMs = false;
  for (var j = i; j < Math.min(i + 5, lines.length); j++) {
    if (lines[j].indexOf('musicstore:') > -1) {
      // Update existing
      lines[j] = lines[j].replace(/musicstore:\s*["'][^"']+["']/, 'musicstore: "' + prices[id] + '"');
      hasMs = true;
      break;
    }
  }

  if (!hasMs) {
    // Find the closing of the entry's config object (look for } or }, at end of entry)
    for (var j = i; j < Math.min(i + 5, lines.length); j++) {
      var line = lines[j];
      // Match entry closing pattern: } }, or } or },
      if (line.match(/\}\s*\}\s*,?\s*$/) || line.match(/^\s*\d+:\s*\{.*\}\s*\}\s*,?\s*$/)) {
        // Add musicstore before the last }}
        var newLine = line.replace(/\}\s*\}\s*,?\s*$/, ', musicstore: "' + prices[id] + '" } },');
        if (newLine !== line) {
          lines[j] = newLine;
          added++;
        }
        break;
      }
    }
  }
}

var result = lines.join('\n');
fs.writeFileSync('build-guides.js', result, 'utf8');
console.log('Added/updated:', added);
