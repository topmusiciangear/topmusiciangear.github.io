const fs = require('fs');
const F = 'C:/Users/Daniel/projects/topmusiciangear/data/guides.json';
const g = JSON.parse(fs.readFileSync(F, 'utf8'));
const gg = g.find(x => x.id === 'usb-mics');
let S = JSON.stringify(gg);
let n = 0; const fallos = [];
function swap(de, a) {
  if (!S.includes(de)) { fallos.push(de.slice(0, 70)); return; }
  n += S.split(de).length - 1;
  S = S.split(de).join(a);
}
// INTRO
swap('desde un todoterreno económico de 70 $ hasta condensadores de nivel de estudio',
  'desde un todoterreno económico de $70 hasta condensadores de calidad de estudio');
swap('si quieres los controles físicos más completos sobre el escritorio, el sE Electronics NEOM USB',
  'si quieres los controles físicos más completos al alcance de la mano, el sE Electronics NEOM USB');
swap('Para opciones económicas por menos de 100 $, consulta nuestra guía de Micrófonos USB Económicos',
  'Para opciones económicas por menos de $100, consulta nuestra guía de micrófonos USB económicos');
// SEC0
swap('una pantalla táctil para checar niveles al instante', 'una pantalla táctil para consultar niveles al instante');
swap('un modo de nivel automático que ajusta la ganancia solo mientras hablas', 'un modo de nivel automático que ajusta la ganancia mientras hablas');
swap('Su conectividad USB-C significa que lo conectas directo a tu PC sin necesidad de interfaz',
  'Su conectividad USB-C significa que lo conectas directamente a tu PC sin necesidad de interfaz');
swap('Viene con filtro antipop y soporte antigolpes incluidos', 'Viene con filtro antipop y soporte antigolpes');
swap('sin los líos de ganancia y con la mitad de cables', 'sin los líos de ganancia y con menos cables');
// SEC1
swap('Su cápsula de condensador premium captura más aire', 'Su cápsula de condensador de gama alta captura más aire');
swap('el mute capacitivo es silencioso', 'el botón de silencio capacitivo es silencioso');
swap('y el dial multifunción controla ganancia', 'y la rueda multifunción controla la ganancia');
swap('El verdadero superpoder es Wave Link: software', 'Su gran baza es Wave Link: software');
// SEC2
swap('El AT2040USB trae el sonido de broadcast a un micrófono USB', 'El AT2040USB lleva el sonido de broadcast a un micrófono USB');
swap('que rechaza el ruido de la sala y la retroalimentación como una herramienta de estudio',
  'que rechaza el ruido de la sala y la retroalimentación como es propio de una herramienta de estudio');
swap('Es un dinámico conectar y usar: sin interfaz', 'Es un dinámico plug and play: sin interfaz');
swap('y es el dinámico USB más indulgente de esta guía para habitaciones sin tratamiento',
  'y es el dinámico USB más permisivo de esta guía para habitaciones sin tratamiento');
swap('si quieres un micrófono dinámico que elimine el ruido de fondo sin equipo de audio adicional',
  'si quieres un micrófono dinámico que reduzca el ruido de fondo sin equipo de audio adicional');
// SEC3
swap('El Profile Streaming Set es el paquete USB conectar y usar más completo de esta guía',
  'El Profile Streaming Set es el kit USB plug and play más completo de esta guía');
swap('ganancia, mezcla y volumen de auriculares son perillas físicas en el cuerpo',
  'ganancia, mezcla y volumen de auriculares son ruedas físicas en el cuerpo');
swap('el silencio es un botón suave con anillo LED', 'el mute es un botón suave con anillo LED');
swap('El brazo articulado autoblocante de 3 puntos canaliza el cable USB-C por su interior',
  'El brazo articulado autoblocante de 3 puntos guía el cable USB-C por su interior');
swap('y un cable de 3 metros te da margen para colocarlo exactamente donde tu voz suena mejor',
  'y un cable de 3 metros te da juego para colocarlo exactamente donde tu voz suena mejor');
swap('y la carcasa totalmente metálica se siente hecha para durar', 'y la carcasa totalmente metálica parece hecha para durar');
swap('Lo que sacrifica frente al Wave:3: no hay software', 'Donde pierde frente al Wave:3: no hay software');
swap('Si quieres el escritorio más limpio y los controles más directos', 'Si quieres el montaje más limpio y los controles más directos');
// SEC4
swap('para cantar, ASMR o locución profesional — el NT1 5th Generation es la mejor opción',
  'para cantar, ASMR o locución profesional, el NT1 5th Generation es la mejor opción');
swap('Su salida Dual Connect significa que puedes usarlo por USB-C hoy mismo sin equipo extra',
  'Su salida Dual Connect permite usarlo por USB-C hoy mismo sin equipo extra');
swap('La contra: como condensador lo oye todo — reflexiones de la habitación, la nevera, el aire acondiciónado',
  'La pega: como condensador lo oye todo: reflexiones de la habitación, la nevera, el aire acondicionado');
// SEC5
swap('Mueve el preamplificador y el DSP dentro del micro: un preamplificador Revolution',
  'Mete el preamplificador y el DSP dentro del micro: un preamplificador Revolution');
swap('corre en el hardware, así que tu voz suena lista para broadcast sin plugins de software',
  'funciona en el hardware, así que tu voz suena lista para broadcast sin plugins');
swap('Conversión 24-bit/48kHz, salida de auriculares sin latencia', 'Conversión de 24 bits/48 kHz, salida de auriculares sin latencia');
swap('Reemplaza al Yeti y Yeti X en nuestra tabla porque resuelve el mismo problema "un cable, gran sonido" con internals más limpios y sin líos de drivers',
  'Sustituye al Yeti y al Yeti X en nuestra tabla porque resuelve lo mismo ("un cable, gran sonido") con una electrónica interna más limpia y sin líos de drivers');
// SEC6
swap('El sE Electronics NEOM USB resuelve la única cosa que la mayoría de micros USB fallan: control de mezclador en hardware sin interfaz aparte',
  'El sE Electronics NEOM USB resuelve lo único en lo que fallan la mayoría de micros USB: control de mezcla en hardware sin interfaz aparte');
swap('Tres perillas analógicas independientes en el cuerpo del micro', 'Tres ruedas analógicas independientes en el cuerpo del micro');
swap('te dejan balancear tu voz contra el audio del PC al instante, con latencia cero y sin mezclador de software que vigilar',
  'te permiten equilibrar tu voz contra el audio del PC al instante, con latencia cero y sin mezclador de software del que preocuparte');
swap('La cápsula condensadora cardioide de 16mm entrega conversión 24-bit/192kHz con el cálido y sedoso agudo característico de sE que favorece la voz sin ecualizar después',
  'La cápsula condensadora cardioide de 16 mm ofrece conversión de 24 bits/192 kHz con el agudo cálido y sedoso característico de sE, que sienta bien a la voz sin ecualizar después');
swap('Mute LED integrado, soporte metálico de escritorio, conectividad USB-C', 'LED de silencio integrado, soporte metálico de escritorio, conectividad USB-C');
swap('El trato honesto: nada de RGB, ni efectos DSP, ni cambio de patrón polar — solo señal pura y el control de mezclador en hardware que todo streamer necesita de verdad',
  'Siendo honestos: nada de RGB, ni efectos DSP, ni cambio de patrón polar; solo señal pura y el control de mezcla en hardware que todo streamer necesita de verdad');
// SEC7
swap('es ese micrófono dinámico broadcast raro que graba directo al ordenador y aun así conserva su salida XLR',
  'es ese micrófono dinámico broadcast poco común que graba directo al ordenador y aun así conserva su salida XLR');
swap('Rode carga la vía digital con su preamp Revolution de alta ganancia', 'Rode equipa la vía digital con su previo Revolution de alta ganancia');
swap('así que la señal USB sale lista para broadcast a 24-bit/48kHz', 'así que la señal USB sale lista para broadcast a 24 bits/48 kHz');
// SEC8 + heading
swap('Audio-Technica AT2020USB-X: una perilla de mezcla de verdad en un condensador',
  'Audio-Technica AT2020USB-X: una rueda de mezcla de verdad en un condensador');
swap('El AT2020USB-X es el condensador de estudio AT2020 reconstruido para creadores, y su rasgo estrella es el control de mezcla',
  'El AT2020USB-X es el condensador de estudio AT2020 rediseñado para creadores, y su punto fuerte es el control de mezcla');
swap('En vez de una salida de auriculares que solo silencia, Audio-Technica le dio una perilla de nivel de auriculares y otra perilla de mezcla',
  'En vez de una salida de auriculares con simple botón de silencio, Audio-Technica le dio una rueda de nivel de auriculares y otra rueda de mezcla');
swap('La conversión va de 16 a 24 bits hasta 96 kHz, el mute es un botón táctil silencioso',
  'La conversión es de 16 a 24 bits y hasta 96 kHz, el silencio es un botón táctil');
// SEC9 + heading
swap('Samson Q2U: la respuesta de 70 $ a', 'Samson Q2U: la respuesta de $70 a');
swap('con salida USB-C para el primer día y salida XLR de 3 pines para el día en que te quedes corto',
  'con salida USB-C para el primer día y salida XLR de 3 pines para cuando se te quede corto');
swap('tanto si estás con un portátil sin entradas como si alimentas un preamp de verdad',
  'tanto si estás con un portátil sin entradas como si alimentas un previo de verdad');
swap('Samson además incluye un interruptor hardware que silencia a la vez las rutas USB y XLR',
  'Samson además incluye un interruptor físico que silencia a la vez los canales USB y XLR');
swap('Para contenido centrado en voz y en una habitación que no controlas, es un intercambio que casi todo el mundo acepta',
  'Para contenido centrado en voz y en una habitación que no controlas, es un trato que casi todo el mundo acepta');
g[g.indexOf(gg)] = JSON.parse(S);
fs.writeFileSync(F, JSON.stringify(g, null, 2) + '\n', 'utf8');
console.log('\naplicados: ' + n + '  fallos: ' + fallos.length);
fallos.forEach(f => console.log('  FALLA: ' + f));
console.log('mojibake: ' + (fs.readFileSync(F, 'utf8').match(/â‚¬|Â£|Â°/g) || []).length);
