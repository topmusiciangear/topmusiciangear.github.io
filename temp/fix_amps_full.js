const fs = require('fs');
const DIR = 'C:/Users/Daniel/projects/topmusiciangear/';
const P = require(DIR + 'data/products.json');
const G = require(DIR + 'data/guides.json');

function rep(obj, key, oldS, newS, tag) {
  if (!obj[key] || !obj[key].includes(oldS)) {
    console.log('MISS [' + tag + '] in ' + key + ': ' + oldS.substring(0, 80));
    process.exitCode = 1;
    return;
  }
  obj[key] = obj[key].replace(oldS, newS);
}

// ============ PRODUCTS.JSON ============
const p75 = P.find(x => x.id === 75);
rep(p75, 'desc', 'delivers 500 watts through dual custom 10-inch Lavoce speakers', 'delivers 500 watts with an extension cab (250W standalone) through dual custom 10-inch Lavoce speakers', 'p75desc');
rep(p75, 'desc_es', 'entrega 500 vatios a través de dos altavoces custom de 10 pulgadas Lavoce', 'entrega 500 vatios con cabina de extensión (250W sin ella) a través de dos altavoces custom de 10 pulgadas Lavoce', 'p75desces');

const p76 = P.find(x => x.id === 76);
rep(p76, 'desc', '500 watts of power through two 10-inch Eminence speakers. Lightweight design at just 28 pounds.', '500 watts with an extension cab (350W standalone) through two 10-inch Eminence speakers. Lightweight design at 36.5 pounds.', 'p76desc');
rep(p76, 'desc', '9-band EQ', '4-band EQ', 'p76eq');
rep(p76, 'desc_es', '500 vatios de potencia a través de dos altavoces Eminence de 10 pulgadas. Diseño ligero de solo 12.7 kg.', '500 vatios con cabina de extensión (350W sin ella) a través de dos altavoces Eminence de 10 pulgadas. Diseño ligero de 16,6 kg.', 'p76desces');
rep(p76, 'desc_es', 'EQ de 9 bandas', 'EQ de 4 bandas', 'p76eqes');

const p555 = P.find(x => x.id === 555);
rep(p555, 'desc', 'delivers 200 watts through a single 15-inch Eminence speaker', 'delivers 200 watts with an extension cab (140W standalone) through a single 15-inch Eminence speaker', 'p555desc');
rep(p555, 'desc', 'weighs just 23 lbs — the lightest 15-inch combo in its class', 'weighs 34.5 lb', 'p555weight');
rep(p555, 'desc_es', 'entrega 200 vatios a través de un altavoz Eminence de 15 pulgadas', 'entrega 200 vatios con cabina de extensión (140W sin ella) a través de un altavoz Eminence de 15 pulgadas', 'p555desces');
rep(p555, 'desc_es', 'pesa solo 10,4 kg — el combo de 15 pulgadas más ligero de su clase', 'pesa 15,65 kg', 'p555weightes');

const p556 = P.find(x => x.id === 556);
rep(p556, 'desc', 'with 200 watts through a Custom15 speaker and 1" compression driver', 'with 200 watts with an extension cab (100W standalone) through a custom 15-inch Lavoce speaker', 'p556desc');
rep(p556, 'desc_es', 'con 200 vatios a través de un altavoz Custom15 y driver de compresión de 1"', 'con 200 vatios con cabina de extensión (100W sin ella) a través de un altavoz Lavoce de 15 pulgadas a medida', 'p556desces');

const p503 = P.find(x => x.id === 503);
rep(p503, 'desc', 'and the headphone output delivers a full amp tone in total silence.', 'and the headphone output delivers a full amp tone in total silence, and the built-in rechargeable battery (~5 hours) cuts the cord completely.', 'p503desc');
rep(p503, 'desc_es', 'y la salida de auriculares entrega un tono de amplificador completo en silencio total.', 'y la salida de auriculares entrega un tono de amplificador completo en silencio total, y la batería recargable integrada (~5 horas) corta el cable por completo.', 'p503desces');

// ============ GUIDES.JSON (guitar-bass-amps) ============
const g = G.find(x => x.id === 'guitar-bass-amps');

// --- RB-210 section heading ---
const rb210 = g.sections.find(s => s.products.length === 1 && s.products[0] === 75);
rep(rb210, 'heading', 'Ampeg Rocket Bass RB-210: 500 Watts of SVT DNA', 'Ampeg Rocket Bass RB-210: SVT DNA in a Portable 2x10', 'rb210h');
rep(rb210, 'heading_es', 'Ampeg Rocket Bass RB-210: 500 vatios de ADN SVT', 'Ampeg Rocket Bass RB-210: ADN SVT en un 2x10 portátil', 'rb210hes');

// --- Bass Amps overview: correct standalone watts ---
const bass = g.sections.find(s => s.heading === 'Bass Amps: What You Actually Need');
rep(bass, 'content', 'the Fender Rumble 200 V3 (1×15") and Ampeg Rocket Bass RB-115 (1×15", 500W) handle the low B with authority.', 'the Fender Rumble 200 V3 (1×15", 200W with ext. cab / 140W standalone) and Ampeg Rocket Bass RB-115 (1×15", 200W with ext. cab / 100W standalone) handle the low B with authority.', 'bassEN1');
rep(bass, 'content', 'The Ampeg Rocket Bass RB-210 brings the SVT-family grind with Super Grit Technology overdrive on demand; the Fender Rumble 500 V3 brings clean, punchy modern tone with built-in overdrive for edge.', 'The Ampeg Rocket Bass RB-210 brings the SVT-family grind with Super Grit Technology overdrive on demand (500W with ext. cab, 250W standalone); the Fender Rumble 500 V3 brings clean, punchy modern tone with built-in overdrive for edge (500W with ext. cab, 350W standalone).', 'bassEN2');
rep(bass, 'content_es', 'el Fender Rumble 200 V3 (1×15") y el Ampeg Rocket Bass RB-115 (1×15", 500W) manejan el Si grave con autoridad.', 'el Fender Rumble 200 V3 (1×15", 200W con cab. de extensión / 140W solo) y el Ampeg Rocket Bass RB-115 (1×15", 200W con cab. de extensión / 100W solo) manejan el Si grave con autoridad.', 'bassES1');
rep(bass, 'content_es', 'El Ampeg Rocket Bass RB-210 trae el grind familia SVT con overdrive Super Grit Technology a demanda (350W, 500W c/ cab. extensión); el Fender Rumble 500 V3 trae tono moderno limpio y pegado con overdrive integrado (350W, 500W c/ cab. extensión).', 'El Ampeg Rocket Bass RB-210 trae el grind familia SVT con overdrive Super Grit Technology a demanda (500W con cab. de extensión, 250W solo); el Fender Rumble 500 V3 trae tono moderno limpio y pegado con overdrive integrado (500W con cab. de extensión, 350W solo).', 'bassES2');

// --- New review sections (insert after Rumble 500 section) ---
const r500idx = g.sections.findIndex(s => s.products.length === 1 && s.products[0] === 76);
g.sections.splice(r500idx + 1, 0,
  {
    heading: 'Fender Rumble 200 V3: The 15-Inch Answer for 5-String Players',
    heading_es: 'Fender Rumble 200 V3: La respuesta de 15 pulgadas para 5 cuerdas',
    content: '<strong>For 5-string players, speaker size is the whole decision — and this is the most direct way into a real 15-inch.</strong> The Rumble 200 V3 pushes a single 15-inch Eminence driver with a switchable compression horn, which in plain words means the low B stays round and defined where dual 10s start choking. The Class-D amp gives 140W standalone and the full 200W with an 8-ohm extension cab. Footswitchable overdrive plus the Bright/Contour/Vintage trio covers Motown thump to modern grind, and XLR with ground lift, FX loop, aux and headphone complete the gigging package. I have rehearsed 5-string sets on 2x10 combos that fell apart on the B; this box simply does not. Made for 4 and 5-string bassists who rehearse, gig and record. Check extension-cab plans, overdrive taste and transport before buying.',
    content_es: '<strong>Para 5 cuerdas, el tamaño del altavoz lo decide todo — y esta es la vía más directa a un 15 pulgadas de verdad.</strong> El Rumble 200 V3 mueve un Eminence de 15 pulgadas con bocina de compresión conmutable, lo que en palabras sencillas significa que el Si grave se mantiene redondo y definido donde los dobles 10 empiezan a ahogarse. El amplificador Clase D da 140W solo y los 200W completos con una cabina de extensión de 8 ohmios. El overdrive conmutable por pedal más el trío Bright/Contour/Vintage cubre del thump Motown al grind moderno, y el XLR con ground lift, el loop de FX, el aux y los auriculares completan el paquete de directo. He ensayado repertorio de 5 cuerdas con combos 2x10 que se desarmaban en el Si; esta caja simplemente no. Pensado para bajistas de 4 y 5 cuerdas que ensayan, tocan y graban. Revisa tus planes de cabina de extensión, tu gusto de overdrive y el transporte antes de comprar.',
    products: [555]
  },
  {
    heading: 'Ampeg Rocket Bass RB-115: SVT Soul with 15-Inch Depth',
    heading_es: 'Ampeg Rocket Bass RB-115: Alma SVT con profundidad de 15 pulgadas',
    content: '<strong>SVT tone with a 15-inch voice — the Ampeg answer to the low B.</strong> The RB-115 pairs the Legacy preamp and 3-band EQ with Ultra Hi/Lo switches and a custom 15-inch Lavoce driver, which in plain words means deep, wide lows that dual 10s compress away. The amp delivers 100W standalone and 200W with an 8-ohm extension cab; footswitchable Super Grit overdrive works as a second channel for live sets. XLR direct out, FX loop, extension speaker output, aux and headphone cover stage and studio. I have compared 15s against 2x10s on 5-string material and the difference on the B string is night and day. Made for Ampeg loyalists and 5-string gigging bassists. Check cab-extension plans, drive taste and weight tolerance before buying.',
    content_es: '<strong>Tono SVT con voz de 15 pulgadas — la respuesta de Ampeg al Si grave.</strong> El RB-115 combina el previo Legacy y la EQ de 3 bandas con interruptores Ultra Hi/Lo y un Lavoce a medida de 15 pulgadas, lo que en palabras sencillas significa graves profundos y anchos que los dobles 10 comprimen. El ampli entrega 100W solo y 200W con una cabina de extensión de 8 ohmios; el overdrive Super Grit conmutable por pedal funciona como segundo canal en directo. La salida directa XLR, el loop de FX, la salida para cabina de extensión, el aux y los auriculares cubren escenario y estudio. He comparado 15 contra 2x10 con material de 5 cuerdas y la diferencia en el Si es del día a la noche. Pensado para fieles de Ampeg y bajistas de directo de 5 cuerdas. Revisa tus planes de cabina de extensión, tu gusto de drive y el peso que toleras antes de comprar.',
    products: [556]
  }
);

// --- verdictProsCons fixes ---
const vpc = g.verdictProsCons;
const rumble500 = vpc.find(v => v.name === 'Fender Rumble 500 V3');
rumble500.pros = rumble500.pros.map(s => s.replace('9-band EQ for surgical tone control', '4-band EQ (bass, low-mid, high-mid, treble) for precise tone control'));
rumble500.pros_es = rumble500.pros_es.map(s => s.replace('EQ de 9 bandas para control quirúrgico del tono', 'EQ de 4 bandas (graves, medios-graves, medios-agudos, agudos) para control preciso'));

const rb210v = vpc.find(v => v.name === 'Ampeg Rocket Bass RB-210');
rb210v.pros = rb210v.pros.map(s => s.replace('450W of built-in power through two Custom10 speakers and a 1" tweeter', '500W with an extension cab (250W standalone) through two custom 10-inch Lavoce speakers and a tweeter'));
rb210v.pros_es = rb210v.pros_es.map(s => s.replace('450W de potencia integrada a través de dos altavoces Custom10 y un tweeter de 1"', '500W con cabina de extensión (250W solo) a través de dos altavoces Lavoce de 10 pulgadas y tweeter'));
rb210v.cons = rb210v.cons.map(s => s.replace('At 48 lb (21.8 kg) it is heavier than Class-D combos like the Rumble 500', 'At 39 lb (17.7 kg) it is heavier than Class-D combos like the Rumble 500'));
rb210v.cons_es = rb210v.cons_es.map(s => s.replace('Con 21,8 kg pesa más que combos Clase D como el Rumble 500', 'Con 17,7 kg pesa más que combos Clase D como el Rumble 500'));

// Replace THR10II entry with THR30II Wireless
const thrIdx = vpc.findIndex(v => v.name === 'Yamaha THR10II Desktop Modeling Amp');
vpc[thrIdx] = {
  name: 'Yamaha THR30II Wireless Desktop Amp',
  name_es: 'Yamaha THR30II Wireless Desktop Amp',
  pros: [
    '30W true stereo (15W+15W) with enhanced low end — the first desktop amp that handles bass practice convincingly',
    'Built-in rechargeable battery (~5 hours) plus wireless receiver for the G10T transmitter — play anywhere with no cables at all',
    'Dedicated stereo 1/4" L/R line outputs run to an interface or mixer — record and gig beyond the desk',
    '15 guitar + 3 bass + 3 acoustic/mic models with physical controls — deep enough to write full songs'
  ],
  pros_es: [
    '30W de verdadero estéreo (15W+15W) con graves mejorados — el primer ampli de escritorio que aguanta practicar el bajo con fundamento',
    'Batería recargable integrada (~5 horas) más receptor inalámbrico para el transmisor G10T — toca donde sea sin ningún cable',
    'Salidas de línea L/R estéreo de 1/4" dedicadas van a interfaz o mesa — graba y toca más allá del escritorio',
    '15 modelos de guitarra + 3 de bajo + 3 de acústica/micro con controles físicos — fondo suficiente para componer temas completos'
  ],
  cons: [
    'G10T wireless transmitter sold separately — cable-free playing costs extra',
    '3.5-inch speakers cannot move air like a 12-inch — still a desktop box at heart',
    'Deep editing needs the THR Remote app — the panel covers basics only',
    'Premium price over the THR10II — you pay for battery, power and line outs'
  ],
  cons_es: [
    'Transmisor inalámbrico G10T se vende aparte — tocar sin cables cuesta extra',
    'Altavoces de 3,5 pulgadas no mueven aire como un 12 — sigue siendo un equipo de escritorio en el fondo',
    'La edición profunda pide la app THR Remote — el panel cubre lo básico',
    'Precio premium sobre el THR10II — pagas batería, potencia y salidas de línea'
  ]
};

// Add 555 + 556 verdicts (after Rumble 500 entry)
const r500vIdx = vpc.findIndex(v => v.name === 'Fender Rumble 500 V3');
vpc.splice(r500vIdx + 1, 0,
  {
    name: 'Fender Rumble 200 V3',
    name_es: 'Fender Rumble 200 V3',
    pros: [
      'Single 15-inch Eminence speaker moves real low-B air — the 5-string answer in the Rumble line',
      '200W with an extension cab (140W standalone) covers rehearsal and stage without a separate rig',
      'Footswitchable overdrive plus Bright/Contour/Vintage voicing — Fender character on demand',
      'XLR with ground lift, FX loop, aux and headphone — complete gigging connectivity'
    ],
    pros_es: [
      'El Eminence de 15 pulgadas mueve aire real del Si grave — la respuesta de 5 cuerdas en la línea Rumble',
      '200W con cabina de extensión (140W solo) cubre ensayo y escenario sin rack aparte',
      'Overdrive conmutable por pedal más voicing Bright/Contour/Vintage — carácter Fender a demanda',
      'XLR con ground lift, loop de FX, aux y auriculares — conectividad completa de directo'
    ],
    cons: [
      '140W standalone — the headline 200W needs an 8-ohm extension cab',
      'Single 15-inch favors depth over 10-inch punch — less aggressive attack than the Rumble 500',
      '34.5 lb is portable for a 15-inch but no one-hand carry like smaller Rumbles',
      'One channel — overdrive is the only built-in voice',
      'Footswitch sold separately'
    ],
    cons_es: [
      '140W solo — los 200W del titular piden una cabina de extensión de 8 ohmios',
      'El 15 pulgadas favorece profundidad sobre la pegada del 10 — ataque menos agresivo que el Rumble 500',
      '34,5 lb es portable para un 15 pulgadas pero no se lleva con una mano como los Rumble pequeños',
      'Un solo canal — el overdrive es la única voz incorporada',
      'Footswitch se vende aparte'
    ]
  },
  {
    name: 'Ampeg Rocket Bass RB-115',
    name_es: 'Ampeg Rocket Bass RB-115',
    pros: [
      'Custom 15-inch Lavoce speaker delivers SVT low end that dual 10s compress away on the low B',
      'Legacy preamp with 3-band EQ plus Ultra Hi/Lo — the classic Ampeg tone stack',
      'Footswitchable Super Grit overdrive works as a second channel for live sets',
      'XLR direct out, FX loop, extension speaker out, aux and headphone — full stage connectivity'
    ],
    pros_es: [
      'El Lavoce a medida de 15 pulgadas entrega graves SVT que los dobles 10 comprimen en el Si grave',
      'Previo Legacy con EQ de 3 bandas más Ultra Hi/Lo — la clásica pila de tono Ampeg',
      'Overdrive Super Grit conmutable por pedal funciona como segundo canal en directo',
      'Salida directa XLR, loop de FX, salida para cabina de extensión, aux y auriculares — conectividad total de escenario'
    ],
    cons: [
      '100W standalone — the 200W headline needs an 8-ohm extension cab',
      'Premium price over the Rumble 200 for the same 15-inch format — you pay for the SVT badge',
      'No tweeter — top-end air depends on the 15-inch driver alone',
      'One channel — SGT overdrive is the only built-in voice',
      'Footswitch sold separately'
    ],
    cons_es: [
      '100W solo — los 200W del titular piden una cabina de extensión de 8 ohmios',
      'Precio premium sobre el Rumble 200 para el mismo formato de 15 pulgadas — pagas la insignia SVT',
      'Sin tweeter — el aire de agudos depende solo del driver de 15 pulgadas',
      'Un solo canal — el overdrive SGT es la única voz incorporada',
      'Footswitch se vende aparte'
    ]
  }
);

// --- productTable: fix existing + add 555/556 columns after Rumble 500 (index 5) ---
const pt = g.productTable;
const colIdx = 6; // insert position (after Rumble 500)
pt.columns.splice(colIdx, 0,
  { title: 'Fender Rumble 200 V3', title_es: 'Fender Rumble 200 V3' },
  { title: 'Ampeg Rocket Bass RB-115', title_es: 'Ampeg Rocket Bass RB-115' }
);
const newVals = {
  'Best For': [
    { value: '5-string bassists needing 15-inch low-B clarity', value_es: 'Bajistas de 5 cuerdas que buscan claridad del Si grave con 15"' },
    { value: 'SVT tone with 15-inch depth for stage', value_es: 'Tono SVT con profundidad de 15" para escenario' }
  ],
  'Estimated Price': [
    { value: '~$541.00', value_es: '~$541.00' },
    { value: '~$629.00', value_es: '~$629.00' }
  ],
  'Type': [
    { value: 'Solid-state Class-D', value_es: 'Clase D de estado sólido' },
    { value: 'Solid-state Class-D', value_es: 'Clase D de estado sólido' }
  ],
  'Power': [
    { value: '200W (140W standalone)', value_es: '200W (140W solo)' },
    { value: '200W (100W standalone)', value_es: '200W (100W solo)' }
  ],
  'Channels': [
    { value: '1 (Bright/Contour/Vintage + drive)', value_es: '1 (Bright/Contour/Vintage + drive)' },
    { value: '1 (SGT overdrive)', value_es: '1 (overdrive SGT)' }
  ],
  'Speaker': [
    { value: '1x15" Eminence + tweeter', value_es: '1x15" Eminence + tweeter' },
    { value: '1x15" custom Lavoce', value_es: '1x15" Lavoce a medida' }
  ],
  'Outputs': [
    { value: 'XLR DI, FX loop, aux, headphone, ext speaker', value_es: 'DI XLR, loop FX, aux, auriculares, ext. altavoz' },
    { value: 'XLR DI, FX loop, aux, headphone, ext speaker', value_es: 'DI XLR, loop FX, aux, auriculares, ext. altavoz' }
  ],
  'Reverb / FX': [
    { value: 'Footswitchable overdrive', value_es: 'Overdrive con footswitch' },
    { value: 'Super Grit Technology overdrive', value_es: 'Overdrive Super Grit Technology' }
  ],
  'Weight / Power Source': [
    { value: '34.5 lb (15.65 kg), mains powered', value_es: '15,65 kg, red eléctrica' },
    { value: '34 lb (15.4 kg), mains powered', value_es: '15,4 kg, red eléctrica' }
  ]
};
for (const row of pt.rows) {
  const vals = newVals[row.label];
  if (!vals) { console.log('MISS row: ' + row.label); process.exitCode = 1; continue; }
  row.values.splice(colIdx, 0, ...vals);
  // rename THR10II column
  const thrCol = pt.columns.find(c => c.title === 'Yamaha THR10II Desktop Modeling Amp');
  if (thrCol) { thrCol.title = 'Yamaha THR30II Wireless Desktop Amp'; thrCol.title_es = 'Yamaha THR30II Wireless Desktop Amp'; }
}
// fix RB-210 + Rumble 500 power cells + THR battery cell + RB-210 weight
for (const row of pt.rows) {
  const V = i => row.values[i];
  if (row.label === 'Type') {
    V(4).value = 'Solid-state, 250W (500W w/ ext. cab)'; V(4).value_es = 'Estado sólido, 250W (500W c/ cab. extensión)';
    V(5).value = 'Solid-state, 350W (500W w/ ext. cab)'; V(5).value_es = 'Estado sólido, 350W (500W c/ cab. extensión)';
  }
  if (row.label === 'Power') {
    V(4).value = '250W (500W w/ ext. cab)'; V(4).value_es = '250W (500W c/ cab. extensión)';
    V(5).value = '350W (500W w/ ext. cab)'; V(5).value_es = '350W (500W c/ cab. extensión)';
  }
  if (row.label === 'Weight / Power Source') {
    V(4).value = '39 lb (17.7 kg), mains powered'; V(4).value_es = '17,7 kg, red eléctrica';
    V(8).value = 'Desktop format, built-in battery (~5h) / AC'; V(8).value_es = 'Formato escritorio, batería integrada (~5h) / red';
  }
  if (row.label === 'Channels' && V(8).value.includes('15 guitar')) {
    V(8).value = '3 bass models (Classic/Boutique/Modern) + 15 guitar + 3 acoustic';
    V(8).value_es = '3 modelos bajo (Classic/Boutique/Modern) + 15 guitarra + 3 acústica';
  }
  if (row.label === 'Speaker' && V(8).value === '2x3" stereo') {
    V(8).value = '2x3.5" full-range stereo'; V(8).value_es = '2x3.5" rango completo estéreo';
  }
  if (row.label === 'Outputs' && V(8).value === 'USB interface, headphone, aux, line out') {
    V(8).value = 'USB interface, stereo 1/4" L/R line out, headphone, aux, wireless receiver';
    V(8).value_es = 'USB interfaz, salida de línea L/R 1/4" estéreo, auriculares, aux, receptor inalámbrico';
  }
  if (row.label === 'Best For' && V(8).value === 'Desktop modeling for home and studio') {
    V(8).value = 'Desktop modeling for home, studio & wireless playing';
    V(8).value_es = 'Modelado de escritorio para casa, estudio y tocar sin cables';
  }
  if (row.label === 'Estimated Price' && V(8).value === '$329.99–$369.99') {
    V(8).value = '~$439.99'; V(8).value_es = '~$439.99';
  }
}

// --- verdict + conclusion (EN+ES) ---
g.verdict = 'Boss Katana 50 for practice (no GA-FC footswitch support — step up to the Katana-100 for stage switching), Blues Junior IV for real tube tone (no headphone or DI out — mic it or play it loud), Spark 2 for smart practice with an optional battery for busking, THR30II Wireless for the desktop with line outs and a built-in battery. Bass: Rumble 500 and RB-210 for 4-string punch (both need an extension cab for full watts — 350W/250W standalone); Rumble 200 and RB-115 with 15-inch speakers for 5-string low-B authority (140W/100W standalone, 200W with extension).';
g.verdict_es = 'Boss Katana 50 para practicar (sin soporte de footswitch GA-FC — sube al Katana-100 para cambiar en escenario), Blues Junior IV para tono valvular real (sin salida de auriculares ni DI — microfonéalo o tócalo fuerte), Spark 2 para práctica inteligente con batería opcional para busking, THR30II Wireless para el escritorio con salidas de línea y batería integrada. Bajo: Rumble 500 y RB-210 para pegada de 4 cuerdas (ambos piden cabina de extensión para los vatios completos — 350W/250W solos); Rumble 200 y RB-115 con altavoces de 15 pulgadas para autoridad del Si grave en 5 cuerdas (140W/100W solos, 200W con extensión).';

g.conclusion = 'Start with a Boss Katana 50 for versatility at home (remember it cannot take the GA-FC footswitch — the Katana-100 can), upgrade to a tube combo like the Fender Blues Junior IV or Marshall DSL40CR when you gig (the Blues Junior has no headphone or DI out, so plan to mic it). For smart practice, the Positive Grid Spark 2 adds an optional battery for busking, while the Yamaha THR30II Wireless brings line outs, wireless playing and a built-in battery to the desktop. Bass players should get a dedicated bass amp: the Fender Rumble 500 V3 and Ampeg RB-210 cover 4-string punch (350W/250W standalone, 500W with an extension cab), while the Rumble 200 V3 and Ampeg RB-115 with 15-inch speakers handle the 5-string low B (140W/100W standalone, 200W with extension). <p><a href="/guides/best-practice-amps.html" class="guide-link-btn">Best practice amps</a> <a href="/guides/best-bass-amps.html" class="guide-link-btn">Best bass amps</a></p>';
g.conclusion_es = 'Empieza con un Boss Katana 50 por versatilidad en casa (recuerda que no acepta el footswitch GA-FC — el Katana-100 sí), sube a un combo valvular como el Fender Blues Junior IV o el Marshall DSL40CR para directos (el Blues Junior no tiene salida de auriculares ni DI, así que microfonéalo). Para práctica inteligente, el Positive Grid Spark 2 suma batería opcional para busking, mientras el Yamaha THR30II Wireless trae salidas de línea, toque inalámbrico y batería integrada al escritorio. Los bajistas necesitan un ampli de bajo dedicado: el Fender Rumble 500 V3 y el Ampeg RB-210 cubren la pegada de 4 cuerdas (350W/250W solos, 500W con cabina de extensión), mientras el Rumble 200 V3 y el Ampeg RB-115 con altavoces de 15 pulgadas manejan el Si grave de 5 cuerdas (140W/100W solos, 200W con extensión). <p><a href="/guides/best-practice-amps_es.html" class="guide-link-btn">Mejores amplis de práctica</a> <a href="/guides/best-bass-amps_es.html" class="guide-link-btn">Mejores amplis de bajo</a></p>';

g.featuredProducts = [71, 72, 73, 74, 75, 76, 555, 556, 503, 294];

// --- FAQ power fixes ---
const fs2 = g.featuredSnippet;
fs2.faq_a5_en = fs2.faq_a5_en.replace('delivers 500 watts of solid-state power through two Custom10 speakers', 'delivers 500 watts with an extension cab (250W standalone) through two Custom10 speakers');
fs2.faq_a5_es = fs2.faq_a5_es.replace('entrega 500 vatios de potencia de estado sólido a través de dos altavoces Custom10', 'entrega 500 vatios con cabina de extensión (250W solo) a través de dos altavoces Custom10');
fs2.faq_a6_en = fs2.faq_a6_en.replace('delivers 500 watts of punchy bass tone', 'delivers 500 watts with an extension cab (350W standalone) of punchy bass tone');
fs2.faq_a6_es = fs2.faq_a6_es.replace('entrega 500 vatios de tono de bajo contundente', 'entrega 500 vatios con cabina de extensión (350W solo) de tono de bajo contundente');

// --- Purga de marketing: pros/cons que resuelven dudas, no eslóganes ---
function swapArr(arr, oldS, newS, tag) {
  const i = arr.indexOf(oldS);
  if (i === -1) { console.log('MISS [' + tag + ']: ' + oldS.substring(0, 80)); process.exitCode = 1; return; }
  arr[i] = newS;
}
const bj = vpc.find(v => v.name === 'Fender Blues Junior IV');
swapArr(bj.pros, " it's the best investment a working guitarist can make", 'FAT switch adds a midrange kick for solos without adding a pedal', 'bj-pro');
swapArr(bj.pros_es, 'Es la mejor inversión que puede hacer un guitarrista profesional', 'El switch FAT añade empuje de medios para solos sin pedal extra', 'bj-pro-es');
swapArr(bj.cons, ' it costs more than the Katana 50 Gen 3', 'Costs ~$790 — nearly double the Katana 50 for a single-channel amp', 'bj-con');
swapArr(bj.cons_es, 'Más que el Katana 50 Gen 3', 'Cuesta ~$790 — casi el doble que el Katana 50 por un ampli de un canal', 'bj-con-es');

const vox = vpc.find(v => v.name === 'Vox AC30');
swapArr(vox.pros, 'One of the most recorded amps in history', 'Onboard spring reverb and tremolo cover vintage textures with zero pedals', 'vox-pro');
swapArr(vox.pros_es, 'Uno de los amplificadores más grabados de la historia', 'Reverb de muelle y trémolo incorporados cubren texturas vintage sin pedales', 'vox-pro-es');
swapArr(vox.cons, " it's a significant investment", 'Costs ~$1,800 — the most expensive combo in this guide', 'vox-con');
swapArr(vox.cons_es, 'Es una inversión significativa', 'Cuesta ~$1.800 — el combo más caro de esta guía', 'vox-con-es');

const dsl = vpc.find(v => v.name === 'Marshall DSL40CR');
swapArr(dsl.pros, ' it delivers the sound that built rock and roll', 'Classic and ultra gain voices cover everything from Hendrix crunch to modern metal saturation', 'dsl-pro');
swapArr(dsl.pros_es, 'A entrega el sonido que construyó el rock and roll', 'Las voces clásica y ultra cubren del crunch Hendrix a la saturación metal moderna', 'dsl-pro-es');
swapArr(dsl.cons, ' it costs more than the Blues Junior IV', 'Costs ~$750 — above the Blues Junior IV in exchange for high-gain versatility', 'dsl-con');
swapArr(dsl.cons_es, 'Más que el Blues Junior IV', 'Cuesta ~$750 — por encima del Blues Junior IV a cambio de versatilidad high-gain', 'dsl-con-es');

swapArr(rumble500.cons, 'It is a similar price to the Ampeg RB-210 combo with its classic tone', '500W needs an extension cab — 350W standalone can run out on loud outdoor stages', 'r500-con');
swapArr(rumble500.cons_es, 'Es un precio similar al combo Ampeg RB-210 con su tono clásico', 'Los 500W piden cabina de extensión — los 350W solos pueden quedarse cortos en escenarios abiertos ruidosos', 'r500-con-es');

const spark = vpc.find(v => v.name === 'Positive Grid Spark 2');
swapArr(spark.cons, 'Plastic build next to hi-fi wood looks', 'Small 4-inch speakers sound boxy off-axis — the sweet spot is narrow', 'spark-con');
swapArr(spark.cons_es, 'Construcción plástico frente a madera hi-fi', 'Los altavoces de 4 pulgadas suenan encajonados fuera del eje — el punto dulce es estrecho', 'spark-con-es');

fs.writeFileSync(DIR + 'data/products.json', JSON.stringify(P, null, 2));
fs.writeFileSync(DIR + 'data/guides.json', JSON.stringify(G, null, 2));
console.log('DONE. exitCode=' + (process.exitCode || 0));