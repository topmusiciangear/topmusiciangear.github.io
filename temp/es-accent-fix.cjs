const fs = require('fs');

const FILES = ['data/guides.json', 'data/products.json'];

const R = [
  // garble block in guides.json[10] and products.json[370]
  ['imagen estereo de alta precision y localizacion filosa', 'imagen estéreo de alta precisión y localización filosa'],
  ['Resolucion de detalles excepcional', 'Resolución de detalles excepcional'],
  ['Resolución de detalles excepcional, imagen estéreo de alta precisión y localización filosa. La impedancia de 120 ohmios es mas facil de mover que el HD 600. Ganador del TEC Award 2023. A 599, esto es una inversion en escuchar', 'Resolución de detalles excepcional, imagen estéreo de alta precisión y localización filosa. La impedancia de 120 ohmios es más fácil de mover que el HD 600. Ganador del TEC Award 2023. A $599, esto es una inversión en escuchar'],
  // solucion heading
  ['la solucion precisa para salas sin tratamiento', 'la solución precisa para salas sin tratamiento'],
  // guide 54
  ['Tu decision depende de tu presupuesto y cuánto control necesitas sobre tu configuracion inalambrica', 'Tu decisión depende de tu presupuesto y cuánto control necesitas sobre tu configuración inalámbrica'],
  ['el EW-D es precision digital con control por app', 'el EW-D es precisión digital con control por app'],
  ['precision digital con control por app', 'precisión digital con control por app'],
  // estereo in productTables
  ['(6 mono + 2 estereo)', '(6 mono + 2 estéreo)'],
  ['(8 mono + 4 estereo)', '(8 mono + 4 estéreo)'],
  ['(4 mono + 3 estereo)', '(4 mono + 3 estéreo)'],
  ['18 entradas (4 mono + 4 estereo + ext.)', '18 entradas (4 mono + 4 estéreo + ext.)'],
  ['MusiQ 3 bandas (mono), 2 bandas (estereo)', 'MusiQ 3 bandas (mono), 2 bandas (estéreo)'],
  ['2 envios cue estereo', '2 envíos cue estéreo'],
  // grabacion in products
  ['grabacion 24-bit/96kHz en solo 2.3 kg', 'grabación 24-bit/96kHz en solo 2.3 kg'],
  ['grabacion multitrack dual SD y red AES50', 'grabación multitrack dual SD y red AES50'],
  ['grabacion multitrack dual SD, interfaz USB 32x32 y 17 faders', 'grabación multitrack dual SD, interfaz USB 32x32 y 17 faders'],
  ['y grabacion directa de 32 canales por USB sin ordenador', 'y grabación directa de 32 canales por USB sin ordenador'],
  ['grabacion de 96 pistas, tarjeta Dante opcional', 'grabación de 96 pistas, tarjeta Dante opcional'],
];

const counts = {}; R.forEach(([o]) => counts[o] = 0);

function fixStrings(obj) {
  if (!obj || typeof obj !== 'object') return;
  if (Array.isArray(obj)) { obj.forEach(fixStrings); return; }
  for (const k of Object.keys(obj)) {
    const v = obj[k];
    if (typeof v === 'string') {
      let s = v;
      for (const [old, neu] of R) {
        if (s.includes(old)) {
          counts[old] += s.split(old).length - 1;
          s = s.split(old).join(neu);
        }
      }
      if (s !== v) obj[k] = s;
    } else if (v && typeof v === 'object') fixStrings(v);
  }
}

for (const f of FILES) {
  const data = JSON.parse(fs.readFileSync(f, 'utf8'));
  fixStrings(data);
  fs.writeFileSync(f, JSON.stringify(data, null, 2) + '\n');
}

console.log('=== ACCENT FIXES ===');
R.forEach(([o, n]) => { if (counts[o] > 0) console.log(counts[o] + 'x  ' + o + '  ->  ' + n); });