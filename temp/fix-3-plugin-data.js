var fs = require('fs');
var path = require('path');
var file = path.join(__dirname, '..', 'data', 'guides.json');
var data = JSON.parse(fs.readFileSync(file, 'utf8'));

// ===== AI-TOOLS-PLUGINS: smart:EQ 4, Neutron 5, MIXROOM, smart:limit, Trash =====
var ai = data.find(g => g.id === 'ai-tools-plugins');
if (ai) {
  ai.comparison = {
    "headers": ["Sonible smart:EQ 4", "iZotope Neutron 5", "Mastering The Mix MIXROOM", "Sonible smart:limit", "iZotope Trash"],
    "rows": [
      {
        "label": "Type", "val": "Smart EQ", "val2": "Mixing Suite", "val3": "Reference Matching EQ", "val4": "Smart Limiter", "val5": "Distortion & Saturation",
        "label_es": "Tipo", "val_es": "EQ Inteligente", "val2_es": "Suite de Mezcla", "val3_es": "EQ de Comparación con Referencia", "val4_es": "Limitador Inteligente", "val5_es": "Distorsión y Saturación"
      },
      {
        "label": "AI Features", "val": "Spectral balancing, multi-track masking detection", "val2": "Mix Assistant, Unmask, module suggestions", "val3": "Reference track tonal matching", "val4": "Real-time loudness adaptation", "val5": "None — waveshaping-based",
        "label_es": "Funciones IA", "val_es": "Balance espectral, detección de enmascaramiento multitrack", "val2_es": "Asistente de mezcla, Unmask, sugerencias de módulos", "val3_es": "Comparación tonal con pista de referencia", "val4_es": "Adaptación de loudness en tiempo real", "val5_es": "Ninguna — basado en waveshaping"
      },
      {
        "label": "Tracks", "val": "Multi-track analysis", "val2": "Single or multi-track", "val3": "Master bus", "val4": "Master bus", "val5": "Per-instance",
        "label_es": "Tracks", "val_es": "Análisis multitrack", "val2_es": "Individual o multitrack", "val3_es": "Bus principal", "val4_es": "Bus principal", "val5_es": "Por instancia"
      },
      {
        "label": "Best For", "val": "EQ across all mixing sessions", "val2": "Individual track mixing assistance", "val3": "Matching your mix to a reference", "val4": "Final limiting with intelligent LUFS", "val5": "Creative distortion and sound design",
        "label_es": "Ideal Para", "val_es": "EQ en todas las sesiones de mezcla", "val2_es": "Asistencia de mezcla por pista", "val3_es": "Igualar tu mezcla con una referencia", "val4_es": "Limitación final con LUFS inteligente", "val5_es": "Distorsión creativa y diseño sonoro"
      }
    ]
  };
  ai.verdictProsCons = [
    {
      "name": "Sonible smart:EQ 4", "name_es": "Sonible smart:EQ 4",
      "pros": ["AI spectral balancing corrects mix issues in seconds", "Multi-track masking detection saves hours of soloing", "Profile-based learning adapts to any instrument or genre", "Clean, intuitive interface with minimal learning curve"],
      "pros_es": ["El balance espectral con IA corrige problemas de mezcla en segundos", "La detección de enmascaramiento multitrack ahorra horas de solo", "El aprendizaje por perfiles se adapta a cualquier instrumento o género", "Interfaz limpia e intuitiva con mínima curva de aprendizaje"],
      "cons": ["Single-function plugin — only handles EQ tasks", "AI suggestions sometimes need manual fine-tuning", "Higher price than basic EQ plugins"],
      "cons_es": ["Plugin de función única — solo maneja tareas de EQ", "Las sugerencias de IA a veces necesitan ajuste manual", "Precio más alto que plugins de EQ básicos"]
    },
    {
      "name": "iZotope Neutron 5", "name_es": "iZotope Neutron 5",
      "pros": ["8 modules in one plugin cover most mixing tasks", "Mix Assistant identifies frequency conflicts automatically", "Unmask module creates space between competing tracks", "Sculptor module shapes tone without traditional EQ"],
      "pros_es": ["8 módulos en un plugin cubren la mayoría de tareas de mezcla", "El Mix Assistant identifica conflictos de frecuencia automáticamente", "El módulo Unmask crea espacio entre pistas competidoras", "El módulo Sculptor moldea el tono sin EQ tradicional"],
      "cons": ["Steep learning curve with so many modules", "AI suggestions can sound over-processed if pushed too hard", "Advanced version required for full feature set", "Resource-heavy on older systems"],
      "cons_es": ["Curva de aprendizaje pronunciada con tantos módulos", "Las sugerencias de IA pueden sonar sobre-procesadas si se exageran", "Se requiere versión avanzada para el conjunto completo de funciones", "Pesado en sistemas antiguos"]
    },
    {
      "name": "Mastering The Mix MIXROOM", "name_es": "Mastering The Mix MIXROOM",
      "pros": ["AI matches your mix tonal balance to any reference", "Focuses on master bus — does not disturb individual tracks", "Targets specific frequency ranges for precision", "Built-in reference library for common genres"],
      "pros_es": ["La IA iguala el balance tonal de tu mezcla con cualquier referencia", "Se enfoca en el bus principal — no altera pistas individuales", "Apunta a rangos de frecuencia específicos con precisión", "Biblioteca de referencias integrada para géneros comunes"],
      "cons": ["Only handles tonal balancing — not full mastering", "Requires a good reference track to work effectively", "No multiband compression or limiting"],
      "cons_es": ["Solo maneja balance tonal — no mastering completo", "Requiere una buena pista de referencia para funcionar", "No incluye compresión multibanda ni limitación"]
    },
    {
      "name": "Sonible smart:limit", "name_es": "Sonible smart:limit",
      "pros": ["Real-time LUFS targeting adapts to your material", "Automatic gain staging before the limiter", "Loudness presets for streaming platforms", "Transparent limiting preserves mix dynamics"],
      "pros_es": ["El targeting LUFS en tiempo real se adapta a tu material", "Staging de ganancia automático antes del limitador", "Presets de loudness para plataformas de streaming", "Limitación transparente preserva la dinámica de la mezcla"],
      "cons": ["Only handles limiting — no other mastering tasks", "Less control than manual limiter settings", "Plugin Boutique-centric availability"],
      "cons_es": ["Solo maneja limitación — no otras tareas de mastering", "Menos control que configuraciones manuales de limitador", "Disponibilidad centrada en Plugin Boutique"]
    },
    {
      "name": "iZotope Trash", "name_es": "iZotope Trash",
      "pros": ["Distortion, convolution, and multi-band processing in one", "Massive preset library for creative sound design", "waveshaping algorithms range from subtle to extreme", "Clean UI despite deep parameter control"],
      "pros_es": ["Distorsión, convolución y procesamiento multibanda en uno", "Enorme biblioteca de presets para diseño sonoro creativo", "Algoritmos de waveshaping van de sutil a extremo", "UI limpia a pesar del control profundo de parámetros"],
      "cons": ["Not useful for transparent mixing tasks", "CPU-heavy with multiple bands active", "Can easily over-distort if not careful"],
      "cons_es": ["No útil para tareas de mezcla transparentes", "Pesado en CPU con múltiples bandas activas", "Puede distorsionar en exceso si no se tiene cuidado"]
    }
  ];
  console.log('Fixed ai-tools-plugins comparison + verdictProsCons');
}

// ===== SIDECHAIN-MODULATION-PLUGINS: ShaperBox 3, RC-20, HalfTime, Transit 2, Infiltrator 2 =====
var side = data.find(g => g.id === 'sidechain-modulation-plugins');
if (side) {
  side.comparison = {
    "headers": ["Cableguys ShaperBox 3", "XLN Audio RC-20 Retro Color", "Cableguys HalfTime", "Baby Audio Transit 2", "Devious Machines Infiltrator 2"],
    "rows": [
      {
        "label": "Type", "val": "Multi-effect modulator", "val2": "Vintage color chain", "val3": "Half-speed effect", "val4": "Transition builder", "val5": "Multi-mode FX",
        "label_es": "Tipo", "val_es": "Modulador de multi-efectos", "val2_es": "Cadena de color vintage", "val3_es": "Efecto de media velocidad", "val4_es": "Constructor de transiciones", "val5_es": "FX Multimodo"
      },
      {
        "label": "Modulation", "val": "LFO, envelope, sidechain", "val2": "Static presets", "val3": "Simple on/off", "val4": "Macro-driven automation", "val5": "Envelope-following",
        "label_es": "Modulación", "val_es": "LFO, envolvente, sidechain", "val2_es": "Presets estáticos", "val3_es": "Simple on/off", "val4_es": "Automatización macro", "val5_es": "Seguimiento de envolvente"
      },
      {
        "label": "Tracks", "val": "Per-instance", "val2": "Per-instance", "val3": "Per-instance", "val4": "Per-instance", "val5": "Per-instance",
        "label_es": "Tracks", "val_es": "Por instancia", "val2_es": "Por instancia", "val3_es": "Por instancia", "val4_es": "Por instancia", "val5_es": "Por instancia"
      },
      {
        "label": "Best For", "val": "Rhythmic filtering, gating, volume", "val2": "Lo-fi, vinyl, tape character", "val3": "Half-speed bass, lo-fi textures", "val4": "Buildups, drops, transitions", "val5": "Complex modulation and movement",
        "label_es": "Ideal Para", "val_es": "Filtrado rítmico, gateo, volumen", "val2_es": "Lo-fi, carácter de vinilo y cinta", "val3_es": "Bajos a media velocidad, texturas lo-fi", "val4_es": "Buildups, drops, transiciones", "val5_es": "Modulación compleja y movimiento"
      }
    ]
  };
  side.verdictProsCons = [
    {
      "name": "Cableguys ShaperBox 3", "name_es": "Cableguys ShaperBox 3",
      "pros": ["Most versatile rhythmic modulation toolkit available", "Volume, filter, pan, and distortion shapers in one", "LFO and envelope modes for precise control", "Huge library of genre-specific presets"],
      "pros_es": ["El toolkit de modulación rítmica más versátil disponible", "Formadores de volumen, filtro, pan y distorsión en uno", "Modos LFO y envolvente para control preciso", "Gran biblioteca de presets por género"],
      "cons": ["Can be overwhelming with so many options", "Individual shapers sold separately in basic version", "Learning curve for complex modulation routing"],
      "cons_es": ["Puede abrumar con tantas opciones", "Los formadores individuales se venden por separado en versión básica", "Curva de aprendizaje para rutas de modulación complejas"]
    },
    {
      "name": "XLN Audio RC-20 Retro Color", "name_es": "XLN Audio RC-20 Retro Color",
      "pros": ["Six effect modules for instant vintage character", "Rain and vinyl noise layers add authentic texture", "Pre-delivery processing chain available", "Huge library of genre-specific presets"],
      "pros_es": ["Seis módulos de efectos para carácter vintage instantáneo", "Capas de ruido de lluvia y vinilo agregan textura auténtica", "Cadena de pre-procesamiento disponible", "Gran biblioteca de presets por género"],
      "cons": ["Not useful for transparent mixing tasks", "Can muddy a mix if over-applied", "No multiband processing"],
      "cons_es": ["No útil para tareas de mezcla transparentes", "Puede ensuciar una mezcla si se exagera", "No tiene procesamiento multibanda"]
    },
    {
      "name": "Cableguys HalfTime", "name_es": "Cableguys HalfTime",
      "pros": ["Simplest way to create half-speed effect", "Works on any audio source instantly", "Tight integration with ShaperBox ecosystem", "Extremely low CPU usage"],
      "pros_es": ["La forma más simple de crear efecto de media velocidad", "Funciona en cualquier fuente de audio al instante", "Integración estrecha con el ecosistema ShaperBox", "Uso de CPU extremadamente bajo"],
      "cons": ["Single-function plugin — only half-speed", "Limited control over loop length", "Better results with ShaperBox for complex patterns"],
      "cons_es": ["Plugin de función única — solo media velocidad", "Control limitado sobre la longitud del loop", "Mejores resultados con ShaperBox para patrones complejos"]
    },
    {
      "name": "Baby Audio Transit 2", "name_es": "Baby Audio Transit 2",
      "pros": ["Macro knob controls multiple effects simultaneously", "Built-in sidechain and noise sweeps", "Perfect for buildups and drops", "150+ presets organized by genre"],
      "pros_es": ["El botón macro controla múltiples efectos simultáneamente", "Sidechain y barridos de ruido integrados", "Perfecto para buildups y drops", "Más de 150 presets organizados por género"],
      "cons": ["Only useful for transition sections", "Limited real-time performance control", "No multiband processing"],
      "cons_es": ["Solo útil para secciones de transición", "Control limitado de rendimiento en tiempo real", "No tiene procesamiento multibanda"]
    },
    {
      "name": "Devious Machines Infiltrator 2", "name_es": "Devious Machines Infiltrator 2",
      "pros": ["14 effect modules in one plugin", "Powerful envelope-following modulation", "Randomizer for happy accidents", "Deep modulation matrix for complex patches"],
      "pros_es": ["14 módulos de efectos en un plugin", "Potente modulación por seguimiento de envolvente", "Randomizador para accidentes agradables", "Matriz de modulación profunda para parches complejos"],
      "cons": ["Steep learning curve", "Can be CPU-heavy with many modules active", "Interface can feel cluttered"],
      "cons_es": ["Curva de aprendizaje pronunciada", "Puede ser pesado en CPU con muchos módulos activos", "La interfaz puede sentirse saturada"]
    }
  ];
  console.log('Fixed sidechain-modulation-plugins comparison + verdictProsCons');
}

// ===== BEATMAKER-PLUGINS: RC-20, Transit 2, Scaler 3, Lifeline Expanse, Repeater =====
var beat = data.find(g => g.id === 'beatmaker-plugins');
if (beat) {
  beat.comparison = {
    "headers": ["XLN Audio RC-20 Retro Color", "Baby Audio Transit 2", "Plugin Boutique Scaler 3", "Excite Audio Lifeline Expanse", "D16 Repeater"],
    "rows": [
      {
        "label": "Type", "val": "Vintage color chain", "val2": "Transition builder", "val3": "Chord & scale assistant", "val4": "Spatial effects suite", "val5": "Dual delay unit",
        "label_es": "Tipo", "val_es": "Cadena de color vintage", "val2_es": "Constructor de transiciones", "val3_es": "Asistente de acordes y escalas", "val4_es": "Suite de efectos espaciales", "val5_es": "Unidad de delay dual"
      },
      {
        "label": "Main Use", "val": "Lo-fi, vinyl, tape texture", "val2": "Buildups, drops, movement", "val3": "Chord progressions, melody writing", "val4": "Reverb, chorus, spatial depth", "val5": "Rhythmic delay, echo, stutter",
        "label_es": "Uso Principal", "val_es": "Lo-fi, textura de vinilo y cinta", "val2_es": "Buildups, drops, movimiento", "val3_es": "Progresiones de acordes, composición melódica", "val4_es": "Reverb, chorus, profundidad espacial", "val5_es": "Delay rítmico, eco, stammer"
      },
      {
        "label": "Tracks", "val": "Per-instance", "val2": "Per-instance", "val3": "MIDI instrument", "val4": "Per-instance", "val5": "Per-instance",
        "label_es": "Tracks", "val_es": "Por instancia", "val2_es": "Por instancia", "val3_es": "Instrumento MIDI", "val4_es": "Por instancia", "val5_es": "Por instancia"
      },
      {
        "label": "Best For", "val": "Adding vintage character to beats", "val2": "Creating movement in transitions", "val3": "Harmonic ideas when stuck", "val4": "Spatial depth and atmosphere", "val5": "Rhythmic echo and dub effects",
        "label_es": "Ideal Para", "val_es": "Agregar carácter vintage a beats", "val2_es": "Crear movimiento en transiciones", "val3_es": "Ideas armónicas cuando estás estancado", "val4_es": "Profundidad espacial y atmósfera", "val5_es": "Eco rítmico y efectos dub"
      }
    ]
  };
  beat.verdictProsCons = [
    {
      "name": "XLN Audio RC-20 Retro Color", "name_es": "XLN Audio RC-20 Retro Color",
      "pros": ["Six effect modules for instant vintage character", "Rain and vinyl noise layers add authentic texture", "Pre-delivery processing chain available", "Huge library of genre-specific presets"],
      "pros_es": ["Seis módulos de efectos para carácter vintage instantáneo", "Capas de ruido de lluvia y vinilo agregan textura auténtica", "Cadena de pre-procesamiento disponible", "Gran biblioteca de presets por género"],
      "cons": ["Not useful for transparent mixing tasks", "Can muddy a mix if over-applied", "No multiband processing"],
      "cons_es": ["No útil para tareas de mezcla transparentes", "Puede ensuciar una mezcla si se exagera", "No tiene procesamiento multibanda"]
    },
    {
      "name": "Baby Audio Transit 2", "name_es": "Baby Audio Transit 2",
      "pros": ["Macro knob controls multiple effects simultaneously", "Built-in sidechain and noise sweeps", "Perfect for buildups and drops", "150+ presets organized by genre"],
      "pros_es": ["El botón macro controla múltiples efectos simultáneamente", "Sidechain y barridos de ruido integrados", "Perfecto para buildups y drops", "Más de 150 presets organizados por género"],
      "cons": ["Only useful for transition sections", "Limited real-time performance control", "No multiband processing"],
      "cons_es": ["Solo útil para secciones de transición", "Control limitado de rendimiento en tiempo real", "No tiene procesamiento multibanda"]
    },
    {
      "name": "Plugin Boutique Scaler 3", "name_es": "Plugin Boutique Scaler 3",
      "pros": ["Chord progressions from scales and genres", "MIDI drag-and-drop to DAW", "Perform mode for live playing", "Built-in synth for auditioning"],
      "pros_es": ["Progresiones de acordes a partir de escalas y géneros", "Arrastrar y soltar MIDI al DAW", "Modo Perform para tocar en vivo", "Sintetizador integrado para audicionar"],
      "cons": ["Only generates MIDI — no audio processing", "Can encourage harmonic laziness", "Limited sound design capabilities"],
      "cons_es": ["Solo genera MIDI — sin procesamiento de audio", "Puede fomentar la pereza armónica", "Capacidades limitadas de diseño sonoro"]
    },
    {
      "name": "Excite Audio Lifeline Expanse", "name_es": "Excite Audio Lifeline Expanse",
      "pros": ["Reverb, chorus, delay, and compression in one", "Space and atmosphere creation tools", "Preset library organized by vibe", "Low CPU usage despite rich processing"],
      "pros_es": ["Reverb, chorus, delay y compresión en uno", "Herramientas de creación de espacio y atmósfera", "Biblioteca de presets organizada por vibe", "Uso de CPU bajo a pesar del procesamiento rico"],
      "cons": ["Not a dedicated reverb or delay", "Limited parameter control compared to specialists", "Smaller preset library than competitors"],
      "cons_es": ["No es un reverb o delay dedicado", "Control de parámetros limitado comparado con especialistas", "Biblioteca de presets más pequeña que la competencia"]
    },
    {
      "name": "D16 Repeater", "name_es": "D16 Repeater",
      "pros": ["Dual delay lines with independent controls", "Vintage tape and digital delay models", "Sync to DAW tempo or free-running", "Modulation for moving delay effects"],
      "pros_es": ["Dos líneas de delay con controles independientes", "Modelos de delay de cinta vintage y digital", "Sincronización al tempo del DAW o libre", "Modulación para efectos de delay en movimiento"],
      "cons": ["Only handles delay — no other effects", "Can sound complex without careful setup", "Older plugin with dated interface"],
      "cons_es": ["Solo maneja delay — no otros efectos", "Puede sonar complejo sin configuración cuidadosa", "Plugin antiguo con interfaz obsoleta"]
    }
  ];
  console.log('Fixed beatmaker-plugins comparison + verdictProsCons');
}

fs.writeFileSync(file, JSON.stringify(data, null, 2), 'utf8');
console.log('Done! All 3 plugin guides fixed.');
