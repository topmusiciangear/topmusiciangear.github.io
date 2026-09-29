var fs = require('fs');
var g = fs.readFileSync('guides/best-interface.html', 'utf8');
['tmgStoreButtons', 'shopButtonsTest', 'window.tmgStoreButtons'].forEach(function (k) {
  var c = g.split(k).length - 1;
  console.log(k + ' x' + c);
});
var i = g.indexOf('window.tmgStoreButtons');
if (i < 0) i = g.indexOf('tmgStoreButtons');
console.log('\ncontext:');
console.log(g.slice(i - 300, i + 500).replace(/\n/g, ' '));