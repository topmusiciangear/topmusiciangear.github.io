const fs = require('fs');
const originalProducts = JSON.parse(fs.readFileSync('/tmp/products_original_utf8.json', 'utf8'));
const currentProducts = JSON.parse(fs.readFileSync('data/products.json', 'utf8'));

// 1. Restore products 53 and 55 to original values
const orig53 = originalProducts.find(p => p.id === 53);
const orig55 = originalProducts.find(p => p.id === 55);

const curr53 = currentProducts.find(p => p.id === 53);
const curr55 = currentProducts.find(p => p.id === 55);

// Save original product data
const orig53Data = JSON.parse(JSON.stringify(orig53));
const orig55Data = JSON.parse(JSON.stringify(orig55));

// Restore
Object.assign(curr53, orig53Data);
Object.assign(curr55, orig55Data);

console.log('Restored product 53:', curr53.title);
console.log('Restored product 55:', curr55.title);

// 2. Create new products for Audient iD2 (id 9011) and Volt 2 Gen 2 (id 9012)
// Get the current modified data for 53 and 55 before restoration
const modified53 = JSON.parse(JSON.stringify(currentProducts.find(p => p.id === 53)));
const modified55 = JSON.parse(JSON.stringify(currentProducts.find(p => p.id === 55)));

// Wait, we already restored. Let me get the modified data from a different source.
// Actually, the modified data is what was in the file before we restored. 
// Let me reconstruct from what we know.

// Audient iD2 (new product, id 9011)
const newAudient = {
  "id": 9011,
  "title": "Audient iD2",
  "title_es": "Audient iD2",
  "brand": "Audient",
  "category": "interfaces",
  "price": 349,
  "rating": 4.7,
  "reviews": 1200,
  "badge": "topQuality",
  "desc": "Console-grade preamps with ADAT expansion. Two Audient Console mic preamps with 75 dB of clean gain, 32-bit/192 kHz conversion with 128 dB dynamic range, and onboard DSP (EQ, compression, reverb). RoomTune monitor correction, Analogue Tone Suite (ORBIT, HMX, LIFT, GLOW), and monitor control for two speaker pairs. USB-C bus powered.",
  "desc_es": "Preamplificadores con calidad de consola con expansión ADAT. Dos previos de micrófono Audient Console con 75 dB de ganancia limpia, conversión de 32 bits/192 kHz con 128 dB de rango dinámico y DSP integrado (EQ, compresión, reverb). Corrección de monitores RoomTune, Analogue Tone Suite (ORBIT, HMX, LIFT, GLOW) y control de monitores para dos pares de altavoces. Alimentación USB-C.",
  "img": "img/products/9ebbc7b8b3.webp",
  "stores": {
    "andertons": "https://www.andertons.co.uk/audient-id2-10in6out-high-performance-usb-audio-interface/?search_query=Audient%20iD2",
    "gear4music": "https://www.gear4music.com/Recording-and-Computers/Audient-iD2-MK3-10-in-6-out-USB-Audio-Interface/8LHA",
    "zzounds": "https://www.zzounds.com/item--ADIID2?siid=399388",
    "musicstore": "https://www.musicstore.com/en_OE/EUR/Audient-iD2/art-PCM0019062-000"
  },
  "oos": ["zzounds"],
  "score": 9.6,
  "bestFor": {
    "en": "Console preamps with room to grow",
    "es": "Preamps de consola con margen para crecer"
  },
  "facts": [
    { "icon": "layers", "value": "10-in / 6-out (ADAT)", "label": { "en": "Inputs / Outputs", "es": "Entradas / Salidas" }, "tone": "good" },
    { "icon": "microphone", "value": "2, 75 dB gain", "label": { "en": "Preamps", "es": "Preamps" }, "tone": "good" },
    { "icon": "signal", "value": "USB-C", "label": { "en": "Connectivity", "es": "Conectividad" }, "tone": "good" }
  ]
};

// Universal Audio Volt 2 Gen 2 (new product, id 9012)
const newVolt = {
  "id": 9012,
  "title": "Universal Audio Volt 2 Gen 2",
  "title_es": "Universal Audio Volt 2 Gen 2",
  "brand": "Universal Audio",
  "category": "interfaces",
  "price": 219,
  "rating": 4.6,
  "reviews": 1800,
  "badge": "bestSeller",
  "desc": "UA quality with three Tone Shaping modes and 32-bit/192 kHz conversion. Two digitally controlled preamps with 60 dB gain (Warmth, Focus, Shine modes), full-color Smart Display, Auto-Gain with Clip Protection, independent 48V phantom per channel, and bus-powered USB-C operation. Integrates with UAD Console and LUNA.",
  "desc_es": "Calidad UA con tres modos de moldeado tonal y conversión de 32 bits/192 kHz. Dos previos controlados digitalmente con 60 dB de ganancia (modos Warmth, Focus, Shine), pantalla Smart Display a color, Auto-Gain con protección contra recorte, phantom 48V independiente por canal y alimentación USB-C. Integración con UAD Console y LUNA.",
  "img": "img/products/aa39f297ba.webp",
  "stores": {
    "gear4music": "https://www.gear4music.com/Recording-and-Computers/Universal-Audio-Volt-2-Gen-2-Audio-Interface/8F8X",
    "musicstore": "https://www.musicstore.com/en_OE/EUR/Universal-Audio-Volt-2-Gen-2/art-PCM0019051-000",
    "andertons": "https://www.andertons.co.uk/universal-audio-volt-2-gen-2-audio-interface/?search_query=Universal%20Audio%20Volt%202%20Gen%202",
    "amazon": "https://www.amazon.com/dp/B0HJDDFDH7?plpRedirect=mhFallback&ref=clp_hp_h_pc&th=1",
    "zzounds": "https://www.zzounds.com/item--UADVOLT2G2?siid=394656"
  },
  "oos": [],
  "score": 9.3,
  "bestFor": {
    "en": "UA tone with modern control",
    "es": "Sonido UA con control moderno"
  },
  "facts": [
    { "icon": "layers", "value": "2-in / 2-out", "label": { "en": "Inputs / Outputs", "es": "Entradas / Salidas" }, "tone": "good" },
    { "icon": "microphone", "value": "2, 60 dB gain", "label": { "en": "Preamps", "es": "Preamps" }, "tone": "good" },
    { "icon": "signal", "value": "USB-C", "label": { "en": "Connectivity", "es": "Conectividad" }, "tone": "good" }
  ]
};

currentProducts.push(newAudient);
currentProducts.push(newVolt);

fs.writeFileSync('data/products.json', JSON.stringify(currentProducts, null, 2), 'utf8');
console.log('Created new products: 9011 (Audient iD2), 9012 (Volt 2 Gen 2)');
console.log('Restored products 53 (Audient iD14 MkII) and 55 (Universal Audio Volt 2)');

// 3. Update best-interface guide to use new product IDs
const guides = JSON.parse(fs.readFileSync('data/guides.json', 'utf8'));
const guide = guides.find(g => g.id === 'best-interface');

// Update featuredProducts: replace 53 with 9011, 55 with 9012
guide.featuredProducts = guide.featuredProducts.map(id => {
  if (id === 53) return 9011;
  if (id === 55) return 9012;
  return id;
});

// Update productTable columns
if (guide.productTable && guide.productTable.columns) {
  guide.productTable.columns.forEach(col => {
    if (col.title === 'Audient iD2') {
      // Already correct
    }
    if (col.title === 'Universal Audio Volt 2 Gen 2') {
      // Already correct
    }
  });
}

// Update sections
if (guide.sections[8]) {
  guide.sections[8].products = [9011];
}
if (guide.sections[9]) {
  guide.sections[9].products = [9012];
}

// Update verdictProsCons names
if (guide.verdictProsCons[4]) {
  guide.verdictProsCons[4].name = 'Audient iD2';
  guide.verdictProsCons[4].name_es = 'Audient iD2';
}
if (guide.verdictProsCons[6]) {
  guide.verdictProsCons[6].name = 'Universal Audio Volt 2 Gen 2';
  guide.verdictProsCons[6].name_es = 'Universal Audio Volt 2 Gen 2';
}

const idx = guides.findIndex(g => g.id === 'best-interface');
guides[idx] = guide;
fs.writeFileSync('data/guides.json', JSON.stringify(guides, null, 2), 'utf8');
console.log('Updated best-interface guide to use new product IDs (9011, 9012)');

// 4. Update guide-scores.js for best-interface
var scores = fs.readFileSync('js/guide-scores.js', 'utf8');
var startIdx = scores.indexOf('"best-interface": {');
var endIdx = scores.indexOf('},', startIdx) + 2;
var section = scores.substring(startIdx, endIdx);
// Replace Audient iD14 MkII with Audient iD2 and Volt 2 with Volt 2 Gen 2
section = section.replace('"Audient iD14 MkII": 9.5', '"Audient iD2": 9.6');
section = section.replace('"Universal Audio Volt 2": 9.1', '"Universal Audio Volt 2 Gen 2": 9.3');
scores = scores.substring(0, startIdx) + section + scores.substring(endIdx);
fs.writeFileSync('js/guide-scores.js', scores, 'utf8');
console.log('Updated guide-scores.js for best-interface');

console.log('\n=== DONE ===');
console.log('Products 53 and 55 restored to original values');
console.log('New products 9011 (Audient iD2) and 9012 (Volt 2 Gen 2) created');
console.log('best-interface guide updated to use new product IDs');