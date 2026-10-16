const fs = require('fs');
const B = 'C:/Users/Daniel/projects/topmusiciangear/';
let bg = fs.readFileSync(B + 'build-guides.js', 'utf8');
const R_EUR = 1.0084, R_GBP = 0.7959;
// 1009: canonical EUR 130.08 (list price, sale ended Oct 18)
let us = 130.08 / R_EUR, gbp = us * R_GBP;
bg = bg.replace(/^[ \t]*1009: \{prices:\{pluginboutique:"[^"]+"\},pbCur:\{us:"[^"]*",uk:"[^"]*"\}\},?$/m,
  () => '1009: {prices:{pluginboutique:"€130.08"},pbCur:{us:"$' + us.toFixed(2) + '",uk:"£' + gbp.toFixed(2) + '"}},');
// 1017: canonical EUR 399.00 (Modartt prices natively in EUR)
us = 399 / R_EUR; gbp = us * R_GBP;
bg = bg.replace(/^[ \t]*1017: \{prices:\{pluginboutique:"[^"]+"\},pbCur:\{us:"[^"]*",uk:"[^"]*"\}\},?$/m,
  () => '1017: {prices:{pluginboutique:"€399.00"},pbCur:{us:"$' + us.toFixed(2) + '",uk:"£' + gbp.toFixed(2) + '"}},');
fs.writeFileSync(B + 'build-guides.js', bg, 'utf8');
try { new Function(bg); console.log('SYNTAX OK'); }
catch (e) { console.log('SYNTAX ERROR: ' + e.message); }
['1009', '1017'].forEach(id => {
  const i = bg.indexOf(id + ': {prices:');
  console.log(bg.substring(i, i + 120));
});
