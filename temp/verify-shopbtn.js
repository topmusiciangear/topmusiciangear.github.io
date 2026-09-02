var fs = require('fs');
var sb = fs.readFileSync('js/shop-buttons.js', 'utf8');
console.log('Has wrapAffiliate:', sb.indexOf('function wrapAffiliate') >= 0);
console.log('Has wrapAffiliate call:', sb.indexOf('wrapAffiliate') >= 0);

// Find all musicstore URLs
var re = /musicstore\.com[^"'\s)<>]*/g;
var m;
var total = 0, withAwin = 0;
while (m = re.exec(sb)) {
  total++;
  var ctx = sb.substring(Math.max(0, m.index - 50), m.index + m[0].length + 50);
  if (ctx.indexOf('awin1.com') >= 0) withAwin++;
  else console.log('NO AWIN:', m[0].substring(0, 80));
}
console.log('\nMusic Store URLs: ' + withAwin + '/' + total + ' with Awin');

// Check all store URLs
var stores = ['zzounds', 'reverb', 'gear4music', 'andertons', 'musicstore', 'pluginboutique', 'amazon'];
stores.forEach(function(s) {
  var hasFn = sb.indexOf('function wrapAffiliate') >= 0;
  console.log(s + ': wrapAffiliate present = ' + hasFn);
});
