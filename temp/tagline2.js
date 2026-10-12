var fs = require('fs');
var f = 'build-deals.js';
var s = fs.readFileSync(f, 'utf8');
var a = "'Hand-picked daily deals on the gear professional musicians use.', 'Ofertas diarias en el equipo que usan los músicos profesionales.'";
if (s.indexOf(a) < 0) { console.log('NOT FOUND'); process.exit(1); }
s = s.split(a).join("'Hand-picked daily deals on the gear musicians around the world use.', 'Ofertas diarias en el equipo que usan los músicos de todo el mundo.'");
fs.writeFileSync(f, s);
console.log('tagline OK');
