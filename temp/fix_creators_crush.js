// mics-for-creators crush batch: new products 517/518 + BTN, 4 new rows,
// 2 new columns, 2 verdicts.
const fs = require('fs');
const P = JSON.parse(fs.readFileSync('data/products.json', 'utf8'));
const G = JSON.parse(fs.readFileSync('data/guides.json', 'utf8'));
const V = (value, value_es) => ({ value, value_es });
const YES = V('Yes', 'Sí'), NO = V('No', 'No'), NP = V('Not published', 'No publicado');

// ---------- 1. catalog: 2 new products ----------
const AWG = u => 'https://www.awin1.com/cread.php?awinmid=1117&awinaffid=2891111&ued=' + encodeURIComponent(u);
const AWS = u => 'https://www.awin1.com/cread.php?awinmid=63816&awinaffid=2891111&ued=' + encodeURIComponent(u);
if (!P.some(p => p.id === 517)) P.push(
  {
    id: 517, title: 'Audio-Technica AT2040USB', title_es: 'Audio-Technica AT2040USB',
    brand: 'Audio-Technica', category: 'microphones', price: 159, rating: 4.4, reviews: 251,
    desc: 'Dynamic USB microphone with hypercardioid pickup for focused creator voice. 24-bit/96kHz conversion, headphone jack with volume and mix control, silent touch mute, integrated shock mount and pop filter.',
    desc_es: 'Micrófono dinámico USB con captación hipercardioide para una voz enfocada. Conversión 24 bits/96 kHz, salida de auriculares con volumen y mezcla, silencio táctil, suspensión integrada y antipop.',
    img: 'https://r2.gear4music.com/media/94/941224/1200/preview.jpg',
    stores: {
      gear4music: AWG('https://www.gear4music.com/Recording-and-Computers/Audio-Technica-AT2040USB-Dynamic-Microphone/5NDI'),
      amazon: 'https://www.amazon.com/Audio-Technica-AT2040USB-Dynamic-Microphone-Black/dp/B0C2G4PGYS',
      zzounds: 'https://www.zzounds.com/item--AUDAT2040USB'
    },
    excludeStores: ['andertons', 'musicstore']
  },
  {
    id: 518, title: 'Blue Yeti USB Microphone', title_es: 'Blue Yeti USB Microphone',
    brand: 'Logitech', category: 'microphones', price: 129.99, rating: 4.7, reviews: 33108,
    desc: 'The classic multi-pattern USB mic: cardioid, omni, bidirectional and stereo from three 14mm capsules. 16-bit/48kHz plug-and-play with headphone volume, gain and mute on the body.',
    desc_es: 'El clásico micro USB multipatrón: cardioide, omni, bidireccional y estéreo desde tres cápsulas de 14 mm. Plug-and-play 16 bits/48 kHz con volumen de auriculares, ganancia y silencio en el cuerpo.',
    img: 'https://r2.gear4music.com/media/138/1381221/1200/preview.jpg',
    stores: {
      amazon: 'https://www.amazon.com/Blue-Microphones-Yeti-Microphone-Blackout/dp/B00N1YPXW2',
      gear4music: AWG('https://www.gear4music.com/Recording-and-Computers/Blue-Yeti-USB-Microphone/8453')
    },
    excludeStores: ['zzounds', 'andertons', 'musicstore']
  }
);
fs.writeFileSync('data/products.json', JSON.stringify(P, null, 2) + '\n');
console.log('catalogo: max id=' + Math.max(...P.map(p => p.id)));

// ---------- 2. BTN: entries 517/518 (brace-matched TEST_SHOP_BTN close) ----------
let b = fs.readFileSync('build-guides.js', 'utf8');
if (!b.includes('  517: {')) {
  const openAt = b.indexOf('TEST_SHOP_BTN');
  let d = 0, end = -1;
  for (let i = b.indexOf('{', openAt); i < b.length; i++) {
    if (b[i] === '{') d++;
    else if (b[i] === '}') { d--; if (d === 0) { end = i; break; } }
  }
  if (end < 0) throw new Error('map close not found');
  const EOL = '\r\n';
  const entry517 = '  517: {' + EOL + '    prices: {' + EOL + '      gear4music: "£135.50",' + EOL + '      amazon: "$159.00"' + EOL + '    },' + EOL + '    urls: {' + EOL + '      zzounds: "https://www.zzounds.com/item--AUDAT2040USB"' + EOL + '    }' + EOL + '  },' + EOL;
  const entry518 = '  518: {' + EOL + '    prices: {' + EOL + '      amazon: "$129.99"' + EOL + '    },' + EOL + '    urls: {' + EOL + '      gear4music: "https://www.gear4music.com/Recording-and-Computers/Blue-Yeti-USB-Microphone/8453"' + EOL + '    }' + EOL + '  },' + EOL;
  b = b.slice(0, end) + entry517 + entry518 + b.slice(end);
  fs.writeFileSync('build-guides.js', b);
  console.log('BTN 517/518 insertados en cierre real del mapa');
} else console.log('BTN 517/518 ya existen');

// ---------- 3. guide: cards, 4 new rows (11 cols), 2 cols, 2 verdicts ----------
const g = G.find(x => x.id === 'mics-for-creators');
if (!g.sections[0].products.includes(517)) g.sections[0].products.push(517, 518);
// Col order: MV7+ PodMicUSB QuadCast2 Wave3 AT2020USBX AT2020 Q2U AM8 PM461 TC777 NTUSBmini
const polar11 = ['Cardioid', 'Cardioid', 'Cardioid/Omni/Bi/Stereo', 'Cardioid', 'Cardioid', 'Cardioid', 'Cardioid', 'Cardioid', 'Cardioid', 'Cardioid', 'Cardioid'];
const fr11 = ['50Hz–16kHz', '50Hz–15kHz', '20Hz–20kHz', '70Hz–20kHz', '20Hz–20kHz', '20Hz–20kHz', '50Hz–15kHz', '50Hz–16kHz', '20Hz–20kHz', '100Hz–16kHz', '20Hz–20kHz'];
const bit11 = ['24-bit/48kHz', '24-bit/48kHz', '24-bit/96kHz', '24-bit/96kHz', '24-bit/96kHz', 'Analog XLR — interface decides', '16-bit/48kHz', '16-bit/48kHz', NP, '16-bit/44.1kHz', '24-bit/48kHz'];
const hp11 = [YES, YES, YES, NO, YES, NO, YES, YES, NO, NO, YES];
const es = s => s.replace(/Cardioid/g, 'Cardioide').replace(/Supercardioid/g, 'Supercardioide').replace(/Hypercardioid/g, 'Hipercardioide').replace(/Omni/g, 'Omni');
g.productTable.rows.push(
  { label: 'Polar Pattern', label_es: 'Patrón polar', values: polar11.map(s => V(s, es(s))) },
  { label: 'Frequency Response', label_es: 'Respuesta de frecuencia', values: fr11.map(s => (typeof s === 'string' ? V(s, s) : s)) },
  { label: 'Bit Depth / Sample Rate', label_es: 'Bits / Frecuencia de muestreo', values: bit11.map(s => (typeof s === 'string' ? V(s, s) : s)) },
  { label: 'Headphone Monitoring', label_es: 'Monitorización con auriculares', values: hp11 }
);
g.productTable.columns.push(
  { title: 'Audio-Technica AT2040USB', title_es: 'Audio-Technica AT2040USB' },
  { title: 'Blue Yeti USB Microphone', title_es: 'Blue Yeti USB Microphone' }
);
const rows = {};
g.productTable.rows.forEach(r => { rows[r.label] = r; });
const push2 = (label, a, b) => rows[label].values.push(a, b);
push2('Best For', V('Dynamic USB for noisy rooms', 'Dinámico USB para salas ruidosas'), V('Multi-pattern versatility', 'Versatilidad multipatrón'));
push2('Connection', V('USB-C', 'USB-C'), V('USB', 'USB'));
push2('Mic Type', V('Dynamic hypercardioid', 'Dinámico hipercardioide'), V('Condenser multi-pattern', 'Condensador multipatrón'));
push2('Recording', V('24-bit/96kHz', '24-bit/96kHz'), V('16-bit/48kHz', '16-bit/48kHz'));
push2('Polar Pattern', V('Hypercardioid', 'Hipercardioide'), V('Cardioid/Omni/Bi/Stereo', 'Cardioide/Omni/Bi/Estéreo'));
push2('Frequency Response', V('80Hz–16kHz', '80Hz–16kHz'), V('20Hz–20kHz', '20Hz–20kHz'));
push2('Bit Depth / Sample Rate', V('24-bit/96kHz', '24-bit/96kHz'), V('16-bit/48kHz', '16-bit/48kHz'));
push2('Headphone Monitoring', YES, YES);
if (!g.verdictProsCons.some(v => v.name === 'Audio-Technica AT2040USB')) g.verdictProsCons.push(
  { name: 'Audio-Technica AT2040USB', name_es: 'Audio-Technica AT2040USB',
    pros: ['Hypercardioid pattern rejects room and fan noise', '24-bit/96kHz with headphone volume and mix control', 'Shock mount and pop filter built in, silent touch mute', 'Broadcast AT2040 sound with no interface needed'],
    cons: ['USB-only with no XLR upgrade path', '80Hz low end thins deep voices', '600g body needs a sturdy arm', '$159 costs double the Q2U'],
    pros_es: ['El hipercardioide rechaza sala y ventilador', '24 bits/96 kHz con volumen de auriculares y mezcla', 'Suspensión y antipop integrados, silencio táctil', 'Sonido broadcast AT2040 sin interfaz'],
    cons_es: ['Solo USB, sin ruta a XLR', 'Los 80Hz adelgazan voces profundas', 'El cuerpo de 600 g pide un brazo sólido', '$159 cuesta el doble que el Q2U'] },
  { name: 'Blue Yeti USB Microphone', name_es: 'Blue Yeti USB Microphone',
    pros: ['Four patterns in one mic for any scenario', 'Headphone volume, gain and mute on the body', '16-bit/48kHz plug-and-play on any system', 'Most reviewed USB mic ever — proven by millions'],
    cons: ['Large heavy body dominates desks', '16-bit ceiling in a 24-bit world', 'Cardioid picks up room versus dynamics', 'VO!CE effects need G Hub software'],
    pros_es: ['Cuatro patrones en un micro para cada caso', 'Volumen de auriculares, ganancia y silencio en el cuerpo', 'Plug-and-play 16 bits/48 kHz en cualquier sistema', 'El USB más reseñado de la historia — probado'],
    cons_es: ['El cuerpo grande y pesado domina escritorios', 'Techo de 16 bits en un mundo de 24 bits', 'El cardioide capta sala frente a dinámicos', 'Los efectos VO!CE necesitan G Hub'] }
);
g.verdict += ' AT2040USB for noisy rooms, Yeti for multi-pattern flexibility.';
g.verdict_es += ' AT2040USB para salas ruidosas, Yeti para flexibilidad multipatrón.';
g.conclusion = g.conclusion.replace("XLR is only needed if you're doing professional recording.",
  "XLR is only needed if you're doing professional recording. Need maximum isolation in a noisy room? The AT2040USB hypercardioid pattern helps. Want four mics in one? The Yeti covers cardioid, omni, bidirectional and stereo.");
g.conclusion_es = g.conclusion_es.replace('XLR solo se necesita si estás haciendo grabación profesional.',
  'XLR solo es necesario si haces grabación profesional. ¿Necesitas máximo aislamiento en una sala ruidosa? El hipercardioide del AT2040USB ayuda. ¿Quieres cuatro micros en uno? El Yeti cubre cardioide, omni, bidireccional y estéreo.');
fs.writeFileSync('data/guides.json', JSON.stringify(G, null, 2));
const gg = JSON.parse(fs.readFileSync('data/guides.json', 'utf8')).find(x => x.id === 'mics-for-creators');
const union = [...new Set(gg.sections.flatMap(s => s.products))];
console.log('cards=' + union.length + ' cols=' + gg.productTable.columns.length + ' verdict=' + gg.verdictProsCons.length +
  ' rowsok=' + gg.productTable.rows.every(r => r.values.length === gg.productTable.columns.length));
