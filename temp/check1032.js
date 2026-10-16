const fs = require('fs');
const B = 'C:/Users/Daniel/projects/topmusiciangear/';
const h = fs.readFileSync(B + 'guides/repitch-vs-melodyne.html', 'utf8');
// todos los botones primarios con su href y precio
const re = /<a data-store="([a-z]+)" href="([^"]+)" data-pb-eu-p="([^"]*)" data-pb-us-p="([^"]*)" data-pb-uk-p="([^"]*)"/g;
let m;
while ((m = re.exec(h))) console.log(m[1] + ' | ' + m[2].slice(0, 80) + ' | EU=' + m[3] + ' US=' + m[4] + ' UK=' + m[5]);
console.log('--- botones shop-btn sin data-pb (otras tiendas):');
const re2 = /<a data-store="([a-z]+)" href="([^"]+)"(?! data-pb)/g;
let m2, n = 0;
while ((m2 = re2.exec(h)) && n < 10) { n++; console.log(m2[1] + ' | ' + m2[2].slice(0, 90)); }
