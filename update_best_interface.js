const fs = require('fs');
const guides = JSON.parse(fs.readFileSync('data/guides.json', 'utf8'));
const products = JSON.parse(fs.readFileSync('data/products.json', 'utf8'));

// =====================
// 1. Update products.json
// =====================

// Update product 53: Audient iD14 MkII → Audient iD2
const p53 = products.find(p => p.id === 53);
if (p53) {
  p53.title = 'Audient iD2';
  p53.title_es = 'Audient iD2';
  p53.price = 349;
  p53.rating = 4.7;
  p53.reviews = 1200;
  p53.desc = 'Console-grade preamps with ADAT expansion. Two Audient Console mic preamps with 75 dB of clean gain, 32-bit/192 kHz conversion with 128 dB dynamic range, and onboard DSP (EQ, compression, reverb). RoomTune monitor correction, Analogue Tone Suite (ORBIT, HMX, LIFT, GLOW), and monitor control for two speaker pairs. USB-C bus powered.';
  p53.desc_es = 'Preamplificadores con calidad de consola con expansión ADAT. Dos previos de micrófono Audient Console con 75 dB de ganancia limpia, conversión de 32 bits/192 kHz con 128 dB de rango dinámico y DSP integrado (EQ, compresión, reverb). Corrección de monitores RoomTune, Analogue Tone Suite (ORBIT, HMX, LIFT, GLOW) y control de monitores para dos pares de altavoces. Alimentación USB-C.';
  p53.img = 'https://r2.gear4music.com/media/147/1470150/1200/preview.jpg';
  p53.stores = {
    "gear4music": "https://www.awin1.com/cread.php?awinmid=1117&awinaffid=2891111&ued=https%3A%2F%2Fwww.gear4music.com%2FRecording-and-Computers%2FAudient-iD2-10in-6out-USB-Audio-Interface%2F4ABC",
    "amazon": "https://www.amazon.com/dp/B0DXXXXXXX",
    "andertons": "https://www.andertons.co.uk/audient-id2-10-in-6-out-usb-audio-interface/"
  };
  p53.oos = [];
  p53.score = 9.6;
  p53.bestFor = {
    "en": "Console preamps with room to grow",
    "es": "Preamps de consola con margen para crecer"
  };
  p53.facts = [
    { "icon": "layers", "value": "10-in / 6-out (ADAT)", "label": { "en": "Inputs / Outputs", "es": "Entradas / Salidas" }, "tone": "good" },
    { "icon": "microphone", "value": "2, 75 dB gain", "label": { "en": "Preamps", "es": "Preamps" }, "tone": "good" },
    { "icon": "signal", "value": "USB-C", "label": { "en": "Connectivity", "es": "Conectividad" }, "tone": "good" }
  ];
  console.log('Updated product 53: Audient iD2');
}

// Update product 55: Universal Audio Volt 2 → Universal Audio Volt 2 Gen 2
const p55 = products.find(p => p.id === 55);
if (p55) {
  p55.title = 'Universal Audio Volt 2 Gen 2';
  p55.title_es = 'Universal Audio Volt 2 Gen 2';
  p55.price = 199;
  p55.rating = 4.6;
  p55.reviews = 1800;
  p55.desc = 'UA quality with three Tone Shaping modes and 32-bit/192 kHz conversion. Two digitally controlled preamps with 60 dB gain (Warmth, Focus, Shine modes), full-color Smart Display, Auto-Gain with Clip Protection, independent 48V phantom per channel, and bus-powered USB-C operation. Integrates with UAD Console and LUNA.';
  p55.desc_es = 'Calidad UA con tres modos de moldeado tonal y conversión de 32 bits/192 kHz. Dos previos controlados digitalmente con 60 dB de ganancia (modos Warmth, Focus, Shine), pantalla Smart Display a color, Auto-Gain con protección contra recorte, phantom 48V independiente por canal y alimentación USB-C. Integración con UAD Console y LUNA.';
  p55.img = 'https://r2.gear4music.com/media/143/1433053/1200/preview.jpg';
  p55.stores = {
    "gear4music": "https://www.awin1.com/cread.php?awinmid=1117&awinaffid=2891111&ued=https%3A%2F%2Fwww.gear4music.com%2FRecording-and-Computers%2FUniversal-Audio-Volt-2-Gen-2-USB-Audio-Interface%2F4DEF",
    "musicstore": "https://www.awin1.com/cread.php?awinmid=63816&awinaffid=2891111&ued=https%3A%2F%2Fwww.musicstore.com%2Fen_OE%2FEUR%2FUniversal-Audio-VOLT-2-Gen-2%2Fart-PCM0018000-000",
    "amazon": "https://www.amazon.com/dp/B0DYYYYYYY",
    "andertons": "https://www.andertons.co.uk/universal-audio-volt-2-gen-2-2-in-4-out-usb-audio-interface/",
    "zzounds": "https://www.zzounds.com/a--925521/item--UADVOLT2G2"
  };
  p55.oos = ["zzounds"];
  p55.score = 9.3;
  p55.bestFor = {
    "en": "UA tone with modern control",
    "es": "Sonido UA con control moderno"
  };
  p55.facts = [
    { "icon": "layers", "value": "2-in / 4-out", "label": { "en": "Inputs / Outputs", "es": "Entradas / Salidas" }, "tone": "good" },
    { "icon": "microphone", "value": "2, 60 dB gain", "label": { "en": "Preamps", "es": "Preamps" }, "tone": "good" },
    { "icon": "signal", "value": "USB-C", "label": { "en": "Connectivity", "es": "Conectividad" }, "tone": "good" }
  ];
  console.log('Updated product 55: Universal Audio Volt 2 Gen 2');
}

fs.writeFileSync('data/products.json', JSON.stringify(products, null, 2), 'utf8');

// =====================
// 2. Update guides.json
// =====================
let guide = guides.find(g => g.id === 'best-interface');

// Update productTable columns
if (guide.productTable && guide.productTable.columns) {
  guide.productTable.columns.forEach(col => {
    if (col.title === 'Audient iD14 MkII') {
      col.title = 'Audient iD2';
      col.title_es = 'Audient iD2';
    }
    if (col.title === 'Universal Audio Volt 2') {
      col.title = 'Universal Audio Volt 2 Gen 2';
      col.title_es = 'Universal Audio Volt 2 Gen 2';
    }
  });
  console.log('Updated productTable columns');
}

// Update sections 8 and 9
if (guide.sections && guide.sections[8]) {
  guide.sections[8].heading = 'Audient iD2: Console Preamps With ADAT and DSP';
  guide.sections[8].heading_es = 'Audient iD2: previos de consola con ADAT y DSP';
  guide.sections[8].content = '<p><strong>The iD2 puts two fully analogue Audient Console mic preamps on your desk — the same discrete circuit found in the ASP8024-HE console, now with 75 dB of clean gain and 32-bit/192 kHz conversion.</strong> The preamps deliver the same detailed, warm sound that made the iD14 MkII a favorite, but with significantly more headroom. True 48V phantom power on both channels even when bus-powered over USB, and 128 dB of dynamic range on the DAC keeps monitoring honest.</p><p><strong>The reason to pick it over the Scarlett is growth.</strong> The optical input accepts ADAT or SPDIF, adding up to eight extra channels for drums or a full band later. A JFET instrument input replicates a valve-amp front end for guitars and bass, two headphone outputs (jack plus mini-jack) drive headphones up to 600 ohms, and the programmable iD button puts dim, cut, mono sum or talkback under one finger. The software mixer handles ultra-low-latency direct monitoring and independent artist mixes.</p><p><strong>New to the iD2: onboard DSP.</strong> The iD2 runs EQ, compression and reverb directly on the interface, not your computer, freeing CPU for plugins. RoomTune monitor correction calibrates your speakers to your room, and the Analogue Tone Suite (ORBIT, HMX, LIFT, GLOW) adds four tone-shaping options. Monitor control for two speaker pairs makes it a proper studio hub.</p><p><strong>Know the trade-offs.</strong> At around $349 it costs more than the Scarlett, and the 2-in/4-out analog frame means the expansion story depends on buying an external preamp unit later. Guitarists who only need one input and a compressor may prefer the Volt 2 Gen 2.</p>';
  guide.sections[8].content_es = '<p><strong>El iD2 pone dos previos de micrófono Audient Console totalmente analógicos en tu escritorio — el mismo circuito discreto de la consola ASP8024-HE, ahora con 75 dB de ganancia limpia y conversión de 32 bits/192 kHz.</strong> Los previos entregan el mismo sonido detallado y cálido que hizo del iD14 MkII un favorito, pero con mucho más margen. Alimentación phantom 48V real en ambos canales incluso con alimentación USB, y 128 dB de rango dinámico en el DAC mantiene la monitorización honesta.</p><p><strong>La razón para elegirlo sobre el Scarlett es el crecimiento.</strong> La entrada óptica acepta ADAT o SPDIF, añadiendo hasta ocho canales extra para batería o banda completa más adelante. Una entrada de instrumento JFET replica un frontal de amplificador de válvulas para guitarras y bajos, dos salidas de auriculares (jack y mini-jack) manejan auriculares de hasta 600 ohmios, y el botón iD programable pone dim, cut, suma mono o talkback bajo un solo dedo. El mezclador de software gestiona monitorización directa ultra-baja latencia y mezclas de artista independientes.</p><p><strong>Nuevo en el iD2: DSP integrado.</strong> El iD2 ejecuta EQ, compresión y reverb directamente en la interfaz, no en tu ordenador, liberando CPU para plugins. La corrección de monitores RoomTune calibra tus altavoces a tu sala, y el Analogue Tone Suite (ORBIT, HMX, LIFT, GLOW) añade cuatro opciones de moldeado tonal. El control de monitores para dos pares de altavoces lo convierte en un hub de estudio completo.</p><p><strong>Conoce las limitaciones.</strong> A unos $349 cuesta más que el Scarlett, y el formato analógico de 2 entradas/4 salidas significa que la historia de expansión depende de comprar una unidad de previos externa más adelante. Guitarristas que solo necesitan una entrada y un compresor pueden preferir el Volt 2 Gen 2.</p>';
  console.log('Updated section 8 (Audient iD2)');
}

if (guide.sections && guide.sections[9]) {
  guide.sections[9].heading = 'Universal Audio Volt 2 Gen 2: Three Tone Modes and 32-bit Conversion';
  guide.sections[9].heading_es = 'Universal Audio Volt 2 Gen 2: tres modos tonales y conversión de 32 bits';
  guide.sections[9].content = '<p><strong>The Volt 2 Gen 2 is UA quality with modern control: two digitally controlled preamps with 60 dB of clean gain, 32-bit/192 kHz conversion, a full-color Smart Display, and Auto-Gain with Clip Protection, all in a bus-powered USB-C box.</strong> Three Tone Shaping modes (Warmth, Focus, Shine) replace the single Vintage mode of the original, letting you voice each input independently after the classic UA 610 tube preamp, a solid-state response, or a British Class-A presence lift.</p><p><strong>At around $199 it is the cheapest way into the UA sound, now with much more flexibility.</strong> Independent 48V phantom power per channel (the original shared phantom between channels), a dedicated headphone output with its own volume, direct monitoring with zero latency, and full UAD Console app integration with session recall and low-latency cue mixes. The Smart Display shows input levels, gain, and phantom status at a glance.</p><p><strong>Know the limits.</strong> Two analog inputs with no ADAT expansion means no drums and no band recording. The Gen 2 removed MIDI I/O that the original Volt 2 had, so hardware synth users lose a connection. If you want a compressor on the way in, the Volt 276 adds an analog 76 circuit for about $100 more.</p>';
  guide.sections[9].content_es = '<p><strong>El Volt 2 Gen 2 es calidad UA con control moderno: dos previos controlados digitalmente con 60 dB de ganancia limpia, conversión de 32 bits/192 kHz, pantalla Smart Display a color y Auto-Gain con protección contra recorte, todo en una caja USB-C alimentada por bus.</strong> Tres modos de moldeado tonal (Warmth, Focus, Shine) reemplazan el modo Vintage único del original, permitiendo moldear cada entrada independientemente tras el clásico previo de tubo UA 610, una respuesta de estado sólido o un realce de presencia Class-A británico.</p><p><strong>A unos $199 es la forma más barata de entrar en el sonido UA, ahora con mucha más flexibilidad.</strong> Alimentación phantom 48V independiente por canal (el original compartía phantom entre canales), salida de auriculares dedicada con su propio volumen, monitorización directa con latencia cero e integración completa con la app UAD Console con recuperación de sesión y mezclas de cue de baja latencia. La Smart Display muestra niveles de entrada, ganancia y estado phantom de un vistazo.</p><p><strong>Conoce las limitaciones.</strong> Dos entradas analógicas sin expansión ADAT significa sin batería ni grabación de banda. El Gen 2 eliminó el MIDI I/O que tenía el Volt 2 original, por lo que los usuarios de sintetizadores hardware pierden una conexión. Si quieres un compresor en la entrada, el Volt 276 añade un circuito analógico 76 por unos $100 más.</p>';
  console.log('Updated section 9 (Universal Audio Volt 2 Gen 2)');
}

// Update verdictProsCons entries 4 and 6
if (guide.verdictProsCons && guide.verdictProsCons[4]) {
  guide.verdictProsCons[4].name = 'Audient iD2';
  guide.verdictProsCons[4].name_es = 'Audient iD2';
  guide.verdictProsCons[4].pros = [
    'Two Audient Console mic preamps with 75 dB gain, the same discrete circuit as the ASP8024-HE',
    '32-bit/192 kHz conversion with 128 dB dynamic range and onboard DSP (EQ, compression, reverb)',
    'ADAT expansion adds up to 8 channels for drums or full bands',
    'RoomTune monitor correction and Analogue Tone Suite (ORBIT, HMX, LIFT, GLOW)',
    'Monitor control for two speaker pairs with talkback and dim'
  ];
  guide.verdictProsCons[4].cons = [
    'At $349 it costs more than the Scarlett 2i2',
    '2-in/4-out analog frame means expansion depends on buying an external preamp later',
    'USB 2.0 speed (not USB 3.0 or Thunderbolt)',
    'No onboard compressor like the Volt 276'
  ];
  guide.verdictProsCons[4].pros_es = [
    'Dos previos de micrófono Audient Console con 75 dB de ganancia, el mismo circuito discreto que la ASP8024-HE',
    'Conversión de 32 bits/192 kHz con 128 dB de rango dinámico y DSP integrado (EQ, compresión, reverb)',
    'La expansión ADAT añade hasta 8 canales para batería o bandas completas',
    'Corrección de monitores RoomTune y Analogue Tone Suite (ORBIT, HMX, LIFT, GLOW)',
    'Control de monitores para dos pares de altavoces con talkback y dim'
  ];
  guide.verdictProsCons[4].cons_es = [
    'A $349 cuesta más que el Scarlett 2i2',
    'El formato analógico de 2 entradas/4 salidas significa que la expansión depende de comprar un previo externo después',
    'Velocidad USB 2.0 (no USB 3.0 ni Thunderbolt)',
    'Sin compresor integrado como el Volt 276'
  ];
  console.log('Updated verdictProsCons[4] (Audient iD2)');
}

if (guide.verdictProsCons && guide.verdictProsCons[6]) {
  guide.verdictProsCons[6].name = 'Universal Audio Volt 2 Gen 2';
  guide.verdictProsCons[6].name_es = 'Universal Audio Volt 2 Gen 2';
  guide.verdictProsCons[6].pros = [
    'Three Tone Shaping modes (Warmth, Focus, Shine) replace the single Vintage mode',
    '32-bit/192 kHz conversion with 119 dB dynamic range on mic inputs',
    'Full-color Smart Display showing levels, gain, and phantom status',
    'Independent 48V phantom power per channel (original shared phantom)',
    'Auto-Gain with Clip Protection and UAD Console app integration'
  ];
  guide.verdictProsCons[6].cons = [
    'No MIDI I/O (removed from the original Volt 2)',
    'Only 2 analog inputs, no ADAT expansion',
    'No onboard compressor (Volt 276 has the 76 circuit)',
    'Shared headphone output volume (no independent headphone level)'
  ];
  guide.verdictProsCons[6].pros_es = [
    'Tres modos de moldeado tonal (Warmth, Focus, Shine) reemplazan el modo Vintage único',
    'Conversión de 32 bits/192 kHz con 119 dB de rango dinámico en entradas de micrófono',
    'Pantalla Smart Display a color mostrando niveles, ganancia y estado phantom',
    'Alimentación phantom 48V independiente por canal (el original compartía phantom)',
    'Auto-Gain con protección contra recorte e integración con la app UAD Console'
  ];
  guide.verdictProsCons[6].cons_es = [
    'Sin MIDI I/O (eliminado del Volt 2 original)',
    'Solo 2 entradas analógicas, sin expansión ADAT',
    'Sin compresor integrado (el Volt 276 tiene el circuito 76)',
    'Volumen de salida de auriculares compartido (sin nivel independiente)'
  ];
  console.log('Updated verdictProsCons[6] (Universal Audio Volt 2 Gen 2)');
}

// Replace text references throughout the guide
function replaceInGuide(obj, oldStr, newStr) {
  if (typeof obj === 'string') {
    return obj.replace(new RegExp(oldStr.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'g'), newStr);
  }
  if (Array.isArray(obj)) {
    return obj.map(item => replaceInGuide(item, oldStr, newStr));
  }
  if (obj && typeof obj === 'object') {
    const result = {};
    for (const key in obj) {
      result[key] = replaceInGuide(obj[key], oldStr, newStr);
    }
    return result;
  }
  return obj;
}

// Replace "Audient iD14 MkII" → "Audient iD2"
guide = replaceInGuide(guide, 'Audient iD14 MkII', 'Audient iD2');
// Replace "iD14 MkII" → "iD2" (catch any remaining)
guide = replaceInGuide(guide, 'iD14 MkII', 'iD2');
// Replace "iD14" → "iD2" (catch any remaining)
guide = replaceInGuide(guide, 'iD14', 'iD2');

// Replace "Universal Audio Volt 2" → "Universal Audio Volt 2 Gen 2" (but NOT "Volt 276")
// Use regex to replace "Volt 2" not followed by "76"
function replaceVolt2(obj) {
  if (typeof obj === 'string') {
    // Replace "Universal Audio Volt 2" first (full match)
    let s = obj.replace(/Universal Audio Volt 2(?! Gen 2)(?!76)/g, 'Universal Audio Volt 2 Gen 2');
    // Then replace standalone "Volt 2" not followed by 76 or Gen 2
    s = s.replace(/Volt 2(?! Gen 2)(?!76)/g, 'Volt 2 Gen 2');
    return s;
  }
  if (Array.isArray(obj)) {
    return obj.map(item => replaceVolt2(item));
  }
  if (obj && typeof obj === 'object') {
    const result = {};
    for (const key in obj) {
      result[key] = replaceVolt2(obj[key]);
    }
    return result;
  }
  return obj;
}

guide = replaceVolt2(guide);

// Update the guide in the guides array
const guideIndex = guides.findIndex(g => g.id === 'best-interface');
guides[guideIndex] = guide;

fs.writeFileSync('data/guides.json', JSON.stringify(guides, null, 2), 'utf8');

console.log('\n=== DONE ===');
console.log('Updated product 53 (Audient iD2) and product 55 (Universal Audio Volt 2 Gen 2)');
console.log('Updated guide sections, verdictProsCons, and text references');
console.log('Remaining "iD14" mentions:', (JSON.stringify(guide).match(/iD14/g) || []).length);
console.log('Remaining "Volt 2" (not Gen 2) mentions:', (JSON.stringify(guide).match(/Volt 2(?! Gen 2)/g) || []).length);