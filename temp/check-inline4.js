var h = require('fs').readFileSync('C:\\Users\\Daniel\\projects\\topmusiciangear\\guides\\best-microphone.html', 'utf8');
// Find inline sections
var re = /guide-section-buy/g;
var m;
while ((m = re.exec(h)) !== null) {
  // Get context around match
  var start = Math.max(0, m.index - 5);
  var chunk = h.substring(start, m.index + 300);
  // Check if it has shop-more-list
  var hasMoreList = chunk.includes('shop-more-list');
  // Check data-store values
  var stores = [];
  var sr = /data-store="([^"]+)"/g;
  var sm;
  while ((sm = sr.exec(chunk)) !== null) stores.push(sm[1]);
  console.log('Position:', m.index, '| hasMoreList:', hasMoreList, '| stores:', stores.join(', '));
}
