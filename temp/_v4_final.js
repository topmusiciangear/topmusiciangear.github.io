const fs = require('fs');
const path = require('path');
const fp = path.join(__dirname, '..', 'data', 'guides.json');
const g = JSON.parse(fs.readFileSync(fp, 'utf8'));
const idx = g.findIndex(v => v.id === 'best-beginner-electric-guitar');
if (idx === -1) { console.error('guide not found'); process.exit(1); }
const x = g[idx];

// ===== SECTIONS BY CATEGORY =====

// 0) Intro / framing (no product cards) - keep existing content
const intro = x.sections[0];

// 1) CATEGORY 1 - Value queens (now 5: Pacifica, Affinity, Sonic HT, Epiphone, Jet)
const cat1EN = '<h3>Under around $350 / £250: five proven value leaders</h3><p><strong>The value tier carries the answer for most beginners — three all-round champions plus two budget power moves: the Yamaha Pacifica 112V, Squier Affinity Stratocaster and Squier Sonic Stratocaster HT, joined by the Epiphone Les Paul Special-II E1 and the Jet Guitars JS-300.</strong> Together they cover nearly every guitar style and budget without breaking the bank.</p><p><strong>Yamaha Pacifica 112V — the best all-rounder: </strong>An alder body, versatile HSS pickup layout and proper build quality make it the most complete budget electric. It handles rock, blues, pop and clean tones, and it feels like a much more expensive instrument.</p><p><strong>Squier Affinity Stratocaster — the timeless classic: </strong>The most popular first guitar on the planet. Iconic Strat look and feel, slim C-neck, sealed tuners and surprisingly good pickups for the money.</p><p><strong>Squier Sonic Stratocaster HT — the easiest to stay in tune: </strong>Its fixed hardtail bridge removes the biggest beginner frustration: tuning drift. If simplicity is your top priority, this is the one.</p><p><strong>Epiphone Les Paul Special-II E1 — the cheapest real Les Paul-style humbucker guitar: </strong>A mahogany body and bolt-on mahogany SlimTaper neck with two open-coil 700T/650R humbuckers and a tune-o-matic bridge. It is the perfect counterweight to all the single-coil guitars here — warm, punchy and unmistakably Les Paul for a very friendly price.</p><p><strong>Jet Guitars JS-300 — the roasted-neck value Strat: </strong>A Canadian roasted maple neck and fingerboard, bone nut and three ceramic single-coils in a classic S-style body. Roasted maple at this price is almost unheard of — it feels premium and stays stable, making the JS-300 the surprise value pick of the group.</p><p><strong>How to choose: </strong>Maximum versatility → Pacifica. The classic Strat experience you can mod forever → Affinity. Maximum simplicity and tuning stability → Sonic Strat HT. Les Paul looks and humbucker warmth on a budget → Epiphone Special II. Premium-feel roasted neck and tweakability → Jet JS-300. There is no wrong answer in this group.</p>';
const cat1ES = '<h3>Menos de unos $350 / £250: cinco líderes de valor probado</h3><p><strong>La gama de valor tiene la respuesta para la mayoría de los principiantes — tres campeones polivalentes y dos movimientos económicos potentes: la Yamaha Pacifica 112V, la Squier Affinity Stratocaster y la Squier Sonic Stratocaster HT, junto a la Epiphone Les Paul Special-II E1 y la Jet Guitars JS-300.</strong> Juntas cubren casi todos los estilos y presupuestos de guitarra sin vaciarte el bolsillo.</p><p><strong>Yamaha Pacifica 112V — la mejor todoterreno: </strong>Un cuerpo de aliso, la versátil configuración HSS y la buena construcción la convierten en la eléctrica económica más completa. Maneja rock, blues, pop y tonos limpios, y se siente como un instrumento mucho más caro.</p><p><strong>Squier Affinity Stratocaster — el clásico de siempre: </strong>La primera guitarra más popular del planeta. Aspecto y sensación icónicos de Strat, mástil en C delgado, clavijas selladas y pastillas sorprendentemente buenas por el dinero.</p><p><strong>Squier Sonic Stratocaster HT — la más fácil de mantener afinada: </strong>Su puente fijo hardtail elimina la mayor frustración del principiante: que se desafine. Si la sencillez es tu prioridad, esta es la tuya.</p><p><strong>Epiphone Les Paul Special-II E1 — la Les Paul de estilo humbucker más barata de verdad: </strong>Un cuerpo de caoba y un mástil atornillado de caoba SlimTaper con dos humbuckers de bobina abierta 700T/650R y puente tune-o-matic. Es el contrapeso perfecto a todas las guitarras de single coil de aquí — cálida, contundente e inconfundiblemente Les Paul por un precio muy amable.</p><p><strong>Jet Guitars JS-300 — la Strat de valor con mástil tostado: </strong>Un mástil y diapasón de arce canadiense tostado, cejuela de hueso y tres single coils cerámicas en un cuerpo de estilo S clásico. El arce tostado a este precio es casi inaudito — se siente premium y permanece estable, lo que convierte a la JS-300 en la sorpresa de valor del grupo.</p><p><strong>Cómo elegir: </strong>Máxima versatilidad → Pacifica. La experiencia Strat clásica que puedes modificar para siempre → Affinity. Máxima sencillez y estabilidad de afinación → Sonic Strat HT. Aspecto de Les Paul y calidez de humbucker en económico → Epiphone Special II. Mástil tostado con sensación premium y ajustable → Jet JS-300. No hay respuesta equivocada en este grupo.</p>';

// 2) CATEGORY 2 - Specialist picks
const cat2EN = '<h3>Rock, small hands, and amp-free travel</h3><p><strong>Not every beginner wants the same thing: some want to chug heavy riffs, some have smaller hands, and some want to practice anywhere.</strong> These three specialist picks solve those specific needs.</p><p><strong>Ibanez Gio GRG121DX — best for rock & metal: </strong>A fast, slim GRG neck, two IBZ-6 humbuckers and a fixed F106 bridge deliver thick, punchy distortion without floating-tremolo tuning drama. With 24 frets and a 25.5-inch scale, it brings the speed of a much pricier RG.</p><p><strong>Squier Sonic Mustang — best for kids and smaller hands: </strong>A compact offset body, slim C-shaped maple neck and a 24-inch scale give slinkier strings and an easier reach. Two ceramic single-coils keep that indie/alternative jangle, and the 6-saddle hardtail bridge stays reliably in tune.</p><p><strong>Enya Nova Go Sonic — best for travel and amp-free practice: </strong>A carbon-fiber electric with a built-in 10W speaker and DSP effects, the Nova Go plugs in nowhere and plays everywhere. Bluetooth 5.1 for backing tracks, a headphone out, and USB-C recording to your phone make it the ultimate couch-and-plane guitar.</p>';
const cat2ES = '<h3>Rock, manos pequeñas y viajes sin amplificador</h3><p><strong>No todos los principiantes quieren lo mismo: unos quieren riffs pesados, otros tienen manos más pequeñas y otros quieren practicar en cualquier sitio.</strong> Estas tres opciones especializadas resuelven esas necesidades concretas.</p><p><strong>Ibanez Gio GRG121DX — la mejor para rock y metal: </strong>Un mástil GRG rápido y delgado, dos humbuckers IBZ-6 y un puente fijo F106 ofrecen una distorsión gruesa y contundente sin el drama de afinación del trémolo flotante. Con 24 trastes y escala de 25,5", trae la velocidad de una RG mucho más cara.</p><p><strong>Squier Sonic Mustang — la mejor para niños y manos pequeñas: </strong>Un cuerpo offset compacto, mástil de arce en C delgado y escala de 24" dan cuerdas más fáciles de pulsar y un alcance más cómodo. Dos single coils cerámicas mantienen ese deje indie/alternativo, y el puente hardtail de 6 selletas se mantiene fiablemente afinado.</p><p><strong>Enya Nova Go Sonic — la mejor para viajar y practicar sin amplificador: </strong>Una eléctrica de fibra de carbono con altavoz de 10W integrado y efectos DSP, la Nova Go no necesita enchufarse a nada para tocar en cualquier parte. Bluetooth 5.1 para pistas de acompañamiento, salida de auriculares y grabación USB-C al móvil la convierten en la guitarra definitiva de sofá y avión.</p>';

// 3) CATEGORY 3 - Step up
const cat3EN = '<h3>Guitars you won\'t outgrow</h3><p><strong>Two models sit between the value picks and the territory of premium instruments: the step-up budget choice and the absolute entry point.</strong></p><p><strong>Yamaha Revstar Element RSE20 — the step-up that lasts: </strong>A chambered mahogany body with a set-in neck gives warm, singing sustain. Two Alnico V humbuckers (VH3n/VH3b) cover clean sparkle to classic rock, the push-pull Dry Switch adds clarity, and the tune-o-matic bridge with stopbar keeps tuning rock-solid. At a 24.75-inch scale, it is the higher-budget pick you will keep for years without needing a second guitar.</p><p><strong>Squier Debut Stratocaster — the cheapest real Strat: </strong>Fender\'s answer to the cheap Amazon import. A slim C-shaped neck, thin lightweight poplar body, three ceramic single-coils with 5-way switching and a tremolo with removable arm. It won\'t replace a Mexican or American Fender, but for a genuinely tight budget it is a playable, trendy first guitar with a 2-year warranty.</p><p><strong>Looking above $700? </strong>This guide covers beginner guitars up to the step-up tier. If your budget goes higher and you want a premium instrument from day one — the Fender Player series, American Pro II, or an exclusive model — see our <a href="/guides/best-electric-guitar.html" class="guide-link-btn">Best Electric Guitar guide</a> for the full range from mid-price to pro.</p>';
const cat3ES = '<h3>Guitarras que no quedarás corto</h3><p><strong>Dos modelos se sitúan entre las opciones de valor y el territorio de los instrumentos premium: la opción de paso intermedio y el punto de entrada absoluto.</strong></p><p><strong>Yamaha Revstar Element RSE20 — el paso que dura: </strong>Un cuerpo de caoba ahuecada con mástil set-in ofrece un sustain cálido y cantarín. Dos humbuckers de Alnico V (VH3n/VH3b) cubren desde limpios brillantes hasta rock clásico, el Dry Switch push-pull añade claridad y el puente tune-o-matic con tope mantiene la afinación impecable. Con escala de 24,75", es la elección de presupuesto más alto que conservarás durante años sin necesidad de una segunda guitarra.</p><p><strong>Squier Debut Stratocaster — la Strat real más barata: </strong>La respuesta de Fender a las importaciones baratas de Amazon. Mástil en C delgado, cuerpo ligero de álamo, tres single coils cerámicas con conmutador de 5 posiciones y trémolo con palanca extraíble. No sustituirá a una Fender mexicana o americana, pero para un presupuesto realmente ajustado es una primera guitarra tocable y con estilo, con 2 años de garantía.</p><p><strong>¿Buscas más de $700? </strong>Esta guía cubre guitarras de principiante hasta el nivel de paso intermedio. Si tu presupuesto es mayor y quieres un instrumento premium desde el primer día —la serie Fender Player, la American Pro II o un modelo exclusivo— consulta nuestra <a href="/guides/best-electric-guitar_es.html" class="guide-link-btn">guía de la Mejor Guitarra Eléctrica</a> para toda la gama desde precio medio hasta profesional.</p>';

// 5) Accessories - keep existing
const acc = x.sections[x.sections.length - 1];

x.sections = [
  { heading: intro.heading, heading_es: intro.heading_es, content: intro.content, content_es: intro.content_es, products: [] },
  { heading: 'Best Value Beginner Guitars: The All-Round Champions', heading_es: 'Mejores guitarras de valor: las reinas de la calidad-precio', content: cat1EN, content_es: cat1ES, products: [103, 310, 462, 465, 466] },
  { heading: 'Specialist Picks: Rock, Small Hands & Amp-Free Practice', heading_es: 'Opciones especializadas: rock, manos pequeñas y práctica sin amplificador', content: cat2EN, content_es: cat2ES, products: [463, 313, 295] },
  { heading: 'The Step-Up Guitars: You Won\'t Outgrow These', heading_es: 'Las guitarras de paso intermedio: no quedarás corto', content: cat3EN, content_es: cat3ES, products: [464, 309] },
  { heading: 'What Accessories Do You Need with Your First Guitar?', heading_es: '¿Qué accesorios necesitas con tu primera guitarra?', content: acc.content, content_es: acc.content_es, products: [] }
];

// ===== CONCLUSION / VERDICT =====
x.conclusion = 'For most beginners, the answer starts in the value tier: the Yamaha Pacifica 112V is the best all-round starter, the Squier Affinity Stratocaster is the classic pick, the Squier Sonic Stratocaster HT is the simplest for staying in tune, the Epiphone Les Paul Special-II E1 is the cheapest real Les Paul-style humbucker guitar, and the Jet Guitars JS-300 brings a premium roasted-maple neck to budget territory. If you need something specialist, the Ibanez Gio GRG121DX handles rock and metal, the Squier Sonic Mustang fits small hands, and the Enya Nova Go Sonic plays anywhere. Want a step up that lasts? The Yamaha Revstar RSE20 covers it. For a higher budget, see our Best Electric Guitar guide for the premium Fender Player, American Pro II and pro tiers. Whatever you choose, budget for a professional setup and a good amp like the Boss Katana 50. <p><a href="/guides/player-strat-vs-pacifica.html" class="guide-link-btn">Player Strat vs Pacifica</a> <a href="/guides/best-electric-guitar.html" class="guide-link-btn">Best Electric Guitar</a> <a href="/guides/beginner-guitar.html" class="guide-link-btn">Best Beginner Guitars for Songwriting</a></p>';
x.conclusion_es = 'Para la mayoría de los principiantes, la respuesta empieza en la gama de valor: la Yamaha Pacifica 112V es la mejor todoterreno, la Squier Affinity Stratocaster es la clásica, la Squier Sonic Stratocaster HT es la más sencilla para mantener la afinación, la Epiphone Les Paul Special-II E1 es la Les Paul de humbuckers más barata de verdad y la Jet Guitars JS-300 trae un mástil de arce tostado premium al territorio económico. Si necesitas algo especializado, la Ibanez Gio GRG121DX cubre el rock y el metal, la Squier Sonic Mustang encaja con manos pequeñas y la Enya Nova Go Sonic toca en cualquier sitio. ¿Quieres un paso que dure? La Yamaha Revstar RSE20 lo cubre. Para presupuestos más altos, consulta nuestra guía de la Mejor Guitarra Eléctrica para las gamas premium Fender Player, American Pro II y profesionales. Elijas la que elijas, presupuesta un ajuste profesional y un buen amplificador como el Boss Katana 50. <p>También te interesa: <a href="/guides/player-strat-vs-pacifica_es.html" class="guide-link-btn">Player Strat vs Pacifica</a> <a href="/guides/best-electric-guitar_es.html" class="guide-link-btn">Mejor Guitarra Eléctrica</a> <a href="/guides/beginner-guitar_es.html" class="guide-link-btn">Mejores Guitarras para Principiantes y Composición</a></p>';
x.verdict = 'Start in the value tier: the Yamaha Pacifica 112V is the best all-round beginner electric, the Squier Affinity Stratocaster is the classic Strat pick, the Squier Sonic Stratocaster HT is the easiest to keep in tune, the Epiphone Les Paul Special-II E1 is the best-value humbucker guitar, and the Jet Guitars JS-300 is the surprise premium-feel value Strat. The Ibanez Gio GRG121DX wins for rock and metal. For the next step up, the Yamaha Revstar RSE20 lasts for years.';
x.verdict_es = 'Empieza en la gama de valor: la Yamaha Pacifica 112V es la mejor eléctrica todoterreno para principiantes, la Squier Affinity Stratocaster es la clásica, la Squier Sonic Stratocaster HT es la más fácil de mantener afinada, la Epiphone Les Paul Special-II E1 es la mejor humbucker en valor y la Jet Guitars JS-300 es la Strat de valor con sensación premium sorprendente. La Ibanez Gio GRG121DX gana para rock y metal. Para el paso siguiente, la Yamaha Revstar RSE20 dura años.';

// ===== PRODUCT TABLE: ALL 10 GUITARS =====
x.productTable = {
  title: 'Best Beginner Electric Guitars Compared',
  title_es: 'Comparativa de las mejores guitarras eléctricas para principiantes',
  columns: [
    { title: 'Yamaha Pacifica 112V', title_es: 'Yamaha Pacifica 112V' },
    { title: 'Squier Affinity Strat', title_es: 'Squier Affinity Strat' },
    { title: 'Squier Sonic Strat HT', title_es: 'Squier Sonic Strat HT' },
    { title: 'Epiphone LP Special-II E1', title_es: 'Epiphone LP Special-II E1' },
    { title: 'Jet Guitars JS-300', title_es: 'Jet Guitars JS-300' },
    { title: 'Ibanez Gio GRG121DX', title_es: 'Ibanez Gio GRG121DX' },
    { title: 'Squier Sonic Mustang', title_es: 'Squier Sonic Mustang' },
    { title: 'Enya Nova Go Sonic', title_es: 'Enya Nova Go Sonic' },
    { title: 'Yamaha Revstar RSE20', title_es: 'Yamaha Revstar RSE20' },
    { title: 'Squier Debut Strat', title_es: 'Squier Debut Strat' }
  ],
  rows: [
    { label: 'Price', label_es: 'Precio', values: [
      { value: '$349', value_es: '$349' }, { value: '$320', value_es: '$320' },
      { value: '$159', value_es: '$159' }, { value: '$219', value_es: '$219' },
      { value: '$179', value_es: '$179' }, { value: '$199', value_es: '$199' },
      { value: '$209', value_es: '$209' }, { value: '$369.99', value_es: '$369,99' },
      { value: '$439', value_es: '$439' }, { value: '$147', value_es: '$147' }
    ]},
    { label: 'Best For', label_es: 'Ideal Para', values: [
      { value: 'Best all-rounder for most beginners', value_es: 'La mejor todoterreno para la mayoría' },
      { value: 'Classic Stratocaster look on a budget', value_es: 'Aspecto clásico de Stratocaster económico' },
      { value: 'Starting simple, staying in tune', value_es: 'Empezar sencillo, mantener la afinación' },
      { value: 'Cheapest real Les Paul-style humbucker guitar', value_es: 'La Les Paul de humbuckers más barata de verdad' },
      { value: 'Premium-feel roasted neck at budget price', value_es: 'Mástil tostado premium a precio económico' },
      { value: 'Rock, punk & metal beginners', value_es: 'Principiantes de rock, punk y metal' },
      { value: 'Kids & smaller hands', value_es: 'Niños y manos pequeñas' },
      { value: 'Play anywhere, no amp needed', value_es: 'Tocar en cualquier sitio, sin amplificador' },
      { value: 'Higher budget, keep it for years', value_es: 'Presupuesto alto, conservarla años' },
      { value: 'Cheapest real Strat experience', value_es: 'La experiencia Strat real más barata' }
    ]},
    { label: 'Body Wood', label_es: 'Madera del Cuerpo', values: [
      { value: 'Alder', value_es: 'Aliso' }, { value: 'Poplar', value_es: 'Álamo' },
      { value: 'Poplar', value_es: 'Álamo' }, { value: 'Mahogany', value_es: 'Caoba' },
      { value: 'Basswood', value_es: 'Tilo' }, { value: 'Poplar', value_es: 'Álamo' },
      { value: 'Poplar (offset)', value_es: 'Álamo (offset)' }, { value: 'Carbon fiber', value_es: 'Fibra de carbono' },
      { value: 'Chambered mahogany', value_es: 'Caoba ahuecada' }, { value: 'Poplar', value_es: 'Álamo' }
    ]},
    { label: 'Neck', label_es: 'Mástil', values: [
      { value: 'C-shape maple', value_es: 'Arce en C' }, { value: 'C-shape maple, satin', value_es: 'Arce en C satinado' },
      { value: 'Slim C-shape maple', value_es: 'Arce en C delgado' }, { value: 'Bolt-on mahogany, SlimTaper D', value_es: 'Caoba atornillada, SlimTaper D' },
      { value: 'Canadian roasted maple, Modern C', value_es: 'Arce canadiense tostado, C moderno' },
      { value: 'Slim GRG maple', value_es: 'Arce GRG delgado' }, { value: 'Slim C-shape maple', value_es: 'Arce en C delgado' },
      { value: 'C-shape composite', value_es: 'Compuesto en C' }, { value: 'Set-in C', value_es: 'C set-in' },
      { value: 'Slim C-shape maple', value_es: 'Arce en C delgado' }
    ]},
    { label: 'Frets & Fretboard', label_es: 'Trastes y Diapasón', values: [
      { value: '22 medium, rosewood', value_es: '22 medium, palo rosa' },
      { value: '21 medium jumbo, maple/laurel', value_es: '21 medium jumbo, arce/laurel' },
      { value: '21 medium, maple', value_es: '21 medium, arce' },
      { value: '22, rosewood', value_es: '22, palo rosa' },
      { value: '22, roasted maple', value_es: '22, arce tostado' },
      { value: '24, maple', value_es: '24, arce' },
      { value: '21 medium jumbo, maple/laurel', value_es: '21 medium jumbo, arce/laurel' },
      { value: '22, composite', value_es: '22, compuesto' },
      { value: '22 medium, rosewood', value_es: '22 medium, palo rosa' },
      { value: '21 medium jumbo, maple', value_es: '21 medium jumbo, arce' }
    ]},
    { label: 'Pickups', label_es: 'Pastillas', values: [
      { value: 'HSS — humbucker + 2 singles', value_es: 'HSS — humbucker + 2 singles' },
      { value: '3 ceramic single coils', value_es: '3 single coils cerámicas' },
      { value: '3 ceramic single coils', value_es: '3 single coils cerámicas' },
      { value: '2 open-coil humbuckers (700T/650R)', value_es: '2 humbuckers de bobina abierta (700T/650R)' },
      { value: '3 ceramic single coils', value_es: '3 single coils cerámicas' },
      { value: '2 IBZ-6 humbuckers', value_es: '2 humbuckers IBZ-6' },
      { value: '2 ceramic single coils', value_es: '2 single coils cerámicas' },
      { value: 'Single coil + humbucker', value_es: 'Single coil + humbucker' },
      { value: '2 Alnico V humbuckers', value_es: '2 humbuckers Alnico V' },
      { value: '3 ceramic single coils', value_es: '3 single coils cerámicas' }
    ]},
    { label: 'Scale Length', label_es: 'Longitud de Escala', values: [
      { value: '25.5 in (648 mm)', value_es: '25,5" (648 mm)' },
      { value: '25.5 in (648 mm)', value_es: '25,5" (648 mm)' },
      { value: '25.5 in (648 mm)', value_es: '25,5" (648 mm)' },
      { value: '24.75 in (628 mm)', value_es: '24,75" (628 mm)' },
      { value: '25.5 in (648 mm)', value_es: '25,5" (648 mm)' },
      { value: '25.5 in (648 mm)', value_es: '25,5" (648 mm)' },
      { value: '24 in (610 mm)', value_es: '24" (610 mm)' },
      { value: '25.5 in (648 mm)', value_es: '25,5" (648 mm)' },
      { value: '24.75 in (628 mm)', value_es: '24,75" (628 mm)' },
      { value: '25.5 in (648 mm)', value_es: '25,5" (648 mm)' }
    ]},
    { label: 'Bridge', label_es: 'Puente', values: [
      { value: 'Vintage-style tremolo', value_es: 'Trémolo estilo vintage' },
      { value: '2-point sync tremolo', value_es: 'Trémolo sincronizado de 2 puntos' },
      { value: 'Fixed (hardtail)', value_es: 'Fijo (hardtail)' },
      { value: 'Tune-o-matic + stopbar', value_es: 'Tune-o-matic + tope' },
      { value: 'Synchronized tremolo', value_es: 'Trémolo sincronizado' },
      { value: 'Fixed F106 bridge', value_es: 'Puente fijo F106' },
      { value: 'Fixed 6-saddle hardtail', value_es: 'Hardtail fijo de 6 selletas' },
      { value: 'Fixed', value_es: 'Fijo' },
      { value: 'Tune-o-matic + stopbar', value_es: 'Tune-o-matic + tope' },
      { value: 'Tremolo w/ removable arm', value_es: 'Trémolo con palanca extraíble' }
    ]},
    { label: 'Tuners', label_es: 'Clavijas', values: [
      { value: 'Sealed die-cast', value_es: 'Selladas de fundición' },
      { value: 'Sealed die-cast', value_es: 'Selladas de fundición' },
      { value: 'Sealed', value_es: 'Selladas' },
      { value: 'Covered, 14:1 ratio', value_es: 'Cubiertas, ratio 14:1' },
      { value: 'Chrome die-cast', value_es: 'De fundición cromadas' },
      { value: 'Die-cast', value_es: 'De fundición' },
      { value: 'Sealed die-cast', value_es: 'Selladas de fundición' },
      { value: 'Sealed', value_es: 'Selladas' },
      { value: 'Sealed', value_es: 'Selladas' },
      { value: 'Sealed-gear', value_es: 'Con engranaje sellado' }
    ]},
    { label: 'Weight', label_es: 'Peso', values: [
      { value: '~7.5 lb (3.4 kg)', value_es: '~3,4 kg' },
      { value: '~7.5 lb (3.4 kg)', value_es: '~3,4 kg' },
      { value: '~7.0 lb (3.2 kg)', value_es: '~3,2 kg' },
      { value: '~7.5 lb (3.4 kg)', value_es: '~3,4 kg' },
      { value: '~7.7 lb (3.5 kg)', value_es: '~3,5 kg' },
      { value: '~7.7 lb (3.5 kg)', value_es: '~3,5 kg' },
      { value: '~6.0 lb (2.7 kg)', value_es: '~2,7 kg' },
      { value: '~6.0 lb (2.7 kg)', value_es: '~2,7 kg' },
      { value: '~7.3 lb (3.3 kg)', value_es: '~3,3 kg' },
      { value: '~7.0 lb (3.2 kg)', value_es: '~3,2 kg' }
    ]}
  ]
};

g[idx] = x;
fs.writeFileSync(fp, JSON.stringify(g, null, 2) + '\n', 'utf8');
console.log('restructured: Player II removed, Epiphone LP Special-II E1 + Jet JS-300 added, table now 10 columns');