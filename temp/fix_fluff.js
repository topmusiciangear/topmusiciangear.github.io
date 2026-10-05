const fs = require('fs');
const DIR = 'C:/Users/Daniel/projects/topmusiciangear/';
const G = require(DIR + 'data/guides.json');
// [guideId, productName, kind('pro'|'con'), exact EN string, new EN, new ES]
const F = [
  ['starter-studio', 'Focusrite Scarlett 2i2 4th Gen', 'pro', 'The best-selling interface in its class, with clean preamps and a tough chassis', 'Proven interface with clean preamps and a tough chassis', 'Interfaz probada con preamplificadores limpios y un chasis resistente'],
  ['starter-studio', 'Shure SM57', 'pro', 'One of the most recorded microphones in history', 'Die-cast body that survives drops, heat and decades of stage abuse', 'Cuerpo fundido que sobrevive a caídas, calor y décadas de escenario'],
  ['starter-studio', 'KRK Rokit 7 G5', 'pro', 'The best-selling beginner monitor at a great price per pair', 'Front-ported design that works close to walls in untreated bedrooms', 'Diseño con puerto frontal que funciona pegado a la pared en dormitorios sin tratar'],
  ['best-microphone', 'MXL R144', 'pro', 'Most affordable way to get real ribbon sound', 'Passive ribbon smoothness for guitar cabs and overheads at the lowest price', 'Suavidad ribbon pasiva para pantallas de guitarra y overheads al precio más bajo'],
  ['best-plugins', 'Native Instruments Komplete 26 Ultimate', 'pro', null, null, null],
  ['best-plugins', 'Native Instruments Komplete 26 Ultimate', 'con', 'Ultimate is more than producers need who just want Kontakt plus a few synths', 'Huge library size and price punish producers who only want Kontakt plus a few synths', 'El tamaño y precio de la librería castigan a quien solo quiere Kontakt y pocos sintes'],
  ['budget-mics', 'Shure SM57', 'pro', 'The most recorded microphone in history — legendary reliability', 'Die-cast body and capsule that survive drops, heat and decades of stage abuse', 'Cuerpo fundido y cápsula que sobreviven a caídas, calor y décadas de escenario'],
  ['usb-mics', 'Blue Yeti USB Microphone', 'pro', 'Best-selling USB mic ever', 'Four pickup patterns (cardioid, stereo, omni, bidirectional) cover podcasting and music', 'Cuatro patrones (cardioide, estéreo, omni, bidireccional) cubren pódcast y música'],
  ['tracking-headphones', 'Audio-Technica ATH-M50x', 'pro', 'One of the best-selling studio headphones — does many things well', 'Foldable closed-back design with detailed mids for tracking and cue mixes', 'Diseño cerrado plegable con medios detallados para grabar y mezclas de referencia'],
  ['fx-plugins', 'Cableguys ShaperBox 3', 'pro', 'Ultimate creative gating/stutter tool', 'Draw-your-own volume, filter and time curves synced to the DAW grid', 'Dibuja tus propias curvas de volumen, filtro y tiempo sincronizadas a la rejilla del DAW'],
  ['best-condenser-mics', 'Audio-Technica AT2020', 'pro', 'Unbeatable price', 'Full-size condenser sound at the lowest street price in its class', 'Sonido de condensador de tamaño completo al precio de calle más bajo de su clase'],
  ['best-condenser-mics', 'Neumann U 87 Ai', 'pro', 'Most famous studio condenser in history', 'The reference vocal condenser engineers reach for when nothing may fail', 'El condensador vocal de referencia cuando nada puede fallar'],
  ['fender-guide', 'Fender Player II Telecaster', 'pro', 'The most recorded electric guitar in history', 'Two single-coils with Tele snap that cuts through any mix', 'Dos single-coils con chasquido Tele que corta cualquier mezcla'],
  ['guitar-pedals', 'Ibanez TS9 Tube Screamer', 'pro', 'The most recorded overdrive pedal in history', 'Mid-hump drive that pushes tube amps into singing sustain', 'Drive con empuje de medios que lleva amplis de válvulas al sustain cantarín'],
  ['acoustic-guitars-guide', 'Gibson SJ-200', 'pro', null, null, null],
  ['best-keyboard', 'Akai MPK Mini MK4', 'pro', 'The best-selling compact MIDI controller — fits in a backpack', '25 mini keys plus 8 pads in a backpack-sized footprint', '25 miniteclas más 8 pads en un formato de tamaño mochila'],
  ['best-monitors-for-small-rooms', 'ADAM Audio D3V', 'pro', 'The most affordable way into ADAM ribbon-tweeter sound at ~$350 for the pair', 'Coaxial USB-powered monitors that fit on crowded desks', 'Monitores coaxiales alimentados por USB que caben en escritorios llenos'],
  ['best-beginner-electric-guitar', 'Squier Affinity Series Stratocaster', 'pro', 'Iconic Stratocaster look and feel — the most recorded guitar shape in history', 'Comfortable contoured body with three single-coils for clean-to-crunch versatility', 'Cuerpo contorneado cómodo con tres single-coils versátiles de limpio a crunch'],
  ['best-bass-amps', 'Markbass Mini CMD 121P V', 'pro', 'The best-selling Markbass amp worldwide with the iconic yellow-on-black design', 'Single-knob Old School Filter rolls off highs for instant vintage thump', 'El filtro Old School de una perilla recorta agudos para thump vintage instantáneo'],
  ['budget-pa-systems', 'EV ZLX-12P-G2 Powered Speaker', 'pro', 'Best-selling professional PA speaker with 8,900+ reviews', '1000W Class-D power with DSP presets and Bluetooth control', '1000W Clase-D con presets DSP y control Bluetooth'],
  ['precision-vs-jazz', 'Fender Player II Precision Bass', 'pro', null, null, null],
  ['fender-bass-guide', 'Fender Player II Jazz Bass', 'pro', ' it is the most versatile Fender bass at a fair price', 'Two single-coils with independent volumes cover fingerstyle, slap and pick', 'Dos single-coils con volúmenes independientes cubren dedos, slap y púa'],
  ['budget-bass-like-expensive', 'Squier Affinity Series Precision Bass PJ', 'pro', "The world's best-selling bass at an accessible price", 'Split-coil P plus Jazz bridge pickup cover vintage thump and modern growl', 'Pastilla P split-coil más puente Jazz cubren thump vintage y growl moderno'],
  ['beginner-bass-guitars', 'Squier Affinity Series Precision Bass PJ', 'pro', "The world's best-selling bass — proven by thousands of beginners", 'Split-coil P plus Jazz bridge pickup cover vintage thump and modern growl', 'Pastilla P split-coil más puente Jazz cubren thump vintage y growl moderno'],
  ['beginner-bass-guitars', 'Fender Player II Jazz Bass', 'pro', ' it is the most versatile Fender bass at a fair price', 'Two single-coils with independent volumes cover fingerstyle, slap and pick', 'Dos single-coils con volúmenes independientes cubren dedos, slap y púa'],
  ['best-bass-under-700', 'Yamaha TRBX304', 'pro', 'Most versatile bass with a 5-way active EQ', '5-way active EQ switch with humbucking pickups for slap-ready tones', 'Selector activo de 5 vías con humbuckers para tonos listos para slap'],
  ['pro-microphones', 'Lewitt LCT 1040 Ultimate Microphone System', 'pro', 'Five polar patterns selectable via remote control — most versatile in its class', 'Five polar patterns with tube and solid-state voicings via remote control', 'Cinco patrones polares con voces de válvulas y estado sólido por control remoto'],
  ['beat-making', 'Focusrite Scarlett 2i2 4th Gen', 'pro', "The world's best-selling audio interface for a reason", 'Clean preamps with Air mode and rock-solid USB-C drivers', 'Previos limpios con modo Air y drivers USB-C sólidos'],
  ['best-instrument-mics', 'Shure SM57', 'pro', 'The most recorded instrument microphone in history', 'Handles screaming guitar cabs without distortion or damage', 'Aguanta pantallas a todo volumen sin distorsión ni daños'],
  ['best-hardware-samplers', 'Akai MPC Sample', 'pro', 'Best-selling budget sampler', '16 iconic velocity-sensitive pads with chop and time-stretch', '16 pads icónicos sensibles a la velocidad con chop y time-stretch'],
  ['best-acoustic-guitars-for-beginners', 'Fender CD-60S Acoustic', 'pro', "Proven reliability from the world's most famous guitar brand", 'Dreadnought with rolled fingerboard edges for easy chording', 'Dreadnought con bordes de diapasón redondeados para cejillas fáciles'],
  ['best-parlor-guitars', 'Gretsch G9500 Jim Dandy', 'pro', 'Authentic 1930s bark at an unbeatable price', 'Ladder-braced parlor tone for couch picking and recording', 'Tono parlor con varetaje ladder para tocar en el sofá y grabar'],
  ['best-ribbon-mics', 'MXL R144', 'pro', 'Most affordable way to get real ribbon sound', 'Passive ribbon smoothness for guitar cabs and overheads at the lowest price', 'Suavidad ribbon pasiva para pantallas de guitarra y overheads al precio más bajo'],
  ['sidechain-modulation-plugins', 'Cableguys ShaperBox 3', 'pro', 'Most versatile rhythmic modulation toolkit available', 'Volume, filter, pan, width and time modules in one window', 'Módulos de volumen, filtro, paneo, anchura y tiempo en una ventana'],
  ['best-bass-amps', 'Fender Rumble 40 V3', 'pro', 'Proven first amp with thousands of positive reviews from gigging bassists', 'Ported lightweight cabinet that sounds big in rehearsals and small gigs', 'Caja portada ligera que suena grande en ensayos y conciertos pequeños'],
  ['best-bass-amps', 'Ampeg Rocket Bass RB-210', 'pro', '450W of Class-D power through two Custom10 speakers and a 1-inch tweeter', '500W with an extension cab (250W standalone) through two custom 10-inch Lavoce speakers and a tweeter', '500W con cabina de extensión (250W solo) a través de dos altavoces Lavoce de 10 pulgadas y tweeter'],
  ['best-bass-amps', 'Ampeg Rocket Bass RB-210', 'pro', 'Super Grit Technology overdrive delivers that legendary SVT grind on demand', 'Super Grit Technology overdrive adds SVT-style saturation on demand', 'El overdrive Super Grit Technology añade saturación estilo SVT a demanda'],
  ['best-bass-amps', 'Ampeg Rocket Bass RB-210', 'con', 'At 48 lb (21.8 kg) it is heavier than Class-D combos like the Rumble 500', 'At 39 lb (17.7 kg) it is heavier than Class-D combos like the Rumble 500', 'Con 17,7 kg pesa más que combos Clase D como el Rumble 500']
];
let miss = 0, ok = 0;
F.push(
  ['best-plugins', 'Native Instruments Komplete 26 Ultimate', 'pro', 'Kontakt 8 — the ultimate sampler platform with thousands of libraries', 'Kontakt 8 — the sampler platform with thousands of third-party libraries', 'Kontakt 8 — la plataforma de sampler con miles de librerías de terceros'],
  ['acoustic-guitars-guide', 'Gibson SJ-200', 'pro', 'The King of the Flat-Tops — the most iconic jumbo acoustic ever made, played by Elvis and Bob Dylan', 'Jumbo maple body with huge headroom for strummers and vocal accompaniment', 'Cuerpo jumbo de arce con gran margen para rasgueos y acompañar la voz'],
  ['precision-vs-jazz', 'Fender Player II Precision Bass', 'pro', 'Thick, fundamental-heavy tone with natural midrange compression that sits in a dense mix without needing any EQ sculpting — the most recorded bass sound in history', 'Thick, fundamental-heavy tone with natural midrange compression that sits in a dense mix without needing any EQ sculpting', 'Tono grueso con énfasis en fundamentales y compresión natural de medios que se sienta en una mezcla densa sin necesidad de esculpir con EQ'],
  ['best-bass-amps', 'Markbass Mini CMD 121P V', 'pro', 'Legendary Italian tone: 500W through a 12-inch Markbass Neodymium Custom speaker with piezo tweeter', 'Italian 4-band EQ with Old School Filter plus bi-band limiter; 500W with extension cab (300W standalone)', 'EQ italiana de 4 bandas con Old School Filter más limitador bi-banda; 500W con cabina de extensión (300W solo)']
);
for (const [gid, name, kind, en, newEn, newEs] of F) {
  if (!en) continue;
  const g = G.find(x => x.id === gid);
  if (!g) { console.log('MISS guide ' + gid); miss++; continue; }
  const v = (g.verdictProsCons || []).find(v => v.name === name);
  if (!v) { console.log('MISS product ' + gid + ' ' + name); miss++; continue; }
  const arr = kind === 'pro' ? v.pros : v.cons;
  const arrEs = kind === 'pro' ? v.pros_es : v.cons_es;
  const i = arr.findIndex(s => s.includes(en.slice(0, 40)));
  if (i === -1) { console.log('MISS text ' + gid + ' ' + name + ': ' + en.slice(0, 60)); miss++; continue; }
  arr[i] = newEn; arrEs[i] = newEs; ok++;
  console.log('OK ' + gid + ' ' + name);
}
fs.writeFileSync(DIR + 'data/guides.json', JSON.stringify(G, null, 2));
console.log('DONE ok=' + ok + ' miss=' + miss);