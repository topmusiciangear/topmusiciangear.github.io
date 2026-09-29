var fs = require('fs');
var en = fs.readFileSync('guides/best-interface.html', 'utf8');
var es = fs.readFileSync('guides/best-interface_es.html', 'utf8');
var i = en.indexOf('Things to Keep in Mind');
console.log('EN ids:', en.indexOf('Things to Keep in Mind'), en.indexOf('💵'), en.indexOf('💲'), en.indexOf('As an Amazon Associate'));
console.log(JSON.stringify(en.slice(i, i + 300)));
var j = es.indexOf('Aspectos');
console.log('ES ids:', j, es.indexOf('💵'), es.indexOf('💲'), es.indexOf('Como Asociado de Amazon'));
console.log(JSON.stringify(es.slice(j, j + 300)));