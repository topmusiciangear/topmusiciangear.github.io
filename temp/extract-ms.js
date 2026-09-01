var fs = require('fs');
var src = fs.readFileSync('build-guides.js','utf8');
var i = src.indexOf('const TEST_SHOP_BTN');
var rest = src.substring(i);
var lines = rest.split('\n');
var endIdx = 0;
for (var k = 1; k < lines.length; k++) {
  if (lines[k].trim() === '}' || lines[k].trim().startsWith('}\n')) {
    endIdx = k;
    break;
  }
}
var block = lines.slice(0, endIdx + 1).join('\n');
var re = /(\d+):\s*\{[^}]*musicstore:"([^"]+)"/g;
var m;
var results = [];
while ((m = re.exec(block)) !== null) {
  results.push(m[1] + '|' + m[2]);
}
// If regex didn't work well, try line by line
if (results.length === 0) {
  for (var k = 0; k < endIdx; k++) {
    var line = lines[k];
    var idMatch = line.match(/(\d+):\s*\{/);
    if (!idMatch) continue;
    var id = idMatch[1];
    var msMatch = line.match(/musicstore:"([^"]+)"/);
    if (msMatch) {
      results.push(id + '|' + msMatch[1]);
    }
  }
}
fs.writeFileSync('temp/ms-prices.txt', results.join('\n') + '\n');
console.log('Total Music Store prices found: ' + results.length);
