var fs = require('fs');
var f = 'build-deals.js';
var s = fs.readFileSync(f, 'utf8');
var a = '<div class="deals-card" style="text-align:center;margin-top:36px;">';
if (s.indexOf(a) < 0) { console.log('NOT FOUND'); process.exit(1); }
s = s.split(a).join('<div class="deals-card" style="text-align:center;margin-top:64px;">');
fs.writeFileSync(f, s);
console.log('more air OK');
