const fs = require('fs');
const F = 'C:/Users/Daniel/projects/topmusiciangear/data/guides.json';
const g = JSON.parse(fs.readFileSync(F, 'utf8'));
const gg = g.find(x => x.id === 'di-box');
let S = JSON.stringify(gg);
let n = 0; const fallos = [];
function swap(de, a) {
  if (!S.includes(de)) { fallos.push(de.slice(0, 70)); return; }
  n += S.split(de).length - 1;
  S = S.split(de).join(a);
}
swap('para alimentar un circuito de previolificación, dándote mayor', 'para alimentar un circuito de preamplificación, dándote mayor');
swap('un filtro high-pass de 80Hz en una caja de acero de 1.35 lbs (612 g).', 'un filtro high-pass de 80 Hz en una caja de acero de 612 g (1,35 lb).');
swap('Maneja entrada de 9V pico (+10dBu) sin sudar, y la respuesta de frecuencia va de 20Hz a 20kHz (manteniéndose lineal hasta 40kHz).',
  'Maneja entrada de 9 V pico (+10 dBu) sin sudar, y la respuesta de frecuencia va de 20 Hz a 20 kHz (manteniéndose lineal hasta 40 kHz).');
swap('Maneja instrumentos de hasta +20,5 dBu y señales de altavoz de hasta +41 dBu (amplificador de 1000W)',
  'Maneja instrumentos de hasta +20,5 dBu y señales de altavoz de hasta +41 dBu (amplificador de 1.000 W)');
swap('y la impedancia de salida es menor a 40 ohms, así que maneja', 'y la impedancia de salida es menor de 40 ohmios, así que maneja');
swap('La v2 agrega una frecuencia media selecciónable (500/1000Hz) y un selector de graves (40/80Hz)',
  'La v2 agrega una frecuencia media seleccionable (500/1000 Hz) y un selector de graves (40/80 Hz)');
swap('más un pad de -20dB y un boost de +10dB en la salida de 1/4\\".', 'más un pad de -20 dB y un boost de +10 dB en la salida de 1/4 pulgada.');
swap('El EQ activo de 3 bandas con ±12dB por banda es contundente — el knob Drive añade',
  'El EQ activo de 3 bandas con ±12 dB por banda es contundente: la rueda Drive añade');
swap('Funciona con alimentación phantom, batería de 9V o adaptador DC opciónal.', 'Funciona con alimentación phantom, batería de 9 V o adaptador DC opcional.');
swap('los bajos pasivos se benefician de la impedancia de entrada y el gain staging.',
  'los bajos pasivos se benefician de la impedancia de entrada y la estructura de ganancia.');
swap('A 397g es lo suficientemente ligero para vivir en un pedalboard', 'Con 397 g es lo suficientemente ligero para vivir en un pedalboard');
swap('ofrecen una respuesta plana de 20Hz–18,5kHz (±0,2dB) — lo suficientemente', 'ofrecen una respuesta plana de 20 Hz–18,5 kHz (±0,2 dB), lo suficientemente');
swap('Cada canal tiene un pad de -15dB para señales fuertes', 'Cada canal tiene un pad de -15 dB para señales fuertes');
swap('Pesa sólo 0,54kg pero se siente como si pudiera sobrevivir', 'Pesa solo 0,54 kg pero se siente como si pudiera sobrevivir');
swap('Pesa 250g, cabe en un bolsillo, y el interruptor', 'Pesa 250 g, cabe en un bolsillo, y el interruptor');
swap('La respuesta de frecuencia es 20Hz-20kHz ±1dB, que es fiel', 'La respuesta de frecuencia es 20 Hz-20 kHz ±1 dB, que es fiel');
swap('Es una carcasa tamaño pedal con transformadores Sapphire personalizados, modos DI/LI intercambiables, pad de -15dB,',
  'Es una carcasa tamaño pedal con transformadores Sapphire personalizados, modos DI/LI intercambiables, pad de -15 dB,');
swap('La respuesta plana de 20Hz-20kHz significa que no colorea', 'La respuesta plana de 20 Hz-20 kHz significa que no colorea');
swap('A 370g es lo suficientemente ligera para montar', 'Con 370 g es lo suficientemente ligera para montar');
swap('(para eliminar retroalimentación), ganancia variable', '(para eliminar acoples), ganancia variable');
swap('>comparativa J48 vs RNDI </a>', '>Radial J48 vs Rupert Neve RNDI: ¿mejor caja DI activa?</a>');
g[g.indexOf(gg)] = JSON.parse(S);
fs.writeFileSync(F, JSON.stringify(g, null, 2) + '\n', 'utf8');
console.log('\naplicados: ' + n + '  fallos: ' + fallos.length);
fallos.forEach(f => console.log('  FALLA: ' + f));
console.log('mojibake: ' + (fs.readFileSync(F, 'utf8').match(/â‚¬|Â£|Â°/g) || []).length);
