var fs = require('fs');
var d = JSON.parse(fs.readFileSync('data/products.json', 'utf8'));
var brands = ['Boss TU-3', 'TC Electronic Polytune Clip', 'Snark ST-8', 'DAddario NS Micro', 'Peterson StroboClip HD'];
brands.forEach(function(s) {
    var ms = Object.keys(d).filter(function(k) {
        return d[k].title && d[k].title.toLowerCase().includes(s.toLowerCase());
    });
    if (ms.length > 0) {
        ms.forEach(function(k) {
            console.log(s + ' -> ' + d[k].title + ' brand:' + d[k].brand + ' stores:' + Object.keys(d[k].stores || {}).join(','));
        });
    } else {
        console.log(s + ' -> NOT FOUND IN CATALOG');
    }
});