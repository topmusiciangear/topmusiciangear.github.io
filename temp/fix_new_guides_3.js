const fs = require('fs');
const B = 'C:/Users/Daniel/projects/topmusiciangear/';
const guides = JSON.parse(fs.readFileSync(B + 'data/guides.json', 'utf8'));
const products = JSON.parse(fs.readFileSync(B + 'data/products.json', 'utf8'));

// Per-product table data: [BestFor, BestFor_es, Type, Type_es, Format, Standout, Standout_es]
const D = {
  1001: ['Visual synthesis and learning sound design', 'Síntesis visual y aprendizaje de diseño de sonido', 'Wavetable, granular, sample + virtual analog', 'Tabla de ondas, granular, muestras + virtual analógico', 'VST2/VST3/AU/AAX', 'Visual modulation matrix with 104 filter types', 'Matriz de modulación visual con 104 tipos de filtro'],
  1002: ['Vintage analog warmth for techno and house', 'Calidez analógica vintage para techno y house', 'Virtual analog (circuit-modeled)', 'Virtual analógico (modelado de circuitos)', 'VST2/VST3/AU/AAX', 'Oscillator drift and filter saturation like hardware', 'Deriva de oscilador y saturación de filtro como hardware'],
  1003: ['Modular sound design and evolving textures', 'Diseño de sonido modular y texturas en evolución', 'Semi-modular softsynth', 'Sintetizador semimodular', 'VST2/VST3/AU/AAX', 'Snapin effects work as modulators or processors', 'Efectos snapin que funcionan como moduladores o procesadores'],
  1004: ['EDM production at festival scale', 'Producción EDM a escala de festival', 'Workstation (wavetable, sample, FM, VA)', 'Estación de trabajo (tabla de ondas, muestras, FM, VA)', 'VST2/VST3/AU/AAX', '12 oscillators per patch with step envelopes', '12 osciladores por parche con envolventes por pasos'],
  1005: ['Bass music and wavetable sound design', 'Música de bajos y diseño por tabla de ondas', 'Wavetable synthesizer', 'Sintetizador por tabla de ondas', 'VST2/VST3/AU/AAX', 'Visual wavetable editor, runs 20+ instances easily', 'Editor visual de tablas de ondas, ejecuta más de 20 instancias'],
  1006: ['Aggressive basses, leads and cinematic impacts', 'Bajos agresivos, leads e impactos cinematográficos', 'Wavetable synthesizer', 'Sintetizador por tabla de ondas', 'VST2/VST3/AU/AAX', '10 wavetable modes with deep routing matrix', '10 modos de tabla de ondas con matriz de ruteo profunda'],
  1007: ['Learning theory and writing progressions', 'Aprender teoría y escribir progresiones', 'Music theory workstation (MIDI)', 'Estación de teoría musical (MIDI)', 'VST2/VST3/AU/AAX', 'Automatic key detection with one-finger chords', 'Detección automática de tonalidad con acordes de un dedo'],
  1008: ['Sketching complete songs in minutes', 'Esbozar canciones completas en minutos', 'Songwriting suite, 5 plugins (MIDI)', 'Suite de escritura, 5 plugins (MIDI)', 'VST/AU', 'Chords, melody, bass, arpeggio and deep in one', 'Acordes, melodía, bajo, arpegio y deep en uno'],
  1009: ['Building grooves from loops fast', 'Construir grooves desde loops rápido', 'Loop sequencer and groove generator', 'Secuenciador de loops y generador de grooves', 'VST/VST3/AU/AAX', 'Multi-track looping with intelligent variations', 'Loops multipista con variaciones inteligentes'],
  1010: ['AI drum patterns by genre', 'Patrones de batería con IA por género', 'AI drum pattern generator (MIDI)', 'Generador de patrones de batería con IA (MIDI)', 'VST/VST3/AU/AAX', 'Genre-aware generation with human-feel velocity', 'Generación por género con velocidad de sensación humana'],
  1011: ['AI-generated melodies, bass and chords', 'Melodías, bajo y acordes generados por IA', 'AI composition suite, 4 plugins (MIDI)', 'Suite de composición con IA, 4 plugins (MIDI)', 'VST3/AU', 'Lock and regenerate individual musical elements', 'Bloquea y regenera elementos musicales individuales'],
  1012: ['Reshaping pitch inside mixed audio', 'Remodelar el tono dentro de audio mezclado', 'Polyphonic pitch mapper', 'Mapeador de tono polifónico', 'VST2/VST3/AU/AAX', 'Route individual notes of a mix to MIDI live', 'Enruta notas individuales de una mezcla a MIDI en vivo'],
  1013: ['Every keyboard sound in one library', 'Cada sonido de teclado en una biblioteca', 'Sampled collector keyboards', 'Teclados de coleccionista muestreados', 'VST2/VST3/AU/AAX', '500+ sounds with multiple mic positions', 'Más de 500 sonidos con múltiples posiciones de micrófono'],
  1014: ['Running the world\u2019s best piano libraries', 'Ejecutar las mejores bibliotecas de piano del mundo', 'Sampler platform', 'Plataforma de muestreo', 'VST3/AU/AAX', 'Hosts libraries from NI, Spitfire, Heavyocity and more', 'Aloja bibliotecas de NI, Spitfire, Heavyocity y más'],
  1015: ['Vintage electric pianos, organs and synths', 'Pianos eléctricos, órganos y sintes vintage', '45 modeled instruments suite', 'Suite de 45 instrumentos modelados', 'VST2/VST3/AU/AAX', '12,000+ presets via Analog Lab Pro', 'Más de 12.000 presets vía Analog Lab Pro'],
  1016: ['Pop, lo-fi and singer-songwriter pianos', 'Pianos para pop, lo-fi y cantautor', 'Sampled studio grand, upright and EP', 'Gran cola, vertical y EP muestreados', 'VST/AU/AAX', 'Clean mix-ready sound with mic mixing', 'Sonido limpio listo para mezcla con mezcla de micrófonos'],
  1017: ['Realistic piano with tiny footprint', 'Piano realista con huella mínima', 'Physically modeled piano', 'Piano modelado físicamente', 'VST2/VST3/AU/AAX', 'Responds like a real instrument, 12 packs included', 'Responde como un instrumento real, 12 paquetes incluidos'],
  1018: ['Cinematic hybrid piano textures', 'Texturas híbridas de piano cinematográficas', 'Prepared piano meets synthesis', 'Piano preparado con síntesis', 'VST/VST3/AU/AAX', '24 preparations on a 1909 Pleyel grand', '24 preparaciones en un piano de cola Pleyel de 1909'],
  1019: ['Largest amp and pedal collection', 'La colección más grande de amplificadores y pedales', 'Amp and effects modeling suite', 'Suite de modelado de amplificadores y efectos', 'VST2/VST3/AU/AAX', '400+ gear models with Tonex capture integration', 'Más de 400 modelos con integración de capturas Tonex'],
  1020: ['Tone matching and community presets', 'Coincidencia de tono y presets de la comunidad', 'Amp modeler with cloud library', 'Modelador con biblioteca en la nube', 'VST/AU/AAX', 'ToneCloud with 100,000+ user presets', 'ToneCloud con más de 100.000 presets de usuarios'],
  1021: ['Legendary rock room tone', 'Tono de sala de rock legendaria', 'Studio room and console emulation', 'Emulación de sala y consola de estudio', 'VST3/AU/AAX', 'Full Studio A signal chain with reverb chamber', 'Cadena completa de Studio A con cámara de reverb'],
  1022: ['One plugin covering every guitar genre', 'Un plugin que cubre cada género de guitarra', 'Amp suite with Fluid IR processing', 'Suite con procesamiento Fluid IR', 'VST/VST3/AU/AAX', '15 amps and 89 effects with amp-like response', '15 amplificadores y 89 efectos con respuesta real'],
  1023: ['Scandinavian cleans and tight high-gain', 'Limpios escandinavos y alta ganancia apretada', 'Amp platform with 4 suites', 'Plataforma con 4 suites', 'VST/VST3/AU/AAX', 'Vintage, Metal, Bass and Marshall suites', 'Suites Vintage, Metal, Bass y Marshall'],
  1024: ['Marshall, Mesa and ENGL high-gain', 'Alta ganancia Marshall, Mesa y ENGL', '8-amp emulation bundle', 'Bundle de 8 emulaciones', 'VST2/VST3/AU/AAX', 'Tolerance Modeling with 40 recording chains', 'Modelado de tolerancia con 40 cadenas de grabación'],
  1025: ['Spectral repair of any audio problem', 'Reparación espectral de cualquier problema de audio', 'Audio repair suite', 'Suite de reparación de audio', 'VST3/AU/AAX', 'Visual spectral editor with dialogue tools', 'Editor espectral visual con herramientas de diálogo'],
  1026: ['Taming harsh resonances transparently', 'Domar resonancias duras con transparencia', 'Dynamic resonance suppressor', 'Supresor dinámico de resonancias', 'VST2/VST3/AU/AAX', 'AI detection reduces only problem frequencies', 'La IA reduce solo frecuencias problemáticas'],
  1027: ['Natural AI de-essing for vocals', 'De-essing natural con IA para voces', 'AI de-esser', 'De-esser con IA', 'VST2/VST3/AU/AAX', 'Neural network finds exact sibilant events', 'La red neuronal localiza eventos sibilantes exactos'],
  1028: ['Everyday cleanup on a budget', 'Limpieza diaria con presupuesto', '4-tool restoration suite', 'Suite de 4 herramientas', 'VST/VST3/AU/AAX', 'DeNoise, DeHum, DeClick and DeReverb in one', 'DeNoise, DeHum, DeClick y DeReverb en uno'],
  1029: ['Removing or moving room reverb', 'Eliminar o mover la reverb de sala', 'Neural reverb modeling tool', 'Herramienta neuronal de reverb', 'VST/VST3/AU/AAX', 'Learn a room and transplant its reverb', 'Aprende una sala y trasplanta su reverb'],
  1030: ['Rescuing recordings from bad rooms', 'Rescatar grabaciones de salas malas', 'De-mixing de-reverb processor', 'Procesador de de-reverb por de-mixing', 'VST/VST3/AU/AAX', 'Separates direct sound from reflections', 'Separa el sonido directo de las reflexiones'],
  1031: ['Live tuning and the modern vocal effect', 'Afinación en vivo y el efecto vocal moderno', 'Real-time pitch correction', 'Corrección de tono en tiempo real', 'VST3/AU/AAX', 'Zero retune speed for the signature effect', 'Velocidad cero para el efecto característico'],
  1032: ['Invisible note-by-note vocal tuning', 'Afinación vocal nota por nota invisible', 'Polyphonic pitch editor', 'Editor de tono polifónico', 'VST3/AU/AAX', 'Edit pitch, timing and formants per note', 'Edita tono, timing y formantes por nota'],
  1033: ['Fast AI-assisted mastering', 'Mastering rápido asistido por IA', 'Mastering suite, 20 modules', 'Suite de mastering, 20 módulos', 'VST3/AU/AAX', 'Master Assistant with Tonal Balance Control', 'Master Assistant con Tonal Balance Control'],
  1034: ['Surgical manual mastering control', 'Control manual quirúrgico de mastering', 'Mastering bundle, 4 plugins', 'Bundle de mastering, 4 plugins', 'VST2/VST3/AU/AAX', 'Pro-Q 3, Pro-L 2, Pro-C 2 and Pro-MB', 'Pro-Q 3, Pro-L 2, Pro-C 2 y Pro-MB'],
  1035: ['Aligning vocal stacks in seconds', 'Alinear stacks vocales en segundos', 'In-DAW vocal alignment plugin', 'Plugin de alineación vocal en el DAW', 'VST3/AU/AAX', 'ARA integration with per-track control', 'Integración ARA con control por pista'],
  1036: ['Large-scale vocal production', 'Producción vocal a gran escala', 'Standalone vocal production suite', 'Suite independiente de producción vocal', 'Standalone + VST3/AU/AAX', 'Dozens of tracks with frame-level precision', 'Docenas de pistas con precisión de frame']
};

const ROWS = [
  ['Best For', 'Ideal para', 0, 1],
  ['Type', 'Tipo', 2, 3],
  ['Format', 'Formato', 4, 4],
  ['Platforms', 'Plataformas', null, null],
  ['Standout Feature', 'Característica destacada', 5, 6]
];

const TABLE_TITLES = {
  'best-synth-vsts': ['Synth VSTs Compared', 'Comparativa de VST de sintetizador'],
  'best-midi-theory-plugins': ['MIDI & Theory Plugins Compared', 'Comparativa de plugins MIDI y de teoría'],
  'best-piano-keyboard-vsts': ['Piano & Keyboard VSTs Compared', 'Comparativa de VST de piano y teclado'],
  'best-guitar-plugins': ['Guitar Plugins Compared', 'Comparativa de plugins de guitarra'],
  'best-audio-repair-plugins': ['Audio Repair Plugins Compared', 'Comparativa de plugins de reparación'],
  'autotune-vs-melodyne': ['Auto-Tune vs Melodyne Compared', 'Comparativa Auto-Tune vs Melodyne'],
  'ozone-vs-fabfilter': ['Ozone vs FabFilter Compared', 'Comparativa Ozone vs FabFilter'],
  'vocalign-vs-revoice-pro': ['VocAlign vs Revoice Pro Compared', 'Comparativa VocAlign vs Revoice Pro']
};

Object.keys(TABLE_TITLES).forEach(id => {
  const gd = guides.find(g => g.id === id);
  const feat = gd.featuredProducts || [];
  const columns = feat.map(pid => {
    const p = products.find(x => x.id === pid);
    const t = p.brand + ' ' + p.title;
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
  gd.productTable = { title: TABLE_TITLES[id][0], title_es: TABLE_TITLES[id][1], columns, rows };
  console.log(id + ': table rebuilt with ' + columns.length + ' columns x ' + rows.length + ' rows');
});

guides.sort((a, b) => a.id.localeCompare(b.id));
fs.writeFileSync(B + 'data/guides.json', JSON.stringify(guides, null, 2), 'utf8');
console.log('Part 3 done');
