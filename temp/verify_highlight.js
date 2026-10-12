var fs = require('fs');
var guides = ['guides/best-keyboard.html', 'guides/best-keyboard_es.html', 'guides/budget-usb-mics.html', 'guides/budget-usb-mics_es.html'];
guides.forEach(function(f) {
  var h = fs.readFileSync(f, 'utf8');
  // Check verdict text
  var vIdx = h.indexOf('class="verdict-text">');
  if (vIdx > -1) {
    var vEnd = h.indexOf('</div>', vIdx);
    var vText = h.slice(vIdx + 20, vEnd);
    console.log(f + ' VERDICT: ' + vText.slice(0, 200));
  }
  // Check conclusion
  var cIdx = h.indexOf('class="guide-conclusion-content">');
  if (cIdx > -1) {
    var cEnd = h.indexOf('</div>', cIdx);
    var cText = h.slice(cIdx + 31, cEnd);
    console.log(f + ' CONCLUSION: ' + cText.slice(0, 300));
  }
  // Check for product-name spans
  var pnCount = (h.match(/class="product-name"/g) || []).length;
  var vpnCount = (h.match(/class="verdict-product-name"/g) || []).length;
  console.log(f + ' product-name spans: ' + pnCount + ', verdict-product-name spans: ' + vpnCount);
  console.log('---');
});