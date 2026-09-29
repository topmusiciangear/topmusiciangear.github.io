var fs = require('fs');
var g = fs.readFileSync('guides/best-interface.html', 'utf8');
['shop-buttons', 'tmgGeoSwap', 'doSwap(', 'quickTarget', 'geo', '<script', 'src="js/'].forEach(function (k) {
  console.log(k + ' : ' + (g.split(k).length - 1));
});
console.log('\n--- script tags ---');
var re = /<script[^>]*src="[^"]*"[^>]*>/g;
var m;
while ((m = re.exec(g)) !== null) console.log(m[0]);
console.log('\n--- doSwap usages context ---');
var i = g.indexOf('doSwap(');
var j = g.indexOf('doSwap(', i + 1);
console.log(g.slice(j > 0 ? j - 120 : i - 120, (j > 0 ? j : i) + 160).replace(/\n/g, ' '));