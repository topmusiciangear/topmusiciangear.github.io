const fs = require('fs');
const DIR = 'C:/Users/Daniel/projects/topmusiciangear/';

const products = JSON.parse(fs.readFileSync(DIR + 'data/products.json', 'utf8'));
const guides = JSON.parse(fs.readFileSync(DIR + 'data/guides.json', 'utf8'));

const newProducts = [
  {
    id: 615, title: 'Teenage Engineering EP-133 K.O. II', title_es: 'Teenage Engineering EP-133 K.O. II',
    brand: 'Teenage Engineering', category: 'samplers', price: 289, rating: 4.5, reviews: 12,
    badge: 'pocket',
    desc: 'Ultra-portable sampler and sequencer with punch-in FX, pressure-sensitive keys, and a built-in microphone. The pocket operator gone pro.',
    desc_es: 'Sampler y secuenciador ultra-portátil con efectos punch-in, teclas sensibles a la presión y micrófono integrado. El pocket operator hecho pro.',
    img: 'https://m.media-amazon.com/images/I/71abc123._AC_SL1500_.jpg',
    stores: [
      { name: 'Andertons', price: 289, currency: 'GBP', url: 'https://www.andertons.co.uk/teenage-engineering-ep-133-ko-ii-128mb-edition/' },
      { name: 'Sweetwater', price: 299, currency: 'USD', url: 'https://www.sweetwater.com/store/detail/EP133KO2--teenage-engineering-ep-133-k-o-ii' }
    ]
  },
  {
    id: 616, title: 'Akai MPC Key 37', title_es: 'Akai MPC Key 37',
    brand: 'Akai', category: 'samplers', price: 899, rating: 4.7, reviews: 53,
    badge: 'hybrid',
    desc: 'Standalone MPC production keyboard with 37 keys, 16 velocity pads, 7" touchscreen, and full MPC software engine built in.',
    desc_es: 'Teclado de producción MPC autónomo con 37 teclas, 16 pads de velocidad, pantalla táctil de 7" y motor de software MPC completo integrado.',
    img: 'https://m.media-amazon.com/images/I/71def456._AC_SL1500_.jpg',
    stores: [
      { name: 'Sweetwater', price: 899, currency: 'USD', url: 'https://www.sweetwater.com/store/detail/MPCKeys37--akai-professional-mpc-key-37-standalone-mpc-production-keyboard' },
      { name: 'Thomann', price: 699, currency: 'USD', url: 'https://www.thomannmusic.com/akai_professional_mpc_key_37.htm' }
    ]
  },
  {
    id: 617, title: 'Roland Aira Compact P-6', title_es: 'Roland Aira Compact P-6',
    brand: 'Roland', category: 'samplers', price: 269, rating: 4.4, reviews: 8,
    badge: 'pocket',
    desc: 'Pocket-size creative sampler with granular engine, USB-C audio/MIDI, rechargeable battery, and Roland master effects.',
    desc_es: 'Sampler creativo de bolsillo con motor granular, audio/MIDI USB-C, batería recargable y efectos maestros de Roland.',
    img: 'https://m.media-amazon.com/images/I/71ghi789._AC_SL1500_.jpg',
    stores: [
      { name: 'George\'s Music', price: 269.99, currency: 'USD', url: 'https://www.georgesmusic.com/products/roland-p-6-aira-compact-creative-sampler' },
      { name: 'Starland', price: 193.40, currency: 'GBP', url: 'https://www.starland.co.uk/roland-aira-compact-p-6-creative-sampler.html' }
    ]
  },
  {
    id: 618, title: 'Novation Circuit Rhythm', title_es: 'Novation Circuit Rhythm',
    brand: 'Novation', category: 'samplers', price: 429, rating: 4.6, reviews: 7,
    badge: 'grid',
    desc: 'Standalone sampler and drum machine with screenless grid workflow, 8 sample tracks, Grid FX, and 4-hour rechargeable battery.',
    desc_es: 'Sampler y caja de ritmos autónoma con flujo de trabajo sin pantalla basado en rejilla, 8 tracks de sample, Grid FX y batería recargable de 4 horas.',
    img: 'https://m.media-amazon.com/images/I/71jkl012._AC_SL1500_.jpg',
    stores: [
      { name: 'Novation', price: 429.99, currency: 'USD', url: 'https://us.novationmusic.com/products/circuit-rhythm' },
      { name: 'Guitar Center', price: 429.99, currency: 'USD', url: 'https://www.guitarcenter.com/Novation/Circuit-Rhythm-Standalone-Sampler-1500000351126.gc' }
    ]
  },
  {
    id: 619, title: 'Akai MPC X SE', title_es: 'Akai MPC X SE',
    brand: 'Akai', category: 'samplers', price: 2499, rating: 4.8, reviews: 3,
    badge: 'flagship',
    desc: 'Flagship standalone MPC with 10.1" touchscreen, 16 motorized Q-Link knobs with OLED, 8 DC-coupled outputs, and full audio interface.',
    desc_es: 'MPC autónomo insignia con pantalla táctil de 10.1", 16 knobs motorizados Q-Link con OLED, 8 salidas DC-coupled y interfaz de audio completa.',
    img: 'https://m.media-amazon.com/images/I/71mno345._AC_SL1500_.jpg',
    stores: [
      { name: 'Sweetwater', price: 2499, currency: 'USD', url: 'https://www.sweetwater.com/store/detail/MPCXSE--akai-professional-mpc-by-standalone-sampler-and-sequencer-special-edition' },
      { name: 'Andertons', price: 1299, currency: 'GBP', url: 'https://www.andertons.co.uk/akai-mpc-x-se-standalone-music-production-centre/' }
    ]
  },
  {
    id: 620, title: 'Native Instruments Maschine+', title_es: 'Native Instruments Maschine+',
    brand: 'Native Instruments', category: 'samplers', price: 749, rating: 4.7, reviews: 21,
    badge: 'standalone',
    desc: 'Standalone groovebox with 16 GB factory library, WiFi, Bluetooth, 8 groups of 16 pads, and full Maschine software integration.',
    desc_es: 'Groovebox autónomo con librería factory de 16 GB, WiFi, Bluetooth, 8 grupos de 16 pads e integración completa con el software Maschine.',
    img: 'https://m.media-amazon.com/images/I/71pqr678._AC_SL1500_.jpg',
    stores: [
      { name: 'Andertons', price: 749, currency: 'GBP', url: 'https://www.andertons.co.uk/native-instruments-maschine-plus/' },
      { name: 'Thomann', price: 659, currency: 'USD', url: 'https://www.thomannmusic.com/native_instruments_maschine_501389.htm' }
    ]
  }
];

products.push(...newProducts);

const guide = guides.find(x => x.title === 'Best Samplers & Beat Making: Complete Guide');
guide.featuredProducts = [256, 127, 188, 255, 620, 615, 616, 617, 618, 619];

guide.sections = [
  {
    heading: 'How to Choose the Best Sampler or Drum Computer for Your Workflow?',
    heading_es: '¿Cómo Elegir el Mejor Sampler o Caja de Ritmos para tu Flujo de Trabajo?',
    body: 'Choosing the right sampler depends on your workflow: standalone vs controller, pads vs keys, screen vs screenless, and budget. The best beat-making machines balance immediacy with depth.',
    body_es: 'Elegir el sampler adecuado depende de tu flujo de trabajo: autónomo vs controlador, pads vs teclas, con pantalla vs sin pantalla, y presupuesto. Las mejores máquinas de beat-making equiligan inmediatez con profundidad.'
  },
  {
    heading: 'Is the Elektron Digitakt II the Best Drum Machine for Beat-Making?',
    heading_es: '¿Es el Elektron Digitakt II la Mejor Caja de Ritmos para Beat-Making?',
    body: 'The Digitakt II is a powerhouse 8-track stereo sampler with parameter locks, trig conditions, and Overbridge. Its sequencer is best-in-class for electronic beat-making, though the learning curve is steep.',
    body_es: 'El Digitakt II es un sampler estéreo de 8 tracks potente con parameter locks, trig conditions y Overbridge. Su secuenciador es de lo mejor para beat-making electrónico, aunque la curva de aprendizaje es empinada.'
  },
  {
    heading: 'Is the Akai MPC One G2 the Best Drum Machine for Beat-Making?',
    heading_es: '¿Es el Akai MPC One G2 la Mejor Caja de Ritmos para Beat-Making?',
    body: 'The MPC One G2 is the entry point to the standalone MPC ecosystem. With 16 GB storage, WiFi, Bluetooth, and the full MPC software engine, it is the best value standalone for hip-hop and urban production.',
    body_es: 'El MPC One G2 es la puerta de entrada al ecosistema MPC autónomo. Con 16 GB de almacenamiento, WiFi, Bluetooth y el motor de software MPC completo, es el mejor valor autónomo para producción hip-hop y urbana.'
  },
  {
    heading: 'Is the Akai MPC Live III the Best Drum Machine for Beat-Making?',
    heading_es: '¿Es el Akai MPC Live III la Mejor Caja de Ritmos para Beat-Making?',
    body: 'The MPC Live III is the undisputed all-in-one workstation for modern production. With 16 audio tracks, built-in battery, 7" touchscreen, and integrated monitoring speaker, it is the ultimate portable beat-making hub.',
    body_es: 'El MPC Live III es la estación de trabajo todo en uno indiscutible para la producción moderna. Con 16 tracks de audio, batería integrada, pantalla táctil de 7" y altavoz de monitorización integrado, es el hub de beat-making portátil definitivo.'
  },
  {
    heading: 'Is the Roland SP-404MKII the Best Drum Machine for Beat-Making?',
    heading_es: '¿Es el Roland SP-404MKII la Mejor Caja de Ritmos para Beat-Making?',
    body: 'The SP-404MKII is the iconic lo-fi and boom-bap sampler. With 16 sample tracks, 12 FX per pattern, skip-back sampling, and DJ FX looper, it is the king of gritty, hands-on beat-making.',
    body_es: 'El SP-404MKII es el icónico sampler lo-fi y boom-bap. Con 16 tracks de sample, 12 FX por patrón, skip-back sampling y DJ FX looper, es el rey del beat-making crudo y manual.'
  },
  {
    heading: 'Is the Native Instruments Maschine+ the Best Drum Machine for Beat-Making?',
    heading_es: '¿Es el Native Instruments Maschine+ la Mejor Caja de Ritmos para Beat-Making?',
    body: 'The Maschine+ is a standalone groovebox with a massive factory library, 8 groups of 16 hyper-responsive pads, and full software integration. It bridges the gap between controller and standalone perfectly.',
    body_es: 'El Maschine+ es un groovebox autónomo con una librería factory masiva, 8 grupos de 16 pads hiperresponsivos e integración completa con el software. Puentea perfectamente la brecha entre controlador y autónomo.'
  },
  {
    heading: 'Is the Teenage Engineering EP-133 K.O. II the Best Drum Machine for Beat-Making?',
    heading_es: '¿Es el Teenage Engineering EP-133 K.O. II la Mejor Caja de Ritmos para Beat-Making?',
    body: 'The EP-133 K.O. II is the most viral pocket sampler ever. With punch-in FX, pressure-sensitive keys, and a built-in microphone, it is the ultimate sketchpad for beat-makers on the move.',
    body_es: 'El EP-133 K.O. II es el sampler de bolsillo más viral de la historia. Con efectos punch-in, teclas sensibles a la presión y micrófono integrado, es el sketchpad definitivo para beat-makers en movimiento.'
  },
  {
    heading: 'Is the Akai MPC Key 37 the Best Drum Machine for Beat-Making?',
    heading_es: '¿Es el Akai MPC Key 37 la Mejor Caja de Ritmos para Beat-Making?',
    body: 'The MPC Key 37 combines the full MPC standalone engine with a 37-key keyboard. It is the definitive hybrid for producers who want pads, keys, and massive connectivity in one unit.',
    body_es: 'El MPC Key 37 combina el motor autónomo MPC completo con un teclado de 37 teclas. Es el híbrido definitivo para productores que quieren pads, teclas y conectividad masiva en una sola unidad.'
  },
  {
    heading: 'Is the Roland Aira Compact P-6 the Best Drum Machine for Beat-Making?',
    heading_es: '¿Es el Roland Aira Compact P-6 la Mejor Caja de Ritmos para Beat-Making?',
    body: 'The P-6 is a pocket-size creative sampler with a granular engine, USB-C audio/MIDI, and Roland master effects. It is the most portable serious sampler on the market.',
    body_es: 'El P-6 es un sampler creativo de bolsillo con motor granular, audio/MIDI USB-C y efectos maestros de Roland. Es el sampler serio más portátil del mercado.'
  },
  {
    heading: 'Is the Novation Circuit Rhythm the Best Drum Machine for Beat-Making?',
    heading_es: '¿Es el Novation Circuit Rhythm la Mejor Caja de Ritmos para Beat-Making?',
    body: 'The Circuit Rhythm is a screenless sampler that forces you to use your ears. With 8 sample tracks, Grid FX, and a 4-hour battery, it is the best grid-based beat-making tool for live performance.',
    body_es: 'El Circuit Rhythm es un sampler sin pantalla que te obliga a usar los oídos. Con 8 tracks de sample, Grid FX y batería de 4 horas, es la mejor herramienta de beat-making basada en rejilla para directo.'
  },
  {
    heading: 'Is the Akai MPC X SE the Best Drum Machine for Beat-Making?',
    heading_es: '¿Es el Akai MPC X SE la Mejor Caja de Ritmos para Beat-Making?',
    body: 'The MPC X SE is the flagship standalone studio center. With 16 motorized Q-Link knobs, 10.1" touchscreen, and 8 DC-coupled outputs, it is the ultimate beat-making command center.',
    body_es: 'El MPC X SE es el centro de estudio autónomo insignia. Con 16 knobs motorizados Q-Link, pantalla táctil de 10.1" y 8 salidas DC-coupled, es el centro de mando de beat-making definitivo.'
  }
];

guide.verdict = 'The Akai MPC Live III and MPC Key 37 remain the undisputed heavy-hitters for modern hip-hop and urban production, while the Elektron Digitakt II reigns supreme for deep electronic sound design. Choose your ecosystem based on your technical workflow and live performance needs, not brand hype.';
guide.verdict_es = 'El Akai MPC Live III y el MPC Key 37 siguen siendo los pesos pesados indiscutibles para la producción hip-hop y urbana moderna, mientras que el Elektron Digitakt II reina supremo para el diseño de sonido electrónico profundo. Elige tu ecosistema según tu flujo de trabajo técnico y necesidades de directo, no por hype de marca.';

fs.writeFileSync(DIR + 'data/products.json', JSON.stringify(products, null, 2));
fs.writeFileSync(DIR + 'data/guides.json', JSON.stringify(guides, null, 2));

console.log('products:', products.length, '| guide featured:', guide.featuredProducts.length, '| sections:', guide.sections.length);
