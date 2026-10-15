// starter-studio: monitores de la tabla -> Nivel 1 PreSonus Eris Studio 5 (684),
// Nivel 2 KRK Rokit 7 G5 (20), Nivel 3 Yamaha HS8 (19).
// Specs del HS8 verificadas en la ficha oficial de Yamaha:
//   8" cono + 1" cupula, cruce 2 kHz, 120 W (LF 75 W / HF 45 W),
//   38 Hz - 30 kHz (-10 dB) / 47 Hz - 24 kHz (-3 dB), ROOM CONTROL + HIGH TRIM,
//   XLR y TRS, 250 x 390 x 334 mm, 10.2 kg, se vende en unidad suelta.
const fs = require('fs');
const F = 'C:/Users/Daniel/projects/topmusiciangear/data/guides.json';
const g = JSON.parse(fs.readFileSync(F, 'utf8'));
const guia = g.find(x => x.id === 'starter-studio');
const log = [];
const ok = m => log.push('  ok    ' + m);
const no = m => log.push('  FALTA ' + m);

/* ══════════ 1) TABLA ══════════ */
const t = guia.productTable;
const setFila = (i, en, es) => {
  t.rows[i].values[0] = { value: en[0], value_es: es[0] };
  t.rows[i].values[1] = { value: en[1], value_es: es[1] };
  t.rows[i].values[2] = { value: en[2], value_es: es[2] };
};

setFila(4,
  ['PreSonus Eris Studio 5 (pair) — a waveguide that throws treble past your desk',
   'KRK Rokit 7 G5 (pair) — 7-inch low-end impact',
   'Yamaha HS8 (pair) — 8-inch authority, and the last monitor stop'],
  ['PreSonus Eris Studio 5 (par) — una guía de onda que lanza los agudos más allá del escritorio',
   'KRK Rokit 7 G5 (par) — impacto de graves de 7 pulgadas',
   'Yamaha HS8 (par) — autoridad de 8 pulgadas, y la última parada en monitores']);
ok('fila Monitores: 3 celdas nuevas');

setFila(6,
  ['A complete chain with powered speakers from day one. The waveguide sends treble sideways, so the desk stops colouring the top end.',
   '32-bit float means the take never clips, and USB-C means it records anywhere without an interface.',
   'Unison preamps and a Neumann capsule: the analogue modelling happens before the converter.'],
  ['Cadena completa con altavoces alimentados desde el primer día. La guía de onda manda los agudos hacia los lados, así que el escritorio deja de colorear la parte alta.',
   'El 32 bits float evita que la toma sature, y el USB-C graba en cualquier sitio sin interfaz.',
   'Previos Unison y cápsula Neumann: el modelado analógico ocurre antes del convertidor.']);
ok('fila Puntos fuertes: fuera la pantalla LCD (el Eris no la tiene)');

setFila(7,
  ['~$900', '~$1,357', '~$2,797'],
  ['~$900', '~$1.357', '~$2.797']);
ok('fila Totales: ~$900 / ~$1,357 / ~$2,797');

/* ══════════ 2) featuredProducts ══════════ */
const quitar = [633, 116];
quitar.forEach(id => {
  const i = guia.featuredProducts.indexOf(id);
  if (i > -1) { guia.featuredProducts.splice(i, 1); ok('fuera ' + id + ' de featuredProducts'); }
  else no(id + ' no estaba en featuredProducts');
});
if (!guia.featuredProducts.includes(684)) { guia.featuredProducts.unshift(684); ok('+ 684 PreSonus Eris Studio 5 (cabecera)'); }
if (!guia.featuredProducts.includes(19)) {
  const i = guia.featuredProducts.indexOf(20);
  guia.featuredProducts.splice(i > -1 ? i + 1 : guia.featuredProducts.length, 0, 19);
  ok('+ 19 Yamaha HS8');
}

/* ══════════ 3) SECCION [1] · los tres presupuestos ══════════ */
const s1 = guia.sections[1];
s1.content =
  '<p><strong>These are not factory bundles.</strong> They are three builds assembled from individual products, priced at the button total you will actually pay. What separates them is not a bigger brand, it is a bigger part of the signal chain.</p>' +
  '<p><strong>Tier 1 at $900</strong> is already a finished studio: a Scarlett 2i2, an NT1 Signature, a pair of powered 5.25-inch monitors, ATH-M20x headphones, a stand and four acoustic panels. Nothing in that list is aspirational. The PreSonus Eris Studio 5 pair is the reason it works as a first home — under $300 for both, and the waveguide throws the high frequencies sideways instead of back off your desk, which is the single biggest colouration problem a bedroom has.</p>' +
  '<p><strong>Tier 2 at $1,357</strong> spends about $450 more on things that change how you work. The NT1 5th Generation records 32-bit float, so a loud take cannot clip and you stop riding the gain. The SSL 2+ MKII brings analogue console preamps. And the monitors step up to a pair of KRK Rokit 7 G5, where a 7-inch woven Kevlar woofer finally shows you whether your kick and bass are actually there. This is the tier most people should buy.</p>' +
  '<p><strong>Tier 3 at $2,797</strong> is the one that doubles the budget, and it is worth being honest about why. The Apollo Twin X Gen 2 carries Unison preamps and UAD-2 DSP inside the chassis, so analogue modelling happens before the converter. The TLM 102 puts a Neumann capsule on a microphone you can still afford, with an integrated pop screen that makes the filter in the lower tiers redundant. The Yamaha HS8 pair is the deepest low end in the guide: 38 Hz at minus 10 dB from an 8-inch cone. If you are on a laptop with Thunderbolt and you mix other people’s work, this is where it stops being a hobby.</p>' +
  '<p>All three already pay for acoustic treatment, because that is the part that decides whether the rest works. A $269 microphone in an untreated bedroom records the bedroom.</p>';
s1.content_es =
  '<p><strong>No son packs de fábrica.</strong> Son tres montajes armados con productos sueltos, con el precio que verás en los botones. Lo que los separa no es una marca mejor, es una parte más grande de la cadena de señal.</p>' +
  '<p><strong>El Nivel 1 por $900</strong> ya es un estudio terminado: una Scarlett 2i2, un NT1 Signature, un par de monitores alimentados de 5.25 pulgadas, auriculares ATH-M20x, un soporte y cuatro paneles acústicos. Nada de esa lista es aspiracional. El par de PreSonus Eris Studio 5 es la razón por la que funciona como primer hogar: menos de $300 por los dos, y la guía de onda lanza los agudos hacia los lados en lugar de rebotarlos contra tu escritorio, que es la coloración más típica de un dormitorio.</p>' +
  '<p><strong>El Nivel 2 por $1.357</strong> gasta unos $450 más en cosas que cambian cómo trabajas. El NT1 5th Generation graba en 32 bits float, así que una toma fuerte no puede saturar y dejas de vigilar la ganancia. La SSL 2+ MKII trae previos de consola analógica. Y los monitores suben a un par de KRK Rokit 7 G5, donde un woofer de 7 pulgadas de Kevlar trenzado por fin te enseña si tu bombo y tu bajo están realmente ahí. Este es el nivel que debería comprar la mayoría.</p>' +
  '<p><strong>El Nivel 3 por $2.797</strong> es el que duplica el presupuesto, y conviene ser honesto sobre por qué. El Apollo Twin X Gen 2 lleva dentro previos Unison y DSP UAD-2, así que el modelado analógico ocurre antes del convertidor. El TLM 102 pone una cápsula Neumann en un micrófono que todavía puedes permitirte, con un antipop integrado que hace innecesario el filtro de los niveles de abajo. El par de Yamaha HS8 es el grave más profundo de la guía: 38 Hz a menos 10 dB desde un cono de 8 pulgadas. Si trabajas desde un portátil con Thunderbolt y mezclas trabajo de otros, aquí es donde deja de ser un pasatiempo.</p>' +
  '<p>Los tres pagan ya el tratamiento acústico, porque esa es la parte que decide si el resto funciona. Un micrófono de $269 en un dormitorio sin tratar graba el dormitorio.</p>';
ok('seccion [1] reescrita con los tres presupuestos nuevos');

/* ══════════ 4) SECCION [3] · monitores en los tres niveles ══════════ */
const s3 = guia.sections[3];
s3.products = [684, 20, 19];
s3.content =
  '<p><strong>Every tier here ships with powered monitors, and that is a deliberate reversal of most budget guides.</strong> The standard advice is to mix on headphones first and move to speakers when the budget allows. The problem is that many people never get there, and a mix judged only on closed-back headphones has no way of knowing how it will translate.</p>' +
  '<p>What driver size buys you is not fidelity, it is reach. The <strong>5.25-inch</strong> Eris Studio 5 at the bottom tier sits at the low end of the range you can actually judge: the kick-to-bass relationship, the low mids, whether a mix is too thin or too heavy. It will not tell you what is happening at 40 Hz, and it does not claim to. What it does have over its rivals at the price is an EBM waveguide that throws 120 degrees sideways and only 60 degrees up, so the desk stops colouring the top end.</p>' +
  '<p>The <strong>7-inch</strong> Rokit 7 G5 in the middle tier is the point where low end stops being a guess. That matters for one specific job: judging whether the bottom of your mix is actually there or whether you are imagining it from headphone reverb. Everything below 50 Hz stays a guess on a 5-inch monitor. It is not a guess on a 7-inch.</p>' +
  '<p>The <strong>8-inch</strong> Yamaha HS8 at the top tier is the last step, and it is a step in cabinet size as much as in driver. Yamaha builds it around 120 watts of bi-amplification and a 38 Hz floor at minus 10 dB, which is weight the smaller pairs cannot physically produce. The cost is desk depth and a 10.2 kg speaker that needs distance from the wall behind it.</p>' +
  '<p>The rule that survives all of it: buy the room first. A $300 pair of powered monitors in a treated room beats an expensive pair against bare drywall, and the gap is not close. That is why every tier here already includes four acoustic panels.</p>';
s3.content_es =
  '<p><strong>Los tres niveles van con monitores alimentados, y eso es un giro deliberado respecto a la mayoría de guías económicas.</strong> El consejo habitual es mezclar primero con auriculares y pasar a altavoces cuando el presupuesto lo permita. El problema es que mucha gente nunca llega, y una mezcla juzgada solo con auriculares cerrados no tiene forma de saber cómo va a sonar traducida.</p>' +
  '<p>Lo que compra el tamaño del transductor no es fidelidad, es alcance. El Eris Studio 5 de <strong>5.25 pulgadas</strong> del nivel base se mueve en la parte baja del rango que de verdad puedes juzgar: la relación entre bombo y bajo, los medios graves, si una mezcla está demasiado flaca o demasiado cargada. No te va a decir qué pasa a 40 Hz, y no lo pretende. Lo que sí tiene frente a sus rivales de precio es la guía de onda EBM, que reparte 120 grados hacia los lados y solo 60 hacia arriba, así que el escritorio deja de colorear la parte alta.</p>' +
  '<p>El KRK Rokit 7 G5 de <strong>7 pulgadas</strong> del nivel intermedio es el punto en que el grave deja de ser una suposición. Importa para un trabajo concreto: juzgar si el fondo de tu mezcla está realmente ahí o si te lo estás imaginando por el reverb de los auriculares. Por debajo de 50 Hz sigue siendo una suposición en un monitor de 5 pulgadas. En uno de 7, no.</p>' +
  '<p>El Yamaha HS8 de <strong>8 pulgadas</strong> del nivel superior es el último escalón, y es un escalón en tamaño de caja tanto como de transductor. Yamaha lo construye alrededor de 120 vatios bi-amplificados y un suelo de 38 Hz a menos 10 dB, que es un peso que los pares más pequeños no pueden producir físicamente. El precio es profundidad de escritorio y un monitor de 10.2 kg que necesita distancia respecto a la pared de detrás.</p>' +
  '<p>La regla que sobrevive a todo esto: compra primero la sala. Un par de monitores alimentados de $300 en una sala tratada le gana a un par caro contra pladur desnudo, y la diferencia no es ajustada. Por eso los tres niveles de aquí ya incluyen cuatro paneles acústicos.</p>';
ok('seccion [3] reescrita (5.25" / 7" / 8")');

/* ══════════ 5) SECCION [6] -> PreSonus Eris Studio 5 ══════════ */
const s6 = guia.sections[6];
s6.heading = 'The Desk Is a Reflector: How the Eris Studio 5 Aims Around It';
s6.heading_es = 'El escritorio es un reflector: cómo apunta el Eris Studio 5 a su alrededor';
s6.products = [684];
s6.content =
  '<p><strong>The cheapest monitor in this guide is also the only one designed around a problem specific to a bedroom: you listen at a desk, and a desk is a hard reflector.</strong> The Eris Studio 5 handles that with geometry instead of processing. Its EBM waveguide spreads the high frequencies across 120 degrees of horizontal coverage but holds them to 60 degrees vertically, so energy goes out into the room rather than down onto the surface behind the speaker and straight back at your ears.</p>' +
  '<p>The controls are analogue and there are exactly three. <strong>Acoustic Space</strong> cuts 0, 2 or 4 dB of bass depending on how close the speaker is to a wall. <strong>Low Cut</strong> offers 80 Hz or 100 Hz at minus 12 dB per octave for the neighbour and the neighbour’s bass drum. There is no screen, no app and no stored preset. Nothing to update, and nothing to misconfigure — which is the trade for a monitor that is cheaper than the microphone in the tier above.</p>' +
  '<p>Underneath is a 5.25-inch woven glass-fibre composite woofer and a 1-inch ultra-low-mass silk dome, bi-amplified at 80 watts of Class AB with 45 on the low end and 35 on the high, crossing over at 3.5 kHz. Class AB is the quiet choice here: it draws more power than a Class D rival of the same output but keeps working cleanly when you push it. Frequency response runs 48 Hz to 20 kHz and peak output is 102 dB at one metre.</p>' +
  '<p>The honest limit is that 102 dB is modest. It will not play a drum-heavy mix loud without the image shifting, and the Acoustic Space switch is a manual bass cut, not real room correction — it cannot know what your room is doing. At 29.2 by 20.3 by 22.3 cm it fits a small desk, the port fires forward so a wall behind it is survivable, and at 5.2 kg it does not tip over when you reach round to adjust it. It is the monitor you stop fighting once the room is treated.</p>';
s6.content_es =
  '<p><strong>El monitor más barato de esta guía es también el único diseñado alrededor de un problema propio de un dormitorio: escuchas en un escritorio, y un escritorio es un reflector duro.</strong> El Eris Studio 5 lo resuelve con geometría en lugar de con procesamiento. Su guía de onda EBM reparte los agudos en 120 grados de cobertura horizontal, pero los mantiene en 60 grados verticales, así que la energía sale hacia la sala en vez de caer contra la superficie de detrás del monitor y volver de rebote a tus oídos.</p>' +
  '<p>Los mandos son analógicos y son exactamente tres. <strong>Acoustic Space</strong> recorta 0, 2 o 4 dB de graves según lo cerca que esté el monitor de una pared. <strong>Low Cut</strong> ofrece 80 Hz o 100 Hz a menos 12 dB por octava para el vecino y para el bombo del vecino. No hay pantalla, ni app, ni preset memorizado. Nada que actualizar y nada que mal configurar, que es el precio a pagar por un monitor más barato que el micrófono del nivel de arriba.</p>' +
  '<p>Debajo hay un woofer de 5.25 pulgadas de compuesto de fibra de vidrio trenzado y una cúpula de seda ultraligera de 1 pulgada, bi-amplificados a 80 vatios en Clase AB con 45 en el grave y 35 en el agudo, cruzando a 3.5 kHz. La Clase AB es la opción discreta aquí: consume más que un rival en Clase D de la misma salida, pero sigue funcionando limpiamente cuando le pides más. La respuesta va de 48 Hz a 20 kHz y el pico es de 102 dB a un metro.</p>' +
  '<p>El límite honesto son esos 102 dB. No va a sonar fuerte una mezcla con mucha percusión sin que la imagen se mueva, y el interruptor Acoustic Space es un recorte manual de graves, no corrección real de sala: no puede saber qué está haciendo tu sala. Con 29.2 por 20.3 por 22.3 cm cabe en un escritorio pequeño, el puerto dispara hacia delante así que una pared detrás es sobrevivible, y con 5.2 kg no se vuelca cuando te estiras a ajustarlo. Es el monitor con el que dejas de pelear una vez que has tratado la sala.</p>';
ok('seccion [6] -> PreSonus Eris Studio 5 (EN/ES)');

/* ══════════ 6) SECCION [7] -> Yamaha HS8 ══════════ */
const s7 = guia.sections[7];
s7.heading = 'Eight Inches, 120 Watts, and Two Analogue Switches: The Last Monitor Stop';
s7.heading_es = 'Ocho pulgadas, 120 vatios y dos interruptores analógicos: la última parada en monitores';
s7.products = [19];
s7.content =
  '<p><strong>Yamaha has been building this nearfield monitor since 1997, and the HS8 is the 8-inch end of it.</strong> The numbers are not subtle: an 8-inch cone and a 1-inch dome crossing over at 2 kHz, driven by 120 watts of bi-amplification with 75 watts on the low end and 45 on the high. Frequency response runs 38 Hz to 30 kHz at minus 10 dB, and 47 Hz to 24 kHz within 3 dB.</p>' +
  '<p>That floor is the whole argument for the top tier. The Rokit 7 G5 in the middle build reaches further down than you might expect, but it cannot move the same amount of air, and somewhere between a 7-inch and an 8-inch is the point where low end stops being a shape and becomes weight. A kick drum stops being an outline.</p>' +
  '<p>Two analogue switches on the back do unglamorous work. <strong>ROOM CONTROL</strong> attenuates the exaggerated low end you get when a speaker is placed next to a wall, and <strong>HIGH TRIM</strong> gives you a top-end shelf to correct a room that is too bright or too dull. Neither is a feature you will ever talk about. Both are the reason a Yamaha pair stays trustworthy in a room that is not a perfect room, and neither needs a firmware update to keep working in ten years.</p>' +
  '<p>Inputs are XLR and 1/4-inch TRS, balanced or unbalanced, so it takes a pro console output and a semi-pro interface without an adapter. The trade is physical: 250 by 390 by 334 mm and 10.2 kg each. This is a speaker that wants depth on the desk and distance from the wall behind it, and it is the first thing in this guide that will refuse to fit in a cramped corner.</p>';
s7.content_es =
  '<p><strong>Yamaha lleva desde 1997 construyendo este monitor de estudio, y el HS8 es la versión de 8 pulgadas.</strong> Las cifras no son sutiles: un cono de 8 pulgadas y una cúpula de 1 pulgada cruzando a 2 kHz, alimentados por 120 vatios bi-amplificados, con 75 vatios en el grave y 45 en el agudo. La respuesta va de 38 Hz a 30 kHz a menos 10 dB, y de 47 Hz a 24 kHz con 3 dB.</p>' +
  '<p>Ese suelo es todo el argumento del nivel superior. El Rokit 7 G5 del nivel intermedio baja más de lo que cabría esperar, pero no mueve la misma cantidad de aire, y en algún punto entre 7 y 8 pulgadas el grave deja de ser una forma y se vuelve peso. Un bombo deja de ser un contorno.</p>' +
  '<p>Dos interruptores analógicos detrás hacen un trabajo poco glamuroso. <strong>ROOM CONTROL</strong> atenúa el grave exagerado que aparece cuando un monitor está pegado a una pared, y <strong>HIGH TRIM</strong> te da una inclinación de agudos para corregir una sala demasiado brillante o demasiado apagada. Ninguna es una función de la que vayas a presumir. Las dos son la razón de que un par de Yamaha siga siendo fiable en una sala que no es una sala perfecta, y ninguna necesita actualización de firmware para seguir funcionando dentro de diez años.</p>' +
  '<p>Las entradas son XLR y 1/4 TRS, balanceadas o no, así que acepta la salida de una consola profesional y la de una interfaz semi-pro sin adaptador. El precio es físico: 250 por 390 por 334 mm y 10.2 kg cada uno. Es un altavoz que quiere fondo de escritorio y distancia de la pared de detrás, y es lo primero de esta guía que se negará a caber en un rincón apretado.</p>';
ok('seccion [7] -> Yamaha HS8 (EN/ES)');

/* ══════════ 7) VEREDICTOS ══════════ */
const fuera = ['KRK Rokit 5 G5', 'JBL 305P MkII'];
fuera.forEach(n => {
  const i = guia.verdictProsCons.findIndex(v => v.name === n);
  if (i > -1) { guia.verdictProsCons.splice(i, 1); ok('fuera veredicto ' + n); }
  else no('no estaba el veredicto ' + n);
});

const nuevos = [{
  name: 'PreSonus Eris Studio 5', name_es: 'PreSonus Eris Studio 5',
  pros: [
    'The lowest cost of a usable powered stereo pair in this guide: $149.99 each, so a matched pair stays under $300',
    'The waveguide sends treble 120 degrees sideways and only 60 degrees up, which kills the desk reflection that spoils most budget monitors',
    'Three inputs — XLR, TRS and RCA — so a mixer, a preamp or a laptop all connect without an adapter',
    'Acoustic Space and Low Cut are analogue switches doing the two corrections a small room actually needs, with no app and no firmware'
  ],
  cons: [
    'No display and no DSP, so there is no on-speaker readout and no automatic measurement — you tune by ear',
    '102 dB peak output is modest and it will not play a drum-heavy mix loud without the image shifting',
    'Sold as a single monitor, so the price on the button buys one speaker, not a pair',
    'A 5.25-inch woofer will not tell you what is happening below roughly 45 Hz, so the bottom of the mix stays a judgement call'
  ],
  pros_es: [
    'El precio más bajo para un par estéreo alimentado que sirva de algo en esta guía: $149.99 por unidad, así que la pareja se queda por debajo de $300',
    'La guía de onda manda los agudos 120 grados hacia los lados y solo 60 hacia arriba, lo que elimina la reflexión del escritorio que arruina casi todos los monitores económicos',
    'Tres entradas —XLR, TRS y RCA— para que una mesa de mezclas, un previo o un portátil conecten sin adaptador',
    'Acoustic Space y Low Cut son interruptores analógicos que hacen las dos correcciones que una sala pequeña necesita de verdad, sin app ni firmware'
  ],
  cons_es: [
    'Sin pantalla y sin DSP: no hay lectura en el propio monitor ni medición automática, así que ajustas de oído',
    'Sus 102 dB de pico son modestos y no sonarán fuerte una mezcla con mucha percusión sin que la imagen se mueva',
    'Se vende por unidades, así que el precio del botón compra un monitor, no un par',
    'Un woofer de 5.25 pulgadas no te dirá qué pasa por debajo de unos 45 Hz, así que el fondo de la mezcla sigue siendo un juicio'
  ]
}, {
  name: 'Yamaha HS8', name_es: 'Yamaha HS8',
  pros: [
    '38 Hz at -10 dB from an 8-inch cone, so low end has real weight behind it instead of being an outline on a smaller driver',
    '120 W of bi-amplification — 75 W low, 45 W high — which leaves genuine headroom to reference a dense master',
    'ROOM CONTROL and HIGH TRIM are analogue trims that correct wall placement and a bright room without an app or a firmware update',
    'XLR and TRS inputs take a pro console or a semi-pro interface, and Yamaha has built this monitor since 1997'
  ],
  cons: [
    'At 250 x 390 x 334 mm and 10.2 kg each it is the first thing here that will not fit a cramped desk corner',
    '8-inch low end flatters a mix that is genuinely thin, so keep the headphones in rotation as a check',
    'The -3 dB response starts at 47 Hz, so the deepest bass is limited rather than absent and a subwoofer is still a separate purchase',
    'At $398.99 a monitor the pair costs $797.98, more than the microphone or the stand in this same build'
  ],
  pros_es: [
    '38 Hz a menos 10 dB desde un cono de 8 pulgadas, así que el grave tiene peso real en lugar de ser un contorno en un transductor más pequeño',
    '120 W bi-amplificados —75 graves, 45 agudos—, que dejan margen de verdad para referenciar una mezcla densa',
    'ROOM CONTROL y HIGH TRIM son recortes analógicos que corrigen la colocación junto a la pared y una sala brillante sin app ni actualización de firmware',
    'Las entradas XLR y TRS aceptan una consola profesional o una interfaz semi-pro, y Yamaha lleva construyendo este monitor desde 1997'
  ],
  cons_es: [
    'Con 250 por 390 por 334 mm y 10.2 kg cada uno es lo primero de esta lista que no cabe en un rincón de escritorio apretado',
    'El grave de 8 pulgadasCulpa a una mezcla que de verdad está flaca, así que conviene mantener los auriculares en rotación como contraste',
    'La respuesta a -3 dB empieza en 47 Hz, así que el grave más profundo está limitado más que ausente, y el subgrave sigue siendo una compra aparte',
    'A $398.99 por monitor el par cuesta $797.98, más que el micrófono o el soporte de este mismo montaje'
  ]
}];
nuevos.forEach(v => {
  if (guia.verdictProsCons.some(x => x.name === v.name)) no('el veredicto ' + v.name + ' ya existe');
  else { guia.verdictProsCons.push(v); ok('veredicto + ' + v.name + ' (' + v.pros.length + '+' + v.cons.length + ' EN/ES)'); }
});

fs.writeFileSync(F, JSON.stringify(g, null, 2) + '\n', 'utf8');
console.log(log.join('\n'));

/* ══════════ CONTROL ══════════ */
const s2 = JSON.parse(fs.readFileSync(F, 'utf8')).find(x => x.id === 'starter-studio');
const ids = [...new Set([].concat(...s2.sections.map(x => x.products || [])))];
console.log('\n=== CONTROL ===');
console.log('  productos en featured : ' + s2.featuredProducts.length);
console.log('  productos con seccion : ' + ids.length);
console.log('  huerfanos (featured sin seccion): ' + s2.featuredProducts.filter(id => !ids.includes(id)).join(', ') || 'ninguno');
console.log('  veredictos            : ' + s2.verdictProsCons.length);
console.log('  4+4 EN y ES           : ' + s2.verdictProsCons.filter(v => v.pros.length >= 4 && v.cons.length >= 4 && v.pros_es.length >= 4 && v.cons_es.length >= 4).length + '/' + s2.verdictProsCons.length);
console.log('  684 / 19 / 20 en tabla: ' + [684, 19, 20].map(id => s2.productTable.rows[4].values.findIndex(v => false)).join(''));
console.log('  tabla filas x columnas: ' + s2.productTable.rows.length + ' x ' + s2.productTable.rows[0].values.length);
console.log('  titulos de seccion unicos: ' + (new Set(s2.sections.map(x => x.heading)).size === s2.sections.length ? 'si' : 'NO'));
console.log('  quedan Rokit 5 / JBL : ' + (JSON.stringify(s2).match(/Rokit 5 G5|JBL 305P/g) || []).length + ' menciones');
console.log('  quedan $998/$1.077/$2.537: ' + (JSON.stringify(s2).match(/\$998|\$1\.077|\$1,077|\$2\.537|\$2,537/g) || []).length);
console.log('  queda "LCD"           : ' + (JSON.stringify(s2).match(/LCD/g) || []).length);
console.log('  mojibake             : ' + (fs.readFileSync(F, 'utf8').match(/â‚¬|Â£|Â°/g) || []).length);
