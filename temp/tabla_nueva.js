// Tabla nueva de 8 filas + prosa actualizada de los tres montajes
const fs = require('fs');
const BASE = 'C:/Users/Daniel/projects/topmusiciangear/';
const F = BASE + 'data/guides.json';
const g = JSON.parse(fs.readFileSync(F, 'utf8'));
const guia = g.find(x => x.id === 'starter-studio');
const arr = JSON.parse(fs.readFileSync(BASE + 'data/products.json', 'utf8'));
const list = Array.isArray(arr) ? arr : arr.products;
const byId = {}; list.forEach(p => byId[p.id] = p);
const log = [];
const ok = m => log.push('  ok  ' + m);
const no = m => log.push('  FALTA  ' + m);

const col = (en, es) => ({ value: en, value_es: es });
const fila = (label, label_es, vs) => ({ label, label_es, values: vs });

/* ═══ 1) TABLA ═══ */
const t = guia.productTable;
t.columns = [
  { title: 'Tier 1: Essential', title_es: 'Nivel 1: Esencial' },
  { title: 'Tier 2: Pro Producer (Recommended)', title_es: 'Nivel 2: Productor Pro (recomendado)' },
  { title: 'Tier 3: The Definitive Studio', title_es: 'Nivel 3: El estudio definitivo' }
];

t.rows = [
  fila('User Profile', 'Perfil de usuario', [
    col('The one who wants a finished studio with real speakers without touching their savings.',
        'El que quiere un estudio terminado con altavoces de verdad sin rematar cada ahorro.'),
    col('The producer who mixes, travels and sells instrumentals or audio services.',
        'El productor que mezcla, viaja y vende instrumentales o servicios de audio.'),
    col('The engineer who masters for streaming and wants physical low end in the room.',
        'El ingeniero que masteriza para plataformas y quiere graves físicos en la sala.')
  ]),

  fila('Audio Interface', 'Interfaz de audio', [
    col('Focusrite Scarlett 2i2 4th Gen', 'Focusrite Scarlett 2i2 4th Gen'),
    col('SSL 2+ MKII — analogue 4K preamps', 'SSL 2+ MKII — previos analógicos 4K'),
    col('SSL 2+ MKII — 32-bit converters', 'SSL 2+ MKII — convertidores de 32 bits')
  ]),

  fila('Main Microphone', 'Micrófono principal', [
    col('Rode NT1 Signature (pure XLR)', 'Rode NT1 Signature (XLR puro)'),
    col('Rode NT1 Signature (pure XLR)', 'Rode NT1 Signature (XLR puro)'),
    col('Rode NT1 5th Gen (USB/XLR hybrid, 32-bit float)', 'Rode NT1 5th Gen (híbrido USB/XLR, 32 bits float)')
  ]),

  fila('Headphones', 'Auriculares', [
    col('Audio-Technica ATH-M20x — basic isolation', 'Audio-Technica ATH-M20x — aislamiento básico'),
    col('Audio-Technica ATH-M50x — the modern reference', 'Audio-Technica ATH-M50x — la referencia moderna'),
    col('Sony MDR-7506 — the clinical loupe for catching errors', 'Sony MDR-7506 — la lupa clínica para cazar errores')
  ]),

  fila('Studio Monitors', 'Monitores de estudio', [
    col('KRK Rokit 5 G5 (pair) — the king of small rooms', 'KRK Rokit 5 G5 (par) — el rey de las habitaciones'),
    col('JBL 305P MkII (pair) — three-dimensional stereo image', 'JBL 305P MkII (par) — imagen estéreo tridimensional'),
    col('KRK Rokit 7 G5 (pair) — 7-inch low-end impact', 'KRK Rokit 7 G5 (par) — impacto de graves de 7 pulgadas')
  ]),

  fila('Acoustic Treatment', 'Tratamiento acústico', [
    col('G4M Squarewave panels (4-pack)', 'Paneles G4M Squarewave (paquete de 4)'),
    col('G4M Squarewave panels (4-pack)', 'Paneles G4M Squarewave (paquete de 4)'),
    col('G4M Squarewave panels (4-pack)', 'Paneles G4M Squarewave (paquete de 4)')
  ]),

  fila('Standout Strengths', 'Puntos fuertes', [
    col('A complete chain with powered speakers from day one. Rear LCD on every monitor.',
        'Cadena completa con altavoces alimentados desde el primer día. Pantalla LCD en cada monitor.'),
    col('Pure acoustic accuracy. The sweet spot for balancing frequencies without fighting the bass.',
        'Precisión acústica pura. El punto ideal para equilibrar frecuencias sin pelear con el grave.'),
    col('The complete ecosystem. 145 watts per monitor without distortion.',
        'El ecosistema completo. 145 vatios por monitor sin distorsión.')
  ]),

  fila('Estimated Cost', 'Inversión estimada', [
    col('~$1,003', '~$1.003'),
    col('~$1,113', '~$1.113'),
    col('~$1,393', '~$1.393')
  ])
];
ok('tabla reescrita: 8 filas x 3 columnas');

// verificar los totales
const CALC = [[15, 297, 609, 58, 170, [633, 2]], [18, 297, 25, 58, 170, [116, 2]], [18, 3, 26, 58, 170, [20, 2]]];
CALC.forEach((items, c) => {
  let s = 0;
  items.forEach(it => { s += Array.isArray(it) ? byId[it[0]].price * it[1] : byId[it].price; });
  const puesto = parseInt(t.rows[t.rows.length - 1].values[c].value.replace(/[^0-9]/g, ''), 10);
  (Math.round(s) === puesto ? ok : no)('total col ' + (c + 1) + ': calculado $' + Math.round(s) + ', en la tabla ~$' + puesto);
});

/* ═══ 2) PROSA: la seccion de presupuestos ═══ */
const s1 = guia.sections.find(s => (s.heading_es || '').indexOf('Los tres presupuestos') > -1);
if (s1) {
  s1.heading = 'The Three Budgets: What Each Tier Actually Buys';
  s1.heading_es = 'Los tres presupuestos: qué compra cada nivel';
  s1.content =
    '<p><strong>These are not factory bundles.</strong> They are three builds assembled from individual products, each one priced from our own catalogue and each one verifiable on the shelf. What separates them is not a better brand, it is a bigger part of the signal chain.</p>' +
    '<p><strong>Tier 1 at $1,003</strong> is already a finished studio: a Scarlett 2i2, an NT1 Signature, a pair of powered 5-inch monitors, ATH-M20x headphones, a stand and four acoustic panels. Nothing in that list is aspirational. The KRK Rokit 5 G5 pair is the reason it works as a first home: powered, with a rear LCD you can re-aim for the corner it ends up in.</p>' +
    '<p><strong>Tier 2 at $1,113</strong> spends the extra $110 on two things that change how you work rather than what you hear: the SSL 2+ MKII with its analogue 4K preamps, and the ATH-M50x as a proper mixing reference. The monitors change too — the JBL 305P MkII pair swaps in a waveguide, and the sweet spot gets noticeably wider. This is the tier most people should buy.</p>' +
    '<p><strong>Tier 3 at $1,393</strong> is the same interface and the same monitor class, with two upgrades: the NT1 5th Generation for a quieter floor and native USB, and a KRK Rokit 7 G5 pair, which is where most of the extra $280 goes. Seven inches is not marketing. It is the difference between judging a kick and guessing at one.</p>' +
    '<p>All three already pay for acoustic treatment, because that is the part that decides whether the rest works. A $269 microphone in an untreated bedroom records the bedroom.</p>';
  s1.content_es =
    '<p><strong>No son packs de fábrica.</strong> Son tres montajes armados con productos sueltos, cada uno con precio de nuestro propio catálogo y cada uno verificable en el estante. Lo que los separa no es una marca mejor, es una parte más grande de la cadena de señal.</p>' +
    '<p><strong>El Nivel 1 por $1.003</strong> ya es un estudio terminado: una Scarlett 2i2, un NT1 Signature, un par de monitores alimentados de 5 pulgadas, auriculares ATH-M20x, un soporte y cuatro paneles acústicos. Nada de esa lista es aspiracional. El par de KRK Rokit 5 G5 es la razón por la que funciona como primer hogar: van alimentados y con una pantalla LCD trasera que puedes reorientar según la esquina en la que acaben.</p>' +
    '<p><strong>El Nivel 2 por $1.113</strong> gasta los $110 de más en dos cosas que cambian cómo trabajas, no lo que oyes: la SSL 2+ MKII con sus previos analógicos 4K y los ATH-M50x como referencia de mezcla de verdad. Los monitores también cambian: el par de JBL 305P MkII trae una guía de onda y la zona de escucha se ensancha claramente. Este es el nivel que debería comprar la mayoría.</p>' +
    '<p><strong>El Nivel 3 por $1.393</strong> usa la misma interfaz y la misma gama de monitores, con dos subidas: el NT1 5th Generation por un suelo de ruido más bajo y USB nativo, y un par de KRK Rokit 7 G5, que es donde se van casi los $280 de diferencia. Siete pulgadas no es marketing: es la diferencia entre juzgar un bombo y adivinarlo.</p>' +
    '<p>Los tres pagan ya el tratamiento acústico, porque esa es la parte que decide si el resto funciona. Un micrófono de $269 en un dormitorio sin tratar graba el dormitorio.</p>';
  ok('seccion de presupuestos reescrita (EN + ES)');
} else no('no encontre la seccion de presupuestos');

/* ═══ 3) la seccion de monitores ═══ */
const sMon = guia.sections.find(s => (s.heading_es || '').indexOf('Monitores que no puedes ignorar') > -1);
if (sMon) {
  sMon.heading = 'Monitors in Every Tier: What Size Does What';
  sMon.heading_es = 'Monitores en los tres niveles: qué hace cada tamaño';
  sMon.content =
    '<p><strong>Every tier here ships with powered monitors, and that is a deliberate reversal of most budget guides.</strong> The standard advice is to mix on headphones first and move to speakers when the budget allows. The problem is that many people never get there, and a mix judged only on closed-back headphones has no way of knowing how it will translate.</p>' +
    '<p>What speaker size buys you is not fidelity, it is reach. The <strong>5-inch</strong> pair sits at the bottom of the audible range you can actually judge: kick and bass relationship, the low mids, whether a mix is too thin or too heavy. It will not tell you what is happening at 40 Hz, and it does not claim to. Two 5-inch options sit at either end of the three tiers, and they are not interchangeable — the KRK Rokit 5 G5 gives you a rear LCD and three voicing modes, while the JBL 305P MkII gives you a waveguide and a much wider sweet spot. Pick for your room, not for the spec sheet.</p>' +
    '<p>The <strong>7-inch</strong> pair at the top tier is the only thing in this guide that reproduces low end with physical force. That matters for one specific job: judging whether the bottom of your mix is actually there or whether you are imagining it from headphone reverb. Everything below 50 Hz stays a guess on a 5-inch. It is not a guess on a 7-inch.</p>' +
    '<p>The rule that survives all of it: buy the room first. A $199 pair of powered monitors in a treated room beats an expensive pair against bare drywall, and the gap is not close. That is why every tier here already includes four acoustic panels.</p>';
  sMon.content_es =
    '<p><strong>Los tres niveles van con monitores alimentados, y eso es un giro deliberado respecto a la mayoría de guías económicas.</strong> El consejo habitual es mezclar primero con auriculares y pasar a altavoces cuando el presupuesto lo permita. El problema es que mucha gente nunca llega, y una mezcla juzgada solo con auriculares cerrados no tiene forma de saber cómo va a sonar traducida.</p>' +
    '<p>Lo que compra el tamaño del monitor no es fidelidad, es alcance. El par de <strong>5 pulgadas</strong> se mueve en la parte baja del rango que de verdad puedes juzgar: la relación entre bombo y bajo, los medios graves, si una mezcla está demasiado flaca o demasiado cargada. No te va a decir qué pasa a 40 Hz, y no lo pretende. Hay dos opciones de 5 pulgadas en los tres niveles, y no son intercambiables: el KRK Rokit 5 G5 te da pantalla LCD y tres modos de voz, mientras que el JBL 305P MkII te da guía de onda y una zona de escucha mucho más ancha. Elige por tu sala, no por la ficha técnica.</p>' +
    '<p>El par de <strong>7 pulgadas</strong> del nivel superior es lo único de esta guía que reproduce graves con fuerza física. Importa para un trabajo concreto: juzgar si el fondo de tu mezcla está realmente ahí o si te lo estás imaginando por el reverb de los auriculares. Por debajo de 50 Hz sigue siendo una suposición en un monitor de 5 pulgadas. En uno de 7, no.</p>' +
    '<p>La regla que sobrevive a todo esto: compra primero la sala. Un par de monitores alimentados de $199 en una sala tratada le gana a un par caro contra pladur desnudo, y la diferencia no es ajustada. Por eso los tres niveles de aquí ya incluyen cuatro paneles acústicos.</p>';
  sMon.products = [20, 25, 26, 609, 633, 116];
  ok('seccion de monitores reescrita + productos actualizados');
} else no('no encontre la seccion de monitores');

fs.writeFileSync(F, JSON.stringify(g, null, 2) + '\n', 'utf8');
console.log(log.join('\n'));
console.log('\nmojibake: ' + (fs.readFileSync(F, 'utf8').match(/â‚¬|Â£|Â°/g) || []).length);
