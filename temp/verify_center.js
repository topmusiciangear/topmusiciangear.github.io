var fs = require('fs');
var s = fs.readFileSync('deals_es.html', 'utf8');
var i = s.indexOf('nete al canal de Telegram');
console.log(JSON.stringify(s.slice(Math.max(0, i - 700), i + 60)));
