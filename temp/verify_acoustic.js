var fs = require('fs');
var h = fs.readFileSync('guides/acoustic-guitars-guide.html', 'utf8');
var cIdx = h.indexOf('class="guide-conclusion-content">');
if (cIdx > -1) {
  var cEnd = h.indexOf('</div>', cIdx);
  var cText = h.slice(cIdx + 31, cEnd);
  console.log('CONCLUSION HTML (first 800):');
  console.log(cText.slice(0,800));
}
console.log('---');
var vIdx = h.indexOf('class="verdict-text">');
if (vIdx > -1) {
  var vEnd = h.indexOf('</div>', vIdx);
  var vText = h.slice(vIdx + 20, vEnd);
  console.log('VERDICT HTML (first 500):');
  console.log(vText.slice(0,500));
}
// Count product-name spans
var pnCount = (h.match(/class="product-name"/g) || []).length;
console.log('product-name spans:', pnCount);