const fs = require('fs');
const p = JSON.parse(fs.readFileSync('data/products.json','utf8'));

// Check if 414 already exists
if (!p.find(x => x.id === 414)) {
  p.push({
    id: 414,
    title: 'Allen & Heath SQ-6',
    title_es: 'Allen & Heath SQ-6',
    price: '$5,199',
    image: 'https://r2.gear4music.com/media/37/377293/1200/preview.jpg',
    category: 'studio',
    tags: ['digital mixer', '24-channel', 'allen heath', '96khz'],
    desc: '48-channel digital mixer with 32 mic/line inputs, 96-track recording, optional Dante card, and 9-inch touchscreen with full visual feedback.',
    desc_es: 'Mezcladora digital de 48 canales con 32 entradas mic/linea, grabacion de 96 pistas, tarjeta Dante opcional y pantalla tactil de 9 pulgadas con retroalimentacion visual completa.',
    stores: {
      amazon: 'https://www.amazon.com/dp/B0787FQ8T6',
      zzounds: '',
      reverb: 'https://reverb.com/marketplace?query=allen+heath+sq-6',
      andertons: '',
      gear4music: 'https://www.gear4music.com/Pro-Audio/Allen-and-Heath-SQ6-Digital-Mixer/3FGN',
      musicstore: 'https://www.musicstore.de/en_US/EUR/Allen-Heath-SQ-6/art-PRO0004452-000'
    },
    priceGBP: '£4,499',
    priceUSD: '$5,199'
  });
  console.log('Added SQ-6 (ID 414)');
} else {
  console.log('SQ-6 already exists');
}

// Also add Avantis Solo, DM7, SQ-7
const newProducts = [
  {
    id: 415,
    title: 'Allen & Heath Avantis Solo',
    title_es: 'Allen & Heath Avantis Solo',
    price: '$8,999',
    image: 'https://www.allen-heath.com/content/uploads/2024/05/Avantis-Solo-Right-1200x675.png',
    category: 'studio',
    tags: ['digital mixer', '24-channel', 'allen heath', 'premium'],
    desc: '64-channel digital mixer with 42 mic/line inputs, dual-core SHARC processing, 12-inch capacitive touchscreen, 96kHz FPGA audio engine, and 32 built-in FX racks.',
    desc_es: 'Mezcladora digital de 64 canales con 42 entradas mic/linea, procesamiento dual SHARC, pantalla tactil capacitiva de 12 pulgadas, motor de audio FPGA a 96 kHz y 32 racks de efectos incorporados.',
    stores: { amazon: '', zzounds: '', reverb: 'https://reverb.com/marketplace?query=allen+heath+avantis+solo', andertons: '', gear4music: '', musicstore: 'https://www.musicstore.de/en_US/EUR/Allen-Heath-Avantis-Solo/art-PRO0004453-000' },
    priceGBP: '£6,240',
    priceUSD: '$8,999'
  },
  {
    id: 416,
    title: 'Yamaha DM7',
    title_es: 'Yamaha DM7',
    price: '$25,490',
    image: 'https://thumbs.static-thomann.de/thumb//bdbmagic/pics/prod/568877.jpg',
    category: 'studio',
    tags: ['digital mixer', '32-channel', 'yamaha', 'premium'],
    desc: '72-channel digital mixer with 32 mic/line inputs, 48-bit float processing, 192kHz sampling rate, Dante built-in, and dual 12.1-inch capacitive touchscreens.',
    desc_es: 'Mezcladora digital de 72 canales con 32 entradas mic/linea, procesamiento de 48 bits float, muestreo a 192 kHz, Dante integrado y dos pantallas tactiles capacitivas de 12,1 pulgadas.',
    stores: { amazon: 'https://www.amazon.com/dp/B0DFZGQV8K', zzounds: '', reverb: 'https://reverb.com/marketplace?query=yamaha+dm7', andertons: '', gear4music: '', musicstore: 'https://www.musicstore.de/en_US/EUR/Yamaha-DM7/art-PRO0004454-000' },
    priceGBP: '£24,390',
    priceUSD: '$25,490'
  },
  {
    id: 417,
    title: 'Allen & Heath SQ-7',
    title_es: 'Allen & Heath SQ-7',
    price: '$5,999',
    image: 'https://r2.gear4music.com/media/37/377273/1200/preview.jpg',
    category: 'studio',
    tags: ['digital mixer', '32-channel', 'allen heath', '96khz'],
    desc: '48-channel digital mixer with 48 mic/line inputs, 96-track recording, optional Dante card, and 7-inch capacitive touchscreen.',
    desc_es: 'Mezcladora digital de 48 canales con 48 entradas mic/linea, grabacion de 96 pistas, tarjeta Dante opcional y pantalla tactil capacitiva de 7 pulgadas.',
    stores: { amazon: 'https://www.amazon.com/dp/B0787G5G8B', zzounds: '', reverb: 'https://reverb.com/marketplace?query=allen+heath+sq-7', andertons: '', gear4music: 'https://www.gear4music.com/Pro-Audio/Allen-and-Heath-SQ7-Digital-Mixer/3FMZ', musicstore: 'https://www.musicstore.de/en_US/EUR/Allen-Heath-SQ-7/art-PRO0004455-000' },
    priceGBP: '£5,249',
    priceUSD: '$5,999'
  }
];

newProducts.forEach(np => {
  if (!p.find(x => x.id === np.id)) {
    p.push(np);
    console.log('Added ' + np.title + ' (ID ' + np.id + ')');
  } else {
    console.log(np.title + ' already exists');
  }
});

fs.writeFileSync('data/products.json', JSON.stringify(p, null, 2), 'utf8');
console.log('Total products:', p.length);
