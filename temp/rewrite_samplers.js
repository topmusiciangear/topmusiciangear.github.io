const fs = require('fs');
const DIR = 'C:/Users/Daniel/projects/topmusiciangear/';
const guides = JSON.parse(fs.readFileSync(DIR + 'data/guides.json', 'utf8'));
const d = guides.find(x => x.title === 'Best Samplers & Beat Making: Complete Guide');

d.sections = [
  {
    heading: 'How to Choose the Best Sampler for Your Workflow?',
    heading_es: '¿Cómo elegir el sampler ideal según tu forma de trabajar?',
    content: '<p><strong>Standalone or tethered, pads or keys, screen or no screen — the right sampler disappears into your habits.</strong> If you finish tracks on the couch or on tour, pick a standalone box with battery and storage. If you live inside a DAW, a controller-style workflow with deep software integration will take you further.</p><p>Budget draws the other line: pocket samplers sketch ideas for under $300, mid-range workstations cover full productions, and flagships replace the studio desk. The ten machines below cover every one of those lanes.</p>',
    content_es: '<p><strong>Autónomo o conectado, pads o teclas, con pantalla o sin ella — el sampler bueno se funde con tus hábitos.</strong> Si terminas temas en el sofá o de gira, elige una máquina autónoma con batería y almacenamiento. Si vives dentro del DAW, un flujo tipo controlador con integración profunda de software te lleva más lejos.</p><p>El presupuesto traza la otra línea: los samplers de bolsillo bocetan ideas por menos de 300 $, las estaciones medias cubren producciones enteras y los insignia sustituyen el escritorio del estudio. Las diez máquinas de abajo cubren cada uno de esos terrenos.</p>'
  },
  {
    heading: 'Hands-On Value: The MPC One G2 Way',
    heading_es: 'Valor con las manos en la masa: el camino del MPC One G2',
    content: '<p><strong>The cheapest door into the standalone MPC world, with nothing essential left out.</strong> The One G2 runs the full MPC software engine — 16 velocity pads, plugin synths, touchscreen, WiFi and Bluetooth — so beats start and finish without a computer in sight.</p><p>A single stereo output and some menu diving remind you where the price went, and the pads ask for firm hits. For hip-hop and urban producers entering standalone territory, no box gives more per dollar.</p>',
    content_es: '<p><strong>La puerta más barata al mundo MPC autónomo, sin recortar nada esencial.</strong> El One G2 corre el motor MPC completo — 16 pads con velocidad, sintes plugin, pantalla táctil, WiFi y Bluetooth — así los beats empiezan y terminan sin PC a la vista.</p><p>Una sola salida estéreo y algo de buceo por menús recuerdan dónde se ajustó el precio, y los pads piden golpes firmes. Para productores de hip-hop y urbano que entran en territorio autónomo, ninguna máquina da más por cada dólar.</p>',
    products: [256]
  },
  {
    heading: 'The Sound Designer\'s Sequencer: Digitakt II',
    heading_es: 'El secuenciador del diseñador de sonido: Digitakt II',
    content: '<p><strong>Eight stereo sampling tracks wired to the best step sequencer in hardware.</strong> Parameter locks, trig conditions and Overbridge turn tiny samples into evolving patterns, and the 1 GB pool plus streaming covers serious libraries.</p><p>There is no touchscreen and only a stereo out, and the Elektron way of thinking takes weeks to click. For electronic producers who sequence first and ask questions later, nothing else thinks this fast.</p>',
    content_es: '<p><strong>Ocho pistas de sampling estéreo cableadas al mejor secuenciador por pasos del hardware.</strong> Los parameter locks, las trig conditions y Overbridge convierten samples minúsculos en patrones vivos, y el GB interno más streaming cubre librerías serias.</p><p>No hay pantalla táctil y solo hay salida estéreo, y la forma Elektron de pensar tarda semanas en encajar. Para productores electrónicos que secuencian primero y preguntan después, nada más piensa tan rápido.</p>',
    products: [127]
  },
  {
    heading: 'Beats Anywhere: MPC Live III Unplugged',
    heading_es: 'Beats en cualquier parte: MPC Live III sin cables',
    content: '<p><strong>Sixteen audio tracks, a lithium battery and a speaker built into the box.</strong> The Live III sketches on the train, arranges in the hotel and finishes in the studio — all with the legendary MPC pads and a 7-inch touchscreen.</p><p>At 2.2 kg it is no pocket toy, there is still a single stereo out, and the price sits firmly in pro land. As the all-in-one workstation for modern hip-hop, it remains the benchmark.</p>',
    content_es: '<p><strong>Dieciséis pistas de audio, batería de litio y altavoz dentro de la caja.</strong> El Live III boceta en el tren, arregla en el hotel y termina en el estudio — todo con los legendarios pads MPC y pantalla táctil de 7 pulgadas.</p><p>Con 2,2 kg no es un juguete de bolsillo, sigue con una sola salida estéreo y el precio pisa terreno pro. Como estación todo en uno para el hip-hop moderno, sigue siendo la referencia.</p>',
    products: [188]
  },
  {
    heading: 'Grit and Chop: The SP-404MKII Ritual',
    heading_es: 'Crudeza y chop: el ritual del SP-404MKII',
    content: '<p><strong>Resample everything, keep the dust, perform the beat live.</strong> Sixteen sample tracks, twelve effects per pattern, skip-back sampling and the famous DJ FX looper made the 404 the fingerprint of lo-fi and boom-bap.</p><p>MIDI sequencing is thin, the small screen fights waveform editing and the pads ignore velocity. For producers who cook beats by ear and feel, that roughness is exactly the point.</p>',
    content_es: '<p><strong>Resamplea todo, conserva el polvo, interpreta el beat en vivo.</strong> Dieciséis pistas de sample, doce efectos por patrón, skip-back sampling y el famoso DJ FX looper hicieron del 404 la huella del lo-fi y el boom-bap.</p><p>La secuenciación MIDI es floja, la pantalla pequeña pelea con la edición de onda y los pads ignoran la velocidad. Para productores que cocinan beats de oído y por sensaciones, esa aspereza es justo la gracia.</p>',
    products: [255]
  },
  {
    heading: 'Two Worlds, One Box: Maschine+',
    heading_es: 'Dos mundos, una caja: Maschine+',
    content: '<p><strong>Standalone groovebox on stage, deep controller in the studio.</strong> Maschine+ carries a 16 GB factory library, eight groups of sixteen hyper-responsive pads and lock snapshots, then docks into the Maschine software when the computer returns.</p><p>It costs real money, the fan hums, boot-up is slow and you live inside the NI ecosystem. For producers raised on Maschine software who want to cut the cord, it is the natural next step.</p>',
    content_es: '<p><strong>Groovebox autónoma en el escenario, controlador profundo en el estudio.</strong> Maschine+ trae librería de fábrica de 16 GB, ocho grupos de dieciséis pads hiperresponsivos y snapshots con lock, y se acopla al software Maschine cuando vuelve el PC.</p><p>Cuesta dinero de verdad, el ventilador zumba, el arranque es lento y vives dentro del ecosistema NI. Para productores criados con el software Maschine que quieren cortar el cable, es el paso natural.</p>',
    products: [620]
  },
  {
    heading: 'The Pocket Sketchpad: EP-133 K.O. II',
    heading_es: 'El bloc de bolsillo: EP-133 K.O. II',
    content: '<p><strong>A calculator that samples — and the fastest idea-to-beat box under $300.</strong> The K.O. II records the world through its built-in mic, chops with pressure-sensitive keys and slams punch-in effects live, all in a jacket-pocket chassis.</p><p>Sixty-four megabytes fill up fast, there is no proper resampling or song mode, and the plastic body asks for gentle hands. As a portable spark for beat-makers, nothing this fun costs this little.</p>',
    content_es: '<p><strong>Una calculadora que samplea — y la caja más rápida de la idea al beat por menos de 300 $.</strong> El K.O. II graba el mundo con su micro integrado, trocea con teclas sensibles a la presión y dispara efectos punch-in en vivo, todo en un chasis de bolsillo.</p><p>Los 64 MB se llenan rápido, no hay resampling serio ni modo canción, y el cuerpo de plástico pide manos suaves. Como chispa portátil para beat-makers, nada tan divertido cuesta tan poco.</p>',
    products: [615]
  },
  {
    heading: 'Play It Like an Instrument: MPC Key 37',
    heading_es: 'Tócalo como un instrumento: MPC Key 37',
    content: '<p><strong>The full MPC engine with thirty-seven real keys attached.</strong> The Key 37 pairs sixteen pads with an aftertouch keyboard, massive I/O and CV/Gate, so chord progressions and drum programming finally live in one standalone box.</p><p>The footprint dwarfs desktop MPCs, the 7-inch screen feels tighter beside the keys, and travel means commitment. For beat-makers with keyboard hands, it is the hybrid that makes theory pay off.</p>',
    content_es: '<p><strong>El motor MPC completo con treinta y siete teclas de verdad acopladas.</strong> El Key 37 junta dieciséis pads con teclado con aftertouch, E/S masiva y CV/Gate, así progresiones y programación de batería por fin conviven en una caja autónoma.</p><p>El tamaño empequeñece a los MPC de escritorio, la pantalla de 7 pulgadas se queda justa junto a las teclas y viajar con él exige compromiso. Para beat-makers con manos de teclado, es el híbrido que hace rentable la teoría.</p>',
    products: [616]
  },
  {
    heading: 'Granular Magic in Your Palm: AIRA Compact P-6',
    heading_es: 'Magia granular en la palma: AIRA Compact P-6',
    content: '<p><strong>Roland sampling DNA shrunk to pocket size with a granular engine on top.</strong> The P-6 samples phones over USB-C, twists grains into textures, stacks the famous SP master effects and runs on a rechargeable battery.</p><p>The tiny screen speaks in shortcuts, polyphony is limited and the mini pads resist finger-drumming. For travelers who want serious sampling without serious luggage, it punches far above its size.</p>',
    content_es: '<p><strong>ADN de sampling Roland encogido a tamaño bolsillo con motor granular encima.</strong> El P-6 samplea móviles por USB-C, retuerce granos hasta texturas, apila los famosos efectos master SP y funciona con batería recargable.</p><p>La pantalla mini habla en atajos, la polifonía es limitada y los minipads se resisten al finger-drumming. Para viajeros que quieren sampling serio sin equipaje serio, rinde muy por encima de su tamaño.</p>',
    products: [617]
  },
  {
    heading: 'Ears First: Circuit Rhythm Without a Screen',
    heading_es: 'Los oídos primero: Circuit Rhythm sin pantalla',
    content: '<p><strong>Thirty-two glowing pads and zero pixels of distraction.</strong> Circuit Rhythm samples straight into the box, slices and resamples across eight tracks, and fires Grid FX — vinyl sim, beat repeat, gater — straight from the grid, with four hours of battery.</p><p>No waveform on screen means learning button combos, sample backup lives in the Components app, and memory per project is finite. For live performers who trust ears over eyes, that trade is pure speed.</p>',
    content_es: '<p><strong>Treinta y dos pads luminosos y cero píxeles de distracción.</strong> Circuit Rhythm samplea directo a la caja, trocea y resamplea en ocho pistas, y dispara Grid FX — vinilo, beat repeat, gater — desde la rejilla, con cuatro horas de batería.</p><p>Sin onda en pantalla toca memorizar combos, el respaldo de samples vive en la app Components y la memoria por proyecto es finita. Para directos que confían en oídos antes que ojos, ese trato es velocidad pura.</p>',
    products: [618]
  },
  {
    heading: 'The Studio Throne: MPC X SE',
    heading_es: 'El trono del estudio: MPC X SE',
    content: '<p><strong>Sixteen motorized knobs with their own OLED screens say flagship before you press a pad.</strong> The X SE adds a 10.1-inch touchscreen, eight DC-coupled outputs and full audio-interface duties to the complete MPC engine.</p><p>The price is flagship too, the desk footprint is permanent, the fan can reach a live mic, and simple loop-makers will never touch half of it. For studios that want one command center for everything, nothing else sits this high.</p>',
    content_es: '<p><strong>Dieciséis knobs motorizados con su propia pantalla OLED dicen insignia antes de tocar un pad.</strong> El X SE suma pantalla táctil de 10,1 pulgadas, ocho salidas DC-coupled y funciones de interfaz de audio al motor MPC completo.</p><p>El precio también es insignia, el hueco en el escritorio es permanente, el ventilador puede colarse en un micro de ambiente, y quien solo hace loops sencillos no tocará ni la mitad. Para estudios que quieren un centro de mando para todo, nada se sienta tan alto.</p>',
    products: [619]
  }
];

d.verdictProsCons = [
  { name: 'Akai MPC One G2', name_es: 'Akai MPC One G2',
    pros: ['Full standalone MPC engine, no computer needed', '16 GB storage, WiFi, Bluetooth and touchscreen', 'Sixteen velocity pads plus plugin synths', 'Best price into real standalone production'],
    pros_es: ['Motor MPC completo en autónomo, sin PC', '16 GB, WiFi, Bluetooth y pantalla táctil', 'Dieciséis pads con velocidad más sintes plugin', 'La entrada más barata a producción autónoma real'],
    cons: ['Single stereo output limits routing', 'Audible fan noise in quiet rooms', 'Deep menus slow quick edits', 'Pads demand firm hits for full velocity'],
    cons_es: ['Una sola salida estéreo limita el ruteo', 'Ventilador audible en salas silenciosas', 'Los menús profundos frenan ediciones rápidas', 'Los pads exigen golpes firmes para toda la velocidad'] },
  { name: 'Elektron Digitakt II', name_es: 'Elektron Digitakt II',
    pros: ['Eight stereo sampling tracks with Overbridge', 'Parameter locks and trig conditions for living patterns', '1 GB pool plus streaming for big libraries', 'The best hardware step sequencer in its class'],
    pros_es: ['Ocho pistas de sampling estéreo con Overbridge', 'Parameter locks y trig conditions para patrones vivos', 'GB interno más streaming para librerías grandes', 'El mejor secuenciador por pasos de su clase'],
    cons: ['No touchscreen, encoders and buttons only', 'Stereo output only, no individual outs', 'Steep learning curve for Elektron newcomers', 'Overbridge stutters on crowded USB hubs'],
    cons_es: ['Sin pantalla táctil, solo encoders y botones', 'Solo salida estéreo, sin salidas individuales', 'Curva de aprendizaje empinada si vienes de fuera', 'Overbridge tartamudea en hubs USB saturados'] },
  { name: 'Akai MPC Live III', name_es: 'Akai MPC Live III',
    pros: ['Sixteen audio tracks in a portable box', 'Built-in lithium battery plus monitoring speaker', 'Seven-inch touchscreen with legendary MPC pads', 'Standalone and controller modes in one unit'],
    pros_es: ['Dieciséis pistas de audio en caja portátil', 'Batería de litio y altavoz de monitor integrados', 'Pantalla táctil de 7 pulgadas con los pads MPC legendarios', 'Modos autónomo y controlador en una unidad'],
    cons: ['Heavy 2.2 kg chassis, no pocket box', 'Single stereo output despite the track count', 'Premium price for the portable privilege', 'Built-in speaker rattles on sub-bass notes'],
    cons_es: ['Chasis pesado de 2,2 kg, nada de bolsillo', 'Una sola salida estéreo pese a tantas pistas', 'Precio premium por el privilegio portátil', 'El altavoz integrado vibra con subgraves'] },
  { name: 'Roland SP-404MKII', name_es: 'Roland SP-404MKII',
    pros: ['Sixteen sample tracks with 12 effects per pattern', 'Skip-back sampling catches happy accidents', 'Legendary DJ FX looper for live sets', 'The definitive lo-fi and boom-bap workflow'],
    pros_es: ['Dieciséis pistas de sample con 12 efectos por patrón', 'El skip-back sampling caza accidentes felices', 'El legendario DJ FX looper para directos', 'El flujo definitivo de lo-fi y boom-bap'],
    cons: ['No serious MIDI sequencing to speak of', 'Small screen complicates waveform edits', 'Pads ignore velocity completely', 'Resampling sessions eat SD cards fast'],
    cons_es: ['Sin secuenciación MIDI seria de la que hablar', 'La pantalla pequeña complica editar ondas', 'Los pads ignoran la velocidad por completo', 'Las sesiones de resampling devoran tarjetas SD'] },
  { name: 'Native Instruments Maschine+', name_es: 'Native Instruments Maschine+',
    pros: ['Standalone groovebox and software controller in one', '16 GB factory library with WiFi and Bluetooth', 'Eight groups of sixteen hyper-responsive pads', 'Lock snapshots for instant arrangement shifts'],
    pros_es: ['Groovebox autónoma y controlador en uno', 'Librería de fábrica de 16 GB con WiFi y Bluetooth', 'Ocho grupos de dieciséis pads hiperresponsivos', 'Snapshots con lock para giros de arreglo al instante'],
    cons: ['High price for the standalone privilege', 'Fan noise bleeds into quiet recordings', 'Locked inside the NI software ecosystem', 'Slow boot-up kills spontaneous ideas'],
    cons_es: ['Precio alto por el privilegio autónomo', 'El ventilador se cuela en grabaciones silenciosas', 'Atado al ecosistema de software NI', 'El arranque lento mata ideas espontáneas'] },
  { name: 'Teenage Engineering EP-133 K.O. II', name_es: 'Teenage Engineering EP-133 K.O. II',
    pros: ['Pocket-size sampler with vintage calculator charm', 'Punch-in 2.0 effects for live performance flair', 'Built-in microphone plus pressure-sensitive keys', 'The most fun per dollar in sampling'],
    pros_es: ['Sampler de bolsillo con encanto de calculadora vintage', 'Efectos punch-in 2.0 para lucirse en vivo', 'Micro integrado más teclas sensibles a la presión', 'Lo más divertido por dólar en sampling'],
    cons: ['64 MB of memory caps longer phrases', 'No real resampling workflow inside', 'Delicate plastic build needs careful hands', 'No proper song mode for full arrangements'],
    cons_es: ['Los 64 MB topan frases largas', 'Sin flujo serio de resampling dentro', 'El plástico delicado pide manos cuidadosas', 'Sin modo canción para arreglos completos'] },
  { name: 'Akai MPC Key 37', name_es: 'Akai MPC Key 37',
    pros: ['Complete MPC engine with 37 full-size keys', 'Aftertouch keyboard for expressive playing', 'Massive I/O including multi-voltage CV/Gate', 'Pads and keys finally share one standalone box'],
    pros_es: ['Motor MPC completo con 37 teclas de tamaño real', 'Teclado con aftertouch para tocar expresivo', 'E/S masiva incluyendo CV/Gate multivoltaje', 'Pads y teclas por fin comparten una caja autónoma'],
    cons: ['Much larger footprint than desktop MPCs', 'Seven-inch screen feels small beside the keys', 'Extra keyboard weight complicates travel', 'Touchscreen workflow feels tight next to 37 keys'],
    cons_es: ['Huella mucho mayor que los MPC de escritorio', 'La pantalla de 7 pulgadas se queda pequeña junto a teclas', 'El peso extra del teclado complica viajar', 'El flujo táctil se queda justo junto a 37 teclas'] },
  { name: 'Roland Aira Compact P-6', name_es: 'Roland AIRA Compact P-6',
    pros: ['Pocket-size sampler with real granular engine', 'USB-C audio and MIDI sampling from phones', 'Famous Roland SP master effects on board', 'Rechargeable battery for beats on the move'],
    pros_es: ['Sampler de bolsillo con motor granular de verdad', 'Audio y MIDI por USB-C para samplear móviles', 'Los famosos efectos master SP de Roland a bordo', 'Batería recargable para beats en marcha'],
    cons: ['Tiny cryptic screen means learning shortcuts', 'Limited polyphony for dense arrangements', 'Mini pads fight serious finger-drumming', 'Micro chassis feels more toy than tool'],
    cons_es: ['La pantalla mini y críptica obliga a aprender atajos', 'Polifonía limitada para arreglos densos', 'Los minipads pelean con el finger-drumming serio', 'El microchasis parece más juguete que herramienta'] },
  { name: 'Novation Circuit Rhythm', name_es: 'Novation Circuit Rhythm',
    pros: ['Screenless grid workflow keeps ears in charge', 'Eight sample tracks with hands-on Grid FX', 'Rechargeable battery with four hours of play', 'Seamless pattern switching for live sets'],
    pros_es: ['El flujo sin pantalla deja el mando en los oídos', 'Ocho pistas de sample con Grid FX al alcance', 'Batería recargable con cuatro horas de juego', 'Cambio de patrones fluido para directos'],
    cons: ['No waveform view without memorizing combos', 'Sample backup depends on the Components app', 'Limited memory per project caps long sets', 'Eight monophonic tracks restrict layering'],
    cons_es: ['Sin vista de onda sin memorizar combos', 'El respaldo de samples depende de la app Components', 'La memoria por proyecto topa sets largos', 'Ocho pistas monofónicas limitan las capas'] },
  { name: 'Akai MPC X SE', name_es: 'Akai MPC X SE',
    pros: ['Flagship studio center with 10.1-inch touchscreen', 'Sixteen motorized Q-Link knobs with OLED screens', 'Eight DC-coupled outputs plus interface duties', 'The largest pads and best ergonomics in MPC land'],
    pros_es: ['Centro insignia con pantalla táctil de 10,1 pulgadas', 'Dieciséis knobs Q-Link motorizados con OLED', 'Ocho salidas DC-coupled más funciones de interfaz', 'Los pads más grandes y la mejor ergonomía MPC'],
    cons: ['Flagship price, the dearest box here', 'Desk-filling footprint, zero portability', 'Fan noise can reach sensitive microphones', 'Overkill for producers making simple loops'],
    cons_es: ['Precio insignia, la caja más cara de aquí', 'Ocupa el escritorio entero, cero portátil', 'El ventilador puede llegar a micros sensibles', 'Excesivo para quien solo hace loops sencillos'] }
];

d.conclusion = 'Pick by habit, not hype: pocket sketchers belong with the EP-133 K.O. II or the P-6, live performers with Circuit Rhythm or the SP-404MKII, and full productions with an MPC or Maschine+. The Digitakt II rewards sequencer minds, the Key 37 rewards keyboard hands, and the X SE rewards studios that want one throne for everything.';
d.conclusion_es = 'Elige por hábito, no por hype: los bocetos de bolsillo piden el EP-133 K.O. II o el P-6, los directos piden Circuit Rhythm o SP-404MKII, y las producciones enteras piden un MPC o Maschine+. El Digitakt II premia mentes de secuenciador, el Key 37 premia manos de teclado, y el X SE premia estudios que quieren un solo trono para todo.';
d.verdict = 'The MPC Live III and MPC Key 37 are the heavy-hitting all-in-one workstations for modern hip-hop, while the Digitakt II rules deep electronic sound design. Pocket picks (EP-133, P-6), live tools (Circuit Rhythm, SP-404MKII) and flagships (MPC X SE, Maschine+) cover the rest — choose by workflow, not brand.';
d.verdict_es = 'El MPC Live III y el MPC Key 37 son las estaciones todo en uno que mandan en el hip-hop moderno, mientras el Digitakt II manda en diseño electrónico profundo. Bolsillo (EP-133, P-6), directo (Circuit Rhythm, SP-404MKII) e insignias (MPC X SE, Maschine+) cubren el resto — elige por flujo de trabajo, no por marca.';

fs.writeFileSync(DIR + 'data/guides.json', JSON.stringify(guides, null, 2));
console.log('rewritten: sections=' + d.sections.length + ' vpc=' + d.verdictProsCons.length);
