var fs = require('fs');
var es = fs.readFileSync('deals_es.html', 'utf8');
console.log('h1 centered: ' + (es.indexOf('<h1 style="text-align:center;"') >= 0));
console.log('sub centered: ' + (es.indexOf('class="updated" style="text-align:center;"') >= 0));
console.log('tagline ES: ' + (es.indexOf('Ofertas diarias en el equipo que usan los m') >= 0));
console.log('Motion: ' + (es.indexOf('Motion: Harmonic') >= 0) + ' RC-20: ' + (es.indexOf('RC-20 Retro Color') >= 0));
console.log('BH EUR: ' + (es.indexOf('53,5') >= 0 || es.indexOf('53.5') >= 0));
