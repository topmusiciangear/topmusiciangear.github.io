var fs = require('fs');
var src = fs.readFileSync('build-guides.js', 'utf8');

// Music Store prices to add
var prices = {
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
  25: "€148.00", 39: "€148.00", 56: "€72.00", 57: "€144.50", 99: "€69.00",
  130: "€179.00", 133: "€99.00", 134: "€159.00", 135: "€199.00",
  136: "€249.00", 137: "€298.00", 127: "€889.00", 145: "€155.00",
  153: "€89.00"
};

// Find TEST_SHOP_BTN start and end
var btnStart = src.indexOf('const TEST_SHOP_BTN = {');
var btnEnd = src.indexOf('\n};', btnStart);
if (btnEnd === -1) btnEnd = src.indexOf('\n}\n', btnStart);
if (btnEnd === -1) { console.log('Cannot find end of TEST_SHOP_BTN'); process.exit(1); }

var before = src.substring(0, btnStart);
var block = src.substring(btnStart, btnEnd + 2); // +2 for \n}
var after = src.substring(btnEnd + 2);

// Process each line in the block
var lines = block.split('\n');
var result = [];
var count = 0;

for (var i = 0; i < lines.length; i++) {
  var line = lines[i];
  
  // Match ID entry start
  var idMatch = line.match(/^(\s*)(\d+):\s*\{/);
  if (idMatch) {
    var id = parseInt(idMatch[2]);
    var indent = idMatch[1];
    
    if (prices[id] !== undefined) {
      // Check if musicstore already exists in this entry
      var entryLines = [line];
      var found = line.indexOf('musicstore:') > -1;
      var entryEnd = i;
      
      if (!found) {
        // Look ahead for the closing of this entry
        var depth = 0;
        for (var j = i; j < Math.min(i + 20, lines.length); j++) {
          for (var k = 0; k < lines[j].length; k++) {
            if (lines[j][k] === '{') depth++;
            if (lines[j][k] === '}') depth--;
          }
          if (depth <= 0) { entryEnd = j; break; }
          if (lines[j].indexOf('musicstore:') > -1) { found = true; }
        }
        
        if (!found) {
          // Add musicstore to the last line of this entry (before closing braces)
          var lastLine = lines[entryEnd];
          // Insert before the last closing brace(s)
          var match = lastLine.match(/(\}+)\s*(,?\s*)$/);
          if (match) {
            lines[entryEnd] = lastLine.substring(0, lastLine.length - match[0].length) +
              ', musicstore: "' + prices[id] + '" ' + match[1] + match[2];
          } else {
            // Fallback: append to line
            lines[entryEnd] = lastLine + ', musicstore: "' + prices[id] + '"';
          }
          count++;
        }
      }
    }
  }
  
  result.push(lines[i]);
}

var output = before + result.join('\n') + after;
fs.writeFileSync('build-guides.js', output, 'utf8');
console.log('Added ' + count + ' musicstore prices');
