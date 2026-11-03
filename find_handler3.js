var fs = require('fs');
var c = fs.readFileSync('index.html', 'utf8');
// Search around guideCats
var idx = c.indexOf('guideCats');
console.log('guideCats at:', idx);
if (idx >= 0) {
  console.log('Context (1000 chars):');
  console.log(c.substring(idx - 100, idx + 1000));
}
// Also search for the click handler pattern
var handlers = ['onClick', 'addEventListener', 'forEach', 'guideCats'];
handlers.forEach(function(p) {
  var idx2 = c.indexOf(p);
  console.log(p + ' found at:', idx2 >= 0 ? idx2 : 'NOT FOUND');
});