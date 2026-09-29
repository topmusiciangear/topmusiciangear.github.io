var fs = require('fs');
var s = fs.readFileSync('js/app.js', 'utf8');
var i = s.indexOf('tmgStoreButtons');
console.log('--- around tmgStoreButtons ---');
console.log(s.slice(i - 200, i + 900).replace(/\n/g, ' '));
console.log('\n--- amazon price patterns ---');
['prices[k]', 'prices[', 'primaryStoreKey', 'pPrice', 'Check price', 'Verificar', 'font-weight:700;color:#fff'].forEach(function (k) {
  var c = s.split(k).length - 1;
  console.log('   ' + k + ' x' + c);
});