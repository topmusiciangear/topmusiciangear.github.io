const fs = require('fs');
const F = 'C:/Users/Daniel/projects/topmusiciangear/data/guides.json';
const g = JSON.parse(fs.readFileSync(F, 'utf8'));
const gg = g.find(x => x.id === 'scarlett-vs-ssl');
let S = JSON.stringify(gg);
let n = 0; const fallos = [];
function swap(de, a) {
  if (!S.includes(de)) { fallos.push(de.slice(0, 70)); return; }
  n += S.split(de).length - 1;
  S = S.split(de).join(a);
}
swap('son las dos interfaces de audio más populares para home studio, y por diferentes razones',
  'son las dos interfaces de audio más populares para home studio, cada una por razones distintas');
swap('La Scarlett 2i2 4ª Gen tiene previos excelentes — limpios, transparentes, con 120dB de rango dinámico. Son una mejora significativa respecto a generaciones anteriores',
  'La Scarlett 2i2 4ª Gen tiene previos excelentes: limpios, transparentes, con 120 dB de rango dinámico. Es una mejora significativa respecto a generaciones anteriores');
swap('Este circuito analógico de EQ añade presencia y punch que hace que las voces se asienten en la mezcla de inmediato',
  'Este circuito analógico de EQ añade presencia y pegada que hace que las voces se asienten en la mezcla de inmediato');
swap('Si quieres limpio, compra la Scarlett. Si quieres carácter, compra la SSL',
  'Si buscas un sonido limpio, compra la Scarlett. Si buscas carácter, compra la SSL');
swap('No tiene MIDI I/O, para sintetizadores de hardware necesitarías un adaptador USB-MIDI aparte',
  'No tiene MIDI: para sintetizadores de hardware necesitarás un adaptador USB-MIDI aparte');
swap('Con alimentación por USB-C no necesitas cable de corriente', 'Con alimentación por USB-C no necesitas fuente de alimentación');
swap('MIDI I/O, salidas de auriculares duales con mezclas independientes, y USB-C',
  'entradas y salidas MIDI, salidas de auriculares dobles con mezclas independientes, y USB-C');
swap('Para un home studio con muchas necesidades de monitoreo y sintetizadores de hardware, la SSL gana en conectividad',
  'Para un home studio con muchas exigencias de monitorización y sintetizadores de hardware, la SSL gana en conectividad');
swap('Se enruta a las salidas de auriculares para que puedas comunicarte', 'Va directa a las salidas de auriculares para que puedas comunicarte');
swap('Si grabas otros músicos o talento de voz, el micrófono de talkback es una gran ventaja profesional y hace que la SSL justifique el dinero extra',
  'Si grabas a otros músicos o voces para locución, el micrófono de talkback es una gran ventaja profesional y con él la SSL justifica el dinero extra');
swap('Es limpia, confiable, y hace todo lo que necesita un productor de nivel principiante o intermedio',
  'Es limpia, fiable y cubre todo lo que necesita un productor de nivel principiante o intermedio');
swap('mezclas de auriculares duales, y un micrófono de talkback', 'mezclas de auriculares dobles, y un micrófono de talkback');
swap('la SSL 2+ justifica cada dólar de más', 'la SSL 2+ justifica cada dólar extra');
swap('El color analógico vive tras un solo interruptor', 'El color analógico está tras un solo interruptor');
swap('que suma presencia y pegada con espíritu de consola grande', 'que suma presencia y pegada con ADN de consola grande');
swap('Los conversores renovados de 32 bits y 192 kHz sostienen la captura al detalle, mientras las herramientas de monitoreo profesional ordenan balances y mezclas de cue en voces e instrumentos',
  'Los conversores renovados de 24 bits y 192 kHz mantienen el detalle de la captura, mientras las herramientas de monitorización profesional gestionan balances y mezclas de cue en voces e instrumentos');
swap('El sabor encaja con cantantes, raperos y guitarras que quieren pistas al frente con poco proceso',
  'El carácter encaja con cantantes, raperos y guitarras que quieren pistas al frente con poco proceso');
swap('Quien persiga ganancia estrictamente limpia quizá note la firma marcada cuando el circuito sigue activo',
  'Quien persiga una ganancia estrictamente limpia quizá note demasiado la coloración cuando el circuito sigue activo');
swap('El número de entradas mira al trabajo solo o a dúo, así que grabar formaciones enteras pide un sistema mayor',
  'El número de entradas está pensado para trabajar solo o a dúo: grabar formaciones enteras requiere un sistema mayor');
swap('pero sirven a diferentes usuarios', 'pero están pensadas para usuarios distintos');
swap('mejor flexibilidad de monitoreo, y prestaciones de nivel estudio', 'mejor flexibilidad de monitorización y prestaciones de nivel estudio');
swap('>Mejor Interfaz de Audio para Grabación Casera</a>', '>Mejor interfaz de audio: guía completa para grabación casera</a>');
swap('>Mejor Interfaz de Audio</a>', '>Mejores interfaces de audio por menos de $300</a>');
swap('>Audient iD14 vs MOTU M2</a>', '>Audient iD14 vs MOTU M2: duelo de interfaces USB-C</a>');
g[g.indexOf(gg)] = JSON.parse(S);
fs.writeFileSync(F, JSON.stringify(g, null, 2) + '\n', 'utf8');
console.log('aplicados: ' + n + '  fallos: ' + fallos.length);
fallos.forEach(f => console.log('  FALLA: ' + f));
console.log('restos "32 bits" en la guia: ' + (JSON.stringify(g.find(x => x.id === 'scarlett-vs-ssl')).match(/32 bits/g) || []).length);
console.log('mojibake: ' + (fs.readFileSync(F, 'utf8').match(/â‚¬|Â£|Â°/g) || []).length);
