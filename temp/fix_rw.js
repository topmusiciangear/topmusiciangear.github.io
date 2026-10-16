const fs = require('fs');
const F = 'C:/Users/Daniel/projects/topmusiciangear/data/guides.json';
const g = JSON.parse(fs.readFileSync(F, 'utf8'));
const gg = g.find(x => x.id === 'rode-wireless-pro-vs-dji-mic-2');
let S = JSON.stringify(gg);
let n = 0; const fallos = [];
function swap(de, a) {
  if (!S.includes(de)) { fallos.push(de.slice(0, 70)); return; }
  n += S.split(de).length - 1;
  S = S.split(de).join(a);
}
swap('pero en el trabajo no lo son', 'pero en el trabajo no lo son.');
swap('transmisión de doble banda 2.4/5GHz hasta 400m, cancelación', 'transmisión de doble banda 2,4/5 GHz hasta 400 m, cancelación');
swap('los conectores 3,5mm con bloqueo evitan que un tirón mate', 'los conectores de 3,5 mm con bloqueo evitan que un tirón mate');
swap('Rode anuncia un alcance de 260m y los transmisores duran', 'Rode anuncia un alcance de 260 m y los transmisores duran');
swap('y el receptor suma una pantalla táctil y una perilla física, así que', 'y el receptor suma una pantalla táctil y una rueda física, así que');
swap('la transmisión de doble banda 2.4/5GHz sostiene el enlace hasta 400m, y la cancelación',
  'la transmisión de doble banda 2,4/5 GHz sostiene el enlace hasta 400 m, y la cancelación');
swap('y los ajustes profundos viven en la app DJI Mimo en lugar de del todo en el dispositivo.',
  'y los ajustes profundos viven en la app DJI Mimo en lugar de estar del todo en el dispositivo.');
swap('La transmisión de doble banda 2.4/5GHz sostiene el enlace hasta 400m, hasta cuatro transmisores',
  'La transmisión de doble banda 2,4/5 GHz sostiene el enlace hasta 400 m, hasta cuatro transmisores');
swap('>guía de mejores micrófonos de solapa inalámbricos</a>', '>Mejores micrófonos de solapa inalámbricos</a>');
swap('>de mejores micrófonos para creadores</a>', '>Mejores micrófonos económicos para creadores: $35 a $299</a>');
swap('>de mejores micrófonos</a>', '>Mejor micrófono para voces y grabación casera: guía completa</a>');
g[g.indexOf(gg)] = JSON.parse(S);
fs.writeFileSync(F, JSON.stringify(g, null, 2) + '\n', 'utf8');
console.log('\naplicados: ' + n + '  fallos: ' + fallos.length);
fallos.forEach(f => console.log('  FALLA: ' + f));
console.log('mojibake: ' + (fs.readFileSync(F, 'utf8').match(/â‚¬|Â£|Â°/g) || []).length);
