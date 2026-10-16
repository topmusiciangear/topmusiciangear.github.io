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
// VEREDICTOS
swap('Salida de auriculares con monitoreo sin latencia', 'Salida de auriculares con monitorización sin latencia');
swap('A $299 sigue siendo un micrófono USB premium cuando el Wave:3 cuesta $150', 'A $299 sigue siendo un USB de gama alta cuando el Wave:3 cuesta $150');
swap('Sin 32 bits flotantes en la vía USB — una toma fuerte se recorta, mientras que el float de la NT1 la recupera',
  'Sin coma flotante de 32 bits en la vía USB: una toma fuerte se recorta, mientras que la coma flotante de la NT1 la recupera');
swap('Mute capacitivo, dial multifunción y filtro antipop multicapa integrado', 'Botón de silencio capacitivo, rueda multifunción y filtro antipop multicapa integrado');
swap('Solo USB — sin ruta XLR para crecer hacia un setup con interfaz', 'Solo USB, sin ruta XLR para crecer hacia un equipo con interfaz');
swap('El condensador capta la sala — funcióna mejor en espacios tratados o silenciosos', 'El condensador capta la sala: funciona mejor en espacios tratados o silenciosos');
swap('Su superpoder de mezcla depende del software Wave Link', 'Su gran baza para mezclar depende del software Wave Link');
swap('A $150 queda muy por debajo de la MV7+, pero renuncias al XLR, al DSP integrado y a la monitorización sin latencia',
  'Cuesta bastante menos que la MV7+, pero renuncias al XLR, al DSP integrado y a la monitorización sin latencia');
swap('Salida de auriculares integrada con monitoreo sin latencia', 'Salida de auriculares integrada con monitorización sin latencia');
swap('Perillas físicas de ganancia, mezcla y volumen de auriculares — sin software', 'Ruedas físicas de ganancia, mezcla y volumen de auriculares, sin software');
swap('Brazo articulado autoblocante de 3 puntos con gestión de cable integrada', 'Brazo articulado autoblocante de 3 puntos con cable integrado');
swap('Carcasa totalmente metálica con botón de mute suave y anillo LED de estado', 'Carcasa totalmente metálica con botón de silencio suave y anillo LED de estado');
swap('125 dB de SPL máximo — menos que los condensadores XLR de esta guía', '125 dB de SPL máximo, por debajo de los condensadores XLR de esta guía');
swap('La grabación a 32 bits en coma flotante permite rescatar tomas quemadas — ajustas la ganancia después de grabar, no antes',
  'La grabación a 32 bits en coma flotante permite rescatar tomas saturadas: ajustas la ganancia después de grabar, no antes');
swap('El soporte antigolpes y filtro antipop incluidos te ahorran en accesorios', 'El soporte antigolpes y el filtro antipop incluidos te ahorran dinero en accesorios');
swap('El condensador lo oye todo — reflexiones de la sala, la nevera, el aire acondiciónado', 'El condensador lo oye todo: reflexiones de la sala, la nevera, el aire acondicionado');
swap('El 32 bits flotantes solo se aprovecha en software compatible — algunos DAWs siguen a 24 bits máximo',
  'La coma flotante de 32 bits solo se aprovecha en software compatible: algunos DAWs siguen en 24 bits como máximo');
swap('Como condensador necesita phantom de 48V en la vía XLR — un puerto USB-C solo no lo alimenta',
  'Como condensador necesita phantom de 48 V en la vía XLR: un puerto USB-C solo no lo alimenta');
swap('Preamplificador interno APHEX Revolution con Aural Exciter, Big Bottom y Compellor — sonido broadcast sin software',
  'Previo interno APHEX Revolution con Aural Exciter, Big Bottom y Compellor: sonido broadcast sin software');
swap('Conversión 24-bit/48kHz con monitorización de auriculares sin latencia y filtro antipop integrado',
  'Conversión de 24 bits/48 kHz con monitorización de auriculares sin latencia y filtro antipop integrado');
swap('La misma promesa de "un cable, gran sonido" que un condensador USB de escritorio clásico, pero con interiores más limpios y un preamp APHEX interno en lugar de una etapa XLR desmontable',
  'La misma promesa de «un cable, gran sonido» que un condensador USB de escritorio clásico, pero con una electrónica más limpia y un previo APHEX interno en lugar de una etapa XLR desmontable');
swap('Compatible con RODE Connect para enrutamiento avanzado y configuraciones multi-micrófono',
  'Compatible con RODE Connect para encaminamiento avanzado y configuraciones para varios micrófonos');
swap('Monitorización sin latencia con perillas dedicadas de volumen de auriculares y mezcla',
  'Monitorización sin latencia con ruedas dedicadas de volumen de auriculares y mezcla');
swap('Solo cardioide, así que no hay modo omnidireccional para una fuente que suene mucho en la sala; todos los micrófonos de esta guía comparten ese límite',
  'Solo cardioide, sin modo omnidireccional para fuentes con mucho sonido de sala; todos los micros de esta guía comparten ese límite');
swap('Sin salida XLR — no se puede migrar a una interfaz profesional luego como el Samson Q2U o MV7+',
  'Sin salida XLR: no se puede dar el salto a una interfaz profesional luego, como con el Samson Q2U o el MV7+');
swap('El procesamiento APHEX es cadena fija; usuarios avanzados pueden querer control más granular por banda',
  'El procesamiento APHEX viene en cadena fija; los usuarios avanzados pueden querer un control más detallado por banda');
swap('Requiere software RODE Connect para personalización completa del DSP; modo solo-hardware es limitado',
  'Requiere el software RODE Connect para personalizar del todo el DSP; el modo solo con hardware es limitado');
swap('Tres perillas analógicas independientes (Ganancia, Volumen Auriculares, Mezcla Playback) — control real de mezclador sin interfaz aparte',
  'Tres ruedas analógicas independientes (ganancia, volumen de auriculares, mezcla de reproducción): control real de mezcla sin interfaz aparte');
swap('Monitorización sin latencia con balance independiente voz/playback — crítico para streamers que balancean audio de juego y micro',
  'Monitorización sin latencia con balance independiente de voz y reproducción: clave para streamers que equilibran audio de juego y micro');
swap('Botón mute con anillo LED; sin mezclador de software ni drivers requeridos para funciónalidad principal',
  'Botón de silencio con anillo LED, sin mezclador de software ni controladores para la funcionalidad principal');
swap('Solo cardioide, y también el resto de micrófonos de esta guía, así que si necesitas captación omnidireccional o en figura-8 esta no es tu lista',
  'Solo cardioide, como el resto de micros de esta guía: si necesitas captación omnidireccional o en figura-8, esta no es tu lista');
swap('Sin salida XLR — no se puede usar como micro analógico con interfaz o mezcladora profesional',
  'Sin salida XLR: no se puede usar como micro analógico con una interfaz o mesa de mezclas profesional');
swap('El preamp Revolution de alta ganancia de Rode y el DSP APHEX integrado trabajan dentro del micrófono, sin cadena de efectos por software',
  'El previo Revolution de alta ganancia de Rode y el DSP APHEX integrado trabajan dentro del micrófono, sin cadena de efectos por software');
swap('Solo 24-bit/48kHz; no tiene modo de 96 kHz ni 32 bits flotantes, así que no es la opción para captura en alta resolución',
  'Solo 24 bits/48 kHz, sin modo de 96 kHz ni coma flotante de 32 bits: no es la opción para captura en alta resolución');
swap('La salida de auriculares es de 3,5 mm en lugar del jack de 1/4 pulgada de estudio',
  'La salida de auriculares es de 3,5 mm en lugar del jack de 1/4 de pulgada de estudio');
swap('Rode Connect y el resto de apps de Rode hacen falta para abrir las opciones de DSP y ruteo',
  'Rode Connect y el resto de apps de Rode hacen falta para desbloquear las opciones de DSP y encaminamiento');
swap('La perilla de mezcla combina micrófono y reproducción del ordenador en hardware, así que te oyes por encima de la música sin abrir ninguna app',
  'La rueda de mezcla combina micrófono y reproducción del ordenador en hardware, así que te oyes por encima de la música sin abrir ninguna app');
swap('Perilla de nivel de auriculares aparte y mute táctil silencioso en el cuerpo',
  'Rueda de nivel de auriculares aparte y silencio táctil en el cuerpo');
swap('sin los artefactos que deja un noise gate', 'sin los artefactos que deja una puerta de ruido');
swap('Una cápsula de condensador capta clics de teclado, retumbeo de la habitación y ruido del clima, así que pide una habitación tratada',
  'Una cápsula de condensador capta clics de teclado, reverberación de la habitación y ruido de la climatización, así que pide una habitación tratada');
swap('Los modelos recientes ya ofrecen 32 bits flotantes, algo que el AT2020USB-X no tiene',
  'Los modelos recientes ya ofrecen coma flotante de 32 bits, algo que el AT2020USB-X no tiene');
swap('los otros tres de aquí con XLR empiezan en 199 $ y este está en 70 $',
  'los otros tres de aquí con XLR empiezan en $199 y este está en $70');
swap('El interruptor hardware silencia USB y XLR a la vez, así que es realmente sin clics en ambas rutas',
  'El interruptor físico silencia USB y XLR a la vez, así que va realmente sin clic en ambos canales');
swap('Cuesta alrededor de un tercio de lo que el Shure MV7+ o el Rode NT1 5th Generation',
  'Cuesta en torno a un tercio de lo que cuestan el Shure MV7+ o el Rode NT1 5th Generation');
swap('El jack de auriculares de 1/8 pulgadas no tiene control de nivel en el micrófono, así que ajustas el volumen por software',
  'El jack de auriculares de 1/8 de pulgada no tiene control de nivel en el micrófono, así que ajustas el volumen desde el software');
swap('Sin botón mute USB-C, sin perilla de ganancia y sin DSP; todo eso vive en tu DAW',
  'Sin botón de silencio USB-C, sin rueda de ganancia y sin DSP; todo eso está en tu DAW');
// TABLA
swap('Streaming conectar-y-usar con controles físicos', 'Streaming plug and play con controles físicos');
swap('32 bits flotantes / 48 kHz', 'Coma flotante de 32 bits / 48 kHz');
swap('Jack de auriculares de 3,5 mm con perillas de volumen y de mezcla', 'Jack de auriculares de 3,5 mm con ruedas de volumen y de mezcla');
swap('Monitorización sin latencia con perilla independiente de nivel de auriculares', 'Monitorización sin latencia con rueda independiente de nivel de auriculares');
// FAQ
swap('gana por mezcla con Wave Link', 'destaca por la mezcla con Wave Link');
swap('es el kit conectar-y-usar más completo con controles físicos', 'es el kit plug and play más completo con controles físicos');
swap('tiene perillas físicas de ganancia, mezcla y auriculares más un botón de mute con anillo LED',
  'tiene ruedas físicas de ganancia, mezcla y auriculares más un botón de silencio con anillo LED');
swap('y perilla de mezcla real para combinar micrófono y audio del ordenador',
  'y rueda de mezcla real para combinar micrófono y audio del ordenador');
swap('añade controles de mezclador en hardware sin interfaz aparte', 'añade controles de mezcla en hardware sin interfaz aparte');
swap('El sE Electronics NEOM USB va más allá con tres perillas analógicas independientes', 'El sE Electronics NEOM USB va más allá con tres ruedas analógicas independientes');
swap('tiene perilla de nivel de auriculares y perilla de mezcla', 'tiene rueda de nivel de auriculares y rueda de mezcla');
swap('no tiene ningún control físico más allá del interruptor de mute', 'no tiene ningún control físico más allá del interruptor de silencio');
swap('llevan ambos salida XLR para que pases a un preamp sin comprar otro micrófono',
  'llevan ambos salida XLR para que pases a un previo sin comprar otro micrófono');
swap('prioriza la claridad de voz con el', 'apuesta por la claridad de voz con el');
swap('y los controles físicos con baja latencia con el', 'y controles físicos de baja latencia con el');
// DESCRIPTION + CONCLUSION
swap('opciones dinámicas y de condensador desde 70 $ hasta 299 $, con specs verificadas',
  'opciones dinámicas y de condensador desde $70 hasta $299, con especificaciones verificadas');
swap('Si quieres la voz de broadcast de Shure con un solo cable USB y sin problemas de ganancia, ve por el Shure MV7+',
  'Si quieres la voz de broadcast de Shure con un solo cable USB y sin problemas de ganancia, apuesta por el Shure MV7+');
swap('el Elgato Wave:3 . Si necesitas', 'el Elgato Wave:3. Si necesitas');
swap('Si quieres el paquete conectar y usar más completo con controles físicos', 'Si quieres el kit plug and play más completo con controles físicos');
swap('el Shure MV7+ . Si tu habitación', 'el Shure MV7+. Si tu habitación');
swap('aporta DSP APHEX interno y conversión 24-bit/48kHz', 'aporta DSP APHEX interno y conversión de 24 bits/48 kHz');
swap('Si necesitas control de mezclador en hardware sin interfaz aparte', 'Si necesitas control de mezcla en hardware sin interfaz aparte');
swap('Si algún día piensas pasar a un preamp de estudio', 'Si algún día piensas pasar a un previo de estudio');
swap('porque los otros dos con XLR de esta lista empiezan bastante por encima de 200 $',
  'porque los otros dos con XLR de esta lista empiezan bastante por encima de $200');
swap('Si quieres un condensador de estudio con una perilla de mezcla de verdad para oirte por encima de la música',
  'Si quieres un condensador de estudio con una rueda de mezcla de verdad para oírte por encima de la música');
swap('Y si quieres gastar lo mínimo sin quedarte atado, el Samson Q2U te da USB hoy y un XLR para cuando estés listo a comprar una interfaz',
  'Y si quieres gastar lo mínimo sin atarte, el Samson Q2U te da USB hoy y un XLR para cuando estés listo para comprar una interfaz');
swap('Todos son micrófonos USB profesionales listos para streaming, así que empieza con el que mejor se adapte a tu forma de trabajar',
  'Todos son micrófonos USB profesionales listos para streaming: empieza con el que mejor encaje con tu forma de trabajar');
swap('Es un micrófono dinámico con el tono familiar de la familia SM7B', 'Es un micrófono dinámico con el tono característico de la familia SM7B');
g[g.indexOf(gg)] = JSON.parse(S);
fs.writeFileSync(F, JSON.stringify(g, null, 2) + '\n', 'utf8');
console.log('\naplicados: ' + n + '  fallos: ' + fallos.length);
fallos.forEach(f => console.log('  FALLA: ' + f));
console.log('mojibake: ' + (fs.readFileSync(F, 'utf8').match(/â‚¬|Â£|Â°/g) || []).length);
