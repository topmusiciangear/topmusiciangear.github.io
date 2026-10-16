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
// SEC12
S(['el valor más bajo al que llega un condensador de diafragma grande nuevo', 'el registro más bajo que alcanza hoy un condensador de diafragma grande']);
S(['esos sonidos no son información nueva. Son suelo de ruido', 'esos sonidos no son señal. Son ruido de fondo']);
S(['Un micrófono que añade cuatro decibelios propios encima de eso deja menos voz que grabar', 'Un micrófono que añade cuatro decibelios propios encima de eso deja menos sitio para la voz']);
S(['Baja el suelo a cuatro y acabarás mezclando la sala en vez de ahogándote en ella', 'Baja ese suelo a cuatro y acabarás mezclando la sala en vez de pelearte con ella']);
S(['así que el mismo micrófono pasa de una interfaz a un portátil sin adaptadores', 'y el mismo micrófono salta de una interfaz a un portátil sin adaptadores']);
S(['Sigue necesitando phantom de 48 V, sigue siendo pesado', 'Sigue pidiendo phantom de 48 V y sigue siendo un micro pesado']);
S(['su propia ruta USB es la parte más débil de su historia de conversión', 'su propia ruta USB es el eslabón más débil de su cadena de conversión']);
// SEC13
S(['Lo que compras con esos ciento diez dólares frente al 5th Generation', 'La diferencia de ciento diez dólares con el 5th Generation']);
S(['Y también es la mayor parte de la razón por la que el Signature cuesta menos', 'Y esa es también la mayor parte de la razón por la que el Signature cuesta menos']);
S(['Gasta la diferencia en la cápsula y en el silencio', 'Invierte esa diferencia en la cápsula y en el silencio']);
S(['En cuanto empieces a grabar en otro sitio que no sea este escritorio —una sala en directo, un local de ensayo, el estudio de otro', 'En cuanto empieces a grabar fuera de este escritorio —una sala de directo, un local de ensayo, el estudio de otro']);
// SEC14
S(['El ATH-M50x es el auricular de estudio más grabado del mundo, y el motivo no es el bombo: es su negativa a adular', 'El ATH-M50x es el auricular más usado para grabar del mundo, y no por el bombo publicitario: porque se niega a adular']);
S(['Eso suena a falta de características hasta que mezclas con algo coloreado', 'Eso parece falta de funciones hasta que mezclas con algo coloreado']);
S(['hará que una voz dura suene equilibrada', 'hará que una voz áspera suene equilibrada']);
S(['los ingenieros que aprendieron el oficio con él detectan cosas en otros sistemas', 'quien aprendió el oficio con él detecta fallos en otros equipos']);
S(['Y el cable desmontable significa que un cable roto es una sustitución, no una reparación', 'Y con el cable desmontable, un cable roto implica una sustitución, no una reparación']);
// SEC15
S(['existe por un motivo: es la forma más barata', 'existe por una razón: es la forma más barata']);
S(['la misma filosofía de afinación que carga el M50x', 'la misma filosofía de afinación que lleva el M50x']);
S(['Para quien nunca ha mezclado con auriculares de estudio', 'Si nunca has mezclado con auriculares de estudio']);
S(['una interfaz de verdad sin amplificador', 'una interfaz en condiciones sin amplificador']);
S(['que es adonde fue el dinero en vez de al cable', 'que es donde se fue el dinero en lugar del cable']);
S(['Adonde no fue el dinero es a todo lo demás', 'Donde no se fue el dinero es a todo lo demás']);
S(['así que un pelado es un par nuevo', 'así que si se pela, toca par nuevo']);
S(['No hay chasis plegable', 'No se pliega']);
S(['Las almohadillas son finas, lo que se calienta en sesiones largas', 'Las almohadillas son finas y se calientan en sesiones largas']);
S(['no tiene pegada de graves para escuchar solo — lo cual está bien, porque no vas a escuchar con él, vas a trabajar con él', 'no tiene pegada de graves para escuchar música por gusto — y está bien, porque no es para escuchar con él, es para trabajar']);
// SEC16
S(['y no porque sea el mejor auricular. Sino porque es el que nunca se actualiza', 'y no porque sea el mejor, sino porque es el que nunca pasa de moda']);
S(['Si una mezcla pasa en el 7506, pasará en cualquier sitio', 'Si una mezcla suena bien en el 7506, sonará bien en cualquier sitio']);
S(['Eso viene de unos medios adelantados y reveladores', 'Eso se debe a unos medios adelantados y reveladores']);
S(['Cerrado, así que graba voz e instrumentos sin filtrarse hacia el micrófono', 'Al ser cerrado, sirve para grabar voz e instrumentos sin que se cuele al micrófono']);
S(['Plegable, con un chasis que ha sobrevivido mil caídas dentro de una funda', 'Se pliega en plano y aguanta caídas mejor que casi todos']);
S(['Sesenta y tres ohmios piden más salida que la de un portátil, así que puede hacer falta un amplificador pequeño', 'Sus sesenta y tres ohmios necesitan más salida de la que da un portátil, así que puede hacer falta un amplificador pequeño']);
S(['El cable es fijo y va en espiral a tres metros, lo que añade peso y enredo en un escritorio pequeño', 'El cable fijo en espiral de tres metros pesa y se enreda en un escritorio pequeño']);
S(['Cómpralo por lo que te dice de tu mezcla, no por comodidad, y si mezclas de noche, piensa si el M50x te serviría mejor', 'Cómpralo por lo que te dice de tu mezcla, no por comodidad, y si mezclas de noche, plantéate si el M50x te serviría mejor']);
// SEC17
S(['No es una limitación del M50x o del 7506: es física, una copa cerrada no tiene forma de mover aire suficiente', 'No es una limitación del M50x o del 7506: es pura física, una cápsula cerrada no puede mover aire suficiente']);
S(['La caja de siete pulgadas monta un woofer de aramida de Kevlar trenzado de 7 pulgadas', 'La caja monta un woofer de aramida de Kevlar trenzado de 7 pulgadas']);
S(['biamplificado a 145 vatios en total', 'biamplificado a 145 vatios en total']);
S(['Eso es graves de verdad desde un monitor que cabe en un escritorio', 'Eso son graves de verdad desde un monitor que cabe en un escritorio']);
S(['hace que colocarlo cerca de una pared sea menos catastrófico que en un diseño con puerto trasero', 'hace que colocarlo cerca de una pared sea menos problemático que en un diseño con puerto trasero']);
S(['Eso te ahorra comprar paneles que todavía no necesitas', 'Te ahorra comprar paneles que todavía no necesitas']);
S(['es adelantado, y un grave adelantado adula una mezcla que está flaca', 'viene adelantado, y un grave así realza una mezcla falta de graves']);
S(['Tómalo como punto de partida para juzgar, no como palabra final, y mantén los auriculares en rotación para los medios agudos', 'Tómalo como punto de partida, no como veredicto final, y sigue usando los auriculares para los medios agudos']);
// SEC18
S(['Todos los montajes de esta guía incluyen estos paneles, y es la línea menos vistosa del presupuesto', 'Todos los montajes de esta guía incluyen estos paneles: es la partida menos vistosa del presupuesto']);
S(['Cuatro paneles van en las paredes laterales a la altura de las orejas', 'Cuatro paneles van colocados en las paredes laterales a la altura de las orejas']);
S(['después del sonido directo. Absorbe esos rebotes', 'justo después del directo. Absorbe esos rebotes']);
S(['si tienes un problema serio de graves estos son la herramienta equivocada', 'si tienes un problema serio de graves, entonces estos son la herramienta equivocada']);
S(['y esa es la queja que trae a la mayoría de los principiantes a un foro', 'y esa es la queja que más se lee en los foros de principiantes']);
// SEC19
S(['No hay glamour en un soporte de micrófono', 'Un soporte de micrófono no tiene glamour']);
S(['pueda arruinar una toma tan barato', 'pueda arruinar una toma por tan poco dinero']);
S(['Un soporte barato deriva', 'Un soporte barato cede']);
S(['acabas haciendo el comping de unas tomas que nunca fueron inconsistentes', 'acabas haciendo el comping de unas tomas que nunca lo fueron']);
S(['lo bastante pesada como para ignorar el brazo', 'lo bastante pesada como para no notar el brazo']);
S(['Ponle encima el condensador y el micro se queda donde lo pusiste', 'Monta el condensador encima y el micro se queda donde lo pusiste']);
S(['un micrófono pesado sigue necesitando ajuste a mano', 'un micro pesado hay que ajustarlo a mano']);
S(['lo que es incómodo en un rincón estrecho', 'algo incómodo en un rincón estrecho']);
S(['No hay guías de cable, así que el XLR cuelga suelto', 'No trae guías para el cable, así que el XLR cuelga suelto']);
S(['Y cambiar la altura exige las dos manos', 'Y para cambiar la altura necesitas las dos manos']);
S(['Todo eso es aceptable por cincuenta dólares', 'Todo eso es aceptable a ese precio']);
// SEC20
S(['Un micrófono condensador sostenido cerca de una boca graba cada ráfaga', 'Un condensador cerca de la boca capta cada ráfaga']);
S(['como un golpe grave, que es lo que en el taller llaman una plosiva', 'como un golpe grave: lo que los técnicos llaman una plosiva']);
S(['y lo peor es que apaga los agudos del micrófono mientras resuelve el problema', 'y lo peor: apaga los agudos del micro mientras resuelve el problema']);
S(['El Shield GN toma el otro camino', 'El Shield GN opta por otro camino']);
S(['usa una pantalla de acero inoxidable perforada con agujeros HexTech: lo bastante pequeños para romper la ráfaga de aire, lo bastante abiertos para dejar pasar el tono', 'usa una pantalla de acero inoxidable con perforaciones HexTech: tan pequeñas que rompen la ráfaga de aire y tan abiertas que dejan pasar el tono']);
S(['El resultado es un condensador que sigue sonando como condensador después', 'El resultado: un condensador que sigue sonando a condensador']);
S(['El marco se fija a casi cualquier escritorio o pie', 'El marco se sujeta a casi cualquier escritorio o pie']);
S(['Lo que no viene incluido es el brazo o la pinza', 'Lo que no incluye es el brazo ni la pinza']);
S(['y a cuarenta y nueve dólares cuesta más que el micrófono dinámico que protege', 'y con sus cuarenta y nueve dólares sale más caro que muchos de los dinámicos a los que protege']);
S(['Si solo hablas o cantas una vocal española cada vez, puedes saltártelo', 'Si solo grabas tu voz de vez en cuando, te lo puedes saltar']);
// SEC21
S(['El micrófono es lo más caro de la sala', 'El micrófono es lo más valioso de la sala']);
S(['el cable es lo último que nadie sospecha y lo primero que resulta tener razón', 'el cable es lo último de lo que nadie sospecha y lo primero que resulta ser el culpable']);
S(['Los conectores dorados resisten la corrosión', 'Los conectores chapados en oro resisten la corrosión']);
S(['un fallo que produce silencio en vez de zumbido, que es mucho más frustrante de diagnosticar', 'una avería que se traduce en silencio en vez de zumbido, mucho más difícil de localizar']);
S(['No vas a oír el cable', 'No vas a notar el cable']);
S(['ni pérdida de agudos por un conector que se ha puesto verde', 'ni pérdida de agudos por un conector oxidado']);
S(['que es difícil de vender hasta que la primera toma sorda resulta ser oxidación', 'que cuesta justificar hasta que una toma apagada resulta ser cosa de oxidación']);
S(['En ese momento es la reparación más barata del estudio', 'Entonces es la reparación más barata del estudio']);
// CONCLUSION
S(['y las piezas que sí se arrastran —el soporte, el tratamiento acústico— pasan al siguiente montaje sin desperdiciarse', 'y las piezas que sí pasan al siguiente —el soporte, el tratamiento acústico— se aprovechan sin desperdiciar dinero']);
S(['y fingir lo contrario es cómo se acaba comprando dos veces el mismo error', 'y fingir lo contrario es la forma de acabar comprando dos veces el mismo error']);
S(['Vale la pena ser claro sobre qué te da la mejora', 'Merece la pena dejar claro qué ganas con la mejora']);
S(['los dos están en 4 dBA. Pagas por la salida USB y por el carácter de la SSL', 'los dos están en 4 dBA. Lo que pagas es la salida USB y el carácter de la SSL']);
S(['son la herramienta correcta para la hora de la noche en la que realmente trabajas', 'son la herramienta adecuada para esas horas de la noche en las que realmente trabajas']);
S(['Es el montaje que duplica el presupuesto, y es el punto en el que el modelado analógico y una cápsula Neumann dejan de ser lujos', 'Es el montaje que triplica el presupuesto, y es el punto en el que el modelado analógico y una cápsula Neumann dejan de ser lujos']);
S(['mete el dinero en la sala y no en nada de esta lista', 'invierte en la sala antes que en nada de esta lista']);

fs.writeFileSync(F, JSON.stringify(g, null, 2) + '\n', 'utf8');
console.log('\naplicados: ' + n + '  fallos: ' + fallos.length);
fallos.forEach(f => console.log('  FALLA: ' + f));
console.log('mojibake: ' + (fs.readFileSync(F, 'utf8').match(/â‚¬|Â£|Â°/g) || []).length);
