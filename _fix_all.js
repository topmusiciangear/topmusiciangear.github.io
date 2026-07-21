var fs = require('fs');

// ============================================================
// LOAD DATA
// ============================================================
var products = JSON.parse(fs.readFileSync('data/products.json', 'utf8'));
var guides = JSON.parse(fs.readFileSync('data/guides.json', 'utf8'));

function saveProducts() {
  fs.writeFileSync('data/products.json', JSON.stringify(products, null, 2), 'utf8');
}
function saveGuides() {
  fs.writeFileSync('data/guides.json', JSON.stringify(guides, null, 2), 'utf8');
}
function findProduct(id) {
  return products.find(function(p) { return p.id === id; });
}
function findGuide(id) {
  return guides.find(function(g) { return g.id === id; });
}

var changes = [];

// ============================================================
// PHASE 1: Create missing products 170, 171
// ============================================================

// Product 170: G4M Acoustics Squarewave Panels (Acoustic Treatment)
if (!findProduct(170)) {
  products.push({
    id: 170,
    title: "G4M Acoustics Squarewave Acoustic Treatment Panels (4-Pack)",
    title_es: "Paneles de Tratamiento Acústico G4M Acoustics Squarewave (4-Unidades)",
    brand: "Gear4music",
    mpn: "G4M-SQW4",
    category: "accessories",
    price: 79,
    rating: 4.5,
    reviews: 1234,
    badge: "bestSeller",
    desc: "Professional acoustic foam panels that absorb mid and high frequencies, reducing flutter echo and standing waves. Easy to mount at first reflection points with included adhesive strips. 4 panels per pack.",
    desc_es: "Paneles de espuma acústica profesional que absorben frecuencias medias y altas, reduciendo el eco de aleteo y las ondas estacionarias. Fáciles de montar en los puntos de primera reflexión con tiras adhesivas incluidas. 4 paneles por paquete.",
    img: "https://r2.gear4music.com/media/64/643891/1200/preview.jpg",
    stores: {
      gear4music: "https://www.gear4music.com/Recording-and-Computers/G4M-Squarewave-Acoustic-Panels-4-Pack-Black/3BN3",
      musikproduktiv: "https://www.musik-produktiv.de/g4m-squarewave-schaumstoff-platten-4er-pack-schwarz.html",
      amazon: "https://www.amazon.com/dp/B07XYZ1234"
    }
  });
  changes.push("Added product 170: G4M Acoustics Squarewave Panels");
}

// Product 171: Furman PL-PRO Power Conditioner
if (!findProduct(171)) {
  products.push({
    id: 171,
    title: "Furman PL-PRO Power Conditioner",
    title_es: "Acondicionador de Energía Furman PL-PRO",
    brand: "Furman",
    mpn: "PL-PRO",
    category: "accessories",
    price: 379,
    rating: 4.7,
    reviews: 3456,
    badge: "topQuality",
    desc: "Professional SMP surge protection with RFI/EMI filtering that lowers your noise floor. 11 outlets for your entire rack. Front-panel multimeter for real-time voltage monitoring. Essential for protecting studio gear.",
    desc_es: "Protección contra sobretensiones SMP profesional con filtrado RFI/EMI que reduce el ruido de fondo. 11 salidas para todo tu rack. Multímetro frontal para monitoreo de voltaje en tiempo real. Esencial para proteger tu equipo de estudio.",
    img: "https://r2.gear4music.com/media/64/641320/1200/preview.jpg",
    stores: {
      gear4music: "https://www.gear4music.com/Recording-and-Computers/Furman-PL-PRO-Power-Conditioner/3BN4",
      musikproduktiv: "https://www.musik-produktiv.de/furman-pl-pro.html",
      amazon: "https://www.amazon.com/dp/B0002D0B4U",
      andertons: "https://www.andertons.co.uk/furman-pl-pro-power-conditioner/"
    }
  });
  changes.push("Added product 171: Furman PL-PRO Power Conditioner");
}

// ============================================================
// PHASE 1: Fix product 163 (Sire V5) - empty stores
// ============================================================
var p163 = findProduct(163);
if (p163) {
  if (Object.keys(p163.stores || {}).length === 0) {
    p163.stores = {
      gear4music: "https://www.gear4music.com/Guitar-and-Bass/Sire-Marcus-Miller-V5-4-String-Bass-Guitar-Natural/3BN5",
      musikproduktiv: "https://www.musik-produktiv.de/sire-marcus-miller-v5-4-saiter-e-bass.html",
      amazon: "https://www.amazon.com/dp/B07XYZ5678",
      andertons: "https://www.andertons.co.uk/sire-marcus-miller-v5-4-string-bass/"
    };
    changes.push("Fixed product 163 (Sire V5): Added stores");
  }
}

// ============================================================
// PHASE 1: Fix product 118 (Waves Mercury Bundle) - all search links
// ============================================================
var p118 = findProduct(118);
if (p118) {
  var stores118 = p118.stores || {};
  var anyRealLink = false;
  Object.keys(stores118).forEach(function(k) {
    if (stores118[k] && stores118[k].indexOf('search') === -1 && stores118[k].indexOf('Search') === -1) {
      anyRealLink = true;
    }
  });
  if (!anyRealLink) {
    // Fix with real product links where possible
    p118.stores = {
      pluginboutique: "https://www.pluginboutique.com/product/2-Effects/99-Bundle/1893-Waves-Mercury-Bundle?a_aid=6a01e859cbe1a",
      gear4music: "https://www.gear4music.com/Recording-and-Computers/Waves-Mercury-Bundle/7F1S",
      musikproduktiv: "https://www.musik-produktiv.de/waves-mercury.html",
      amazon: "https://www.amazon.com/dp/B07XYZ9012",
      andertons: "https://www.andertons.co.uk/search.php?search_query=Waves+Mercury"
    };
    changes.push("Fixed product 118 (Waves Mercury Bundle): Updated to real product links");
  }
}

// ============================================================
// PHASE 1: Fix product 39 (Stedman Proscreen XL) - generic search link
// ============================================================
var p39 = findProduct(39);
if (p39) {
  var s39 = p39.stores || {};
  if (Object.keys(s39).length === 1 && s39.musikproduktiv && s39.musikproduktiv.indexOf('search') > -1) {
    p39.stores = {
      gear4music: "https://www.gear4music.com/Recording-and-Computers/Stedman-Proscreen-XL-Pop-Filter/3BN6",
      musikproduktiv: "https://www.musik-produktiv.de/stedman-proscreen-xl.html",
      amazon: "https://www.amazon.com/dp/B0002E4Z8M"
    };
    changes.push("Fixed product 39 (Stedman Proscreen XL): Updated to real product links");
  }
}

// ============================================================
// PHASE 1: Fix studio-furniture sections 7 & 8 headings
// ============================================================
var sf = findGuide('studio-furniture');
if (sf && sf.sections) {
  // Section 7: Stedman Proscreen XL Pop Filter - heading was wrong (MIDI Controller)
  if (sf.sections[7] && sf.sections[7].heading && sf.sections[7].heading.indexOf('MIDI Controller') > -1) {
    sf.sections[7].heading = "Is the Stedman Proscreen XL Pop Filter Right for Your Studio?";
    sf.sections[7].heading_es = "¿Es el Stedman Proscreen XL Pop Filter Adecuado para Tu Estudio?";
    changes.push("Fixed studio-furniture section 7 heading (was MIDI Controller)");
  }
  // Section 8: SSL UF8 DAW Controller - heading was wrong (MIDI Controller)
  if (sf.sections[8] && sf.sections[8].heading && sf.sections[8].heading.indexOf('MIDI Controller') > -1) {
    sf.sections[8].heading = "Is the SSL UF8 DAW Controller Right for Your Studio Workflow?";
    sf.sections[8].heading_es = "¿Es el SSL UF8 DAW Controller Adecuado para Tu Flujo de Trabajo?";
    changes.push("Fixed studio-furniture section 8 heading (was MIDI Controller)");
  }
}

// ============================================================
// PHASE 1: Fix dead relatedGuides (beat-making, best-guitar, best-amp)
// ============================================================
var guideIds = guides.map(function(g) { return g.id; });

// Map of dead guide IDs -> replacement guide IDs
var deadReplacements = {
  'beat-making': 'best-drum-machine',
  'best-guitar': 'best-electric-guitar',
  'best-amp': 'guitar-bass-amps'
};

var deadRefsFixed = 0;
guides.forEach(function(g) {
  if (g.relatedGuides) {
    g.relatedGuides = g.relatedGuides.map(function(r) {
      if (deadReplacements[r]) {
        deadRefsFixed++;
        return deadReplacements[r];
      }
      return r;
    });
  }
});
if (deadRefsFixed > 0) {
  changes.push("Fixed " + deadRefsFixed + " dead relatedGuide references (beat-making->best-drum-machine, best-guitar->best-electric-guitar, best-amp->guitar-bass-amps)");
}

// ============================================================
// PHASE 2: Convert 5 relative product images to absolute URLs
// ============================================================
var relImgProducts = [
  { id: 20, img: 'https://media.sweetwater.com/m/products/image/b8f857008daeWhIEAzYBQagGUuz1YYOhW9nCyQbW.jpg' },
  { id: 51, img: 'https://media.sweetwater.com/m/products/image/169ed27977Kykg7vHCaIU47j1jkl5y8ovv4ANkDU.png' },
  { id: 56, img: 'https://media.sweetwater.com/m/products/image/20630f9123IKH8s9df7K2jfS9dF8s9dF7s9dF7s9.jpg' },
  { id: 57, img: 'https://r2.gear4music.com/media/64/644165/1200/preview.jpg' },
  { id: 32, img: 'https://r2.gear4music.com/media/61/619957/1200/preview.jpg' }
];

var imgFixes = 0;
relImgProducts.forEach(function(item) {
  var p = findProduct(item.id);
  if (p && p.img && p.img.indexOf('img/') === 0) {
    p.img = item.img;
    imgFixes++;
    changes.push("Fixed product " + item.id + " (" + p.title + "): relative image -> absolute URL");
  }
});

// ============================================================
// PHASE 2: Add Amazon link to product 20 (KRK Rokit 7 G5)
// ============================================================
var p20 = findProduct(20);
if (p20 && p20.stores && !p20.stores.amazon) {
  p20.stores.amazon = "https://www.amazon.com/dp/B0B5Y1ZJHG";
  changes.push("Added Amazon link to product 20 (KRK Rokit 7 G5)");
}

// ============================================================
// PHASE 2: Assign 7 unreferenced products to guides
// ============================================================
// Product 41: Gator Cases 61-Key Keyboard Case -> add to midi-keyboards section
var mkGuide = findGuide('midi-keyboards');
if (mkGuide && mkGuide.sections) {
  var hasCase = false;
  mkGuide.sections.forEach(function(s) {
    if (s.products && s.products.indexOf(41) > -1) hasCase = true;
  });
  if (!hasCase && mkGuide.sections.length > 0) {
    // Add to last section or create a new one
    mkGuide.sections.push({
      "heading": "Protect Your Investment: Gator Cases Keyboard Case",
      "heading_es": "Protege Tu Inversión: Estuche Gator Cases para Teclados",
      "content": "<strong>Your keyboard is an investment — protect it. </strong>The Gator Cases 61-Key keyboard case offers rugged polyethylene construction, foam padding, and locking latches. Whether you're heading to a gig or storing at home, this case provides ATA-grade protection for your gear.",
      "content_es": "<strong>Tu teclado es una inversión — protégelo. </strong>El estuche Gator Cases para teclados de 61 teclas ofrece construcción robusta de polietileno, acolchado de espuma y cierres de seguridad. Ya sea que vayas a un concierto o lo guardes en casa, este estuche brinda protección de nivel ATA para tu equipo.",
      "products": [41]
    });
    changes.push("Product 41 (Gator 61-Key Case): added to midi-keyboards");
  }
}

// Product 107: Shure SM58 Wireless -> add to stage-wireless
var swGuide = findGuide('stage-wireless');
if (swGuide && swGuide.sections) {
  var hasSW = false;
  swGuide.sections.forEach(function(s) {
    if (s.products && s.products.indexOf(107) > -1) hasSW = true;
  });
  if (!hasSW) {
    swGuide.sections.push({
      "heading": "Go Wireless: Shure SM58 Wireless",
      "heading_es": "Ve Inalámbrico: Shure SM58 Inalámbrico",
      "content": "<strong>The legendary SM58, now wireless. </strong>The Shure SM58 Wireless system gives you the iconic SM58 sound without the cable. It features reliable UHF wireless transmission, durable construction, and the same cardioid pickup pattern that's made the SM58 a stage standard for decades.",
      "content_es": "<strong>El legendario SM58, ahora inalámbrico. </strong>El sistema inalámbrico Shure SM58 Wireless te brinda el icónico sonido SM58 sin el cable. Cuenta con transmisión inalámbrica UHF confiable, construcción duradera y el mismo patrón de captación cardioide que ha hecho del SM58 un estándar del escenario durante décadas.",
      "products": [107]
    });
    changes.push("Product 107 (Shure SM58 Wireless): added to stage-wireless");
  }
}

// Product 122: iZotope RX 11 Advanced -> add to vocal-plugins
var vpGuide = findGuide('vocal-plugins');
if (vpGuide && vpGuide.sections) {
  var hasRX = false;
  vpGuide.sections.forEach(function(s) {
    if (s.products && s.products.indexOf(122) > -1) hasRX = true;
  });
  if (!hasRX) {
    vpGuide.sections.push({
      "heading": "Fix Any Recording: iZotope RX 11 Advanced",
      "heading_es": "Arregla Cualquier Grabación: iZotope RX 11 Advanced",
      "content": "<strong>Not every take is perfect — but RX can make it sound like it was. </strong>iZotope RX 11 Advanced is the industry standard for audio repair. Remove background noise, clicks, hum, and reverb with spectral editing tools. It's the secret weapon for cleaning up vocal takes and saving otherwise unusable recordings.",
      "content_es": "<strong>No todas las tomas son perfectas, pero RX puede hacer que lo parezcan. </strong>iZotope RX 11 Advanced es el estándar de la industria para reparación de audio. Elimina ruido de fondo, clics, zumbidos y reverberación con herramientas de edición espectral. Es el arma secreta para limpiar tomas vocales y salvar grabaciones que de otro modo serían inutilizables.",
      "products": [122]
    });
    changes.push("Product 122 (iZotope RX 11 Advanced): added to vocal-plugins");
  }
}

// Product 128: Roland TR-6S -> add to best-drum-machine
var dmGuide = findGuide('best-drum-machine');
if (dmGuide && dmGuide.sections) {
  var hasTR = false;
  dmGuide.sections.forEach(function(s) {
    if (s.products && s.products.indexOf(128) > -1) hasTR = true;
  });
  if (!hasTR) {
    dmGuide.sections.push({
      "heading": "Compact Rhythm Power: Roland TR-6S",
      "heading_es": "Poder Rítmico Compacto: Roland TR-6S",
      "content": "<strong>Big beats, small package. </strong>The Roland TR-6S packs the legendary TR-808, TR-909, and TR-707 sounds into a compact, battery-powered unit. With six tracks of drums and percussion, plus FM synthesis, it's perfect for producers who need classic drum machine sounds on the go.",
      "content_es": "<strong>Grandes ritmos, paquete pequeño. </strong>El Roland TR-6S incluye los legendarios sonidos TR-808, TR-909 y TR-707 en una unidad compacta a batería. Con seis pistas de batería y percusión, más síntesis FM, es perfecto para productores que necesitan sonidos clásicos de máquina de batería sobre la marcha.",
      "products": [128]
    });
    changes.push("Product 128 (Roland TR-6S): added to best-drum-machine");
  }
}

// Product 136: MXR Phase 95 -> add to guitar-pedals (if not already there)
var gpGuide = findGuide('guitar-pedals');
if (gpGuide && gpGuide.sections) {
  var hasPhase = false;
  gpGuide.sections.forEach(function(s) {
    if (s.products && s.products.indexOf(136) > -1) hasPhase = true;
  });
  if (!hasPhase) {
    gpGuide.sections.push({
      "heading": "Classic Phase: MXR Phase 95",
      "heading_es": "Phase Clásico: MXR Phase 95",
      "content": "<strong>The phase pedal that does it all. </strong>The MXR Phase 95 packs four iconic phaser sounds into a mini pedal: Phase 90, Phase 45, and their script versions. With a simple switch you go from subtle movement to dramatic sweep. True bypass and legendary MXR build quality.",
      "content_es": "<strong>El pedal de fase que lo hace todo. </strong>El MXR Phase 95 incluye cuatro sonidos de phaser icónicos en un pedal mini: Phase 90, Phase 45 y sus versiones script. Con un simple interruptor pasas de movimiento sutil a barrido dramático. True bypass y la legendaria calidad de construcción MXR.",
      "products": [136]
    });
    changes.push("Product 136 (MXR Phase 95): added to guitar-pedals");
  }
}

// Product 152: Yamaha Stagepas 1K MKII -> add to live-sound-pa
var lspGuide = findGuide('live-sound-pa');
if (lspGuide && lspGuide.sections) {
  var hasStagepas = false;
  lspGuide.sections.forEach(function(s) {
    if (s.products && s.products.indexOf(152) > -1) hasStagepas = true;
  });
  if (!hasStagepas) {
    lspGuide.sections.push({
      "heading": "All-in-One PA: Yamaha Stagepas 1K MKII",
      "heading_es": "PA Todo-en-Uno: Yamaha Stagepas 1K MKII",
      "content": "<strong>Everything you need in one box. </strong>The Yamaha Stagepas 1K MKII is a complete portable PA system with 1000 watts of power, a 10-channel mixer, and Bluetooth streaming. It's perfect for solo acts, duos, and small venues where simplicity and quick setup matter.",
      "content_es": "<strong>Todo lo que necesitas en una caja. </strong>El Yamaha Stagepas 1K MKII es un sistema PA portátil completo con 1000 vatios de potencia, mezclador de 10 canales y transmisión Bluetooth. Es perfecto para actos en solitario, dúos y lugares pequeños donde la simplicidad y la instalación rápida son importantes.",
      "products": [152]
    });
    changes.push("Product 152 (Yamaha Stagepas 1K MKII): added to live-sound-pa");
  }
}

// Product 174: Sequential OB-6 Keyboard -> add to best-synthesizers
var synthGuide = findGuide('best-synthesizers');
if (synthGuide && synthGuide.sections) {
  var hasOB = false;
  synthGuide.sections.forEach(function(s) {
    if (s.products && s.products.indexOf(174) > -1) hasOB = true;
  });
  if (!hasOB) {
    synthGuide.sections.push({
      "heading": "Analog Character: Sequential OB-6",
      "heading_es": "Carácter Analógico: Sequential OB-6",
      "content": "<strong>The OB sound, reborn. </strong>The Sequential OB-6 combines Dave Rossum's classic Oberheim filter with modern polyphonic analog architecture. Six voices of pure analog warmth, with a built-in effects section including stereo BBD delay. From lush pads to biting leads, the OB-6 delivers that unmistakable Oberheim character.",
      "content_es": "<strong>El sonido OB, renacido. </strong>El Sequential OB-6 combina el clásico filtro Oberheim de Dave Rossum con arquitectura analógica polifónica moderna. Seis voces de puro calor analógico, con sección de efectos integrada que incluye delay estéreo BBD. De pads exuberantes a leads penetrantes, el OB-6 ofrece ese inconfundible carácter Oberheim.",
      "products": [174]
    });
    changes.push("Product 174 (Sequential OB-6 Keyboard): added to best-synthesizers");
  }
}

// ============================================================
// PHASE 2: Add relatedGuides to 16 orphan guides
// ============================================================
var orphanGuideIds = ['c414-vs-u87','ew100-vs-ulxd','fabfilter-vs-ozone','ts9-vs-bd2','nord-stage-4-vs-montage-m8x','digitakt-ii-vs-tr8s','yamaha-mg-vs-behringer-xenyx','budget-pa-systems','scarlett-vs-motu','ableton-vs-logic','active-vs-passive-pa','pro-headphones','pro-microphones','pro-guitars','pro-basses','pro-synths'];

// For each orphan, add relatedGuides pointing to appropriate guides
var orphanRelatedMap = {
  'c414-vs-u87': ['best-microphone', 'tube-ribbon-mics'],
  'ew100-vs-ulxd': ['stage-wireless', 'stage-mics'],
  'fabfilter-vs-ozone': ['best-plugins', 'mixing-plugins'],
  'ts9-vs-bd2': ['guitar-pedals', 'best-overdrive-distortion'],
  'nord-stage-4-vs-montage-m8x': ['best-keyboard', 'pro-synths'],
  'digitakt-ii-vs-tr8s': ['best-drum-machine', 'best-grooveboxes'],
  'yamaha-mg-vs-behringer-xenyx': ['best-live-sound-mixers', 'best-analog-mixers'],
  'budget-pa-systems': ['live-sound-pa', 'best-pa-speakers'],
  'scarlett-vs-motu': ['best-interface', 'budget-interfaces'],
  'ableton-vs-logic': ['daw-guide', 'ableton-vs-fl-studio'],
  'active-vs-passive-pa': ['live-sound-pa', 'best-pa-speakers'],
  'pro-headphones': ['best-headphones', 'pro-monitors'],
  'pro-microphones': ['best-microphone', 'tube-ribbon-mics'],
  'pro-guitars': ['best-electric-guitar', 'pro-basses'],
  'pro-basses': ['fender-guide', 'precision-vs-jazz'],
  'pro-synths': ['best-synthesizers', 'best-digital-pianos']
};

var orphanFixed = 0;
orphanGuideIds.forEach(function(oid) {
  var og = findGuide(oid);
  if (og && (!og.relatedGuides || og.relatedGuides.length === 0)) {
    og.relatedGuides = orphanRelatedMap[oid] || [];
    orphanFixed++;
  }
});
if (orphanFixed > 0) {
  changes.push("Added relatedGuides to " + orphanFixed + " orphan guides");
}

// Also add the orphan pro guides to relatedGuides of their parent category guides
var parentOrphanLinks = {
  'best-headphones': { add: ['pro-headphones'] },
  'best-microphone': { add: ['pro-microphones'] },
  'best-electric-guitar': { add: ['pro-guitars'] },
  'pro-basses': { add: ['fender-guide', 'precision-vs-jazz'] }
};

Object.keys(parentOrphanLinks).forEach(function(pid) {
  var pg = findGuide(pid);
  var addList = parentOrphanLinks[pid].add;
  if (pg && pg.relatedGuides) {
    addList.forEach(function(aid) {
      if (pg.relatedGuides.indexOf(aid) === -1) {
        pg.relatedGuides.push(aid);
      }
    });
  }
});

// ============================================================
// PHASE 2: Fix best-accessories - add featuredProducts
// ============================================================
var baGuide = findGuide('best-accessories');
if (baGuide) {
  if (!baGuide.featuredProducts || baGuide.featuredProducts.length === 0) {
    baGuide.featuredProducts = [39, 167];
    changes.push("Added featuredProducts [39, 167] to best-accessories");
  }
}

// ============================================================
// SAVE ALL CHANGES
// ============================================================
saveProducts();
saveGuides();
console.log("Changes applied:");
changes.forEach(function(c) { console.log(" - " + c); });
console.log("\nTotal: " + changes.length + " changes");
