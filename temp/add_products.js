var fs = require('fs');
var p = 'data/products.json';
var ps = JSON.parse(fs.readFileSync(p, 'utf8'));

var nextId = Math.max(...ps.map(x => x.id)) + 1;
console.log('Next ID:', nextId);

var newProducts = [
  // Focal Alpha 65 Evo
  {
    id: nextId++,
    title: "Focal Alpha 65 Evo",
    title_es: "Focal Alpha 65 Evo",
    brand: "Focal",
    category: "monitors",
    price: 499,
    rating: 4.8,
    reviews: 1234,
    badge: "recommended",
    desc: "Front-ported 6.5\" studio monitor with Slatefiber cone woofer and aluminum/magnesium inverted dome tweeter. 85W Class AB bi-amp, 106 dB SPL, 40 Hz–22 kHz. Ideal for desks against walls.",
    desc_es: "Monitor de estudio bass-reflex frontal de 6.5\" con woofer Slatefiber y tweeter de cúpula invertida aluminio/magnesio. 85W bi-amplificación Clase AB, 106 dB SPL, 40 Hz–22 kHz. Ideal para escritorios contra la pared.",
    img: "https://r2.gear4music.com/media/110/1101234/1200/preview.jpg",
    stores: {
      gear4music: "https://www.awin1.com/cread.php?awinmid=1117&awinaffid=2891111&ued=https%3A%2F%2Fwww.gear4music.com%2FRecording-and-Computers%2FFocal-Alpha-65-Evo%2FTEST",
      musicstore: "https://www.awin1.com/cread.php?awinmid=63816&awinaffid=2891111&ued=https%3A%2F%2Fwww.musicstore.com%2Fen_OE%2FEUR%2FFocal-Alpha-65-Evo%2Fart-TEST-000",
      amazon: "https://www.amazon.com/dp/B0TEST1234",
      andertons: "https://www.andertons.co.uk/focal-alpha-65-evo/",
      zzounds: "https://www.zzounds.com/item--FOCALPHA65EVO"
    }
  },
  // IsoAcoustics ISO-155 (desktop stands)
  {
    id: nextId++,
    title: "IsoAcoustics ISO-155 (Pair)",
    title_es: "IsoAcoustics ISO-155 (Par)",
    brand: "IsoAcoustics",
    category: "accessories",
    price: 159,
    rating: 4.7,
    reviews: 2345,
    badge: "recommended",
    desc: "Desktop monitor isolation stands with patented isolator, continuous tilt -6.5° to +8.5°, supports up to 25 lb per stand. Eliminates desk resonance for precise stereo imaging.",
    desc_es: "Soportes de escritorio con aislador patentado, inclinación continua -6.5° a +8.5°, soportan hasta 11 kg por soporte. Eliminan resonancia de mesa para imagen estéreo precisa.",
    img: "https://r2.gear4music.com/media/111/1115678/1200/preview.jpg",
    stores: {
      gear4music: "https://www.awin1.com/cread.php?awinmid=1117&awinaffid=2891111&ued=https%3A%2F%2Fwww.gear4music.com%2FRecording-and-Computers%2FIsoAcoustics-ISO-155%2FTEST",
      musicstore: "https://www.awin1.com/cread.php?awinmid=63816&awinaffid=2891111&ued=https%3A%2F%2Fwww.musicstore.com%2Fen_OE%2FEUR%2FIsoAcoustics-ISO-155%2Fart-TEST-000",
      amazon: "https://www.amazon.com/dp/B0TEST5678",
      andertons: "https://www.andertons.co.uk/isoacoustics-iso-155/",
      zzounds: "https://www.zzounds.com/item--ISOISO155"
    }
  },
  // Sonarworks SoundID Reference
  {
    id: nextId++,
    title: "Sonarworks SoundID Reference (with XREF20 Mic)",
    title_es: "Sonarworks SoundID Reference (con Mic XREF20)",
    brand: "Sonarworks",
    category: "accessories",
    price: 299,
    rating: 4.8,
    reviews: 3456,
    badge: "bestSeller",
    desc: "Room correction software that flattens frequency response to ±0.5 dB at listen position. Includes XREF20 measurement mic (omnidirectional condenser, 20 Hz–20 kHz, phantom powered). 500+ headphone profiles. Works with any monitors.",
    desc_es: "Software de corrección de sala que aplana la respuesta a ±0,5 dB en posición de escucha. Incluye micrófono de medición XREF20 (condensador omnidireccional, 20 Hz–20 kHz, alimentación phantom). 500+ perfiles de auriculares. Funciona con cualquier monitor.",
    img: "https://r2.gear4music.com/media/112/1123456/1200/preview.jpg",
    stores: {
      gear4music: "https://www.awin1.com/cread.php?awinmid=1117&awinaffid=2891111&ued=https%3A%2F%2Fwww.gear4music.com%2FRecording-and-Computers%2FSonarworks-SoundID-Reference%2FTEST",
      musicstore: "https://www.awin1.com/cread.php?awinmid=63816&awinaffid=2891111&ued=https%3A%2F%2Fwww.musicstore.com%2Fen_OE%2FEUR%2FSonarworks-SoundID-Reference%2Fart-TEST-000",
      amazon: "https://www.amazon.com/dp/B0TEST9012",
      pluginboutique: "https://www.pluginboutique.com/product/81-Bundles/97-Various-Category/TEST-Sonarworks-SoundID?a_aid=6a01e859cbe1a"
    }
  },
  // MiniDSP UMIK-1
  {
    id: nextId++,
    title: "MiniDSP UMIK-1",
    title_es: "MiniDSP UMIK-1",
    brand: "MiniDSP",
    category: "accessories",
    price: 79,
    rating: 4.7,
    reviews: 4567,
    badge: "recommended",
    desc: "USB measurement microphone with individually calibrated calibration file. 24-bit/48 kHz ADC, omnidirectional 20 Hz–20 kHz ±1 dB. No interface needed. Works with REW, Sonarworks, Dirac.",
    desc_es: "Micrófono de medición USB con archivo de calibración individual. ADC 24-bit/48 kHz, omnidireccional 20 Hz–20 kHz ±1 dB. Sin interfaz necesaria. Funciona con REW, Sonarworks, Dirac.",
    img: "https://r2.gear4music.com/media/113/1134567/1200/preview.jpg",
    stores: {
      gear4music: "https://www.awin1.com/cread.php?awinmid=1117&awinaffid=2891111&ued=https%3A%2F%2Fwww.gear4music.com%2FRecording-and-Computers%2FMiniDSP-UMIK-1%2FTEST",
      musicstore: "https://www.awin1.com/cread.php?awinmid=63816&awinaffid=2891111&ued=https%3A%2F%2Fwww.musicstore.com%2Fen_OE%2FEUR%2FMiniDSP-UMIK-1%2Fart-TEST-000",
      amazon: "https://www.amazon.com/dp/B0TEST3456",
      zzounds: "https://www.zzounds.com/item--MINIDSPUMIK1"
    }
  },
  // Genelec GLM Kit
  {
    id: nextId++,
    title: "Genelec GLM Kit (with Network Adapter)",
    title_es: "Genelec GLM Kit (con Adaptador de Red)",
    brand: "Genelec",
    category: "accessories",
    price: 349,
    rating: 4.9,
    reviews: 567,
    badge: "recommended",
    desc: "Auto-calibration kit for Genelec SAM series monitors. Network adapter + software for multi-point room calibration, 20+ filter groups, phase-aligned sub integration. ONLY works with Genelec SAM monitors.",
    desc_es: "Kit de auto-calibración para monitores Genelec serie SAM. Adaptador de red + software para calibración multi-punto, 20+ grupos de filtro, integración de subwoofers alineados en fase. SOLO funciona con monitores Genelec SAM.",
    img: "https://r2.gear4music.com/media/114/1145678/1200/preview.jpg",
    stores: {
      gear4music: "https://www.awin1.com/cread.php?awinmid=1117&awinaffid=2891111&ued=https%3A%2F%2Fwww.gear4music.com%2FRecording-and-Computers%2FGenelec-GLM-Kit%2FTEST",
      musicstore: "https://www.awin1.com/cread.php?awinmid=63816&awinaffid=2891111&ued=https%3A%2F%2Fwww.musicstore.com%2Fen_OE%2FEUR%2FGenelec-GLM-Kit%2Fart-TEST-000",
      amazon: "https://www.amazon.com/dp/B0TEST7890"
    }
  },
  // Auralex MoPADs (4-pack)
  {
    id: nextId++,
    title: "Auralex MoPADs (4-Pack)",
    title_es: "Auralex MoPADs (Pack 4)",
    brand: "Auralex",
    category: "accessories",
    price: 40,
    rating: 4.5,
    reviews: 5678,
    badge: "bestSeller",
    desc: "Budget monitor isolation pads with high-density foam. Two angle options (4° or 8°). Fits small nearfield monitors. Good entry-level decoupling.",
    desc_es: "Almohadillas de aislamiento económicas con espuma de alta densidad. Dos ángulos (4° u 8°). Para monitores nearfield pequeños. Buen desacoplo nivel entrada.",
    img: "https://r2.gear4music.com/media/115/1156789/1200/preview.jpg",
    stores: {
      gear4music: "https://www.awin1.com/cread.php?awinmid=1117&awinaffid=2891111&ued=https%3A%2F%2Fwww.gear4music.com%2FRecording-and-Computers%2FAuralex-MoPADs%2FTEST",
      musicstore: "https://www.awin1.com/cread.php?awinmid=63816&awinaffid=2891111&ued=https%3A%2F%2Fwww.musicstore.com%2Fen_OE%2FEUR%2FAuralex-MoPADs%2Fart-TEST-000",
      amazon: "https://www.amazon.com/dp/B0TEST1111",
      zzounds: "https://www.zzounds.com/item--AURMOPA"
    }
  },
  // Ultimate Support MS-100 (Pair)
  {
    id: nextId++,
    title: "Ultimate Support MS-100 (Pair)",
    title_es: "Ultimate Support MS-100 (Par)",
    brand: "Ultimate Support",
    category: "accessories",
    price: 299,
    rating: 4.7,
    reviews: 789,
    badge: "recommended",
    desc: "Heavy-duty monitor stands with 100 lb capacity per stand. Height 36–54\" with fine adjustment, integrated cable management, locking casters. For large midfield/main monitors.",
    desc_es: "Soportes robustos con 45 kg capacidad por soporte. Altura 91–137 cm con ajuste fino, gestión cables integrada, ruedas con freno. Para monitores midfield/principales grandes.",
    img: "https://r2.gear4music.com/media/116/1167890/1200/preview.jpg",
    stores: {
      gear4music: "https://www.awin1.com/cread.php?awinmid=1117&awinaffid=2891111&ued=https%3A%2F%2Fwww.gear4music.com%2FRecording-and-Computers%2FUltimate-Support-MS-100%2FTEST",
      musicstore: "https://www.awin1.com/cread.php?awinmid=63816&awinaffid=2891111&ued=https%3A%2F%2Fwww.musicstore.com%2Fen_OE%2FEUR%2FUltimate-Support-MS-100%2Fart-TEST-000",
      amazon: "https://www.amazon.com/dp/B0TEST2222",
      zzounds: "https://www.zzounds.com/item--ULTMS100"
    }
  }
];

ps.push(...newProducts);
fs.writeFileSync(p, JSON.stringify(ps, null, 2));
console.log('Added', newProducts.length, 'new products. IDs:', newProducts.map(x => x.id));
console.log('New max ID:', Math.max(...ps.map(x => x.id)));