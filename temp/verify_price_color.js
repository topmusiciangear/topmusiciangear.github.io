var fs = require('fs');
var h = fs.readFileSync('guides/acoustic-guitars-guide.html', 'utf8');
var g4mIdx = h.indexOf('data-store="gear4music"');
var count = 0;
while (g4mIdx > -1) {
  var seg = h.slice(g4mIdx, g4mIdx + 2000);
  var priceMatch = seg.match(/font-weight:700;color:#([a-f0-9]{3,6})/);
  if (priceMatch) {
    console.log('G4M price color: #' + priceMatch[1]);
    count++;
  }
  g4mIdx = h.indexOf('data-store="gear4music"', g4mIdx + 1);
}
console.log('Total G4M rows checked:', count);
// Also check for OOS prices specifically
var oosIdx = h.indexOf('background:#262626');
var oosCount = 0;
while (oosIdx > -1) {
  var seg = h.slice(oosIdx, oosIdx + 2000);
  var priceMatch = seg.match(/font-weight:700;color:#([a-f0-9]{3,6})/);
  if (priceMatch) {
    console.log('OOS row price color: #' + priceMatch[1]);
    oosCount++;
  }
  oosIdx = h.indexOf('background:#262626', oosIdx + 1);
}
console.log('Total OOS rows checked:', oosCount);