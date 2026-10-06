const fs = require('fs');
const guides = JSON.parse(fs.readFileSync('data/guides.json', 'utf8'));
const idx = guides.findIndex(g => g.id === 'best-digital-pianos');
if (idx < 0) throw new Error('guide not found');
const old = guides[idx];

const newGuide = {
  id: 'best-digital-pianos',
  title: 'Best Digital Pianos for Home & Studio',
  title_es: 'Mejores pianos digitales para hogar y estudio',
  titleTag: 'Best Digital Pianos for Every Budget',
  titleTag_es: 'Mejores pianos digitales para cada presupuesto',
  category: old.category,
  image: old.image,
  badge: old.badge,
  intro: '<p>Not sure if you need a digital piano or a MIDI controller? Check out our <a class="guide-link-btn" href="/guides/best-keyboard.html">master guide on the best keyboards for musicians</a> to find your perfect match.</p><p>A digital piano should feel like a real grand, not a toy keyboard. After comparing graded hammer actions, console cabinets and speaker systems side by side, these are the models worth buying for home and studio.</p>',
  intro_es: '<p>¿No sabes si necesitas un piano digital o un controlador MIDI? Echa un vistazo a nuestra <a class="guide-link-btn" href="/guides/best-keyboard_es.html">guía principal de los mejores teclados para músicos</a> y encuentra tu modelo.</p><p>Un piano digital debe sentirse como un piano de cola de verdad, no como un teclado de juguete. Tras comparar acciones de martillo graduadas, muebles y sistemas de altavoces uno al lado del otro, estos son los modelos que merecen la pena para casa y estudio.</p>',
  sections: [
    {
      heading: 'How to Choose a Digital Piano for Home: Hammer Action vs. Toy Keybeds',
      heading_es: 'Cómo elegir un piano para casa: acción de martillo contrapesada vs. teclados de juguete',
      content: '<p><strong>A weighted hammer action is what separates a digital piano from a toy keyboard.</strong> Cheap keyboards use unweighted actions where every key feels the same; a proper digital piano uses graded hammer action — heavier in the bass, lighter in the treble — so your fingers build the same technique they would on an acoustic grand. If you are serious about learning, this is the one thing you cannot compromise on.</p><p><strong>Know what the keys are made of.</strong> Almost every model here uses plastic keytops with a synthetic ivory feel, which is normal even on expensive instruments; wooden white keys only appear at the premium Clavinova tier (CLP-845 and above). Escapement — the subtle click near the bottom of a key — tells you more about realism than the material does, and the FP-30X, YDP-166 and CLP-835 all have it.</p><p><strong>Then decide between portable and console.</strong> A portable slab (PX-S1100, FP-10, P-225, FP-30X) needs a separate stand and pedals, but you can move it or store it away. A console (RP107, KDP120, YDP-166, CLP-835) arrives as furniture with a fixed three-pedal unit and usually sounds fuller because the cabinet works as a resonating body. Check polyphony too — 192 notes minimum so pedal-heavy pieces do not drop notes — plus Bluetooth (audio for play-along, MIDI for apps) and line or USB outputs for recording.</p>',
      content_es: '<p><strong>La acción de martillo contrapesada es lo que separa un piano digital de un teclado de juguete.</strong> Los teclados baratos llevan acciones sin contrapeso en las que todas las teclas se sienten igual; un piano digital de verdad usa acción graduada — más pesada en los graves, más ligera en los agudos — para que los dedos desarrollen la misma técnica que en un piano acústico. Si te tomas en serio el estudio, es lo único que no puedes recortar.</p><p><strong>Mira de qué están hechas las teclas.</strong> Casi todos los modelos de esta guía llevan tapas de plástico con tacto de marfil sintético, algo normal incluso en instrumentos caros; las teclas blancas de madera solo aparecen en la gama alta de la Clavinova (CLP-845 en adelante). El escape — el clic suave hacia el fondo de la tecla — dice más sobre el realismo que el material, y el FP-30X, el YDP-166 y el CLP-835 lo llevan.</p><p><strong>Después, decide entre portátil y mueble.</strong> Un piano plano portátil (PX-S1100, FP-10, P-225, FP-30X) necesita soporte y pedales aparte, pero lo mueves o guardas cuando quieres. Un modelo de mueble (RP107, KDP120, YDP-166, CLP-835) llega como mobiliario con su unidad de tres pedales fija y normalmente suena más lleno porque el mueble hace de caja de resonancia. Mira también la polifonía — mínimo 192 notas para que las piezas con pedal no corten notas —, el Bluetooth (audio para acompañarte, MIDI para apps) y las salidas de línea o USB para grabar.</p>',
      products: [],
      skipMedia: true
    },
    {
      heading: 'Best Ultra-Compact Digital Pianos',
      heading_es: 'Los mejores pianos digitales ultracompactos',
      content: '<p><strong>Casio Privia PX-S1100</strong> is the slimmest 88-key hammer piano you can buy: 232 mm deep, 11.2 kg, and flat enough to disappear against a wall. The Smart Scaled Hammer Action gives graded weight across all 88 keys, 192-note polyphony handles pedal-heavy pieces, and the included WU-BT10 adapter adds Bluetooth audio plus wireless MIDI. Line outputs and battery power make it the most complete traveler here; the touch panel is minimalist and the 8W+8W speakers are sized for a bedroom, not a hall.</p><p><strong>Roland FP-10</strong> is the value pick: it carries the same PHA-4 Standard action with escapement and ivory feel as the FP-30X, without the FP-30X price tag. SuperNATURAL piano sound, Bluetooth MIDI and 96-note polyphony cover lessons and home practice without fuss. You give up Bluetooth audio, line outputs and polyphony headroom, and the single headphone jack limits duet practice — but as a first serious keybed, nothing beats it.</p>',
      content_es: '<p><strong>Casio Privia PX-S1100</strong> es el piano de martillo de 88 teclas más fino que puedes comprar: 232 mm de fondo, 11.2 kg y un perfil que pasa desapercibido contra la pared. La Smart Scaled Hammer Action reparte peso graduado por las 88 teclas, sus 192 notas de polifonía aguantan piezas con pedal y el adaptador WU-BT10 incluido añade Bluetooth audio y MIDI inalámbrico. Salidas de línea y alimentación por pilas lo convierten en el viajero más completo de esta selección; el panel táctil es minimalista y los altavoces de 8W+8W rinden para un dormitorio, no para una sala.</p><p><strong>Roland FP-10</strong> es la opción más rentable: monta la misma acción PHA-4 Standard con escape y tacto de marfil que el FP-30X, sin el precio del FP-30X. Sonido SuperNATURAL, Bluetooth MIDI y 96 notas de polifonía cubren clases y práctica en casa sin complicaciones. Renuncias al Bluetooth audio, a las salidas de línea y a margen de polifonía, y el único jack de auriculares limita la práctica a cuatro manos; pero como primer teclado serio, no hay mejor opción.</p>',
      products: [571, 572],
      splitProducts: true
    },
    {
      heading: 'Best Mid-Range Portable Digital Pianos',
      heading_es: 'Los mejores pianos digitales portátiles de gama media',
      content: '<p><strong>Roland FP-30X</strong> is the pick if touch comes first. The PHA-4 Standard action has escapement, triple-sensor detection and ivory-textured keytops, so pianissimo and fast repeats feel honest; 256-note polyphony means dense sustains never clip. SuperNATURAL modeling responds to velocity instead of playing flat samples, the 22W stereo system fills a room, and Bluetooth audio plus USB audio/MIDI cover play-along and recording. It has no display — deep editing lives in the Roland app — and at 14.8 kg it is the heaviest portable here.</p><p><strong>Yamaha P-225</strong> is the compact alternative: GHC action, CFX concert grand samples with VRM Lite resonance, 192-note polyphony and 24 voices in an 11.5 kg slab. Bluetooth MIDI and USB audio/MIDI make it a clean controller for a DAW, and the dual headphone jacks suit lessons. The speaker system is softer than the FP-30X\u2019s, and the sound engine keeps to piano-focused voices rather than a big general palette.</p>',
      content_es: '<p><strong>Roland FP-30X</strong> es la elección si lo primero es el tacto. La acción PHA-4 Standard lleva escape, detección de triple sensor y tapas con textura de marfil, así que el pianísimo y los pasajes rápidos se sienten fiel; sus 256 notas de polifonía evitan que las notas acumuladas con pedal se corten. El modelado SuperNATURAL responde a la velocidad en lugar de reproducir muestras planas, el sistema estéreo de 22W llena una habitación y el Bluetooth audio junto al USB audio/MIDI sirven para acompañar y grabar. No tiene pantalla — la edición profunda vive en la app de Roland — y con 14.8 kg es el portátil más pesado de esta selección.</p><p><strong>Yamaha P-225</strong> es la alternativa compacta: acción GHC, muestras del gran concierto CFX con resonancia VRM Lite, 192 notas de polifonía y 24 voces en un cuerpo de 11.5 kg. El Bluetooth MIDI y el USB audio/MIDI lo convierten en un controlador limpio para tu DAW, y los dos jacks de auriculares vienen bien para clases. El sistema de altavoces rinde menos que el del FP-30X y el motor de sonido se centra en el piano en vez de ofrecer una paleta enorme de voces.</p>',
      products: [141, 140],
      splitProducts: true
    },
    {
      heading: 'Best Console Digital Pianos with Furniture',
      heading_es: 'Los mejores pianos digitales de mueble para casa',
      content: '<p><strong>Roland RP107</strong> is the cheapest real console here: fixed cabinet, integrated three-pedal unit, sliding key cover, and the same PHA-4 Standard action with escapement as the FP-30X. 256-note polyphony and Bluetooth audio/MIDI are unusual at this price; what you give up is speaker power — the 8W+8W system is polite — and the front panel offers just 15 tones.</p><p><strong>Kawai KDP120</strong> sits in the middle and brings the strongest touch and the loudest speakers: RHCII action with triple sensors and springless hammers, Shigeru Kawai SK-EX sampled across all 88 keys, and a 40W (20W\u00d72) system with Low Volume Balance for quiet practice. Virtual Technician lets you adjust voicing, decay and damping from the PianoRemote app. The trade-off is Bluetooth MIDI only — no audio streaming — and no display.</p><p><strong>Yamaha Arius YDP-166</strong> is the classic living-room choice: GrandTouch-E action with escapement and synthetic ebony/ivory keytops, CFX sample with VRM Lite, 192-note polyphony, and Bluetooth audio plus MIDI in the cabinet that has defined the Arius line for years. It keeps 10 voices and 20W\u00d72 amplification and has no line output, so recording goes through USB audio.</p>',
      content_es: '<p><strong>Roland RP107</strong> es el mueble más barato de esta selección: mueble fijo, unidad de tres pedales integrada, tapa abatible y la misma acción PHA-4 Standard con escape que el FP-30X. Sus 256 notas de polifonía y el Bluetooth audio/MIDI no son frecuentes a este precio; lo que se sacrifica es la potencia de altavoz — el sistema de 8W+8W es discreto — y el panel frontal ofrece solo 15 tonos.</p><p><strong>Kawai KDP120</strong> ocupa el centro y trae el tacto más firme y los altavoces más potentes: acción RHCII con triple sensor y martillos sin muelle, muestras del Shigeru Kawai SK-EX en las 88 teclas y un sistema de 40W (20W\u00d72) con Low Volume Balance para practicar en bajo volumen. El Virtual Technician permite ajustar voicing, decaimiento y amortiguación desde la app PianoRemote. A cambio, el Bluetooth es solo MIDI — sin transmisión de audio — y no tiene pantalla.</p><p><strong>Yamaha Arius YDP-166</strong> es la opción clásica para el salón: acción GrandTouch-E con escape y tapas sintéticas de marfil y ébano, muestra del CFX con VRM Lite, 192 notas de polifonía y Bluetooth audio más MIDI en el mueble que ha definido la gama Arius durante años. Mantiene 10 voces y 20W\u00d72 de amplificación y no tiene salida de línea, así que grabar pasa por el audio USB.</p>',
      products: [565, 568, 567],
      splitProducts: true
    },
    {
      heading: 'Best Premium Console Piano: Yamaha Clavinova CLP-835',
      heading_es: 'El mejor piano de mueble premium: Yamaha Clavinova CLP-835',
      content: '<p><strong>If you want one instrument that blends into the living room and still plays like a serious piano, the Clavinova CLP-835 is where the range starts to get interesting.</strong> The GrandTouch-S action brings escapement, synthetic ebony/ivory keytops and triple-sensor detection, while CFX and B\u00f6sendorfer Imperial samples run through VRM and Grand Expression Modeling — the same resonance behavior Yamaha uses in its flagship. 256-note polyphony, 38 voices, a 30W\u00d72 speaker system and a USB audio interface (44.1 kHz/24-bit) cover everything from practice sessions to tracking. Bluetooth audio/MIDI, a full-dot display with button panel and a sliding cover finish the cabinet. At 57 kg it needs two people and a permanent spot, and wooden white keys only arrive one model up, on the CLP-845.</p>',
      content_es: '<p><strong>Si quieres un instrumento que se funda con el salón y que además toque como un piano de verdad, la Clavinova CLP-835 es donde la serie empieza a ponerse interesante.</strong> La acción GrandTouch-S lleva escape, tapas sintéticas de marfil y \u00e9bano y detecci\u00f3n de triple sensor, mientras las muestras del CFX y del B\u00f6sendorfer Imperial pasan por VRM y el Grand Expression Modeling — el mismo comportamiento de resonancia que Yamaha usa en su buque insignia. 256 notas de polifon\u00eda, 38 voces, sistema de altavoces de 30W\u00d72 y una interfaz de audio USB (44.1 kHz/24 bit) cubren desde practicar hasta grabar. Bluetooth audio/MIDI, pantalla de puntos con panel de botones y tapa deslizante completan el mueble. Con 57 kg hacen falta dos personas y un sitio fijo, y las teclas blancas de madera solo llegan un modelo m\u00e1s arriba, en el CLP-845.</p>',
      products: [570]
    }
  ],
  conclusion: 'The Roland FP-30X is the best all-round digital piano for home players, pairing the most realistic entry-level hammer action with 256-note polyphony and Bluetooth audio. On a tight budget the FP-10 delivers the same keybed, while the Casio PX-S1100 wins on size. If the piano has to live in the living room, the Roland RP107 is the value console, the Kawai KDP120 brings the strongest touch and loudest speakers, the Yamaha YDP-166 is the classic choice, and the Clavinova CLP-835 is the premium step-up for players who want the closest thing to an acoustic grand. <p><a href="/guides/best-keyboard.html" class="guide-link-btn">Best Keyboard & Digital Piano for Home Studio</a> <a href="/guides/midi-keyboards.html" class="guide-link-btn">Best MIDI Keyboards & Controllers for Your Home Studio</a> <a href="/guides/best-synthesizers.html" class="guide-link-btn">Best Synthesizers for Music Production</a></p>',
  conclusion_es: 'El Roland FP-30X es el mejor piano digital para tocar en casa: la acción de martillo realista de su precio, 256 notas de polifon\u00eda y Bluetooth audio. Con presupuesto ajustado, el FP-10 ofrece el mismo teclado, y el Casio PX-S1100 gana en tama\u00f1o. Si el piano tiene que convivir con el sal\u00f3n, el Roland RP107 es el mueble m\u00e1s barato, el Kawai KDP120 aporta el tacto m\u00e1s firme y los altavoces m\u00e1s potentes, el Yamaha YDP-166 es la opci\u00f3n cl\u00e1sica y la Clavinova CLP-835 el salto premium para quien busca lo m\u00e1s parecido a un piano ac\u00fastico. <p>Tambi\u00e9n te interesa: <a href="/guides/best-keyboard_es.html" class="guide-link-btn">Mejor teclado y piano digital para el home studio</a> <a href="/guides/midi-keyboards_es.html" class="guide-link-btn">Mejores teclados y controladores MIDI para tu home studio</a> <a href="/guides/best-synthesizers_es.html" class="guide-link-btn">Mejores sintetizadores para producci\u00f3n musical</a></p>',
  verdict: 'The FP-30X is the best-feel pick for most home players. The RP107 and KDP120 are the value consoles, the YDP-166 the living-room classic, and the CLP-835 the premium step-up.',
  verdict_es: 'El FP-30X ofrece el mejor tacto para la mayor\u00eda de los que tocan en casa. El RP107 y el KDP120 son los muebles con mejor relaci\u00f3n calidad-precio, el YDP-166 el cl\u00e1sico del sal\u00f3n y el CLP-835 el salto premium.',
  featuredProducts: [141, 565, 568, 567, 570],
  description: 'Best digital pianos for home 2026. Casio PX-S1100 vs Roland FP-30X vs Yamaha CLP-835. Hammer feel, consoles and portables compared. Read the full verdict & prices before you buy.',
  description_es: 'Mejores pianos digitales para casa 2026. Casio PX-S1100 vs Roland FP-30X vs Yamaha CLP-835. Tacto de martillo, muebles y port\u00e1tiles comparados. Lee el veredicto completo y los precios antes de comprar.',
  featuredSnippet: Object.assign({}, old.featuredSnippet, {
    title_en: 'Best Digital Pianos for Home & Studio',
    title_es: 'Mejores pianos digitales para hogar y estudio',
    text_en: 'The Roland FP-30X is the best-feeling digital piano for home players, with PHA-4 escapement action and 256-note polyphony.',
    text_es: 'El Roland FP-30X es el piano digital con mejor tacto para tocar en casa, con acci\u00f3n PHA-4 con escape y 256 notas de polifon\u00eda.',
    faq_q1_en: 'Which digital piano is the best for home use?',
    faq_a1_en: 'The Roland FP-30X is the best all-round home digital piano: PHA-4 Standard action with escapement, 256-note polyphony, SuperNATURAL sound and Bluetooth audio/MIDI. If you want furniture, the Roland RP107 is the cheapest real console and the Yamaha YDP-166 the classic living-room choice.',
    faq_q1_es: '\u00bfQu\u00e9 piano digital es el mejor para casa?',
    faq_a1_es: 'El Roland FP-30X es el mejor piano digital para casa en conjunto: acci\u00f3n PHA-4 Standard con escape, 256 notas de polifon\u00eda, sonido SuperNATURAL y Bluetooth audio/MIDI. Si quieres mueble, el Roland RP107 es el mueble m\u00e1s barato de verdad y el Yamaha YDP-166 la opci\u00f3n cl\u00e1sica para el sal\u00f3n.',
    faq_q2_en: 'What makes a digital piano feel real instead of like a toy?',
    faq_a2_en: 'A graded hammer action: keys that are heavier in the bass and lighter in the treble, with escapement and multi-sensor detection. The FP-10 and FP-30X use Roland\u2019s PHA-4 Standard, the YDP-166 GrandTouch-E and the CLP-835 GrandTouch-S \u2014 all replicate the click and resistance of acoustic grand keys. Unweighted or semi-weighted keys cannot build proper finger technique.',
    faq_q2_es: '\u00bfQu\u00e9 hace que un piano digital se sienta real y no como un juguete?',
    faq_a2_es: 'Una acci\u00f3n de martillo graduada: teclas m\u00e1s pesadas en los graves y m\u00e1s ligeras en los agudos, con escape y detecci\u00f3n multi-sensor. El FP-10 y el FP-30X usan la PHA-4 Standard de Roland, el YDP-166 la GrandTouch-E y el CLP-835 la GrandTouch-S \u2014 todas reproducen el clic y la resistencia de las teclas de un piano ac\u00fastico. Con teclas sin contrpeso o semi pesadas no se desarrolla la t\u00e9cnica correcta.',
    faq_q3_en: 'Should you buy a portable digital piano or a console with furniture?',
    faq_a3_en: 'Buy portable (PX-S1100, FP-10, P-225, FP-30X) if you move the instrument, record at a desk or have limited space \u2014 you add a stand and pedals separately. Buy a console (RP107, KDP120, YDP-166, CLP-835) if the piano stays in one room: the fixed three-pedal unit, sliding cover and speaker-loaded cabinet look and sound better in a living room.',
    faq_q3_es: '\u00bfCompro un piano digital port\u00e1til o un modelo de mueble?',
    faq_a3_es: 'Elige port\u00e1til (PX-S1100, FP-10, P-225, FP-30X) si mueves el instrumento, grabas sobre el escritorio o tienes poco espacio \u2014 el soporte y los pedales van aparte. Elige mueble (RP107, KDP120, YDP-166, CLP-835) si el piano se queda en una habitaci\u00f3n: la unidad de tres pedales fija, la tapa y el mueble que hace de caja de altavoz se ven y suenan mejor en el sal\u00f3n.',
    faq_q4_en: 'How many keys does a digital piano need?',
    faq_a4_en: 'Full 88 weighted keys, always, if you are serious about piano. Every model here \u2014 from the Casio PX-S1100 and Roland FP-10 to the Yamaha CLP-835 \u2014 has 88 graded hammer keys that feel like a real piano. Smaller keybeds are fine for portability and synth work, but for learning or playing piano properly, 88 fully-weighted keys are non-negotiable.',
    faq_q4_es: '\u00bfCu\u00e1ntas teclas necesito en un piano digital?',
    faq_a4_es: '88 teclas contrapesadas, siempre, si hablas en serio del piano. Todos los modelos de esta gu\u00eda \u2014 desde el Casio PX-S1100 y el Roland FP-10 hasta el Yamaha CLP-835 \u2014 tienen 88 teclas de martillo graduado que se sienten como un piano real. Los teclados m\u00e1s peque\u00f1os sirven para portabilidad y sintetizadores, pero para aprender o tocar piano bien, 88 teclas contrapesadas no son negociables.',
    faq_q5_en: 'What is the difference between a digital piano and a stage piano?',
    faq_a5_en: 'A digital piano is built for home: weighted action, realistic piano sounds, built-in speakers and often a furniture cabinet. A stage piano is built for gigs: no cabinet, sturdier case, pro line outputs, and it layers organs, electric pianos and synths alongside pianos. The models in this guide are home instruments; if you regularly perform on keys, check our stage piano guides.',
    faq_q5_es: '\u00bfCu\u00e1l es la diferencia entre un piano digital y un piano de escenario?',
    faq_a5_es: 'Un piano digital est\u00e1 dise\u00f1ado para casa: acci\u00f3n contrapesada, sonidos de piano realistas, altavoces integrados y a menudo un mueble. Un piano de escenario est\u00e1 hecho para tocar en directo: sin mueble, con malet\u00edn reforzado, salidas de l\u00ednea profesionales, y adem\u00e1s combina \u00f3rganos, pianos el\u00e9ctricos y sintetizadores. Los modelos de esta gu\u00eda son instrumentos para casa; si act\u00faas habitualmente con teclados, consulta nuestras gu\u00edas de pianos de escenario.',
    faq_q6_en: 'Can a digital piano work for music production?',
    faq_a6_en: 'Yes \u2014 every model here has USB-MIDI, so it works as a controller for your DAW and virtual instruments. The P-225 and CLP-835 also stream audio over USB, and the CLP-835 doubles as a USB audio interface for direct recording. Bluetooth MIDI (FP-10, P-225, KDP120) cuts the cable to an iPad or laptop, while Bluetooth audio lets you play along with tracks through the piano\u2019s speakers.',
    faq_q6_es: '\u00bfPuedo usar un piano digital para producci\u00f3n musical?',
    faq_a6_es: 'S\u00ed \u2014 todos los modelos de aqu\u00ed llevan USB-MIDI, as\u00ed que funcionan como controladores de tu DAW y de los instrumentos virtuales. La P-225 y el CLP-835 adem\u00e1s env\u00eden audio por USB, y el CLP-835 sirve tambi\u00e9n como interfaz de audio USB para grabar directamente. El Bluetooth MIDI (FP-10, P-225, KDP120) elimina el cable hacia el iPad u ordenador, y el Bluetooth audio te deja tocar sobre tus pistas con los altavoces del propio piano.'
  }),
  relatedGuides: ['best-keyboard', 'midi-keyboards', 'best-synthesizers', 'midi-controllers'],
  aboutName: old.aboutName,
  author: old.author,
  productTable: {
    title: 'Best Digital Pianos Compared (2026)',
    title_es: 'Comparativa de los mejores pianos digitales (2026)',
    columns: [
      { title: 'Casio PX-S1100', title_es: 'Casio PX-S1100' },
      { title: 'Roland FP-10', title_es: 'Roland FP-10' },
      { title: 'Yamaha P-225', title_es: 'Yamaha P-225' },
      { title: 'Roland FP-30X', title_es: 'Roland FP-30X' },
      { title: 'Roland RP107', title_es: 'Roland RP107' },
      { title: 'Kawai KDP120', title_es: 'Kawai KDP120' },
      { title: 'Yamaha YDP-166', title_es: 'Yamaha YDP-166' },
      { title: 'Yamaha CLP-835', title_es: 'Yamaha CLP-835' }
    ],
    rows: [
      {
        label: 'Best For', label_es: 'Ideal para',
        values: [
          { value: 'Slim apartment piano with full hammer feel', value_es: 'Piano de apartamento fino con tacto de martillo completo' },
          { value: 'First serious piano on a budget', value_es: 'Primer piano serio con presupuesto ajustado' },
          { value: 'Compact home piano with CFX sound', value_es: 'Piano de hogar compacto con sonido CFX' },
          { value: 'Best-feel portable for serious practice', value_es: 'Port\u00e1til con mejor tacto para práctica seria' },
          { value: 'Cheapest console with three pedals', value_es: 'Mueble m\u00e1s barato con tres pedales' },
          { value: 'Loudest console with Kawai touch', value_es: 'Mueble m\u00e1s sonoro con tacto Kawai' },
          { value: 'Classic living-room console', value_es: 'Mueble cl\u00e1sico para el sal\u00f3n' },
          { value: 'Premium console closest to an acoustic grand', value_es: 'Mueble premium m\u00e1s cercano al piano ac\u00fastico' }
        ]
      },
      {
        label: 'Price', label_es: 'Precio',
        values: [
          { value: '$649', value_es: '$649' },
          { value: '$499', value_es: '$499' },
          { value: '$699', value_es: '$699' },
          { value: '$799', value_es: '$799' },
          { value: '$799', value_es: '$799' },
          { value: '$999', value_es: '$999' },
          { value: '$1,199', value_es: '$1,199' },
          { value: '$2,499', value_es: '$2,499' }
        ]
      },
      {
        label: 'Keyboard Action', label_es: 'Acci\u00f3n de teclado',
        values: [
          { value: 'Smart Scaled Hammer Action', value_es: 'Smart Scaled Hammer Action' },
          { value: 'PHA-4 Standard (escapement)', value_es: 'PHA-4 Standard (escape)' },
          { value: 'GHC (Graded Hammer Compact)', value_es: 'GHC (Graded Hammer Compact)' },
          { value: 'PHA-4 Standard (escapement)', value_es: 'PHA-4 Standard (escape)' },
          { value: 'PHA-4 Standard (escapement)', value_es: 'PHA-4 Standard (escape)' },
          { value: 'RHCII, triple sensor', value_es: 'RHCII, triple sensor' },
          { value: 'GrandTouch-E (escapement)', value_es: 'GrandTouch-E (escape)' },
          { value: 'GrandTouch-S (escapement)', value_es: 'GrandTouch-S (escape)' }
        ]
      },
      {
        label: 'Key Material', label_es: 'Material de teclas',
        values: [
          { value: 'Plastic, synthetic ebony/ivory', value_es: 'Pl\u00e1stico, marfil y \u00e9bano sint\u00e9ticos' },
          { value: 'Plastic, ivory feel', value_es: 'Pl\u00e1stico, tacto de marfil' },
          { value: 'Plastic, matte finish', value_es: 'Pl\u00e1stico, acabado mate' },
          { value: 'Plastic, ivory feel', value_es: 'Pl\u00e1stico, tacto de marfil' },
          { value: 'Plastic, ivory feel', value_es: 'Pl\u00e1stico, tacto de marfil' },
          { value: 'Plastic, matte finish', value_es: 'Pl\u00e1stico, acabado mate' },
          { value: 'Plastic, synthetic ebony/ivory', value_es: 'Pl\u00e1stico, marfil y \u00e9bano sint\u00e9ticos' },
          { value: 'Plastic, synthetic ebony/ivory', value_es: 'Pl\u00e1stico, marfil y \u00e9bano sint\u00e9ticos' }
        ]
      },
      {
        label: 'Polyphony', label_es: 'Polifon\u00eda',
        values: [
          { value: '192', value_es: '192' },
          { value: '96', value_es: '96' },
          { value: '192', value_es: '192' },
          { value: '256', value_es: '256' },
          { value: '256', value_es: '256' },
          { value: '192', value_es: '192' },
          { value: '192', value_es: '192' },
          { value: '256', value_es: '256' }
        ]
      },
      {
        label: 'Sound Engine', label_es: 'Motor de sonido',
        values: [
          { value: 'Multi-dimensional Morphing AiR', value_es: 'Multi-dimensional Morphing AiR' },
          { value: 'SuperNATURAL Piano', value_es: 'SuperNATURAL Piano' },
          { value: 'CFX + VRM Lite', value_es: 'CFX + VRM Lite' },
          { value: 'SuperNATURAL Piano', value_es: 'SuperNATURAL Piano' },
          { value: 'SuperNATURAL Piano', value_es: 'SuperNATURAL Piano' },
          { value: 'Harmonic Imaging (SK-EX)', value_es: 'Harmonic Imaging (SK-EX)' },
          { value: 'CFX + VRM Lite', value_es: 'CFX + VRM Lite' },
          { value: 'CFX + B\u00f6sendorfer, VRM, Grand Expression', value_es: 'CFX + B\u00f6sendorfer, VRM, Grand Expression' }
        ]
      },
      {
        label: 'Bluetooth', label_es: 'Bluetooth',
        values: [
          { value: 'Audio + MIDI (adapter incl.)', value_es: 'Audio + MIDI (adaptador incluido)' },
          { value: 'MIDI', value_es: 'MIDI' },
          { value: 'MIDI', value_es: 'MIDI' },
          { value: 'Audio + MIDI', value_es: 'Audio + MIDI' },
          { value: 'Audio + MIDI', value_es: 'Audio + MIDI' },
          { value: 'MIDI', value_es: 'MIDI' },
          { value: 'Audio + MIDI', value_es: 'Audio + MIDI' },
          { value: 'Audio + MIDI', value_es: 'Audio + MIDI' }
        ]
      },
      {
        label: 'Furniture Included', label_es: 'Mueble incluido',
        values: [
          { value: 'No (optional stand)', value_es: 'No (soporte opcional)' },
          { value: 'No (optional stand)', value_es: 'No (soporte opcional)' },
          { value: 'No (optional stand)', value_es: 'No (soporte opcional)' },
          { value: 'No (optional stand)', value_es: 'No (soporte opcional)' },
          { value: 'Yes (cabinet + 3 pedals)', value_es: 'S\u00ed (mueble + 3 pedales)' },
          { value: 'Yes (cabinet + 3 pedals)', value_es: 'S\u00ed (mueble + 3 pedales)' },
          { value: 'Yes (cabinet + 3 pedals)', value_es: 'S\u00ed (mueble + 3 pedales)' },
          { value: 'Yes (cabinet + 3 pedals)', value_es: 'S\u00ed (mueble + 3 pedales)' }
        ]
      },
      {
        label: 'Weight', label_es: 'Peso',
        values: [
          { value: '11.2 kg', value_es: '11,2 kg' },
          { value: '12.6 kg', value_es: '12,6 kg' },
          { value: '11.5 kg', value_es: '11,5 kg' },
          { value: '14.8 kg', value_es: '14,8 kg' },
          { value: '37 kg', value_es: '37 kg' },
          { value: '37 kg', value_es: '37 kg' },
          { value: '42 kg', value_es: '42 kg' },
          { value: '57 kg', value_es: '57 kg' }
        ]
      }
    ]
  },
  verdictProsCons: [
    {
      name: 'Roland FP-30X', name_es: 'Roland FP-30X',
      pros: [
        'PHA-4 Standard action with escapement and ivory feel at an entry price',
        '256-note polyphony — dense sustains never clip',
        'Bluetooth audio + MIDI and USB audio/MIDI for play-along and recording',
        '22W stereo speakers fill a room'
      ],
      cons: [
        'No display — settings live in the Roland app',
        'Plastic keytops despite the excellent action',
        '14.8 kg, the heaviest portable here',
        'Deeper editing is phone-only'
      ],
      pros_es: [
        'Acci\u00f3n PHA-4 Standard con escape y tacto de marfil a precio de entrada',
        '256 notas de polifon\u00eda — los acumuladores densos no se cortan',
        'Bluetooth audio + MIDI y USB audio/MIDI para tocar sobre pistas y grabar',
        'Altavoces est\u00e9reos de 22W que llenan una habitaci\u00f3n'
      ],
      cons_es: [
        'Sin pantalla — los ajustes viven en la app de Roland',
        'Tapas de pl\u00e1stico a pesar de la excelente acci\u00f3n',
        '14.8 kg, el port\u00e1til m\u00e1s pesado de esta selecci\u00f3n',
        'La edici\u00f3n m\u00e1s profunda solo desde el m\u00f3vil'
      ]
    },
    {
      name: 'Roland RP107', name_es: 'Roland RP107',
      pros: [
        'Real console cabinet with integrated three-pedal unit at the lowest price',
        'PHA-4 Standard action with escapement, same as the FP-30X',
        '256-note polyphony unusual at this price',
        'Bluetooth audio + MIDI and sliding key cover'
      ],
      cons: [
        'Speakers are only 8W+8W — polite for a large room',
        'Just 15 tones on the front panel',
        '37 kg cabinet needs two people to move',
        'No line outputs'
      ],
      pros_es: [
        'Mueble de verdad con unidad de tres pedales integrada al menor precio',
        'Acci\u00f3n PHA-4 Standard con escape, la misma que el FP-30X',
        '256 notas de polifon\u00eda, inusual a este precio',
        'Bluetooth audio + MIDI y tapa abatible'
      ],
      cons_es: [
        'Los altavoces son de solo 8W+8W — discretos en una sala grande',
        'Solo 15 tonos en el panel frontal',
        'Mueble de 37 kg: hacen falta dos personas para moverlo',
        'Sin salidas de l\u00ednea'
      ]
    },
    {
      name: 'Kawai KDP120', name_es: 'Kawai KDP120',
      pros: [
        'RHCII triple-sensor action with springless hammers',
        'Shigeru Kawai SK-EX sampled across all 88 keys',
        '40W (20W\u00d72) speaker system, the loudest console at this price',
        'Virtual Technician adjusts voicing, decay and damping via app'
      ],
      cons: [
        'Bluetooth is MIDI only — no audio streaming',
        'No display, app-dependent interface',
        '192-note polyphony versus 256 on the Roland consoles',
        '37 kg fixed cabinet, no line output'
      ],
      pros_es: [
        'Acci\u00f3n RHCII de triple sensor con martillos sin muelle',
        'Muestras del Shigeru Kawai SK-EX en las 88 teclas',
        'Sistema de altavoces de 40W (20W\u00d72), el mueble m\u00e1s sonoro a este precio',
        'Virtual Technician ajusta voicing, decaimiento y amortiguaci\u00f3n desde la app'
      ],
      cons_es: [
        'El Bluetooth es solo MIDI — sin transmisi\u00f3n de audio',
        'Sin pantalla, la interfaz depende de la app',
        '192 notas de polifon\u00eda frente a 256 de los muebles Roland',
        'Mueble fijo de 37 kg y sin salida de l\u00ednea'
      ]
    },
    {
      name: 'Yamaha YDP-166', name_es: 'Yamaha YDP-166',
      pros: [
        'GrandTouch-E action with escapement and synthetic ebony/ivory keytops',
        'Bluetooth audio + MIDI in a classic Arius cabinet',
        'CFX sample with VRM Lite and 192-note polyphony',
        'Sliding cover, three pedals and half-pedal support'
      ],
      cons: [
        'Only 10 voices',
        'No line output — recording goes through USB audio',
        '42 kg, heavier than the other mid-range consoles',
        '20W\u00d72 amplification unchanged from the previous model'
      ],
      pros_es: [
        'Acci\u00f3n GrandTouch-E con escape y tapas sint\u00e9ticas de marfil y \u00e9bano',
        'Bluetooth audio + MIDI en el mueble cl\u00e1sico de la gama Arius',
        'Muestra del CFX con VRM Lite y 192 notas de polifon\u00eda',
        'Tapa deslizante, tres pedales y soporte de pedal a mitad de recorrido'
      ],
      cons_es: [
        'Solo 10 voces',
        'Sin salida de l\u00ednea — grabar pasa por el audio USB',
        '42 kg, m\u00e1s pesado que los otros muebles de gama media',
        'Amplificaci\u00f3n de 20W\u00d72 sin cambios respecto al modelo anterior'
      ]
    },
    {
      name: 'Yamaha CLP-835', name_es: 'Yamaha CLP-835',
      pros: [
        'GrandTouch-S action with escapement and synthetic ebony/ivory keytops',
        'CFX + B\u00f6sendorfer samples with VRM and Grand Expression Modeling',
        '256-note polyphony, 38 voices, USB audio interface (44.1 kHz/24-bit)',
        '30W\u00d72 system plus headphone optimizations (IAC, Stereophonic Optimizer)'
      ],
      cons: [
        '57 kg — needs two people and a permanent spot',
        'Wooden white keys only start at the CLP-845, one model up',
        'Full-dot LCD and button panel instead of a touchscreen',
        'Premium price for a two-way speaker system'
      ],
      pros_es: [
        'Acci\u00f3n GrandTouch-S con escape y tapas sint\u00e9ticas de marfil y \u00e9bano',
        'Muestras del CFX y el B\u00f6sendorfer con VRM y Grand Expression Modeling',
        '256 notas de polifon\u00eda, 38 voces e interfaz de audio USB (44.1 kHz/24 bit)',
        'Sistema de 30W\u00d72 m\u00e1s optimizaciones para auriculares (IAC, Stereophonic Optimizer)'
      ],
      cons_es: [
        '57 kg — hacen falta dos personas y un sitio fijo',
        'Las teclas blancas de m\u00e1dera solo llegan en el CLP-845, un modelo m\u00e1s arriba',
        'Pantalla de puntos y panel de botones en vez de pantalla t\u00e1ctil',
        'Precio premium para un sistema de altavoces de dos v\u00edas'
      ]
    }
  ],
  datePublished: old.datePublished
};

guides[idx] = newGuide;
fs.writeFileSync('data/guides.json', JSON.stringify(guides, null, 2));
console.log('Guide rewritten. Sections:', newGuide.sections.length, '| Table cols:', newGuide.productTable.columns.length, '| Verdicts:', newGuide.verdictProsCons.length);
