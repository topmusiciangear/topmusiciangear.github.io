const fs = require('fs');
const F = 'C:/Users/Daniel/projects/topmusiciangear/data/guides.json';
const g = JSON.parse(fs.readFileSync(F, 'utf8'));
const gg = g.find(x => x.id === 'open-headphones');
let S = JSON.stringify(gg);
let n = 0; const fallos = [];
function swap(de, a) {
  if (!S.includes(de)) { fallos.push(de.slice(0, 70)); return; }
  n += S.split(de).length - 1;
  S = S.split(de).join(a);
}
// INTRO
swap('Un auricular abierto es lo más cercano a escuchar tu mezcla en monitores de estudio sin tratar la sala',
  'Un auricular abierto es lo más cercano a escuchar tu mezcla en monitores de estudio sin los problemas de la sala');
// SEC0
swap('En lugar de que el sonido rebote dentro de una copa sellada, escapa y vuelve a entrar de forma natural',
  'En lugar de que el sonido rebote dentro de una copa cerrada, escapa y se dispersa de forma natural');
swap('y la imagen estéreo se siente como si escucharas monitores en una sala tratada',
  'y la imagen estéreo parece que escucharas monitores en una sala tratada');
swap('Una copa sellada crea presión que exagera las frecuencias bajas', 'Una copa cerrada crea presión que exagera las frecuencias bajas');
swap('Son herramientas de mezcla, no de seguimiento', 'Son herramientas de mezcla, no de grabación');
swap('así que son inutilizables mientras grabas voces o cuando hay un micrófono activo cerca',
  'así que no sirven mientras grabas voces o cuando hay un micrófono activo cerca');
swap('Mantén un par cerrado para el seguimiento y alcanza los abiertos en tu puesto de mezcla',
  'Mantén un par cerrado para grabar y coge los abiertos en tu puesto de mezcla');
swap('Si pasas horas comparando reverberaciones y movimientos de EQ, la comodidad de un diseño abierto justifica su precio',
  'Si pasas horas comparando reverberaciones y ajustes de EQ, la comodidad de un diseño abierto justifica su precio');
swap('href="/guides/best-headphones-for-mixing.html">Mejores auriculares para mezclar</a>',
  'href="/guides/best-headphones-for-mixing_es.html">Mejores auriculares para mezcla y masterización</a>');
swap('href="/guides/hd490-pro-vs-dt990.html">HD 490 Pro vs DT 990</a>',
  'href="/guides/hd490-pro-vs-dt990_es.html">HD 490 Pro vs DT 990 Pro: ¿abiertos para mezclar?</a>');
// SEC1
swap('el abierto neutro que traduce bien las mezclas, ahora con graves reales', 'el abierto neutro que traslada bien las mezclas, ahora con graves reales');
swap('La respuesta de frecuencia es tan neutra que las mezclas se traducen perfectamente entre diferentes sistemas',
  'La respuesta en frecuencia es tan neutra que las mezclas se trasladan perfectamente entre diferentes sistemas');
swap('monitores de estudio, estéreo de auto, altavoces de laptop e incluso auriculares in-ear',
  'monitores de estudio, equipo del coche, altavoces de portátil e incluso auriculares in-ear');
swap('No hay graves exagerados para engañarte haciéndote pensar que tus graves son más grandes de lo que son',
  'No hay graves exagerados que te engañen haciéndote creer que tus graves son más grandes de lo que son');
swap('ni medios hundidos para esconder problemas en el rango de 500Hz a 2kHz',
  'ni medios hundidos que escondan problemas en el rango de 500 Hz a 2 kHz');
swap('El diseño abierto te da un escenario sonoro amplio y natural que los auriculares cerrados simplemente no pueden replicar',
  'El diseño abierto te da un escenario sonoro amplio y natural que los auriculares cerrados simplemente no pueden igualar');
swap('panoramiza una guitarra fuerte a la izquierda y un piano fuerte a la derecha',
  'panoramiza una guitarra potente a la izquierda y un piano potente a la derecha');
swap('y el plugin dearVR MIX-SE incluido añade una comprobación de cómo se traduce la mezcla en una sala virtual',
  'y el plugin dearVR MIX-SE incluido añade una comprobación de cómo se traslada la mezcla en una sala virtual');
// SEC2
swap('Las copas semiabiertas dejan escapar el sonido libremente', 'Las copas abiertas dejan escapar el sonido libremente');
swap('La impedancia de 250 ohmios significa que necesitas un amplificador de auriculares dedicado',
  'La impedancia de 250 ohmios exige un amplificador de auriculares dedicado');
swap('La extensión de graves es legendaria — profunda, controlada y articulada sin sangrar hacia los medios',
  'La extensión de graves es legendaria: profunda, controlada y articulada sin emborronar los medios');
swap('Los agudos están realzados, asi que las colas de reverb, la sibilancia y los transitorios de alta frecuencia sean afilados',
  'Los agudos están realzados, así que las colas de reverb, la sibilancia y los transitorios de alta frecuencia se mantienen definidos');
swap('Utilizo el DT 990 Pro para escucha crítica quirúrgica — revisar la imagen estéreo, evaluar el decaimiento de la reverb y buscar frecuencias problemáticas',
  'Sirve para escucha crítica quirúrgica: revisar la imagen estéreo, evaluar la caída de la reverb y buscar frecuencias problemáticas');
// SEC3
swap('Los ingenieros de mastering guardan unos auriculares solo para escuchar la verdad incómoda',
  'Los ingenieros de mastering reservan unos auriculares solo para escuchar la verdad incómoda');
swap('un clásico abierto con rango medio prácticamente plano e imagen espacial natural que presenta voces, cuerdas y equilibrios sin opinar',
  'un clásico abierto con rango medio prácticamente plano e imagen espacial natural que presenta voces, cuerdas y equilibrios sin añadir nada');
swap('El diseño abierto significa que el aire se mueve libre detrás del driver, así el escenario se siente amplio, como de monitores, en vez de atrapado en el cráneo',
  'Con el diseño abierto, el aire se mueve libre detrás del driver y el escenario se siente amplio, como de monitores, en vez de encerrado');
swap('Revisar másters en estos tras largas sesiones de monitores revela enmascaramientos',
  'Comprobar másters en estos tras largas sesiones de monitores revela enmascaramientos');
swap('Antes de comprar, reserva presupuesto para amplificarlos bien, porque su alta impedancia pide un amplificador de auriculares competente',
  'Antes de comprar, guarda parte del presupuesto para amplificarlos bien, porque su alta impedancia pide un amplificador de auriculares competente');
// SEC4
swap('Los drivers de 45mm entregan sonido puro directamente del transductor sin refuerzo de resonancia acústica',
  'Los drivers de 45 mm ofrecen sonido puro directamente del transductor, sin resonancias añadidas');
swap('La respuesta de frecuencia extendida (5-40.000 Hz) captura cada detalle',
  'La respuesta en frecuencia extendida (5-40.000 Hz) captura cada detalle');
swap('La construcción de resina de composite de carbono mejora la rigidez estructural para respuesta transitoria detallada',
  'La construcción de resina de composite de carbono aporta rigidez estructural, con transitorios detallados');
swap('Con 199g, son extremadamente ligeras para sesiones largas', 'Con 199 g, son extremadamente ligeros para sesiones largas');
swap('El cable desmontable bilateral con bloqueo es independiente por canal (L/R)',
  'El cable desmontable de doble entrada con bloqueo es independiente por canal (L/R)');
swap('Fabricadas a mano en la fábrica de Tokio de Audio-Technica', 'Fabricados a mano en la fábrica de Tokio de Audio-Technica');
// SEC5
swap('Neumann destiló su saber de monitores en unos auriculares para quien mezcla de oficio',
  'Neumann plasmó su saber de monitores en unos auriculares para quien mezcla profesionalmente');
swap('resolución de detalle excepcional, imagen estéreo de alta precisión y localización tan filosa que colocas los coros con los ojos cerrados',
  'resolución de detalle excepcional, imagen estéreo de alta precisión y localización tan precisa que colocas los coros con los ojos cerrados');
swap('Su impedancia moderada se mueve mucho más fácil que las referencias clásicas de alta impedancia, así que basta una buena interfaz',
  'Su impedancia moderada se alimenta mucho más fácil que las referencias clásicas de alta impedancia, así que basta una buena interfaz');
swap('Las pilas densas de pistas paneadas en estos conservan cada capa en su sitio',
  'Las mezclas densas de pistas panoramizadas conservan cada capa en su sitio en estos');
swap('Hecho para quien mezcla al detalle y cobra por la precisión de traducción',
  'Hecho para quien mezcla al detalle y vive de la precisión de traslación');
// SEC6
swap('los agudos picantes', 'los agudos estridentes');
swap('Beyerdynamic mantuvo el detalle por encima de 10 kHz y suavizó el pico de 8 kHz que provocaba decisiones duras en el MKI',
  'Beyerdynamic mantuvo el detalle por encima de 10 kHz y suavizó el pico de 8 kHz que obligaba a decisiones difíciles en el MKI');
swap('y los movimientos de EQ siguen siendo honestos', 'y los ajustes de EQ siguen siendo honestos');
swap('con graves profundos y precisos y detalle transitorio microscópico', 'con graves profundos y precisos y detalle en transitorios microscópico');
swap('así que una interfaz, una laptop o incluso un teléfono los mueve bien', 'así que una interfaz, un portátil o incluso un teléfono los alimenta bien');
swap('producción para graves con más cuerpo, mezcla y mastering para planitud analítica', 'producción para graves con más cuerpo, mezcla y mastering para una respuesta plana y analítica');
swap('Con 376 g y diadema de acero son un tanque alemán', 'Con 376 g y diadema de acero aguantan como un tanque alemán');
// SEC7 + heading
swap('Alto desde una laptop: ¿es el DT 900 Pro X el punto ideal del home studio?', 'Alto desde un portátil: ¿es el DT 900 Pro X el punto ideal del home studio?');
swap('Este es el DT 990 Pro, modernizado para como se trabaja de verdad', 'Este es el DT 990 Pro, actualizado a los flujos de trabajo actuales');
swap('Los drivers STELLAR.45 de 48 ohmios dan nivel completo de estudio desde una laptop, una tablet o una interfaz básica',
  'Los drivers STELLAR.45 de 48 ohmios rinden al máximo en estudio desde un portátil, una tablet o una interfaz básica');
swap('manteniendo el escenario abierto y amplio por el que beyerdynamic es conocida',
  'manteniendo el escenario abierto y amplio por el que Beyerdynamic es conocida');
swap('Las almohadillas de velour y la diadema con espuma con memoria mantienen los 345 g cómodos durante horas',
  'Las almohadillas de velour y la diadema con espuma con memoria hacen cómodos sus 345 g durante horas');
swap('La afinación es más plana y calmada que la del viejo DT 990, así las mezclas se traducen sin adivinar los agudos',
  'La afinación es más plana y calmada que la del viejo DT 990, así las mezclas se trasladan sin tener que adivinar los agudos');
// SEC8
swap('El LCD-X cumple ese deber como referencia planar abierta con drivers de 106 mm que entregan reproducción transparente',
  'El LCD-X cumple ese papel como referencia planar abierta, con drivers de 106 mm que ofrecen una reproducción transparente');
swap('La sensibilidad de 103 dB a 20 ohmios mantiene civilizadas las demandas de nivel',
  'La sensibilidad de 103 dB a 20 ohmios mantiene a raya las exigencias de nivel');
swap('y el cable desmontable unilateral simplifica repuestos', 'y el cable desmontable de un solo lado facilita los recambios');
swap('El auricular conviene a ingenieros de mezcla y oyentes críticos tras escucha detallada de referencia para juzgar balance y timbre',
  'Es el auricular para ingenieros de mezcla y oyentes críticos, para escucha detallada de referencia con la que juzgar balance y timbre');
swap('La construcción de 612 gramos pesa en cervicales durante jornadas maratonianas y fuga sonido libremente, así que viajeros más vocalistas que graban y necesitan aislamiento mirarán mejor hacia diseños cerrados',
  'Su construcción de 612 gramos se nota en el cuello en jornadas maratonianas y deja escapar sonido libremente: si viajas o grabas voces y necesitas aislamiento, mira hacia diseños cerrados');
// CONCLUSION
swap('El panorama de auriculares abiertos en 2026 ofrece una profundidad notable en cada rango de precio',
  'El panorama actual de auriculares abiertos ofrece un catálogo notable en cada rango de precio');
swap('Los ATH-R70x aportan precisión profesional con comodidad genuinamente ligera',
  'Los ATH-R70x aportan precisión profesional con una ligereza genuinamente cómoda');
swap('El Neumann NDH 30 es la opción premium cuando necesitas resolución de detalle filosa',
  'El Neumann NDH 30 es la opción premium cuando necesitas una resolución de detalle quirúrgica');
swap('El Beyerdynamic DT 990 Pro aporta un escenario sonoro amplio y espacioso',
  'El Beyerdynamic DT 990 Pro aporta un escenario sonoro amplio y abierto');
swap('El Audeze LCD-X mantiene el detalle planar magnético para puristas',
  'El Audeze LCD-X reserva el detalle planar magnético para puristas');
swap('>Mejores Auriculares de estudio</a>', '>Mejores auriculares de estudio: guía completa</a>');
swap('>Mejores Auriculares Económicos</a>', '>Mejores auriculares de estudio por menos de $150</a>');
swap('>Mejores Auriculares Cerrados</a>', '>Mejores auriculares cerrados para grabar y aislar la voz</a>');
g[g.indexOf(gg)] = JSON.parse(S);
fs.writeFileSync(F, JSON.stringify(g, null, 2) + '\n', 'utf8');
console.log('\naplicados: ' + n + '  fallos: ' + fallos.length);
fallos.forEach(f => console.log('  FALLA: ' + f));
console.log('mojibake: ' + (fs.readFileSync(F, 'utf8').match(/â‚¬|Â£|Â°/g) || []).length);
