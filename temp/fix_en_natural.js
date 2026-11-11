/**
 * fix_en_natural.js — corrige los 24 flags de temp/audit_en.js en data/guides.json
 * Reemplazos por aguja exacta (raw text), EN + ES en paralelo donde el ES calca el EN.
 * Headings genéricos "Is the X the Best Y?" → ángulo propio por producto (REGLA 07/10/2026).
 */
const fs = require('fs');
const B = 'C:/Users/Daniel/projects/topmusiciangear/';
const P = B + 'data/guides.json';
let raw = fs.readFileSync(P, 'utf8');

let ok = 0, fail = [];
function rep(nuevoPar) {
  const antes = raw;
  raw = raw.split(nuevoPar[0]).join(nuevoPar[1]);
  if (raw !== antes) { ok++; console.log('OK   ' + nuevoPar[0].slice(0, 70) + (nuevoPar[0].length > 70 ? '…' : '')); }
  else { fail.push(nuevoPar[0].slice(0, 80)); console.log('FAIL ' + nuevoPar[0].slice(0, 80)); }
}

// ===== A. seamless/seamlessly (AI word) =====
rep(['Triple Sensor keybed, seamless transitions, and Nord\'s legendary piano, organ, and synth engines in one instrument.',
     'Triple Sensor keybed, instant patch switches, and Nord\'s legendary piano, organ, and synth engines in one instrument.']);
rep(['Teclado Triple Sensor, transiciones perfectas y los legendarios motores de piano, órgano y sintetizador de Nord en un solo instrumento.',
     'Teclado Triple Sensor, cambios de parche instantáneos y los legendarios motores de piano, órgano y sintetizador de Nord en un solo instrumento.']);
rep(['dedicated piano/organ/synth engines and seamless transitions.',
     'dedicated piano/organ/synth engines and patch changes that never cut a note.']);
rep(['and phase/crossover controls for seamless integration.',
     'and phase/crossover controls to blend it with your mains.']);
rep(['y controles de fase/cruce para integración perfecta.',
     'y controles de fase/cruce para integrarlo con tus monitores.']);
rep(['making it blend seamlessly with your monitors is not.',
     'making it blend with your monitors is not.']);

// ===== B. best-plugins: versatile compressor + next level =====
rep(['a good EQ, a versatile compressor and a quality reverb',
     'a good EQ, a solid compressor and a quality reverb']);
rep(['un compresor versátil y una reverb de calidad',
     'un compresor sólido y una reverb de calidad']);
rep(['Explore our recommended links to compare current prices and take your productions to the next level.',
     'Explore our recommended links to compare current prices before you buy.']);
rep(['Explora nuestros enlaces recomendados para comparar precios actuales y llevar tus producciones al siguiente nivel.',
     'Explora nuestros enlaces recomendados para comparar precios actuales antes de comprar.']);

// ===== C. best-drum-machine: powerhouse + blurs line + definitive + However =====
rep(['Elektron has built a sound design powerhouse that completely blurs the line between a traditional drum machine and a full studio workstation.',
     'Elektron has built something closer to a full studio workstation than a traditional drum machine.']);
rep(['Elektron ha creado una auténtica bestia de diseño de sonido que difumina por completo la línea entre una caja de ritmos tradicional y una estación de trabajo de estudio completa.',
     'Elektron ha creado algo más cercano a una estación de trabajo de estudio completa que a una caja de ritmos tradicional.']);
rep(['this is the definitive investment.',
     'this is the one to buy.']);
rep(['esta es la inversión definitiva.',
     'este es el que hay que comprar.']);
rep(['However, the \\"best\\" machine depends strictly on your workflow and budget:',
     'The right machine depends on your workflow and budget:']);
rep(['Sin embargo, la máquina \\"mejor\\" depende estrictamente de tu flujo de trabajo y presupuesto:',
     'La máquina adecuada depende de tu flujo de trabajo y presupuesto:']);

// ===== D. channel-strip-plugins: However + heading Definitive =====
rep(['However, if you have a specific sound in mind, choose based on your mixing style:',
     'If you have a specific sound in mind, choose by mixing style:']);
rep(['Universal Audio UAD SSL 4000 E Channel Strip: Definitive SSL 4000 E Emulation',
     'Universal Audio UAD SSL 4000 E: The E-Series Console, Modeled Circuit by Circuit']);

// ===== E. blx288-vs-ewd: frase duplicada + cutting-edge =====
rep(['the BLX288 delivers dual-channel analog simplicity at a competitive tier for dual-channel analog simplicity with straightforward scanning, while the EW-D brings cutting-edge digital technology with app control and 134 dB dynamic range.',
     'the BLX288 keeps dual-channel analog operation simple at a friendly price, with straightforward scanning, while the EW-D brings modern digital technology with app control and 134 dB dynamic range.']);

// ===== F. intros: here's what / Whether you're / versatile =====
rep(['Whether you want acoustic or electric, songwriting or jamming, here\'s what matters when you\'re buying your first guitar.',
     'Acoustic or electric, songwriting or jamming — these are the choices that matter when you\'re buying your first guitar.']);
rep(['for every budget and style — here\'s what\'s worth your money this year.',
     'for every budget and style — and what each one gets you.']);
rep(['are two of the most versatile and respected condensers ever made.',
     'are two of the most respected condensers ever made.']);
rep(['dos de los condensadores más versátiles y respetados jamás creados',
     'dos de los condensadores más respetados jamás creados']);
rep(['XLN Audio Addictive Keys for versatile studio pianos',
     'XLN Audio Addictive Keys for all-round studio pianos']);
rep(['XLN Audio Addictive Keys para pianos de estudio versátiles',
     'XLN Audio Addictive Keys para pianos de estudio polivalentes']);
rep(['and a versatile HSS pickup configuration — Alnico II humbucker',
     'and an HSS pickup configuration — Alnico II humbucker']);
rep(['y versátil configuración HSS — humbucker Alnico II',
     'y configuración HSS — humbucker Alnico II']);
rep(['Whether you\'re recording in a hotel room, backstage at a gig, or at a friend\'s house, it needs to be compact',
     'In a hotel room, backstage at a gig, or at a friend\'s house, it needs to be compact']);
rep(['Sweden\'s deep sequencing master against America\'s standalone production powerhouse.',
     'Sweden\'s deep sequencing master against America\'s all-in-one production machine.']);
rep(['contra la potencia de producción autónoma de Estados Unidos.',
     'contra la máquina de producción todo en uno de Estados Unidos.']);

// ===== G. headings genéricos "Is the X the Best Y?" → ángulo propio (REGLA 07/10/2026) =====
// american-pro-vs-les-paul
rep(['Is the American Pro II the Best Versatile Professional Guitar?',
     "The Working Pro's Strat: What the American Pro II Gets Right"]);
rep(['¿Es la American Pro II la guitarra profesional más versátil?',
     'La Strat del profesional: lo que acierta la American Pro II']);

// best-condenser-mics
rep(['Is the Neumann U 87 Ai the Best Microphone for Recording?',
     'Why the U 87 Ai Is Still the Studio Standard']);
rep(['¿Es el Neumann U 87 Ai el mejor micrófono para grabación?',
     'Por qué el U 87 Ai sigue siendo el estándar de estudio']);
rep(['Is the AKG C414 XLII the Best Microphone for Recording?',
     'Nine Polar Patterns: How the C414 XLII Covers Every Source']);
rep(['¿Es el AKG C414 XLII el mejor micrófono para grabación?',
     'Nueve patrones polares: cómo el C414 XLII cubre cualquier fuente']);

// best-drum-machine — las 8 secciones repiten la fórmula "X: is Y the best Z?" (REGLA 07/10/2026)
rep(['Pocket acid: is the Roland T-8 the best first drum machine?',
     'Pocket Acid: The Roland T-8 as a First Drum Machine']);
rep(['Acid de bolsillo: ¿es el Roland T-8 la mejor primera caja de ritmos?',
     'Acid de bolsillo: el Roland T-8 como primera caja de ritmos']);
rep(['No screen, no distraction: is Circuit Tracks the best first groovebox?',
     'No Screen, No Distraction: Circuit Tracks as a First Groovebox']);
rep(['Sin pantalla, sin distracción: ¿es Circuit Tracks la mejor primera groovebox?',
     'Sin pantalla, sin distracción: Circuit Tracks como primera groovebox']);
rep(['Knobs, not menus: is DrumBrute Impact pure analog attitude?',
     'Knobs, Not Menus: DrumBrute Impact and Pure Analog Attitude']);
rep(['Mandos, no menús: ¿es DrumBrute Impact pura actitud analógica?',
     'Mandos, no menús: DrumBrute Impact y la actitud analógica pura']);
rep(['Faders up: is the TR-8S still the live techno standard?',
     'Faders Up: The TR-8S and the Live Techno Standard']);
rep(['Faders arriba: ¿sigue la TR-8S siendo el estándar del techno en directo?',
     'Faders arriba: la TR-8S y el estándar del techno en directo']);
rep(['Chop everything: is the MPC One G2 the brain of hip-hop?',
     'Chop Everything: The MPC One G2 as the Brain of Hip-Hop']);
rep(['Trocea todo: ¿es la MPC One G2 el cerebro del hip-hop?',
     'Trocea todo: la MPC One G2 como cerebro del hip-hop']);
rep(['Sixteen stereo tracks of anything: is Digitakt II the sampling god?',
     'Sixteen Stereo Tracks of Anything: Digitakt II and Deep Sampling']);
rep(['Dieciséis pistas estéreo de lo que sea: ¿es Digitakt II el dios del muestreo?',
     'Dieciséis pistas estéreo de lo que sea: Digitakt II y el muestreo a fondo']);
rep(['Analog heart, digital brain: is Syntakt more than its 12 tracks?',
     'Analog Heart, Digital Brain: Syntakt Beyond Its 12 Tracks']);
rep(['Corazón analógico, cerebro digital: ¿es Syntakt más que sus 12 pistas?',
     'Corazón analógico, cerebro digital: Syntakt más allá de sus 12 pistas']);
rep(['A suitcase of knobs: is the Perkons HD-01 worth flagship money?',
     'A Suitcase of Knobs: The Perkons HD-01 at Flagship Price']);
rep(['Una maleta de mandos: ¿vale el Perkons HD-01 el dinero insignia?',
     'Una maleta de mandos: el Perkons HD-01 a precio insignia']);

// c414-vs-u87
rep(['Is the Neumann U 87 the Best for Vocal Recording?',
     'The U 87 on Vocals: Why Engineers Keep Coming Back to It']);
rep(['¿Es el Neumann U87 Ai el mejor micrófono de estudio universal?',
     'El U 87 en voces: por qué los ingenieros vuelven a él']);
rep(['Is the AKG C414 the Best for Versatile Studio Recording?',
     'One Mic, Nine Patterns: The C414 Across the Studio']);
rep(['¿Es el AKG C414 XLII el mejor para versatilidad de patrones polares?',
     'Un micrófono, nueve patrones: el C414 en todo el estudio']);

// katana-vs-dsl
rep(['Is the Katana 50 the Best Versatile Modeling Amp?',
     'The Katana 50: Amp Modeling Without Tube Maintenance']);
rep(['¿Es el Katana 50 el mejor amplificador de modelado versátil?',
     'El Katana 50: modelado de amplis sin mantenimiento de válvulas']);
rep(['Is the DSL40CR the Best for Authentic Tube Tone?',
     'The DSL40CR: Real Valves, Real Crunch']);
rep(['¿Es el DSL40CR el mejor para sonido de válvulas auténtico?',
     'El DSL40CR: válvulas de verdad, crunch de verdad']);

// nord-stage-4-vs-montage-m8x
rep(['Is the Nord Stage 4 88 the Best Stage Piano?',
     'The Nord Stage 4 88: One Keyboard for Every Gig Sound']);
rep(['¿Es el Nord Stage 4 88 el mejor piano de escenario?',
     'El Nord Stage 4 88: un teclado para todos los sonidos de un concierto']);
rep(['Is the Yamaha Montage M8x the Best Synth Workstation?',
     'The Montage M8x: FM, AWM2 and Virtual Analog in One Flagship']);
rep(['¿Es el Yamaha Montage M8x el mejor sintetizador workstation?',
     'El Montage M8x: FM, AWM2 y analógico virtual en un solo buque insignia']);

// player-strat-vs-pacifica
rep(['Is the Player Strat the Best for Authentic Fender Tone?',
     'The Player II Strat: The Real-Deal Fender Sound']);
rep(['¿Es la Player Strat la mejor para el sonido Fender auténtico?',
     'La Player II Strat: el sonido Fender auténtico']);
rep(['Is the Pacifica 112V the Best Budget Electric Guitar?',
     'The Pacifica 112V: The Budget Workhorse']);
rep(['¿Es la Yamaha Pacifica 112V la mejor guitarra eléctrica económica?',
     'La Pacifica 112V: la guitarra todoterreno']);

// sm57-vs-md421
rep(['Is the SM57 the Best Versatile Instrument Mic?',
     'The SM57 on Anything: Snare, Guitar, Horns']);
rep(['¿Es el SM57 el micrófono de instrumento más versátil?',
     'El SM57 para todo: caja, guitarra, vientos']);
rep(['Is the MD 421 Kompakt the Best for Guitar and Kick Drum?',
     'The MD 421 Kompakt: Made for Loud Cabs and Kick Drums']);
rep(['¿Es el MD 421 Kompakt el mejor para guitarra y bombo?',
     'El MD 421 Kompakt: hecho para cabinets y bombos a todo volumen']);

// sidechain-modulation-plugins
rep(['Is Cableguys ShaperBox 3 the Most Versatile Rhythmic Effect?',
     'Cableguys ShaperBox 3: One Plugin, Many Rhythmic Jobs']);
rep(['¿Es Cableguys ShaperBox 3 el efecto rítmico más versátil?',
     'Cableguys ShaperBox 3: un plugin, muchos trabajos rítmicos']);

fs.writeFileSync(P, raw, 'utf8');
console.log('\nTotal OK: ' + ok + ' | FAIL: ' + fail.length);
if (fail.length) fail.forEach(f => console.log('  REVISAR: ' + f));
