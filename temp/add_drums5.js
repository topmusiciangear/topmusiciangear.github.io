const fs = require('fs');
const DIR = 'C:/Users/Daniel/projects/topmusiciangear/';
const awin = (mid, clean) => `https://www.awin1.com/cread.php?awinmid=${mid}&awinaffid=2891111&ued=${encodeURIComponent(clean)}`;

// ================= PRODUCTS 610-614 =================
const P = JSON.parse(fs.readFileSync(DIR + 'data/products.json', 'utf8'));
function addPr(o) { if (P.some(p => p.id === o.id)) throw new Error(o.id + ' exists'); P.push(o); }
addPr({ id: 610, title: 'Roland AIRA Compact T-8', title_es: 'Roland AIRA Compact T-8', brand: 'Roland', category: 'groovebox', price: 199, rating: 4.6, reviews: 850, badge: 'bestSeller',
  desc: 'Pocket ACB beat machine: 808/909/606 drums plus TB-303 bass across 6+1 tracks, 64 patterns and 4.5-hour battery. Genuine Roland sound on the train.',
  desc_es: 'Caja de ritmos ACB de bolsillo: baterías 808/909/606 más bajo TB-303 en 6+1 pistas, 64 patrones y 4,5 h de batería. Sonido Roland genuino en el tren.',
  img: 'https://m.media-amazon.com/images/I/71JTv9j0UmL._AC_SL1500_.jpg',
  stores: {
    gear4music: awin(1117, 'https://www.gear4music.com/Recording-and-Computers/Roland-Aira-Compact-T-8-Beat-Machine/4TXY'),
    amazon: 'https://www.amazon.com/dp/B0B11K62XF',
    andertons: 'https://www.andertons.co.uk/roland-t-8-aira-compact-beat-machine'
  } });
addPr({ id: 611, title: 'Akai MPC One+', title_es: 'Akai MPC One+', brand: 'Akai', category: 'groovebox', price: 699, rating: 4.7, reviews: 600, badge: 'legend',
  desc: 'Standalone hip-hop brain: 16 RGB pads, 7-inch touch screen, 128 MIDI + 8 audio tracks, plugin synths and 100+ AIR FX. Finish songs with no computer.',
  desc_es: 'Cerebro hip-hop autónomo: 16 pads RGB, pantalla táctil de 7 pulgadas, 128 pistas MIDI + 8 de audio, sintes plugin y más de 100 efectos AIR. Termina canciones sin ordenador.',
  img: 'https://m.media-amazon.com/images/I/712a8VRxlWL._AC_SL1500_.jpg',
  stores: {
    gear4music: awin(1117, 'https://www.gear4music.com/Recording-and-Computers/Akai-Professional-MPC-One-Plus-Standalone-Music-Production-Centre/5MUP'),
    amazon: 'https://www.amazon.com/dp/B0C3RN1RTS',
    zzounds: 'https://www.zzounds.com/a--925521/item--AKAMPCONEPLUS'
  } });
addPr({ id: 612, title: 'Elektron Syntakt', title_es: 'Elektron Syntakt', brand: 'Elektron', category: 'groovebox', price: 1099, rating: 4.8, reviews: 1500, badge: 'premium',
  desc: '12-track hybrid drum computer: 8 digital + 4 analog tracks, 37 machines, 64-step sequencer with parameter locks and song mode. Analog punch meets FM weirdness.',
  desc_es: 'Caja híbrida de 12 pistas: 8 digitales + 4 analógicas, 37 máquinas, secuenciador de 64 pasos con parameter locks y modo canción. Pegada analógica con rarezas FM.',
  img: 'https://m.media-amazon.com/images/I/61GgFrb1a4L._AC_SL1500_.jpg',
  stores: {
    gear4music: awin(1117, 'https://www.gear4music.com/Recording-and-Computers/Elektron-Syntakt-Drum-Machine-and-Synthesizer/4S5G'),
    musicstore: 'https://www.musicstore.com/en_OE/EUR/Elektron-Syntakt/art-SYN0008237-000',
    amazon: 'https://www.amazon.com/dp/B09YPSR8N5',
    andertons: 'https://www.andertons.co.uk/elektron-syntakt-drum-computer-synthesiser/',
    zzounds: 'https://www.zzounds.com/a--925521/item--ELKSYNTAKT'
  } });
addPr({ id: 613, title: 'Erica Synths Perkons HD-01', title_es: 'Erica Synths Perkons HD-01', brand: 'Erica Synths', category: 'groovebox', price: 1999, rating: 4.8, reviews: 120, badge: 'premium',
  desc: '4-voice hybrid techno beast: digital engines through per-voice analog filters, BBD delay, 64 kits and a knob-per-function panel the size of a suitcase. The modern techno grail.',
  desc_es: 'Bestia techno híbrida de 4 voces: motores digitales con filtros analógicos por voz, delay BBD, 64 kits y un panel de un mando por función tamaño maleta. El santo grial del techno moderno.',
  img: 'https://m.media-amazon.com/images/I/81mD00bJmhL._AC_SL1500_.jpg',
  stores: {
    gear4music: awin(1117, 'https://www.gear4music.com/Recording-and-Computers/Erica-Synths-Perkons-HD-01-Black-Edition/6JZV'),
    musicstore: 'https://www.musicstore.com/en_OE/EUR/Erica-Synths-Perkons-HD-01-Black/art-SYN0007991-001',
    amazon: 'https://www.amazon.com/dp/B0CFVZNN89'
  } });
addPr({ id: 614, title: 'Arturia DrumBrute Impact', title_es: 'Arturia DrumBrute Impact', brand: 'Arturia', category: 'groovebox', price: 349, rating: 4.7, reviews: 900, badge: 'bestSeller',
  desc: '10 pure analog voices with per-instrument Color drive, 64-step polyrhythmic sequencer and master distortion. Instant aggressive beats with zero menus.',
  desc_es: '10 voces totalmente analógicas con Color por instrumento, secuenciador polirrítmico de 64 pasos y distorsión master. Beats agresivos instantáneos sin menús.',
  img: 'https://m.media-amazon.com/images/I/61YYUmzMpwL._AC_SL1500_.jpg',
  stores: {
    gear4music: awin(1117, 'https://www.gear4music.com/Keyboards-and-Pianos/Arturia-Drumbrute-Impact/2LG7'),
    musicstore: 'https://www.musicstore.com/en_OE/EUR/Arturia-Drumbrute-Impact/art-SYN0006599-000',
    amazon: 'https://www.amazon.com/dp/B07FPYBVHP',
    andertons: 'https://www.andertons.co.uk/arturia-drumbrute-impact/',
    zzounds: 'https://www.zzounds.com/a--925521/item--ARADRUMBRUTEIMP'
  } });
fs.writeFileSync(DIR + 'data/products.json', JSON.stringify(P, null, 2) + '\n');
console.log('products 610-614 added');

// ================= TEST_SHOP_BTN =================
let bg = fs.readFileSync(DIR + 'build-guides.js', 'utf8');
[610, 611, 612, 613, 614].forEach(id => { if (bg.includes('  ' + id + ': {')) throw new Error(id + ' TEST exists'); });
const anchor = '  609: {';
if (!bg.includes(anchor)) throw new Error('609 anchor missing');
const entries =
`  610: {
    prices: {
      andertons: "£177.00"
    },
    urls: {
      amazon: "https://www.amazon.com/dp/B0B11K62XF",
      gear4music: "https://www.gear4music.com/Recording-and-Computers/Roland-Aira-Compact-T-8-Beat-Machine/4TXY"
    },
    oos: [
      "andertons"
    ]
  },
  611: {
    urls: {
      amazon: "https://www.amazon.com/dp/B0C3RN1RTS",
      zzounds: "https://www.zzounds.com/a--925521/item--AKAMPCONEPLUS",
      gear4music: "https://www.gear4music.com/Recording-and-Computers/Akai-Professional-MPC-One-Plus-Standalone-Music-Production-Centre/5MUP"
    },
    oos: [
      "gear4music"
    ]
  },
  612: {
    prices: {
      gear4music: "£922.00",
      andertons: "£799.00",
      musicstore: "€997.00"
    },
    urls: {
      amazon: "https://www.amazon.com/dp/B09YPSR8N5",
      zzounds: "https://www.zzounds.com/a--925521/item--ELKSYNTAKT"
    },
    oos: [
      "andertons"
    ]
  },
  613: {
    prices: {
      gear4music: "£1,649.00",
      musicstore: "€1,789.00"
    },
    urls: {
      amazon: "https://www.amazon.com/dp/B0CFVZNN89"
    }
  },
  614: {
    prices: {
      andertons: "£222.00",
      zzounds: "$299.00",
      gear4music: "£256.00",
      musicstore: "€255.00"
    },
    urls: {
      amazon: "https://www.amazon.com/dp/B07FPYBVHP"
    }
  },
`;
bg = bg.replace(anchor, entries + anchor);
fs.writeFileSync(DIR + 'build-guides.js', bg);
console.log('TEST 610-614 added');
