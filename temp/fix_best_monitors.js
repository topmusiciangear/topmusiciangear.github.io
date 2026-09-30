// Fix best-monitors guide: remove 7050C intruder (id 338), fix wrong section
// product links (IN-8 -> 199, KH80 -> 305), complete table/pros-cons/FAQ/
// verdict/conclusion/sections for the 12-product roster, S-ART -> X-ART.
const fs = require('fs');
const G = JSON.parse(fs.readFileSync('data/guides.json', 'utf8'));
const P = JSON.parse(fs.readFileSync('data/products.json', 'utf8'));
const g = G.find(x => x.id === 'best-monitors');
if (!g) throw new Error('guide not found');

const rep = (s, a, b) => s.split(a).join(b);

// --- 1. section product-link fixes + intruder removal ---
// s1 JBL: drop 331 cross-link (331 gets its own section now)
g.sections[1].products = [116];
// s6 IN-8 V2 section wrongly linked LP-6 (117)
g.sections[6].products = [199];
// s8 Neumann section: drop A7V cross-link + 7050C intruder
g.sections[8].products = [305];

// --- 2. A7V S-ART -> X-ART (official ADAM spec) ---
g.sections[5].content = rep(g.sections[5].content, "Adam's-ART folded ribbon tweeter", "ADAM's handmade X-ART ribbon tweeter");
g.sections[5].content_es = rep(g.sections[5].content_es, "cinta plegada S-ART de Adam", "cinta X-ART de ADAM");
const a7v = g.verdictProsCons.find(v => v.name === 'Adam Audio A7V');
a7v.pros[0] = rep(a7v.pros[0], 'S-ART folded ribbon tweeter', 'X-ART ribbon tweeter');
a7v.pros_es[0] = rep(a7v.pros_es[0], 'cinta plegada S-ART', 'cinta X-ART');
g.featuredSnippet.faq_a5_en = rep(g.featuredSnippet.faq_a5_en, 'S-ART folded ribbon tweeter', 'X-ART ribbon tweeter');
g.featuredSnippet.faq_a5_es = rep(g.featuredSnippet.faq_a5_es, 'cinta plegada S-ART', 'cinta X-ART');
// table tweeter: official equiv. diaphragm diameter is 2"
const twRow = g.productTable.rows.find(r => r.label === 'Tweeter');
twRow.values[4] = { value: '2" X-ART ribbon', value_es: 'Cinta X-ART de 2"' };

// --- 3. productTable: 4 new columns ---
const V = (value, value_es) => ({ value, value_es });
g.productTable.columns.push(
  { title: 'Genelec 8351B', title_es: 'Genelec 8351B' },
  { title: 'Kali Audio WS-6.2', title_es: 'Kali Audio WS-6.2' },
  { title: 'Kali Audio IN-UNF', title_es: 'Kali Audio IN-UNF' },
  { title: 'Kali Audio LP-UNF', title_es: 'Kali Audio LP-UNF' }
);
const rows = {};
g.productTable.rows.forEach(r => { rows[r.label] = r; });
rows['Best For'].values.push(
  V('High-end coaxial reference', 'Referencia coaxial de gama alta'),
  V('Compact sub for small monitors', 'Sub compacto para monitores pequeños'),
  V('Ultra-nearfield desktop system', 'Sistema de escritorio ultra-cercano'),
  V('Compact desktop stereo pair', 'Par estéreo compacto de escritorio')
);
rows['Type'].values.push(
  V('3-way coaxial powered', 'Coaxial de 3 vías amplificado'),
  V('Powered subwoofer', 'Subwoofer amplificado'),
  V('3-way system powered', 'Sistema amplificado de 3 vías'),
  V('2-way pair powered', 'Par amplificado de 2 vías')
);
rows['Woofer'].values.push(
  V('Dual 8.6 x 4 in obround', 'Doble de 8,6 x 4 pulg (oblongo)'),
  V('2 x 6.5"', '2 x 6,5"'),
  V('2 x 4.5"', '2 x 4,5"'),
  V('4.5"', '4,5"')
);
rows['Tweeter'].values.push(
  V('1" metal dome (coaxial)', 'Cúpula metálica de 1" (coaxial)'),
  V('N/A', 'N/D'),
  V('1" textile dome', 'Cúpula de tela de 1"'),
  V('1" textile dome', 'Cúpula de tela de 1"')
);
rows['Power'].values.push(
  V('550W (250W + 150W + 150W)', '550W (250W + 150W + 150W)'),
  V('400W RMS (1000W peak)', '400W RMS (1000W pico)'),
  V('320W (2 x 100W + 2 x 60W)', '320W (2 x 100W + 2 x 60W)'),
  V('160W (2 x 40W + 2 x 40W)', '160W (2 x 40W + 2 x 40W)')
);
rows['Frequency Response'].values.push(
  V('38 Hz – 20 kHz (±1.5 dB)', '38 Hz – 20 kHz (±1,5 dB)'),
  V('31.5 Hz – 180 Hz (±3 dB)', '31,5 Hz – 180 Hz (±3 dB)'),
  V('47 Hz – 21 kHz (±3 dB)', '47 Hz – 21 kHz (±3 dB)'),
  V('54 Hz – 21 kHz (±3 dB)', '54 Hz – 21 kHz (±3 dB)')
);
rows['Max SPL'].values.push(V('113 dB', '113 dB'), V('120 dB', '120 dB'), V('103 dB', '103 dB'), V('103 dB', '103 dB'));
rows['Dimensions'].values.push(
  V('17.9 x 11.3 x 11 in', '45,4 x 28,7 x 27,8 cm'),
  V('14.5 x 12.2 x 11 in', '36,8 x 31 x 27,9 cm'),
  V('11.6 x 19.4 x 5.25 in (bass unit)', '29,4 x 49,4 x 13,3 cm (unidad de graves)'),
  V('10 x 6.5 x 7.4 in (each)', '25,4 x 16,4 x 18,6 cm (cada uno)')
);

// --- 4. verdictProsCons: 4 new entries ---
g.verdictProsCons.push(
  { name: 'Genelec 8351B', name_es: 'Genelec 8351B',
    pros: ['True coaxial point source with concealed dual woofers for pinpoint imaging', '550W Class D tri-amplification with 113 dB short-term output', 'GLM AutoCal room calibration adapts the response to any space', '38 Hz to 20 kHz within ±1.5 dB — reference-grade accuracy'],
    cons: ['Costs more than the other eight monitors in this guide combined', 'Overkill for untreated bedrooms and small desks'],
    pros_es: ['Fuente puntual coaxial real con woofers duales ocultos para imagen de precisión', 'Triamplificación clase D de 550W con 113 dB de salida a corto plazo', 'La calibración de sala GLM AutoCal adapta la respuesta a cualquier espacio', 'De 38 Hz a 20 kHz dentro de ±1,5 dB — precisión de grado de referencia'],
    cons_es: ['Cuesta más que los otros ocho monitores de esta guía juntos', 'Excesivo para dormitorios sin tratar y escritorios pequeños'] },
  { name: 'Kali Audio WS-6.2', name_es: 'Kali Audio WS-6.2',
    pros: ['Opposed 6.5-inch woofers cancel vibration — deep bass with no cabinet rattle', '120 dB max SPL down to 27 Hz from a compact front-ported box', '80 Hz / LFE / external crossover plus polarity inversion pair with any monitors', '400W RMS (1000W peak) Class-D headroom'],
    cons: ['It is a subwoofer — you still need a monitor pair on top', 'Adds another box, another cable run and another cost'],
    pros_es: ['Los woofers opuestos de 6,5 pulgadas cancelan la vibración — graves profundos sin traqueteo del gabinete', '120 dB de SPL máximo hasta 27 Hz desde una caja compacta con puerto frontal', 'Cruce de 80 Hz / LFE / externo más inversión de polaridad para emparejar con cualquier monitor', 'Headroom clase D de 400W RMS (1000W pico)'],
    cons_es: ['Es un subwoofer — sigues necesitando un par de monitores encima', 'Añade otra caja, otro cableado y otro coste'] },
  { name: 'Kali Audio IN-UNF', name_es: 'Kali Audio IN-UNF',
    pros: ['Purpose-built ultra-nearfield system: bass unit plus ear-level coaxial satellites', 'Real 47 Hz–21 kHz bass at arm\u2019s length with no subwoofer and no excited room modes', '320W Class D with USB-C, optical and TRS inputs for any desktop source', 'Desk-friendly design for cramped, untreated workspaces'],
    cons: ['Designed for 0.8-meter listening — not room monitors', 'Overkill and over-complex for casual listening'],
    pros_es: ['Sistema ultra-cercano diseñado a propósito: unidad de graves más satélites coaxiales a la altura del oído', 'Graves reales de 47 Hz a 21 kHz a distancia de brazo sin subwoofer y sin excitar modos de sala', '320W clase D con entradas USB-C, óptica y TRS para cualquier fuente de escritorio', 'Diseño apto para escritorios apretados y sin tratar'],
    cons_es: ['Diseñado para escucha a 0,8 metros — no son monitores de sala', 'Excesivo y demasiado complejo para escucha casual'] },
  { name: 'Kali Audio LP-UNF', name_es: 'Kali Audio LP-UNF',
    pros: ['Front-ported compact pair that works against walls and screens', 'Boundary EQ plus 3-D imaging waveguide widen the sweet spot on a desk', 'USB-C, Bluetooth 5.1, RCA and TRS cover every source', 'Genuine 103 dB monitoring that undercuts much compact competition'],
    cons: ['Small drivers limit output — will not fill a room', 'Bluetooth is convenient, not for critical mixing'],
    pros_es: ['Par compacto con puerto frontal que funciona pegado a paredes y pantallas', 'Boundary EQ más guía de onda 3-D amplían el punto dulce en el escritorio', 'USB-C, Bluetooth 5.1, RCA y TRS cubren cada fuente', 'Monitoreo genuino de 103 dB por debajo de gran parte de la competencia compacta'],
    cons_es: ['Los drivers pequeños limitan la salida — no llenará una sala', 'El Bluetooth es cómodo, no para mezcla crítica'] }
);

// --- 5. FAQ: migrate to guide.faq (12 entries) ---
const F = (q, a, q_es, a_es) => ({ q, a, q_es, a_es });
g.faq = [
  F('Are the JBL 305P MkII the best budget studio monitors?',
    'For most home studios, yes. The JBL 305P MkII have the Image Control Waveguide that gives a wide, forgiving sweet spot, and a 5-inch woofer that delivers accurate sound for around $149 per speaker. They are the safest, most consistent budget buy and the monitor most small-room owners should start with.',
    '¿Son los JBL 305P MkII los mejores monitores de estudio económicos?',
    'Para la mayoría de home studios, sí. Los JBL 305P MkII tienen el Image Control Waveguide que ofrece un punto dulce amplio y tolerante, y un woofer de 5 pulgadas que entrega sonido preciso por altavoz. Son la compra económica más segura y consistente, y el monitor con el que debería empezar la mayoría de salas pequeñas.'),
  F('What makes the Kali LP-6 V2 good for untreated rooms?',
    'The boundary EQ switches. The Kali Audio LP-6 V2 has physical DIP switches that compensate for desk, wall or corner placement — the biggest low-end problem in home studios. That unique-at-the-price feature lets you fix placement issues without moving furniture or adding treatment, which is why the LP-6 is the smart buy for rooms you cannot acoustically treat.',
    '¿Qué hace que los Kali LP-6 V2 sean buenos para salas sin tratar?',
    'Los interruptores de boundary EQ. Los Kali Audio LP-6 V2 tienen interruptores DIP físicos que compensan la colocación en escritorio, pared o esquina — el mayor problema de graves en home studios. Esa característica única a ese precio te permite corregir problemas de colocación sin mover muebles ni añadir tratamiento, por eso el LP-6 es la compra inteligente para salas que no puedes tratar acústicamente.'),
  F('Are the KRK Rokit 7 G5 good monitors for bedroom producers?',
    'Yes, they are built for that exact user. The KRK Rokit 7 G5 (around $538 a pair) combines Kevlar drivers with a front-firing bass port and DSP room EQ, so bedroom producers can tune the response to their space. The built-in EQ and graphic controls make them more flexible than most monitors in untreated rooms, which is why they are the best-selling monitor among home producers.',
    '¿Son los KRK Rokit 7 G5 buenos monitores para productores de dormitorio?',
    'Sí, están hechos exactamente para ese usuario. El KRK Rokit 7 G5 (unos $538 el par) combina drivers Kevlar con puerto frontal y EQ de sala DSP, así que los productores de dormitorio pueden ajustar la respuesta a su espacio. El EQ integrado y los controles gráficos lo hacen más flexible que la mayoría en salas sin tratar, por eso es el monitor más vendido entre productores caseros.'),
  F('Are the Yamaha HS8 too honest for comfortable mixing?',
    'They are honest on purpose. The Yamaha HS8 (around $798 a pair) delivers the brutally revealing white-cone sound that engineers trust for mix translation — if it sounds good on HS8s, it sounds good everywhere. That honesty also means they expose every flaw and can sound harsh and fatiguing on long sessions. If you want the truth about your mix, the HS8 is the reference; if you want a more flattering sound, look elsewhere.',
    '¿Son las Yamaha HS8 demasiado honestas para mezclar cómodamente?',
    'Son honestas a propósito. Las Yamaha HS8 (unos $798 el par) entregan el sonido brutalmente revelador del cono blanco en el que confían los ingenieros para traducción de mezclas — si suena bien en HS8, suena bien en todas partes. Esa honestidad también significa que exponen cada fallo y pueden sonar duras y cansinas en sesiones largas. Si quieres la verdad sobre tu mezcla, las HS8 son la referencia; si quieres un sonido más halagador, mira en otro sitio.'),
  F('Are the Adam A7V worth it for the ribbon tweeter detail?',
    'If you mix and hear detail for a living, yes. The Adam A7V (around $799 each) uses the X-ART ribbon tweeter that reproduces high frequencies with stunning accuracy and speed, so transients, reverb tails and high-end detail are easy to judge. That ribbon clarity is the main reason to pay more than a standard budget monitor. If your budget is tight, the 305P or LP-6 deliver 80% of the performance for half the price.',
    '¿Merecen la pena los Adam A7V por el detalle del tweeter ribbon?',
    'Si mezclas y oyes el detalle profesionalmente, sí. El Adam A7V (a unos $799 cada uno) usa el tweeter de cinta X-ART que reproduce las altas frecuencias con una precisión y velocidad asombrosas, haciendo fáciles de juzgar transitorios, colas de reverb y detalle en agudos. Esa claridad de cinta es la razón principal para pagar más que un monitor económico estándar. Si el presupuesto es justo, las 305P o LP-6 dan el 80% del rendimiento por la mitad de precio.'),
  F('Is the Kali IN-8 V2 the most accurate monitor in this guide?',
    'For the money, yes. The Kali IN-8 V2 (around $858 a pair) is a true 3-way with a coaxial midrange/tweeter, so it behaves as an acoustic point source with pinpoint imaging and phase coherence you rarely get at any price. The tri-amped 140W system keeps distortion low and the response ruler-flat. It is the closest thing to pro reference accuracy without the pro reference price — and, unlike a $1,000+ monitor, it pays off even in a modestly treated room.',
    '¿Es el Kali IN-8 V2 el monitor más preciso de esta guía?',
    'Por lo que cuesta, sí. El Kali IN-8 V2 (unos $858 el par) es un verdadero sistema de 3 vías con medios/tweeter coaxiales, así que se comporta como una fuente puntual acústica con imagen de precisión y coherencia de fase que rara vez consigues a cualquier precio. El sistema triamplificado de 140W mantiene la distorsión baja y la respuesta ultraplana. Es lo más parecido a la precisión de referencia pro sin el precio de referencia pro — y, a diferencia de otros monitores, rinde incluso en una sala moderadamente tratada.'),
  F('Is the Genelec 8010A worth it with only a 3-inch woofer?',
    'If your priority is accuracy in a tiny space, yes. The 8010A holds ±2.5 dB from 74 Hz to 20 kHz in a die-cast aluminum box that fits anywhere, with ISS auto-standby and Genelec\u2019s unit-to-unit consistency. The trade-off is physics: a 3-inch driver cannot move much air, so bass-heavy work needs a subwoofer, and it is the priciest per-driver monitor here. You pay for precision, not output.',
    '¿Merece la pena el Genelec 8010A con solo un woofer de 3 pulgadas?',
    'Si tu prioridad es la precisión en un espacio diminuto, sí. El 8010A mantiene ±2,5 dB de 74 Hz a 20 kHz en una caja de aluminio fundido que cabe en cualquier sitio, con auto-standby ISS y la consistencia entre unidades de Genelec. La contrapartida es la física: un driver de 3 pulgadas no puede mover mucho aire, así que el trabajo con muchos graves necesita un subwoofer, y es el monitor más caro por driver de esta guía. Pagas por precisión, no por volumen.'),
  F('Does the Neumann KH 80 DSP need the MA 1 microphone kit?',
    'No, it works as an excellent monitor out of the box, but the MA 1 unlocks its full trick: automatic room calibration that flattens the response at your listening position in minutes. The 4-inch driver plus DSP already gives you 53 Hz to 21 kHz within ±1 dB — the most honest small-room response here. Budget for the kit if you want the auto-correction; skip it if you already treat your room.',
    '¿Necesita el Neumann KH 80 DSP el kit de micrófono MA 1?',
    'No, funciona como un monitor excelente nada más sacarlo de la caja, pero el MA 1 desbloquea su mejor truco: calibración automática de sala que aplana la respuesta en tu posición de escucha en minutos. El driver de 4 pulgadas más el DSP ya te dan de 53 Hz a 21 kHz dentro de ±1 dB — la respuesta más honesta para sala pequeña de esta guía. Cuenta con el kit si quieres la corrección automática; prescinde de él si ya tratas tu sala.'),
  F('Who should buy the Genelec 8351B?',
    'Engineers mixing in treated rooms who want endgame coaxial accuracy. The 8351B combines dual concealed woofers with a coaxial midrange/tweeter, 550 W of Class D power, 113 dB short-term output and GLM AutoCal room calibration — 38 Hz to 20 kHz within ±1.5 dB. A single 8351B costs more than the other eight monitors in this guide combined, so for a bedroom studio it is overkill; for a professional room it is the reference.',
    '¿Para quién es el Genelec 8351B?',
    'Para ingenieros que mezclan en salas tratadas y quieren la precisión coaxial definitiva. El 8351B combina woofers duales ocultos con medios/tweeter coaxiales, 550 W de potencia clase D, 113 dB de salida a corto plazo y calibración de sala GLM AutoCal — de 38 Hz a 20 kHz dentro de ±1,5 dB. Un solo 8351B cuesta más que los otros ocho monitores de esta guía juntos, así que para un dormitorio es excesivo; para una sala profesional es la referencia.'),
  F('Does the Kali WS-6.2 only work with Kali monitors?',
    'No. The selectable 80 Hz, LFE and external crossover modes plus polarity inversion let it pair with almost any studio monitors. Its two horizontally opposed 6.5-inch woofers cancel cabinet vibration while delivering 120 dB max SPL down to 27 Hz from a box barely bigger than an 8-inch monitor — 400 W RMS with 1000 W peaks. It is the compact way to add real low end to any small setup.',
    '¿El Kali WS-6.2 solo funciona con monitores Kali?',
    'No. Los modos de cruce seleccionables de 80 Hz, LFE y externo más la inversión de polaridad le permiten emparejarse con casi cualquier monitor de estudio. Sus dos woofers de 6,5 pulgadas opuestos horizontalmente cancelan la vibración del gabinete mientras entregan 120 dB de SPL máximo hasta 27 Hz desde una caja apenas mayor que un monitor de 8 pulgadas — 400 W RMS con picos de 1000 W. Es la forma compacta de añadir graves reales a cualquier setup pequeño.'),
  F('Is the Kali IN-UNF a replacement for normal studio monitors?',
    'On a desk, yes; in a room, no. The IN-UNF is a complete ultra-nearfield system: a bass unit with two opposed 4.5-inch woofers plus coaxial 4-inch mid and 1-inch tweeter satellites at ear level. The 320 W system plays 47 Hz to 21 kHz within ±3 dB at arm\u2019s length with 103 dB peaks — real bass with no subwoofer and no excited room modes. But it is designed for 0.8-meter listening, not for filling a room.',
    '¿Sustituye el Kali IN-UNF a los monitores de estudio normales?',
    'En un escritorio, sí; en una sala, no. El IN-UNF es un sistema ultra-cercano completo: unidad de graves con dos woofers de 4,5 pulgadas opuestos más satélites coaxiales de medios de 4 pulgadas y tweeter de 1 pulgada a la altura del oído. El sistema de 320 W reproduce de 47 Hz a 21 kHz dentro de ±3 dB a distancia de brazo con picos de 103 dB — graves reales sin subwoofer y sin excitar modos de sala. Pero está diseñado para escucha a 0,8 metros, no para llenar una sala.'),
  F('Is the Kali LP-UNF enough for a small apartment desk?',
    'Yes, that is exactly its job. The LP-UNF pair puts a 4.5-inch woofer and 1-inch dome in front-ported boxes you can push against a wall, with Boundary EQ taming desk reflections and USB-C, Bluetooth 5.1, RCA and TRS covering every source. The 160 W system reaches 54 Hz to 21 kHz within ±3 dB at 103 dB max — genuine monitoring, not multimedia speakers. Just don\u2019t expect it to fill a living room.',
    '¿Basta el Kali LP-UNF para un escritorio en un apartamento pequeño?',
    'Sí, ese es exactamente su trabajo. El par LP-UNF monta un woofer de 4,5 pulgadas y un tweeter de cúpula de 1 pulgada en cajas con puerto frontal que puedes pegar a la pared, con Boundary EQ domando las reflexiones del escritorio y USB-C, Bluetooth 5.1, RCA y TRS cubriendo cada fuente. El sistema de 160 W llega de 54 Hz a 21 kHz dentro de ±3 dB con 103 dB máximos — monitoreo de verdad, no altavoces multimedia. Solo no esperes que llene un salón.')
];

// --- 6. new detail sections for the 4 extra products ---
g.sections.push(
  { heading: 'Is the Genelec 8351B the Best High-End Coaxial Monitor?',
    heading_es: '¿Es el Genelec 8351B el mejor monitor coaxial de gama alta?',
    content: '<p><strong>The Genelec 8351B is the endgame monitor of this guide — a three-way coaxial point source that adapts itself to your room.</strong> Two Acoustically Concealed Woofers work through slots at the enclosure edges while the Minimum Diffraction Coaxial driver places a 5-inch midrange and 1-inch metal-dome tweeter on the same axis, all driven by 550W of Class D power (250W + 150W + 150W). GLM AutoCal calibration tunes the response to your space, delivering 38 Hz to 20 kHz within ±1.5 dB and 113 dB short-term output.</p><p><strong>The catch: </strong>a single 8351B costs more than the other eight monitors in this guide combined. Nothing here touches its imaging or consistency, but for an untreated bedroom it is money you cannot hear <a class="guide-link-btn" href="/guides/adam-vs-genelec.html">Adam vs Genelec comparison</a></p>',
    content_es: '<p><strong>El Genelec 8351B es el monitor definitivo de esta guía — una fuente puntual coaxial de 3 vías que se adapta a tu sala.</strong> Dos woofers acústicamente ocultos trabajan a través de ranuras en los bordes del gabinete mientras el driver coaxial de mínima difracción coloca un medio de 5 pulgadas y un tweeter de cúpula metálica de 1 pulgada en el mismo eje, todo impulsado por 550W de potencia clase D (250W + 150W + 150W). La calibración GLM AutoCal ajusta la respuesta a tu espacio, entregando de 38 Hz a 20 kHz dentro de ±1,5 dB y 113 dB de salida a corto plazo.</p><p><strong>El inconveniente: </strong>un solo 8351B cuesta más que los otros ocho monitores de esta guía juntos. Nada aquí iguala su imagen o consistencia, pero para un dormitorio sin tratar es dinero que no podrás oír <a class="guide-link-btn" href="/guides/adam-vs-genelec_es.html">Comparativa Adam vs Genelec</a></p>',
    products: [331] },
  { heading: 'Is the Kali WS-6.2 the Best Compact Studio Subwoofer?',
    heading_es: '¿Es el Kali WS-6.2 el mejor subwoofer compacto de estudio?',
    content: '<p><strong>The Kali WS-6.2 adds genuine sub-bass to small monitors without taking over your room.</strong> Two horizontally opposed 6.5-inch high-excursion woofers cancel each other\u2019s vibration, so the cabinet stays put while a 400W Class-D amplifier (1000W peak) drives them to 120 dB max SPL with extension down to 27 Hz. Selectable 80 Hz, LFE and external crossover modes plus polarity inversion let it blend with almost any monitors, and the front-ported enclosure is barely larger than an 8-inch speaker.</p><p><strong>The catch: </strong>it is a subwoofer, not a monitor — it needs a pair to complete, and it adds another box and another cost to the setup. But if your 5-inch monitors run out of low end, this is the most compact honest fix <a class="guide-link-btn" href="/guides/studio-subwoofers.html">Studio subwoofer guide</a></p>',
    content_es: '<p><strong>El Kali WS-6.2 añade subgraves genuinos a monitores pequeños sin adueñarse de tu sala.</strong> Dos woofers de 6,5 pulgadas de alta excursión opuestos horizontalmente cancelan mutuamente su vibración, así que el gabinete permanece quieto mientras un amplificador clase D de 400W (1000W pico) los impulsa hasta 120 dB de SPL máximo con extensión hasta 27 Hz. Los modos de cruce seleccionables de 80 Hz, LFE y externo más la inversión de polaridad le permiten mezclarse con casi cualquier monitor, y el gabinete con puerto frontal apenas supera a un altavoz de 8 pulgadas.</p><p><strong>El inconveniente: </strong>es un subwoofer, no un monitor — necesita un par que lo complete, y añade otra caja y otro coste al equipo. Pero si tus monitores de 5 pulgadas se quedan sin graves, este es el arreglo honesto más compacto <a class="guide-link-btn" href="/guides/studio-subwoofers_es.html">Guía de subwoofers de estudio</a></p>',
    products: [300] },
  { heading: 'Is the Kali IN-UNF the Best Ultra-Nearfield Desktop System?',
    heading_es: '¿Es el Kali IN-UNF el mejor sistema ultra-cercano de escritorio?',
    content: '<p><strong>The Kali IN-UNF is the only system here designed for listening at arm\u2019s length.</strong> A bass unit with two opposed 4.5-inch woofers sits on your desk while coaxial satellites put a 4-inch midrange and 1-inch tweeter at ear level, all powered by 320W of Class D (100W per woofer channel, 60W per satellite channel). The result is 47 Hz to 21 kHz within ±3 dB with 103 dB peaks at 0.8 meters — real bass with no subwoofer and none of the room modes a traditional monitor excites. USB-C, optical and TRS inputs cover computer, console and interface sources.</p><p><strong>The catch: </strong>it is a desktop system, not room monitors — step back two meters and the magic fades. It is also overkill for casual listening. But if you mix on a cramped desk, nothing else here fits the job <a class="guide-link-btn" href="/guides/monitor-setup.html">Studio monitor setup guide</a></p>',
    content_es: '<p><strong>El Kali IN-UNF es el único sistema de esta guía diseñado para escuchar a distancia de brazo.</strong> Una unidad de graves con dos woofers opuestos de 4,5 pulgadas reposa en tu escritorio mientras los satélites coaxiales colocan un medio de 4 pulgadas y un tweeter de 1 pulgada a la altura del oído, todo alimentado por 320W de clase D (100W por canal de graves, 60W por canal de satélite). El resultado es de 47 Hz a 21 kHz dentro de ±3 dB con picos de 103 dB a 0,8 metros — graves reales sin subwoofer y sin los modos de sala que excita un monitor tradicional. Las entradas USB-C, óptica y TRS cubren ordenador, consola e interfaz.</p><p><strong>El inconveniente: </strong>es un sistema de escritorio, no monitores de sala — retrocede dos metros y la magia se disipa. También es excesivo para escucha casual. Pero si mezclas en un escritorio apretado, nada más aquí encaja en el trabajo <a class="guide-link-btn" href="/guides/monitor-setup_es.html">Guía de configuración de monitores</a></p>',
    products: [304] },
  { heading: 'Is the Kali LP-UNF the Best Compact Desktop Monitor Pair?',
    heading_es: '¿Es el Kali LP-UNF el mejor par de monitores compactos de escritorio?',
    content: '<p><strong>The Kali LP-UNF is the smallest serious monitoring pair in this guide.</strong> Each side packs a 4.5-inch long-excursion woofer and 1-inch textile dome into a front-ported box you can place against a wall, with a 3-D imaging waveguide widening the sweet spot and Boundary EQ taming desk reflections. The bi-amped 160W system (40W + 40W per channel) plays 54 Hz to 21 kHz within ±3 dB up to 103 dB, and USB-C, Bluetooth 5.1, RCA and TRS inputs accept anything from an interface to a phone.</p><p><strong>The catch: </strong>small drivers mean limited output — it will not fill a room or keep up with loud tracking. And Bluetooth is for convenience, not critical listening. For a small apartment desk, though, it undercuts much of the compact competition <a class="guide-link-btn" href="/guides/budget-monitors.html">Best monitors under $500</a></p>',
    content_es: '<p><strong>El Kali LP-UNF es el par de monitoreo serio más pequeño de esta guía.</strong> Cada lado monta un woofer de 4,5 pulgadas de larga excursión y una cúpula textil de 1 pulgada en una caja con puerto frontal que puedes colocar contra la pared, con guía de onda 3-D que amplía el punto dulce y Boundary EQ que doma las reflexiones del escritorio. El sistema biamplificado de 160W (40W + 40W por canal) reproduce de 54 Hz a 21 kHz dentro de ±3 dB hasta 103 dB, y las entradas USB-C, Bluetooth 5.1, RCA y TRS aceptan desde una interfaz hasta un teléfono.</p><p><strong>El inconveniente: </strong>los drivers pequeños limitan la salida — no llenará una sala ni seguirá una grabación fuerte. Y el Bluetooth es cómodo, no para escucha crítica. Para el escritorio de un apartamento pequeño, sin embargo, queda por debajo de gran parte de la competencia compacta <a class="guide-link-btn" href="/guides/budget-monitors_es.html">Mejores monitores por menos de $500</a></p>',
    products: [307] }
);

// --- 7. verdict + conclusion cover all 12 ---
g.verdict = 'Budget? JBL 305P MkII. Value? Kali LP-6 V2. Punch? KRK Rokit 7 G5. Reference? Yamaha HS8. Detail? The Adam A7V X-ART ribbon. Accuracy per dollar? The Kali IN-8 V2 coaxial 3-way. Tiny room? Genelec 8010A. DSP correction? Neumann KH 80 DSP. Endgame? Genelec 8351B. Need low end? The Kali WS-6.2 sub. Desktop-only mixing? The Kali IN-UNF system. Small apartment? The Kali LP-UNF pair.';
g.verdict_es = '¿Presupuesto? JBL 305P MkII. ¿Valor? Kali LP-6 V2. ¿Pegada? KRK Rokit 7 G5. ¿Referencia? Yamaha HS8. ¿Detalle? La cinta X-ART del Adam A7V. ¿Precisión por euro? El 3 vías coaxial Kali IN-8 V2. ¿Sala diminuta? Genelec 8010A. ¿Corrección DSP? Neumann KH 80 DSP. ¿Definitivo? Genelec 8351B. ¿Faltan graves? El sub Kali WS-6.2. ¿Mezcla solo en escritorio? El sistema Kali IN-UNF. ¿Apartamento pequeño? El par Kali LP-UNF.';
g.conclusion = 'Twelve monitors, twelve different answers. The JBL 305P MkII leads the ultra-budget class, the Kali LP-6 V2 is the smartest value with boundary EQ, the KRK Rokit 7 G5 is the do-it-all DSP option, and the Yamaha HS8 stays the honest reference. The Adam A7V X-ART ribbon reveals every transient, the Kali IN-8 V2 brings coaxial 3-way accuracy within reach, the Genelec 8010A proves reference sound fits in a 3-inch box, and the Neumann KH 80 DSP tunes itself to your room. At the top, the Genelec 8351B is the coaxial endgame. And if your space is the problem, the Kali WS-6.2 sub, the IN-UNF desktop system and the LP-UNF compact pair solve it three different ways. Pick the one that matches your room, your budget, and your ears. <p>For more monitor guides, check out <a class="guide-link-btn" href="/guides/budget-monitors.html">Budget studio monitors guide</a> <a class="guide-link-btn" href="/guides/pro-monitors.html">Professional studio monitors guide</a> <a class="guide-link-btn" href="/guides/monitor-setup.html">Studio monitor setup guide</a> <a class="guide-link-btn" href="/guides/studio-subwoofers.html">Studio subwoofer guide</a> and <a class="guide-link-btn" href="/guides/hs8-vs-rokit-7.html">HS8 vs Rokit 7 comparison</a></p>';
g.conclusion_es = 'Doce monitores, doce respuestas distintas. El JBL 305P MkII lidera la clase ultra-económica, el Kali LP-6 V2 es el valor más inteligente con boundary EQ, el KRK Rokit 7 G5 es la opción DSP todo-en-uno y el Yamaha HS8 sigue siendo la referencia honesta. La cinta X-ART del Adam A7V revela cada transitorio, el Kali IN-8 V2 acerca la precisión coaxial de 3 vías, el Genelec 8010A demuestra que el sonido de referencia cabe en una caja de 3 pulgadas y el Neumann KH 80 DSP se ajusta solo a tu sala. En la cima, el Genelec 8351B es el coaxial definitivo. Y si tu espacio es el problema, el sub Kali WS-6.2, el sistema de escritorio IN-UNF y el par compacto LP-UNF lo resuelven de tres formas distintas. Elige el que coincida con tu sala, tu presupuesto y tus oídos. <p>Para más guías de monitores, consulta nuestra <a class="guide-link-btn" href="/guides/budget-monitors_es.html">Guía de monitores económicos</a> <a class="guide-link-btn" href="/guides/pro-monitors_es.html">Guía de monitores profesionales</a> <a class="guide-link-btn" href="/guides/monitor-setup_es.html">Guía de configuración de monitores</a> <a class="guide-link-btn" href="/guides/studio-subwoofers_es.html">Guía de subwoofers de estudio</a> y nuestra <a class="guide-link-btn" href="/guides/hs8-vs-rokit-7_es.html">Comparativa HS8 vs Rokit 7</a></p>';

// --- 8. products.json: A7V desc X-ART + IN-UNF typo ---
const p21 = P.find(x => x.id === 21);
p21.desc = rep(p21.desc, 'S-ART folded ribbon tweeter', 'X-ART ribbon tweeter');
p21.desc_es = rep(p21.desc_es, 'S-ART', 'X-ART');
const p304 = P.find(x => x.id === 304);
p304.desc = rep(p304.desc, "It's and overkill", "It's overkill");

fs.writeFileSync('data/guides.json', JSON.stringify(G, null, 2));
fs.writeFileSync('data/products.json', JSON.stringify(P, null, 2) + '\n');

// --- verification ---
const gg = JSON.parse(fs.readFileSync('data/guides.json', 'utf8')).find(x => x.id === 'best-monitors');
const union = [...new Set(gg.sections.flatMap(s => s.products))];
console.log('union cards (' + union.length + '): ' + union.join(','));
console.log('338 presente: ' + union.includes(338));
console.log('table cols: ' + gg.productTable.columns.length + ' | rows ok: ' + gg.productTable.rows.every(r => r.values.length === gg.productTable.columns.length));
console.log('verdictProsCons: ' + gg.verdictProsCons.length + ' | faq: ' + gg.faq.length + ' | sections: ' + gg.sections.length);
