const fs = require('fs');
const G_PATH = 'C:/Users/Daniel/projects/topmusiciangear/data/guides.json';
let raw = fs.readFileSync(G_PATH, 'utf8');

const FIXES = [
  ['Probamos los mejores interfaz de audio', 'Probamos los mejores interfaces de audio'],
  ['Probamos los mejores P-Bass vs J-Bass', 'Probamos el duelo entre el P-Bass y el J-Bass'],
  ['Probamos los mejores Moog Muse vs Prophet-10', 'Probamos el duelo entre el Moog Muse y el Prophet-10'],
  ['Probamos los mejores R\u00d8DECaster Pro II vs DLZ Creator', 'Probamos el duelo entre el R\u00d8DECaster Pro II y el DLZ Creator'],
  ['Probamos los mejores Shure BLX288 vs Sennheiser EW-D', 'Probamos el duelo entre el Shure BLX288 y el Sennheiser EW-D'],
  ['Probamos los mejores Emulaci\u00f3n anal\u00f3gica en el DAW', 'Probamos los mejores plugins de channel strip con emulaci\u00f3n anal\u00f3gica']
];
FIXES.forEach(function (f) {
  const before = raw;
  raw = raw.split(f[0]).join(f[1]);
  if (raw !== before) console.log('OK:', f[1]);
  else console.log('SIN MATCH:', f[0]);
});
fs.writeFileSync(G_PATH, raw, 'utf8');
