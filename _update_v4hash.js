var fs = require('fs');
var hash = require('crypto').createHash('md5').update(fs.readFileSync('js/translations.v4.min.js')).digest('hex').substring(0,12);
var c = fs.readFileSync('index.html', 'utf8');
c = c.replace(/(translations\.v4\.min\.js\?v=)[a-f0-9]+/g, '$1' + hash);
fs.writeFileSync('index.html', c);
console.log('v4 hash:', hash);
