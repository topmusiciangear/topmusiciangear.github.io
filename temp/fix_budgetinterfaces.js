const fs = require('fs');
const F = 'C:/Users/Daniel/projects/topmusiciangear/data/guides.json';
const g = JSON.parse(fs.readFileSync(F, 'utf8'));
const gg = g.find(x => x.id === 'budget-interfaces');
let S = JSON.stringify(gg);
let n = 0; const fallos = [];
function swap(de, a) {
  if (!S.includes(de)) { fallos.push(de.slice(0, 70)); return; }
  n += S.split(de).length - 1;
  S = S.split(de).join(a);
}
// INTRO
swap('No necesitas gastar una fortuna para grabación de calidad profesional',
  'No necesitas gastar una fortuna para grabar con calidad profesional');
// SEC0
swap('protege las que moldean las grabaciones', 'prioriza las que moldean las grabaciones');
swap('rara vez acaban integrándose en tu cadena de trabajo', 'rara vez acaban integrándose en tu flujo de trabajo');
swap('Puedes vivir sin MIDI y sin entradas extra', 'Puedes prescindir del MIDI y de las entradas extra');
swap('La reputación de las actualizaciones de software de la marca vale más que cualquier especificación de hardware impresa en la caja',
  'El historial de actualizaciones de la marca vale más que cualquier especificación impresa en la caja');
swap('un filtro antipop y un cable supera un convertidor marginalmente mejor',
  'un filtro antipop y un cable superan un convertidor marginalmente mejor');
// SEC1
swap('Empezar ya es bastante confuso sin pelearte con tu interfaz', 'Empezar ya es bastante lío sin pelearte con tu interfaz');
swap('La Focusrite Scarlett 2i2 4ª generación gana al eliminar fricción: conversión de nivel estudio',
  'La Focusrite Scarlett 2i2 4ª generación destaca porque elimina fricción: conversión de nivel profesional');
swap('el modo Air añade presencia delicada que favorece voces y guitarras', 'el modo Air añade una presencia sutil que favorece voces y guitarras');
swap('y el loopback rutea el audio del ordenador para streaming', 'y el loopback redirige el audio del ordenador para streaming');
swap('El halo de ganancia pasa de verde a rojo y los niveles se vuelven obvios', 'El halo de ganancia pasa de verde a rojo y los niveles se leen a simple vista');
swap('Las maquetas completas grabadas con cajas así junto a equipos mayores siguen sonando profesionales',
  'Las maquetas completas grabadas con aparatos así junto a equipos mayores siguen sonando profesionales');
swap('Pensada para principiantes y cantautores. Revisa el número de entradas, la alimentación USB y tus necesidades de monitoreo antes de comprar',
  'Pensada para principiantes y cantautores: revisa el número de entradas, la alimentación USB y tus necesidades de monitorización antes de comprar');
// SEC2
swap('Ajustar la ganancia no debería ser una adivinanza en tu primera interfaz', 'Ajustar la ganancia no debería ser cuestión de adivinar en tu primera interfaz');
swap('junto a un refinado conversor ESS Sabre32 Ultra que mantiene los detalles limpios', 'junto a un conversor ESS Sabre32 Ultra de calidad que mantiene los detalles limpios');
swap('En palabras sencillas, ves el clip antes de lamentarlo', 'Dicho de forma sencilla: ves el clip antes de lamentarlo');
swap('Los principiantes que saturan cada toma con cajas de mandos a ciegas clavan los niveles al instante con una medición así',
  'Los principiantes que saturan cada toma con interfaces de mandos a ciegas clavan los niveles al instante con una medición así');
swap('Pensado para estudios caseros y streamers. Revisa el número de canales', 'Pensado para estudios caseros y streamers: revisa el número de canales');
// SEC3
swap('¿Es el universal audio Volt 2 la mejor interfaz', '¿Es el Universal Audio Volt 2 la mejor interfaz');
swap('gira en torno a su modo Vintage Mic Previo, que reconfigura', 'gira en torno a su modo Vintage Mic previo, que reconfigura');
swap('para añadir el color cálido del tono clásico de consola a válvulas en vez de ganancia estéril',
  'para añadir el color cálido del tono clásico de consola a válvulas en lugar de una ganancia estéril');
swap('Eso significa que voces y guitarras por DI llegan con cuerpo y pegamento suave antes de cualquier plugin',
  'Eso significa que voces y guitarras por DI llegan con cuerpo y pegada suave antes de cualquier plugin');
swap('El MIDI I/O y un chasis retro sólido completan un paquete pensado para grabar',
  'Las entradas y salidas MIDI y un formato retro sólido completan un paquete pensado para grabar');
swap('Al comparar previos básicos estériles con coloreados como este', 'Al comparar previos básicos neutros con coloreados como este');
// SEC4
swap('El tono de consola antes pedía una consola, ahora cabe en tu escritorio', 'El tono de consola antes exigía una consola; ahora cabe en tu escritorio');
swap('lo que en palabras sencillas añade presencia pulida y pegada que ayuda a que las voces se sienten sin mucho proceso',
  'lo que, en cristiano, añade presencia pulida y pegada que ayuda a que las voces se asienten sin mucho proceso');
swap('La conversión actualizada de alta resolución mantiene los transitorios honestos', 'La conversión mejorada de alta resolución mantiene los transitorios honestos');
swap('las funciones pro de monitoreo suavizan las sesiones', 'las funciones pro de monitorización facilitan las sesiones');
swap('Las pistas de cajas planas frente a entradas coloreadas SSL muestran que estas últimas necesitan menos retoques',
  'Las tomas de interfaces planas frente a entradas coloreadas SSL muestran que estas últimas necesitan menos retoques');
// SEC5
swap('Obtienes componentes analógicos de nivel consola en un paquete portátil', 'Tienes componentes analógicos de nivel consola en un paquete portátil');
swap('Compra la Audient iD14 MKII si necesitas una interfaz de audio confiable', 'Compra la Audient iD14 MKII si necesitas una interfaz de audio fiable');
// SEC6
swap('El pote más temido para un principiante es la ganancia', 'El mando más temido para un principiante es la ganancia');
swap('usa nivelación automática Smartgain que escucha mientras tocas y deja niveles sanos sin saturar',
  'usa nivelación automática Smartgain que escucha mientras tocas y deja niveles correctos sin saturar');
swap('La entrada de instrumento JFET favorece a la guitarra directa', 'La entrada de instrumento JFET sienta bien a la guitarra directa');
swap('Los novatos clavan primeras tomas con autoganancia tras arruinar tomas en cajas manuales',
  'Los novatos clavan primeras tomas con autoganancia tras arruinar tomas con interfaces manuales');
swap('Revisa tus planes de crecimiento y si necesitas MIDI antes de comprar', 'Revisa si piensas ampliar y si necesitas MIDI antes de comprar');
// SEC7
swap('con ocho previos diseñados por MIDAS y generosa expansión digital', 'con ocho previos diseñados por MIDAS y amplia expansión digital');
swap('incluyendo ADAT que junto a un expansor da un gran número de canales listo para batería',
  'incluyendo ADAT, que junto a un expansor da canales de sobra listos para batería');
swap('MIDI y doble cue de auriculares cubren sesiones reales, con monitoreo directo que aparta la latencia',
  'MIDI y doble mezcla de auriculares cubren sesiones reales, con monitorización directa que elimina la latencia');
swap('Submezclar la batería a estéreo se lamenta en la mezcla', 'Submezclar la batería a estéreo se paga en la mezcla');
// SEC8
swap('Las voces pulidas suelen pedir plugins después, salvo que la compresión ocurra al entrar',
  'Las voces pulidas suelen pedir plugins después, a no ser que la compresión ocurra al entrar');
swap('suma un compresor analógico real inspirado en la limitación FET clásica a la musical voz del previo Vintage',
  'suma un compresor analógico real inspirado en el limitador FET clásico a la ya musical voz del previo Vintage');
swap('Ese control impreso significa menos rescate y tomas con sensación más terminada',
  'Ese control grabado significa menos arreglos y tomas más terminadas');
swap('La conversión de alta resolución, el MIDI y un gran ampli de auriculares redondean largas jornadas de grabación',
  'La conversión de alta resolución, el MIDI y un gran ampli de auriculares completan largas jornadas de grabación');
swap('Perseguir dinámicas desbocadas con plugins a posteriori lleva más tiempo, mientras grabar con suave compresión analógica deja la toma lista antes',
  'Domar dinámicas desbocadas con plugins a posteriori lleva más tiempo, mientras que grabar con una suave compresión analógica deja la toma lista desde el principio');
swap('Revisa tu gusto de compresión y necesidades de E/S antes de comprar', 'Revisa si te gusta la compresión y qué E/S necesitas antes de comprar');
// SEC9
swap('hub USB-A trasero que ahorra un puerto del laptop', 'hub USB-A trasero que ahorra un puerto del portátil');
swap('La suite (Ableton Live Lite, Analog Lab Intro, 4 FX Arturia, Auto-Tune 3 meses, Guitar Rig 6 LE, Splice 3 meses) supera a todos los paquetes básicos',
  'La suite (Ableton Live Lite, Analog Lab Intro, 4 FX Arturia, Auto-Tune 3 meses, Guitar Rig 6 LE, Splice 3 meses) supera a todos los packs básicos');
swap('Solo 2 entradas — las bandas necesitan la UMC1820', 'Solo tiene 2 entradas: las bandas necesitan la UMC1820');
// CONCLUSION
swap('¿Necesitas canales? La UMC1820 mete ocho previos MIDAS más ADAT por $229', '¿Necesitas canales? La UMC1820 trae ocho previos MIDAS más ADAT por $229');
swap('¿Produces en laptop? El hub y la suite de la MiniFuse 2', '¿Produces en un portátil? El hub y la suite de la MiniFuse 2');
swap('Cualquiera de estas cumple — todas ofrecen resultados profesionales', 'Cualquiera de estas sirve: todas ofrecen resultados profesionales');
swap('>Mejor Interfaz de Audio para Grabación Casera</a>', '>Mejor interfaz de audio: guía completa para grabación casera</a>');
swap('>Mejor Kit de Home Studio</a>', '>Construyendo tu home studio: 3 niveles para cada presupuesto</a>');
swap('>Mejores Interfaces de Audio Portátiles</a>', '>Mejores interfaces de audio portátiles: guía completa</a>');
g[g.indexOf(gg)] = JSON.parse(S);
fs.writeFileSync(F, JSON.stringify(g, null, 2) + '\n', 'utf8');
console.log('\naplicados: ' + n + '  fallos: ' + fallos.length);
fallos.forEach(f => console.log('  FALLA: ' + f));
console.log('mojibake: ' + (fs.readFileSync(F, 'utf8').match(/â‚¬|Â£|Â°/g) || []).length);
