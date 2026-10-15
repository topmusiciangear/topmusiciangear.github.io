// REESCRIBIR starter-studio con la Opcion C: 3 presupuestos completos.
// Precios = canonicos del catalogo (verificados). Sin productos nuevos.
const fs = require('fs');
const BASE = 'C:/Users/Daniel/projects/topmusiciangear/';
const gf = BASE + 'data/guides.json';
const guides = JSON.parse(fs.readFileSync(gf, 'utf8'));
const g = guides.find(x => x.id === 'starter-studio');

// ══════════════════════════════════════════════════════════════
// TABLA: 3 presupuestos, filas = rol en la cadena + precio
// ══════════════════════════════════════════════════════════════
const COLS = [
  { title: 'Budget Essentials Setup', title_es: 'Equipo básico esencial' },
  { title: 'Pro Producer Setup',        title_es: 'Equipo de productor profesional' },
  { title: 'Ultimate Powerhouse Setup',  title_es: 'Equipo definitivo' }
];
const ROWS = [
  {
    label: 'Role in the Chain', label_es: 'Función en la cadena',
    values: [
      { value: 'Interface',            value_es: 'Interfaz' },
      { value: 'Interface',            value_es: 'Interfaz' },
      { value: 'Interface',            value_es: 'Interfaz' }
    ]
  },
  {
    label: 'Interface', label_es: 'Interfaz',
    values: [
      { value: 'Focusrite Scarlett 2i2 4th Gen', value_es: 'Focusrite Scarlett 2i2 4th Gen' },
      { value: 'SSL 2+ MKII',                     value_es: 'SSL 2+ MKII' },
      { value: 'SSL 2+ MKII',                     value_es: 'SSL 2+ MKII' }
    ]
  },
  {
    label: 'Microphone', label_es: 'Micrófono',
    values: [
      { value: 'Shure SM57 (dynamic)',              value_es: 'Shure SM57 (dinámico)' },
      { value: 'Rode NT1 5th Generation (condenser)', value_es: 'Rode NT1 5th Generation (condensador)' },
      { value: 'Rode NT1 Signature (condenser)',     value_es: 'Rode NT1 Signature (condensador)' }
    ]
  },
  {
    label: 'Headphones', label_es: 'Auriculares',
    values: [
      { value: 'Not included — add later',        value_es: 'No incluidos — añádelos después' },
      { value: 'Audio-Technica ATH-M50x',          value_es: 'Audio-Technica ATH-M50x' },
      { value: 'Sony MDR-7506',                   value_es: 'Sony MDR-7506' }
    ]
  },
  {
    label: 'Studio Monitors', label_es: 'Monitores',
    values: [
      { value: 'Headphones only',                 value_es: 'Solo auriculares' },
      { value: 'Headphones only',                 value_es: 'Solo auriculares' },
      { value: 'KRK Rokit 7 G5 (pair)',           value_es: 'KRK Rokit 7 G5 (par)' }
    ]
  },
  {
    label: 'Accessories', label_es: 'Accesorios',
    values: [
      { value: 'K&M 210/2 stand',                 value_es: 'Soporte K&M 210/2' },
      { value: 'Pop filter recommended',           value_es: 'Filtro antipop recomendado' },
      { value: 'Pop filter recommended',           value_es: 'Filtro antipop recomendado' }
    ]
  },
  {
    label: 'Acoustic Treatment', label_es: 'Tratamiento acústico',
    values: [
      { value: 'G4M Squarewave panels (4-pack)',  value_es: 'Paneles G4M Squarewave (4-pack)' },
      { value: 'G4M Squarewave panels (4-pack)',  value_es: 'Paneles G4M Squarewave (4-pack)' },
      { value: 'G4M Squarewave panels (4-pack)',  value_es: 'Paneles G4M Squarewave (4-pack)' }
    ]
  },
  {
    label: 'Total', label_es: 'Total',
    values: [
      { value: '~$426', value_es: '~$426' },
      { value: '~$816', value_es: '~$816' },
      { value: '~$905', value_es: '~$905' }
    ]
  }
];

// ══════════════════════════════════════════════════════════════
// VEREDICTOS: 4 pros + 4 contras por cada producto unico
// ══════════════════════════════════════════════════════════════
const VERDICTS = [
  {
    name: 'Focusrite Scarlett 2i2 4th Gen',
    name_es: 'Focusrite Scarlett 2i2 4th Gen',
    productId: 15,
    pros: [
      '120dB dynamic range and Auto Gain / Clip Safe take the guesswork out of levels',
      'Two ultra-low-noise preamps with 69dB of gain handle condenser and dynamic mics',
      'Bus-powered and small enough to live beside a laptop',
      'The default first interface for a reason: drivers are stable and support is solid'
    ],
    cons: [
      'Two inputs means one mic plus one instrument — no drum overheads or stereo pair',
      'No MIDI, so keyboard controllers need a separate DIN adapter',
      '120dB is measured, not listened to; the NT1 at the same price is quieter in the room',
      'Bus power can limit gain with heavy condenser mics on some laptops'
    ],
    pros_es: [
      '120 dB de rango dinámico y Auto Gain / Clip Safe te quitan la duda de los niveles',
      'Dos preamplificadores de ruido ultrabajo con 69 dB de ganancia manejan condensadores y dinámicos',
      'Se alimenta por bus y es lo bastante pequeña para vivir junto al portátil',
      'La primera interfaz por defecto y por algo: drivers estables y soporte sólido'
    ],
    cons_es: [
      'Dos entradas significa un micro más un instrumento: ni overheads ni par estéreo',
      'Sin MIDI, los teclados necesitan un adaptador DIN aparte',
      'Los 120 dB son medidos, no escuchados; el NT1 al mismo precio hace menos ruido en la sala',
      'La alimentación por bus puede limitar la ganancia con condensadores pesados en algunos portátiles'
    ]
  },
  {
    name: 'SSL 2+ MKII',
    name_es: 'SSL 2+ MKII',
    productId: 18,
    pros: [
      'The 4K Legacy button puts SSL console character on the input, not in a plugin',
      'Dual headphone outputs let a singer and engineer monitor independently',
      'MIDI I/O included — the one thing the Scarlett leaves out',
      'Consoles and monitor controllers are the same box, so the desk stays short'
    ],
    cons: [
      'Two inputs and two outputs only — it is not a growable interface',
      'No bundled software beyond the 4K circuit; you bring your own DAW',
      'The 4K is one flavour, not a choice — there is no way to switch it off mid-session',
      'Heavier and larger than the Scarlett for the same two channels'
    ],
    pros_es: [
      'El botón 4K Legacy pone el carácter de consola SSL en la entrada, no en un plugin',
      'Dos salidas de auriculares permiten que cantante e ingeniero escuchen por separado',
      'Incluye MIDI: lo único que la Scarlett deja fuera',
      'Consola y controlador de monitores en la misma caja, así que el escritorio sigue despejado'
    ],
    cons_es: [
      'Solo dos entradas y dos salidas: no es una interfaz que crezca',
      'No incluye software más allá del circuito 4K: traes tu propio DAW',
      'El 4K es un sabor único, no una elección — no hay forma de apagarlo a mitad de sesión',
      'Más pesada y grande que la Scarlett por los mismos dos canales'
    ]
  },
  {
    name: 'Shure SM57',
    name_es: 'Shure SM57',
    productId: 5,
    pros: [
      'Indestructible — the microphone most touring engineers carry as a spare',
      'Cardioid pattern with a 5kHz presence peak cuts guitar amps and snares cleanly',
      'Works close or far: the body survives being pulled back',
      'Cheap enough to buy two, which is the real pro move'
    ],
    cons: [
      'Not a vocal microphone — the cardioid and presence peak suit instruments over lead vocals',
      'Needs close placement for low end; pulled back it goes thin',
      'For loud stages a supercardioid like the Beta 58A gives more headroom',
      '1.6 mV/Pa output is quiet next to hotter dynamics like the e935'
    ],
    pros_es: [
      'Indestructible: el micrófono que más lleva un ingeniero de gira como repuesto',
      'Patrón cardioide con pico de presencia en 5 kHz capta amplis y cajas Genetics con limpieza',
      'Funciona cerca o lejos: el cuerpo aguanta que lo acerques',
      'Lo bastante barato para comprar dos, que es lo que hace un profesional de verdad'
    ],
    cons_es: [
      'No es un micrófono de voz: el cardioide y el pico de presencia van para instrumentos, no para voz principal',
      'Necesita colocación cercana para el grave; si lo alejas se adelgaza',
      'Para escenarios ruidosos un supercardioide como el Beta 58A da más margen',
      'Salida de 1,6 mV/Pa: tranquila comparada con dinámicos más calientes como el e935'
    ]
  },
  {
    name: 'Rode NT1 5th Generation',
    name_es: 'Rode NT1 5th Generation',
    productId: 3,
    pros: [
      '4 dBA self-noise — the quietest large-diaphragm condenser you can buy new',
      'Dual Connect: XLR and USB on the same body, so it works with and without an interface',
      'Includes shock mount, pop filter and XLR cable in the box',
      'Still the default first condenser for vocals, guitars and acoustic instruments'
    ],
    cons: [
      'Its own USB output is 24-bit/192 kHz but the internal conversion is the weaker half of the package',
      'Needs 48V phantom power — no phantom from a passive preamp',
      'Heavier and pricier than a bundle condenser of comparable character',
      'Self-noise numbers are measured at 20 dB gain; real rooms add their own noise floor'
    ],
    pros_es: [
      '4 dBA de ruido propio: el condensador de diafragma grande más silencioso que puedes comprar nuevo',
      'Dual Connect: XLR y USB en el mismo cuerpo, así que funciona con y sin interfaz',
      'Incluye shock mount, filtro antipop y cable XLR en la caja',
      'Sigue siendo el primer condensador por defecto para voz, guitarra y instrumentos acústicos'
    ],
    cons_es: [
      'Su salida USB es de 24 bits/192 kHz, pero la conversión interna es la parte más débil del paquete',
      'Necesita alimentación fantasma de 48 V — un preamp pasivo no da phantom',
      'Más pesado y caro que un condensador de bundle con carácter parecido',
      'El ruido propio se mide a 20 dB de ganancia; una sala real añade su propio suelo de ruido'
    ]
  },
  {
    name: 'Rode NT1 Signature Series',
    name_es: 'Rode NT1 Signature Series',
    productId: 297,
    pros: [
      '4 dBA self-noise with a 32-bit/192 kHz digital output built in',
      'Both XLR and USB on one body, so it doubles as a USB mic when needed',
      'Includes shock mount, pop filter and XLR cable',
      'A condenser at a price that leaves room for monitors in the same budget'
    ],
    cons: [
      'The RODE-LINK app is required for zero-latency monitoring through USB — one more thing to install',
      '32-bit float only helps if your DAW is prepared for it',
      'Still a studio condenser: it needs 48V and a quiet room',
      'The 5th Generation replaces it, so this is the previous model, not the current one'
    ],
    pros_es: [
      '4 dBA de ruido propio con salida digital de 32 bits/192 kHz integrada',
      'XLR y USB en un mismo cuerpo, así que hace de micro USB cuando lo necesitas',
      'Incluye shock mount, filtro antipop y cable XLR',
      'Un condensador a un precio que deja hueco para monitores en el mismo presupuesto'
    ],
    cons_es: [
      'La app RODE-LINK hace falta para monitoreo sin latencia por USB — una cosa más que instalar',
      'El float de 32 bits solo ayuda si tu DAW está preparado para eso',
      'Sigue siendo un condensador de estudio: necesita 48 V y una sala silenciosa',
      'La 5th Generation lo sustituye: es el modelo anterior, no el actual'
    ]
  },
  {
    name: 'Audio-Technica ATH-M50x',
    name_es: 'Audio-Technica ATH-M50x',
    productId: 25,
    pros: [
      'The most-recorded studio headphone in the world for a reason: flat, honest, no colour',
      '45mm drivers with rare-earth magnets for detail without harshness',
      'Detachable cable and collapsible frame — survives a backpack',
      'Works on studio monitors or without them, which is why it is the tier default'
    ],
    cons_es: [
      'No case or spare pads in the box — the leatherette pads wear before the driver does',
      'Not a wide, spacious soundstage like an open-back',
      '49 ohm impedance wants a real headphone output, not a phone dongle',
      'Detachable cable means a broken wire is a replacement, not a repair'
    ],
    pros: [
      'El auriculares de estudio más grabado del mundo por algo: plano, honesto, sin color',
      'Drivers de 45 mm con imanes de tierras raras: detalle sin dureza',
      'Cable desmontable y plegable — sobrevive a una mochila',
      'Funciona con monitores o sin ellos, por eso es el escolha por defecto del tier'
    ]
  },
  {
    name: 'Sony MDR-7506',
    name_es: 'Sony MDR-7506',
    productId: 26,
    pros: [
      'Broadcast standard since 1991 — it is the headphone rental houses hand you',
      'Forward, revealing midrange that helps you hear mix problems',
      'Closed-back, so it also tracks vocals and instruments',
      'Folds flat and survives drops better than most studio pairs'
    ],
    cons: [
      'Fixed non-detachable cable — a frayed wire means a new pair',
      '63 ohm impedance wants a stronger headphone output than a laptop gives',
      'The coiled 3m cable adds weight and tangles on a small desk',
      'Pads wear faster than the drivers; replacement is easy but not free'
    ],
    pros_es: [
      'Estándar de radiodifusión desde 1991: el que te dan en cualquier casa de alquiler',
      'Medios adelantados y reveladores que te ayudan a oír los problemas de la mezcla',
      'Cerrados, así que también serves para grabar voz e instrumentos',
      'Se pliega plano y aguanta caídas mejor que casi todos los pares de estudio'
    ]
  },
  {
    name: 'KRK Rokit 7 G5',
    name_es: 'KRK Rokit 7 G5',
    productId: 20,
    pros: [
      '8-inch woven Kevlar woofer with real low-end for a 7-inch monitor',
      'Doppler EQ and room calibration presets you set once and forget',
      'Bi-amped at 140W with a 4-inch woofer — punchy without a sub',
      'The most common monitor in home studios, so rooms are treated for it'
    ],
    cons: [
      'The forward low end flatters mixes — it will not tell you the bass is thin',
      'Needs room treatment or position changes to sound right near a wall',
      'Sold as individual units — you buy a pair',
      'Loud and slightly coloured; not the choice for a neutral reference check'
    ],
    pros_es: [
      'Woofer de 8 pulgadas de Kevlar trenzado con graves reales para un monitor de 7',
      'EQ Doppler y presets de calibración de sala que configuras una vez y olvidas',
      'Biamplificado a 140 W con woofer de 4 pulgadas: con punch sin sub',
      'El monitor más común en estudios domésticos, así que las salas están tratadas para él'
    ]
  },
  {
    name: 'G4M Acoustics Squarewave Acoustic Treatment Panels (4-Pack)',
    name_es: 'Paneles de Tratamiento Acústico G4M Acoustics Squarewave (4-Unidades)',
    productId: 170,
    pros: [
      'Kills flutter echo at the first reflection points for the least money on this page',
      'Adhesive strips included — no drilling, no stand, no landlord argument',
      'Correct first purchase: untreated rooms ruin expensive monitors',
      'Four panels cover the two side walls and the ceiling behind your listening position'
    ],
    cons: [
      'Absorbs mids and highs, not bass — you still need bass traps for low-end problems',
      'Ten centimetres deep: less effective than professional mineral wool panels',
      'Looks like foam, and it is — aesthetic value is zero',
      'G4M only lists one store, so price comparison is thin'
    ],
    pros_es: [
      'Mata el eco de aleteo en los puntos de primera reflexión por lo más barato de esta página',
      'Incluye tiras adhesivas: sin taladros, sin pie, sin discusión con el casero',
      'La primera compra correcta: una sala sin tratar arruina monitores caros',
      'Cuatro paneles cubren las dos paredes laterales y el techo detrás de tu posición'
    ]
  },
  {
    name: 'K&M 210/2 Mic Stand',
    name_es: 'Soporte K&M 210/2',
    productId: 58,
    pros: [
      'Zinc die-cast base that does not tip over when a full condenser is on top',
      'Telescopic boom arm holds the mic where you need it without a second stand',
      'German engineering at a price that ignores it',
      'Folds down small enough to live in the corner of a small studio'
    ],
    cons: [
      'Weight counterbalance is basic — heavy mics still need fiddling',
      'Base is stable but wide; tight corners are awkward',
      'No cable clips, so the XLR hangs loose',
      'Takes two hands to adjust height on the boom'
    ],
    pros_es: [
      'Base de zinc fundido que no se vuelca con un condensador lleno encima',
      'Brazo telescópico que sostiene el micro donde lo necesitas sin un segundo pie',
      'Ingeniería alemana a un precio que la ignora',
      'Se pliega lo bastante pequeño para vivir en la esquina de un estudio pequeño'
    ]
  }
];

// ══════════════════════════════════════════════════════════════
// SECCIONES
// ══════════════════════════════════════════════════════════════
const SECTIONS = [
  {
    heading: 'Start With the Signal Chain, Not the Shopping List',
    heading_es: 'Empieza por la cadena de señal, no por la lista de la compra',
    content: `<p>Almost every home studio is built backwards. You buy a microphone because it looks good in a video, then an interface because the microphone needed one, then monitors because everyone has monitors. Three purchases later you have spent your budget and still cannot hear what you recorded.</p><p>The order that works is the order the signal travels: <strong>source, preamp, conversion, monitoring, room.</strong> The source is what you sing or play into. The preamp is the interface. Conversion happens inside that interface. Monitoring is headphones or speakers. The room is the last piece and the one nobody budgets for.</p><p>Build those five in that order and every dollar does a job. Skip the room and the most expensive interface you can buy will still sound wrong, because the walls are colouring everything before the signal ever reaches your ears.</p>`,
    content_es: `<p>Casi todos los estudios domésticos se construyen al revés. Compras un micrófono porque queda bien en un vídeo, luego una interfaz porque el micrófono la necesitaba, luego monitores porque todo el mundo tiene monitores. Tres compras después te has gastado el presupuesto y sigues sin oír lo que grabaste.</p><p>El orden que funciona es el orden que recorre la señal: <strong>fuente, preamplificador, conversión, monitorización, sala.</strong> La fuente es lo que cantas o tocas. El preamplificador es la interfaz. La conversión ocurre dentro de esa interfaz. La monitorización son auriculares o altavoces. La sala es la última pieza y la que nadie presupuesta.</p><p>Construye esas cinco en ese orden y cada dólar hace un trabajo. Salta la sala y la interfaz más cara que compres sonará mal igualmente, porque las paredes tiñen todo antes de que la señal llegue a tus oídos.</p>`,
    products: []
  },
  {
    heading: 'The Three Budgets: What $1,000 Actually Buys',
    heading_es: 'Los tres presupuestos: qué compra de verdad $1.000',
    content: `<p>These are not factory bundles. They are three builds assembled from individual products, each one priced from our own catalogue and each one verifiable on the shelf.</p><p><strong>The Budget Essentials at $426</strong> covers the chain and nothing else: a Scarlett 2i2 to capture, an SM57 to capture with, a stand so the mic is not in your hand, and four acoustic panels so the room stops lying to you. It has no headphones, which means you mix on the SM57's own character until you add them.</p><p><strong>The Pro Producer at $816</strong> swaps the dynamic for a quiet condenser and adds the ATH-M50x. This is the tier most people should buy: the NT1 5th Generation is the quietest large-diaphragm condenser available new, and the M50x will not lie to you about what you mixed.</p><p><strong>The Ultimate Powerhouse at $905</strong> is the same interface, the NT1 Signature condenser, the broadcast-standard MDR-7506, and real monitors — a KRK Rokit 7 G5 pair. It is the only tier that can mix a full arrangement without switching to headphones.</p><p>All three stay under $1,000 with the room treatment already paid for, which is the part most "under $1,000" lists leave out.</p>`,
    content_es: `<p>No son packs de fábrica. Son tres montajes assembled con productos sueltos, cada uno con precio de nuestro propio catálogo y cada uno verificable en el estante.</p><p><strong>El Básico Esencial por $426</strong> cubre la cadena y nada más: una Scarlett 2i2 para capturar, un SM57 con el que capturar, un soporte para que el micro no esté en tu mano, y cuatro paneles acústicos para que la sala deje de mentirte. No tiene auriculares, así que mezclas con el carácter del propio SM57 hasta que los añadas.</p><p><strong>El Productor Profesional por $816</strong> cambia el dinámico por un condensador silencioso y añade los ATH-M50x. Este es el tier que debería comprar la mayoría: el NT1 5th Generation es el condensador de diafragma grande más silencioso que hay nuevo, y el M50x no te va a mentir sobre lo que has mezclado.</p><p><strong>El Definitivo por $905</strong> es la misma interfaz, el condensador NT1 Signature, el MDR-7506 estándar de radiodifusión, y monitores de verdad — un par de KRK Rokit 7 G5. Es el único tier que puede mezclar un arreglo completo sin pasarse a auriculares.</p><p>Los tres se quedan por debajo de $1.000 con el tratamiento de sala ya pagado, que es justo la parte que casi todas las listas de "menos de $1.000" se dejan.</p>`,
    products: []
  },
  {
    heading: 'Why a $299 Interface Can Beat a $199 One',
    heading_es: 'Por qué una interfaz de $299 puede batir a una de $199',
    content: `<p>The 2i2 and the SSL 2+ both give you two microphone preamps and 24-bit conversion. On paper they are the same class of device. The difference is what happens before the signal reaches your computer.</p><p>The SSL 2+ MKII's 4K Legacy button engages an analogue enhancement circuit modelled on an SSL 4000 channel strip. It is not a plugin and it is not a setting — it is hardware adding harmonic content and high-frequency lift before conversion. The Scarlett is cleaner and stays cleaner.</p><p>Clean is not automatically better. If you are recording a singer with a dynamic mic in a treated room and want the vocal to sit forward without pushing EQ, the 4K circuit does that in hardware. If you want a neutral capture to shape yourself, the Scarlett's transparency wins.</p><p>The SSL also adds MIDI I/O and dual headphone outputs, so it doubles as your monitor controller. That saves desk space and money — which is why it eats $100 more of the budget without feeling like a luxury.</p>`,
    content_es: `<p>La 2i2 y la SSL 2+ dan las dos dos preamplificadores de micrófono y conversión de 24 bits. Sobre el papel son la misma clase de dispositivo. La diferencia es lo que pasa antes de que la señal llegue a tu ordenador.</p><p>El botón 4K Legacy de la SSL 2+ MKII activa un circuito de mejora analógico modelado sobre un canal del SSL 4000. No es un plugin ni un ajuste: es hardware añadiendo contenido armónico y realce de altas frecuencias antes de la conversión. La Scarlett es más limpia y se mantiene limpia.</p><p>Limpio no es automáticamente mejor. Si grabas a un cantante con un micrófono dinámico en una sala tratada y quieres que la voz esté presente sin meter EQ, el circuito 4K lo hace en hardware. Si quieres una captura neutra para dar forma tú, la transparencia de la Scarlett gana.</p><p>La SSL además añade MIDI y dos salidas de auriculares, así que hace doble función como controlador de monitores. Eso ahorra espacio y dinero en el escritorio — por eso se come $100 más del presupuesto sin sentirse un lujo.</p>`,
    products: [18, 15]
  },
  {
    heading: 'The Dynamic vs the Condenser Decision',
    heading_es: 'La decisión entre dinámico y condensador',
    content: `<p>The SM57 at $99 and the NT1 5th Generation at $269 are not competing products. They solve different rooms.</p><p>A dynamic mic like the SM57 does not care how loud the room is. It picks up what is in front of it and largely ignores everything else, which is why it is the standard for guitar amplifiers, snares and live vocals on stages with monitor wedges. It has no sensitivity to room noise, because it barely hears room noise at all.</p><p>A condenser like the NT1 hears everything. Its diaphragm responds to air movement, so it captures the reverb tail, the room hum, the traffic outside, the laptop fan. In a treated room that extra sensitivity is what makes it sound open and detailed. In an untreated bedroom it makes it unusable.</p><p>This is why the Budget tier pairs a dynamic with acoustic panels. The panels are not decoration — they are what makes the cheap tier viable. Without them, a condenser at the same price would record the room, not the voice.</p>`,
    content_es: `<p>El SM57 de $99 y el NT1 5th Generation de $269 no son productos que compitan. Resuelven salas distintas.</p><p>Un micrófono dinámico como el SM57 no le importa lo ruidosa que esté la sala. Capta lo que tiene delante e ignora casi todo lo demás, por eso es el estándar para amplis de guitarra, cajas y voz en directo con monitores de oreja. No tiene sensibilidad al ruido de sala porque apenas lo escucha.</p><p>Un condensador como el NT1 lo escucha todo. Su diafragma responde al movimiento del aire, así que capta la cola de reverb, el zumbido de la sala, el tráfico de fuera, el ventilador del portátil. En una sala tratada esa sensibilidad extra es lo que lo hace sonar abierto y detallado. En un dormitorio sin tratar lo hace inutilizable.</p><p>Por eso el tier Básico combina un dinámico con paneles acústicos. Los paneles no son decoración: son lo que hace viable el tier barato. Sin ellos, un condensador al mismo precio grabaría la sala, no la voz.</p>`,
    products: [5, 3, 170]
  },
  {
    heading: 'Monitors You Cannot Skip (and the Ones You Can)',
    heading_es: 'Monitores que no puedes saltarte (y los que sí)',
    content: `<p>Only the Powerhouse tier includes monitors, and that is a deliberate line.</p><p>Headphones reveal detail in the midrange and let you work at any hour without neighbour complaints. They do not reveal low end. You cannot judge kick and bass balance on closed-back headphones, and a mix balanced on them will translate badly to a club system.</p><p>Speakers do reveal low end, but only in a room that is not fighting them. The KRK Rokit 7 G5 has an 8-inch woven Kevlar woofer and real output — the port of authority in this list — but place it against a bare wall and the bass will double back at you and lie.</p><p>So the honest order is: mix on headphones first, check on monitors when the room allows it, and spend the last of your budget on four foam panels before you spend it on a second pair of speakers. A pair of monitors in a treated room beats two pairs of monitors in a bedroom.</p>`,
    content_es: `<p>Solo el tier Definitivo incluye monitores, y es una línea deliberada.</p><p>Los auriculares revelan detalle en los medios y te dejan trabajar a cualquier hora sin quejas del vecino. No revelan graves. No puedes juzgar el balance de bombo y bajo en auriculares cerrados, y una mezcla equilibrada así sonará mal en un sistema de club.</p><p>Los altavoces sí revelan graves, pero solo en una sala que no les pelee. El KRK Rokit 7 G5 tiene un woofer de 8 pulgadas de Kevlar trenzado y potencia de verdad — el más con autoridad de esta lista — pero ponlo contra una pared desnuda y el bajo volverá rebotando y te mentirá.</p><p>Así que el orden honesto es: mezcla primero con auriculares, comprueba en monitores cuando la sala lo permita, y gasta el final de tu presupuesto en cuatro paneles de espuma antes de gastarlo en un segundo par de altavoces. Un par de monitores en una sala tratada bate a dos pares en un dormitorio.</p>`,
    products: [20, 25, 26]
  },
  {
    heading: 'Treat the Room Before You Upgrade Anything',
    heading_es: 'Trata la sala antes de mejorar nada',
    content: `<p>Every tier in this guide includes acoustic panels. That is the least glamorous line item and the one that changes your recordings most.</p><p>A untreated room has parallel hard surfaces — walls, ceiling, desk, floor — that reflect sound back at you from every direction. The result is comb filtering: the direct sound of your voice arrives at the same instant as a reflection off the wall behind you, and the two partially cancel. Bass disappears first because it is the easiest thing to cancel.</p><p>The four G4M Squarewave panels go on the side walls at ear height, behind your listening position, and at the ceiling above and behind you. Those are the first reflection points — the surfaces that reach your ears first after the direct sound. Absorb them and the comb filtering goes with them.</p><p>Panels will not fix bass. Ten centimetres of foam is not bass trapping. But it fixes the midrange smear that makes every inexpensive microphone sound worse than it is, and that is the complaint most beginners bring to a forum. Fix that first, then decide whether the interface is the problem.</p>`,
    content_es: `<p>Todos los tiers de esta guía incluyen paneles acústicos. Es la línea menos vistosa y la que más cambia tus grabaciones.</p><p>Una sala sin tratar tiene superficies duras y paralelas — paredes, techo, escritorio, suelo — que reflejan el sonido hacia ti desde todas direcciones. El resultado es el filtrado en peine: el sonido directo de tu voz llega en el mismo instante que un rebote de la pared de detrás, y los dos se cancelan parcialmente. El bajo desaparece primero porque es lo más fácil de cancelar.</p><p>Los cuatro paneles G4M Squarewave van en las paredes laterales a la altura de las orejas, detrás de tu posición de escucha, y en el techo por encima y detrás de ti. Esos son los puntos de primera reflexión: las superficies que llegan a tus oídos después del sonido directo. Absórbelos y el filtrado se va con ellos.</p><p>Los paneles no arreglan el bajo. Diez centímetros de espuma no son trapping de graves. Pero sí arreglan el empastre de medios que hace que cada micrófono barato suene peor de lo que es, y esa es la queja que más traen los principiantes a un foro. Arregla eso primero, y luego decide si la interfaz es el problema.</p>`,
    products: [170, 58]
  },
  {
    heading: 'Where to Spend Your Last $100',
    heading_es: 'Dónde gastar tus últimos $100',
    content: `<p>Every build leaves money on the table, and what you do with it depends on what you record.</p><p><strong>If you record vocals:</strong> buy the Aston Shield GN pop filter. A condenser microphone close to a mouth without a filter records every plosive — the burst of air on a P or a B — as a thump that no EQ fixes cleanly. The filter is $49 and it is the single highest-value accessory in this guide.</p><p><strong>If you record acoustic guitar:</strong> buy the second condenser. The NT1 is for the voice; a second one lets you mic the guitar at the same time without a DI or fighting for the two inputs you already have.</p><p><strong>If you record loud sources:</strong> buy the Mogami Gold XLR cable at $53. You already own an SM57 or an NT1; a cable that hums or attenuates the top end undoes the microphone you paid for. It is the cheapest signal-path upgrade that exists.</p><p><strong>If you are still on headphones at night:</strong> save it. The MDR-7506 already closed the loop. Put the money into a second acoustic panel pack instead — it moves the room further than any single upgrade will.</p>`,
    content_es: `<p>Cada montaje deja dinero en la mesa, y qué haces con él depende de qué grabes.</p><p><strong>Si grabas voz:</strong> compra el filtro antipop Aston Shield GN. Un micrófono condensador cerca de una boca sin filtro graba cada explosiva — la ráfaga de aire de una P o una B — como un golpe que ningún EQ limpia bien. El filtro cuesta $49 y es el accesorio de mayor valor de esta guía.</p><p><strong>Si grabas guitarra acústica:</strong> compra un segundo condensador. El NT1 es para la voz; un segundo te deja microfonear la guitarra a la vez sin DI ni pelear por las dos entradas que ya tienes.</p><p><strong>Si grabas fuentes fuertes:</strong> compra el cable Mogami Gold de $53. Ya tienes un SM57 o un NT1; un cable que zumba o atenúa los agudos deshace el micrófono por el que pagaste. Es la mejora más barata de la cadena de señal que existe.</p><p><strong>Si sigues con auriculares por la noche:</strong> guárdalo. El MDR-7506 ya cerró el círculo. Pon ese dinero en un segundo pack de paneles acústicos: mueve más la sala que cualquier mejora suelta.</p>`,
    products: [39, 167]
  }
];

// ══════════════════════════════════════════════════════════════
// APLICAR
// ══════════════════════════════════════════════════════════════
g.title = 'The $1,000 Home Studio Blueprint: Three Builds That Fit';
g.titleTag_es = 'El estudio doméstico de $1.000: tres montajes que encajan';
g.description = 'Three complete home studio builds under $1,000, priced from our catalogue: what $426, $816 and $905 actually buy, and why the room treatment is not optional.';
g.description_es = 'Tres montajes completos de estudio doméstico por menos de $1.000, con precios de nuestro catálogo: qué compran $426, $816 y $905, y por qué el tratamiento de sala no es opcional.';
g.titleTag = 'The $1,000 Home Studio Blueprint';

g.productTable = { columns: COLS, rows: ROWS };
g.verdictProsCons = VERDICTS;
g.sections = SECTIONS;
g.featuredProducts = [15, 18, 5, 3, 297, 25, 26, 20, 170, 58];

// quitar featuredSnippet viejo si menciona algo que ya no esta
if (g.featuredSnippet) {
  g.featuredSnippet.name1_en = 'SSL 2+ MKII';
  g.featuredSnippet.name1_es = 'SSL 2+ MKII';
  g.featuredSnippet.name2_en = 'Focusrite Scarlett 2i2 4th Gen';
  g.featuredSnippet.name2_es = 'Focusrite Scarlett 2i2 4th Gen';
}

fs.writeFileSync(gf, JSON.stringify(guides, null, 2), 'utf8');
console.log('starter-studio reescrita');
console.log('  columnas: ' + g.productTable.columns.length);
console.log('  filas: ' + g.productTable.rows.length);
console.log('  veredictos: ' + g.verdictProsCons.length);
console.log('  secciones: ' + g.sections.length);
console.log('  featuredProducts: ' + g.featuredProducts.length);

// integridad
let des = 0;
guides.forEach(x=>{ if(x.productTable){ const nc=x.productTable.columns.length; x.productTable.rows.forEach(r=>{ if(r.values.length!==nc) des++; }); } });
console.log('\nceldas desajustadas: ' + des);
const cjk = (JSON.stringify(guides).match(/[\u4e00-\u9fff]/g)||[]);
console.log('CJK: ' + (cjk.length ? [...new Set(cjk)].join('') : 'ninguno'));