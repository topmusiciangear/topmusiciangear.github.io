var fs = require('fs');
var f = 'build-deals.js';
var s = fs.readFileSync(f, 'utf8');
var a = "'Ofertas de Hoy en Equipo Musical'";
if (s.indexOf(a) < 0) { console.log('NOT FOUND'); process.exit(1); }
s = s.split(a).join("'Ofertas de hoy en equipo musical'");
fs.writeFileSync(f, s);
console.log('fixed');
