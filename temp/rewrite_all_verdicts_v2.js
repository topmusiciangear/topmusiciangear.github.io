const fs = require('fs');
const path = require('path');

const guides = JSON.parse(fs.readFileSync(path.join(__dirname, '../data/guides.json'), 'utf8'));
const products = JSON.parse(fs.readFileSync(path.join(__dirname, '../data/products.json'), 'utf8'));

// Build product lookup by ID
const productMap = new Map();
for (const p of products) {
  productMap.set(p.id, p);
}

// Category-based descriptive phrases
const categoryPhrases = {
  'audio-interfaces': { en: 'audio interface', es: 'interfaz de audio' },
  'microphones': { en: 'microphone', es: 'micrófono' },
  'headphones': { en: 'headphones', es: 'auriculares' },
  'studio-monitors': { en: 'studio monitors', es: 'monitores de estudio' },
  'midi-keyboards': { en: 'MIDI keyboard', es: 'teclado MIDI' },
  'electric-guitars': { en: 'electric guitar', es: 'guitarra eléctrica' },
  'acoustic-guitars': { en: 'acoustic guitar', es: 'guitarra acústica' },
  'bass-guitars': { en: 'bass guitar', es: 'bajo' },
  'drum-machines': { en: 'drum machine', es: 'caja de ritmos' },
  'synthesizers': { en: 'synthesizer', es: 'sintetizador' },
  'mixers': { en: 'mixer', es: 'mezclador' },
  'plugins': { en: 'plugin', es: 'plugin' },
  'daw': { en: 'DAW', es: 'DAW' },
  'preamps': { en: 'preamp', es: 'previo' },
  'compressors': { en: 'compressor', es: 'compresor' },
  'equalizers': { en: 'EQ', es: 'EQ' },
  'reverb': { en: 'reverb', es: 'reverb' },
  'wireless-systems': { en: 'wireless system', es: 'sistema inalámbrico' },
  'pianos': { en: 'piano', es: 'piano' },
  'keyboards': { en: 'keyboard', es: 'teclado' },
  'amps': { en: 'amplifier', es: 'amplificador' },
  'pedals': { en: 'pedal', es: 'pedal' },
  'recording': { en: 'recording gear', es: 'equipo de grabación' },
  'accessories': { en: 'accessory', es: 'accesorio' },
  'software': { en: 'software', es: 'software' },
  'vocal': { en: 'vocal processor', es: 'procesador vocal' },
  'mastering': { en: 'mastering tool', es: 'herramienta de masterización' },
  'beatmaking': { en: 'beatmaking tool', es: 'herramienta de beatmaking' },
  'guitar-plugins': { en: 'guitar plugin', es: 'plugin de guitarra' },
  'amp-sim': { en: 'amp sim', es: 'sim de ampli' },
  'sidechain': { en: 'sidechain tool', es: 'herramienta de sidechain' },
  'modulation': { en: 'modulation plugin', es: 'plugin de modulación' },
  'channel-strip': { en: 'channel strip', es: 'channel strip' },
  'audio-repair': { en: 'audio repair tool', es: 'herramienta de reparación' },
  'ai-tools': { en: 'AI tool', es: 'herramienta de IA' },
  'midi-theory': { en: 'MIDI theory tool', es: 'herramienta de teoría MIDI' },
  'piano-vst': { en: 'piano VST', es: 'VST de piano' },
  'live-sound': { en: 'live sound gear', es: 'equipo de sonido en vivo' },
  'dj': { en: 'DJ gear', es: 'equipo DJ' },
  'computer': { en: 'computer', es: 'ordenador' },
  'storage': { en: 'storage', es: 'almacenamiento' },
  'cables': { en: 'cable', es: 'cable' },
  'stands': { en: 'stand', es: 'soporte' },
  'furniture': { en: 'studio furniture', es: 'mueble de estudio' },
  'acoustic-treatment': { en: 'acoustic treatment', es: 'tratamiento acústico' },
  'midi-controllers': { en: 'MIDI controller', es: 'controlador MIDI' },
  'drum-machines': { en: 'drum machine', es: 'caja de ritmos' },
  'samplers': { en: 'sampler', es: 'sampler' },
  'grooveboxes': { en: 'groovebox', es: 'groovebox' },
  'synths': { en: 'synthesizer', es: 'sintetizador' },
  'workstations': { en: 'workstation', es: 'estación de trabajo' },
  'stage-keyboards': { en: 'stage keyboard', es: 'teclado de escenario' },
  'controllers': { en: 'controller', es: 'controlador' },
  'interfaces': { en: 'audio interface', es: 'interfaz de audio' },
  'monitors': { en: 'studio monitors', es: 'monitores de estudio' },
  'speakers': { en: 'speakers', es: 'altavoces' },
  'subwoofers': { en: 'subwoofer', es: 'subwoofer' },
  'headphone-amps': { en: 'headphone amp', es: 'amplificador de auriculares' },
  'headphone-amplifiers': { en: 'headphone amplifier', es: 'amplificador de auriculares' },
  'mixers': { en: 'mixer', es: 'mezclador' },
  'digital-mixers': { en: 'digital mixer', es: 'mezclador digital' },
  'analog-mixers': { en: 'analog mixer', es: 'mezclador analógico' },
  'compact-mixers': { en: 'compact mixer', es: 'mezclador compacto' },
  'rack-mixers': { en: 'rack mixer', es: 'mezclador de rack' },
  'live-mixers': { en: 'live mixer', es: 'mezclador de directo' },
  'studio-mixers': { en: 'studio mixer', es: 'mezclador de estudio' },
  'dj-mixers': { en: 'DJ mixer', es: 'mezclador DJ' },
  'midi-keyboards': { en: 'MIDI keyboard', es: 'teclado MIDI' },
  'keyboard-synths': { en: 'keyboard synth', es: 'sintetizador de teclado' },
  'analog-synths': { en: 'analog synth', es: 'sintetizador analógico' },
  'digital-synths': { en: 'digital synth', es: 'sintetizador digital' },
  'modular-synths': { en: 'modular synth', es: 'sintetizador modular' },
  'poly-synths': { en: 'polyphonic synth', es: 'sintetizador polifónico' },
  'mono-synths': { en: 'monophonic synth', es: 'sintetizador monofónico' },
  'hybrid-synths': { en: 'hybrid synth', es: 'sintetizador híbrido' },
  'romplers': { en: 'rompler', es: 'rompler' },
  'workstation-synths': { en: 'workstation synth', es: 'sintetizador workstation' },
  'stage-pianos': { en: 'stage piano', es: 'piano de escenario' },
  'digital-pianos': { en: 'digital piano', es: 'piano digital' },
  'upright-pianos': { en: 'upright piano', es: 'piano vertical' },
  'grand-pianos': { en: 'grand piano', es: 'piano de cola' },
  'keytars': { en: 'keytar', es: 'keytar' },
  'accordion': { en: 'accordion', es: 'acordeón' },
  'midi-guitars': { en: 'MIDI guitar', es: 'guitarra MIDI' },
  'midi-drums': { en: 'MIDI drums', es: 'batería MIDI' },
  'midi-controllers': { en: 'MIDI controller', es: 'controlador MIDI' },
  'control-surfaces': { en: 'control surface', es: 'superficie de control' },
  'streaming': { en: 'streaming gear', es: 'equipo de streaming' },
  'podcast': { en: 'podcast gear', es: 'equipo de podcast' },
  'broadcast': { en: 'broadcast gear', es: 'equipo de broadcast' },
  'field-recording': { en: 'field recorder', es: 'grabador de campo' },
  'handheld-recorders': { en: 'handheld recorder', es: 'grabador portátil' },
  'multitrack-recorders': { en: 'multitrack recorder', es: 'grabador multitrack' },
  'portable-recorders': { en: 'portable recorder', es: 'grabador portátil' },
  'studio-recorders': { en: 'studio recorder', es: 'grabador de estudio' },
  'reel-to-reel': { en: 'reel-to-reel', es: 'reel-to-reel' },
  'cassette': { en: 'cassette deck', es: 'pletina de casete' },
  'vinyl': { en: 'turntable', es: 'tornamesa' },
  'cd-players': { en: 'CD player', es: 'reproductor de CD' },
  'media-players': { en: 'media player', es: 'reproductor multimedia' },
  'synth-modules': { en: 'synth module', es: 'módulo de sintetizador' },
  'drum-modules': { en: 'drum module', es: 'módulo de batería' },
  'sound-modules': { en: 'sound module', es: 'módulo de sonido' },
  'expanders': { en: 'expander', es: 'expander' },
  'samplers': { en: 'sampler', es: 'sampler' },
  'sequencers': { en: 'sequencer', es: 'secuenciador' },
  'grooveboxes': { en: 'groovebox', es: 'groovebox' },
  'beatstations': { en: 'beatstation', es: 'beatstation' },
  'loopers': { en: 'looper', es: 'looper' },
  'loop-stations': { en: 'loop station', es: 'estación de loops' },
  'phrase-samplers': { en: 'phrase sampler', es: 'sampler de frases' },
  'drum-pads': { en: 'drum pads', es: 'pads de batería' },
  'sample-pads': { en: 'sample pads', es: 'pads de sampleo' },
  'finger-drums': { en: 'finger drums', es: 'finger drums' },
  'electronic-drums': { en: 'electronic drums', es: 'batería electrónica' },
  'drum-kits': { en: 'drum kit', es: 'batería' },
  'cymbals': { en: 'cymbals', es: 'platillos' },
  'hardware': { en: 'hardware', es: 'hardware' },
  'drum-hardware': { en: 'drum hardware', es: 'hardware de batería' },
  'pedals': { en: 'pedal', es: 'pedal' },
  'effects-pedals': { en: 'effects pedal', es: 'pedal de efectos' },
  'guitar-pedals': { en: 'guitar pedal', es: 'pedal de guitarra' },
  'bass-pedals': { en: 'bass pedal', es: 'pedal de bajo' },
  'vocal-pedals': { en: 'vocal pedal', es: 'pedal de voz' },
  'multi-effects': { en: 'multi-effects', es: 'multi-efectos' },
  'amp-modelers': { en: 'amp modeler', es: 'modelador de ampli' },
  'profiling-amps': { en: 'profiling amp', es: 'amplificador de perfil' },
  'modeling-amps': { en: 'modeling amp', es: 'amplificador modelador' },
  'hybrid-amps': { en: 'hybrid amp', es: 'amplificador híbrido' },
  'tube-amps': { en: 'tube amp', es: 'amplificador de válvulas' },
  'solid-state-amps': { en: 'solid-state amp', es: 'amplificador de estado sólido' },
  'modeling-amps': { en: 'modeling amp', es: 'amplificador modelador' },
  'bass-amps': { en: 'bass amp', es: 'amplificador de bajo' },
  'guitar-amps': { en: 'guitar amp', es: 'amplificador de guitarra' },
  'acoustic-amps': { en: 'acoustic amp', es: 'amplificador acústico' },
  'keyboard-amps': { en: 'keyboard amp', es: 'amplificador de teclado' },
  'drum-amps': { en: 'drum amp', es: 'amplificador de batería' },
  'pa-amps': { en: 'PA amp', es: 'amplificador PA' },
  'power-amps': { en: 'power amp', es: 'amplificador de potencia' },
  'headphone-amps': { en: 'headphone amp', es: 'amplificador de auriculares' },
  'preamp': { en: 'preamp', es: 'previo' },
  'channel-strips': { en: 'channel strip', es: 'channel strip' },
  'compressors': { en: 'compressor', es: 'compresor' },
  'limiters': { en: 'limiter', es: 'limitador' },
  'gates': { en: 'noise gate', es: 'puerta de ruido' },
  'expanders': { en: 'expander', es: 'expander' },
  'eq': { en: 'EQ', es: 'EQ' },
  'equalizers': { en: 'equalizer', es: 'ecualizador' },
  'filters': { en: 'filter', es: 'filtro' },
  'crossovers': { en: 'crossover', es: 'crossover' },
  'crossovers': { en: 'crossover', es: 'crossover' },
  'speaker-management': { en: 'speaker management', es: 'gestión de altavoces' },
  'system-processors': { en: 'system processor', es: 'procesador de sistema' },
  'digital-processors': { en: 'digital processor', es: 'procesador digital' },
  'analog-processors': { en: 'analog processor', es: 'procesador analógico' },
  'outboard': { en: 'outboard gear', es: 'outboard' },
  'rack-gear': { en: 'rack gear', es: 'equipo de rack' },
  '500-series': { en: '500-series module', es: 'módulo 500-series' },
  'lunchbox': { en: 'lunchbox module', es: 'módulo lunchbox' },
  'modular': { en: 'modular synth', es: 'sintetizador modular' },
  'eurorack': { en: 'Eurorack module', es: 'módulo Eurorack' },
  'semi-modular': { en: 'semi-modular synth', es: 'sintetizador semi-modular' },
  'patchbays': { en: 'patchbay', es: 'patchbay' },
  'patch-cables': { en: 'patch cable', es: 'cable de patch' },
  'midi-cables': { en: 'MIDI cable', es: 'cable MIDI' },
  'audio-cables': { en: 'audio cable', es: 'cable de audio' },
  'speaker-cables': { en: 'speaker cable', es: 'cable de altavoz' },
  'instrument-cables': { en: 'instrument cable', es: 'cable de instrumento' },
  'xlr-cables': { en: 'XLR cable', es: 'cable XLR' },
  'trs-cables': { en: 'TRS cable', es: 'cable TRS' },
  'ts-cables': { en: 'TS cable', es: 'cable TS' },
  'rca-cables': { en: 'RCA cable', es: 'cable RCA' },
  'usb-cables': { en: 'USB cable', es: 'cable USB' },
  'firewire-cables': { en: 'FireWire cable', es: 'cable FireWire' },
  'thunderbolt-cables': { en: 'Thunderbolt cable', es: 'cable Thunderbolt' },
  'optical-cables': { en: 'optical cable', es: 'cable óptico' },
  'digital-cables': { en: 'digital cable', es: 'cable digital' },
  'madi-cables': { en: 'MADI cable', es: 'cable MADI' },
  'aes-cables': { en: 'AES cable', es: 'cable AES' },
  'bnc-cables': { en: 'BNC cable', es: 'cable BNC' },
  'ethernet-cables': { en: 'Ethernet cable', es: 'cable Ethernet' },
  'network-cables': { en: 'network cable', es: 'cable de red' },
  'fiber-optic-cables': { en: 'fiber optic cable', es: 'cable de fibra óptica' },
  'power-cables': { en: 'power cable', es: 'cable de alimentación' },
  'power-conditioners': { en: 'power conditioner', es: 'acondicionador de corriente' },
  'power-strips': { en: 'power strip', es: 'regleta' },
  'surge-protectors': { en: 'surge protector', es: 'protector de sobretensión' },
  'ups': { en: 'UPS', es: 'SAI' },
  'ground-lifts': { en: 'ground lift', es: 'lift de tierra' },
  'hum-eliminators': { en: 'hum eliminator', es: 'eliminador de hum' },
  'direct-boxes': { en: 'DI box', es: 'caja DI' },
  'reamp-boxes': { en: 'reamp box', es: 'caja de reamp' },
  'splitters': { en: 'splitter', es: 'splitter' },
  'combiners': { en: 'combiner', es: 'combinador' },
  'switchers': { en: 'switcher', es: 'switcher' },
  'routers': { en: 'router', es: 'router' },
  'preamps': { en: 'preamp', es: 'previo' },
  'microphone-preamps': { en: 'microphone preamp', es: 'previo de micrófono' },
  'instrument-preamps': { en: 'instrument preamp', es: 'previo de instrumento' },
  'channel-preamps': { en: 'channel preamp', es: 'previo de canal' },
  'strip-preamps': { en: 'strip preamp', es: 'previo de strip' },
  'vocal-preamps': { en: 'vocal preamp', es: 'previo de voz' },
  'bass-preamps': { en: 'bass preamp', es: 'previo de bajo' },
  'guitar-preamps': { en: 'guitar preamp', es: 'previo de guitarra' },
  'acoustic-preamps': { en: 'acoustic preamp', es: 'previo acústico' },
  'keyboard-preamps': { en: 'keyboard preamp', es: 'previo de teclado' },
  'drum-preamps': { en: 'drum preamp', es: 'previo de batería' },
  'pa-preamps': { en: 'PA preamp', es: 'previo PA' },
  'power-preamps': { en: 'power preamp', es: 'previo de potencia' },
  'headphone-preamps': { en: 'headphone preamp', es: 'previo de auriculares' },
  'monitor-preamps': { en: 'monitor preamp', es: 'previo de monitores' },
  'controller-preamps': { en: 'controller preamp', es: 'previo de controlador' },
  'system-preamps': { en: 'system preamp', es: 'previo de sistema' },
  'digital-preamps': { en: 'digital preamp', es: 'previo digital' },
  'analog-preamps': { en: 'analog preamp', es: 'previo analógico' },
  'tube-preamps': { en: 'tube preamp', es: 'previo de válvulas' },
  'solid-state-preamps': { en: 'solid-state preamp', es: 'previo de estado sólido' },
  'hybrid-preamps': { en: 'hybrid preamp', es: 'previo híbrido' },
  'modeling-preamps': { en: 'modeling preamp', es: 'previo modelador' },
  'profiling-preamps': { en: 'profiling preamp', es: 'previo de perfil' },
  'amp-preamps': { en: 'amp preamp', es: 'previo de ampli' },
  'bass-amp-preamps': { en: 'bass amp preamp', es: 'previo de ampli de bajo' },
  'guitar-amp-preamps': { en: 'guitar amp preamp', es: 'previo de ampli de guitarra' },
  'acoustic-amp-preamps': { en: 'acoustic amp preamp', es: 'previo de ampli acústico' },
  'keyboard-amp-preamps': { en: 'keyboard amp preamp', es: 'previo de ampli de teclado' },
  'drum-amp-preamps': { en: 'drum amp preamp', es: 'previo de ampli de batería' },
  'pa-amp-preamps': { en: 'PA amp preamp', es: 'previo de ampli PA' },
  'power-amp-preamps': { en: 'power amp preamp', es: 'previo de ampli de potencia' },
  'headphone-amp-preamps': { en: 'headphone amp preamp', es: 'previo de ampli de auriculares' },
  'monitor-amp-preamps': { en: 'monitor amp preamp', es: 'previo de ampli de monitores' },
  'controller-amp-preamps': { en: 'controller amp preamp', es: 'previo de ampli de controlador' },
  'system-amp-preamps': { en: 'system amp preamp', es: 'previo de ampli de sistema' },
  'digital-amp-preamps': { en: 'digital amp preamp', es: 'previo de ampli digital' },
  'analog-amp-preamps': { en: 'analog amp preamp', es: 'previo de ampli analógico' },
  'tube-amp-preamps': { en: 'tube amp preamp', es: 'previo de ampli de válvulas' },
  'solid-state-amp-preamps': { en: 'solid-state amp preamp', es: 'previo de ampli de estado sólido' },
  'hybrid-amp-preamps': { en: 'hybrid amp preamp', es: 'previo de ampli híbrido' },
  'modeling-amp-preamps': { en: 'modeling amp preamp', es: 'previo de ampli modelador' },
  'profiling-amp-preamps': { en: 'profiling amp preamp', es: 'previo de ampli de perfil' },
};

// Get descriptive phrase for a product
function getProductPhrase(product, lang) {
  const cat = product.category || 'accessories';
  const phrase = categoryPhrases[cat] || { en: cat, es: cat };
  return phrase[lang] || phrase.en;
}

// Generate verdict text for a guide
function generateVerdict(guide, productList, lang) {
  const isEs = lang === 'es';
  const phrases = productList.map(p => getProductPhrase(p, lang));
  
  // Group by category for better flow
  const byCategory = new Map();
  for (let i = 0; i < productList.length; i++) {
    const cat = productList[i].category || 'accessories';
    if (!byCategory.has(cat)) byCategory.set(cat, []);
    byCategory.get(cat).push({ product: productList[i], phrase: phrases[i] });
  }
  
  // Build verdict
  let verdict = '';
  const categories = Array.from(byCategory.keys());
  
  if (categories.length === 1) {
    // Single category - list all products
    const items = byCategory.get(categories[0]);
    if (items.length <= 3) {
      verdict = items.map(i => i.product.title).join(', ');
    } else {
      const first = items.slice(0, -1).map(i => i.product.title).join(', ');
      verdict = `${first} and ${items[items.length - 1].product.title}`;
    }
    verdict += isEs ? ' son los mejores en su categoría.' : ' are the best in their category.';
  } else {
    // Multiple categories - group them
    const parts = [];
    for (const [cat, items] of byCategory) {
      if (items.length === 1) {
        parts.push(items[0].product.title);
      } else {
        const names = items.map(i => i.product.title);
        if (names.length <= 3) {
          parts.push(names.join(', '));
        } else {
          parts.push(`${names.slice(0, -1).join(', ')} and ${names[names.length - 1]}`);
        }
      }
    }
    verdict = parts.join('; ') + '.';
  }
  
  return verdict;
}

// Generate conclusion text for a guide
function generateConclusion(guide, productList, lang) {
  const isEs = lang === 'es';
  
  // Group by category
  const byCategory = new Map();
  for (const p of productList) {
    const cat = p.category || 'accessories';
    if (!byCategory.has(cat)) byCategory.set(cat, []);
    byCategory.get(cat).push(p);
  }
  
  let conclusion = '';
  const categories = Array.from(byCategory.keys());
  
  if (categories.length === 1) {
    const items = byCategory.get(categories[0]);
    if (items.length <= 3) {
      conclusion = items.map(p => p.title).join(', ');
    } else {
      const first = items.slice(0, -1).map(p => p.title).join(', ');
      conclusion = `${first} and ${items[items.length - 1].title}`;
    }
    conclusion += isEs ? ' son las mejores opciones para esta categoría.' : ' are the best options for this category.';
  } else {
    const parts = [];
    for (const [cat, items] of byCategory) {
      if (items.length === 1) {
        parts.push(items[0].title);
      } else {
        const names = items.map(p => p.title);
        if (names.length <= 3) {
          parts.push(names.join(', '));
        } else {
          parts.push(`${names.slice(0, -1).join(', ')} and ${names[names.length - 1]}`);
        }
      }
    }
    conclusion = parts.join('; ') + '.';
  }
  
  return conclusion;
}

// Process all guides
let count = 0;
for (const guide of guides) {
  // Collect all unique products from all sections
  const productIds = new Set();
  for (const section of guide.sections || []) {
    for (const pid of section.products || []) {
      productIds.add(pid);
    }
  }
  
  // Get product objects
  const productList = [];
  for (const pid of productIds) {
    const p = productMap.get(pid);
    if (p) productList.push(p);
  }
  
  if (productList.length === 0) continue;
  
  // Sort by score descending
  productList.sort((a, b) => (b.score || 0) - (a.score || 0));
  
  // Generate verdict and conclusion
  guide.verdict = generateVerdict(guide, productList, 'en');
  guide.verdict_es = generateVerdict(guide, productList, 'es');
  guide.conclusion = generateConclusion(guide, productList, 'en');
  guide.conclusion_es = generateConclusion(guide, productList, 'es');
  
  count++;
}

fs.writeFileSync(path.join(__dirname, '../data/guides.json'), JSON.stringify(guides, null, 2));
console.log(`Total: ${count} guides actualizados con veredictos y conclusiones completos.`);
