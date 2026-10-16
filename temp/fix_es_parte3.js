const fs = require('fs');
const F = 'C:/Users/Daniel/projects/topmusiciangear/data/guides.json';
const g = JSON.parse(fs.readFileSync(F, 'utf8'));
const s = g.find(x => x.id === 'starter-studio');
let n = 0; const fallos = [];
function swap(de, a) {
  const t0 = JSON.stringify(s);
  if (!t0.includes(de)) { fallos.push(de.slice(0, 70)); return; }
  n += t0.split(de).length - 1;
  (function rec(o) {
    if (typeof o === 'string') return o.split(de).join(a);
    if (Array.isArray(o)) return o.map(rec);
    if (o && typeof o === 'object') { Object.keys(o).forEach(k => { o[k] = rec(o[k]); }); }
    return o;
  })(s);
}
const S = (p) => swap(p[0], p[1]);
// TABLA
S(['con altavoces activos de verdad desde el primer día', 'con altavoces activos desde el primer día']);
S(['con imagen estéreo real en vez de suposiciones', 'con imagen estéreo real en lugar de ir a ciegas']);
S(['con una cápsula Neumann y modelado analógico a bordo', 'con cápsula Neumann y modelado analógico integrados']);
S(['Rode NT1 Signature (XLR puro)', 'Rode NT1 Signature (solo XLR)']);
S(['Neumann TLM 102 (cápsula alemana premium)', 'Neumann TLM 102 (cápsula alemana de gama alta)']);
S(['la lupa clínica para cazar errores', 'la lupa para cazar errores']);
S(['autoridad de 8 pulgadas, y la última parada en monitores', 'contundencia de 8 pulgadas, y la última parada en monitores']);
S(['Los 32 bits en coma flotante del micrófono salvan una toma que se habría saturado', 'Los 32 bits en coma flotante del micrófono rescatan una toma que se habría saturado']);
S(['así que al grave del HS8 le siguen haciendo falta trampas de esquinas', 'así que el grave del HS8 seguirá necesitando trampas en las esquinas']);
// SCARLETT
S(['Dos preamplificadores de ruido ultrabajo con 69 dB de ganancia manejan condensadores y dinámicos', 'Dos previos de ruido ultrabajo con 69 dB de ganancia mueven condensadores y dinámicos']);
S(['Se alimenta por bus y es lo bastante pequeña para vivir junto al portátil', 'Se alimenta por bus y es lo bastante pequeña para llevar junto al portátil']);
S(['La primera interfaz por defecto y por algo: drivers estables y soporte sólido', 'La interfaz con la que empieza todo el mundo, por algo: drivers estables y soporte sólido']);
S(['Dos entradas significa un micro más un instrumento: ni overheads ni par estéreo', 'Dos entradas dan para un micro más un instrumento: ni micros aéreos ni par estéreo']);
// SSL
S(['Consola y controlador de monitores en la misma caja, así que el escritorio sigue despejado', 'Consola y controlador de monitores en la misma caja: el escritorio no se llena de cacharros']);
S(['No incluye software más allá del circuito 4K: traes tu propio DAW', 'Aparte del circuito 4K no trae software: usas el DAW que ya tengas']);
S(['Solo dos entradas y dos salidas: no es una interfaz que crezca', 'Solo dos entradas y dos salidas: no es una interfaz para crecer']);
// NT1 5G
S(['Incluye shock mount, filtro antipop y cable XLR en la caja', 'Incluye suspensión elástica, filtro antipop y cable XLR en la caja']);
S(['Más pesado y caro que un condensador de bundle con carácter parecido', 'Más pesado y caro que un condensador de kit con un carácter parecido']);
S(['El ruido propio se mide a 20 dB de ganancia; una sala real añade su propio suelo de ruido', 'El ruido propio se mide a 20 dB de ganancia; una sala normal ya tiene su propio ruido de fondo']);
// NT1 SIG
S(['Una cosa menos que configurar que el 5th Gen: XLR a la interfaz, sin app y sin firmware', 'Una cosa menos que ajustar respecto al 5th Gen: XLR a la interfaz, sin app y sin firmware']);
S(['Misma cápsula HF6 que el 5th Generation: subir a ese modelo compra comodidad, no sonido', 'Misma cápsula HF6 que el 5th Generation: pasarse a ese modelo solo compra comodidad, no sonido']);
// M50X
S(['El auriculares de estudio más grabado del mundo por algo: plano, honesto, sin color', 'El auricular más usado para grabar del mundo, por algo: plano, honesto, sin color']);
S(['Funciona con monitores o sin ellos, por eso es la elección por defecto de este nivel', 'Da igual si tienes monitores o no, por eso es la elección por defecto de este nivel']);
S(['No tiene el espacio sonoro amplio y abierto de un diseño abierto', 'No tiene la amplitud de un diseño abierto']);
S(['El cable desmontable significa que un cable roto es una sustitución, no una reparación', 'Con el cable desmontable, un cable roto implica una sustitución, no una reparación']);
// 7506
S(['Estándar de radiodifusión desde 1991: el que te dan en cualquier casa de alquiler', 'Estándar de radiodifusión desde 1991: el que te ponen en las manos en cualquier casa de alquiler']);
S(['Cerrados, así que también sirven para grabar voz e instrumentos', 'Al ser cerrados, también valen para grabar voz e instrumentos']);
S(['Se pliega plano y aguanta caídas mejor que casi todos los pares de estudio', 'Se pliega en plano y aguanta caídas mejor que casi todos']);
S(['63 ohmios de impedancia piden más salida de auriculares que la que da un portátil', 'Sus 63 ohmios necesitan más salida de la que da un portátil']);
S(['El cable en espiral de 3 m añade peso y se enreda en un escritorio pequeño', 'El cable rizado de 3 m pesa y se enreda en un escritorio pequeño']);
S(['Las almohadillas se gastan antes que los drivers; sustituirlas es fácil pero no gratis', 'Las almohadillas se gastan antes que los drivers; cambiarlas es fácil, pero no sale gratis']);
// KRK
S(['El monitor más común en estudios domésticos, así que las salas están tratadas para él', 'El monitor más visto en estudios domésticos, así que sus pegas son de sobra conocidas']);
S(['Sonidos y algo coloreados; no es la opción para una comprobación neutra', 'Suena alto y algo coloreado; no es la opción para una comprobación neutra']);
// G4M
S(['Mata el eco de aleteo en los puntos de primera reflexión por lo más barato de esta página', 'Mata el eco flotante en los puntos de primera reflexión por lo menos dinero de esta página']);
S(['Catorce centímetros de fondo: menos eficaz que los paneles profesionales de lana mineral', 'Catorce centímetros de grosor: menos eficaz que los paneles profesionales de lana mineral']);
// K&M
S(['Brazo telescópico que sostiene el micro donde lo necesitas sin un segundo pie', 'Brazo telescópico que aguanta el micro donde lo necesitas sin otro soporte']);
S(['Ingeniería alemana a un precio que la ignora', 'Ingeniería alemana a precio contenido']);
// M20X
S(['La afinación plana no tiene pegada de graves para escuchar solo por gusto', 'La afinación plana no tiene pegada de graves para escuchar música por gusto']);
S(['Almohadillas finas alrededor de una copa cerrada, que se calientan en sesiones largas', 'Almohadillas finas sobre una cápsula cerrada, que se calientan en sesiones largas']);
// ASTON
S(['A $49 cuesta más que el micrófono dinámico que protege', 'Por $49 sale más caro que muchos de los dinámicos a los que protege']);
// MOGAMI
S(['Conductor cuádruple Neglex de grado referencia — el estándar en estudios top desde hace décadas', 'Cuatro conductores Neglex de referencia: el estándar en estudios punteros desde hace décadas']);
S(['Un solo largo — un cable largo en una sala pequeña genera enredo', 'Un solo largo: un cable largo en una sala pequeña se enreda']);
// APOLLO
S(['Thunderbolt 3 a 24 bits/192 kHz, y funciona igual en Mac y en Windows', 'Thunderbolt 3 a 24 bits/192 kHz, y rinde igual en Mac y en Windows']);
S(['La calidad del frontal no sustituye el tratamiento acústico', 'La calidad de la entrada no sustituye el tratamiento acústico']);
// TLM
S(['y cuesta una fracción de losELO insignia', 'y cuesta una fracción de lo que cuesta el insignia']);
S(['Antipop integrado, así que el filtro de $49 que necesitan los niveles bajos deja de ser una compra', 'Antipop integrado: el filtro de $49 de la mejora opcional deja de ser una compra']);
S(['12 dBA de ruido propio van bien aquí y no irían en una sala comercial tratada', 'Sus 12 dBA están bien aquí, pero no en una sala comercial tratada']);
S(['Necesita phantom de 48V, así que descarta la cinta pasiva que igual querías para esa misma voz', 'Necesita phantom de 48 V, así que descarta la cinta pasiva que quizá querías para esa misma voz']);
// ERIS
S(['El precio más bajo para un par estéreo activo que sirva de algo en esta guía', 'El precio más bajo para un par estéreo activo que merezca la pena en esta guía']);
S(['lo que elimina la reflexión del escritorio que arruina casi todos los monitores económicos', 'lo que acaba con la reflexión del escritorio que arruina casi todos los monitores económicos']);
S(['Sus 102 dB de pico son modestos y no sonarán fuerte una mezcla con mucha percusión sin que la imagen se mueva', 'Sus 102 dB de pico son modestos: una mezcla con mucha percusión no sonará fuerte sin que la imagen se mueva']);
S(['el fondo de la mezcla sigue siendo un juicio', 'el fondo de la mezcla sigue siendo una incógnita']);
// HS8
S(['y Yamaha lleva construyendo este monitor desde 1997', 'y Yamaha lleva fabricando este monitor desde 1997']);
S(['ROOM CONTROL y HIGH TRIM son recortes analógicos', 'ROOM CONTROL y HIGH TRIM son ajustes analógicos']);
S(['El grave de 8 pulgadasCulpa a una mezcla que de verdad está flaca', 'El grave de 8 pulgadas adula a una mezcla que de verdad está falta de graves']);
S(['el grave más profundo está limitado más que ausente', 'los graves más profundos llegan limitados, no ausentes']);
S(['más que el micrófono o el soporte de este mismo montaje', 'más que el micro o el pie de este mismo montaje']);

fs.writeFileSync(F, JSON.stringify(g, null, 2) + '\n', 'utf8');
console.log('\naplicados: ' + n + '  fallos: ' + fallos.length);
fallos.forEach(f => console.log('  FALLA: ' + f));
console.log('mojibake: ' + (fs.readFileSync(F, 'utf8').match(/â‚¬|Â£|Â°/g) || []).length);
