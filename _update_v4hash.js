var fs = require('fs');
var hash = require('crypto').createHash('md5').update(fs.readFileSync('js/translations.v4.min.js')).digest('hex').substring(0, 12);
['index.html', 'es/index.html'].forEach(function (file) {
  var c = fs.readFileSync(file, 'utf8');
  c = c.replace(/(translations\.v4\.min\.js\?v=)[a-f0-9]+/g, '$1' + hash);
  fs.writeFileSync(file, c);
});
console.log('v4 hash:', hash);
