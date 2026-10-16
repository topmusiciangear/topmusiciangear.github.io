const fs = require('fs');
const F = 'C:/Users/Daniel/projects/topmusiciangear/data/guides.json';
const g = JSON.parse(fs.readFileSync(F, 'utf8'));
const gg = g.find(x => x.id === 'budget-mics');
let S = JSON.stringify(gg);
let n = 0; const fallos = [];
function swap(de, a) {
  if (!S.includes(de)) { fallos.push(de.slice(0, 70)); return; }
  n += S.split(de).length - 1;
  S = S.split(de).join(a);
}
// INTRO
swap('Guía de los 13 mejores micrófonos USB económicos ', 'Guía de micrófonos USB económicos');
// SEC0
swap('Reserva parte del presupuesto para el sistema de soporte', 'Reserva parte del presupuesto para el soporte');
swap('Compra usado a un vendedor confiable', 'Compra usado a un vendedor de confianza');
// SEC1
swap('Maneja amplificadores de guitarra con una autoridad que micrófonos que cuestan diez veces más no pueden igualar', 'Aguanta amplificadores de guitarra con una autoridad que micrófonos de diez veces su precio no pueden igualar');
swap('no impiden que sigan funciónando a la perfección', 'no impiden que sigan funcionando a la perfección');
swap('No hay nada con mejor relación calidad-precio en todo el audio', 'No hay nada con mejor relación calidad-precio en todo el mundo del audio');
swap('un soporte K&M 210/2 un filtro antipop Aston Shield GN', 'un soporte K&M 210/2 y un filtro antipop Aston Shield GN');
// SEC2
swap('el filtro antipop de dos etapas integrado doma las explosivas', 'el filtro antipop de dos etapas integrado doma las plosivas');
swap('El exceso de calidez en medios-graves puede empastar si cantas pegado a la rejilla', 'El exceso de calidez en medios-graves puede embarrar si cantas pegado a la rejilla');
swap('y combínalo con cualquiera de las interfaces económicas de nuestra guía de Mejores Interfaces de Audio Económicas', 'y combínalo con cualquiera de las interfaces económicas de nuestra guía de interfaces de audio económicas');
// SEC3
swap('mientras que la salida de auriculares 3,5mm integrada da monitoreo sin latencia con su propio control de volumen', 'mientras que la salida de auriculares de 3,5 mm integrada da monitorización sin latencia con su propio control de volumen');
swap('Samson incluye el kit completo — trípode mesa, clip, antiviento, cable USB de 2,25 m y cable XLR de 3 m', 'Samson incluye el kit completo: trípode de mesa, clip, antiviento, cable USB de 2,25 m y cable XLR de 3 m');
swap('suena notablemente mejor vía XLR incluso con una interfaz barata', 'suena notablemente mejor por XLR incluso con una interfaz barata');
// SEC4
swap('una perilla de ganancia en el cuerpo ajusta niveles sin entrar en menús', 'una rueda de ganancia en el cuerpo ajusta niveles sin entrar en menús');
swap('y la salida de auriculares 3,5mm da monitoreo directo mientras transmites', 'y la salida de auriculares de 3,5 mm da monitorización directa mientras transmites');
// SEC5
swap('la rejilla esférica funcióna como filtro antipop', 'la rejilla esférica funciona como filtro antipop');
swap('sin necesidad de acondicionamiento acústico', 'sin necesidad de tratamiento acústico');
swap('frente a un ordenador resuelve palabra hablada, canto y podcasting', 'frente a un ordenador cubre palabra hablada, canto y podcasting');
swap('el SM58 llega sin cable ni soporte', 'el SM58 viene sin cable ni soporte');
// SEC6
swap('sobrevivirá a cualquier equipo posterior', 'sobrevivirá a lo que venga después');
// SEC7
swap('el condensador de diafragma grande más silencioso que puedes comprar a cualquier precio', 'el condensador de diafragma grande más silencioso que puedes comprar');
swap('un patrón cardioide cerrado y un sonido neutro', 'un patrón cardioide definido y un sonido neutro');
swap('A diferencia de su versión de 5ª generación, aquí no hay salida USB', 'A diferencia de su generación 5ª, aquí no hay salida USB');
swap('lo deja fuera de los setups puramente USB', 'lo deja fuera de los equipos puramente USB');
swap('Cero accesorios por comprar: la NT1 Signature se entrega', 'Sin accesorios que comprar: la NT1 Signature se entrega');
swap('material que no tendrás que comprar', 'equipo que no tendrás que comprar');
// SEC8
swap('guitarras acústicas tocadas con los dedos y locución, y nunca ha sonado barato', 'guitarras acústicas de dedos y locución, y nunca nos ha sonado barato');
swap('Por menos de 100 €, esta es la mejor puerta de entrada a la grabación', 'Por menos de $99, esta es la mejor forma de entrar a la grabación');
// SEC9
swap('La cápsula está clasificada con 12 dB de ruido propio y 82 dB de relación señal-ruido, la impedancia de salida se sitúa en unos limpios 120 ohmios para cualquier previo de interfaz',
  'La cápsula tiene un ruido propio nominal de 12 dB y 82 dB de relación señal-ruido, y su impedancia de salida es de 120 ohmios, válida para cualquier previo de interfaz');
swap('se entrega con el soporte AT8458 que Audio-Technica vende por separado', 'se entrega con el soporte AT8458, que también se vende por separado');
swap('el AT2035 justifica su sobreprecio frente al AT2020 en la primera sesión', 'el AT2035 justifica su precio más alto frente al AT2020 en la primera sesión');
// SEC10
swap('Los escenarios ruidosos entierran a los micrófonos vocales educados antes del primer estribillo', 'Los escenarios ruidosos entierran a los micros de voz discretos antes del primer estribillo');
swap('manteniendo la voz solista sobre guitarras y platos', 'manteniendo la voz al frente sobre guitarras y platos');
swap('aguantan la ruta nocturna', 'aguantan la gira nocturna');
swap('El micrófono conviene a cantantes de gira y locales de ensayo ruidosos', 'Es el micro para cantantes de gira y locales de ensayo ruidosos');
swap('Quien tenga el presupuesto muy justo o busque intimidad sedosa de estudio le sacará menos partido', 'Si vas justo de presupuesto o buscas intimidad sedosa de estudio, le sacarás menos partido');
// SEC11
swap('Atravesar una banda densa sin gritar protege la voz durante tandas largas', 'Atravesar una banda densa sin gritar protege la voz noche tras noche');
swap('dentro de construcción alemana totalmente metálica', 'dentro de una construcción totalmente metálica de fabricación alemana');
swap('Conviene a vocalistas en activo que alternan escenarios pequeños y ensayos con presupuesto, con claridad fiable sin precios boutique',
  'Es para vocalistas en activo que alternan escenarios pequeños y ensayos con presupuesto, con claridad fiable sin pagar precios boutique');
swap('Los rivales supercardioides aíslan monitores con más agresividad en volúmenes extremos, así que las formaciones más ruidosas con cuñas potentes quizás prefieran patrones cerrados mientras que en escenarios moderados su equilibrio cardioide es ideal',
  'Los rivales supercardioides aíslan monitores con más contundencia en volúmenes extremos, así que las formaciones más ruidosas con cuñas potentes quizás prefieran patrones más cerrados, y en escenarios moderados su equilibrio cardioide es ideal');
// SEC12
swap('El e935 con agarre más firme: enfoque supercardioide para escenarios ruidosos', 'El e935 con agarre más firme y enfoque supercardioide para escenarios ruidosos');
swap('parte de la misma plataforma dinámica alemana que el e935', 'parte de la misma plataforma dinámica de fabricación alemana que el e935');
swap('La contrapartida está en la técnica: el patrón cerrado castiga a quien se sale del eje, donde el tolerante e935 sigue cubriendo',
  'La contrapartida está en tu técnica: el patrón estrecho castiga a quien se sale del eje, donde el permisivo e935 sigue cubriendo');
swap('el e945 es la herramienta más afilada y autoritaria; al resto le compensa ahorrar con el e935',
  'el e945 es la herramienta más precisa y autoritaria; al resto le sale a cuenta ahorrar con el e935');
// SEC13
swap('La inteligibilidad nítida con presupuesto de cerveza suena improbable hasta que cae el primer tiempo',
  'Una inteligibilidad nítida con presupuesto ajustado suena a broma hasta que lo pruebas en un bolo');
swap('La voz corta mezclas en vivo con dicción clara, sin inmutarse ante golpes de manejo y soplos que embarran cápsulas baratas',
  'La voz atraviesa mezclas en vivo con dicción clara, sin inmutarse ante golpes de manejo y soplos que embarran cápsulas baratas');
swap('Su construcción lista para la carretera tolera carga y descarga constantes',
  'Su construcción preparada para la carretera tolera carga y descarga constantes');
swap('El micrófono conviene a equipos en vivo económicos, locales de ensayo y vocalistas que compran su primera herramienta seria de escenario',
  'Es el micro para equipos en vivo económicos, locales de ensayo y vocalistas que compran su primera herramienta seria de escenario');
swap('El trabajo de estudio que pide aire delicado en agudos y poquísimo ruido propio está fuera de su alcance, así que los compradores centrados en grabación deberían probar condensadores mientras que las voces de escenario lo celebrarán',
  'Lo que pida aire delicado en agudos y poquísimo ruido propio está fuera de su alcance: los más centrados en grabación que miren condensadores; las voces de escenario lo agradecerán');
// SEC14
swap('El ND86 crece con cápsula supercardioide de diafragma grande afinada para autoridad vocal en salas amplias',
  'El ND86 apuesta por una cápsula supercardioide de diafragma grande afinada para autoridad vocal en salas amplias');
swap('La suspensión de cuatro puntos más la amortiguación neumática flota el elemento contra golpes',
  'La suspensión de cuatro puntos más la amortiguación neumática suspende el elemento contra los golpes');
swap('La coloración fuera de eje se mantiene controlada bajo el procesado de la PA',
  'La coloración fuera de eje se mantiene controlada a pesar del procesado de la PA');
swap('Conviene a cantantes potentes y equipos de grandes recintos donde la proyección y la dureza justifican subir sobre el precio de entrada',
  'Es para cantantes potentes y equipos de grandes recintos, donde la proyección y la dureza justifican pagar más del precio de entrada');
swap('A los dúos de café y a quienes graban en el dormitorio les resultará excesivo', 'A los dúos de bar y a quienes graban en el dormitorio les resultará excesivo');
// SEC15
swap('presencia moderna más brillante e igual indestructibilidad', 'presencia moderna más brillante e igual de indestructible');
swap('Ideal para escenarios ruidosos donde la voz debe ganar a guitarras y metales', 'Ideal para escenarios ruidosos donde la voz debe imponerse a guitarras y metales');
// SEC16
swap('cardioide cerrado optimizado para hablar cerca', 'cardioide definido optimizado para hablar cerca');
swap('ecualización Lewitt a precio de trabajo', 'ecualización Lewitt a precio razonable');
swap('No para cantantes ni instrumentos — herramienta pura de voz hablada', 'No sirve para cantantes ni instrumentos: es una herramienta solo para voz hablada');
// SEC17
swap('La forma honesta más barata de llegar al sonido de condensador grande', 'La vía honesta más barata al sonido de condensador grande');
swap('Espera un carácter económico, no magia boutique: medios-altos algo adelantados que ayudan a la voz a cortar',
  'Espera un carácter económico, no magia boutique: medios-altos algo prominentes que ayudan a la voz a cortar');
swap('El primer condensador sensato antes de apostar por cápsulas caras', 'El primer condensador sensato antes de invertir en cápsulas caras');
// SEC18
swap('con conversión 192 kHz/24 bits, silencio táctil, monitoreo en tiempo real y perilla de ganancia en el cuerpo',
  'con conversión 192 kHz/24 bits, mute táctil, monitorización en tiempo real y rueda de ganancia en el cuerpo');
swap('empieza en modo conectar y usar y crece a XLR sin comprar dos veces',
  'empieza enchufando y usando, y crece a XLR sin comprar dos veces');
swap('No es un micro con carácter — una voz broadcast limpia y moderna que no molesta',
  'No es un micro con carácter: da una voz broadcast limpia y moderna que no molesta');
// SEC19
swap('Controles broadcast sin precios broadcast', 'Controles broadcast sin precios de broadcast');
swap('más interruptores de recorte de graves y presencia media en el cuerpo para moldear la voz antes de la grabación',
  'más interruptores de recorte de graves y realce de medios en el cuerpo para moldear la voz antes de la grabación');
swap('más simple que micros que piden app para todo', 'más simple que los micros que piden app para todo');
// SEC20
swap('Recorte de graves, plano y realce de agudos conmutables remodelan la misma cápsula dinámica',
  'Recorte de graves, plano y realce de agudos conmutables transforman la misma cápsula dinámica');
swap('como micro utilitario que se adapta por tema, pocas opciones económicas cubren más terreno',
  'como micro utilitario que se adapta según el tema, pocas opciones económicas cubren más terreno');
// SEC21
swap('Disciplina XLR a precio de micro USB', 'Rigor XLR a precio de micro USB');
swap('El tono es limpio y sin artificios en vez de un broadcast grueso, lo que ayuda a salas sin tratar a seguir inteligibles',
  'El tono es limpio y sin artificios en vez de un broadcast cargado, lo que ayuda a que se te entienda en salas sin tratar');
swap('Para creadores que suben de auriculares y ya tienen o planean interfaz', 'Para creadores que vienen de auriculares y ya tienen o planean interfaz');
// SEC22
swap('Ruido propio y construcción reflejan el precio, así que salas ruidosas lo delatan rápido',
  'Ruido propio y construcción delatan el precio, así que en salas ruidosas se nota rápido');
swap('nada más barato enseña más por euro sobre técnica microfónica', 'nada más barato enseña más por cada euro sobre técnica microfónica');
// SEC23
swap('Doble salida USB/XLR con monitoreo por auriculares, silencio táctil y perilla de ganancia en cuerpo metálico',
  'Doble salida USB/XLR con monitorización por auriculares, mute táctil y rueda de ganancia en cuerpo metálico');
swap('La cápsula dinámica cardioide aguanta gritos sin saturar mientras rechaza teclados detrás',
  'La cápsula dinámica cardioide aguanta gritos sin saturar y rechaza el ruido de teclados');
// SEC24
swap('Cuesta menos de 100 $, es el micrófono de instrumento más grabado de la historia',
  'Cuesta menos de $100, es el micrófono de instrumento más grabado de la historia');
swap('El dinámico cardioide con respuesta fuera de eje sin tratar capta la caja y muy poco de la sala',
  'El dinámico cardioide con respuesta fuera de eje en bruto capta la caja y muy poco de la sala');
swap('es lo que deja que una caja o un amplificador se abran paso en una mezcla sin correcciones',
  'es lo que permite que una caja o un amplificador se abran paso en una mezcla sin correcciones');
swap('La contrapartida. En una guía sobre micrófonos económicos, un SM57 parece fuera de lugar, y ese es el punto',
  'La contrapartida: en una guía sobre micrófonos económicos, un SM57 parece fuera de lugar, y ese es el punto');
// SEC25
swap('no tiene interruptores que se puedan pulsar mal y cuesta menos de 100 $', 'no tiene interruptores que puedas tocar sin querer y cuesta menos de $100');
swap('La contrapartida. Para un estudio tratado no es el micrófono adecuado', 'La contrapartida: para un estudio tratado no es el micrófono adecuado');
swap('También es 4 dB más silencioso y menos resistente al feedback que un Beta 58A, así que una banda muy ruidosa lo superará',
  'También tiene 4 dB menos de salida y menos rechazo al acople que un Beta 58A, así que una banda muy ruidosa lo desbordará');
// SEC26
swap('Es el resultado más repetido en las pruebas de micrófonos económicos, y el motivo es concreto',
  'Es lo que más se repite en las pruebas de micrófonos económicos, y el motivo es concreto');
swap('además de un filtro antisollo de dos etapas integrado y una antivibración interna que costarían más como accesorios',
  'además de un filtro antipop de dos etapas integrado y una antivibración interna que costaría más como accesorio');
swap('El cuerpo metálico, la funda incluida y el adaptador de pie hacen que no falte nada por 25 $',
  'El cuerpo metálico, la funda incluida y el adaptador de pie hacen que no falte nada por $25');
swap('La contrapartida. El pico de presencia es más tosco y hay algo de ruido propio y zumbido de manipulación que un Shure sencillamente no tiene',
  'La contrapartida: el pico de presencia es más áspero y hay algo de ruido propio y ruido de manejo que un Shure sencillamente no tiene');
swap('También significa que no necesita alimentación fantasma, así que es solo para directo y para interfaces de entrada',
  'Tampoco necesita alimentación fantasma: funciona con cualquier entrada XLR');
swap('Si tu presupuesto total para una primera cadena de voz está por debajo de 100 $, esta es la respuesta correcta',
  'Si tu presupuesto total para una primera cadena de voz está por debajo de $100, esta es la respuesta correcta');

const idx = g.indexOf(gg);
g[idx] = JSON.parse(S);
fs.writeFileSync(F, JSON.stringify(g, null, 2) + '\n', 'utf8');
console.log('\naplicados: ' + n + '  fallos: ' + fallos.length);
fallos.forEach(f => console.log('  FALLA: ' + f));
console.log('mojibake: ' + (fs.readFileSync(F, 'utf8').match(/â‚¬|Â£|Â°/g) || []).length);
