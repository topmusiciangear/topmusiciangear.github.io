const fs = require('fs');
const B = 'C:/Users/Daniel/projects/topmusiciangear/';
const guides = JSON.parse(fs.readFileSync(B + 'data/guides.json', 'utf8'));
const V = {
  'best-synth-vsts': [
    'Arturia Pigments 7 is the best starting point: visual modulation, four engines and 104 filters cover every genre. Add u-he Diva for true analog warmth, Kilohearts Phase Plant for modular depth, VPS Avenger 2 for festival-scale EDM, Reveal Sound Spire for trance leads, and Native Instruments Massive X for aggressive basses — a complete synth arsenal.',
    'Arturia Pigments 7 es el mejor punto de partida: modulación visual, cuatro motores y 104 filtros cubren cada género. Añade u-he Diva para calidez analógica real, Kilohearts Phase Plant para profundidad modular, VPS Avenger 2 para EDM a escala de festival, Reveal Sound Spire para leads trance y Native Instruments Massive X para bajos agresivos — un arsenal completo de sintes.'
  ],
  'best-midi-theory-plugins': [
    'Scaler 3 is the theory core: key detection and one-finger chords turn humming into progressions. Add SongWish reMIDI 4 to remix MIDI loops into instruments, W.A. Production Loop Engine 3 for fast grooves, Audiomodern Playbeat 4 for genre-aware drums, Audiomodern Riffer 4 for scale-locked melodies, and Zynaptiq PitchMap to reshape pitch inside mixed audio.',
    'Scaler 3 es el núcleo de teoría: detección de tonalidad y acordes de un dedo convierten tarareos en progresiones. Añade SongWish reMIDI 4 para convertir loops MIDI en instrumentos, W.A. Production Loop Engine 3 para grooves rápidos, Audiomodern Playbeat 4 para baterías por género, Audiomodern Riffer 4 para melodías fijadas a escala y Zynaptiq PitchMap para remodelar el tono dentro de audio mezclado.'
  ],
  'best-piano-keyboard-vsts': [
    'MeldaProduction MeldwayGrand is the best value in concert grands: a real nine-foot Steinway D at a mid-range price. Add Native Instruments Kontakt 8 to run the world\u2019s best libraries, Arturia V Collection 11 Pro for 45 modeled instruments, XLN Audio Addictive Keys for mix-ready pop pianos, Native Instruments Noire for felt intimacy, and Arturia Augmented GRAND PIANO for piano-to-synth morphing.',
    'MeldaProduction MeldwayGrand es el mejor valor en pianos de concierto: un Steinway D real de nueve pies a precio medio. Añade Native Instruments Kontakt 8 para ejecutar las mejores bibliotecas del mundo, Arturia V Collection 11 Pro para 45 instrumentos modelados, XLN Audio Addictive Keys para pianos pop listos para mezcla, Native Instruments Noire para intimidad de fieltro y Arturia Augmented GRAND PIANO para mutar de piano a sinte.'
  ],
  'best-guitar-plugins': [
    'IK Multimedia AmpliTube 5 is the best all-around choice, with 400+ gear models and Tonex capture integration. Add Two Notes GENOME for component-level amps with real-room DynIR cabs, UAD Sound City Studios for legendary rock room tone, Kiive Audio Lunchbox Amp Sim for British valve crunch on a budget, and Softube Amp Room Marshall Suite for licensed Plexi stacks.',
    'IK Multimedia AmpliTube 5 es la mejor opción general, con más de 400 modelos e integración de capturas Tonex. Añade Two Notes GENOME para amplis a nivel de componente con cabs DynIR de salas reales, UAD Sound City Studios para tono de sala legendario, Kiive Audio Lunchbox Amp Sim para crunch británico de válvulas con presupuesto y Softube Amp Room Marshall Suite para stacks Plexi licenciados.'
  ],
  'best-audio-repair-plugins': [
    'iZotope RX 12 Standard is the rescue toolkit for any unusable recording: spectral editing plus dialogue tools. Add Baby Audio Smooth Operator Pro for one-knob harshness control, Sonible smart:deess for AI vocal de-essing, Acon Digital Restoration Suite 2 for everyday budget cleanup, and Zynaptiq UNVEIL to pull room reflections off live tracks.',
    'iZotope RX 12 Standard es el kit de rescate para cualquier grabación inservible: edición espectral más herramientas de diálogo. Añade Baby Audio Smooth Operator Pro para control de dureza con una perilla, Sonible smart:deess para de-essing vocal con IA, Acon Digital Restoration Suite 2 para limpieza diaria con presupuesto y Zynaptiq UNVEIL para quitar reflexiones de sala en pistas en vivo.'
  ],
  'autotune-vs-melodyne': [
    'Buy Antares Auto-Tune Pro 11 for real-time tracking, live use and the classic hard-tuned effect. Buy Celemony Melodyne 5 Essential for transparent, note-by-note studio correction where every transition has to sound untouched. Many vocal chains run both: Auto-Tune on the way in, Melodyne for the final polish.',
    'Compra Antares Auto-Tune Pro 11 para grabación en tiempo real, directo y el clásico efecto de afinación dura. Compra Celemony Melodyne 5 Essential para corrección transparente nota por nota donde cada transición debe sonar intacta. Muchas cadenas vocales usan ambos: Auto-Tune al grabar, Melodyne para el pulido final.'
  ],
  'ozone-vs-fabfilter': [
    'Buy iZotope Ozone 12 Advanced for an all-in-one mastering chain with AI assistance and genre targets. Buy the FabFilter Mastering Bundle for surgical, no-compromise control over every band, transient and level. Ozone finishes records faster; FabFilter finishes them exactly.',
    'Compra iZotope Ozone 12 Advanced para una cadena de masterización todo en uno con asistencia de IA y objetivos por género. Compra el FabFilter Mastering Bundle para control quirúrgico sin concesiones sobre cada banda, transitorio y nivel. Ozone termina discos más rápido; FabFilter los termina exactos.'
  ],
  'vocalign-vs-revoice-pro': [
    'Buy Synchro Arts VocAlign 7 Pro for fast double alignment and tight harmonies in seconds. Buy Synchro Arts Revoice Pro 5 when timing, pitch and level all need matching across takes, ADR or stacked choirs. VocAlign is the daily driver; Revoice Pro is the full alignment studio.',
    'Compra Synchro Arts VocAlign 7 Pro para alinear dobles rápido y armonías ajustadas en segundos. Compra Synchro Arts Revoice Pro 5 cuando tiempo, tono y nivel necesitan coincidir entre tomas, ADR o coros apilados. VocAlign es la herramienta diaria; Revoice Pro es el estudio completo de alineación.'
  ]
};
Object.keys(V).forEach(id => {
  const g = guides.find(x => x.id === id);
  g.verdict = V[id][0];
  g.verdict_es = V[id][1];
});
fs.writeFileSync(B + 'data/guides.json', JSON.stringify(guides, null, 2), 'utf8');
console.log('veredictos añadidos: ' + Object.keys(V).length);
