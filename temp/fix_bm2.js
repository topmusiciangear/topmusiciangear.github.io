const fs = require('fs');
const F = 'C:/Users/Daniel/projects/topmusiciangear/data/guides.json';
const g = JSON.parse(fs.readFileSync(F, 'utf8'));
const gg = g.find(x => x.id === 'best-microphone');
let S = JSON.stringify(gg);
let n = 0; const fallos = [];
function swap(de, a) {
  if (!S.includes(de)) { fallos.push(de.slice(0, 70)); return; }
  n += S.split(de).length - 1;
  S = S.split(de).join(a);
}
swap('con captación en figura-8, cubriendo 20 Hz a 16 kHz con 1,8 mV/Pa',
  'con captación en figura-8, que cubre de 20 Hz a 16 kHz con 1,8 mV/Pa');
swap('pinza en la caja.</p><p><strong>Conviene saber los límites.</strong> Como cinta pasiva',
  'pinza en la caja. Conoce sus límites: como cinta pasiva');
swap('<strong>¿SM7B o SM7dB?</strong> Mismo sonido, distinta matemática:',
  '<strong>¿SM7B o SM7dB?</strong> Mismo sonido, distintas cuentas:');
swap('<strong>Conviene saber los límites.</strong> Los agudos realzados que recortan voces pueden morder en algunas, no hay pad ni corte para fuentes fuertes y la pinza básica anticipa un soporte aparte',
  '<strong>Conoce sus límites:</strong> los agudos realzados que hacen destacar voces pueden resultar agresivos en algunas, no hay pad ni atenuador para fuentes fuertes, y la pinza básica avisa de que necesitarás un soporte aparte');
swap('<strong>Conviene saber los límites.</strong> Solo cardioide, 48V obligatorios sin vía USB y carácter fijo donde un multipatrón variaría',
  '<strong>Conoce sus límites:</strong> solo cardioide, phantom obligatorio y sin vía USB, y un carácter fijo donde un multipatrón te daría opciones');
swap('Montaje directo a pie incluido; phantom 48V obligatorio.</p><p><strong>Conviene saber los límites.</strong> Solo cardioide y el soporte SwiftShield cuesta aparte',
  'Montaje directo a pie incluido, con phantom 48V obligatorio. Conoce sus límites: solo cardioide, y el soporte SwiftShield se vende aparte');
swap('<strong>Conviene saber los límites.</strong> Sin pad ni corte a bordo, sus 11 mV/Pa piden un buen previo y el montaje SG2 básico deja el soporte solo para el Studio Set más caro',
  '<strong>Conoce sus límites:</strong> sin pad ni corte a bordo, sus 11 mV/Pa piden un buen previo, y el montaje SG2 básico obliga a comprar el soporte del Studio Set más caro');
const idx = g.indexOf(gg);
g[idx] = JSON.parse(S);
fs.writeFileSync(F, JSON.stringify(g, null, 2) + '\n', 'utf8');
console.log('aplicados: ' + n + '  fallos: ' + fallos.length);
fallos.forEach(f => console.log('  FALLA: ' + f));
const t = JSON.stringify(g.find(x => x.id === 'best-microphone'));
console.log('restos "Conviene saber": ' + (t.match(/Conviene saber/g) || []).length);
console.log('mojibake: ' + (fs.readFileSync(F, 'utf8').match(/â‚¬|Â£|Â°/g) || []).length);
