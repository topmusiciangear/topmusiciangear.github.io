// Nueva guia VS: slg200s-vs-gs-mini (home office angle).
const fs = require('fs');
const G = JSON.parse(fs.readFileSync('data/guides.json', 'utf8'));
if (G.some(g => g.id === 'slg200s-vs-gs-mini')) throw new Error('ya existe');
const V = (label, label_es, val1, val1_es, val2, val2_es) =>
  ({ label, label_es, val1, val2, val1_es, val2_es });
const guide = {
  id: 'slg200s-vs-gs-mini',
  title: 'Yamaha SLG200S vs Taylor GS Mini: Best Quiet Guitar for Home Office?',
  title_es: 'Yamaha SLG200S vs Taylor GS Mini: ¿mejor guitarra silenciosa para home office?',
  titleTag: 'SLG200S vs GS Mini: Best Quiet Guitar for Home Office',
  titleTag_es: 'SLG200S vs GS Mini: mejor guitarra silenciosa home office',
  category: 'guitars',
  image: 'https://r2.gear4music.com/media/99/993440/1200/preview.jpg',
  badge: 'bestSeller',
  intro: 'You work from home and want a guitar within arm\u2019s reach — one that will not get you noise complaints on a call-filled day. Two instruments own this job: Yamaha\u2019s SLG200S, a silent guitar you play through headphones, and Taylor\u2019s GS Mini, a small acoustic with a real voice at low volume. I compared them for the home-office life: silence, tone, desk comfort, storage and price.',
  intro_es: 'Trabajas desde casa y quieres la guitarra al alcance de la mano — una que no te traiga quejas por ruido en un día lleno de llamadas. Dos instrumentos mandan en esto: la SLG200S de Yamaha, una guitarra silenciosa para tocar con auriculares, y la GS Mini de Taylor, una acústica pequeña con voz de verdad a bajo volumen. Las comparé para la vida de home office: silencio, sonido, comodidad en el escritorio, guardado y precio.',
  sections: [
    {
      heading: 'Is the Yamaha SLG200S the Best Silent Guitar for Home Practice?',
      heading_es: '¿Es la Yamaha SLG200S la mejor guitarra silenciosa para practicar en casa?',
      content: '<p><strong>The SLG200S is silence you can play.</strong> Unplugged it runs about 80% quieter than a normal acoustic — flatmates hear strings, not songs. The mahogany frame comes apart so the guitar stores behind a monitor or in a closet, and the full 25-inch scale keeps your technique honest. Plug in headphones and the SRT preamp (piezo plus Royer R-122 mic modeling) serves a big, produced acoustic with reverb and chorus, plus aux-in for play-alongs and a tuner onboard. It runs on 2 AA batteries.</p><p><strong>The catch: </strong>no headphones, no guitar — without them it is a whisper. And no modeling moves air like real wood, so it never quite feels like an acoustic in your hands.</p>',
      content_es: '<p><strong>La SLG200S es silencio que se puede tocar.</strong> Desenchufada suena un 80% menos que una acústica normal — tus compañeros oyen cuerdas, no canciones. El marco de caoba se desmonta y la guitarra se guarda detrás del monitor o en un armario, y la escala completa de 25 pulgadas mantiene tu técnica honesta. Con auriculares, el previo SRT (piezo más modelado de micro Royer R-122) entrega una acústica grande y producida con reverb y chorus, más entrada aux para tocar encima y afinador a bordo. Funciona con 2 pilas AA.</p><p><strong>El inconveniente: </strong>sin auriculares no hay guitarra — sin ellos es un susurro. Y ningún modelado mueve el aire como la madera de verdad, así que en las manos nunca es del todo una acústica.</p>',
      products: [272]
    },
    {
      heading: 'Is the Taylor GS Mini the Best Small Acoustic for the Desk?',
      heading_es: '¿Es la Taylor GS Mini la mejor acústica pequeña para el escritorio?',
      content: '<p><strong>The GS Mini is a real Taylor that fits the couch.</strong> Solid spruce top over layered sapele in a body three-quarters the size of a dreadnought, with a 23.5-inch scale that stays friendly on the fingers through long sitting sessions. No cables, no batteries, no headphones: pick it up between renders and play. It speaks at conversation volume — present in the room, gone behind a closed door.</p><p><strong>The catch: </strong>it is still an acoustic, so thin walls will hear it. The short scale crowds complex chords, and the base model carries no pickup for gigs or recording direct.</p>',
      content_es: '<p><strong>La GS Mini es una Taylor de verdad que cabe en el sofá.</strong> Tapa maciza de abeto sobre aros y fondo de sapeli en capas, en un cuerpo de tres cuartos de dreadnought, con escala de 23,5 pulgadas amable con los dedos en sesiones largas sentado. Sin cables, sin pilas, sin auriculares: la agarras entre render y render y tocas. Suena a volumen de conversación — presente en la sala, inaudible tras una puerta cerrada.</p><p><strong>El inconveniente: </strong>sigue siendo una acústica, así que con paredes finas se oye. La escala corta aprieta los acordes complejos, y el modelo base no lleva pastilla para bolos ni grabar en línea.</p>',
      products: [271]
    },
    {
      heading: 'Silence vs Tone: Which Wins for Remote Work?',
      heading_es: 'Silencio frente a sonido: ¿qué gana teletrabajando?',
      content: '<p><strong>Decide by your walls, not by the spec sheet.</strong> Thin walls, shared flat, calls all day? The SLG200S is the only one of the two you can play at midnight — headphones on, zero complaints, and it stores where a guitar has no business being. Your own place with decent walls? The GS Mini wins on pure joy: real wood, real dynamics, zero setup, and a voice that turns a 10-minute break into a holiday. On price, the Mini costs little more than half the Yamaha. For travel, both fly in cabins — the SLG splits down and shrugs off knocks, while the Mini wants its gig bag treated gently.</p>',
      content_es: '<p><strong>Decide por tus paredes, no por la ficha.</strong> ¿Paredes finas, piso compartido, llamadas todo el día? La SLG200S es la única de las dos que puedes tocar a medianoche — auriculares puestos, cero quejas, y se guarda donde una guitarra no cabe. ¿Piso propio con paredes decentes? La GS Mini gana en puro placer: madera real, dinámica real, cero preparación, y una voz que convierte 10 minutos libres en vacaciones. En precio, la Mini cuesta poco más de la mitad que la Yamaha. Para viajar, ambas vuelan en cabina — la SLG se desmonta y aguanta golpes, mientras la Mini pide mimo con su funda.</p>',
      products: [272, 271]
    },
    {
      heading: 'Verdict: Which Should You Buy?',
      heading_es: 'Veredicto: ¿cuál deberías comprar?',
      content: '<p><strong>Buy the SLG200S if silence is non-negotiable.</strong> Flatmates, babies, night shifts, paper walls — it removes volume from the equation entirely while keeping full-scale technique. <strong>Buy the GS Mini if you can afford a little sound.</strong> Nothing beats real wood for feel and inspiration, it costs far less, and it needs nothing but hands. If I could only keep one at my desk, I would take the Mini for joy and the SLG for survival — most remote workers should start with one question: who hears my walls?</p>',
      content_es: '<p><strong>Compra la SLG200S si el silencio no se negocia.</strong> Compañeros, bebés, turnos de noche, paredes de papel — elimina el volumen de la ecuación y mantiene técnica de escala completa. <strong>Compra la GS Mini si te puedes permitir algo de sonido.</strong> Nada supera la madera real en tacto e inspiración, cuesta mucho menos y no necesita nada más que manos. Si solo pudiera quedarme una en el escritorio, la Mini por placer y la SLG por supervivencia — casi todos los teletrabajadores deberían empezar por una pregunta: ¿quién oye mis paredes?</p>',
      products: [272, 271]
    }
  ],
  conclusion: 'Silent practice with full-scale technique and zero complaints, or real Taylor tone at conversation volume for little more than half the price — pick by your walls. The SLG200S erases volume with modeling and headphones; the GS Mini keeps it real with solid spruce and sapele. Either way you get a guitar that lives next to your desk instead of in a closet. <p><a href="/guides/best-guitar-home-office.html" class="guide-link-btn">Best Guitars for Home Office</a> <a href="/guides/acoustic-guitars-guide.html" class="guide-link-btn">Best Acoustic Guitars Guide</a> <a href="/guides/best-acoustic-guitars-for-beginners.html" class="guide-link-btn">Best Acoustic Guitars for Beginners</a></p>',
  conclusion_es: 'Práctica silenciosa con técnica de escala completa y cero quejas, o sonido Taylor real a volumen de conversación por poco más de la mitad — elige por tus paredes. La SLG200S borra el volumen con modelado y auriculares; la GS Mini lo mantiene real con abeto macizo y sapeli. Como sea, te llevas una guitarra que vive junto a tu escritorio en vez de en un armario. <p><a href="/guides/best-guitar-home-office_es.html" class="guide-link-btn">Mejores guitarras para home office</a> <a href="/guides/acoustic-guitars-guide_es.html" class="guide-link-btn">Guía de guitarras acústicas</a> <a href="/guides/best-acoustic-guitars-for-beginners_es.html" class="guide-link-btn">Mejores guitarras acústicas para principiantes</a></p>',
  verdict: 'SLG200S if silence is non-negotiable — full-scale technique with zero complaints. GS Mini if you can afford a little sound — real Taylor tone for little more than half the price.',
  verdict_es: 'SLG200S si el silencio no se negocia — técnica completa sin quejas. GS Mini si te puedes permitir algo de sonido — sonido Taylor real por poco más de la mitad.',
  featuredProducts: [272, 271],
  relatedGuides: ['best-guitar-home-office', 'acoustic-guitars-guide', 'best-acoustic-guitars-for-beginners'],
  description: 'SLG200S vs GS Mini for quiet home practice: silent modeling vs real Taylor tone. Specs, pros, cons and verdict for home office players.',
  description_es: 'SLG200S vs GS Mini para practicar sin ruido en casa: modelado silencioso frente a sonido Taylor real. Specs, pros, contras y veredicto.',
  featuredSnippet: {
    title_en: 'Yamaha SLG200S vs Taylor GS Mini: Best Quiet Guitar for Home Office?',
    text_en: 'The Yamaha SLG200S is the best silent guitar for shared spaces with modeling and headphones, while the Taylor GS Mini is the best small acoustic for real tone at conversation volume.',
    name1_en: 'Yamaha SLG200S', name2_en: 'Taylor GS Mini', price1: '$879.99', price2: '$499.00',
    type1: 'Silent steel-string', type2: 'Mini dreadnought acoustic',
    key1: 'Detachable frame, SRT modeling', key2: 'Solid spruce top, layered sapele',
    best1_en: 'silent practice in shared spaces', best2_en: 'real acoustic tone on the couch',
    brand1: 'Yamaha', brand2: 'Taylor', rating1: '4.6', rating2: '4.7',
    specs: '634mm scale with SRT modeling vs 597mm scale with solid spruce',
    title_es: 'Yamaha SLG200S vs Taylor GS Mini: ¿mejor guitarra silenciosa para home office?',
    text_es: 'La Yamaha SLG200S es la mejor guitarra silenciosa para espacios compartidos con modelado y auriculares, mientras la Taylor GS Mini es la mejor acústica pequeña con sonido real a volumen de conversación.',
    name1_es: 'Yamaha SLG200S', name2_es: 'Taylor GS Mini',
    best1_es: 'práctica silenciosa en espacios compartidos', best2_es: 'sonido acústico real en el sofá',
    key1_es: 'Marco desmontable, modelado SRT', key2_es: 'Tapa maciza de abeto, sapeli en capas',
    faq_q1_en: 'Can I practice silently with the SLG200S at night?',
    faq_a1_en: 'Yes. Unplugged it runs about 80% quieter than a normal acoustic, and with headphones you get full SRT sound with reverb and chorus. Roommates hear strings, not songs.',
    faq_q1_es: '¿Puedo practicar en silencio con la SLG200S de noche?',
    faq_a1_es: 'Sí. Desenchufada suena un 80% menos que una acústica normal, y con auriculares tienes sonido SRT completo con reverb y chorus. Tus compañeros oyen cuerdas, no canciones.',
    faq_q2_en: 'Is the Taylor GS Mini loud enough to bother neighbors?',
    faq_a2_en: 'It speaks at conversation volume — fine behind a closed door, too much for paper-thin walls at midnight. For true silence, the SLG200S wins.',
    faq_q2_es: '¿La Taylor GS Mini suena lo bastante para molestar vecinos?',
    faq_a2_es: 'Suena a volumen de conversación — bien tras una puerta cerrada, demasiado para paredes de papel a medianoche. Para silencio total, gana la SLG200S.',
    faq_q3_en: 'Which is better for small hands or long desk sessions?',
    faq_a3_en: 'The GS Mini\u2019s 23.5-inch scale is easier on the fingers; the SLG200S keeps a full 25-inch scale so technique transfers to a normal acoustic.',
    faq_q3_es: '¿Cuál es mejor para manos pequeñas o sesiones largas?',
    faq_a3_es: 'La escala de 23,5 pulgadas de la GS Mini es más amable con los dedos; la SLG200S mantiene 25 pulgadas para que la técnica se transfiera a una acústica normal.',
    faq_q4_en: 'Do I need an amp or extras with either guitar?',
    faq_a4_en: 'The SLG200S needs headphones (its earbuds are basic) and 2 AA batteries, and it can also feed an amp or PA. The base GS Mini needs nothing — add a pickup only if you gig or record direct.',
    faq_q4_es: '¿Necesito ampli o extras con alguna?',
    faq_a4_es: 'La SLG200S pide auriculares (los incluidos son básicos) y 2 pilas AA, y también puede ir a ampli o PA. La GS Mini base no necesita nada — añade pastilla solo si tocas en vivo o grabas en línea.',
    faq_q5_en: 'Which should a remote worker buy first?',
    faq_a5_en: 'If silence is non-negotiable, the SLG200S. If you can afford a little sound, the GS Mini gives real acoustic joy for little more than half the price.',
    faq_q5_es: '¿Cuál debería comprar primero un teletrabajador?',
    faq_a5_es: 'Si el silencio no se negocia, la SLG200S. Si te puedes permitir algo de sonido, la GS Mini da placer acústico real por poco más de la mitad.'
  },
  comparison: {
    rows: [
      V('Type', 'Tipo', 'Silent steel-string, detachable frame', 'Silent steel-string con marco desmontable', 'Mini dreadnought acoustic', 'Mini dreadnought acústica'),
      V('Scale Length', 'Tiro', '634 mm (25")', '634 mm (25")', '597 mm (23.5")', '597 mm (23,5")'),
      V('Nut Width', 'Ancho de cejuela', '43 mm (1-11/16")', '43 mm (1-11/16")', '42.9 mm (1-11/16")', '42,9 mm (1-11/16")'),
      V('Body', 'Cuerpo', 'Mahogany frame, no chamber', 'Marco de caoba, sin caja', 'Solid spruce top, layered sapele', 'Tapa maciza de abeto, sapeli en capas'),
      V('Electronics', 'Electrónica', 'SRT preamp, tuner, reverb/chorus, headphone + aux', 'Previo SRT, afinador, reverb/chorus, auriculares + aux', 'None (pure acoustic)', 'Ninguna (acústica pura)'),
      V('Quiet Practice', 'Práctica silenciosa', 'Whisper-quiet unplugged; full sound in headphones', 'Casi muda desenchufada; sonido pleno en auriculares', 'Quiet for its size, real acoustic voice', 'Silenciosa para su tamaño, voz acústica real'),
      V('Best For', 'Ideal para', 'Silent practice in shared spaces', 'Práctica silenciosa en espacios compartidos', 'Real acoustic tone on the couch', 'Sonido acústico real en el sofá')
    ]
  },
  verdictProsCons: [
    { name: 'Yamaha SLG200S', name_es: 'Yamaha SLG200S',
      pros: ['About 80% quieter unplugged — midnight practice approved', 'Detachable frame stores behind a monitor or in a closet', 'Full 25-inch scale keeps your technique honest', 'SRT modeling with FX sounds huge in headphones, aux-in included'],
      cons: ['Silent only with headphones — otherwise a whisper', 'Modeling never moves air like real wood', 'Needs 2 AA batteries to sound its best', 'Frame feel suits electric converts more than acoustic purists'],
      pros_es: ['Un 80% más silenciosa desenchufada — práctica nocturna aprobada', 'El marco desmontable se guarda tras el monitor o en un armario', 'La escala completa de 25 pulgadas mantiene tu técnica honesta', 'El modelado SRT con efectos suena enorme en auriculares, con aux incluido'],
      cons_es: ['Silenciosa solo con auriculares — sin ellos es un susurro', 'El modelado nunca mueve el aire como la madera real', 'Necesita 2 pilas AA para sonar al máximo', 'El tacto de marco va más con conversos de eléctrica que con puristas'] },
    { name: 'Taylor GS Mini', name_es: 'Taylor GS Mini',
      pros: ['Real solid-spruce Taylor voice with no batteries', '23.5-inch scale stays comfy through desk-chair sessions', 'Zero setup — no cables, headphones or apps', 'Holds value well and ships with a gig bag'],
      cons: ['Audible through thin walls', 'Short scale crowds complex chord shapes', 'No pickup on the base model for gigs or direct recording', 'Small body gives less bass than a full dreadnought'],
      pros_es: ['Voz Taylor real con tapa maciza, sin pilas', 'La escala de 23,5 pulgadas aguanta sesiones en silla de escritorio', 'Cero preparación — sin cables, auriculares ni apps', 'Mantiene bien el valor e incluye funda'],
      cons_es: ['Se oye a través de paredes finas', 'La escala corta aprieta acordes complejos', 'Sin pastilla en el modelo base para bolos o grabación directa', 'El cuerpo pequeño da menos graves que un dreadnought'] }
  ],
  description_es: 'SLG200S vs GS Mini para practicar sin ruido en casa: modelado silencioso frente a sonido Taylor real. Specs, pros, contras y veredicto.',
  author: { '@type': 'Person', name: 'Daniel Carnago', givenName: 'Daniel', familyName: 'Carnago', alternateName: 'Cuban3Beats', jobTitle: 'Professional Musician & Audio Engineer', description: 'Touring musician with 20+ years of experience performing on world stages including Glastonbury, Broadway, and Abbey Road.', url: 'https://topmusiciangear.com/about.html', sameAs: ['https://www.youtube.com/@Cuban3Beats', 'https://open.spotify.com/artist/3HMtcts1AYCzkI4pBQKRzX', 'https://www.tiktok.com/@cuban3beats', 'https://www.facebook.com/Cuban3Beats/', 'https://www.instagram.com/cuban3beats', 'https://x.com/Cuban3Beats'], knowsAbout: ['Audio Engineering', 'Music Production', 'Live Sound', 'Studio Recording', 'Music Gear'] },
  aboutName: 'Guitars',
  verdictSideBySide: true,
  datePublished: '2026-10-01'
};
G.push(guide);
fs.writeFileSync('data/guides.json', JSON.stringify(G, null, 2));
console.log('guia creada. total: ' + JSON.parse(fs.readFileSync('data/guides.json', 'utf8')).length);
