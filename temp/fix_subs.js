const fs = require('fs');
const F = 'C:/Users/Daniel/projects/topmusiciangear/data/guides.json';
const g = JSON.parse(fs.readFileSync(F, 'utf8'));
const gg = g.find(x => x.id === 'best-live-subwoofers');
let S = JSON.stringify(gg);
let n = 0; const fallos = [];
function swap(de, a) {
  if (!S.includes(de)) { fallos.push(de.slice(0, 70)); return; }
  n += S.split(de).length - 1;
  S = S.split(de).join(a);
}
// INTRO (7 subs, no 5)
swap('Estas cinco cajas activas de 18 pulgadas rinden cuando el bombo y el bajista tienen que oírse a la vez. Todas son activas, todas son de 18 pulgadas y todas aguantan una banda',
  'Estas siete cajas activas de 18 pulgadas responden cuando el bombo y el bajista tienen que oírse a la vez. Todas son activas, todas son de 18 pulgadas y todas aguantan una banda');
// SEC0
swap('Empieza por los activos y adecúa el sub a la música que tocas', 'Empieza por los activos y ajusta el sub a la música que tocas');
swap('Para bandas en directo no hay motivo en 2026 para liarte con cajas pasivas y amplificadores aparte',
  'Para bandas en directo no hay motivo para complicarte con cajas pasivas y amplificadores aparte');
swap('si tienes bombo, bajo o un sintetizador empujando graves', 'si tienes bombo, bajo o un sintetizador metiendo graves');
swap('Fíjate en el SPL máximo, en lo bajo que llega la respuesta', 'Fíjate en el SPL máximo, en hasta dónde baja la respuesta');
swap('El modo cardioide es un plus real: con dos unidades elimina los graves que se cuelan al escenario y retumba el suelo',
  'El modo cardioide es una ventaja real: con dos unidades elimina los graves que se cuelan al escenario y hace temblar el suelo');
// SEC1
swap('La QSC KS118 es una de las reinas de los recintos medianos, y su modo cardioide mata la realimentación como nada en esta lista',
  'La QSC KS118 es la reina de los recintos medianos, y su modo cardioide acaba con la realimentación como nada en esta lista');
swap('Un amplificador Class-D de 3600 vatios mueve un woofer de 18" de gran excursión hasta 136 dB de pico',
  'Un amplificador en Clase D de 3.600 vatios alimenta un woofer de 18 pulgadas de gran excursión hasta 136 dB de pico');
swap('y el modo DEEP extiende la respuesta hasta 35 Hz cuando necesitas más sub-bajo',
  'y el modo DEEP extiende la respuesta hasta 35 Hz cuando necesitas más subgraves');
swap('La configuración cardioide requiere dos unidades, pero es el mejor truco contra acoples para escenarios con monitores potentes',
  'La configuración cardioide requiere dos unidades, pero es la mejor defensa contra acoples para escenarios con monitores potentes');
swap('Las escenas guardables almacenan crossover, delay, DEEP y modo de radiación para recuperar el ajuste de una sala en segundos',
  'Los presets almacenan crossover, delay, DEEP y modo de radiación para recuperar el ajuste de una sala en segundos');
swap('Cuatro ruedas resistentes y un socket de mástil M20 la hacen tan práctica de mover como potente',
  'Cuatro ruedas resistentes y un vaso para mástil M20 la hacen tan práctica de mover como potente');
swap('Es la opción cara, y en salas de hasta unos cuantos cientos de personas se gana cada dólar',
  'Es la opción cara, y en salas de hasta unos cuantos cientos de personas amortiza cada dólar');
// SEC2
swap('La RCF SUB 8004-AS es la rápida, y para rock y metal esa velocidad lo es todo',
  'La RCF SUB 8004-AS es la veloz, y para rock y metal esa velocidad lo es todo');
swap('Un amplificador Class-D de 2500 vatios de pico (1250W RMS) mueve un woofer de 18" con bobina interior/exterior de 4" que se mantiene firme y articulado en vez de convertirse en una papilla',
  'Un amplificador en Clase D de 2.500 vatios de pico (1.250 W RMS) alimenta un woofer de 18 pulgadas con bobina interior/exterior de 4 pulgadas que se mantiene firme y articulado en vez de convertirse en una masa informe');
swap('Alcanza 136 dB y la respuesta se sitúa en 30-120 Hz, así que está pensada para quedar debajo de los tops y golpearte el pecho con cada hit de bombo',
  'Alcanza 136 dB y la respuesta va de 30-120 Hz, así que está pensada para trabajar por debajo de los tops y golpearte el pecho con cada golpe de bombo');
swap('El DSP cubre Xover, fase, Deep/Punch, delay de salida y cardioide', 'El DSP cubre crossover, fase, Deep/Punch, delay de salida y cardioide');
swap('y el gabinete de abedul báltico la mantiene en 56 kg', 'y el gabinete de abedul báltico la deja en 56 kg');
swap('Es la más cara de la lista, y si el bajo debe cortar un muro de guitarras, lo vale',
  'Es la más cara de la lista, y si el bajo debe atravesar un muro de guitarras, lo vale');
// SEC3
swap('Con 29 kg es el sub activo de 18 pulgadas más ligero que vas a llevar, y 1200 vatios empujan el woofer EVS-18L hasta 132 dB de pico',
  'Con 29 kg es el sub activo de 18 pulgadas más ligero que vas a cargar, y 1.200 vatios alimentan el woofer EVS-18L hasta 132 dB de pico');
swap('El QuickSmartDSP ofrece presets Music, Live y Club más cinco slots de usuario',
  'El QuickSmartDSP ofrece presets Music, Live y Club más cinco memorias de usuario');
swap('y la app QuickSmartMobile controla hasta seis unidades ELX200 desde delante, donde de verdad se escucha la sala',
  'y la app QuickSmartMobile controla hasta seis unidades ELX200 desde la sala, donde de verdad se escucha');
swap('El low-pass se ajusta de 80 a 150 Hz para emparejarla limpio con cualquier top',
  'El paso bajo se ajusta de 80 a 150 Hz para combinarla sin fisuras con cualquier top');
swap('Es la opción que la mayoría de bandas que trabajan compran primero', 'Es la opción que la mayoría de bandas en activo compran primero');
// SEC4
swap('La JBL PRX918XLF es a la que recurro en eventos sociales y bodas, y la EQ por Bluetooth es el motivo',
  'La JBL PRX918XLF es a la que recurrir en eventos sociales y bodas, y la EQ por Bluetooth es el motivo');
swap('Un amplificador Class-D de 2000 vatios de pico mueve el woofer 918SG de ferrita de 18" hasta 134 dB con una respuesta de 30-110 Hz',
  'Un amplificador en Clase D de 2.000 vatios de pico alimenta el woofer 918SG de ferrita de 18 pulgadas hasta 134 dB, con una respuesta de 30-110 Hz');
swap('El LCD a color más la app JBL Pro Connect te dan EQ paramétrica de 6 bandas, un filtro lowpass y 20 ms de delay',
  'El LCD a color más la app JBL Pro Connect ofrecen EQ paramétrica de 6 bandas, un filtro paso bajo y 20 ms de delay');
swap('El diseño sin ventilador significa cero ruido mecánico cuando la sala se queda en silencio',
  'El diseño sin ventilador garantiza cero ruido mecánico cuando la sala se queda en silencio');
// SEC5
swap('La Yamaha DXS18XLF es la robusta, con el grave más profundo y la mejor historia de garantía',
  'La Yamaha DXS18XLF es la dura, con el grave más profundo y la mejor trayectoria de garantía');
swap('Su driver de 18" con bobina de 4" alcanza 136 dB', 'Su driver de 18 pulgadas con bobina de 4 pulgadas alcanza 136 dB');
swap('El gabinete con recubrimiento de poliurea ignora arañazos y rozaduras de carretera',
  'El gabinete con recubrimiento de poliurea ni se entera de arañazos y rozaduras de carretera');
swap('Las ruedas opciónales se venden aparte, que es la única pega real', 'Las ruedas opcionales se venden aparte, que es la única pega real');
swap('Con las opciones de garantía ampliada de Yamaha, es el sub para bandas que salen de gira y tratan el equipo a golpes',
  'Con las opciones de garantía ampliada de Yamaha, es el sub para bandas que salen de gira y maltratan el equipo');
// SEC6
swap('Dos mil quinientos vatios y 137 dB por el precio de una cena', 'Dos mil quinientos vatios y 137 dB por cuatro duros');
swap('El TS18S es el 18 barato más fuerte que existe', 'El TS18S es el 18 económico más potente que existe');
swap('y alineación de fase en cuatro pasos para que tops y subs se entiendan',
  'y alineación de fase en cuatro pasos para que tops y subs se lleven bien');
swap('Para bandas emergentes que cuentan cada billete, nada mueve más aire por dólar',
  'Para bandas emergentes que miran cada euro, nada remueve más aire por dólar');
// SEC7
swap('El EON718S junta un 18 a medida con cerebro dbx DriveRack', 'El EON718S reúne un 18 a medida con cerebro dbx DriveRack');
swap('Con 37 kilos no es pluma, y la insignia se paga', 'Con 37 kilos no es ligero, y la insignia se paga');
// CONCLUSION
swap('La QSC KS118 es una de las reinas de los recintos con el mejor modo cardioide anti-acoples',
  'La QSC KS118 es la reina de los recintos, con el mejor modo cardioide antiacoples');
swap('Para un equipo de trabajo, la ELX200-18SP destaca: ligera para cargarla en solitario, potente para presentaciones reales y una app que agiliza cada prueba de sonido',
  'Para un equipo de trabajo, la ELX200-18SP destaca: ligera para cargarla en solitario, potente para bolos de verdad y una app que agiliza cada prueba de sonido');
swap('>Mejores sistemas PA para Bandas</a>', '>Mejores sistemas PA para sonido en vivo: guía completa</a>');
swap('>Mejores Mezcladores de Sonido en Vivo para Bandas y Eventos</a>', '>Mejores mezcladores de sonido para bandas y eventos</a>');
swap('>Mejores Micrófonos Inalámbricos para Escenario</a>', '>Mejores sistemas de micrófono inalámbricos para escenario</a>');
g[g.indexOf(gg)] = JSON.parse(S);
fs.writeFileSync(F, JSON.stringify(g, null, 2) + '\n', 'utf8');
console.log('\naplicados: ' + n + '  fallos: ' + fallos.length);
fallos.forEach(f => console.log('  FALLA: ' + f));
console.log('mojibake: ' + (fs.readFileSync(F, 'utf8').match(/â‚¬|Â£|Â°/g) || []).length);
