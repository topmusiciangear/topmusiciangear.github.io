var fs=require('fs');
var h=fs.readFileSync('guides/sidechain-modulation-plugins_es.html','utf8');
console.log('HTML hero-inner:');
console.log(h.substring(9728,9728+2000));
