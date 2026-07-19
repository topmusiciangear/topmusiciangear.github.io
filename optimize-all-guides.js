const fs = require('fs');
const guides = require('./data/guides.json');

// ─── Product name lookup ───
const products = require('./data/products.json');
const prodName = {};
products.forEach(function(p) { prodName[p.id] = p.title; });
const prodCat = {};
products.forEach(function(p) { prodCat[p.id] = p.category || ''; });

function getProdName(ids) {
  if (!ids || !ids.length) return null;
  return prodName[ids[0]] || null;
}

// ─── Helpers ───
function leadEn(prod, purpose) {
  return `Buy the ${prod} if ${purpose}. `;
}
function leadEs(prod, purpose) {
  return `Compra ${fixGender(prod)} si ${purpose}. `;
}
function qEn(prod, cat, ctx) {
  return `Is the ${prod} the Best ${cat} ${ctx}?`;
}
function qEs(prod, cat, ctx) {
  return `¿Es ${fixGender(prod)} la Mejor ${cat} ${ctx}?`;
}
function fixGender(name) {
  // feminine products that need "la"
  const fem = ['Interfaz', 'Guitarra', 'Acústica', 'Eléctrica', 'Económica', 'Mesa', 'Consola', 'MOTU', 'Audient', 'Scarlett', 'Pacifica'];
  for (const f of fem) if (name.includes(f)) return `la ${name}`;
  // starts with El/La already
  if (/^(El|La)\s/.test(name)) return name;
  return `el ${name}`;
}

// ─── Category contexts for questions ───
const ctx = {
  interfaces: { en: 'for Your Home Studio', es: 'para Tu Home Studio' },
  headphones: { en: 'for Studio Monitoring and Mixing', es: 'para Monitoreo y Mezcla de Estudio' },
  microphones: { en: 'for Recording', es: 'para Grabación' },
  monitors: { en: 'for Accurate Mixing', es: 'para Mezcla Precisa' },
  plugins: { en: 'for Music Production', es: 'para Producción Musical' },
  guitars: { en: 'for Your Playing Style', es: 'para Tu Estilo de Toque' },
  amps: { en: 'for Guitar and Bass', es: 'para Guitarra y Bajo' },
  accessories: { en: 'for Your Studio Setup', es: 'para Tu Equipo de Estudio' },
  pedals: { en: 'for Your Pedalboard', es: 'para Tu Pedalera' },
  production: { en: 'for Beat-Making and Production', es: 'para Creación de Beats y Producción' },
  live_sound: { en: 'for Live Sound', es: 'para Sonido en Vivo' },
  daw: { en: 'for Music Production', es: 'para Producción Musical' },
  keyboards: { en: 'for Music Production', es: 'para Producción Musical' },
  'drum-machine': { en: 'for Beat-Making', es: 'para Creación de Beats' },
};

// ─── Category-specific verbs for lead sentences ───
const leads = {
  interfaces: { en: 'you need a reliable audio interface', es: 'necesitas una interfaz de audio confiable' },
  headphones: { en: 'you need professional studio headphones', es: 'necesitas auriculares de estudio profesionales' },
  microphones: { en: 'you need a professional microphone', es: 'necesitas un micrófono profesional' },
  monitors: { en: 'you need accurate studio monitors', es: 'necesitas monitores de estudio precisos' },
  plugins: { en: 'you need professional audio plugins', es: 'necesitas plugins de audio profesionales' },
  guitars: { en: 'you need a quality guitar', es: 'necesitas una guitarra de calidad' },
  amps: { en: 'you need a quality amplifier', es: 'necesitas un amplificador de calidad' },
  accessories: { en: 'you need quality studio accessories', es: 'necesitas accesorios de estudio de calidad' },
  pedals: { en: 'you need quality guitar effects', es: 'necesitas efectos de guitarra de calidad' },
  production: { en: 'you need professional production gear', es: 'necesitas equipo de producción profesional' },
  live_sound: { en: 'you need reliable live sound equipment', es: 'necesitas equipo de sonido en vivo confiable' },
  daw: { en: 'you need a powerful DAW', es: 'necesitas un DAW potente' },
  keyboards: { en: 'you need a quality keyboard controller', es: 'necesitas un controlador de teclado de calidad' },
  'drum-machine': { en: 'you need a powerful drum machine', es: 'necesitas una máquina de ritmos potente' },
};

// ─── Manual overrides for specific guides ───
const manualHeadings = {
  // starter-studio
  'starter-studio_1': {
    en: 'Is the Focusrite Scarlett 2i2 the Best Audio Interface to Start Your Home Studio?',
    es: '¿Es la Focusrite Scarlett 2i2 la Mejor Interfaz de Audio para Empezar Tu Home Studio?',
    purposeEn: 'you are building your first home studio and need a reliable interface',
    purposeEs: 'estás construyendo tu primer home studio y necesitas una interfaz confiable'
  },
  'starter-studio_2': {
    en: 'Is the Shure SM57 the Best Microphone for Recording Your First Tracks?',
    es: '¿Es el Shure SM57 el Mejor Micrófono para Grabar Tus Primeras Pistas?',
    purposeEn: 'you need one versatile microphone that handles vocals and instruments',
    purposeEs: 'necesitas un micrófono versátil que maneje voces e instrumentos'
  },
  'starter-studio_3': {
    en: 'Is the Audio-Technica ATH-M50x the Best Headphones for Mixing on a Budget?',
    es: '¿Son los Audio-Technica ATH-M50x los Mejores Auriculares para Mezclar con Presupuesto Ajustado?',
    purposeEn: 'you need closed-back headphones for mixing and tracking',
    purposeEs: 'necesitas auriculares cerrados para mezclar y grabar'
  },
  'starter-studio_4': {
    en: 'Is the KRK Rokit 7 G5 the Best Studio Monitor for Beginners?',
    es: '¿Es el KRK Rokit 7 G5 el Mejor Monitor de Estudio para Principiantes?',
    purposeEn: 'you want your first pair of real studio monitors',
    purposeEs: 'quieres tu primer par de monitores de estudio reales'
  },
  'starter-studio_5': {
    en: 'Which Studio Accessories Do You Actually Need to Start Recording?',
    es: '¿Qué Accesorios de Estudio Necesitas Realmente para Empezar a Grabar?',
    purposeEn: null,
    purposeEs: null
  },
  // best-electric-guitar
  'best-electric-guitar_0': {
    en: 'Is the Fender American Professional II Stratocaster the Best All-Rounder Guitar?',
    es: '¿Es la Fender American Professional II Stratocaster la Mejor Guitarra Todo Terreno?',
    purposeEn: 'you want the most versatile professional guitar on the market',
    purposeEs: 'quieres la guitarra profesional más versátil del mercado'
  },
  'best-electric-guitar_1': {
    en: 'Is the Gibson Les Paul Standard 60s the Best Guitar for Rock and Heavy Tones?',
    es: '¿Es la Gibson Les Paul Standard 60s la Mejor Guitarra para Rock y Tonos Pesados?',
    purposeEn: 'you want the iconic rock sound with singing sustain',
    purposeEs: 'quieres el sonido icónico del rock con sustain cantarino'
  },
  'best-electric-guitar_2': {
    en: 'Is the Ibanez RG550 Genesis the Best Value Guitar for Shredders?',
    es: '¿Es la Ibanez RG550 Genesis la Mejor Guitarra en Relación Calidad-Precio para Shredders?',
    purposeEn: 'you play metal or shred and want incredible value',
    purposeEs: 'tocas metal o shred y quieres un valor increíble'
  },
  'best-electric-guitar_3': {
    en: 'Is the PRS McCarty 594 the Best Premium Guitar for Versatile Players?',
    es: '¿Es la PRS McCarty 594 la Mejor Guitarra Premium para Músicos Versátiles?',
    purposeEn: 'you want a premium instrument that does everything well',
    purposeEs: 'quieres un instrumento premium que lo haga todo bien'
  },
  'best-electric-guitar_4': {
    en: 'Is the Taylor 314ce the Best Acoustic-Electric Guitar for Stage and Studio?',
    es: '¿Es la Taylor 314ce la Mejor Guitarra Acústica-Eléctrica para Escenario y Estudio?',
    purposeEn: 'you need an acoustic-electric that sounds great plugged in',
    purposeEs: 'necesitas una acústica-eléctrica que suene genial conectada'
  },
  // best-keyboard
  'best-keyboard_0': {
    en: 'Is the Nord Stage 4 88 the Best Stage Piano for Professional Keyboardists?',
    es: '¿Es el Nord Stage 4 88 el Mejor Piano de Escenario para Tecladistas Profesionales?',
    purposeEn: 'you are a professional keyboardist who needs the best stage piano',
    purposeEs: 'eres un tecladista profesional que necesita el mejor piano de escenario'
  },
  'best-keyboard_1': {
    en: 'Is the Yamaha Montage M8x the Best Workstation for Music Production?',
    es: '¿Es el Yamaha Montage M8x la Mejor Estación de Trabajo para Producción Musical?',
    purposeEn: 'you need a workstation that combines synthesis and production',
    purposeEs: 'necesitas una estación de trabajo que combine síntesis y producción'
  },
  'best-keyboard_2': {
    en: 'Is the Arturia KeyLab Essential 61 MkIII the Best MIDI Controller for Producers?',
    es: '¿Es el Arturia KeyLab Essential 61 MkIII el Mejor Controlador MIDI para Productores?',
    purposeEn: 'you need a DAW controller with great software integration',
    purposeEs: 'necesitas un controlador DAW con gran integración de software'
  },
  'best-keyboard_3': {
    en: 'Is the Komplete Kontrol S61 the Best Keyboard for Native Instruments Users?',
    es: '¿Es el Komplete Kontrol S61 el Mejor Teclado para Usuarios de Native Instruments?',
    purposeEn: 'you use Komplete and want seamless integration',
    purposeEs: 'usas Komplete y quieres integración perfecta'
  },
  // best-drum-machine
  'best-drum-machine_0': {
    en: 'Is the Roland TR-8S the Best Drum Machine for Live Performance and Production?',
    es: '¿Es el Roland TR-8S la Mejor Máquina de Ritmos para Performance en Vivo y Producción?',
    purposeEn: 'you need versatile drum sounds for live performance and studio',
    purposeEs: 'necesitas sonidos de batería versátiles para directo y estudio'
  },
  'best-drum-machine_1': {
    en: 'Is the Akai MPC One+ the Best Drum Machine for Beat-Making and Sampling?',
    es: '¿Es el Akai MPC One+ la Mejor Máquina de Ritmos para Creación de Beats y Sampling?',
    purposeEn: 'you want a standalone production center for making beats',
    purposeEs: 'quieres un centro de producción autónomo para hacer beats'
  },
  // fender-guide (manual per user request)
  'fender-guide_0': {
    en: 'How to Choose the Best Fender Guitar for Your Musical Style?',
    es: '¿Cómo Elegir la Mejor Guitarra Fender para Tu Estilo Musical?',
    purposeEn: null,
    purposeEs: null
  },
  'fender-guide_1': {
    en: 'Is the Fender Stratocaster the Best Guitar for Latin Music and Salsa?',
    es: '¿Es la Fender Stratocaster la Mejor Guitarra para Música Latina y Salsa?',
    purposeEn: 'you play salsa, timba, or Latin music and need that cutting percussive attack',
    purposeEs: 'tocas salsa, timba o música latina y necesitas ese ataque percusivo'
  },
  'fender-guide_2': {
    en: 'Is the Fender Telecaster the Best Guitar for Rock, Blues and Country?',
    es: '¿Es la Fender Telecaster la Mejor Guitarra para Rock, Blues y Country?',
    purposeEn: 'you play rock, blues or country and need the most recorded electric guitar',
    purposeEs: 'tocas rock, blues o country y necesitas la guitarra eléctrica más grabada de la historia'
  },
  'fender-guide_3': {
    en: 'Is the Fender Jazzmaster the Best Guitar for Jazz and Indie Rock?',
    es: '¿Es la Fender Jazzmaster la Mejor Guitarra para Jazz y Rock Indie?',
    purposeEn: 'you play jazz, surf or indie rock and want the unique offset body sound',
    purposeEs: 'tocas jazz, surf o indie rock y quieres el sonido único del cuerpo offset'
  },
  'fender-guide_4': {
    en: 'Are Fender Precision and Jazz Bass the Best for Your Genre?',
    es: '¿Son los Bajos Fender Precision y Jazz Bass los Mejores para Tu Género?',
    purposeEn: 'you need the bass that defined the sound of your genre',
    purposeEs: 'necesitas el bajo que definió el sonido de tu género'
  },
  'fender-guide_5': {
    en: 'Are Fender Acoustic Guitars a Good Choice for Beginners and Songwriters?',
    es: '¿Son las Guitarras Acústicas Fender una Buena Opción para Principiantes y Compositores?',
    purposeEn: 'you want an affordable acoustic guitar that plays well and sounds great',
    purposeEs: 'quieres una guitarra acústica asequible que toque bien y suene genial'
  },
  // daw-guide
  'daw-guide_0': {
    en: 'How to Choose the Best DAW for Music Production in 2026?',
    es: '¿Cómo Elegir el Mejor DAW para Producción Musical en 2026?',
    purposeEn: null,
    purposeEs: null
  },
  'daw-guide_1': {
    en: 'Is Ableton Live 12 Suite the Best DAW for Electronic Music and Live Performance?',
    es: '¿Es Ableton Live 12 Suite el Mejor DAW para Música Electrónica y Performance en Vivo?',
    purposeEn: 'you produce electronic music or perform live',
    purposeEs: 'produces música electrónica o tocas en vivo'
  },
  'daw-guide_2': {
    en: 'Is FL Studio Producer Edition the Best DAW for Beat-Making?',
    es: '¿Es FL Studio Producer Edition el Mejor DAW para Creación de Beats?',
    purposeEn: 'you make beats and want lifetime free updates',
    purposeEs: 'haces beats y quieres actualizaciones gratuitas de por vida'
  },
  'daw-guide_3': {
    en: 'Is Avid Pro Tools Studio the Best DAW for Professional Recording?',
    es: '¿Es Avid Pro Tools Studio el Mejor DAW para Grabación Profesional?',
    purposeEn: 'you work in professional recording studios',
    purposeEs: 'trabajas en estudios de grabación profesionales'
  },
  'daw-guide_4': {
    en: 'Is Steinberg Cubase Pro 15 the Best All-Rounder DAW for Composers?',
    es: '¿Es Steinberg Cubase Pro 15 el Mejor DAW Todo-Terreno para Compositores?',
    purposeEn: 'you are a composer who needs powerful MIDI and scoring',
    purposeEs: 'eres compositor y necesitas MIDI y notación potentes'
  },
  'daw-guide_5': {
    en: 'Is Reason 14 the Best DAW for Creative Music Production?',
    es: '¿Es Reason 14 el Mejor DAW para Producción Musical Creativa?',
    purposeEn: 'you want a creative DAW with a unique rack-based workflow',
    purposeEs: 'quieres un DAW creativo con un flujo de trabajo único basado en rack'
  },
  // beginner-guitar
  'beginner-guitar_0': {
    en: 'How to Choose Your First Guitar Without Overthinking It?',
    es: '¿Cómo Elegir Tu Primera Guitarra Sin Complicarte?',
    purposeEn: null,
    purposeEs: null
  },
  'beginner-guitar_1': {
    en: 'Is the Yamaha FG800 the Best Budget Acoustic Guitar for Beginners?',
    es: '¿Es la Yamaha FG800 la Mejor Guitarra Acústica Económica para Principiantes?',
    purposeEn: 'you want the best affordable acoustic guitar to start learning',
    purposeEs: 'quieres la mejor guitarra acústica asequible para empezar a aprender'
  },
  'beginner-guitar_2': {
    en: 'Is the Yamaha Pacifica 112V the Best Budget Electric Guitar for Beginners?',
    es: '¿Es la Yamaha Pacifica 112V la Mejor Guitarra Eléctrica Económica para Principiantes?',
    purposeEn: 'you want the best value electric guitar to start playing',
    purposeEs: 'quieres la mejor guitarra eléctrica en relación calidad-precio para empezar'
  },
  'beginner-guitar_3': {
    en: 'Is the Fender CD-60S the Best Value Acoustic Guitar for Songwriters?',
    es: '¿Es la Fender CD-60S la Mejor Guitarra Acústica en Relación Calidad-Precio para Compositores?',
    purposeEn: 'you are a songwriter who needs a reliable acoustic on a budget',
    purposeEs: 'eres compositor y necesitas una acústica confiable con presupuesto ajustado'
  },
  'beginner-guitar_4': {
    en: 'Is the Fender Player Stratocaster the Best Guitar for Songwriters?',
    es: '¿Es la Fender Player Stratocaster la Mejor Guitarra para Compositores?',
    purposeEn: 'you want a versatile electric guitar that covers many genres',
    purposeEs: 'quieres una guitarra eléctrica versátil que cubra muchos géneros'
  },
  'beginner-guitar_5': {
    en: 'Is the Fender Player Telecaster a Good Alternative for New Players?',
    es: '¿Es la Fender Player Telecaster una Buena Alternativa para Nuevos Músicos?',
    purposeEn: 'you want the simplicity and twang of a Telecaster as your first guitar',
    purposeEs: 'quieres la simplicidad y el twang de una Telecaster como tu primera guitarra'
  },
  // beat-making
  'beat-making_0': {
    en: 'How to Build Your Beat-Making Workflow: Essential Gear Guide?',
    es: '¿Cómo Construir Tu Flujo de Producción de Beats: Guía de Equipo Esencial?',
    purposeEn: null,
    purposeEs: null
  },
  'beat-making_1': {
    en: 'Is the Akai MPC One+ the Best Brain for Your Beat Studio?',
    es: '¿Es el Akai MPC One+ el Mejor Cerebro para Tu Estudio de Beats?',
    purposeEn: 'you want a standalone beat-making powerhouse',
    purposeEs: 'quieres una potencia de creación de beats autónoma'
  },
  'beat-making_2': {
    en: 'Is the Roland TR-8S the Best Groovebox for Drum Sounds?',
    es: '¿Es el Roland TR-8S la Mejor Groovebox para Sonidos de Batería?',
    purposeEn: 'you need versatile drum sounds and pattern sequencing',
    purposeEs: 'necesitas sonidos de batería versátiles y secuenciación de patrones'
  },
  'beat-making_3': {
    en: 'Is the Arturia KeyLab Essential 61 MkIII the Best Controller Keyboard for Producers?',
    es: '¿Es el Arturia KeyLab Essential 61 MkIII el Mejor Teclado Controlador para Productores?',
    purposeEn: 'you need a keyboard controller with deep DAW integration',
    purposeEs: 'necesitas un teclado controlador con integración profunda de DAW'
  },
  'beat-making_4': {
    en: 'Which Interface and Headphones Are Best for Finishing Your Tracks?',
    es: '¿Qué Interfaz y Auriculares Son los Mejores para Terminar Tus Tracks?',
    purposeEn: 'you need to hear your mixes accurately',
    purposeEs: 'necesitas escuchar tus mezclas con precisión'
  },
  'beat-making_5': {
    en: 'Is the Shure SM7B the Best Microphone for Recording Vocals on Beats?',
    es: '¿Es el Shure SM7B el Mejor Micrófono para Grabar Voces en Beats?',
    purposeEn: 'you record vocals in an untreated room',
    purposeEs: 'grabas voces en una sala sin tratar'
  },
  'beat-making_6': {
    en: 'Is Ableton Live 12 Suite the Best DAW for Beat-Making?',
    es: '¿Es Ableton Live 12 Suite el Mejor DAW para Creación de Beats?',
    purposeEn: 'you want the industry standard for electronic production',
    purposeEs: 'quieres el estándar de la industria para producción electrónica'
  },
  // guitar-bass-amps
  'guitar-bass-amps_0': {
    en: 'How to Choose the Best Guitar or Bass Amp for Your Tone?',
    es: '¿Cómo Elegir el Mejor Amplificador de Guitarra o Bajo para Tu Tono?',
    purposeEn: null,
    purposeEs: null
  },
  'guitar-bass-amps_1': {
    en: 'Is the Fender Blues Junior IV the Best All-Around Guitar Combo Amp?',
    es: '¿Es el Fender Blues Junior IV el Mejor Amplificador Combo de Guitarra Versátil?',
    purposeEn: 'you want an affordable tube amp with classic American tone',
    purposeEs: 'quieres un amplificador de tubo asequible con sonido americano clásico'
  },
  'guitar-bass-amps_2': {
    en: 'Is the Boss Katana 50 MkII the Best Budget Modeling Amp for Players?',
    es: '¿Es el Boss Katana 50 MkII el Mejor Amplificador de Modelado Económico para Músicos?',
    purposeEn: 'you need one versatile amp that does everything on a budget',
    purposeEs: 'necesitas un amplificador versátil que lo haga todo con presupuesto ajustado'
  },
  'guitar-bass-amps_3': {
    en: 'Is the Vox AC30 Still the Best for That Legendary British Sound?',
    es: '¿Sigue el Vox AC30 Siendo el Mejor para Ese Sonido Británico Legendario?',
    purposeEn: 'you need that chiming British sound that defined the British Invasion',
    purposeEs: 'necesitas ese sonido británico brillante que definió la Invasión Británica'
  },
  'guitar-bass-amps_4': {
    en: 'Is the Marshall DSL40CR the Best Amp for Classic Rock Power?',
    es: '¿Es el Marshall DSL40CR el Mejor Amplificador para Potencia de Rock Clásico?',
    purposeEn: 'you want authentic all-tube Marshall tone',
    purposeEs: 'quieres auténtico tono Marshall de tubo'
  },
  'guitar-bass-amps_5': {
    en: 'Is the Ampeg PF-500 Portaflex the Best Bass Amp for Legendary Tone?',
    es: '¿Es el Ampeg PF-500 Portaflex el Mejor Amplificador de Bajo para Tono Legendario?',
    purposeEn: 'you need that classic Ampeg bass sound in a portable package',
    purposeEs: 'necesitas ese sonido clásico Ampeg de bajo en un paquete portátil'
  },
  'guitar-bass-amps_6': {
    en: 'Is the Fender Rumble 500 V3 the Best Modern Bass Amp Standard?',
    es: '¿Es el Fender Rumble 500 V3 el Mejor Amplificador de Bajo Moderno?',
    purposeEn: 'you want a lightweight, powerful bass amp for any gig',
    purposeEs: 'quieres un amplificador de bajo ligero y potente para cualquier concierto'
  },
  // live-sound-pa
  'live-sound-pa_0': {
    en: 'How to Choose the Best Live Sound and PA System for Your Needs?',
    es: '¿Cómo Elegir el Mejor Sistema de Sonido en Vivo y PA para Tus Necesidades?',
    purposeEn: null,
    purposeEs: null
  },
  'live-sound-pa_1': {
    en: 'Is the EV ZLX-12P the Best Budget PA Speaker for Small Gigs?',
    es: '¿Es el EV ZLX-12P el Mejor Altavoz PA Económico para Conciertos Pequeños?',
    purposeEn: 'you need an affordable powered speaker that sounds great',
    purposeEs: 'necesitas un altavoz autoamplificado asequible que suene genial'
  },
  'live-sound-pa_2': {
    en: 'Is the QSC K12.2 the Best Pro Standard Powered Speaker?',
    es: '¿Es el QSC K12.2 el Mejor Altavoz Autoamplificado Estándar Profesional?',
    purposeEn: 'you need the industry standard for professional live sound',
    purposeEs: 'necesitas el estándar de la industria para sonido en vivo profesional'
  },
  'live-sound-pa_3': {
    en: 'Is the JBL PRX ONE the Best All-in-One PA System for Solo Performers?',
    es: '¿Es el JBL PRX ONE el Mejor Sistema PA Todo-en-Uno para Artistas Solistas?',
    purposeEn: 'you are a solo performer who wants a complete PA in one box',
    purposeEs: 'eres un artista solista que quiere un PA completo en una caja'
  },
  'live-sound-pa_4': {
    en: 'Is the Yamaha DXR12mkII the Best Premium Mid-Range PA Speaker?',
    es: '¿Es el Yamaha DXR12mkII el Mejor Altavoz PA Premium de Gama Media?',
    purposeEn: 'you need professional-grade sound that scales with your system',
    purposeEs: 'necesitas sonido de grado profesional que escale con tu sistema'
  },
  'live-sound-pa_5': {
    en: 'Is the Shure SM58 Still the Best Essential Vocal Mic for Live Sound?',
    es: '¿Sigue el Shure SM58 Siendo el Mejor Micrófono Vocal Esencial para Sonido en Vivo?',
    purposeEn: 'you need the most reliable live vocal microphone ever made',
    purposeEs: 'necesitas el micrófono vocal en vivo más confiable jamás fabricado'
  },
  // guitar-pedals
  'guitar-pedals_0': {
    en: 'How to Choose the Best Guitar Effects Pedals for Your Rig?',
    es: '¿Cómo Elegir los Mejores Pedales de Efectos de Guitarra para Tu Equipo?',
    purposeEn: null,
    purposeEs: null
  },
  'guitar-pedals_1': {
    en: 'Is the Ibanez TS9 Tube Screamer the Best Overdrive Pedal Ever Made?',
    es: '¿Es el Ibanez TS9 Tube Screamer el Mejor Pedal de Overdrive Jamás Fabricado?',
    purposeEn: 'you need the essential overdrive that defined rock and blues',
    purposeEs: 'necesitas el overdrive esencial que definió el rock y el blues'
  },
  'guitar-pedals_2': {
    en: 'Is the Boss DD-8 the Best Delay and Looping Pedal for Any Guitarist?',
    es: '¿Es el Boss DD-8 el Mejor Pedal de Delay y Loop para Cualquier Guitarrista?',
    purposeEn: 'you need a versatile delay pedal with looper functionality',
    purposeEs: 'necesitas un pedal de delay versátil con función de looper'
  },
  'guitar-pedals_3': {
    en: 'Is the Boss TU-3 the Best Tuner Pedal for Staying in Tune on Stage?',
    es: '¿Es el Boss TU-3 el Mejor Pedal de Afinador para Mantener la Afinación en el Escenario?',
    purposeEn: 'you need a reliable tuner that works in any lighting condition',
    purposeEs: 'necesitas un afinador confiable que funcione en cualquier condición de iluminación'
  },
  'guitar-pedals_4': {
    en: 'Is the Dunlop Crybaby GCB95 the Best Wah Pedal for Iconic Tone?',
    es: '¿Es el Dunlop Crybaby GCB95 el Mejor Pedal Wah para un Tono Icónico?',
    purposeEn: 'you want the wah sound that defined generations of guitar music',
    purposeEs: 'quieres el sonido wah que definió generaciones de música de guitarra'
  },
  'guitar-pedals_5': {
    en: 'Is the TC Electronic Hall of Fame 2 the Best Reverb Pedal for Any Space?',
    es: '¿Es el TC Electronic Hall of Fame 2 el Mejor Pedal de Reverb para Cualquier Espacio?',
    purposeEn: 'you need a versatile reverb pedal with multiple algorithms',
    purposeEs: 'necesitas un pedal de reverb versátil con múltiples algoritmos'
  },
  'guitar-pedals_6': {
    en: 'Is the EHX Small Stone the Best Classic Modulation Pedal?',
    es: '¿Es el EHX Small Stone el Mejor Pedal de Modulación Clásico?',
    purposeEn: 'you want that classic phase shifter sound that defined 70s rock',
    purposeEs: 'quieres ese sonido clásico de phaser que definió el rock de los 70'
  },
  // acoustic-guitars-guide
  'acoustic-guitars-guide_0': {
    en: 'How to Choose the Best Acoustic Guitar for Your Playing Style?',
    es: '¿Cómo Elegir la Mejor Guitarra Acústica para Tu Estilo de Toque?',
    purposeEn: null,
    purposeEs: null
  },
  'acoustic-guitars-guide_1': {
    en: 'Is the Yamaha FG800 the Best Budget Acoustic Guitar Under $300?',
    es: '¿Es la Yamaha FG800 la Mejor Guitarra Acústica Económica por Menos de $300?',
    purposeEn: 'you want the best acoustic guitar under $300',
    purposeEs: 'quieres la mejor guitarra acústica por menos de $300'
  },
  'acoustic-guitars-guide_2': {
    en: 'Is the Martin D-28 Still the Best Dreadnought Acoustic Guitar Ever Made?',
    es: '¿Sigue la Martin D-28 Siendo la Mejor Guitarra Acústica Dreadnought Jamás Fabricada?',
    purposeEn: 'you want the dreadnought that defined acoustic music',
    purposeEs: 'quieres el dreadnought que definió la música acústica'
  },
  'acoustic-guitars-guide_3': {
    en: 'Is the Fender CD-60S the Best Value Acoustic Guitar for Beginners?',
    es: '¿Es la Fender CD-60S la Mejor Guitarra Acústica en Relación Calidad-Precio para Principiantes?',
    purposeEn: 'you want a solid-top acoustic at an affordable price',
    purposeEs: 'quieres una acústica de tapa sólida a un precio asequible'
  },
  // stage-wireless
  'stage-wireless_0': {
    en: 'How to Choose the Best Wireless Microphone System for the Stage?',
    es: '¿Cómo Elegir el Mejor Sistema de Micrófono Inalámbrico para el Escenario?',
    purposeEn: null,
    purposeEs: null
  },
  'stage-wireless_1': {
    en: 'Is the AKG WMS420 the Best Budget Wireless Mic System?',
    es: '¿Es el AKG WMS420 el Mejor Sistema de Micrófono Inalámbrico Económico?',
    purposeEn: 'you need an affordable wireless system for small venues',
    purposeEs: 'necesitas un sistema inalámbrico asequible para lugares pequeños'
  },
  'stage-wireless_2': {
    en: 'Is the Sennheiser XSW 2-825 the Best Value Wireless System?',
    es: '¿Es el Sennheiser XSW 2-825 el Mejor Sistema Inalámbrico en Relación Calidad-Precio?',
    purposeEn: 'you want professional wireless quality at a mid-range price',
    purposeEs: 'quieres calidad inalámbrica profesional a un precio de gama media'
  },
  'stage-wireless_3': {
    en: 'Is the Shure BLX288/PG58 the Industry Standard Wireless System?',
    es: '¿Es el Shure BLX288/PG58 el Sistema Inalámbrico Estándar de la Industria?',
    purposeEn: 'you need reliable wireless for regular gigging',
    purposeEs: 'necesitas inalámbrico confiable para conciertos regulares'
  },
  'stage-wireless_4': {
    en: 'Is the Sennheiser EW 100 G4-935 the Best Professional Touring Wireless?',
    es: '¿Es el Sennheiser EW 100 G4-935 el Mejor Sistema Inalámbrico Profesional para Giras?',
    purposeEn: 'you tour professionally and need bulletproof RF reliability',
    purposeEs: 'haces giras profesionales y necesitas fiabilidad de RF a prueba de balas'
  },
  'stage-wireless_5': {
    en: 'Is the Shure ULXD24/SM58 the Best Premium Digital Wireless System?',
    es: '¿Es el Shure ULXD24/SM58 el Mejor Sistema Inalámbrico Digital Premium?',
    purposeEn: 'you need the highest channel density and digital audio quality',
    purposeEs: 'necesitas la mayor densidad de canales y calidad de audio digital'
  },
  // midi-keyboards
  'midi-keyboards_0': {
    en: 'How to Choose the Best MIDI Keyboard Controller for Music Production?',
    es: '¿Cómo Elegir el Mejor Controlador MIDI con Teclado para Producción Musical?',
    purposeEn: null,
    purposeEs: null
  },
  'midi-keyboards_1': {
    en: 'Is the Arturia KeyLab Essential 61 MkIII the Best Value DAW Controller?',
    es: '¿Es el Arturia KeyLab Essential 61 MkIII el Mejor Controlador DAW en Relación Calidad-Precio?',
    purposeEn: 'you need a MIDI keyboard with deep DAW integration on a budget',
    purposeEs: 'necesitas un teclado MIDI con integración profunda de DAW con presupuesto ajustado'
  },
  'midi-keyboards_2': {
    en: 'Is the Nord Stage 4 88 the Best Premium Workstation for Professional Keyboardists?',
    es: '¿Es el Nord Stage 4 88 el Mejor Workstation Premium para Tecladistas Profesionales?',
    purposeEn: 'you are a professional keyboardist who needs the best',
    purposeEs: 'eres un tecladista profesional que necesita lo mejor'
  },
  'midi-keyboards_3': {
    en: 'Is the Yamaha Montage M8x the Best Flagship Synthesizer for Producers?',
    es: '¿Es el Yamaha Montage M8x el Mejor Sintetizador Insignia para Productores?',
    purposeEn: 'you need the most powerful synthesis workstation available',
    purposeEs: 'necesitas la estación de trabajo de síntesis más potente disponible'
  },
  'midi-keyboards_4': {
    en: 'Is the Komplete Kontrol S61 the Best MIDI Keyboard for Native Instruments Ecosystem?',
    es: '¿Es el Komplete Kontrol S61 el Mejor Teclado MIDI para el Ecosistema Native Instruments?',
    purposeEn: 'you use Komplete and want seamless hardware integration',
    purposeEs: 'usas Komplete y quieres integración de hardware perfecta'
  },
};

// ─── Apply transformations ───
guides.forEach(function(guide) {
  if (guide.id.includes('-vs-')) return;

  const cat = guide.category;
  const c = ctx[cat] || { en: '', es: '' };
  const l = leads[cat] || { en: '', es: '' };

  guide.sections.forEach(function(sec, i) {
    const key = guide.id + '_' + i;

    // ─── Use manual override if available ───
    if (manualHeadings[key]) {
      const m = manualHeadings[key];
      sec.heading = m.en;
      sec.heading_es = m.es;

      // Front-load answer
      if (m.purposeEn && sec.content && sec.products) {
        const prodName = getProdName(sec.products) || '';
        if (prodName) {
          const enLeadStr = `Buy the ${prodName} if ${m.purposeEn}. `;
          const esLeadStr = `Compra ${fixGender(prodName)} si ${m.purposeEs}. `;
          if (!sec.content.startsWith(enLeadStr)) {
            sec.content = sec.content.replace('<p>', `<p>${enLeadStr}`);
          }
          if (sec.content_es && !sec.content_es.startsWith(esLeadStr)) {
            sec.content_es = sec.content_es.replace('<p>', `<p>${esLeadStr}`);
          }
        }
      }
      return;
    }

    // ─── Auto-generated for standard patterns ───
    const heading = sec.heading;
    const headingEs = sec.heading_es;
    const isProduct = !!sec.products;
    const prodName = getProdName(sec.products);

    // Section 0: How to Choose
    if (i === 0 && heading.startsWith('How to Choose')) {
      if (!heading.endsWith('?')) {
        sec.heading = heading + '?';
        sec.heading_es = headingEs.replace(/\?$/, '') + '?';
      }
      return;
    }

    // Product sections: auto-generate question
    if (isProduct && prodName) {
      const matchH = heading.match(/^(?:(?:Best|The)\s+)?(.+?):\s+.+$/);
      const shortCatP = matchH ? matchH[1].trim() : '';
      const enQ = `Is the ${prodName} the Best ${shortCatP} ${c.en}?`;
      const esQ = `¿Es ${fixGender(prodName)} la Mejor ${shortCatP} ${c.es}?`;
      sec.heading = enQ;
      sec.heading_es = esQ;

      // Front-load
      const enLeadStr = leadEn(prodName, l.en);
      const esLeadStr = leadEs(prodName, l.es);
      if (sec.content && !sec.content.startsWith(enLeadStr)) {
        sec.content = sec.content.replace('<p>', `<p>${enLeadStr}`);
      }
      if (sec.content_es && !sec.content_es.startsWith(esLeadStr)) {
        sec.content_es = sec.content_es.replace('<p>', `<p>${esLeadStr}`);
      }
      return;
    }

    // Generic sections (no products)
    if (isProduct && !prodName) {
      if (!heading.endsWith('?')) {
        sec.heading = heading + ' — Which Should You Choose?';
        sec.heading_es = headingEs + ' — ¿Cuál Deberías Elegir?';
      }
    }
  });
});

// ─── Generate FAQ schema ───
guides.forEach(function(guide) {
  if (guide.id.includes('-vs-')) return;
  if (guide.featuredSnippet) return; // skip if already has one

  const faqSections = guide.sections.filter(function(s) {
    return s.products && s.heading.startsWith('Is');
  });

  const faqs = faqSections.slice(0, 5).map(function(sec) {
    const cleanContent = sec.content ? sec.content.replace(/<[^>]+>/g, '').trim() : '';
    const cleanContentEs = sec.content_es ? sec.content_es.replace(/<[^>]+>/g, '').trim() : '';
    return {
      q_en: sec.heading,
      a_en: cleanContent,
      q_es: sec.heading_es,
      a_es: cleanContentEs
    };
  });

  if (faqs.length < 2) return;

  const snippet = {
    title_en: guide.title,
    text_en: faqs[0].a_en.substring(0, 200) + (faqs[0].a_en.length > 200 ? '...' : ''),
    name1_en: '',
    name2_en: '',
    price1: '',
    price2: '',
    type1: guide.category,
    type2: guide.category,
    key1_en: '',
    key2_en: '',
    best1_en: '',
    best2_en: '',
    brand1: '',
    brand2: '',
    rating1: 0,
    rating2: 0,
    title_es: guide.title_es,
    text_es: faqs[0].a_es.substring(0, 200) + (faqs[0].a_es.length > 200 ? '...' : ''),
    name1_es: '',
    name2_es: '',
    best1_es: '',
    best2_es: '',
    key1_es: '',
    key2_es: '',
    faq_q1_en: faqs[0].q_en,
    faq_a1_en: faqs[0].a_en,
    faq_q2_en: faqs[1].q_en,
    faq_a2_en: faqs[1].a_en,
    faq_q1_es: faqs[0].q_es,
    faq_a1_es: faqs[0].a_es,
    faq_q2_es: faqs[1].q_es,
    faq_a2_es: faqs[1].a_es,
    specs: []
  };

  if (faqs[2]) {
    snippet.faq_q3_en = faqs[2].q_en;
    snippet.faq_a3_en = faqs[2].a_en;
    snippet.faq_q3_es = faqs[2].q_es;
    snippet.faq_a3_es = faqs[2].a_es;
  }
  if (faqs[3]) {
    snippet.faq_q4_en = faqs[3].q_en;
    snippet.faq_a4_en = faqs[3].a_en;
    snippet.faq_q4_es = faqs[3].q_es;
    snippet.faq_a4_es = faqs[3].a_es;
  }
  if (faqs[4]) {
    snippet.faq_q5_en = faqs[4].q_en;
    snippet.faq_a5_en = faqs[4].a_en;
    snippet.faq_q5_es = faqs[4].q_es;
    snippet.faq_a5_es = faqs[4].a_es;
  }

  guide.featuredSnippet = snippet;
  console.log('  Added FAQ:', guide.id);
});

// ─── Write back ───
fs.writeFileSync('./data/guides.json', JSON.stringify(guides, null, 2), 'utf8');
console.log('\nDone! guides.json updated.');
