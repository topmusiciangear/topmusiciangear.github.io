var fs = require('fs');
var BASE = 'C:/Users/Daniel/projects/topmusiciangear/';

// ==========================================
// 1. ADD Samson G-Track Pro to products.json (id 671)
// ==========================================
var p = JSON.parse(fs.readFileSync(BASE + 'data/products.json', 'utf8'));

if (!p.some(function(x){return x.id===671})) {
  p.push({
    id: 671,
    title: 'Samson G-Track Pro',
    title_es: 'Samson G-Track Pro',
    brand: 'Samson',
    category: 'microphones',
    price: 149,
    rating: 4.5,
    badge: 'bestSeller',
    desc: 'Large-diaphragm condenser USB microphone with built-in 2-in/2-out audio interface. 1-inch capsule, selectable polar patterns (Cardioid, Omnidirectional, Bidirectional), 1/4" instrument input, 1/4" line output, 24-bit/96kHz resolution. Zero-latency headphone monitoring, desktop stand included. USB-C connectivity. The ultimate desktop versatility: mic + interface in one.',
    desc_es: 'Micrófono condensador USB de diafragma grande con interfaz de audio 2-in/2-out integrada. Cápsula de 1 pulgada, patrones polares seleccionables (Cardioide, Omnidireccional, Bidireccional), entrada de instrumento 1/4", salida de línea 1/4", resolución 24-bit/96kHz. Monitorización por auriculares sin latencia, soporte de escritorio incluido. Conectividad USB-C. La máxima versatilidad de escritorio: micrófono + interfaz en uno.',
    img: 'https://r2.gear4music.com/media/28/286741/1200/preview.jpg',
    stores: {
      amazon: 'https://www.amazon.com/dp/B07PQ3XQ9X',
      gear4music: 'https://www.awin1.com/cread.php?awinmid=1117&awinaffid=2891111&ued=https%3A%2F%2Fwww.gear4music.com%2FPA-DJ-and-Lighting%2FSamson-G-Track-Pro-USB-Microphone%2F3YD5',
      andertons: 'https://www.andertons.co.uk/samson-g-track-pro-usb-microphone/',
      musicstore: 'https://www.musicstore.com/en_OE/EUR/Samson-G-Track-Pro/art-REC0017500-000',
      zzounds: 'https://www.zzounds.com/item--SAMSGTRACKPRO'
    },
    oos: []
  });
  p.sort(function(a,b){return a.id-b.id});
  fs.writeFileSync(BASE + 'data/products.json', JSON.stringify(p, null, 2));
  console.log('Product 671 Samson G-Track Pro added');
} else { console.log('Product 671 already exists'); }

// ==========================================
// 2. ADD TEST_SHOP_BTN entry in build-guides.js
// ==========================================
var b = fs.readFileSync(BASE + 'build-guides.js', 'utf8');
var anchor = '\n  670: {';
var idx = b.indexOf(anchor);
if (idx === -1) { console.log('ANCHOR 670 NOT FOUND'); process.exit(1); }
var braceStart = b.indexOf('{', idx);
var depth = 0, k = braceStart;
while (k < b.length) {
  if (b[k] === '{') depth++;
  else if (b[k] === '}') { depth--; if (depth === 0) break; }
  k++;
}
var insertPoint = k + 1;
if (b[insertPoint] === ',') insertPoint++;
var entry = '\n  671: {\n    prices: {\n      amazon: "$149.00",\n      zzounds: "$149.00",\n      andertons: "£129.00",\n      gear4music: "£129.00",\n      musicstore: "€149.00"\n    },\n    urls: {\n      gear4music: "https://www.gear4music.com/PA-DJ-and-Lighting/Samson-G-Track-Pro-USB-Microphone/3YD5",\n      andertons: "https://www.andertons.co.uk/samson-g-track-pro-usb-microphone/"\n    }\n  },';
b = b.slice(0, insertPoint) + entry + b.slice(insertPoint);
fs.writeFileSync(BASE + 'build-guides.js', b);
console.log('TEST_SHOP_BTN 671 added');

console.log('DONE - Product 671 created');