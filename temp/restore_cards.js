var fs = require('fs');

// ---------- 1. products.json: re-add 646-651 ----------
var p = 'data/products.json';
var ps = JSON.parse(fs.readFileSync(p, 'utf8'));
ps = ps.filter(function (x) { return x.id < 646 || x.id > 651; });
ps.push(
  { id: 646, title: 'IsoAcoustics ISO-200 (Pair)', title_es: 'IsoAcoustics ISO-200 (Par)', brand: 'IsoAcoustics', category: 'accessories', price: 159, rating: 4.7, badge: 'recommended',
    desc: 'Desktop isolation stands sold as a pair. Patented isolator kills desk resonance; tilt up to 6.5 degrees aims tweeters at your ears. Holds 34 kg (short) / 27 kg (tall) per stand. ABS frames, stainless steel poles.',
    desc_es: 'Soportes de aislamiento de escritorio en par. El aislador patentado elimina la resonancia de la mesa; inclinación hasta 6,5 grados para apuntar al oído. Aguantan 34 kg (bajo) / 27 kg (alto) por soporte. Marcos ABS, postes de acero inoxidable.',
    img: 'https://isoacoustics.com/wp-content/uploads/2021/06/ISO-200-hero-new.jpg',
    stores: { amazon: 'https://www.amazon.com/IsoAcoustics-ISO-200-Isolation-Stands-Monitors/dp/B07D7K4Q54', zzounds: 'https://www.zzounds.com/item--ISOISO200' } },
  { id: 647, title: 'Sonarworks SoundID Reference', title_es: 'Sonarworks SoundID Reference', brand: 'Sonarworks', category: 'accessories', price: 299, rating: 4.8, badge: 'bestSeller',
    desc: 'Room-calibration software that flattens speaker response to ±0.5 dB at the listening position. Ships with a calibrated measurement microphone; works with any monitors and headphones, no brand lock-in. 500+ headphone profiles.',
    desc_es: 'Software de calibración que aplana la respuesta a ±0,5 dB en la posición de escucha. Incluye micrófono de medición calibrado; funciona con cualquier monitor y auricular, sin ataduras. 500+ perfiles de auriculares.',
    img: 'https://s1.files.sonarworks.com/blueprint/pages/soundid-reference/soundid-reference-speaker-and-headphone-calibration-software-meta.jpg',
    stores: {} },
  { id: 648, title: 'MiniDSP UMIK-1', title_es: 'MiniDSP UMIK-1', brand: 'MiniDSP', category: 'accessories', price: 79, rating: 4.7, badge: 'recommended',
    desc: '$79 USB plug-and-play measurement microphone with its own calibration file. Omnidirectional 20 Hz–20 kHz (±1 dB calibrated), 24-bit/48 kHz internal ADC, no interface needed. Drives REW, Sonarworks and Dirac.',
    desc_es: 'Micrófono de medición USB plug-and-play de $79 con su propio archivo de calibración. Omnidireccional 20 Hz–20 kHz (±1 dB calibrado), ADC interno 24-bit/48 kHz, sin interfaz necesaria. Compatible con REW, Sonarworks y Dirac.',
    img: 'https://www.minidsp.com/images/stories/virtuemart/product/282A1844.jpg',
    stores: { amazon: 'https://www.amazon.com/dp/B00N4Q25R8' } },
  { id: 649, title: 'Genelec GLM Kit', title_es: 'Genelec GLM Kit', brand: 'Genelec', category: 'accessories', price: 349, rating: 4.8, badge: 'recommended',
    desc: 'Calibration kit for Genelec SAM monitors: network adapter, reference microphone, holder and USB cable plus GLM software with 20+ filter groups and phase-aligned sub integration. ONLY works with Genelec SAM — a closed system.',
    desc_es: 'Kit de calibración para monitores Genelec SAM: adaptador de red, micrófono de referencia, soporte y cable USB más software GLM con 20+ grupos de filtro y subs alineados en fase. SOLO funciona con Genelec SAM — sistema cerrado.',
    img: 'https://images.ctfassets.net/4zjnzn055a4v/1AjeegAdCDKjDJLLcLTank/3a74313b984873a557e0c1dfeb911d21/glm-kit.jpg?w=800',
    stores: {} },
  { id: 650, title: 'Auralex MoPADs (4-Pack)', title_es: 'Auralex MoPADs (Pack 4)', brand: 'Auralex', category: 'accessories', price: 40, rating: 4.5, badge: 'bestSeller',
    desc: '$39.99 high-density foam pads that decouple a stereo pair on the desk. Five tilt steps from -8° to +8° aim tweeters at your ears. Fits virtually any small nearfield.',
    desc_es: 'Pads de espuma de alta densidad de $39,99 que desacoplan un par estéreo en la mesa. Cinco pasos de -8° a +8° para apuntar al oído. Sirven para casi cualquier nearfield pequeño.',
    img: 'https://cdn11.bigcommerce.com/s-pbjm8zp7wl/products/113/images/880/MoPAD-Set-1k-web__21363.1686836531.386.513.png?c=1',
    stores: {} },
  { id: 651, title: 'Ultimate Support MS-100 (Pair)', title_es: 'Ultimate Support MS-100 (Par)', brand: 'Ultimate Support', category: 'accessories', price: 599.99, rating: 4.7, badge: 'recommended',
    desc: 'Column stands for heavy midfield monitors: 34 kg capacity per stand at a fixed 38-inch height, three internal cable/weight channels, rubber decoupling pads and feet. $599.99 a pair, zero height adjustment.',
    desc_es: 'Soportes de columna para monitores midfield pesados: 34 kg por soporte a 38 pulgadas fijas, tres canales internos de cables/lastre, almohadillas y patas de goma. $599,99 el par, sin ajuste de altura.',
    img: 'https://www.ultimatesupport.com/cdn/shop/products/MS-100B_01_LG.jpg?v=1638214423',
    stores: { amazon: 'https://www.amazon.com/Ultimate-Support-MS-100B-Professional-Adjustable/dp/B005OWHATS' } }
);
ps.sort(function (a, b) { return a.id - b.id; });
fs.writeFileSync(p, JSON.stringify(ps, null, 2));
console.log('products restored: ' + ps.filter(function (x) { return x.id >= 646 && x.id <= 651; }).map(function (x) { return x.id; }).join(','));

// ---------- 2. TEST_SHOP_BTN url-only entries ----------
var b = 'build-guides.js';
var src = fs.readFileSync(b, 'utf8');
var anchor = '\n  645: {';
var i = src.indexOf(anchor);
if (i === -1) { console.log('645 BLOCK NOT FOUND'); process.exit(1); }
var j = src.indexOf('{', i), depth = 0, k = j;
while (k < src.length) { if (src[k] === '{') depth++; else if (src[k] === '}') { if (--depth === 0) break; } k++; }
var end = k + 1; if (src[end] === ',') end++;
var add = "  646: {\n    urls: {\n      amazon: \"https://www.amazon.com/IsoAcoustics-ISO-200-Isolation-Stands-Monitors/dp/B07D7K4Q54\",\n      zzounds: \"https://www.zzounds.com/item--ISOISO200\"\n    }\n  },\n  648: {\n    urls: {\n      amazon: \"https://www.amazon.com/dp/B00N4Q25R8\"\n    }\n  },\n  651: {\n    urls: {\n      amazon: \"https://www.amazon.com/Ultimate-Support-MS-100B-Professional-Adjustable/dp/B005OWHATS\"\n    }\n  },\n";
src = src.slice(0, end) + '\n' + add + src.slice(end);
fs.writeFileSync(b, src);
console.log('TEST url-only entries added');

// ---------- 3. guide: featured + section refs ----------
var g = 'data/guides.json';
var d = JSON.parse(fs.readFileSync(g, 'utf8'));
var gd = d.find(function (x) { return x.id === 'monitor-setup'; });
gd.featuredProducts = [19, 59, 645, 646, 647, 648, 649, 650, 651];
gd.sections[4].products = [646];
gd.sections[5].products = [647, 648];
gd.sections[6].products = [649, 650, 651];
fs.writeFileSync(g, JSON.stringify(d, null, 2));
console.log('guide refs updated');
console.log('DONE');
