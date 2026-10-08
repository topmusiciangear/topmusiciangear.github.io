const fs = require('fs');
const DIR = 'C:/Users/Daniel/projects/topmusiciangear/';

const guides = JSON.parse(fs.readFileSync(DIR + 'data/guides.json', 'utf8'));
const guide = guides.find(x => x.title === 'Best Samplers & Beat Making: Complete Guide');

guide.sections = [
  {
    heading: 'How to Choose the Best Sampler or Drum Computer for Your Workflow?',
    heading_es: '¿Cómo Elegir el Mejor Sampler o Caja de Ritmos para tu Flujo de Trabajo?',
    body: 'Choosing the right sampler depends on your workflow: standalone vs controller, pads vs keys, screen vs screenless, and budget. The best beat-making machines balance immediacy with depth.',
    body_es: 'Elegir el sampler adecuado depende de tu flujo de trabajo: autónomo vs controlador, pads vs teclas, con pantalla vs sin pantalla, y presupuesto. Las mejores máquinas de beat-making equilibran inmediatez con profundidad.'
  },
  {
    heading: 'Deep Electronic Sound Design: The Elektron Digitakt II Approach',
    heading_es: 'Diseño de Sonido Electrónico Profundo: El Enfoque del Elektron Digitakt II',
    body: 'The Digitakt II is a powerhouse 8-track stereo sampler with parameter locks, trig conditions, and Overbridge. Its sequencer is best-in-class for electronic beat-making, though the learning curve is steep.',
    body_es: 'El Digitakt II es un sampler estéreo de 8 tracks potente con parameter locks, trig conditions y Overbridge. Su secuenciador es de lo mejor para beat-making electrónico, aunque la curva de aprendizaje es empinada.'
  },
  {
    heading: 'Standalone Value King: Inside the Akai MPC One G2',
    heading_es: 'Rey del Valor Autónomo: Dentro del Akai MPC One G2',
    body: 'The MPC One G2 is the entry point to the standalone MPC ecosystem. With 16 GB storage, WiFi, Bluetooth, and the full MPC software engine, it is the best value standalone for hip-hop and urban production.',
    body_es: 'El MPC One G2 es la puerta de entrada al ecosistema MPC autónomo. Con 16 GB de almacenamiento, WiFi, Bluetooth y el motor de software MPC completo, es el mejor valor autónomo para producción hip-hop y urbana.'
  },
  {
    heading: 'The Ultimate Portable Workstation: Akai MPC Live III',
    heading_es: 'La Estación de Trabajo Portátil Definitiva: Akai MPC Live III',
    body: 'The MPC Live III is the undisputed all-in-one workstation for modern production. With 16 audio tracks, built-in battery, 7" touchscreen, and integrated monitoring speaker, it is the ultimate portable beat-making hub.',
    body_es: 'El MPC Live III es la estación de trabajo todo en uno indiscutible para la producción moderna. Con 16 tracks de audio, batería integrada, pantalla táctil de 7" y altavoz de monitorización integrado, es el hub de beat-making portátil definitivo.'
  },
  {
    heading: 'Lo-Fi and Boom-Bap: The Roland SP-404MKII Legacy',
    heading_es: 'Lo-Fi y Boom-Bap: El Legado del Roland SP-404MKII',
    body: 'The SP-404MKII is the iconic lo-fi and boom-bap sampler. With 16 sample tracks, 12 FX per pattern, skip-back sampling, and DJ FX looper, it is the king of gritty, hands-on beat-making.',
    body_es: 'El SP-404MKII es el icónico sampler lo-fi y boom-bap. Con 16 tracks de sample, 12 FX por patrón, skip-back sampling y DJ FX looper, es el rey del beat-making crudo y manual.'
  },
  {
    heading: 'Software Meets Hardware: Native Instruments Maschine+',
    heading_es: 'Software se Encuentra con Hardware: Native Instruments Maschine+',
    body: 'The Maschine+ is a standalone groovebox with a massive factory library, 8 groups of 16 hyper-responsive pads, and full software integration. It bridges the gap between controller and standalone perfectly.',
    body_es: 'El Maschine+ es un groovebox autónomo con una librería factory masiva, 8 grupos de 16 pads hiperresponsivos e integración completa con el software. Puentea perfectamente la brecha entre controlador y autónomo.'
  },
  {
    heading: 'Pocket-Sized Hype: Teenage Engineering EP-133 K.O. II',
    heading_es: 'Hype de Bolsillo: Teenage Engineering EP-133 K.O. II',
    body: 'The EP-133 K.O. II is the most viral pocket sampler ever. With punch-in FX, pressure-sensitive keys, and a built-in microphone, it is the ultimate sketchpad for beat-makers on the move.',
    body_es: 'El EP-133 K.O. II es el sampler de bolsillo más viral de la historia. Con efectos punch-in, teclas sensibles a la presión y micrófono integrado, es el sketchpad definitivo para beat-makers en movimiento.'
  },
  {
    heading: 'Keys and Pads Combined: Akai MPC Key 37',
    heading_es: 'Teclas y Pads Combinados: Akai MPC Key 37',
    body: 'The MPC Key 37 combines the full MPC standalone engine with a 37-key keyboard. It is the definitive hybrid for producers who want pads, keys, and massive connectivity in one unit.',
    body_es: 'El MPC Key 37 combina el motor autónomo MPC completo con un teclado de 37 teclas. Es el híbrido definitivo para productores que quieren pads, teclas y conectividad masiva en una sola unidad.'
  },
  {
    heading: 'Granular Sampling on the Go: Roland Aira Compact P-6',
    heading_es: 'Sampling Granular en Marcha: Roland Aira Compact P-6',
    body: 'The P-6 is a pocket-size creative sampler with a granular engine, USB-C audio/MIDI, and Roland master effects. It is the most portable serious sampler on the market.',
    body_es: 'El P-6 es un sampler creativo de bolsillo con motor granular, audio/MIDI USB-C y efectos maestros de Roland. Es el sampler serio más portátil del mercado.'
  },
  {
    heading: 'Screenless Grid Workflow: Novation Circuit Rhythm',
    heading_es: 'Flujo de Trabajo sin Pantalla: Novation Circuit Rhythm',
    body: 'The Circuit Rhythm is a screenless sampler that forces you to use your ears. With 8 sample tracks, Grid FX, and a 4-hour battery, it is the best grid-based beat-making tool for live performance.',
    body_es: 'El Circuit Rhythm es un sampler sin pantalla que te obliga a usar los oídos. Con 8 tracks de sample, Grid FX y batería de 4 horas, es la mejor herramienta de beat-making basada en rejilla para directo.'
  },
  {
    heading: 'Flagship Command Center: Akai MPC X SE',
    heading_es: 'Centro de Mando Insignia: Akai MPC X SE',
    body: 'The MPC X SE is the flagship standalone studio center. With 16 motorized Q-Link knobs, 10.1" touchscreen, and 8 DC-coupled outputs, it is the ultimate beat-making command center.',
    body_es: 'El MPC X SE es el centro de estudio autónomo insignia. Con 16 knobs motorizados Q-Link, pantalla táctil de 10.1" y 8 salidas DC-coupled, es el centro de mando de beat-making definitivo.'
  }
];

fs.writeFileSync(DIR + 'data/guides.json', JSON.stringify(guides, null, 2));
console.log('sections rewritten with unique headings:', guide.sections.length);
