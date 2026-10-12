var fs = require('fs');
var s = fs.readFileSync('guides/best-microphone.html', 'utf8');
var i = s.indexOf('class="shop-btn-primary"');
console.log(JSON.stringify(s.slice(i, i + 520)));
