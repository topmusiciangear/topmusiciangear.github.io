const fs = require('fs');
const DIR = 'C:/Users/Daniel/projects/topmusiciangear/';
const awin = (mid, clean) => `https://www.awin1.com/cread.php?awinmid=${mid}&awinaffid=2891111&ued=${encodeURIComponent(clean)}`;

// ---------- 1. products.json: append 602 + 603 ----------
const P = JSON.parse(fs.readFileSync(DIR + 'data/products.json', 'utf8'));
if (P.some(p => p.id === 602 || p.id === 603)) throw new Error('602/603 already exist');
P.push({
  id: 602,
  title: 'Beyerdynamic DT 900 Pro X',
  title_es: 'Beyerdynamic DT 900 Pro X',
  brand: 'Beyerdynamic',
  category: 'headphones',
  price: 299,
  rating: 4.6,
  reviews: 1883,
  badge: 'bestSeller',
  desc: 'Open-back studio headphones with 48-ohm STELLAR.45 drivers that run loud and clean from any laptop, tablet or interface — no amp needed. Detailed spacious sound, detachable mini-XLR cables and velour pads. Handmade in Germany.',
  desc_es: 'Auriculares abiertos de estudio con drivers STELLAR.45 de 48 ohmios que suenan alto y limpio desde cualquier laptop, tablet o interfaz — sin amplificador. Sonido detallado y espacioso, cables desmontables mini-XLR y almohadillas de velour. Fabricados a mano en Alemania.',
  img: 'https://r2.gear4music.com/media/72/720825/1200/preview.jpg',
  stores: {
    gear4music: awin(1117, 'https://www.gear4music.com/Recording-and-Computers/beyerdynamic-DT-900-Pro-X-Open-Back-Headphones-48-Ohm/45L5'),
    musicstore: 'https://www.musicstore.com/en_OE/EUR/beyerdynamic-DT-900-Pro-X/art-REC0015730-000',
    amazon: 'https://www.amazon.com/dp/B09G777VG7',
    andertons: 'https://www.andertons.co.uk/beyerdynamic-dt900-pro-x-open-back-studio-headphones-for-critical-listening-mixing-mastering-48-ohm/',
    zzounds: 'https://www.zzounds.com/a--925521/item--BEYDT900PROX'
  }
});
P.push({
  id: 603,
  title: 'Beyerdynamic DT 1990 Pro MKII',
  title_es: 'Beyerdynamic DT 1990 Pro MKII',
  brand: 'Beyerdynamic',
  category: 'headphones',
  price: 599,
  rating: 4.8,
  reviews: 196,
  badge: 'premium',
  desc: 'Flagship open-back reference with 45mm TESLA.45 drivers at an easy 30 ohms. Two velour pad sets (Producing + Mixing & Mastering), tamed 8 kHz treble, detachable cables and hard case. Handmade in Germany.',
  desc_es: 'Referencia abierta insignia con drivers TESLA.45 de 45 mm y cómodos 30 ohmios. Dos juegos de almohadillas de velour (producción + mezcla y mastering), agudos de 8 kHz domados, cables desmontables y estuche rígido. Fabricados a mano en Alemania.',
  img: 'https://r2.gear4music.com/media/115/1159847/1200/preview.jpg',
  stores: {
    gear4music: awin(1117, 'https://www.gear4music.com/Recording-and-Computers/beyerdynamic-DT-1990-MKII-Pro-Open-Back-Headphones/6V8P'),
    musicstore: 'https://www.musicstore.com/en_OE/EUR/beyerdynamic-DT-1990-PRO-MKII/art-REC0016806-000',
    amazon: 'https://www.amazon.com/dp/B0DGTHKCZ3',
    andertons: 'https://www.andertons.co.uk/beyerdynamic-dt-1990-pro-mkii--open-back-premium-tesla-studio-headphones/',
    zzounds: 'https://www.zzounds.com/a--925521/item--BEYDT1990PROMKII'
  }
});
fs.writeFileSync(DIR + 'data/products.json', JSON.stringify(P, null, 2) + '\n');
console.log('products.json: 602 + 603 added');

// ---------- 2. TEST_SHOP_BTN in build-guides.js ----------
let bg = fs.readFileSync(DIR + 'build-guides.js', 'utf8');
const anchor = '  426: {';
if (!bg.includes(anchor)) throw new Error('anchor 426 not found');
const entries = `  602: {
    prices: {
      amazon: "$279.99",
      zzounds: "$319.99",
      andertons: "£219.00",
      gear4music: "£239.50",
      musicstore: "€229.00"
    }
  },
  603: {
    prices: {
      amazon: "$599.99",
      zzounds: "$649.99",
      andertons: "£475.00",
      gear4music: "£557.00"
    },
    urls: {
      musicstore: "https://www.musicstore.com/en_OE/EUR/beyerdynamic-DT-1990-PRO-MKII/art-REC0016806-000"
    }
  },
`;
bg = bg.replace(anchor, entries + anchor);
fs.writeFileSync(DIR + 'build-guides.js', bg);
console.log('build-guides.js: TEST_SHOP_BTN 602/603 added');
