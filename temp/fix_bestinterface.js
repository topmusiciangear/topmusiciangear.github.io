const fs = require('fs');
const F = 'C:/Users/Daniel/projects/topmusiciangear/data/guides.json';
const g = JSON.parse(fs.readFileSync(F, 'utf8'));
const gg = g.find(x => x.id === 'best-interface');
let S = JSON.stringify(gg);
let n = 0; const fallos = [];
function swap(de, a) {
  if (!S.includes(de)) { fallos.push(de.slice(0, 70)); return; }
  n += S.split(de).length - 1;
  S = S.split(de).join(a);
}
// SEC0
swap('porque funcióna, suena limpio', 'porque funciona, suena limpio');
swap('La PreSonus AudioBox USB 96 es la alternativa más sencilla para principiantes que necesitan previos utilizables para sus primeras maquetas y todavía ofrece previos utilizables',
  'La PreSonus AudioBox USB 96 es la alternativa más sencilla para principiantes que necesitan previos dignos para sus primeras maquetas sin complicaciones');
swap('>Mejores interfaces de audio por debajo de $300</a>', '>Mejores interfaces de audio por menos de $300</a>');
// SEC1
swap('Una buena interfaz portátil debe ser compacta, alimentada por bus (sin fuente de alimentación externa) y resistente al transporte',
  'Una buena interfaz portátil debe ser compacta, alimentarse por bus (sin fuente de alimentación externa) y aguantar el transporte');
swap('visita nuestra guía de Mejores Interfaces Portátiles', 'visita nuestra guía de interfaces portátiles');
// SEC2
swap('El valor de una interfaz se nota en menos repeticiones, no en hojas de datos más largas', 'El valor de una interfaz se nota en menos tomas repetidas, no en hojas de datos más largas');
swap('El Scarlett 2i2 de cuarta generación lo argumenta con dos previos', 'El Scarlett 2i2 de cuarta generación lo demuestra con dos previos');
swap('El modo Air despierta fuentes apagadas', 'El modo Air revive fuentes apagadas');
swap('El esquema USB-C de dos entradas y dos salidas cubre voz más guitarra o teclas sin menús', 'La configuración USB-C de dos entradas y dos salidas cubre voz más guitarra o teclas sin menús');
swap('La unidad conviene a quien busca la puerta de entrada más indulgente para voz e instrumentos en casa', 'Es la unidad para quien busca la puerta de entrada más amable para voz e instrumentos en casa');
swap('pedirá con el tiempo un hermano mayor en lugar de otro adaptador', 'requerirá con el tiempo un hermano mayor en lugar de otro adaptador');
// SEC3
swap('Margen y rumbo deciden más que los números del conversor', 'Margen y carácter deciden más que los números del conversor');
swap('El MIDI, las salidas DC-coupled y el loopback amplían el guion hacia teclados, control modular y streaming', 'El MIDI, las salidas DC-coupled y el loopback amplían las posibilidades hacia teclados, control modular y streaming');
swap('El chasis USB-C de dos entradas y cuatro salidas enruta monitores', 'El formato USB-C de dos entradas y cuatro salidas enruta monitores');
swap('La interfaz conviene a técnicos de toma que valoran pegada y dimensión desde el origen y aceptan dominar el equilibrio del Legacy', 'Es la interfaz para técnicos de toma que valoran pegada y dimensión desde el origen, dispuestos a dominar el equilibrio del Legacy');
swap('Imprimir color analógico compromete el timbre pronto', 'Grabar color analógico compromete el timbre desde el inicio');
swap('así que los oídos prudentes sacan más partido a la caja que los maximalistas', 'así que los prudentes le sacan más partido que los maximalistas');
swap('combina dos previos SSL de 64 dB con conversión de 32 bits a 192 kHz', 'combina dos previos SSL de 64 dB con conversión de 24 bits a 192 kHz');
// SEC4
swap('El Apollo Twin X de segunda generación sostiene ese flujo con chasis Thunderbolt 3 de diez entradas', 'El Apollo Twin X de segunda generación sostiene ese flujo con conexión Thunderbolt 3 de diez entradas');
swap('La construcción y la medición respiran uso profesional diario', 'La construcción y la medición transmiten uso profesional diario');
swap('La interfaz conviene a productores adscritos al ecosistema UAD', 'Es la interfaz para productores atados al ecosistema UAD');
swap('La dependencia de Thunderbolt, el techo del DSP y el coste de plugins estrechan el público, así que los flujos solo nativos o los equipos solo USB aprovechan poco el sobreprecio de la insignia',
  'La dependencia de Thunderbolt, los límites del DSP y el coste de los plugins estrechan el público: los equipos solo nativos o solo USB rentabilizan poco el sobreprecio del insignia');
// SEC5
swap('El Babyface Pro FS apuesta su nombre a la estabilidad legendaria de drivers RME', 'El Babyface Pro FS debe su nombre a la legendaria estabilidad de los drivers RME');
swap('Dos previos de 65 dB alimentan un núcleo de cuatro entradas', 'Dos previos de 65 dB atacan un núcleo de cuatro entradas');
swap('mientras TotalMix FX, MIDI y ADAT resuelven ruteo y crecimiento', 'mientras TotalMix FX, MIDI y ADAT resuelven conexiones y ampliaciones');
swap('El chasis compacto USB 2.0 sobrevive a mochilas', 'El formato compacto USB 2.0 sobrevive a mochilas');
swap('La unidad conviene a grabadores viajeros y técnicos de exteriores que anteponen fiabilidad y reloj a cantidad de canales', 'Es la unidad para grabadores viajeros y técnicos de exteriores que anteponen fiabilidad y sincronía a cantidad de canales');
swap('El ticket de entrada compra menos entradas simultáneas que rivales más voluminosos, y dominar TotalMix pide una tarde', 'El precio de entrada supone menos entradas simultáneas que rivales más voluminosos, y dominar TotalMix requiere una tarde');
// SEC6
swap('Los medidores previenen el asesino silencioso de la grabación casera: grabar a ciegas', 'Los medidores evitan el asesino silencioso de la grabación casera: grabar a ciegas');
swap('con barras de nivel en vivo para cada entrada y salida de un vistazo', 'con barras de nivel en vivo para cada entrada y salida, visibles de un vistazo');
swap('La ruta USB-C de dos entradas y dos salidas apuesta por lo simple', 'La conexión USB-C de dos entradas y dos salidas apuesta por lo simple');
swap('La interfaz conviene a principiantes y podcasters que buscan confianza visual', 'Es la interfaz para principiantes y podcasters que buscan confianza visual');
swap('limitan tanto a bandas ruidosas como a auriculares exigentes, así que las formaciones crecientes o los planares hambrientos terminarán superando la pulcra ventanita',
  'dejan atrás tanto a bandas ruidosas como a auriculares exigentes: las formaciones crecientes o los planares más exigentes acabarán superando la pulcra ventanita');
// SEC7
swap('Todo lo demás es territorio UA familiar:', 'Todo lo demás es terreno conocido de UA:');
swap('el mismo circuito de los estudios desde los años 60', 'el carácter del circuito de los estudios desde los años 60');
swap('un botón que asienta voces y guitarras', 'un botón que coloca voces y guitarras');
swap('Conviene saber los límites antes de comprar', 'Conoce los límites antes de comprar');
swap('Si nunca vas a tocar un compresor, el Volt 2 más barato te da los mismos previos', 'Si nunca vas a usar un compresor, el Volt 2 más barato te da los mismos previos');
// SEC8
swap('El motivo para elegirlo sobre la Scarlett es el crecimiento', 'El motivo para elegirlo sobre la Scarlett es poder crecer');
swap('y el botón iD programable pone dim, cut, suma a mono o talkback bajo un dedo', 'y el botón iD programable pone dim, cut, suma a mono o talkback al alcance de un dedo');
swap('Conviene saber las contrapartidas', 'Conoce las contrapartidas');
swap('y el marco analógico de 2 entradas y 4 salidas hace que la historia de expansión dependa de comprar una unidad de previos externa después',
  'y con un formato analógico de 2 entradas y 4 salidas, ampliarlo pasa por comprar una unidad de previos externa después');
// SEC9
swap('El Volt 2 es calidad UA reducida a lo esencial', 'El Volt 2 es calidad UA concentrada en lo esencial');
swap('un marco USB-C de 2 entradas', 'un formato USB-C de 2 entradas');
swap('añadiendo la profundidad y el cuerpo que favorecen a voces y guitarras acústicas', 'añadiendo la profundidad y el cuerpo que sientan bien a voces y guitarras acústicas');
swap('Alimentación phantom, construcción robusta y medición sencilla lo convierten en una caja de verdad plug-and-play: conecta, ajusta ganancia, graba',
  'Alimentación phantom, construcción robusta y medición sencilla lo convierten en una caja sin complicaciones plug-and-play: conecta, ajusta ganancia, graba');
swap('tienen todo lo que necesitan y nada que deban aprender', 'tienen todo lo que necesitan y nada que les sobre');
swap('Conviene saber los límites. Dos entradas analógicas', 'Conoce los límites: dos entradas analógicas');
swap('Dos entradas analógicas sin expansión ADAT significa ni baterías ni bandas', 'Dos entradas analógicas sin expansión ADAT descartan baterías y bandas');
swap('activar el modo Vintage añade unos dB, así que debes reajustar la ganancia cada vez', 'activar el modo Vintage sube unos dB el nivel, así que debes reajustar la ganancia cada vez');
const idx = g.indexOf(gg);
g[idx] = JSON.parse(S);
fs.writeFileSync(F, JSON.stringify(g, null, 2) + '\n', 'utf8');
console.log('\naplicados: ' + n + '  fallos: ' + fallos.length);
fallos.forEach(f => console.log('  FALLA: ' + f));
console.log('mojibake: ' + (fs.readFileSync(F, 'utf8').match(/â‚¬|Â£|Â°/g) || []).length);
