var fs = require('fs');
var crypto = require('crypto');
var css = fs.readFileSync('css/style.min.css');
var h = crypto.createHash('md5').update(css).digest('hex').substring(0, 8);
var idx = fs.readFileSync('index.html', 'utf8');
idx = idx.replace(/style\.min\.css\?v=[a-f0-9]+/g, 'style.min.css?v=' + h);
fs.writeFileSync('index.html', idx);
console.log('css hash -> ' + h);
