var fs = require('fs');
var m = JSON.parse(fs.readFileSync('data/manual-deals.json', 'utf8'));
var before = m.length;
var dropped = [];
m = m.filter(function (x) {
  var drop = (x.store === 'zzounds') || (x.title === 'XLN Audio RC-20 Retro Color' && x.source !== 'telegram');
  if (drop) dropped.push(x.store + ' | ' + x.title);
  return !drop;
});
fs.writeFileSync('data/manual-deals.json', JSON.stringify(m, null, 2) + '\n');
console.log('manual: ' + before + ' -> ' + m.length);
dropped.forEach(function (d) { console.log('  dropped: ' + d); });
