var fs = require('fs');
var t = fs.readFileSync('guides/wireless-lapel-mics.html', 'utf8');
var i = t.indexOf('REC0017234');
console.log(t.slice(Math.max(0, i - 700), i + 600).replace(/>/g, '>\n').split('\n').map(function (l) { return l.trim(); }).filter(Boolean).join('\n'));