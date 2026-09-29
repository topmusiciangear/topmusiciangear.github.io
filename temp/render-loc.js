var fs = require('fs');
['js/app.js', 'js/constants.js', 'js/translations.js'].forEach(function (f) {
  if (!fs.existsSync(f)) { console.log(f + ': MISSING'); return; }
  var s = fs.readFileSync(f, 'utf8');
  console.log('== ' + f + ' (' + s.length + ' bytes)');
  ['tmgStoreButtons', 'shopButtonsTest', 'pPrice', 'tmgCheckLabel', 'doSwap', 'shop-more-list', 'Amazon'].forEach(function (k) {
    var c = s.split(k).length - 1;
    if (c > 0) console.log('   ' + k + ' x' + c);
  });
});