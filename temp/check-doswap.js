var h = require('fs').readFileSync('C:\\Users\\Daniel\\projects\\topmusiciangear\\guides\\best-microphone.html', 'utf8');
var s = h.indexOf('<script>\n(function(){\n  function doSwap()');
var e = h.indexOf('</script>', s);
var script = h.substring(s + 8, e);
var nl = script.split('\n');
nl.forEach(function(l, i) {
  if (l.indexOf('newPrimary') > -1 && l.indexOf('var') > -1) console.log(i + ': ' + l.substring(l.length - 200));
});
