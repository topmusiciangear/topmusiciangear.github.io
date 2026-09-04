const fs = require('fs');
const fp = 'data/guides.json';
const g = JSON.parse(fs.readFileSync(fp, 'utf8'));
const idx = g.findIndex(v => v.id === 'best-beginner-electric-guitar');
if (idx === -1) { console.error('guide not found'); process.exit(1); }
const x = g[idx];

// ---- SECTIONS ----
// sec0: general beginner section (repurpose, remove pro framing)
const sec0Content = '<p><strong>For a first electric guitar, playability matters more than anything — more than looks, brand, or pickups.</strong> A guitar that is comfortable to hold and easy to press down will keep you practicing. A guitar with high string action, sharp frets, or a heavy body will end up collecting dust in the corner.</p><p><strong>What beginners should look for: </strong></p><p><strong>Neck shape and feel: </strong>A slim, smooth C-shaped neck (like the Squier Affinity or Yamaha Pacifica) makes it easier for new players to form chords. Chunky or thick necks need larger hands and more finger strength.</p><p><strong>Weight and balance: </strong>A heavy guitar hurts your shoulder and back during long practice sessions. Light, well-balanced guitars like the Squier Sonic, Squier Affinity, and Yamaha Pacifica are far more comfortable for beginners.</p><p><strong>Fixed bridge vs tremolo: </strong>A fixed (hardtail) bridge — like the one on the Squier Sonic Stratocaster HT or Ibanez Gio GRG121DX — keeps strings in tune with zero fuss, perfect for first-time players. A vibrato/tremolo bridge is fun, but beginners often find it fiddly and out-of-tune frustrating.</p><p><strong>Budget for a setup and accessories: </strong>Set aside money for a professional setup (string height, intonation, and neck relief) and for a tuner, cable, picks, and a decent amp. A well-set-up budget guitar plays better than a premium guitar straight out of the box.</p>';

const sec0ContentES = '<p><strong>En una primera guitarra eléctrica, la tocabilidad importa más que cualquier otra cosa — más que el aspecto, la marca o las pastillas.</strong> Una guitarra cómoda de sostener y fácil de pulsar te mantendrá practicando. Una guitarra con acción alta, trastes afilados o cuerpo pesado acabará acumulando polvo en la esquina.</p><p><strong>Qué buscar como principiante: </strong></p><p><strong>Forma y sensación del mástil: </strong>Un mástil en C delgado y liso (como la Squier Affinity o la Yamaha Pacifica) facilita que los nuevos guitarristas formen acordes. Los mástiles gruesos o voluminosos necesitan manos más grandes y más fuerza en los dedos.</p><p><strong>Peso y equilibrio: </strong>Una guitarra pesada duele el hombro y la espalda en sesiones largas de práctica. Guitarras ligeras y bien equilibradas como la Squier Sonic, la Squier Affinity y la Yamaha Pacifica son mucho más cómodas para principiantes.</p><p><strong>Puente fijo vs trémolo: </strong>Un puente fijo (hardtail) — como el de la Squier Sonic Stratocaster HT o la Ibanez Gio GRG121DX — mantiene la afinación sin complicaciones, perfecto para una primera guitarra. Un vibrato/trémolo es divertido, pero los principiantes suelen encontrarlo incómodo y frustrante cuando se desafina.</p><p><strong>Presupuesto para el ajuste y los accesorios: </strong>Reserva dinero para un ajuste profesional (altura de las cuerdas, entonación y alivio del mástil) y para un afinador, cable, púas y un buen amplificador. Una guitarra económica bien ajustada suena mejor que una premium recién sacada de la caja.</p>';

// sec Revstar (replaces Gibson) - premium-for-future angle + Player II comparison
const secRevstar = '<p><strong>If your beginner budget stretches higher, the Yamaha Revstar Element RSE20 is the guitar you will never outgrow.</strong> It is a set-neck, chambered-mahogany humbucker guitar that plays beautifully from day one and stays with you for years — no need for a second guitar down the road.</p><p><strong>Why higher-budget beginners love it: </strong>A chambered mahogany body with a set-in neck gives warm, singing sustain. Two Alnico V humbuckers cover everything from clean sparkle to classic rock. The push-pull Dry Switch adds a high-pass filter for extra clarity, and the tune-o-matic bridge with stopbar keeps tuning rock-solid. It is lighter and more comfortable than a Les Paul, making it a smarter first guitar than the premium Gibson option.</p><p><strong>The Fender Player II as the premium future step: </strong>If you eventually want the iconic Strat experience at a higher level, the Fender Player II series (Jazzmaster, Stratocaster HSS, and Telecaster) is the natural upgrade — Mexican-made with real Fender quality, single-coil clarity and humbucker punch. But for a one-guitar-does-everything buy now, the Revstar is hard to beat.</p><p>Compare your options in <a href="/guides/player-strat-vs-pacifica.html" class="guide-link-btn">Player Stratocaster vs Pacifica comparison</a> and <a href="/guides/best-electric-guitar.html" class="guide-link-btn">Best Electric Guitar guide</a>.</p>';

const secRevstarES = '<p><strong>Si tu presupuesto de principiante alcanza un poco más, la Yamaha Revstar Element RSE20 es la guitarra que nunca superarás.</strong> Es una guitarra de humbuckers con cuerpo de caoba ahuecada y mástil set-in que toca divinamente desde el primer día y te acompañará durante años — sin necesidad de una segunda guitarra en el futuro.</p><p><strong>Por qué la quieren los principiantes de presupuesto más alto: </strong>Un cuerpo de caoba ahuecada con mástil set-in ofrece un sustain cálido y cantarín. Dos humbuckers de Alnico V cubren desde limpios brillantes hasta rock clásico. El Dry Switch push-pull añade un filtro de paso alto para más claridad, y el puente tune-o-matic con tope mantiene la afinación impecable. Es más ligera y cómoda que una Les Paul, lo que la convierte en una primera guitarra más inteligente que la opción premium de Gibson.</p><p><strong>La Fender Player II como paso premium futuro: </strong>Si algún día quieres la experiencia Strat icónica a un nivel superior, la serie Fender Player II (Jazzmaster, Stratocaster HSS y Telecaster) es la mejora natural —hecha en México con calidad real de Fender, claridad de single coils y pegada de humbucker. Pero para comprar una sola guitarra que lo haga todo ahora mismo, la Revstar es difícil de superar.</p><p>Compara tus opciones en nuestra <a href="/guides/player-strat-vs-pacifica_es.html" class="guide-link-btn">comparativa Player Stratocaster vs Pacifica</a> y en nuestra <a href="/guides/best-electric-guitar_es.html" class="guide-link-btn">guía de la mejor guitarra eléctrica</a>.</p>';

// sec Sonic Strat HT (new)
const secSonic = '<p><strong>If staying in tune is your priority, the Squier Sonic Stratocaster HT is the easiest first electric guitar you can buy.</strong> The "HT" stands for hardtail — a fixed bridge with no tremolo arm. That single choice removes the biggest source of tuning headaches for beginners, so you spend your time practicing instead of tuning.</p><p><strong>What makes it beginner-friendly: </strong>A light poplar body and slim C-shaped maple neck feel comfortable in small and large hands alike. The 9.5-inch radius fingerboard and 21 medium frets make chord shapes and bends easy. Three ceramic single-coil pickups deliver the classic Strat sound through a simple five-way switch — everything you need, nothing you don\'t.</p><p><strong>How it compares: </strong>The Sonic Strat HT sits below the Affinity in Squier\'s lineup, so it trades a couple of spec points to hit a friendlier price. The Squier Sonic Mustang is the short-scale alternative for younger or smaller-handed players, and the Squier Debut range is the absolute entry point. For most adults, the Sonic Strat HT is the sweet spot of value and simplicity.</p>';

const secSonicES = '<p><strong>Si mantener la afinación es tu prioridad, la Squier Sonic Stratocaster HT es la primera guitarra eléctrica más fácil que puedes comprar.</strong> "HT" significa hardtail — un puente fijo sin palanca de trémolo. Esa única decisión elimina la mayor fuente de problemas de afinación para principiantes, así dedicas tu tiempo a practicar en lugar de afinar.</p><p><strong>Por qué es tan amigable: </strong>Un cuerpo ligero de álamo y un mástil de arce en C delgado resultan cómodos tanto en manos pequeñas como grandes. El diapasón de radio 9,5" y los 21 trastes medium hacen fáciles los acordes y los bendings. Tres single coils cerámicas ofrecen el sonido Strat clásico con un conmutador de 5 posiciones —todo lo que necesitas, nada de sobra.</p><p><strong>Cómo se compara: </strong>La Sonic Strat HT está por debajo de la Affinity en la línea de Squier, así que sacrifica un par de especificaciones para alcanzar un precio más amable. La Squier Sonic Mustang es la alternativa de escala corta para jugadores más jóvenes o de manos pequeñas, y la gama Squier Debut es el punto de entrada absoluto. Para la mayoría de adultos, la Sonic Strat HT es el punto óptimo de valor y sencillez.</p>';

// sec Ibanez Gio (new) - replaces RG550/PRS rock angle
const secGio = '<p><strong>For beginners who already know they want to play rock, punk, or metal, the Ibanez Gio GRG121DX is the wildcard that belongs on your list.</strong> It brings a fast neck and two humbuckers at a price that makes the premium metal shredders look very expensive.</p><p><strong>What the GRG121DX gets right: </strong>A slim, fast GRG maple neck and 24 frets let you reach the high notes the metal genre demands. Two IBZ-6 humbuckers produce thick, punchy distortion — ideal for palm-muted chugs and lead lines. The fixed F106 bridge means no floating-tremolo tuning drama as you dive into heavy riffs.</p><p><strong>How it compares: </strong>Next to the single-coil friendly Squier Affinity and Yamaha Pacifica, the Gio GRG121DX is the humbucker-only rocker in the group. If your musical heart is in hard rock and metal, it is the best-value starting point here. Pure acoustic-style beginners might prefer the rounder, cleaner tone of the Pacifica or Affinity instead.</p>';

const secGioES = '<p><strong>Para principiantes que ya saben que quieren tocar rock, punk o metal, la Ibanez Gio GRG121DX es la comodín que debe estar en tu lista.</strong> Trae un mástil rápido y dos humbuckers a un precio que hace que las shredders premium de metal parezcan muy caras.</p><p><strong>Lo que la GRG121DX hace bien: </strong>Un mástil GRG de arce rápido y delgado con 24 trastes te permite llegar a las notas agudas que el metal exige. Dos humbuckers IBZ-6 producen una distorsión gruesa y contundente —ideal para chugs y solos. El puente fijo F106 significa que no hay drama de afinación con trémolo flotante mientras te lanzas a riffs pesados.</p><p><strong>Cómo se compara: </strong>Junto a la Squier Affinity y la Yamaha Pacifica, amigas de las single coils, la Gio GRG121DX es la rockera de solo humbuckers del grupo. Si tu corazón musical está en el hard rock y el metal, es el mejor punto de partida en valor. Los principiantes de estilo acústico quizá prefieran el tono más redondo y limpio de la Pacifica o la Affinity.</p>';

x.sections = [
  { heading: 'What Makes a Great Beginner Electric Guitar?', heading_es: '¿Qué hace que una guitarra eléctrica sea ideal para principiantes?', content: sec0Content, content_es: sec0ContentES, products: [103, 310, 462, 313] },
  { heading: 'Is the Yamaha Pacifica 112V the Best Beginner Electric Guitar?', heading_es: '¿Es la Yamaha Pacifica 112V la mejor guitarra eléctrica para principiantes?', content: x.sections[1].content, content_es: x.sections[1].content_es, products: [103, 295] },
  { heading: 'Is the Squier Affinity Stratocaster the Best Budget Beginner Guitar?', heading_es: '¿Es la Squier Affinity Stratocaster la mejor guitarra económica para principiantes?', content: x.sections[2].content, content_es: x.sections[2].content_es, products: [309, 310] },
  { heading: 'Is the Squier Sonic Stratocaster HT the Easiest Guitar to Stay in Tune?', heading_es: '¿Es la Squier Sonic Stratocaster HT la guitarra más fácil de mantener afinada?', content: secSonic, content_es: secSonicES, products: [462, 313, 309] },
  { heading: 'Is the Ibanez Gio GRG121DX the Best Beginner Guitar for Rock & Metal?', heading_es: '¿Es la Ibanez Gio GRG121DX la mejor guitarra para principiantes de rock y metal?', content: secGio, content_es: secGioES, products: [463, 310] },
  { heading: 'Is the Yamaha Revstar RSE20 a Beginner Guitar You\'ll Keep for Years?', heading_es: '¿Es la Yamaha Revstar RSE20 una guitarra de principiante que conservarás durante años?', content: secRevstar, content_es: secRevstarES, products: [464, 65, 124, 444] },
  { heading: 'What Accessories Do You Need with Your First Guitar?', heading_es: '¿Qué accesorios necesitas con tu primera guitarra?', content: x.sections[5].content, content_es: x.sections[5].content_es, products: [] }
];

// ---- FEATURED PRODUCTS ----
x.featuredProducts = [103, 310, 462, 463];

// ---- CONCLUSION / VERDICT ----
x.conclusion = 'For most beginners, the Yamaha Pacifica 112V is the best all-round starter — great build, versatile HSS pickups, and easy playability at a fair price. If you want the classic Strat look, the Squier Affinity Stratocaster delivers, while the Squier Sonic Stratocaster HT is the simplest, lowest-stress choice for staying in tune. If rock and metal are your thing, the Ibanez Gio GRG121DX is the best-value rocker here. If your budget stretches further, the Yamaha Revstar RSE20 is a guitar you will keep for years — and the Fender Player II series is your future premium step. Whichever you choose, budget for a professional setup and a good amp like the Boss Katana 50. <p><a href="/guides/player-strat-vs-pacifica.html" class="guide-link-btn">Player Strat vs Pacifica</a> <a href="/guides/best-electric-guitar.html" class="guide-link-btn">Best Electric Guitar</a> <a href="/guides/beginner-guitar.html" class="guide-link-btn">Best Beginner Guitars for Songwriting</a></p>';

x.conclusion_es = 'Para la mayoría de los principiantes, la Yamaha Pacifica 112V es la mejor opción todoterreno —buena construcción, pastillas HSS versátiles y gran tocabilidad a un precio justo. Si quieres el aspecto clásico de Strat, la Squier Affinity lo ofrece, mientras que la Squier Sonic Stratocaster HT es la elección más sencilla y sin estrés para mantener la afinación. Si el rock y el metal son lo tuyo, la Ibanez Gio GRG121DX es la rockera con mejor relación calidad-precio. Si tu presupuesto alcanza más, la Yamaha Revstar RSE20 es una guitarra que conservarás durante años —y la serie Fender Player II es tu futuro paso premium. Elijas la que elijas, presupuesta un ajuste profesional y un buen amplificador como el Boss Katana 50. <p>También te interesa: <a href="/guides/player-strat-vs-pacifica_es.html" class="guide-link-btn">Player Strat vs Pacifica</a> <a href="/guides/best-electric-guitar_es.html" class="guide-link-btn">Mejor Guitarra Eléctrica</a> <a href="/guides/beginner-guitar_es.html" class="guide-link-btn">Mejores Guitarras para Principiantes y Composición</a></p>';

x.verdict = 'The Yamaha Pacifica 112V is the best value beginner electric — it plays above its price and grows with you. The Squier Sonic Stratocaster HT is the easiest for staying in tune, the Squier Affinity is the classic Strat pick, and the Ibanez Gio GRG121DX is the best rock/metal choice. If your budget is higher, the Yamaha Revstar RSE20 is a guitar you won\'t outgrow.';

x.verdict_es = 'La Yamaha Pacifica 112V es la mejor eléctrica de inicio en valor —se toca por encima de su precio y crece contigo. La Squier Sonic Stratocaster HT es la más fácil de mantener afinada, la Squier Affinity es la clásica, y la Ibanez Gio GRG121DX es la mejor para rock y metal. Si tu presupuesto es mayor, la Yamaha Revstar RSE20 es una guitarra que no superarás.';

// ---- RELATED GUIDES (add the new guide id if exists; keep existing) ----
if (!x.relatedGuides.includes('best-electric-guitar-2026') && x.relatedGuides.includes('best-electric-guitars-2026')) {
  // leave as is
}

// ---- DESCRIPTION / SNIPPET ----
x.description = 'BEST beginner electric guitar 2026. Yamaha Pacifica 112V vs Squier Affinity vs Squier Sonic Strat HT vs Ibanez Gio GRG121DX. Play in tune, stay in tune. Your first guitar awaits. Best pick: Yamaha Pacifica 112V.';
x.description_es = 'MEJOR guitarra eléctrica para principiantes 2026. Yamaha Pacifica 112V vs Squier Affinity vs Squier Sonic Strat HT vs Ibanez Gio GRG121DX. Tu primera guitarra te espera. Mejor compra: Yamaha Pacifica 112V.';

x.featuredSnippet.title_en = 'Best Electric Guitar for Beginners in 2026 — What to Buy and Why';
x.featuredSnippet.text_en = 'Choosing your first electric guitar is exciting and overwhelming. After playing and reviewing dozens of beginner guitars, here are my top recommendations for every budget: the Yamaha Pacifica 112V as the best all-rounder, the Squier Affinity as the classic Strat, the Squier Sonic Stratocaster HT for staying in tune, and the Ibanez Gio GRG121DX for rock and metal.';
x.featuredSnippet.title_es = 'Mejor Guitarra Eléctrica para Principiantes en 2026 — Qué Comprar y Por Qué';
x.featuredSnippet.text_es = 'Elegir tu primera guitarra eléctrica es emocionante y abrumador. Después de tocar y revisar docenas de guitarras para principiantes, aquí están mis recomendaciones para cada presupuesto: la Yamaha Pacifica 112V como mejor todoterreno, la Squier Affinity como clásica, la Squier Sonic Strat HT para mantener la afinación, y la Ibanez Gio GRG121DX para rock y metal.';

// faq updates (remove references to pro models, keep beginner-focused)
x.featuredSnippet.faq_q3_en = 'Is a Squier, Yamaha Pacifica, or Ibanez better for beginners?';
x.featuredSnippet.faq_a3_en = 'The Pacifica is the best all-rounder with the most versatile HSS pickups. The Squier Affinity has the iconic Stratocaster look. The Ibanez Gio GRG121DX is best for rock and metal. All are excellent choices.';
x.featuredSnippet.faq_q3_es = '¿Es mejor una Squier, una Yamaha Pacifica o una Ibanez para principiantes?';
x.featuredSnippet.faq_a3_es = 'La Pacifica es la mejor todoterreno con las pastillas HSS más versátiles. La Squier Affinity tiene el aspecto icónico de Stratocaster. La Ibanez Gio GRG121DX es la mejor para rock y metal. Todas son excelentes opciones.';
x.featuredSnippet.faq_a5_es = 'La eléctrica es más fácil para principiantes — cuerdas más ligeras, acción más baja, cuerpo más cómodo. Empieza con eléctrica (Pacifica o Squier) y añade una acústica después.';

// ---- PRODUCT TABLE (4 beginner columns) ----
x.productTable = {
  title: 'Best Beginner Electric Guitars Compared',
  title_es: 'Comparativa de las mejores guitarras eléctricas para principiantes',
  columns: [
    { title: 'Yamaha Pacifica 112V', title_es: 'Yamaha Pacifica 112V' },
    { title: 'Squier Affinity Stratocaster', title_es: 'Squier Affinity Stratocaster' },
    { title: 'Squier Sonic Stratocaster HT', title_es: 'Squier Sonic Stratocaster HT' },
    { title: 'Ibanez Gio GRG121DX', title_es: 'Ibanez Gio GRG121DX' }
  ],
  rows: [
    { label: 'Best For', label_es: 'Ideal Para', values: [
      { value: 'Best all-rounder for most beginners', value_es: 'La mejor todoterreno para la mayoría' },
      { value: 'Classic Stratocaster look on a budget', value_es: 'Aspecto clásico de Stratocaster económico' },
      { value: 'Starting simple, staying in tune', value_es: 'Empezar sencillo, mantener la afinación' },
      { value: 'Rock, punk & metal beginners', value_es: 'Principiantes de rock, punk y metal' }
    ]},
    { label: 'Body Wood', label_es: 'Madera del Cuerpo', values: [
      { value: 'Alder', value_es: 'Aliso' },
      { value: 'Poplar', value_es: 'Álamo' },
      { value: 'Poplar', value_es: 'Álamo' },
      { value: 'Poplar', value_es: 'Álamo' }
    ]},
    { label: 'Neck', label_es: 'Mástil', values: [
      { value: 'C-shape maple', value_es: 'Arce en C' },
      { value: 'C-shape maple', value_es: 'Arce en C' },
      { value: 'Slim C-shape maple', value_es: 'Arce en C delgado' },
      { value: 'Slim GRG maple', value_es: 'Arce GRG delgado' }
    ]},
    { label: 'Frets & Fretboard', label_es: 'Trastes y Diapasón', values: [
      { value: '22 medium, rosewood', value_es: '22 medium, palo rosa' },
      { value: '21 medium jumbo, maple/laurel', value_es: '21 medium jumbo, arce/laurel' },
      { value: '21 medium, maple', value_es: '21 medium, arce' },
      { value: '24, maple', value_es: '24, arce' }
    ]},
    { label: 'Pickups', label_es: 'Pastillas', values: [
      { value: 'HSS — Alnico V humbucker + 2 single coils', value_es: 'HSS — humbucker Alnico V + 2 single coils' },
      { value: '3 single coils', value_es: '3 single coils' },
      { value: '3 ceramic single coils', value_es: '3 single coils cerámicas' },
      { value: '2 IBZ-6 humbuckers', value_es: '2 humbuckers IBZ-6' }
    ]},
    { label: 'Scale Length', label_es: 'Longitud de Escala', values: [
      { value: '25.5 in (648 mm)', value_es: '25,5" (648 mm)' },
      { value: '25.5 in (648 mm)', value_es: '25,5" (648 mm)' },
      { value: '25.5 in (648 mm)', value_es: '25,5" (648 mm)' },
      { value: '25.5 in (648 mm)', value_es: '25,5" (648 mm)' }
    ]},
    { label: 'Tremolo / Bridge', label_es: 'Trémolo / Puente', values: [
      { value: 'Vintage-style tremolo', value_es: 'Trémolo estilo vintage' },
      { value: 'Synchronous tremolo', value_es: 'Trémolo sincronizado' },
      { value: 'Fixed (hardtail)', value_es: 'Fijo (hardtail)' },
      { value: 'Fixed F106 bridge', value_es: 'Puente fijo F106' }
    ]},
    { label: 'Tuners', label_es: 'Clavijas', values: [
      { value: 'Sealed die-cast', value_es: 'Selladas de fundición' },
      { value: 'Sealed die-cast', value_es: 'Selladas de fundición' },
      { value: 'Sealed', value_es: 'Selladas' },
      { value: 'Die-cast', value_es: 'De fundición' }
    ]},
    { label: 'Weight', label_es: 'Peso', values: [
      { value: '~7.5 lb (3.4 kg)', value_es: '~3,4 kg' },
      { value: '~7.5 lb (3.4 kg)', value_es: '~3,4 kg' },
      { value: '~7.0 lb (3.2 kg)', value_es: '~3,2 kg' },
      { value: '~7.7 lb (3.5 kg)', value_es: '~3,5 kg' }
    ]}
  ]
};

// ---- VERDICT PROS/CONS (4 beginner models) ----
x.verdictProsCons = [
  {
    name: 'Yamaha Pacifica 112V', name_es: 'Yamaha Pacifica 112V',
    pros: [
      'Best all-round value — build quality and tone rival guitars costing twice as much',
      'Versatile HSS pickups cover rock, blues, pop and cleans',
      'Comfortable, well-finished neck with no sharp fret edges',
      'Lightweight double-cutaway body and stable, reliable tuners'
    ],
    pros_es: [
      'La mejor relación calidad-precio — construcción y tono que rivalizan con guitarras del doble de precio',
      'Pastillas HSS versátiles que cubren rock, blues, pop y limpios',
      'Mástil cómodo y bien acabado, sin bordes de traste afilados',
      'Cuerpo de doble cutaway ligero y afinadores estables y fiables'
    ],
    cons: [
      'Vintage-style tremolo needs a good setup to hold tuning',
      'Cosmetic finish is basic next to the more expensive options',
      'Not the best choice for players who only want heavy metal tone'
    ],
    cons_es: [
      'El trémolo estilo vintage necesita un buen ajuste para mantener la afinación',
      'El acabado cosmético es básico comparado con las opciones más caras',
      'No es la mejor opción para quien solo quiere tono de metal pesado'
    ]
  },
  {
    name: 'Squier Sonic Stratocaster HT', name_es: 'Squier Sonic Stratocaster HT',
    pros: [
      'Fixed hardtail bridge means it stays in tune with zero fuss',
      'Slim C-neck and light poplar body suit beginners of all hand sizes',
      'Simple 3-pickup / 5-way layout gives the classic Strat sound easily',
      'Very affordable entry point into the Fender/Squier family'
    ],
    pros_es: [
      'El puente fijo hardtail mantiene la afinación sin complicaciones',
      'Mástil en C delgado y cuerpo ligero de álamo, apto para todo tipo de manos',
      'El sencillo esquema de 3 pastillas con 5 posiciones da el sonido Strat clásico fácilmente',
      'Punto de entrada muy asequible a la familia Fender/Squier'
    ],
    cons: [
      'Ceramic single coils are a step below the Affinity\'s pickups in clarity',
      'Fewer premium fittings than the Affinity or Pacifica',
      'No tremolo — you do not get whammy-bar effects'
    ],
    cons_es: [
      'Las single coils cerámicas están un escalón por debajo de las de la Affinity en claridad',
      'Menos componentes premium que la Affinity o la Pacifica',
      'Sin trémolo — no hay efectos de palanca'
    ]
  },
  {
    name: 'Squier Affinity Stratocaster', name_es: 'Squier Affinity Stratocaster',
    pros: [
      'Iconic Stratocaster look and feel — the most recorded guitar shape in history',
      'Slim C-shaped neck, sealed tuners and surprisingly good alnico pickups',
      'Highly modifiable — great platform to upgrade pickups and hardware later',
      'The world\'s most popular beginner guitar for good reason'
    ],
    pros_es: [
      'Aspecto y sensación icónicos de Stratocaster — la forma de guitarra más grabada de la historia',
      'Mástil en C delgado, afinadores sellados y pastillas alnico sorprendentemente buenas',
      'Altamente modificable — gran base para mejorar pastillas y herrajes después',
      'La guitarra de principiante más popular del mundo, con razón'
    ],
    cons: [
      'Slightly heavier and clunkier tremolo than its siblings',
      'Pickups are good but not as versatile as the Pacifica\'s HSS set',
      'Basic tuning machines could be upgraded over time'
    ],
    cons_es: [
      'Trémolo ligeramente más pesado y torpe que el de sus hermanas',
      'Las pastillas son buenas pero no tan versátiles como el set HSS de la Pacifica',
      'Las clavijas básicas podrían mejorarse con el tiempo'
    ]
  },
  {
    name: 'Ibanez Gio GRG121DX', name_es: 'Ibanez Gio GRG121DX',
    pros: [
      'Fast slim GRG neck and 24 frets perfect for rock, punk and metal',
      'Two IBZ-6 humbuckers deliver thick, punchy distortion',
      'Fixed F106 bridge keeps tuning rock-solid — no floating-tremolo fuss',
      'Best-value rocker in this group for a fraction of a premium shredder'
    ],
    pros_es: [
      'Mástil GRG rápido y delgado con 24 trastes, perfecto para rock, punk y metal',
      'Dos humbuckers IBZ-6 ofrecen una distorsión gruesa y contundente',
      'El puente fijo F106 mantiene la afinación impecable — sin líos de trémolo flotante',
      'La rockera con mejor relación calidad-precio del grupo, a una fracción de una shredder premium'
    ],
    cons: [
      'Humbucker-only tone is less versatile for clean/acoustic-style playing',
      'Not the iconic Strat look that some beginners want',
      'Slim neck and 24 frets may feel specialized for total beginners'
    ],
    cons_es: [
      'El tono de solo humbuckers es menos versátil para tocar limpio o estilo acústico',
      'No tiene el aspecto icónico de Strat que algunos principiantes quieren',
      'El mástil fino y los 24 trastes pueden resultar especializados para principiantes totales'
    ]
  }
];

g[idx] = x;
fs.writeFileSync(fp, JSON.stringify(g, null, 2) + '\n', 'utf8');
console.log('guide restructured OK');
