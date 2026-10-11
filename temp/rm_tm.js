var fs = require('fs');
var m = JSON.parse(fs.readFileSync('data/manual-deals.json', 'utf8'));
var before = m.length;
m = m.filter(function (x) { return x.title !== 'Fender Tone Master Deluxe Reverb'; });
fs.writeFileSync('data/manual-deals.json', JSON.stringify(m, null, 2) + '\n');
console.log('manual: ' + before + ' -> ' + m.length + ' | TM Deluxe removed');
var left = m.filter(function (x) { return x.source !== 'telegram'; });
console.log('non-telegram manuals to reverify:');
left.forEach(function (x) { console.log(' ' + x.store + ' | ' + x.title + ' | ' + x.price + '/' + x.old_price); });
