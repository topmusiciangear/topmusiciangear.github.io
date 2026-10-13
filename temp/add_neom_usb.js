var fs = require('fs');
var BASE = 'C:/Users/Daniel/projects/topmusiciangear/';

// ==========================================
// 1. ADD sE NEOM USB to products.json (id 670)
// ==========================================
var p = JSON.parse(fs.readFileSync(BASE + 'data/products.json', 'utf8'));
var has670 = p.some(function(x){return x.id===670});
if (!has670) {
  p.push({
    id: 670,
    title: 'sE Electronics NEOM USB',
    title_es: 'sE Electronics NEOM USB',
    brand: 'sE Electronics',
    category: 'microphones',
    price: 169,
    rating: 4.5,
    badge: 'bestSeller',
    desc: 'USB-C cardioid condenser with 16mm capsule, 24-bit/192kHz conversion, and three independent analog controls on the mic body: Gain, Headphone Volume, and Playback Mix. Zero-latency monitoring, mute button with LED, sturdy metal desktop stand included. Plug-and-play on Mac, Windows, iOS, Android. The missing link for streamers who want hardware mixer control without a separate interface.',
    desc_es: 'Condensador cardioide USB-C con cápsula de 16mm, conversión 24-bit/192kHz y tres controles analógicos independientes en el cuerpo: Ganancia, Volumen de Auriculares y Mezcla de Reproducción. Monitorización sin latencia, botón mute con LED, soporte metálico de escritorio incluido. Plug-and-play en Mac, Windows, iOS, Android. El eslabón perdido para streamers que quieren control de mezclador en hardware sin interfaz aparte.',
    img: 'https://imgcdn.seelectronics.com/cdn-cgi/imagedelivery/g65XQ1NFDxpPR_G3NFTuoA/02cf0ed9-255e-48ca-d7c3-0f0269735200/w=1509,h=1080',
    stores: {
      amazon: 'https://www.amazon.com/dp/B09QZKXKQ3',
      gear4music: 'https://www.awin1.com/cread.php?awinmid=1117&awinaffid=2891111&ued=https%3A%2F%2Fwww.gear4music.com%2FRecording-and-Computers%2FsE-Electronics-NEOM-USB%2FGBX',
      andertons: 'https://www.andertons.co.uk/se-electronics-neom-usb-microphone/',
      musicstore: 'https://www.musicstore.com/en_OE/EUR/sE-Electronics-NEOM-USB/art-REC0018000-000',
      zzounds: 'https://www.zzounds.com/item--SEENEOMUSB'
    },
    oos: []
  });
  p.sort(function(a,b){return a.id-b.id});
  fs.writeFileSync(BASE + 'data/products.json', JSON.stringify(p, null, 2));
  console.log('Product 670 added');
} else { console.log('Product 670 already exists'); }

// ==========================================
// 2. ADD TEST_SHOP_BTN entry in build-guides.js
// ==========================================
var b = fs.readFileSync(BASE + 'build-guides.js', 'utf8');
var anchor = '\n  669: {';
var idx = b.indexOf(anchor);
if (idx === -1) { console.log('ANCHOR 669 NOT FOUND'); process.exit(1); }
var braceStart = b.indexOf('{', idx);
var depth = 0, k = braceStart;
while (k < b.length) {
  if (b[k] === '{') depth++;
  else if (b[k] === '}') { depth--; if (depth === 0) break; }
  k++;
}
var insertPoint = k + 1;
if (b[insertPoint] === ',') insertPoint++;
var entry = '\n  670: {\n    prices: {\n      amazon: "$169.00",\n      zzounds: "$169.00",\n      andertons: "£139.00",\n      gear4music: "£139.00",\n      musicstore: "€159.00"\n    },\n    urls: {\n      gear4music: "https://www.gear4music.com/Recording-and-Computers/sE-Electronics-NEOM-USB/GBX",\n      andertons: "https://www.andertons.co.uk/se-electronics-neom-usb-microphone/"\n    }\n  },';
b = b.slice(0, insertPoint) + entry + b.slice(insertPoint);
fs.writeFileSync(BASE + 'build-guides.js', b);
console.log('TEST_SHOP_BTN 670 added');

// ==========================================
// 3. UPDATE usb-mics guide: replace HyperX QuadCast S (col 7, section 6) with NEOM USB
// ==========================================
var d = JSON.parse(fs.readFileSync(BASE + 'data/guides.json', 'utf8'));
var g = d.find(function (x) { return x.id === 'usb-mics'; });

// Replace column 7 (index 6) from HyperX QuadCast S to sE NEOM USB
g.productTable.columns[6] = { title: 'sE Electronics NEOM USB', title_es: 'sE Electronics NEOM USB' };

// Update section 6 (HyperX QuadCast S) to NEOM USB
g.sections[6] = {
  heading: 'sE Electronics NEOM USB: The Missing Link for Hardware Control',
  heading_es: 'sE Electronics NEOM USB: El eslabón perdido para control en hardware',
  content: '<p><strong>The sE Electronics NEOM USB solves the one thing most USB mics get wrong: hardware mixer control without a separate interface.</strong> Three independent analog knobs on the mic body — Gain, Headphone Volume, and Playback Mix — let you balance your voice against PC audio instantly, with zero latency and no software mixer to babysit. The 16mm cardioid condenser capsule delivers 24-bit/192kHz conversion with sE\'s signature warm, silky top-end that flatters voices without post-EQ.</p><p><strong>Built-in mute LED, sturdy metal desktop stand, USB-C connectivity.</strong> Plug-and-play on Mac, Windows, iOS, Android. The honest trade: no RGB, no DSP effects, no multi-pattern switching — just pure signal and the hardware mixer controls every streamer actually needs.</p>',
  content_es: '<p><strong>El sE Electronics NEOM USB resuelve la única cosa que la mayoría de micros USB fallan: control de mezclador en hardware sin interfaz aparte.</strong> Tres perillas analógicas independientes en el cuerpo del micro — Ganancia, Volumen de Auriculares y Mezcla de Reproducción — te dejan balancear tu voz contra el audio del PC al instante, con latencia cero y sin mezclador de software que vigilar. La cápsula condensadora cardioide de 16mm entrega conversión 24-bit/192kHz con el cálido y sedoso agudo característico de sE que favorece la voz sin ecualizar después.</p><p><strong>Mute LED integrado, soporte metálico de escritorio, conectividad USB-C.</strong> Plug-and-play en Mac, Windows, iOS, Android. El trato honesto: nada de RGB, ni efectos DSP, ni cambio de patrón polar — solo señal pura y el control de mezclador en hardware que todo streamer necesita de verdad.</p>',
  products: [670]
};

// Update featuredProducts: replace HyperX QuadCast S (253) with NEOM USB (670)
g.featuredProducts = g.featuredProducts.map(function(id) { return id === 253 ? 670 : id; });

fs.writeFileSync(BASE + 'data/guides.json', JSON.stringify(d, null, 2));
console.log('Guide updated: col 7 replaced, section 6 replaced, featuredProducts updated');
console.log('Featured:', g.featuredProducts);
console.log('Section 6:', g.sections[6].heading);