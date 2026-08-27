var h = require('fs').readFileSync('C:\\Users\\Daniel\\projects\\topmusiciangear\\guides\\best-microphone.html', 'utf8');
// Find all guide-section-buy divs
var idx = 0, count = 0;
while (true) {
  var pos = h.indexOf('guide-section-buy', idx);
  if (pos < 0) break;
  count++;
  // Find the primary button near this position
  var btnPos = h.indexOf('shop-btn-primary', pos);
  if (btnPos > -1 && btnPos < pos + 500) {
    var dataStore = h.indexOf('data-store=', btnPos);
    console.log('Card #' + count + ' at ' + pos + ': data-store near ' + dataStore);
    if (dataStore > -1 && dataStore < btnPos + 100) {
      console.log('  -> ' + h.substring(dataStore, dataStore + 30));
    } else {
      console.log('  -> NO data-store on primary button');
      // Show the button area
      console.log('  -> Button: ' + h.substring(btnPos, btnPos + 200));
    }
  }
  idx = pos + 1;
}
console.log('Total guide-section-buy:', count);
