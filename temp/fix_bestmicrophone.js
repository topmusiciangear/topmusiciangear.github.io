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
// SEC0
swap('Utilizan un diafragma de bobina móvil que no necesita energía, manejan SPL extremo sin distorsión, y sobreviven caídas, retroalimentación y años de gira',
  'Utilizan un diafragma de bobina móvil que no necesita alimentación, aguantan SPL extremo sin distorsión y sobreviven caídas, acoples y años de gira');
// SEC1
swap('pero la calidad sonora es inigualable para voces de estudio, instrumentos acústicos y overheads de batería',
  'pero su calidad de sonido es inigualable para voces de estudio, instrumentos acústicos y platos de batería');
// SEC3
swap('El SM7B une cápsula cardioide de bobina móvil con firma cálida y suave que doma voces ásperas, respaldada por gran rechazo fuera de eje para espacios sin tratar',
  'El SM7B combina cápsula cardioide de bobina móvil con un carácter cálido y suave que doma voces ásperas, respaldado por un gran rechazo fuera de eje para espacios sin tratar');
swap('La salida baja exige interfaz de mucha ganancia o amplificador en línea, con coste y cuidado extra de etapas, así que las interfaces modestas sin margen limpio sufren para alimentarlo bien',
  'Su salida baja pide una interfaz de mucha ganancia o un amplificador en línea, con el coste y el trasto extra que eso supone; las interfaces modestas sin margen limpio no le sacan todo el partido');
// SEC4
swap('El silencio hace que la compresión se porte bien', 'El silencio hace que la compresión responda bien');
swap('El NT1 de quinta generación propone un camino de condensador cardioide con ruido propio de 4dBA',
  'El NT1 de quinta generación es un condensador cardioide con ruido propio de 4dBA');
swap('La voz cálida y suave mantiene pulidas las frases cantadas, mientras la suspensión y el filtro incluidos asientan el micrófono en salas tratadas sin demora',
  'La voz sale cálida y suave, con las frases cantadas siempre pulidas, y la suspensión y el filtro incluidos dejan el micro listo en salas tratadas sin esperas');
swap('La ingeniería de baja masa conserva la honestidad transitoria',
  'Su construcción ligera conserva unos transitorios honestos');
swap('El micrófono conviene a estudios tratados que graban voz cantada, narración e instrumentos acústicos donde la ganancia limpia lo revela todo',
  'Es el micro para estudios tratados que graban voz cantada, narración e instrumentos acústicos, donde la ganancia limpia lo muestra todo');
swap('Las salas reflectantes sin tratar y el sangrado del escenario delatan el compromiso del condensador, pues la cápsula sensible recoge ambiente junto a la fuente, así que los pisos ruidosos compartidos embotan su mejor virtud',
  'Las salas reflectantes sin tratar y el sangrado del escenario muestran el compromiso del condensador: la cápsula sensible recoge ambiente junto a la fuente, así que en un piso ruidoso compartido pierde su mejor virtud');
// SEC5
swap('Un diafragma de baja masa de 16 mm entrega captura limpia y detallada con respuesta suave y sin coloración entre 20 Hz y 20 kHz',
  'Un diafragma de baja masa de 16 mm ofrece una captura limpia y detallada, con respuesta suave y sin coloración entre 20 Hz y 20 kHz');
swap('El diseño cardioide XLR aísla la fuente con decencia mientras invita a buena ganancia y colocación',
  'El diseño cardioide XLR aísla bien la fuente e invita a jugar con ganancia y colocación');
swap('La construcción ligera mantiene cómodos los brazos y pies económicos',
  'Su construcción ligera no sobrecarga brazos ni pies económicos');
swap('El micrófono conviene como primer condensador para voces caseras e instrumentos acústicos donde el detalle honesto importa más que el color vintage',
  'Es un gran primer condensador para voces caseras e instrumentos acústicos, donde el detalle honesto importa más que el color vintage');
swap('pues la cápsula sensible y la conexión solo XLR presuponen interfaz más un espacio razónablemente tranquilo',
  'pues su cápsula sensible y su conexión solo XLR exigen interfaz y un espacio razonablemente tranquilo');
// SEC6
swap('Un solo micrófono de armario que se adapta entre sesiones ahorra más que tres especialistas estrechos',
  'Un solo micro de armario que se adapta entre sesiones ahorra más que tres especialistas limitados');
swap('El C414 XLII asume ese papel con plataforma de condensador de diafragma grande y nueve patrones polares, desde voces íntimas hasta piano de cola con detalle fino',
  'El C414 XLII asume ese papel con su condensador de diafragma grande y nueve patrones polares, desde voces íntimas hasta piano de cola con todo detalle');
swap('El cambio de patrón remodela balance de sala, anchura de conjunto y rechazo sin mover pies',
  'Cambiar de patrón ajusta el balance de sala, la anchura del conjunto y el rechazo sin mover un pie');
swap('La construcción y tolerancias reflejan un insignia pensado para rotación profesional diaria',
  'Construcción y tolerancias de buque insignia pensado para rotación profesional diaria');
swap('El micrófono conviene a salas de proyecto y armarios profesionales que necesitan un único condensador detallado para voces, cuerdas y teclas',
  'Es el micro para salas de proyecto y armarios profesionales que necesitan un único condensador detallado para voces, cuerdas y teclas');
swap('La complejidad y el carácter revelador castigan la colocación descuidada y las malas salas, así que sin tratamiento o experiencia con patrones se aprovecha una fracción del valor mientras los veteranos exprimen cada interruptor',
  'Su complejidad y su carácter revelador castigan la colocación descuidada y las malas salas: sin tratamiento o experiencia con patrones solo aprovechas una fracción de su valor, mientras los veteranos le sacan partido a cada interruptor');
// SEC7
swap('cubre 20 Hz a 16 kHz con 1,8 mV/Pa', 'cubre de 20 Hz a 16 kHz con 1,8 mV/Pa');
swap('La extensión de agudos heredada de los VR1/VR2 suma un realce gentil que mantiene la voz con aire en vez de lodosa',
  'La extensión de agudos heredada de los VR1/VR2 suma un realce suave que mantiene la voz con aire en vez de apagada');
swap('mientras la cinta redondea las eses y tes ásperas que los condensadores baratos exageran',
  'mientras la cinta suaviza las eses y tes ásperas que los condensadores baratos exageran');
swap('Chasis metálico, protegido contra phantom, pinza en la caja. Conviene saber los límites',
  'Chasis metálico, protegido contra phantom y pinza en la caja. Conoce sus límites');
swap('Como cinta pasiva su salida es baja, así que interfaces económicas con previos flojos pedirán un booster como el sE Dynamite o un Cloudlifter',
  'Como cinta pasiva su salida es baja, así que con interfaces económicas de previos justos necesitarás un booster como el sE Dynamite o un Cloudlifter');
swap('La figura-8 también escucha la sala detrás y el soporte cuesta aparte',
  'La figura-8 también escucha la sala de detrás, y el soporte se vende aparte');
swap('Por ~$249, es el atajo al tono broadcast vintage y sedoso para voces afiladas y delgadas',
  'Por ~$249, es la vía rápida al tono broadcast vintage y sedoso para voces afiladas y delgadas');
// SEC8
swap('Idéntica cápsula cálida broadcast e interruptores de ecualización, con previo integrado que suma +18 o +28 dB limpios antes de que la señal salga del micro',
  'La misma cápsula cálida broadcast e interruptores de ecualización, con un previo integrado que suma +18 o +28 dB limpios antes de que la señal salga del micro');
swap('Cuesta más que el clásico y el previo no pide atención — se ajusta una vez y se olvida',
  'Cuesta más que el clásico y el previo no necesita atención: se ajusta una vez y se olvida');
swap('¿SM7B o SM7dB? Mismo sonido, distinta matemática:',
  '¿SM7B o SM7dB? Mismo sonido, distintas cuentas:');
// SEC9
swap('Solo funcióna por XLR, así que la interfaz es obligatoria, al contrario que rivales USB',
  'Solo funciona por XLR, así que la interfaz es obligatoria, a diferencia de los rivales USB');
swap('Pero en tono grabado puro por euro a través de una cadena seria, pocos condensadores discuten con él',
  'Pero en sonido grabado puro por euro, con una cadena seria delante, pocos condensadores le hacen sombra');
// SEC10
swap('así que pasa de voces a acústicas y batería sin quejarse',
  'así que pasa de voces a acústicas y batería sin rechistar');
swap('Conviene saber los límites. Los agudos realzados que recortan voces pueden morder en algunas, no hay pad ni corte para fuentes fuertes y la pinza básica anticipa un soporte aparte',
  'Conoce sus límites: los agudos realzados que hacen destacar voces pueden resultar agresivos en algunas, no hay pad ni atenuador para fuentes fuertes, y la pinza básica avisa de que necesitarás un soporte aparte');
swap('Un patrón, un trabajo: bien hecho por unos $149', 'Un patrón, un trabajo, bien hecho por unos $149');
// SEC11
swap('El LCT 440 PURE es el mic que mata subidas de nivel:',
  'El LCT 440 PURE es el micro que te hace olvidar la siguiente compra:');
swap('Soporte, antipop magnético y paravientos viajan en la caja, así que graba limpio desde el minuto uno',
  'Soporte, antipop magnético y paravientos vienen en la caja, así que graba limpio desde el minuto uno');
swap('para voces e instrumentos que deben sentarse rápido en mezcla',
  'para voces e instrumentos que tienen que sentarse rápido en la mezcla');
swap('Conviene saber los límites. Solo cardioide, 48V obligatorios sin vía USB y carácter fijo donde un multipatrón variaría',
  'Conoce sus límites: solo cardioide, phantom obligatorio y sin vía USB, y un carácter fijo donde un multipatrón te daría opciones');
swap('Pero nada bajo $300 avergüenza a insignias como este',
  'Pero nada por debajo de $300 pone en aprietos a los insignia como este');
// SEC12
swap('El cabezal wave-form de acero ignora golpes y lleva antipop metálico integrado que supera a los aros tradicionales, mientras pad de -10 dB y corte de graves doman fuentes fuertes y retumbes',
  'El cabezal wave-form de acero aguanta golpes y lleva un antipop metálico integrado que supera a los aros tradicionales, mientras el pad de -10 dB y el corte de graves doman fuentes fuertes y retumbes');
swap('Montaje directo a pie incluido; phantom 48V obligatorio. Conviene saber los límites. Solo cardioide y el soporte SwiftShield cuesta aparte',
  'Montaje directo a pie incluido; phantom 48V obligatorio. Conoce sus límites: solo cardioide, y el soporte SwiftShield se vende aparte');
swap('Su alta sensibilidad favorece salas tratadas y expone las demás: colocación y distancia hacen el resto por unos $269',
  'Su alta sensibilidad pide salas tratadas y deja en evidencia a las demás: la colocación y la distancia hacen el resto por unos $269');
// SEC13
swap('El TLM 102 es el pasaporte Neumann real:',
  'El TLM 102 es la puerta de entrada real a Neumann:');
swap('El circuito sin transformador se mantiene lineal en medios con realce gentil hacia 10 kHz para agudos sedosos',
  'El circuito sin transformador se mantiene lineal en medios, con un realce suave hacia 10 kHz para unos agudos sedosos');
swap('Conviene saber los límites. Sin pad ni corte a bordo, sus 11 mV/Pa piden un buen previo y el montaje SG2 básico deja el soporte solo para el Studio Set más caro',
  'Conoce sus límites: sin pad ni corte a bordo, sus 11 mV/Pa piden un buen previo, y el montaje SG2 básico obliga a comprar el soporte del Studio Set más caro');
swap('Por unos $699, es el sonido de élite comercial al alcance casero',
  'Por unos $699, es el sonido de élite comercial al alcance de un home studio');
// CONCLUSION anchors
swap('>Micrófonos Económicos por Menos de $200</a>', '>Mejores micrófonos XLR económicos para estudio</a>');
swap('>Mejores Micrófonos USB y XLR</a>', '>Mejores micrófonos USB para streaming</a>');
swap('>Mejores Micrófonos de Escenario</a>', '>Mejores micrófonos de escenario y directo</a>');
swap('>Micrófonos de Condensador Profesionales</a>', '>Mejores micrófonos condensadores profesionales</a>');
swap('>Comparativa SM57 vs SM58</a>', '>SM57 vs SM58: ¿cuál para voz y amplis? (prueba real)</a>');

const gg2 = g.find(x => x.id === 'best-microphone');
const idx = g.indexOf(gg2);
g[idx] = JSON.parse(JSON.stringify(JSON.parse(S)));
fs.writeFileSync(F, JSON.stringify(g, null, 2) + '\n', 'utf8');
console.log('\naplicados: ' + n + '  fallos: ' + fallos.length);
fallos.forEach(f => console.log('  FALLA: ' + f));
console.log('mojibake: ' + (fs.readFileSync(F, 'utf8').match(/â‚¬|Â£|Â°/g) || []).length);
