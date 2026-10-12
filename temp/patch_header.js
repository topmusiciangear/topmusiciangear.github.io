var fs = require('fs');
var f = 'build-deals.js';
var s = fs.readFileSync(f, 'utf8');
function rep(a, b) {
  var n = s.split(a).length - 1;
  if (!n) { console.log('NOT FOUND: ' + a.slice(0, 70)); process.exit(1); }
  s = s.split(a).join(b);
  console.log('ok x' + n + ': ' + a.slice(0, 50));
}
// 1. center header title + subtitle
rep(
  "<h1>${t(\"Today's Music Gear Deals\", 'Ofertas de Hoy en Equipo Musical')}</h1>",
  "<h1 style=\"text-align:center;\">${t(\"Today's Music Gear Deals\", 'Ofertas de Hoy en Equipo Musical')}</h1>"
);
rep(
  '<p class="updated">${t(',
  '<p class="updated" style="text-align:center;">${t('
);
// 2. tagline rewrite (ES natural + EN parity)
rep(
  "'Hand-picked daily discounts on the gear real musicians use.', 'Descuentos diarios seleccionados en el equipo que usan los músicos de verdad.'",
  "'Hand-picked daily deals on the gear professional musicians use.', 'Ofertas diarias en el equipo que usan los músicos profesionales.'"
);
fs.writeFileSync(f, s);
console.log('done');
