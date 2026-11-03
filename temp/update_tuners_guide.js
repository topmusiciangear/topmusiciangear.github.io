const fs = require('fs');
const path = 'data/guides.json';
let guides = JSON.parse(fs.readFileSync(path,'utf8'));
const guide = guides.find(g => g.id === 'tuners-bass-guitar');
if (!guide) { console.error('Guide not found'); process.exit(1); }

guide.sections = [
  {
    heading: 'Best pedal strobe tuner: Peterson StroboStomp HD',
    heading_es: 'Mejor afinador de pedal strobe: Peterson StroboStomp HD',
    content: '<p><strong>The Peterson StroboStomp HD is the studio reference on a pedalboard.</strong> True strobe display with ±0.1 cent accuracy, Sweetened Tunings for better intonation, and a silent true-bypass mute. The large LCD is readable in sunlight and dark stages, and the build is roadworthy metal. It also offers 18 tuning modes and a 1000Hz reference tone for setup work.</p><p><strong>Best for:</strong> players who want bench-level accuracy in a live pedal, guitar techs, and studio sessions.</p>',
    content_es: '<p><strong>El Peterson StroboStomp HD es la referencia de estudio en formato de pedal.</strong> Pantalla strobe real con precisión de ±0.1 cent, Sweetened Tunings para mejorar la entonación y mute true bypass silencioso. La LCD grande se lee con sol y en escenario oscuro, y la construcción metálica aguanta giras. Ofrece 18 modos de afinación y tono de referencia de 1000Hz para setup.</p><p><strong>Ideal para:</strong> músicos que quieren precisión de banco en directo, técnicos y sesiones de estudio.</p>',
    products: [9003]
  },
  {
    heading: 'Best polyphonic pedal tuner: TC Electronic PolyTune 3',
    heading_es: 'Mejor afinador de pedal polifónico: TC Electronic PolyTune 3',
    content: '<p><strong>PolyTune 3 gives you three tuners in one box.</strong> Polyphonic mode shows all strings at once, chromatic needle mode is precise, and strobe mode offers ±0.1 cent resolution. Display is bright and visible on stage, with a built-in buffer to preserve tone. It runs on 9V and fits standard pedalboard spacing.</p><p><strong>Best for:</strong> guitarists who want fast visual feedback and the option to flip to strobe for setup.</p>',
    content_es: '<p><strong>PolyTune 3 es tres afinadores en uno.</strong> El modo polifónico muestra todas las cuerdas a la vez, el modo cromático con aguja es preciso y el strobe llega a ±0.1 cent. La pantalla es brillante en escenario y el buffer integrado conserva el tono. Funciona con 9V y ocupa el espacio de un pedal estándar.</p><p><strong>Ideal para:</strong> guitarristas que quieren retroalimentación rápida y strobe para setup.</p>',
    products: [9004]
  },
  {
    heading: 'Best stage pedal tuner: Boss TU-3 Chromatic Tuner',
    heading_es: 'Mejor afinador de pedal para escenario: Boss TU-3 cromático',
    content: '<p><strong>The Boss TU-3 is the industry standard pedal tuner for a reason.</strong> 21-segment LED meter, chromatic tuning with guitar and bass modes, true bypass, and a mute function that silences your rig while tuning. Accuracy is ±1 cent, fast response, and the display is visible in direct sunlight and dark stages. It powers up to seven Boss compact pedals and has survived 30 years of touring abuse.</p><p><strong>Best for:</strong> live guitar and bass players who need bullet-proof reliability and stage visibility.</p>',
    content_es: '<p><strong>El Boss TU-3 es el estándar de la industria en afinadores de pedal por una razón.</strong> Medidor LED de 21 segmentos, afinación cromática con modos de guitarra y bajo, true bypass y función de mute que silencia tu equipo mientras afinas. Precisión de ±1 cent, respuesta rápida y la pantalla se ve en luz solar directa y escenarios oscuros. Alimenta hasta siete pedales Boss compactos y ha sobrevivido 30 años de giras.</p><p><strong>Ideal para:</strong> guitarristas y bajistas en vivo que necesitan fiabilidad a prueba de balas y visibilidad en escenario.</p>',
    products: [98]
  },
  {
    heading: 'Best compact pedal tuner: Korg Pitchblack X',
    heading_es: 'Mejor afinador de pedal compacto: Korg Pitchblack X',
    content: '<p><strong>Korg Pitchblack X is tiny but loud and clear.</strong> High-contrast LCD with ±0.1 cent accuracy, true bypass, and a built-in power supply for up to six pedals. The flat display sits low on the board and the tuning speed is instant. It offers guitar, bass and chromatic modes with a clear visual ramp.</p><p><strong>Best for:</strong> pedalboards where space is tight but you still want pro accuracy.</p>',
    content_es: '<p><strong>Korg Pitchblack X es diminuto pero claro y rápido.</strong> LCD de alto contraste con precisión de ±0.1 cent, true bypass y fuente integrada para hasta seis pedales. La pantalla plana queda baja en la pedalera y la velocidad de afinación es instantánea. Ofrece modos guitarra, bajo y cromático con una rampa visual clara.</p><p><strong>Ideal para:</strong> pedalboards donde el espacio escasea pero se quiere precisión profesional.</p>',
    products: [9005]
  },
  {
    heading: 'Best boutique pedal tuner: Walrus Audio Canvas Tuner',
    heading_es: 'Mejor afinador de pedal boutique: Walrus Audio Canvas Tuner',
    content: '<p><strong>Walrus Audio Canvas Tuner pairs great tone with great looks.</strong> True bypass, ±0.5 cent accuracy, and a large, easy-to-read display. It runs silently and the enclosure is built from high-quality aluminum with a soft-touch finish. The tuner is designed to sit discreetly on a compact board.</p><p><strong>Best for:</strong> players who want a reliable tuner that matches a modern pedalboard aesthetic.</p>',
    content_es: '<p><strong>Walrus Audio Canvas Tuner combina buen tono con gran estética.</strong> True bypass, precisión de ±0.5 cent y pantalla grande fácil de leer. Funciona en silencio y la caja de aluminio de alta calidad tiene acabado suave. Está pensado para quedar discreto en una pedalera compacta.</p><p><strong>Ideal para:</strong> músicos que quieren un afinador fiable con estética moderna.</p>',
    products: [9006]
  },
  {
    heading: 'Best clip-on polyphonic tuner: TC Electronic PolyTune Clip',
    heading_es: 'Mejor clip-on polifónico: TC Electronic PolyTune Clip',
    content: '<p><strong>The PolyTune Clip lets you strum all six strings and see which ones are off instantly.</strong> Polyphonic mode turns a full chord into a tuning snapshot; chromatic mode gives precise needle tracking. The bright color LCD and vibration sensor make it work on loud stages. Accuracy is ±1 cent with fast response.</p><p><strong>Best for:</strong> acoustic players, studio setups, and quick checks between songs without unplugging.</p>',
    content_es: '<p><strong>El PolyTune Clip te permite rasguear las seis cuerdas y ver al instante cuáles están desafinadas.</strong> El modo polifónico convierte un acorde completo en una instantánea de afinación; el modo cromático da seguimiento de aguja preciso. La LCD a color brillante y el sensor de vibración lo hacen funcional en escenarios ruidosos. Precisión de ±1 cent con respuesta rápida.</p><p><strong>Ideal para:</strong> guitarristas acústicos, estudios y verificaciones rápidas entre canciones.</p>',
    products: [9001]
  },
  {
    heading: 'Best precision clip-on tuner: Peterson StroboClip HD',
    heading_es: 'Mejor clip-on de precisión: Peterson StroboClip HD',
    content: '<p><strong>The StroboClip HD is the reference tuner.</strong> True strobe tuning with ±0.1 cent accuracy, 18 tuning modes including alternate tunings and Sweetened Tunings optimized for intonation. Bright LED meter with 1000Hz reference tone for accurate pitch.</p><p><strong>Best for:</strong> studio techs, luthiers, and players who demand absolute pitch accuracy.</p>',
    content_es: '<p><strong>El StroboClip HD es el afinador de referencia.</strong> Afinación strobe real con precisión de ±0.1 cent, 18 modos de afinación incluyendo afinaciones alternativas y Sweetened Tunings optimizadas para entonación. Medidor LED brillante con tono de referencia de 1000Hz para pitch preciso.</p><p><strong>Ideal para:</strong> técnicos de estudio, luthiers y músicos que exigen absoluta precisión de pitch.</p>',
    products: [61]
  },
  {
    heading: 'Best bass clip-on tuner: Korg AW-LT100B',
    heading_es: 'Mejor clip-on para bajo: Korg AW-LT100B',
    content: '<p><strong>Korg AW-LT100B is built for low frequencies.</strong> Vibration sensor tuned for bass, large backlit display, and a strong clip that holds large headstocks. Accuracy is ±1 cent and it works well on both acoustic and electric bass. Battery life is long and the housing is rugged.</p><p><strong>Best for:</strong> bassists who need a dedicated clip-on that reads reliably on low B and E strings.</p>',
    content_es: '<p><strong>Korg AW-LT100B está pensado para frecuencias graves.</strong> Sensor de vibración optimizado para bajo, pantalla retroiluminada grande y clip fuerte que sujeta cabezas grandes. Precisión de ±1 cent y funciona bien en bajo acústico y eléctrico. La autonomía es larga y la carcasa es robusta.</p><p><strong>Ideal para:</strong> bajistas que necesitan un clip-on dedicado que lea con fiabilidad en las cuerdas graves.</p>',
    products: [9007]
  },
  {
    heading: 'Best budget clip-on tuner: Snark ST-2 Super Tight',
    heading_es: 'Mejor clip-on económico: Snark ST-2 Super Tight',
    content: '<p><strong>Snark ST-2 is the value king for clip-ons.</strong> Full-color display with 360° visibility, chromatic and needle modes, and a tight clip that stays put on bass headstocks. Accuracy of ±1 cent is more than enough for practice and live. Housing is rugged for gig bags.</p><p><strong>Best for:</strong> beginners, backup tuners, and players who want reliable tuning on a budget.</p>',
    content_es: '<p><strong>Snark ST-2 es el rey de la relación calidad-precio en clip-ons.</strong> Pantalla a color con visibilidad 360°, modos cromático y de aguja, y clip firme que se mantiene en cabezas de bajo. Precisión de ±1 cent es más que suficiente para práctica y vivo. La carcasa es robusta para gig bags.</p><p><strong>Ideal para:</strong> principiantes, afinadores de respaldo y quienes quieren afinación fiable con presupuesto limitado.</p>',
    products: [9008]
  },
  {
    heading: 'Which tuner should you buy?',
    heading_es: '¿Qué afinador deberías comprar?',
    content: '<p><strong>Choose Peterson StroboStomp HD if you want studio-grade strobe accuracy on a pedalboard.</strong> Choose TC Electronic PolyTune 3 if you want polyphonic speed with strobe option. Choose Boss TU-3 for bullet-proof live reliability. Choose Korg Pitchblack X for a tiny, accurate pedal. Choose Walrus Canvas for boutique looks with solid performance. Choose PolyTune Clip for quick acoustic checks. Choose Peterson StroboClip HD for bench-level precision on the headstock. Choose Korg AW-LT100B for a bass-specific clip-on. Choose Snark ST-2 for the best budget option.</p>',
    content_es: '<p><strong>Elige Peterson StroboStomp HD si quieres precisión strobe de estudio en pedalera.</strong> Elige TC Electronic PolyTune 3 si buscas velocidad polifónica con opción strobe. Elige Boss TU-3 por fiabilidad a prueba de balas en directo. Elige Korg Pitchblack X por un pedal pequeño y preciso. Elige Walrus Canvas por estética boutique con rendimiento sólido. Elige PolyTune Clip para comprobaciones rápidas en acústica. Elige Peterson StroboClip HD por precisión de banco en la cabeza. Elige Korg AW-LT100B para clip-on específico de bajo. Elige Snark ST-2 por la mejor opción económica.</p>',
    products: [9003,9004,98,9005,9006,9001,61,9007,9008]
  }
];

guide.verdictProsCons = [
  {
    name: 'Peterson StroboStomp HD',
    name_es: 'Peterson StroboStomp HD',
    pros: ['True strobe ±0.1 cent accuracy','Sweetened Tunings for better intonation','Silent true-bypass mute','Large readable LCD','Robust metal chassis'],
    pros_es: ['Strobe real con precisión ±0.1 cent','Sweetened Tunings para mejor entonación','Mute true bypass silencioso','LCD grande y legible','Chasis metálico robusto'],
    cons: ['More expensive than entry pedals','Menu can be complex','Larger than mini tuners'],
    cons_es: ['Más caro que pedales básicos','Menú puede ser complejo','Más grande que mini afinadores']
  },
  {
    name: 'TC Electronic PolyTune 3',
    name_es: 'TC Electronic PolyTune 3',
    pros: ['Polyphonic and chromatic modes','Strobe mode ±0.1 cent','Built-in buffer preserves tone','Bright stage-visible display','Standard 9V power'],
    pros_es: ['Modos polifónico y cromático','Modo strobe ±0.1 cent','Buffer integrado conserva tono','Pantalla brillante visible en escenario','Alimentación 9V estándar'],
    cons: ['Poly mode less precise than strobe','Display can be busy','No dedicated bass switch'],
    cons_es: ['Modo polifónico menos preciso que strobe','Pantalla puede ser confusa','Sin interruptor dedicado para bajo']
  },
  {
    name: 'Boss TU-3 Chromatic Tuner',
    name_es: 'Boss TU-3 afinador cromático',
    pros: ['Bullet-proof metal chassis','True bypass with silent mute','21-segment LED visible in any light','Guitar/bass/flat modes','Powers up to seven Boss pedals'],
    pros_es: ['Chasis metálico a prueba de giras','True bypass con mute silencioso','LED de 21 segmentos visible en cualquier luz','Modos guitarra/bajo/flat','Alimenta hasta siete pedales Boss'],
    cons: ['±1 cent accuracy not strobe precise','Pedal format needs board space','Larger footprint than mini tuners'],
    cons_es: ['Precisión ±1 cent no es strobe','Formato pedal requiere espacio','Huella más grande que mini afinadores']
  },
  {
    name: 'Korg Pitchblack X',
    name_es: 'Korg Pitchblack X',
    pros: ['±0.1 cent accuracy in compact size','High-contrast flat display','True bypass','Power for up to six pedals','Instant tracking'],
    pros_es: ['Precisión ±0.1 cent en tamaño compacto','Pantalla plana de alto contraste','True bypass','Alimentación para hasta seis pedales','Seguimiento instantáneo'],
    cons: ['Display small from distance','No polyphonic mode','Power supply extra cost'],
    cons_es: ['Pantalla pequeña a distancia','Sin modo polifónico','Fuente de alimentación extra cuesta']
  },
  {
    name: 'Walrus Audio Canvas Tuner',
    name_es: 'Walrus Audio Canvas Tuner',
    pros: ['Large easy-to-read display','±0.5 cent accuracy','True bypass','Aluminum enclosure','Soft-touch finish'],
    pros_es: ['Pantalla grande fácil de leer','Precisión ±0.5 cent','True bypass','Carcasa de aluminio','Acabado suave al tacto'],
    cons: ['No strobe mode','Less bright than LEDs','Premium price'],
    cons_es: ['Sin modo strobe','Menos brillante que LEDs','Precio premium']
  },
  {
    name: 'TC Electronic PolyTune Clip',
    name_es: 'TC Electronic PolyTune Clip',
    pros: ['Polyphonic tuning of all strings','Vibration sensor works on loud stages','Bright color LCD 360° visibility','Fits any headstock','Long battery life'],
    pros_es: ['Afinación polifónica de todas las cuerdas','Sensor de vibración funciona en escenarios ruidosos','LCD a color 360°','Se ajusta a cualquier cabeza','Autonomía larga'],
    cons: ['Battery life limited for heavy use','Clip bulky on small headstocks','Poly mode less precise'],
    cons_es: ['Autonomía limitada en uso intensivo','Clip voluminoso en cabezas pequeñas','Modo polifónico menos preciso']
  },
  {
    name: 'Peterson StroboClip HD',
    name_es: 'Peterson StroboClip HD',
    pros: ['True strobe ±0.1 cent','18 tuning modes with Sweetened Tunings','1000Hz reference tone','Professional reference mode','Bright LED meter'],
    pros_es: ['Strobe real ±0.1 cent','18 modos con Sweetened Tunings','Tono de referencia 1000Hz','Modo referencia profesional','Medidor LED brillante'],
    cons: ['Most expensive clip-on','Complex menu','Steeper learning curve'],
    cons_es: ['Clip-on más caro','Menú complejo','Curva de aprendizaje pronunciada']
  },
  {
    name: 'Korg AW-LT100B',
    name_es: 'Korg AW-LT100B',
    pros: ['Optimized for bass frequencies','Large backlit display','Strong clip for big headstocks','Long battery life','Rugged housing'],
    pros_es: ['Optimizado para frecuencias de bajo','Pantalla retroiluminada grande','Clip fuerte para cabezas grandes','Autonomía larga','Carcasa robusta'],
    cons: ['No polyphonic mode','Display washes in direct sun','Clip can slip on glossy finishes'],
    cons_es: ['Sin modo polifónico','Pantalla se lava con sol directo','Clip puede resbalar en acabados brillantes']
  },
  {
    name: 'Snark ST-2 Super Tight',
    name_es: 'Snark ST-2 Super Tight',
    pros: ['Best price-to-performance','Full-color 360° display','Strong clip for bass','Chromatic and needle modes','Rugged for gig bags'],
    pros_es: ['Mejor relación precio-rendimiento','Pantalla a color 360°','Clip fuerte para bajo','Modos cromático y aguja','Robusto para gig bags'],
    cons: ['Short battery life','Plastic housing less durable','Display washes out in sun'],
    cons_es: ['Autonomía corta','Carcasa de plástico menos durable','Pantalla se desvanece al sol']
  }
];

fs.writeFileSync(path, JSON.stringify(guides, null, 2));
console.log('Updated');
