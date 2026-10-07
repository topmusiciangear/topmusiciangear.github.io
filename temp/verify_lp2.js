const fs = require('fs');
const base = 'C:/Users/Daniel/projects/topmusiciangear/guides/';
const chk = (f, s) => {
  const t = fs.readFileSync(base + f, 'utf8');
  console.log(f + ' [' + s.slice(0, 44) + '] = ' + (t.includes(s) ? 'OK' : 'MISSING'));
};
chk('best-looper-pedals.html', '24 Minutes, 20 Loops, One Box');
chk('best-looper-pedals.html', 'Six Tracks, Nine Switches, Zero Compromise');
chk('best-looper-pedals_es.html', 'Seis pistas, nueve switches, cero concesiones');
chk('best-looper-pedals.html', 'item--BOSRC600');
chk('best-looper-pedals.html', '$659.99');
chk('best-looper-pedals.html', '5XK9');
const t = fs.readFileSync(base + 'best-looper-pedals.html', 'utf8');
console.log('Infinity left in HTML: ' + (t.includes('Infinity') ? 'YES!' : 'no'));
