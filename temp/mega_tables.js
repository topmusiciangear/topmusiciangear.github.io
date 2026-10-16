const fs = require('fs');
const B = 'C:/Users/Daniel/projects/topmusiciangear/';
const guides = JSON.parse(fs.readFileSync(B + 'data/guides.json', 'utf8'));
const products = JSON.parse(fs.readFileSync(B + 'data/products.json', 'utf8'));

// [BestFor, BestFor_es, Type, Type_es, Format, Standout, Standout_es]
const D = {
  1001: ['Visual synthesis and learning sound design', 'Síntesis visual y aprendizaje de diseño de sonido', 'Wavetable, granular, sample + virtual analog', 'Tabla de ondas, granular, muestras + virtual analógico', 'VST2/VST3/AU/AAX', 'Visual modulation matrix with 104 filter types', 'Matriz de modulación visual con 104 tipos de filtro'],
  1002: ['Vintage analog warmth for techno and house', 'Calidez analógica vintage para techno y house', 'Virtual analog (circuit-modeled)', 'Virtual analógico (modelado de circuitos)', 'VST2/VST3/AU/AAX', 'Oscillator drift and filter saturation like hardware', 'Deriva de oscilador y saturación de filtro como hardware'],
  1003: ['Modular sound design and evolving textures', 'Diseño de sonido modular y texturas en evolución', 'Semi-modular softsynth', 'Sintetizador semimodular', 'VST2/VST3/AU/AAX', 'Snapin effects work as modulators or processors', 'Efectos snapin que funcionan como moduladores o procesadores'],
  1004: ['EDM production at festival scale', 'Producción EDM a escala de festival', 'Workstation (wavetable, sample, FM, VA)', 'Estación de trabajo (tabla de ondas, muestras, FM, VA)', 'VST2/VST3/AU/AAX', '12 oscillators per patch with step envelopes', '12 osciladores por parche con envolventes por pasos'],
  1005: ['Trance leads, basses and big-room synths', 'Leads, bajos y sintes trance y big-room', 'Polyphonic subtractive synth', 'Sintetizador sustractivo polifónico', 'VST2/VST3/AU/AAX', 'Four multimode oscillators with deep modulation', 'Cuatro osciladores multimodo con modulación profunda'],
  1006: ['Aggressive basses, leads and cinematic impacts', 'Bajos agresivos, leads e impactos cinematográficos', 'Wavetable synthesizer', 'Sintetizador por tabla de ondas', 'VST2/VST3/AU/AAX', '10 wavetable modes with deep routing matrix', '10 modos de tabla de ondas con matriz de ruteo profunda'],
  1007: ['Learning theory and writing progressions', 'Aprender teoría y escribir progresiones', 'Music theory workstation (MIDI)', 'Estación de teoría musical (MIDI)', 'VST2/VST3/AU/AAX', 'Automatic key detection with one-finger chords', 'Detección automática de tonalidad con acordes de un dedo'],
  1008: ['Turning MIDI loops into playable instruments', 'Convertir loops MIDI en instrumentos tocables', 'MIDI sampler and remixer', 'Sampler y remezclador MIDI', 'VST/VST3/AU/AAX', 'Slice, sequence and remix any MIDI file', 'Corta, secuencia y remezcla cualquier archivo MIDI'],
  1009: ['Building grooves from loops fast', 'Construir grooves desde loops rápido', 'Loop sequencer and groove generator', 'Secuenciador de loops y generador de grooves', 'VST/VST3/AU/AAX', 'Multi-track looping with intelligent variations', 'Loops multipista con variaciones inteligentes'],
  1010: ['AI drum patterns by genre', 'Patrones de batería con IA por género', 'AI drum pattern generator (MIDI)', 'Generador de patrones de batería con IA (MIDI)', 'VST/VST3/AU/AAX', 'Genre-aware generation with human-feel velocity', 'Generación por género con velocidad de sensación humana'],
  1011: ['Generative melodies locked to your scale', 'Melodías generativas fijadas a tu escala', 'Generative MIDI sequencer', 'Secuenciador MIDI generativo', 'VST/VST3/AU/AAX', 'Scale-aware generation with density control', 'Generación consciente de escala con control de densidad'],
  1012: ['Reshaping pitch inside mixed audio', 'Remodelar el tono dentro de audio mezclado', 'Polyphonic pitch mapper', 'Mapeador de tono polifónico', 'VST2/VST3/AU/AAX', 'Route individual notes of a mix to MIDI live', 'Enruta notas individuales de una mezcla a MIDI en vivo'],
  1013: ['Concert-grand realism for classical and film', 'Realismo de gran cola para clásica y cine', 'Sampled Steinway Model D grand', 'Gran cola Steinway Model D muestreado', 'VST/VST3/AU/AAX', 'Nine-foot Steinway D with concert dynamics', 'Steinway D de nueve pies con dinámica de concierto'],
  1014: ['Running the world\u2019s best piano libraries', 'Ejecutar las mejores bibliotecas de piano del mundo', 'Sampler platform', 'Plataforma de muestreo', 'VST3/AU/AAX', 'Hosts libraries from NI, Spitfire, Heavyocity and more', 'Aloja bibliotecas de NI, Spitfire, Heavyocity y más'],
  1015: ['Vintage electric pianos, organs and synths', 'Pianos eléctricos, órganos y sintes vintage', '45 modeled instruments suite', 'Suite de 45 instrumentos modelados', 'VST2/VST3/AU/AAX', '12,000+ presets via Analog Lab Pro', 'Más de 12.000 presets vía Analog Lab Pro'],
  1016: ['Pop, lo-fi and singer-songwriter pianos', 'Pianos para pop, lo-fi y cantautor', 'Sampled studio grand, upright and EP', 'Gran cola, vertical y EP muestreados', 'VST/AU/AAX', 'Clean mix-ready sound with mic mixing', 'Sonido limpio listo para mezcla con mezcla de micrófonos'],
  1017: ['Intimate felt piano for film and ambient', 'Piano de fieltro íntimo para cine y ambient', 'Felt + concert grand (Kontakt)', 'Fieltro + gran cola (Kontakt)', 'VST3/AU/AAX via Kontakt', 'Particles engine for evolving beds', 'Motor de partículas para bases en evolución'],
  1018: ['Morphing piano-to-synth textures', 'Texturas que mutan de piano a sinte', 'Hybrid acoustic grand + synth layers', 'Gran cola acústico + capas de sinte', 'VST2/VST3/AU/AAX', 'Morph control blends piano with synthesis', 'El control Morph mezcla piano con síntesis'],
  1019: ['Largest amp and pedal collection', 'La colección más grande de amplificadores y pedales', 'Amp and effects modeling suite', 'Suite de modelado de amplificadores y efectos', 'VST2/VST3/AU/AAX', '400+ gear models with Tonex capture integration', 'Más de 400 modelos con integración de capturas Tonex'],
  1020: ['Component-level amps with DynIR cabs', 'Amplis a nivel de componente con cabs DynIR', 'Amp modeler, FX and cabinet suite', 'Suite de modelado, FX y gabinetes', 'VST3/AU/AAX', 'DynIR virtual cabinets with studio effects', 'Gabinetes virtuales DynIR con efectos de estudio'],
  1021: ['Legendary rock room tone', 'Tono de sala de rock legendaria', 'Studio room and console emulation', 'Emulación de sala y consola de estudio', 'VST3/AU/AAX', 'Full Studio A signal chain with reverb chamber', 'Cadena completa de Studio A con cámara de reverb'],
  1022: ['British valve crunch in one plugin', 'Crunch británico de válvulas en un plugin', 'Single-amp valve simulator', 'Simulador de válvulas de un amplificador', 'VST3/AU/AAX', 'Valve amp with 3 cabs, drive, delay and reverb', 'Ampli de válvulas con 3 cabs, drive, delay y reverb'],
  1023: ['Official Marshall stack tones', 'Tonos oficiales de stacks Marshall', 'Marshall amp suite (Amp Room platform)', 'Suite Marshall (plataforma Amp Room)', 'VST/VST3/AU/AAX', 'Licensed Marshall amps, cabs and pedals', 'Amplis, cabs y pedales Marshall licenciados'],
  1025: ['Spectral repair of any audio problem', 'Reparación espectral de cualquier problema de audio', 'Audio repair suite', 'Suite de reparación de audio', 'VST3/AU/AAX', 'Visual spectral editor with dialogue tools', 'Editor espectral visual con herramientas de diálogo'],
  472: ['Taming resonances with one knob', 'Domar resonancias con una perilla', 'Spectral resonance suppressor', 'Supresor espectral de resonancias', 'VST2/VST3/AU/AAX', 'Single-control spectral processing', 'Procesamiento espectral de un solo control'],
  1027: ['Natural AI de-essing for vocals', 'De-essing natural con IA para voces', 'AI de-esser', 'De-esser con IA', 'VST2/VST3/AU/AAX', 'Neural network finds exact sibilant events', 'La red neuronal localiza eventos sibilantes exactos'],
  1028: ['Everyday cleanup on a budget', 'Limpieza diaria con presupuesto', '4-tool restoration suite', 'Suite de 4 herramientas', 'VST/VST3/AU/AAX', 'DeNoise, DeHum, DeClick and DeReverb in one', 'DeNoise, DeHum, DeClick y DeReverb en uno'],
  1030: ['Rescuing recordings from bad rooms', 'Rescatar grabaciones de salas malas', 'De-mixing de-reverb processor', 'Procesador de de-reverb por de-mixing', 'VST/VST3/AU/AAX', 'Separates direct sound from reflections', 'Separa el sonido directo de las reflexiones']
};
const ROWS = [
  ['Best For', 'Ideal para', 0, 1],
  ['Type', 'Tipo', 2, 3],
  ['Format', 'Formato', 4, 4],
  ['Platforms', 'Plataformas', null, null],
  ['Standout Feature', 'Característica destacada', 5, 6]
];
const TITLES = {
  'best-synth-vsts': ['Synth VSTs Compared', 'Comparativa de VST de sintetizador'],
  'best-midi-theory-plugins': ['MIDI & Theory Plugins Compared', 'Comparativa de plugins MIDI y de teoría'],
  'best-piano-keyboard-vsts': ['Piano & Keyboard VSTs Compared', 'Comparativa de VST de piano y teclado'],
  'best-guitar-plugins': ['Guitar Plugins Compared', 'Comparativa de plugins de guitarra'],
  'best-audio-repair-plugins': ['Audio Repair Plugins Compared', 'Comparativa de plugins de reparación']
};
Object.keys(TITLES).forEach(id => {
  const gd = guides.find(g => g.id === id);
  const feat = gd.featuredProducts || [];
  const missing = feat.filter(pid => !D[pid]);
  if (missing.length) console.log(id + ': MISSING TABLE DATA FOR ' + missing.join(','));
  const columns = feat.map(pid => {
    const p = products.find(x => x.id === pid);
    const t = (p ? p.brand + ' ' + p.title : 'ID ' + pid);
    return { title: t, title_es: t };
  });
  const rows = ROWS.map(([label, label_es, vi, ves]) => ({
    label, label_es,
    values: feat.map(pid => {
      const d = D[pid];
      if (!d) return { value: '-', value_es: '-' };
      if (vi === null) return { value: 'macOS & Windows', value_es: 'macOS y Windows' };
      return { value: d[vi], value_es: d[ves] };
    })
  }));
  gd.productTable = { title: TITLES[id][0], title_es: TITLES[id][1], columns, rows };
  console.log(id + ': table ' + columns.length + 'x' + rows.length);
});
guides.sort((a, b) => a.id.localeCompare(b.id));
fs.writeFileSync(B + 'data/guides.json', JSON.stringify(guides, null, 2), 'utf8');
console.log('TABLES rebuilt');
