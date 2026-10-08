const fs = require('fs');
const DIR = 'C:/Users/Daniel/projects/topmusiciangear/';
const awin = (mid, clean) => `https://www.awin1.com/cread.php?awinmid=${mid}&awinaffid=2891111&ued=${encodeURIComponent(clean)}`;
function assertEq(a, b, w) { if (a !== b) throw new Error('ASSERT ' + w + '\nGOT: ' + JSON.stringify(a) + '\nEXP: ' + JSON.stringify(b)); }

// 1. products.json: 609 M20x
const P = JSON.parse(fs.readFileSync(DIR + 'data/products.json', 'utf8'));
if (!P.some(p => p.id === 609)) {
P.push({
  id: 609,
  title: 'Audio-Technica ATH-M20x',
  title_es: 'Audio-Technica ATH-M20x',
  brand: 'Audio-Technica',
  category: 'headphones',
  price: 59,
  rating: 4.6,
  reviews: 27275,
  badge: 'bestSeller',
  desc: 'The entry to the M-Series: closed-back 40mm drivers, 47-ohm impedance and a fixed 3 m cable at an unbeatable price. The first serious pair for podcasters and beginners.',
  desc_es: 'La entrada a la serie M: cerrados de 40 mm, impedancia de 47 ohmios y cable fijo de 3 m a precio imbatible. El primer par serio para podcasters y principiantes.',
  img: 'https://r2.gear4music.com/media/8/86372/1200/preview_1.jpg',
  stores: {
    gear4music: awin(1117, 'https://www.gear4music.com/Recording-and-Computers/Audio-Technica-ATH-M20x-Professional-Monitor-Headphones/X9B'),
    amazon: 'https://www.amazon.com/dp/B00HVLUR18',
    andertons: 'https://www.andertons.co.uk/audio-technica-ath-m20x-pro-studio-monitor-headphones-pathm20-x-1/',
    zzounds: 'https://www.zzounds.com/a--925521/item--AUTATHM20X'
  }
});
}
fs.writeFileSync(DIR + 'data/products.json', JSON.stringify(P, null, 2) + '\n');
console.log('609 ensured');

// 2. TEST 609
let bg = fs.readFileSync(DIR + 'build-guides.js', 'utf8');
if (bg.includes('  609: {')) throw new Error('609 TEST exists');
const i608 = bg.indexOf('  608: {');
if (i608 < 0) throw new Error('608 anchor missing');
const nb = '  609: {\r\n    prices: {\r\n      amazon: "$59.00",\r\n      gear4music: "£48.00",\r\n      andertons: "£48.00"\r\n    },\r\n    urls: {\r\n      zzounds: "https://www.zzounds.com/a--925521/item--AUTATHM20X"\r\n    },\r\n    oos: [\r\n      "andertons"\r\n    ]\r\n  },\r\n';
bg = bg.slice(0, i608) + nb + bg.slice(i608);
fs.writeFileSync(DIR + 'build-guides.js', bg);
console.log('609 TEST added (escapes intentional: file is parsed as JS, \\u00A3 = £)');
