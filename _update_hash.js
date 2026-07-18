var fs = require('fs');
var hash = require('crypto').createHash('md5').update(fs.readFileSync('js/app.min.js')).digest('hex').substring(0,8);
var c = fs.readFileSync('index.html', 'utf8');
c = c.replace(/(app\.min\.js\?v=)[a-f0-9]+/g, '$1' + hash);
fs.writeFileSync('index.html', c);
console.log('app hash:', hash);
