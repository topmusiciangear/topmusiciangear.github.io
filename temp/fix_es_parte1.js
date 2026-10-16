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

// INTRO
S(['con precios de nuestro propio catálogo', 'con los precios de nuestro catálogo']);
S(['Los tres pagan ya el tratamiento acústico', 'Los tres incluyen ya el tratamiento acústico']);
// SEC0
S(['Construye esas cinco en ese orden y cada dólar hace un trabajo', 'Construye esas cinco etapas en ese orden y cada dólar hace un trabajo']);
S(['Salta la sala y la interfaz más cara que compres sonará mal igualmente', 'Sáltate la sala y la interfaz más cara sonará mal de todos modos']);
S(['Esas cinco etapas son lo que compra en realidad la tabla de esta guía', 'Esas cinco etapas son lo que en realidad compra la tabla de esta guía']);
S(['Cuando aparezca, aparece en secuencia: interfaz antes que monitores', 'Y cuando llegue más dinero, llegará en este orden: interfaz antes que monitores']);
S(['elimina una tarea que hacías de oído', 'elimina una tarea que antes hacías a oído']);
S(['Un micrófono más bonito no elimina ninguna: solo graba la misma sala con más precisión', 'Un micrófono mejor no elimina ninguna: solo graba la misma sala con más precisión']);
// SEC1
S(['Nada de esa lista es aspiracional', 'Nada de esa lista está de adorno']);
S(['El Nivel 3 por $2.688 es el que duplica el presupuesto', 'El Nivel 3 por $2.688 es el que triplica el presupuesto']);
S(['con un antipop integrado que convierte el filtro antipop opcional de los niveles de abajo en una compra que te puedes ahorrar', 'con un antipop integrado que hace innecesario el filtro antipop opcional de los niveles de abajo']);
S(['Un micrófono de $269 en un dormitorio sin tratar graba el dormitorio', 'Un buen micrófono en un dormitorio sin tratar graba el dormitorio']);
// SEC2
S(['Por qué una interfaz de $299 puede batir a una de $199', 'Por qué una interfaz de $250 puede batir a una de $199']);
S(['quiere que la voz esté presente sin meter EQ', 'quiere que la voz quede al frente sin tocar el EQ']);
S(['la transparencia de la Scarlett gana', 'la transparencia de la Scarlett es la que gana']);
S(['por eso se come $100 más del presupuesto sin sentirse un lujo', 'por eso esos $50 más del presupuesto no se sienten como un lujo']);
S(['Hay un tercer caso, y es el que la gente suele equivocarse', 'Hay un tercer caso, y es en el que la gente suele equivocarse']);
S(['Trata ese botón como una decisión sobre lo que estás grabando', 'Piensa en ese botón como una decisión sobre lo que estás grabando']);
S(['Lo que compra el ciento de dólares extra en la SSL es comodidad que se ve', 'Lo que compran esos cincuenta dólares extra en la SSL es comodidad tangible']);
S(['dos salidas de auriculares para preparar un segundo par', 'dos salidas de auriculares para que dos personas escuchen a la vez']);
S(['Ese es todo el intercambio, y en los dos casos es razonable', 'Esa es toda la diferencia, y en ambos casos es justa']);
// SEC3
S(['no tiene forma de saber cómo va a sonar traducida', 'no puede saber cómo va a trasladarse a otros equipos']);
S(['Lo que compra el tamaño del transductor no es fidelidad, es alcance', 'Lo que te da el tamaño del transductor no es fidelidad, es alcance']);
S(['se mueve en la parte baja del rango que de verdad puedes juzgar', 'trabaja en la parte baja del rango que de verdad puedes juzgar']);
S(['Por debajo de 50 Hz sigue siendo una suposición en un monitor de 5 pulgadas', 'Todo lo que esté por debajo de 50 Hz sigue siendo una suposición en un monitor de 5 pulgadas']);
S(['y es un escalón en tamaño de caja tanto como de transductor', 'y es un salto tanto en tamaño de caja como de transductor']);
S(['El precio es profundidad de escritorio y un monitor de 10.2 kg que necesita distancia respecto a la pared de detrás', 'Lo que pagas es fondo de escritorio: un monitor de 10.2 kg que necesita distancia respecto a la pared de detrás']);
S(['le gana a un par caro contra pladur desnudo', 'suena mejor que un par caro delante de una pared de pladur desnudo']);
// SEC4
S(['Todo lo que hay por debajo en esta guía convierte audio y nada más', 'Todo lo que está por debajo en esta guía convierte audio y nada más']);
S(['y llega con Auto-Gain: la interfaz escucha la entrada', 'y trae Auto-Gain: la interfaz escucha la entrada']);
S(['funciona igual en Mac y en Windows', 'rinde igual en Mac y en Windows']);
S(['siguen viviendo en una tarjeta que tendrías que comprar aparte', 'siguen estando en una tarjeta que tendrías que comprar aparte']);
S(['todo el argumento de esta interfaz se evapora', 'todo el argumento de esta interfaz se viene abajo']);
S(['compra el Volt 276 y guarda la diferencia', 'compra el Volt 276 y quédate con la diferencia']);
// SEC5
S(['y es el único micrófono de esta guía con el nombre de la marca en la cápsula', 'y es el único de esta guía con cápsula Neumann']);
S(['No son cifras de producto insignia, y no pretende serlo', 'No son cifras de buque insignia, y no pretende serlo']);
S(['Sé claro con lo que no es', 'Y seamos claros con lo que no es']);
S(['Lo que hace es estar en la sala, grabar limpio', 'Lo que hace es plantarse en la sala, grabar limpio']);
S(['eso vale más que un nombre más grande', 'eso vale más que un logo más grande']);
// SEC6
S(['el único diseñado alrededor de un problema propio de un dormitorio: escuchas en un escritorio', 'el único pensado para un problema típico de dormitorio: escuchas sentado a un escritorio']);
S(['Los mandos son analógicos y son exactamente tres', 'Tiene tres mandos analógicos, ni uno más']);
S(['para el vecino y para el bombo del vecino', 'para no molestar al vecino, ni siquiera con tu bombo']);
S(['Nada que actualizar y nada que mal configurar', 'Nada que actualizar y nada que puedas configurar mal']);
S(['que es el precio a pagar por un monitor más barato que el micrófono del nivel de arriba', 'a cambio de costar menos que el micrófono del nivel de arriba']);
S(['Debajo hay un woofer de 5.25 pulgadas', 'Dentro hay un woofer de 5.25 pulgadas']);
S(['pero sigue funcionando limpiamente cuando le pides más', 'pero sigue rindiendo limpio cuando le exiges más']);
S(['El límite honesto son esos 102 dB. No va a sonar fuerte una mezcla con mucha percusión sin que la imagen se mueva', 'El límite honesto: esos 102 dB. Una mezcla con mucha percusión no va a sonar fuerte sin que la imagen se mueva']);
S(['cuando te estiras a ajustarlo', 'cuando alargas la mano para ajustarlo']);
// SEC7
S(['Yamaha lleva desde 1997 construyendo este monitor de estudio', 'Yamaha lleva desde 1997 fabricando este monitor de estudio']);
S(['Ese suelo es todo el argumento del nivel superior', 'Ese límite inferior lo es todo en el nivel superior']);
S(['el grave deja de ser una forma y se vuelve peso', 'el grave deja de ser un dibujo y se vuelve peso']);
S(['Dos interruptores analógicos detrás hacen un trabajo poco glamuroso', 'Dos interruptores analógicos en el panel trasero hacen un trabajo poco vistoso']);
S(['HIGH TRIM te da una inclinación de agudos', 'HIGH TRIM te da un ajuste de agudos']);
S(['Ninguna es una función de la que vayas a presumir', 'Ninguna de las dos es una función de la que vayas a presumir']);
S(['Las entradas son XLR y 1/4 TRS, balanceadas o no', 'Entradas XLR y TRS de 1/4, balanceadas o no']);
S(['El precio es físico, y está escrito en la parte de atrás', 'Y el coste es físico: está en la parte de atrás']);
S(['y por eso el HS8 es lo primero de esta guía que se negará a caber en un rincón apretado', 'y por eso el HS8 es lo primero de esta guía que no va a caber en un rincón apretado']);
// SEC8
S(['Todos los tiers de esta guía incluyen paneles acústicos', 'Todos los niveles de esta guía incluyen paneles acústicos']);
S(['las superficies que llegan a tus oídos después del sonido directo', 'el sonido que llega a tus oídos justo después del directo']);
S(['Arregla eso primero, y luego decide si la interfaz es el problema', 'Arregla eso primero, y luego decide si la culpa es de la interfaz']);
// SEC9
S(['En cada montaje te sobra algo de presupuesto, y en qué lo gastas depende estrictamente de lo que vayas a grabar', 'En cada montaje queda un resto de presupuesto, y en qué lo gastas depende de lo que vayas a grabar']);
S(['graba cada consonante oclusiva — la ráfaga de aire de una P o una B', 'capta cada plosiva — la ráfaga de aire de una P o una B']);
S(['sin tener que sacrificar ni disputar las dos entradas que ya tienes', 'sin pelearte por las dos entradas que ya tienes']);
S(['un cable defectuoso que genera zumbidos o atenúa los agudos arruina el rendimiento del micrófono por el que pagaste', 'un cable en mal estado que mete zumbidos o atenúa los agudos echa a perder el micro por el que pagaste']);
S(['El MDR-7506 ya cerró el círculo', 'El MDR-7506 ya te cubre']);
S(['Ponlo en un segundo pack de paneles acústicos: cambiará e impactará mucho más la acústica de tu sala', 'Pon ese dinero en un segundo pack de paneles: mejorará la acústica de tu sala mucho más']);
// SEC10
S(['te dan un potenciómetro de ganancia y te desea suerte', 'te dan un potenciómetro de ganancia y te desean suerte']);
S(['Debajo hay dos preamplificadores de ruido ultrabajo', 'Dentro hay dos preamplificadores de ruido ultrabajo']);
S(['cifras de líder de su categoría para el precio', 'cifras de récord en su gama']);
S(['enchufar una guitarra no significa rodear la caja', 'enchufar una guitarra no te obliga a ir detrás de la caja']);
// SEC11
S(['La 2+ MKII hace una cosa que la Scarlett no puede', 'La 2+ MKII hace algo que la Scarlett no puede']);
S(['se activa un potencienciador modelado', 'se activa un potenciador modelado']);
S(['el botón 4K es un atajo que de otro modo exigiría un compresor', 'el botón 4K es un atajo que si no exigiría un compresor']);
S(['El resto es intendencia: MIDI de entrada y salida', 'El resto son extras: MIDI de entrada y salida']);
S(['para que artista e ingeniero no se peleen un par', 'para que artista e ingeniero no se peleen por un par']);
S(['Con cien dólares más que la Scarlett, la MKII cubre esa diferencia dos veces', 'Con cincuenta dólares más que la Scarlett, la MKII amortiza esa diferencia dos veces']);

fs.writeFileSync(F, JSON.stringify(g, null, 2) + '\n', 'utf8');
console.log('\naplicados: ' + n + '  fallos: ' + fallos.length);
fallos.forEach(f => console.log('  FALLA: ' + f));
console.log('mojibake: ' + (fs.readFileSync(F, 'utf8').match(/â‚¬|Â£|Â°/g) || []).length);
