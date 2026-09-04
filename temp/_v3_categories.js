const fs = require('fs');
const path = require('path');
const fp = path.join(__dirname, '..', 'data', 'guides.json');
const g = JSON.parse(fs.readFileSync(fp, 'utf8'));
const idx = g.findIndex(v => v.id === 'best-beginner-electric-guitar');
if (idx === -1) { console.error('guide not found'); process.exit(1); }
const x = g[idx];

// ===== SECTIONS BY CATEGORY =====

// 0) Intro / framing (no product cards)
const introEN = '<p><strong>For a first electric guitar, playability matters more than anything — more than looks, brand, or pickups.</strong> A guitar that is comfortable to hold and easy to press down will keep you practicing. A guitar with high string action, sharp frets, or a heavy body will end up collecting dust in the corner.</p><p><strong>What beginners should look for: </strong></p><p><strong>Neck shape and feel: </strong>A slim, smooth C-shaped neck (like the Squier Affinity or Yamaha Pacifica) makes it easier for new players to form chords. Chunky or thick necks need larger hands and more finger strength.</p><p><strong>Weight and balance: </strong>A heavy guitar hurts your shoulder and back during long practice sessions. Light, well-balanced guitars like the Squier Sonic, Squier Affinity, and Yamaha Pacifica are far more comfortable for beginners.</p><p><strong>Fixed bridge vs tremolo: </strong>A fixed (hardtail) bridge — like the one on the Squier Sonic Stratocaster HT or Ibanez Gio GRG121DX — keeps strings in tune with zero fuss, perfect for first-time players. A vibrato/tremolo bridge is fun, but beginners often find it fiddly and out-of-tune frustrating.</p><p><strong>Budget for a setup and accessories: </strong>Set aside money for a professional setup (string height, intonation, and neck relief) and for a tuner, cable, picks, and a decent amp. A well-set-up budget guitar plays better than a premium guitar straight out of the box.</p><p>To make things easy, this guide splits the best beginner electric guitars into four clear categories: the value queens, specialist picks, the step-up guitars, and the premium long-term investment.</p>';
const introES = '<p><strong>En una primera guitarra eléctrica, la tocabilidad importa más que cualquier otra cosa — más que el aspecto, la marca o las pastillas.</strong> Una guitarra cómoda de sostener y fácil de pulsar te mantendrá practicando. Una guitarra con acción alta, trastes afilados o cuerpo pesado acabará acumulando polvo en la esquina.</p><p><strong>Qué buscar como principiante: </strong></p><p><strong>Forma y sensación del mástil: </strong>Un mástil en C delgado y liso (como la Squier Affinity o la Yamaha Pacifica) facilita que los nuevos guitarristas formen acordes. Los mástiles gruesos o voluminosos necesitan manos más grandes y más fuerza en los dedos.</p><p><strong>Peso y equilibrio: </strong>Una guitarra pesada duele el hombro y la espalda en sesiones largas de práctica. Guitarras ligeras y bien equilibradas como la Squier Sonic, la Squier Affinity y la Yamaha Pacifica son mucho más cómodas para principiantes.</p><p><strong>Puente fijo vs trémolo: </strong>Un puente fijo (hardtail) — como el de la Squier Sonic Stratocaster HT o la Ibanez Gio GRG121DX — mantiene la afinación sin complicaciones, perfecto para una primera guitarra. Un vibrato/trémolo es divertido, pero los principiantes suelen encontrarlo incómodo y frustrante cuando se desafina.</p><p><strong>Presupuesto para el ajuste y los accesorios: </strong>Reserva dinero para un ajuste profesional (altura de las cuerdas, entonación y alivio del mástil) y para un afinador, cable, púas y un buen amplificador. Una guitarra económica bien ajustada suena mejor que una premium recién sacada de la caja.</p><p>Para que te resulte fácil, esta guía divide las mejores guitarras eléctricas para principiantes en cuatro categorías claras: las reinas de la calidad-precio, las opciones para necesidades especiales, las guitarras de paso intermedio y la inversión premium para toda la vida.</p>';

// 1) CATEGORY 1 - Value queens
const cat1EN = '<h3>Under around $350 / £250: proven value, zero surprises</h3><p><strong>The three value queens — Yamaha Pacifica 112V, Squier Sonic Stratocaster HT, and Squier Affinity Stratocaster — are the guitars most beginners should buy.</strong> Each punches far above its price and covers the classic electric spectrum without breaking the bank.</p><p><strong>Yamaha Pacifica 112V — the best all-rounder: </strong>An alder body, versatile HSS pickup layout and proper build quality make it the most complete budget electric. It handles rock, blues, pop and clean tones, and it feels like a much more expensive instrument.</p><p><strong>Squier Sonic Stratocaster HT — the easiest to stay in tune: </strong>Its fixed hardtail bridge removes the biggest beginner frustration: tuning drift. If simplicity is your top priority, this is the one.</p><p><strong>Squier Affinity Stratocaster — the timeless classic: </strong>The most popular first guitar on the planet. Iconic Strat look and feel, slim C-neck, sealed tuners and surprisingly good pickups for the money.</p><p><strong>How to choose: </strong>Maximum versatility → Pacifica. Maximum simplicity and tuning stability → Sonic Strat HT. The classic Strat experience and a guitar you can mod forever → Affinity. There is no wrong answer in this group.</p>';
const cat1ES = '<h3>Menos de unos $350 / £250: valor probado, cero sorpresas</h3><p><strong>Las tres reinas de la calidad-precio — Yamaha Pacifica 112V, Squier Sonic Stratocaster HT y Squier Affinity Stratocaster — son las guitarras que la mayoría de principiantes debería comprar.</strong> Cada una rinde muy por encima de su precio y cubre el espectro eléctrico clásico sin vaciarte el bolsillo.</p><p><strong>Yamaha Pacifica 112V — la mejor todoterreno: </strong>Un cuerpo de aliso, la versátil configuración HSS y la buena construcción la convierten en la eléctrica económica más completa. Maneja rock, blues, pop y tonos limpios, y se siente como un instrumento mucho más caro.</p><p><strong>Squier Sonic Stratocaster HT — la más fácil de mantener afinada: </strong>Su puente fijo hardtail elimina la mayor frustración del principiante: que se desafine. Si la sencillez es tu prioridad, esta es la tuya.</p><p><strong>Squier Affinity Stratocaster — el clásico de siempre: </strong>La primera guitarra más popular del planeta. Aspecto y sensación icónicos de Strat, mástil en C delgado, clavijas selladas y pastillas sorprendentemente buenas por el dinero.</p><p><strong>Cómo elegir: </strong>Máxima versatilidad → Pacifica. Máxima sencillez y estabilidad de afinación → Sonic Strat HT. La experiencia Strat clásica y una guitarra que puedes modificar para siempre → Affinity. No hay respuesta equivocada en este grupo.</p>';

// 2) CATEGORY 2 - Specialist picks
const cat2EN = '<h3>Rock, small hands, and amp-free travel</h3><p><strong>Not every beginner wants the same thing: some want to chug heavy riffs, some have smaller hands, and some want to practice anywhere.</strong> These three specialist picks solve those specific needs.</p><p><strong>Ibanez Gio GRG121DX — best for rock & metal: </strong>A fast, slim GRG neck, two IBZ-6 humbuckers and a fixed F106 bridge deliver thick, punchy distortion without floating-tremolo tuning drama. With 24 frets and a 25.5-inch scale, it brings the speed of a much pricier RG.</p><p><strong>Squier Sonic Mustang — best for kids and smaller hands: </strong>A compact offset body, slim C-shaped maple neck and a 24-inch scale give slinkier strings and an easier reach. Two ceramic single-coils keep that indie/alternative jangle, and the 6-saddle hardtail bridge stays reliably in tune.</p><p><strong>Enya Nova Go Sonic — best for travel and amp-free practice: </strong>A carbon-fiber electric with a built-in 10W speaker and DSP effects, the Nova Go plugs in nowhere and plays everywhere. Bluetooth 5.1 for backing tracks, a headphone out, and USB-C recording to your phone make it the ultimate couch-and-plane guitar.</p>';
const cat2ES = '<h3>Rock, manos pequeñas y viajes sin amplificador</h3><p><strong>No todos los principiantes quieren lo mismo: unos quieren riffs pesados, otros tienen manos más pequeñas y otros quieren practicar en cualquier sitio.</strong> Estas tres opciones especializadas resuelven esas necesidades concretas.</p><p><strong>Ibanez Gio GRG121DX — la mejor para rock y metal: </strong>Un mástil GRG rápido y delgado, dos humbuckers IBZ-6 y un puente fijo F106 ofrecen una distorsión gruesa y contundente sin el drama de afinación del trémolo flotante. Con 24 trastes y escala de 25,5", trae la velocidad de una RG mucho más cara.</p><p><strong>Squier Sonic Mustang — la mejor para niños y manos pequeñas: </strong>Un cuerpo offset compacto, mástil de arce en C delgado y escala de 24" dan cuerdas más fáciles de pulsar y un alcance más cómodo. Dos single coils cerámicas mantienen ese deje indie/alternativo, y el puente hardtail de 6 selletas se mantiene fiablemente afinado.</p><p><strong>Enya Nova Go Sonic — la mejor para viajar y practicar sin amplificador: </strong>Una eléctrica de fibra de carbono con altavoz de 10W integrado y efectos DSP, la Nova Go no necesita enchufarse a nada para tocar en cualquier parte. Bluetooth 5.1 para pistas de acompañamiento, salida de auriculares y grabación USB-C al móvil la convierten en la guitarra definitiva de sofá y avión.</p>';

// 3) CATEGORY 3 - Step up
const cat3EN = '<h3>Guitars you won\'t outgrow</h3><p><strong>Two models sit between the value picks and the premium tier: one for a comfortable step-up budget, and one for the absolute entry point.</strong></p><p><strong>Yamaha Revstar Element RSE20 — the step-up that lasts: </strong>A chambered mahogany body with a set-in neck gives warm, singing sustain. Two Alnico V humbuckers (VH3n/VH3b) cover clean sparkle to classic rock, the push-pull Dry Switch adds clarity, and the tune-o-matic bridge with stopbar keeps tuning rock-solid. At a 24.75-inch scale, it is the higher-budget pick you will keep for years without needing a second guitar.</p><p><strong>Squier Debut Stratocaster — the cheapest real Strat: </strong>Fender\'s answer to the cheap Amazon import. A slim C-shaped neck, thin lightweight poplar body, three ceramic single-coils with 5-way switching and a tremolo with removable arm. It won\'t replace a Mexican or American Fender, but for a genuinely tight budget it is a playable, trendy first guitar with a 2-year warranty.</p>';
const cat3ES = '<h3>Guitarras que no quedarás corto</h3><p><strong>Dos modelos se sitúan entre las opciones de valor y la gama premium: uno para un presupuesto de paso intermedio cómodo y otro para el punto de entrada absoluto.</strong></p><p><strong>Yamaha Revstar Element RSE20 — el paso que dura: </strong>Un cuerpo de caoba ahuecada con mástil set-in ofrece un sustain cálido y cantarín. Dos humbuckers de Alnico V (VH3n/VH3b) cubren desde limpios brillantes hasta rock clásico, el Dry Switch push-pull añade claridad y el puente tune-o-matic con tope mantiene la afinación impecable. Con escala de 24,75", es la elección de presupuesto más alto que conservarás durante años sin necesidad de una segunda guitarra.</p><p><strong>Squier Debut Stratocaster — la Strat real más barata: </strong>La respuesta de Fender a las importaciones baratas de Amazon. Mástil en C delgado, cuerpo ligero de álamo, tres single coils cerámicas con conmutador de 5 posiciones y trémolo con palanca extraíble. No sustituirá a una Fender mexicana o americana, pero para un presupuesto realmente ajustado es una primera guitarra tocable y con estilo, con 2 años de garantía.</p>';

// 4) CATEGORY 4 - Premium investment
const cat4EN = '<h3>Gama premium: the buy-it-for-life guitars (over £600 / $800)</h3><p><strong>These are the guitars for adult beginners with a real budget who want a definitive instrument from day one.</strong> They cost more than the beginner picks above — but that money buys you a guitar you will never outgrow.</p><p><strong>Fender Player II Stratocaster HSS — the do-it-all premium: </strong>A real Fender made in Mexico with the Player II quality bar: a modern C-shaped neck, an HSS pickup layout that covers both classic Strat 'snap' and full humbucker punch, and a two-point tremolo that returns to pitch reliably. If you want one guitar that handles everything for decades, this is it.</p><p><strong>Fender Player II Telecaster — the timeless workhorse: </strong>Single-coil Tele twang, superb articulation, and a neck that just feels like home. The player\'s player — simple, bulletproof and instantly recognizable.</p><p><strong>Fender Player II Jazzmaster — for the offset crowd: </strong>Jazzmaster pickups with a warmer, fuller voice than a Strat or Tele, a floating vibrato with tremolo lock, and that unmistakable offset look. Perfect for indie, surf and every style in between.</p><p><strong>Is a premium guitar right for you? </strong>Only buy at this tier if you are sure the hobby is here to stay and your budget genuinely stretches. The value picks above play far above their price — a premium guitar is for those who want the final instrument now. See our <a href="/guides/best-electric-guitar.html" class="guide-link-btn">Best Electric Guitar guide</a> for the full premium range.</p>';
const cat4ES = '<h3>Gama premium: las guitarras para toda la vida (más de £600 / $800)</h3><p><strong>Son las guitarras para principiantes adultos con un presupuesto real que quieren un instrumento definitivo desde el primer día.</strong> Cuestan más que las opciones de principiante de arriba, pero ese dinero compra una guitarra que nunca superarás.</p><p><strong>Fender Player II Stratocaster HSS — la premium todoterreno: </strong>Una auténtica Fender hecha en México con el listón de calidad Player II: mástil en C moderno, configuración HSS que cubre el "golpe" clásico de Strat y la pegada completa de una humbucker, y un trémolo de dos puntos que vuelve fielmente a la afinación. Si quieres una sola guitarra que lo haga todo durante décadas, esta es.</p><p><strong>Fender Player II Telecaster — la todoterreno atemporal: </strong>El twang de Tele de single coil, articulación excelente y un mástil que se siente como en casa. La guitarra de los guitarristas: simple, a prueba de balas e instantáneamente reconocible.</p><p><strong>Fender Player II Jazzmaster — para el público offset: </strong>Pastillas Jazzmaster con una voz más cálida y llena que una Strat o una Tele, vibrato flotante con bloqueo de trémolo y ese inconfundible aspecto offset. Perfecta para indie, surf y cualquier estilo intermedio.</p><p><strong>¿Es una premium lo tuyo? </strong>Compra en este nivel solo si estás seguro de que el hobby va para largo y tu presupuesto realmente llega. Las opciones de valor tocan muy por encima de su precio — una premium es para quien quiere el instrumento definitivo ya. Consulta nuestra <a href="/guides/best-electric-guitar_es.html" class="guide-link-btn">guía de la Mejor Guitarra Eléctrica</a> para toda la gama premium.</p>';

x.sections = [
  { heading: 'What Makes a Great Beginner Electric Guitar?', heading_es: '¿Qué hace que una guitarra eléctrica sea ideal para principiantes?', content: introEN, content_es: introES, products: [] },
  { heading: 'Best Value Beginner Guitars: The All-Round Champions', heading_es: 'Mejores guitarras de valor: las reinas de la calidad-precio', content: cat1EN, content_es: cat1ES, products: [103, 462, 310] },
  { heading: 'Specialist Picks: Rock, Small Hands & Amp-Free Practice', heading_es: 'Opciones especializadas: rock, manos pequeñas y práctica sin amplificador', content: cat2EN, content_es: cat2ES, products: [463, 313, 295] },
  { heading: 'The Step-Up Guitars: You Won\'t Outgrow These', heading_es: 'Las guitarras de paso intermedio: no quedarás corto', content: cat3EN, content_es: cat3ES, products: [464, 309] },
  { heading: 'Premium Investment: The Buy-It-For-Life Guitars', heading_es: 'Inversión Premium: las guitarras para toda la vida', content: cat4EN, content_es: cat4ES, products: [124, 444, 65] },
  { heading: 'What Accessories Do You Need with Your First Guitar?', heading_es: '¿Qué accesorios necesitas con tu primera guitarra?', content: x.sections[5].content, content_es: x.sections[5].content_es, products: [] }
];

// ===== CONCLUSION / VERDICT (mention categories) =====
x.conclusion = 'For most beginners, the answer starts in the value tier: the Yamaha Pacifica 112V is the best all-round starter, the Squier Sonic Stratocaster HT is the simplest for staying in tune, and the Squier Affinity Stratocaster is the classic pick. If you need something specialist, the Ibanez Gio GRG121DX handles rock and metal, the Squier Sonic Mustang fits small hands, and the Enya Nova Go Sonic plays anywhere. Want a step up that lasts? The Yamaha Revstar RSE20 covers it. And if you have a real premium budget and want your final guitar now, the Fender Player II series is the buy-it-for-life tier. Whatever you choose, budget for a professional setup and a good amp like the Boss Katana 50. <p><a href="/guides/player-strat-vs-pacifica.html" class="guide-link-btn">Player Strat vs Pacifica</a> <a href="/guides/best-electric-guitar.html" class="guide-link-btn">Best Electric Guitar</a> <a href="/guides/beginner-guitar.html" class="guide-link-btn">Best Beginner Guitars for Songwriting</a></p>';
x.conclusion_es = 'Para la mayoría de los principiantes, la respuesta empieza en la gama de valor: la Yamaha Pacifica 112V es la mejor todoterreno, la Squier Sonic Stratocaster HT es la más sencilla para mantener la afinación y la Squier Affinity Stratocaster es la clásica. Si necesitas algo especializado, la Ibanez Gio GRG121DX cubre el rock y el metal, la Squier Sonic Mustang encaja con manos pequeñas y la Enya Nova Go Sonic toca en cualquier sitio. ¿Quieres un paso que dure? La Yamaha Revstar RSE20 lo cubre. Y si tienes un presupuesto premium de verdad y quieres tu guitarra definitiva ya, la serie Fender Player II es el nivel para toda la vida. Elijas la que elijas, presupuesta un ajuste profesional y un buen amplificador como el Boss Katana 50. <p>También te interesa: <a href="/guides/player-strat-vs-pacifica_es.html" class="guide-link-btn">Player Strat vs Pacifica</a> <a href="/guides/best-electric-guitar_es.html" class="guide-link-btn">Mejor Guitarra Eléctrica</a> <a href="/guides/beginner-guitar_es.html" class="guide-link-btn">Mejores Guitarras para Principiantes y Composición</a></p>';
x.verdict = 'Start in the value tier: the Yamaha Pacifica 112V is the best all-round beginner electric, the Squier Sonic Stratocaster HT is the easiest to keep in tune, and the Squier Affinity is the classic Strat pick. The Ibanez Gio GRG121DX wins for rock and metal. For the next step up, the Yamaha Revstar RSE20 lasts for years — and if you want the definitive instrument now, the Fender Player II series is your premium buy-it-for-life tier.';
x.verdict_es = 'Empieza en la gama de valor: la Yamaha Pacifica 112V es la mejor eléctrica todoterreno para principiantes, la Squier Sonic Stratocaster HT es la más fácil de mantener afinada y la Squier Affinity es la clásica. La Ibanez Gio GRG121DX gana para rock y metal. Para el paso siguiente, la Yamaha Revstar RSE20 dura años — y si quieres el instrumento definitivo ya, la serie Fender Player II es tu nivel premium para toda la vida.';

// ===== PRODUCT TABLE: ALL 11 GUITARS =====
x.productTable = {
  title: 'Best Beginner Electric Guitars Compared',
  title_es: 'Comparativa de las mejores guitarras eléctricas para principiantes',
  columns: [
    { title: 'Yamaha Pacifica 112V', title_es: 'Yamaha Pacifica 112V' },
    { title: 'Squier Sonic Strat HT', title_es: 'Squier Sonic Strat HT' },
    { title: 'Squier Affinity Strat', title_es: 'Squier Affinity Strat' },
    { title: 'Ibanez Gio GRG121DX', title_es: 'Ibanez Gio GRG121DX' },
    { title: 'Squier Sonic Mustang', title_es: 'Squier Sonic Mustang' },
    { title: 'Enya Nova Go Sonic', title_es: 'Enya Nova Go Sonic' },
    { title: 'Yamaha Revstar RSE20', title_es: 'Yamaha Revstar RSE20' },
    { title: 'Squier Debut Strat', title_es: 'Squier Debut Strat' },
    { title: 'Fender Player II Strat HSS', title_es: 'Fender Player II Strat HSS' },
    { title: 'Fender Player II Tele', title_es: 'Fender Player II Tele' },
    { title: 'Fender Player II Jazzmaster', title_es: 'Fender Player II Jazzmaster' }
  ],
  rows: [
    { label: 'Price', label_es: 'Precio', values: [
      { value: '$349', value_es: '$349' }, { value: '$159', value_es: '$159' },
      { value: '$320', value_es: '$320' }, { value: '$199', value_es: '$199' },
      { value: '$209', value_es: '$209' }, { value: '$369.99', value_es: '$369,99' },
      { value: '$439', value_es: '$439' }, { value: '$147', value_es: '$147' },
      { value: '$849', value_es: '$849' }, { value: '$849', value_es: '$849' },
      { value: '$949', value_es: '$949' }
    ]},
    { label: 'Tier', label_es: 'Nivel', values: [
      { value: 'Value', value_es: 'Valor' }, { value: 'Value', value_es: 'Valor' },
      { value: 'Value', value_es: 'Valor' }, { value: 'Specialist', value_es: 'Especialista' },
      { value: 'Specialist', value_es: 'Especialista' }, { value: 'Specialist', value_es: 'Especialista' },
      { value: 'Step up', value_es: 'Paso intermedio' }, { value: 'Step up', value_es: 'Paso intermedio' },
      { value: 'Premium', value_es: 'Premium' }, { value: 'Premium', value_es: 'Premium' },
      { value: 'Premium', value_es: 'Premium' }
    ]},
    { label: 'Best For', label_es: 'Ideal Para', values: [
      { value: 'Best all-rounder for most beginners', value_es: 'La mejor todoterreno para la mayoría' },
      { value: 'Starting simple, staying in tune', value_es: 'Empezar sencillo, mantener la afinación' },
      { value: 'Classic Stratocaster look on a budget', value_es: 'Aspecto clásico de Stratocaster económico' },
      { value: 'Rock, punk & metal beginners', value_es: 'Principiantes de rock, punk y metal' },
      { value: 'Kids & smaller hands', value_es: 'Niños y manos pequeñas' },
      { value: 'Play anywhere, no amp needed', value_es: 'Tocar en cualquier sitio, sin amplificador' },
      { value: 'Higher budget, keep it for years', value_es: 'Presupuesto alto, conservarla años' },
      { value: 'Cheapest real Strat experience', value_es: 'La experiencia Strat real más barata' },
      { value: 'One do-it-all guitar for decades', value_es: 'Una guitarra que lo hace todo durante décadas' },
      { value: 'Timeless Tele twang', value_es: 'El twang atemporal de Tele' },
      { value: 'Offset look, warm Jazzmaster voice', value_es: 'Aspecto offset, voz cálida de Jazzmaster' }
    ]},
    { label: 'Body Wood', label_es: 'Madera del Cuerpo', values: [
      { value: 'Alder', value_es: 'Aliso' }, { value: 'Poplar', value_es: 'Álamo' },
      { value: 'Poplar', value_es: 'Álamo' }, { value: 'Poplar', value_es: 'Álamo' },
      { value: 'Poplar (offset)', value_es: 'Álamo (offset)' }, { value: 'Carbon fiber', value_es: 'Fibra de carbono' },
      { value: 'Chambered mahogany', value_es: 'Caoba ahuecada' }, { value: 'Poplar', value_es: 'Álamo' },
      { value: 'Alder', value_es: 'Aliso' }, { value: 'Alder', value_es: 'Aliso' },
      { value: 'Alder', value_es: 'Aliso' }
    ]},
    { label: 'Neck', label_es: 'Mástil', values: [
      { value: 'C-shape maple', value_es: 'Arce en C' }, { value: 'Slim C-shape maple', value_es: 'Arce en C delgado' },
      { value: 'C-shape maple, satin', value_es: 'Arce en C satinado' }, { value: 'Slim GRG maple', value_es: 'Arce GRG delgado' },
      { value: 'Slim C-shape maple', value_es: 'Arce en C delgado' }, { value: 'C-shape composite', value_es: 'Compuesto en C' },
      { value: 'Set-in C', value_es: 'C set-in' }, { value: 'Slim C-shape maple', value_es: 'Arce en C delgado' },
      { value: 'Modern C', value_es: 'C moderno' }, { value: 'Modern C', value_es: 'C moderno' },
      { value: 'Modern C', value_es: 'C moderno' }
    ]},
    { label: 'Frets & Fretboard', label_es: 'Trastes y Diapasón', values: [
      { value: '22 medium, rosewood', value_es: '22 medium, palo rosa' },
      { value: '21 medium, maple', value_es: '21 medium, arce' },
      { value: '21 medium jumbo, maple/laurel', value_es: '21 medium jumbo, arce/laurel' },
      { value: '24, maple', value_es: '24, arce' },
      { value: '21 medium jumbo, maple/laurel', value_es: '21 medium jumbo, arce/laurel' },
      { value: '22, composite', value_es: '22, compuesto' },
      { value: '22 medium, rosewood', value_es: '22 medium, palo rosa' },
      { value: '21 medium jumbo, maple', value_es: '21 medium jumbo, arce' },
      { value: '22 medium jumbo', value_es: '22 medium jumbo' },
      { value: '22 medium jumbo', value_es: '22 medium jumbo' },
      { value: '22 medium jumbo', value_es: '22 medium jumbo' }
    ]},
    { label: 'Pickups', label_es: 'Pastillas', values: [
      { value: 'HSS — humbucker + 2 singles', value_es: 'HSS — humbucker + 2 singles' },
      { value: '3 ceramic single coils', value_es: '3 single coils cerámicas' },
      { value: '3 ceramic single coils', value_es: '3 single coils cerámicas' },
      { value: '2 IBZ-6 humbuckers', value_es: '2 humbuckers IBZ-6' },
      { value: '2 ceramic single coils', value_es: '2 single coils cerámicas' },
      { value: 'Single coil + humbucker', value_es: 'Single coil + humbucker' },
      { value: '2 Alnico V humbuckers', value_es: '2 humbuckers Alnico V' },
      { value: '3 ceramic single coils', value_es: '3 single coils cerámicas' },
      { value: 'HSS — Alnico pickups', value_es: 'HSS — pastillas Alnico' },
      { value: '2 single coils', value_es: '2 single coils' },
      { value: '2 Jazzmaster single coils', value_es: '2 single coils de Jazzmaster' }
    ]},
    { label: 'Scale Length', label_es: 'Longitud de Escala', values: [
      { value: '25.5 in (648 mm)', value_es: '25,5" (648 mm)' },
      { value: '25.5 in (648 mm)', value_es: '25,5" (648 mm)' },
      { value: '25.5 in (648 mm)', value_es: '25,5" (648 mm)' },
      { value: '25.5 in (648 mm)', value_es: '25,5" (648 mm)' },
      { value: '24 in (610 mm)', value_es: '24" (610 mm)' },
      { value: '25.5 in (648 mm)', value_es: '25,5" (648 mm)' },
      { value: '24.75 in (628 mm)', value_es: '24,75" (628 mm)' },
      { value: '25.5 in (648 mm)', value_es: '25,5" (648 mm)' },
      { value: '25.5 in (648 mm)', value_es: '25,5" (648 mm)' },
      { value: '25.5 in (648 mm)', value_es: '25,5" (648 mm)' },
      { value: '25.5 in (648 mm)', value_es: '25,5" (648 mm)' }
    ]},
    { label: 'Tremolo / Bridge', label_es: 'Trémolo / Puente', values: [
      { value: 'Vintage-style tremolo', value_es: 'Trémolo estilo vintage' },
      { value: 'Fixed (hardtail)', value_es: 'Fijo (hardtail)' },
      { value: '2-point sync tremolo', value_es: 'Trémolo sincronizado de 2 puntos' },
      { value: 'Fixed F106 bridge', value_es: 'Puente fijo F106' },
      { value: 'Fixed 6-saddle hardtail', value_es: 'Hardtail fijo de 6 selletas' },
      { value: 'Fixed', value_es: 'Fijo' },
      { value: 'Tune-o-matic + stopbar', value_es: 'Tune-o-matic + tope' },
      { value: 'Tremolo w/ removable arm', value_es: 'Trémolo con palanca extraíble' },
      { value: '2-point tremolo', value_es: 'Trémolo de 2 puntos' },
      { value: 'Fixed 3-saddle', value_es: 'Fijo de 3 selletas' },
      { value: 'Floating vibrato', value_es: 'Vibrato flotante' }
    ]},
    { label: 'Tuners', label_es: 'Clavijas', values: [
      { value: 'Sealed die-cast', value_es: 'Selladas de fundición' },
      { value: 'Sealed', value_es: 'Selladas' },
      { value: 'Sealed die-cast', value_es: 'Selladas de fundición' },
      { value: 'Die-cast', value_es: 'De fundición' },
      { value: 'Sealed die-cast', value_es: 'Selladas de fundición' },
      { value: 'Sealed', value_es: 'Selladas' },
      { value: 'Sealed', value_es: 'Selladas' },
      { value: 'Sealed-gear', value_es: 'Con engranaje sellado' },
      { value: 'Sealed', value_es: 'Selladas' },
      { value: 'Sealed', value_es: 'Selladas' },
      { value: 'Sealed', value_es: 'Selladas' }
    ]},
    { label: 'Weight', label_es: 'Peso', values: [
      { value: '~7.5 lb (3.4 kg)', value_es: '~3,4 kg' },
      { value: '~7.0 lb (3.2 kg)', value_es: '~3,2 kg' },
      { value: '~7.5 lb (3.4 kg)', value_es: '~3,4 kg' },
      { value: '~7.7 lb (3.5 kg)', value_es: '~3,5 kg' },
      { value: '~6.0 lb (2.7 kg)', value_es: '~2,7 kg' },
      { value: '~6.0 lb (2.7 kg)', value_es: '~2,7 kg' },
      { value: '~7.3 lb (3.3 kg)', value_es: '~3,3 kg' },
      { value: '~7.0 lb (3.2 kg)', value_es: '~3,2 kg' },
      { value: '~7.2 lb (3.3 kg)', value_es: '~3,3 kg' },
      { value: '~7.0 lb (3.2 kg)', value_es: '~3,2 kg' },
      { value: '~7.5 lb (3.4 kg)', value_es: '~3,4 kg' }
    ]}
  ]
};

g[idx] = x;
fs.writeFileSync(fp, JSON.stringify(g, null, 2) + '\n', 'utf8');
console.log('restructured into 4 categories; table now has 11 columns; premium tier kept');