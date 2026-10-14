const fs = require('fs');
const BASE = 'C:/Users/Daniel/projects/topmusiciangear/';
const pj = BASE + 'data/products.json';
const P = JSON.parse(fs.readFileSync(pj, 'utf8'));
const arr = Array.isArray(P) ? P : P.products;

// 0. Fix precio 652
const p652 = arr.find(p => p.id === 652);
p652.price = 269;
console.log('652 precio -> 269');

// 1. Tres productos nuevos (imagenes TEMPORALES hasta que el usuario envie las de G4M)
const nuevos = [
  {
    id: 672,
    title: 'Lewitt LCT 240 PRO',
    title_es: 'Lewitt LCT 240 PRO',
    brand: 'Lewitt',
    category: 'microphones',
    price: 149,
    rating: 4.6,
    reviews: 604,
    desc: 'Cardioid XLR condenser for home recording with 17mm capsule, 20Hz-20kHz response, 16.7 mV/Pa sensitivity, 19 dB-A self-noise and 142dB max SPL. Mount, windscreen and bag included; needs 48V phantom power.',
    desc_es: 'Condensador XLR cardioide para grabar en casa con cápsula de 17 mm, respuesta 20Hz-20kHz, 16,7 mV/Pa, 19 dB-A de ruido propio y 142dB SPL máximo. Soporte, antipop y funda incluidos; necesita phantom 48V.',
    img: 'https://d2pucgucjvdva3.cloudfront.net/sites/default/files/styles/max_720x720/public/shopimages/Webshop_LCT240PROBLACK_2560x2560_B.jpg',
    stores: {
      amazon: 'https://www.amazon.com/dp/B072F5J32C',
      zzounds: 'https://www.zzounds.com/item--LEWLCT240PRO',
      musicstore: 'https://www.musicstore.com/en_OE/EUR/Lewitt-LCT-240-Pro-Black-/art-REC0013523-000'
    },
    excludeStores: ['gear4music', 'andertons', 'reverb']
  },
  {
    id: 673,
    title: 'Aston Microphones Origin',
    title_es: 'Aston Microphones Origin',
    brand: 'Aston Microphones',
    category: 'microphones',
    price: 269,
    rating: 4.6,
    reviews: 337,
    desc: 'British large-diaphragm cardioid condenser with hand-selected 1-inch capsule, transformerless circuitry, 20Hz-20kHz response, 127dB max SPL, -10dB pad and bass roll-off. Wave-form mesh head with built-in pop filter; needs 48V phantom power.',
    desc_es: 'Condensador británico de diafragma grande, cardioide, con cápsula seleccionada de 1 pulgada, circuito sin transformador, respuesta 20Hz-20kHz, 127dB SPL máximo, pad de -10dB y corte de graves. Cabezal wave-form con antipop integrado; necesita phantom 48V.',
    img: 'https://f2c-cdn.empowertribe.com/aston-microphones/Musicradaroriginreview1copy_0181c7635b.jpg',
    stores: {
      gear4music: 'https://www.gear4music.com/Recording-and-Computers/Aston-Microphones-Origin-Cardioid-Condenser-Microphone/1F3F',
      amazon: 'https://www.amazon.com/dp/B019RVU0C0',
      zzounds: 'https://www.zzounds.com/item--ASTORIGIN'
    },
    excludeStores: ['musicstore', 'andertons', 'reverb']
  },
  {
    id: 674,
    title: 'Neumann TLM 102',
    title_es: 'Neumann TLM 102',
    brand: 'Neumann',
    category: 'microphones',
    price: 699,
    desc: 'Neumann most affordable large-diaphragm condenser: cardioid, 20Hz-20kHz, 11 mV/Pa sensitivity, 12 dB-A self-noise, 144dB max SPL and 132dB dynamic range. Transformerless circuit with gentle 10kHz lift and integrated pop screen; needs 48V phantom power.',
    desc_es: 'El condensador de diafragma grande más asequible de Neumann: cardioide, 20Hz-20kHz, 11 mV/Pa, 12 dB-A de ruido propio, 144dB SPL máximo y 132dB de rango dinámico. Circuito sin transformador con realce suave a 10kHz y antipop integrado; necesita phantom 48V.',
    img: 'https://assets.sennheiser.com/assets/TLM-102-with-SG2_Neumann-Studio-Microphone_M.png/Zz1kNzk4ZWM5YWU3YWIxMWYwYjk1OWNlM2Q3NWM0MGYwNw==?height=150&format=webp&quality=80',
    stores: {
      gear4music: 'https://www.gear4music.com/Recording-and-Computers/Neumann-TLM-102-Condenser-Microphone-Black/C56',
      amazon: 'https://www.amazon.com/dp/B003HGLPC6',
      zzounds: 'https://www.zzounds.com/item--NEUTLM102',
      musicstore: 'https://www.musicstore.com/en_OE/EUR/Neumann-TLM-102-Studio-Microphone-Nickel/art-REC0007197-000'
    },
    excludeStores: ['andertons', 'reverb']
  }
];

nuevos.forEach(n => {
  if (arr.some(p => p.id === n.id)) { console.log(n.id + ' ya existe, salto'); return; }
  arr.push(n);
  console.log(n.id + ' ' + n.title + ' anadido ($' + n.price + ')');
});
fs.writeFileSync(pj, JSON.stringify(P, null, 2));

// 2. TEST_SHOP_BTN: 672, 673, 674 + actualizar 652
const bj = BASE + 'build-guides.js';
let src = fs.readFileSync(bj, 'utf8');
const ini = src.indexOf('const TEST_SHOP_BTN');
const abre = src.indexOf('{', ini);
let depth = 0, i = abre, modo = null, esc = false, cierra = -1;
for (; i < src.length; i++) {
  const c = src[i], n = src[i + 1];
  if (modo === 'linea') { if (c === '\n') modo = null; continue; }
  if (modo === 'bloque') { if (c === '*' && n === '/') { modo = null; i++; } continue; }
  if (modo) {
    if (esc) { esc = false; continue; }
    if (c === '\\') { esc = true; continue; }
    if (c === modo) modo = null;
    continue;
  }
  if (c === '/' && n === '/') { modo = 'linea'; i++; continue; }
  if (c === '/' && n === '*') { modo = 'bloque'; i++; continue; }
  if (c === '"' || c === "'" || c === '`') { modo = c; continue; }
  if (c === '{') depth++;
  else if (c === '}') { depth--; if (depth === 0) { cierra = i; break; } }
}
let block = src.slice(abre, cierra + 1);
const lines = block.split(/\r?\n/);
function findEntry(num) {
  let s = -1, e = -1;
  for (let k = 0; k < lines.length; k++) {
    if (lines[k] && lines[k].trim().startsWith(num + ': {')) { s = k; break; }
  }
  if (s === -1) return null;
  let d = 0, started = false;
  for (let k = s; k < lines.length; k++) {
    const line = lines[k];
    if (!line) continue;
    for (const ch of line) {
      if (ch === '{') { d++; started = true; }
      else if (ch === '}') { d--; if (started && d === 0) { e = k; break; } }
    }
    if (e > -1) break;
  }
  return { s, e };
}
// 652: MS 264 -> 268
const e652 = findEntry('652');
if (e652) {
  for (let k = e652.s; k <= e652.e; k++) {
    if (lines[k].includes('€264.00')) { lines[k] = lines[k].split('€264.00').join('€268.00'); console.log('652 MS -> €268.00'); }
  }
}
// Nuevas entradas al final del bloque (antes del cierre)
let lastS = -1, lastE = -1;
for (let k = lines.length - 1; k >= 0; k--) {
  if (lines[k] && /^\s*\d+: \{/.test(lines[k].trim())) {
    const r = findEntry(lines[k].trim().split(':')[0]);
    if (r) { lastS = r.s; lastE = r.e; break; }
  }
}
const nuevas = [
  '  672: {',
  '    prices: {',
  '      zzounds: "$129.00",',
  '      musicstore: "€132.30"',
  '    },',
  '    urls: {',
  '      amazon: "https://www.amazon.com/dp/B072F5J32C",',
  '      zzounds: "https://www.zzounds.com/item--LEWLCT240PRO",',
  '      musicstore: "https://www.musicstore.com/en_OE/EUR/Lewitt-LCT-240-Pro-Black-/art-REC0013523-000"',
  '    }',
  '  },',
  '  673: {',
  '    prices: {',
  '      gear4music: "£198.25"',
  '    },',
  '    urls: {',
  '      gear4music: "https://www.gear4music.com/Recording-and-Computers/Aston-Microphones-Origin-Cardioid-Condenser-Microphone/1F3F",',
  '      amazon: "https://www.amazon.com/dp/B019RVU0C0",',
  '      zzounds: "https://www.zzounds.com/item--ASTORIGIN"',
  '    }',
  '  },',
  '  674: {',
  '    prices: {',
  '      zzounds: "$799.00",',
  '      gear4music: "£599.00"',
  '    },',
  '    urls: {',
  '      gear4music: "https://www.gear4music.com/Recording-and-Computers/Neumann-TLM-102-Condenser-Microphone-Black/C56",',
  '      amazon: "https://www.amazon.com/dp/B003HGLPC6",',
  '      zzounds: "https://www.zzounds.com/item--NEUTLM102",',
  '      musicstore: "https://www.musicstore.com/en_OE/EUR/Neumann-TLM-102-Studio-Microphone-Nickel/art-REC0007197-000"',
  '    }',
  '  },'
];
lines.splice(lastE + 1, 0, ...nuevas);
console.log('entradas 672/673/674 anadidas');
const newBlock = lines.join('\n');
fs.writeFileSync(bj, src.slice(0, abre) + newBlock + src.slice(cierra + 1));
try { new Function(fs.readFileSync(bj, 'utf8')); console.log('build-guides.js OK'); }
catch (e) { console.log('ROTO:', e.message); process.exit(1); }