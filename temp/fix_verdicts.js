const fs = require('fs');
const DIR = 'C:/Users/Daniel/projects/topmusiciangear/';
const gFile = DIR + 'data/guides.json';
const G = JSON.parse(fs.readFileSync(gFile, 'utf8'));
const g = G.find(x => x.id === 'best-digital-pianos');

// 1) Table R6 Bluetooth fixes
const r6 = g.productTable.rows[6];
if (r6.label !== 'Bluetooth') throw new Error('R6 not Bluetooth');
const set = (i, en, es) => { r6.values[i].value = en; r6.values[i].value_es = es; };
if (r6.values[0].value !== 'Audio + MIDI (adapter incl.)') throw new Error('cell0 changed: ' + r6.values[0].value);
set(0, 'Audio + MIDI', 'Audio + MIDI');
if (r6.values[2].value !== 'MIDI') throw new Error('cell2 changed: ' + r6.values[2].value);
set(2, 'Audio', 'Audio');
console.log('R6 fixed');

// 2) FAQ A6 fixes (BT groups + envíen typo)
const f = g.featuredSnippet;
f.faq_a6_en = 'Yes \u2014 every model here has USB-MIDI, so it works as a controller for your DAW and virtual instruments. The P-225 and CLP-835 also stream audio over USB, and the CLP-835 doubles as a USB audio interface for direct recording. Bluetooth MIDI (FP-10, KDP120) cuts the cable to an iPad or laptop, while Bluetooth audio (P-225, PX-S1100, FP-30X and the consoles) lets you play along with tracks through the piano\u2019s speakers.';
f.faq_a6_es = 'S\u00ed \u2014 todos los modelos de aqu\u00ed llevan USB-MIDI, as\u00ed que funcionan como controladores de tu DAW y de los instrumentos virtuales. La P-225 y el CLP-835 adem\u00e1s env\u00edan audio por USB, y el CLP-835 sirve tambi\u00e9n como interfaz de audio USB para grabar directamente. El Bluetooth MIDI (FP-10, KDP120) elimina el cable hacia el iPad u ordenador, y el Bluetooth audio (P-225, PX-S1100, FP-30X y los muebles) te deja tocar sobre tus pistas con los altavoces del propio piano.';
console.log('FAQ A6 fixed');

// 3) Conclusion ES wording
if (!g.conclusion_es.includes('la acci\u00f3n de martillo realista de su precio')) throw new Error('conclusion ES changed');
g.conclusion_es = g.conclusion_es.replace('la acci\u00f3n de martillo realista de su precio', 'la acci\u00f3n de martillo m\u00e1s realista de su gama de precios');
console.log('conclusion ES fixed');

// 4) Missing verdicts
if (!Array.isArray(g.verdictProsCons)) throw new Error('verdictProsCons not array');
if (g.verdictProsCons.length !== 5) throw new Error('expected 5 verdicts, got ' + g.verdictProsCons.length);
const V = [
  {
    name: 'Casio PX-S1100', name_es: 'Casio PX-S1100',
    pros: [
      'Slimmest 88-key hammer-action cabinet ever made \u2014 just 232 mm deep, fits where no other real piano does',
      'Only 11.2 kg and runs on batteries, so it plays anywhere with no power outlet in sight',
      'Bluetooth audio and MIDI built in \u2014 play along with tracks and connect apps with no cables',
      'AiR sound engine with 192-note polyphony at a $599 street price'
    ],
    cons: [
      'Smart Scaled action feels lighter and less controlled than PHA-4 Standard or GHC on fast repeats',
      '8 W x 2 speakers sound thin at room-filling volume',
      'USB is MIDI only \u2014 no audio interface for direct recording',
      'No display; deeper settings live in the Casio app, not on the panel'
    ],
    pros_es: [
      'El mueble con 88 teclas de martillo m\u00e1s fino que existe \u2014 solo 232 mm de fondo, cabe donde ning\u00fan otro piano real',
      'Solo 11,2 kg y funciona con pilas, as\u00ed que suena en cualquier sitio sin enchufe a la vista',
      'Bluetooth audio y MIDI integrados \u2014 toca sobre tus temas y conecta apps sin cables',
      'Motor de sonido AiR con 192 notas de polifon\u00eda por 599 d\u00f3lares'
    ],
    cons_es: [
      'La acci\u00f3n Smart Scaled se siente m\u00e1s ligera y menos precisa que la PHA-4 Standard o la GHC en repeticiones r\u00e1pidas',
      'Los altavoces de 8 W x 2 se quedan finos cuando subes el volumen',
      'El USB es solo MIDI \u2014 no sirve como interfaz de audio para grabar',
      'Sin pantalla; los ajustes a fondo est\u00e1n en la app de Casio, no en el panel'
    ]
  },
  {
    name: 'Roland FP-10', name_es: 'Roland FP-10',
    pros: [
      'PHA-4 Standard hammer action with escapement at $499 \u2014 the best key feel per dollar here',
      'SuperNATURAL modeling responds to how hard you play instead of triggering flat samples',
      'Twin Piano mode splits the keyboard so student and teacher play side by side',
      'Quiet key action plus headphone jack for silent practice at any hour'
    ],
    cons: [
      '96-note polyphony can clip on dense sustains with layered sounds',
      'Bluetooth is MIDI only \u2014 no wireless audio streaming from your phone',
      '6 W x 2 speakers are the weakest in this guide',
      'No display and only 15 tones from the panel \u2014 the other 21 need the Roland app'
    ],
    pros_es: [
      'Acci\u00f3n de martillo PHA-4 Standard con escape por 499 d\u00f3lares \u2014 el mejor tacto por precio de la gu\u00eda',
      'El modelado SuperNATURAL responde a la fuerza con la que tocas en vez de disparar muestras planas',
      'El modo Twin Piano divide el teclado para que alumno y profesor toquen lado a lado',
      'Teclado silencioso m\u00e1s salida de auriculares para practicar a cualquier hora'
    ],
    cons_es: [
      'La polifon\u00eda de 96 notas puede cortarse con pedales largos y sonidos en capas',
      'El Bluetooth es solo MIDI \u2014 sin streaming de audio desde el m\u00f3vil',
      'Los altavoces de 6 W x 2 son los m\u00e1s justos de la gu\u00eda',
      'Sin pantalla y solo 15 sonidos desde el panel \u2014 los otros 21 exigen la app de Roland'
    ]
  },
  {
    name: 'Yamaha P-225', name_es: 'Yamaha P-225',
    pros: [
      'Concert-grand CFX sampling with VRM Lite resonance that rings like the real thing',
      'USB audio and MIDI interface built in \u2014 record stereo audio straight into your DAW',
      'Only 11.5 kg with AUX out and dual headphone jacks \u2014 ready for lessons and small gigs',
      'Bluetooth audio streams backing tracks through the piano speakers (where available)'
    ],
    cons: [
      'GHC action has no escapement simulation \u2014 pianissimo control trails the PHA-4 Standard',
      '24 voices stay piano-focused; no big general-purpose palette',
      'Single user-song recorder \u2014 one song, then it overwrites',
      'Bluetooth audio depends on region and may be missing in some countries'
    ],
    pros_es: [
      'Muestras del gran cola CFX con resonancia VRM Lite que suenan como el piano de verdad',
      'Interfaz USB de audio y MIDI integrada \u2014 graba est\u00e9reo directo en tu DAW',
      'Solo 11,5 kg con salida AUX y doble toma de auriculares \u2014 listo para clases y bolos peque\u00f1os',
      'El Bluetooth audio pasa tus bases por los altavoces del piano (seg\u00fan regi\u00f3n)'
    ],
    cons_es: [
      'La acci\u00f3n GHC no simula el escape \u2014 el control en pian\u00edsimo queda por detr\u00e1s de la PHA-4 Standard',
      'Sus 24 voces se centran en el piano; sin gran paleta generalista',
      'Grabador de una sola canci\u00f3n \u2014 graba una y la siguiente la borra',
      'El Bluetooth audio depende de la regi\u00f3n y puede faltar en algunos pa\u00edses'
    ]
  }
];
V.forEach(v => {
  if (!v.pros.length === false) {}
  ['pros', 'cons', 'pros_es', 'cons_es'].forEach(k => { if (v[k].length < 4) throw new Error(v.name + '.' + k + ' < 4'); });
  g.verdictProsCons.push(v);
});
console.log('verdicts added:', g.verdictProsCons.length);
fs.writeFileSync(gFile, JSON.stringify(G, null, 2) + '\n');
console.log('guides.json written');
