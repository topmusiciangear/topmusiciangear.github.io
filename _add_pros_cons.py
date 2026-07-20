import json

with open('data/guides.json', 'r', encoding='utf-8') as f:
    guides = json.load(f)

def find_guide(gid):
    for g in guides:
        if g['id'] == gid:
            return g
    return None

# ── pro-headphones ──────────────────────────────
g = find_guide('pro-headphones')
g['verdictProsCons'] = [
  {
    "name": "Focal Utopia 2022",
    "name_es": "Focal Utopia 2022",
    "pros": [
      "Pure beryllium drivers deliver the fastest transient response of any headphone",
      "Unmatched detail retrieval at every frequency — hear things you've never heard in familiar tracks",
      "Incredibly precise imaging with laser-sharp instrument placement",
      "Luxurious build quality with carbon fiber and leather",
      "5Hz-50kHz frequency response covers the full audible spectrum and beyond"
    ],
    "pros_es": [
      "Los drivers de berilio puro ofrecen la respuesta transitoria más rápida de cualquier auricular",
      "Recuperación de detalles inigualable en cada frecuencia — escucha cosas que nunca habías oído",
      "Imagen increíblemente precisa con colocación de instrumentos nítida",
      "Calidad de construcción lujosa con fibra de carbono y cuero",
      "Respuesta de 5Hz-50kHz que cubre todo el espectro audible y más"
    ],
    "cons": [
      "Price of $4,999 makes it the most expensive headphone on this list",
      "Slightly smaller soundstage compared to the HD 800 S",
      "Requires a premium headphone amp to perform at its best",
      "Clamping force is slightly higher than the HD 800 S"
    ],
    "cons_es": [
      "El precio de $4,999 lo convierte en el auricular más caro de esta lista",
      "Escenario sonoro ligeramente más pequeño comparado con el HD 800 S",
      "Requiere un amplificador de auriculares premium para rendir al máximo",
      "La fuerza de sujeción es ligeramente mayor que la del HD 800 S"
    ]
  },
  {
    "name": "Sennheiser HD 800 S",
    "name_es": "Sennheiser HD 800 S",
    "pros": [
      "Massive, open soundstage that creates a speaker-like listening experience",
      "56mm ring-radiator transducers deliver exceptional clarity and airiness",
      "More affordable than the Utopia while still offering reference-class performance",
      "Extremely comfortable for long mixing sessions with lightweight design",
      "Patented absorber technology reduces masking distortion"
    ],
    "pros_es": [
      "Escenario sonoro masivo y abierto que crea una experiencia de escucha similar a altavoces",
      "Transductores de radiador anular de 56mm ofrecen claridad y aire excepcionales",
      "Más asequible que la Utopia manteniendo un rendimiento de clase de referencia",
      "Extremadamente cómodo para largas sesiones de mezcla con diseño ligero",
      "Tecnología patentada de absorbedor que reduce la distorsión de enmascaramiento"
    ],
    "cons": [
      "Bass response is less impactful and rolls off earlier than the Utopia",
      "Build quality uses more plastic compared to the Utopia's premium materials",
      "Stock cable is mediocre for this price range",
      "Treble can be slightly peaky for some listeners in the upper frequencies"
    ],
    "cons_es": [
      "La respuesta de graves es menos impactante y se reduce antes que en la Utopia",
      "La calidad de construcción usa más plástico comparado con los materiales premium de la Utopia",
      "El cable incluido es mediocre para este rango de precio",
      "Los agudos pueden ser ligeramente pronunciados para algunos oyentes"
    ]
  }
]

g['comparison'] = {
  "rows": [
    { "label": "Driver Type", "label_es": "Tipo de Driver", "val1": "40mm Pure Beryllium inverted dome", "val2": "56mm Ring-radiator dynamic", "val1_es": "Cúpula invertida de berilio puro 40mm", "val2_es": "Radiador anular dinámico 56mm" },
    { "label": "Frequency Response", "label_es": "Respuesta en Frecuencia", "val1": "5Hz – 50kHz", "val2": "6Hz – 51kHz" },
    { "label": "Impedance", "label_es": "Impedancia", "val1": "80 ohms", "val2": "300 ohms" },
    { "label": "Sensitivity", "label_es": "Sensibilidad", "val1": "104dB SPL/mW", "val2": "102dB SPL/mW" },
    { "label": "Weight", "label_es": "Peso", "val1": "430g", "val2": "330g" },
    { "label": "Cable", "label_es": "Cable", "val1": "4ft OFC copper (3.5mm)", "val2": "9.8ft OFC copper (6.35mm)", "val1_es": "1.2m cobre OFC (3.5mm)", "val2_es": "3m cobre OFC (6.35mm)" },
    { "label": "Origin", "label_es": "Origen", "val1": "France", "val2": "Germany", "val1_es": "Francia", "val2_es": "Alemania" },
    { "label": "Rating", "label_es": "Puntuación", "val1": "4.9/5", "val2": "4.8/5" },
    { "label": "Price", "label_es": "Precio", "val1": "$4,999", "val2": "$1,799" }
  ]
}

g['featuredSnippet']['specs'] = [
  { "label_en": "Driver Type", "label_es": "Tipo de Driver", "val1": "Pure Beryllium", "val2": "Ring-radiator" },
  { "label_en": "Freq Response", "label_es": "Respuesta en Frecuencia", "val1": "5Hz-50kHz", "val2": "6Hz-51kHz" },
  { "label_en": "Impedance", "label_es": "Impedancia", "val1": "80 ohms", "val2": "300 ohms" }
]

# ── pro-microphones ──────────────────────────────
g = find_guide('pro-microphones')
g['verdictProsCons'] = [
  {
    "name": "Neumann U 87 Ai",
    "name_es": "Neumann U 87 Ai",
    "pros": [
      "The undisputed industry standard — heard on more hit records than any other mic",
      "Three switchable polar patterns (cardioid, omni, figure-8) for maximum versatility",
      "Smooth, flattering top end that sounds musical on almost any source",
      "Excellent build quality — built to last decades in professional use",
      "10dB pad and low-cut filter for handling high SPL sources"
    ],
    "pros_es": [
      "El estándar de la industria indiscutible — escuchado en más éxitos que cualquier otro micrófono",
      "Tres patrones polares seleccionables (cardioide, omni, figura-8) para máxima versatilidad",
      "Agudos suaves y favorecedores que suenan musicales en casi cualquier fuente",
      "Excelente calidad de construcción — hecho para durar décadas en uso profesional",
      "Pad de 10dB y filtro de corte de graves para fuentes de alto SPL"
    ],
    "cons": [
      "More affordable than the C-800G at $3,599 but still a significant investment",
      "Transformerless output lacks the warmth of tube designs like the C-800G",
      "Heavier than many modern condenser microphones",
      "Requires external shockmount and pop filter for optimal results"
    ],
    "cons_es": [
      "Más asequible que la C-800G a $3,599 pero sigue siendo una inversión significativa",
      "La salida sin transformador carece de la calidez de los diseños de tubo como la C-800G",
      "Más pesado que muchos micrófonos de condensador modernos",
      "Requiere soporte antigolpes y filtro pop externos para resultados óptimos"
    ]
  },
  {
    "name": "Sony C-800G",
    "name_es": "Sony C-800G",
    "pros": [
      "The holy grail vocal mic — warm, present, and impossibly flattering on every voice",
      "Hand-selected vacuum tube adds analog warmth and depth that solid-state mics can't match",
      "Gold-sputtered large diaphragm captures every nuance with stunning detail",
      "Proprietary transformerless output stage preserves transient response",
      "Used by legends — Michael Jackson, Beyoncé, Dr. Dre, and countless others"
    ],
    "pros_es": [
      "El santo grial de los micrófonos vocales — cálido, presente e imposiblemente favorecedor",
      "Válvula de vacío seleccionada a mano añade calidez y profundidad analógica inigualable",
      "Gran diafragma bañado en oro captura cada matiz con un detalle impresionante",
      "La etapa de salida sin transformador patentada preserva la respuesta transitoria",
      "Usado por leyendas — Michael Jackson, Beyoncé, Dr. Dre e innumerables otros"
    ],
    "cons": [
      "Extremely expensive at $10,999 — more than triple the price of the U 87 Ai",
      "Requires a dedicated power supply and specialized cables",
      "Tube needs periodic replacement (every 5-10 years) adding to long-term cost",
      "Heavier and bulkier than the U 87 Ai, requiring a robust stand"
    ],
    "cons_es": [
      "Extremadamente caro a $10,999 — más del triple del precio de la U 87 Ai",
      "Requiere una fuente de alimentación dedicada y cables especializados",
      "La válvula necesita reemplazo periódico (cada 5-10 años) aumentando el costo a largo plazo",
      "Más pesado y voluminoso que la U 87 Ai, requiere un soporte robusto"
    ]
  }
]

g['comparison'] = {
  "rows": [
    { "label": "Type", "label_es": "Tipo", "val1": "FET condenser (solid-state)", "val2": "Tube condenser", "val1_es": "Condensador FET (estado sólido)", "val2_es": "Condensador de tubo" },
    { "label": "Polar Patterns", "label_es": "Patrones Polares", "val1": "Cardioid, omni, figure-8", "val2": "Cardioid only", "val1_es": "Cardioide, omni, figura-8", "val2_es": "Solo cardioide" },
    { "label": "Diaphragm", "label_es": "Diafragma", "val1": "1-inch gold-sputtered Mylar", "val2": "1-inch gold-sputtered Mylar", "val1_es": "Mylar bañado en oro de 1 pulgada", "val2_es": "Mylar bañado en oro de 1 pulgada" },
    { "label": "Frequency Response", "label_es": "Respuesta en Frecuencia", "val1": "20Hz – 20kHz", "val2": "20Hz – 20kHz" },
    { "label": "Self-Noise", "label_es": "Ruido Propio", "val1": "14dB-A", "val2": "16dB-A" },
    { "label": "Max SPL", "label_es": "SPL Máximo", "val1": "140dB (with pad)", "val2": "130dB", "val1_es": "140dB (con pad)", "val2_es": "130dB" },
    { "label": "Power", "label_es": "Alimentación", "val1": "48V phantom", "val2": "Dedicated PSU", "val1_es": "Phantom 48V", "val2_es": "Fuente dedicada" },
    { "label": "Rating", "label_es": "Puntuación", "val1": "4.9/5", "val2": "4.9/5" },
    { "label": "Price", "label_es": "Precio", "val1": "$3,599", "val2": "$10,999" }
  ]
}

g['featuredSnippet']['specs'] = [
  { "label_en": "Type", "label_es": "Tipo", "val1": "FET condenser", "val2": "Tube condenser" },
  { "label_en": "Polar Patterns", "label_es": "Patrones Polares", "val1": "Cardioid/Omni/Fig-8", "val2": "Cardioid" },
  { "label_en": "Freq Response", "label_es": "Respuesta en Frecuencia", "val1": "20Hz-20kHz", "val2": "20Hz-20kHz" }
]

# ── pro-monitors ──────────────────────────────
g = find_guide('pro-monitors')
g['verdictProsCons'] = [
  {
    "name": "ATC SCM25A Pro MKII",
    "name_es": "ATC SCM25A Pro MKII",
    "pros": [
      "Legendary 75mm soft-dome midrange driver — the most accurate midrange reproduction of any monitor",
      "Unmatched midrange clarity for critical vocal and instrument mixing",
      "3-way active design with dedicated amplification for each driver",
      "Hand-built in the UK with meticulous quality control",
      "Industry standard in world-class studios worldwide"
    ],
    "pros_es": [
      "Legendario driver de rango medio de cúpula blanda de 75mm — la reproducción de medios más precisa",
      "Claridad de rango medio inigualable para mezcla crítica de voces e instrumentos",
      "Diseño activo de 3 vías con amplificación dedicada para cada driver",
      "Hecho a mano en el Reino Unido con meticuloso control de calidad",
      "Estándar de la industria en estudios de clase mundial"
    ],
    "cons": [
      "Less extended top-end air compared to the Genelec 8351B",
      "No built-in room calibration system (unlike Genelec's GLM)",
      "Larger cabinet footprint requires more desk space",
      "Lower total amplifier power than the Genelec (250W vs 490W tri-amped)"
    ],
    "cons_es": [
      "Menos extensión de agudos en comparación con el Genelec 8351B",
      "Sin sistema de calibración de sala incorporado (a diferencia de GLM de Genelec)",
      "Gabinete más grande que requiere más espacio en el escritorio",
      "Menos potencia total de amplificador que el Genelec (250W vs 490W tri-amplificado)"
    ]
  },
  {
    "name": "Genelec 8351B",
    "name_es": "Genelec 8351B",
    "pros": [
      "Coaxial MDC driver design delivers a massive sweet spot and perfect time alignment",
      "GLM room calibration software automatically optimizes for your room",
      "Stunning top-end extension and detail — the most revealing high frequencies in its class",
      "Compact enclosure fits in tighter spaces than the ATC SCM25A",
      "SAM technology enables network control and subwoofer integration"
    ],
    "pros_es": [
      "El diseño coaxial MDC ofrece un punto óptimo masivo y alineación temporal perfecta",
      "El software de calibración GLM optimiza automáticamente para tu sala",
      "Impresionante extensión y detalle de agudos — las frecuencias altas más reveladoras",
      "Gabinete compacto que cabe en espacios más reducidos que el ATC SCM25A",
      "La tecnología SAM permite control en red e integración con subwoofer"
    ],
    "cons": [
      "Coaxial design can sound slightly less impactful in the lower midrange",
      "GLM calibration adds complexity and requires calibration mic purchase",
      "More expensive than the ATC SCM25A at $8,398 (pair)",
      "Some engineers prefer the character of ATC's midrange for vocal work"
    ],
    "cons_es": [
      "El diseño coaxial puede sonar ligeramente menos impactante en los medios bajos",
      "La calibración GLM añade complejidad y requiere comprar el micrófono de calibración",
      "Más caro que el ATC SCM25A a $8,398 (par)",
      "Algunos ingenieros prefieren el carácter del rango medio de ATC para trabajo vocal"
    ]
  }
]

g['comparison'] = {
  "rows": [
    { "label": "Design", "label_es": "Diseño", "val1": "3-way, standard driver layout", "val2": "3-way, coaxial MDC driver", "val1_es": "3 vías, disposición estándar", "val2_es": "3 vías, driver coaxial MDC" },
    { "label": "Mid Driver", "label_es": "Driver Medio", "val1": "75mm soft-dome", "val2": "Coaxial (integrated)", "val1_es": "Cúpula blanda 75mm", "val2_es": "Coaxial (integrado)" },
    { "label": "Tweeter", "label_es": "Tweeter", "val1": "25mm soft-dome", "val2": "19mm metal dome", "val1_es": "Cúpula blanda 25mm", "val2_es": "Cúpula metálica 19mm" },
    { "label": "Woofer", "label_es": "Woofer", "val1": "164mm (6.5\")", "val2": "210mm (8\")", "val1_es": "164mm (6.5\")", "val2_es": "210mm (8\")" },
    { "label": "Amplifier Power", "label_es": "Potencia del Amplificador", "val1": "150W + 50W + 50W", "val2": "250W + 150W + 90W" },
    { "label": "Room Calibration", "label_es": "Calibración de Sala", "val1": "None (manual placement)", "val2": "GLM automatic calibration", "val1_es": "Ninguna (colocación manual)", "val2_es": "Calibración automática GLM" },
    { "label": "Frequency Response", "label_es": "Respuesta en Frecuencia", "val1": "47Hz – 25kHz (±2dB)", "val2": "38Hz – 35kHz (±1dB)" },
    { "label": "Rating", "label_es": "Puntuación", "val1": "4.9/5", "val2": "4.9/5" },
    { "label": "Price (pair)", "label_es": "Precio (par)", "val1": "$6,998", "val2": "$8,398" }
  ]
}

g['featuredSnippet']['specs'] = [
  { "label_en": "Design", "label_es": "Diseño", "val1": "3-way standard", "val2": "3-way coaxial" },
  { "label_en": "Mid Driver", "label_es": "Driver Medio", "val1": "75mm soft-dome", "val2": "MDC coaxial" },
  { "label_en": "Woofer", "label_es": "Woofer", "val1": "6.5\"", "val2": "8\"" }
]

# ── pro-interfaces ──────────────────────────────
g = find_guide('pro-interfaces')
g['verdictProsCons'] = [
  {
    "name": "UA Apollo x16 Gen 2",
    "name_es": "UA Apollo x16 Gen 2",
    "pros": [
      "HEXA Core UAD DSP with 6 SHARC+ processors enables massive real-time plugin processing",
      "Unison preamp technology — authentic emulations of Neve, API, SSL and more",
      "167dB dynamic range conversion — among the best in any interface",
      "Thunderbolt 3 connectivity provides ultra-low latency performance",
      "Dual-monitor support with integrated talkback"
    ],
    "pros_es": [
      "HEXA Core UAD DSP con 6 procesadores SHARC+ permite procesamiento masivo en tiempo real",
      "Tecnología de previo Unison — emulaciones auténticas de Neve, API, SSL y más",
      "Rango dinámico de 167dB — entre los mejores de cualquier interfaz",
      "Conectividad Thunderbolt 3 proporciona rendimiento de latencia ultra baja",
      "Soporte para monitores duales con talkback integrado"
    ],
    "cons": [
      "Requires UAD-2 plugins for DSP acceleration — an additional cost",
      "Thunderbolt 3 limits compatibility with older computers",
      "No onboard standalone recording without a computer connected",
      "Higher price than the RME while offering fewer I/O channels"
    ],
    "cons_es": [
      "Requiere plugins UAD-2 para aceleración DSP — un costo adicional",
      "Thunderbolt 3 limita la compatibilidad con computadoras antiguas",
      "No tiene grabación independiente sin computadora conectada",
      "Precio más alto que el RME ofreciendo menos canales I/O"
    ]
  },
  {
    "name": "RME Fireface UFX III",
    "name_es": "RME Fireface UFX III",
    "pros": [
      "Legendary driver stability — RME is known for rock-solid drivers across all platforms",
      "188-channel I/O via USB 3.0 with MADI expansion — massive routing capability",
      "TotalMix FX provides 48-channel digital mixing with onboard DSP effects",
      "DURec allows standalone recording directly to USB storage",
      "SteadyClock FS jitter suppression for pristine clocking"
    ],
    "pros_es": [
      "Estabilidad legendaria de drivers — RME es conocido por drivers sólidos en todas las plataformas",
      "188 canales I/O vía USB 3.0 con expansión MADI — capacidad de ruteo masiva",
      "TotalMix FX proporciona mezcla digital de 48 canales con efectos DSP integrados",
      "DURec permite grabación independiente directamente a almacenamiento USB",
      "SteadyClock FS para clocking prístino sin jitter"
    ],
    "cons": [
      "Software-based DSP plugins are more limited than UAD's premium emulations",
      "No Unison-style preamp modeling technology",
      "USB 3.0 doesn't match Thunderbolt 3's theoretical bandwidth ceiling",
      "Onboard effects are basic compared to UAD's premium plugin library"
    ],
    "cons_es": [
      "Los plugins DSP basados en software son más limitados que las emulaciones premium de UAD",
      "Sin tecnología de modelado de previo estilo Unison",
      "USB 3.0 no iguala el techo de ancho de banda teórico de Thunderbolt 3",
      "Los efectos integrados son básicos comparados con la biblioteca premium de UAD"
    ]
  }
]

g['comparison'] = {
  "rows": [
    { "label": "I/O Channels", "label_es": "Canales I/O", "val1": "16x20", "val2": "188-channel (with MADI)", "val1_es": "16x20", "val2_es": "188 canales (con MADI)" },
    { "label": "Connectivity", "label_es": "Conectividad", "val1": "Thunderbolt 3", "val2": "USB 3.0 + MADI" },
    { "label": "Dynamic Range (D/A)", "label_es": "Rango Dinámico (D/A)", "val1": "167dB", "val2": "135dB" },
    { "label": "DSP", "label_es": "DSP", "val1": "HEXA Core (6× SHARC+)", "val2": "TotalMix FX (onboard)", "val1_es": "HEXA Core (6× SHARC+)", "val2_es": "TotalMix FX (integrado)" },
    { "label": "Standalone Recording", "label_es": "Grabación Independiente", "val1": "No", "val2": "Yes — DURec to USB", "val1_es": "No", "val2_es": "Sí — DURec a USB" },
    { "label": "Preamp Emulation", "label_es": "Emulación de Previo", "val1": "Unison technology (Neve, API, SSL)", "val2": "None", "val1_es": "Tecnología Unison (Neve, API, SSL)", "val2_es": "Ninguna" },
    { "label": "Sample Rate", "label_es": "Tasa de Muestreo", "val1": "192kHz", "val2": "192kHz" },
    { "label": "Rating", "label_es": "Puntuación", "val1": "4.8/5", "val2": "4.9/5" },
    { "label": "Price", "label_es": "Precio", "val1": "$3,999", "val2": "$3,199" }
  ]
}

g['featuredSnippet']['specs'] = [
  { "label_en": "Connectivity", "label_es": "Conectividad", "val1": "Thunderbolt 3", "val2": "USB 3.0 + MADI" },
  { "label_en": "Dyn Range", "label_es": "Rango Dinámico", "val1": "167dB", "val2": "135dB" },
  { "label_en": "DSP", "label_es": "DSP", "val1": "HEXA Core UAD", "val2": "TotalMix FX" }
]

# ── pro-guitars ──────────────────────────────
g = find_guide('pro-guitars')
g['verdictProsCons'] = [
  {
    "name": "Fender American Ultra II Stratocaster",
    "name_es": "Fender American Ultra II Stratocaster",
    "pros": [
      "Ultra II Noiseless Vintage pickups deliver classic Strat tone without 60-cycle hum",
      "S-1 switching with 10 voicings gives incredible versatility — from tele twang to humbucker growl",
      "Sculpted neck heel provides effortless access to upper frets",
      "Compound-radius ebony fingerboard (10\"-14\") is comfortable for chords and bends",
      "Locking tuners and 2-point tremolo with pop-in arm for excellent tuning stability"
    ],
    "pros_es": [
      "Pastillas Ultra II Noiseless Vintage ofrecen tono Strat clásico sin zumbido de 60 ciclos",
      "Conmutación S-1 con 10 voces da una versatilidad increíble",
      "Talón esculpido proporciona acceso sin esfuerzo a los trastes superiores",
      "Diapasón de ébano de radio compuesto (10\"-14\") cómodo para acordes y bends",
      "Afinadores de bloqueo y trémolo de 2 puntos con brazo pop-in"
    ],
    "cons": [
      "HSS pickup configuration may not please traditional SSS purists",
      "Active switching system adds complexity and potential failure points",
      "Brighter tone overall compared to the Les Paul's warm, thick sound",
      "Some players prefer traditional neck heel for resonance transfer"
    ],
    "cons_es": [
      "La configuración HSS puede no complacer a los puristas SSS tradicionales",
      "El sistema de conmutación activo añade complejidad y posibles puntos de fallo",
      "Tono más brillante en general comparado con el sonido cálido y grueso de la Les Paul",
      "Algunos guitarristas prefieren el talón tradicional para la transferencia de resonancia"
    ]
  },
  {
    "name": "Gibson Les Paul Standard '60s",
    "name_es": "Gibson Les Paul Standard '60s",
    "pros": [
      "Burstbucker pickups deliver that legendary PAF humbucker tone — warm, fat, and singing",
      "Mahogany body with carved maple top produces incredible sustain and resonance",
      "Set-neck construction with long tenon provides superior note definition and sustain",
      "60s SlimTaper neck profile is fast and comfortable for lead playing",
      "The quintessential rock guitar sound — heard on countless classic recordings"
    ],
    "pros_es": [
      "Pastillas Burstbucker ofrecen el legendario tono PAF humbucker — cálido, gordo y cantarín",
      "Cuerpo de caoba con tapa de arce tallada produce sustain y resonancia increíbles",
      "Construcción mástil encolado con espiga larga proporciona definición y sustain superiores",
      "El perfil de mástil 60s SlimTaper es rápido y cómodo para solos",
      "El sonido de guitarra rock por excelencia — escuchado en innumerables grabaciones clásicas"
    ],
    "cons": [
      "Heavier than the Stratocaster — can cause shoulder fatigue during long sessions",
      "Limited pickup configuration (only bridge/neck humbuckers) with fewer tonal options",
      "Fixed bridge means no tremolo/whammy bar",
      "Higher price than the Ultra II Strat at $2,699 vs $2,299"
    ],
    "cons_es": [
      "Más pesada que la Stratocaster — puede causar fatiga en sesiones largas",
      "Configuración limitada de pastillas con menos opciones tonales",
      "Puente fijo significa sin trémolo/whammy bar",
      "Precio más alto que la Ultra II Strat ($2,699 vs $2,299)"
    ]
  }
]

g['comparison'] = {
  "rows": [
    { "label": "Body Wood", "label_es": "Madera del Cuerpo", "val1": "Alder (swamp ash on some finishes)", "val2": "Mahogany with carved maple top", "val1_es": "Aliso (fresno de pantano en algunos acabados)", "val2_es": "Caoba con tapa de arce tallada" },
    { "label": "Neck Wood", "label_es": "Madera del Mástil", "val1": "Maple", "val2": "Mahogany", "val1_es": "Arce", "val2_es": "Caoba" },
    { "label": "Fingerboard", "label_es": "Diapasón", "val1": "Ebony (10\"-14\" compound)", "val2": "Rosewood (12\" radius)", "val1_es": "Ébano (radio compuesto 10\"-14\")", "val2_es": "Palo de rosa (radio 12\")" },
    { "label": "Pickups", "label_es": "Pastillas", "val1": "Ultra II Noiseless Vintage HSS", "val2": "Burstbucker 1 (neck) + BB2 (bridge)", "val1_es": "Ultra II Noiseless Vintage HSS", "val2_es": "Burstbucker 1 (mástil) + BB2 (puente)" },
    { "label": "Switching", "label_es": "Conmutación", "val1": "5-way + S-1 (10 voicings)", "val2": "3-way (bridge/both/neck)", "val1_es": "5 posiciones + S-1 (10 voces)", "val2_es": "3 posiciones (puente/ambos/mástil)" },
    { "label": "Bridge", "label_es": "Puente", "val1": "2-point tremolo with pop-in arm", "val2": "ABR-1 Tune-o-matic with stopbar", "val1_es": "Trémolo 2 puntos con brazo pop-in", "val2_es": "ABR-1 Tune-o-matic con stopbar" },
    { "label": "Weight", "label_es": "Peso", "val1": "~7.5 lbs (~3.4 kg)", "val2": "~9.5 lbs (~4.3 kg)" },
    { "label": "Rating", "label_es": "Puntuación", "val1": "4.8/5", "val2": "4.9/5" },
    { "label": "Price", "label_es": "Precio", "val1": "$2,299", "val2": "$2,699" }
  ]
}

g['featuredSnippet']['specs'] = [
  { "label_en": "Body Wood", "label_es": "Madera del Cuerpo", "val1": "Alder", "val2": "Mahogany + maple top" },
  { "label_en": "Pickups", "label_es": "Pastillas", "val1": "Noiseless HSS", "val2": "Burstbucker HH" },
  { "label_en": "Bridge", "label_es": "Puente", "val1": "2-pt tremolo", "val2": "Tune-o-matic" }
]

# ── pro-basses ──────────────────────────────
g = find_guide('pro-basses')
g['verdictProsCons'] = [
  {
    "name": "Fender American Ultra II Precision Bass",
    "name_es": "Fender American Ultra II Precision Bass",
    "pros": [
      "Ultra II Noiseless P-Bass pickup delivers classic P tone without hum",
      "The definitive precision bass sound — punchy, deep, and sits perfectly in any mix",
      "Sculpted neck heel and rolled fingerboard edges for maximum playing comfort",
      "HiMass bridge improves sustain and string definition",
      "Compound-radius ebony fingerboard feels fast and responsive"
    ],
    "pros_es": [
      "La pastilla Ultra II Noiseless P-Bass ofrece el tono P clásico sin zumbido",
      "El sonido de bajo de precisión definitivo — contundente, profundo y perfecto en cualquier mezcla",
      "Talón esculpido y bordes del diapasón redondeados para máxima comodidad",
      "Puente HiMass mejora el sustain y la definición de las cuerdas",
      "Diapasón de ébano de radio compuesto se siente rápido y sensible"
    ],
    "cons": [
      "Only one pickup configuration — less versatile than the StingRay's active preamp",
      "Passive electronics with no onboard EQ (classic P-Bass simplicity)",
      "Traditional slab body can be less comfortable than the StingRay's contoured design",
      "Heavier than the StingRay Special with its lightweight ash body"
    ],
    "cons_es": [
      "Solo una pastilla — menos versátil que el previo activo del StingRay",
      "Electrónica pasiva sin EQ incorporado (simplicidad clásica del P-Bass)",
      "El cuerpo tradicional puede ser menos cómodo que el diseño contorneado del StingRay",
      "Más pesado que el StingRay Special con su cuerpo de fresno ligero"
    ]
  },
  {
    "name": "Ernie Ball Music Man StingRay Special",
    "name_es": "Ernie Ball Music Man StingRay Special",
    "pros": [
      "Powerful neodymium humbucker with 18V active preamp delivers massive, punchy tone",
      "2-band active EQ gives you complete control over your sound",
      "Lightweight ash body and roasted maple neck make it incredibly comfortable to play",
      "The signature sound of funk, rock, and pop — instantly recognizable",
      "Excellent build quality with meticulous fit and finish"
    ],
    "pros_es": [
      "Potente humbucker de neodimio con previo activo de 18V ofrece un tono masivo y contundente",
      "EQ activo de 2 bandas te da control completo sobre tu sonido",
      "Cuerpo de fresno ligero y mástil de arce tostado lo hacen increíblemente cómodo",
      "El sonido característico del funk, rock y pop — instantáneamente reconocible",
      "Excelente calidad de construcción con ajuste y acabado meticulosos"
    ],
    "cons": [
      "Active electronics require a 9V battery — can die mid-performance",
      "Aggressive midrange may not suit every mix or genre",
      "Neodymium pickup has higher output that can overdrive some preamps",
      "No passive bypass option — if the battery dies, the bass is silent"
    ],
    "cons_es": [
      "La electrónica activa requiere batería 9V — puede morir a media actuación",
      "El rango medio agresivo puede no funcionar en todas las mezclas o géneros",
      "La pastilla de neodimio tiene mayor salida que puede saturar algunos previos",
      "Sin opción de bypass pasivo — si la batería muere, el bajo no suena"
    ]
  }
]

g['comparison'] = {
  "rows": [
    { "label": "Body Wood", "label_es": "Madera del Cuerpo", "val1": "Alder", "val2": "Lightweight ash", "val1_es": "Aliso", "val2_es": "Fresno ligero" },
    { "label": "Neck Wood", "label_es": "Madera del Mástil", "val1": "Maple", "val2": "Roasted maple", "val1_es": "Arce", "val2_es": "Arce tostado" },
    { "label": "Fingerboard", "label_es": "Diapasón", "val1": "Ebony (compound radius)", "val2": "Rosewood (10\" radius)", "val1_es": "Ébano (radio compuesto)", "val2_es": "Palo de rosa (radio 10\")" },
    { "label": "Pickup", "label_es": "Pastilla", "val1": "Split-coil P-Bass (Noiseless)", "val2": "Neodymium humbucker", "val1_es": "Split-coil P-Bass (Noiseless)", "val2_es": "Humbucker de neodimio" },
    { "label": "Electronics", "label_es": "Electrónica", "val1": "Passive (volume + tone)", "val2": "Active 18V (volume + 2-band EQ)", "val1_es": "Pasiva (volumen + tono)", "val2_es": "Activa 18V (volumen + EQ 2 bandas)" },
    { "label": "Bridge", "label_es": "Puente", "val1": "HiMass vintage-style", "val2": "Music Man top-loading", "val1_es": "HiMass estilo vintage", "val2_es": "Music Man carga superior" },
    { "label": "Weight", "label_es": "Peso", "val1": "~8.5 lbs (~3.9 kg)", "val2": "~7.5 lbs (~3.4 kg)" },
    { "label": "Rating", "label_es": "Puntuación", "val1": "4.8/5", "val2": "4.9/5" },
    { "label": "Price", "label_es": "Precio", "val1": "$2,199", "val2": "$2,199" }
  ]
}

g['featuredSnippet']['specs'] = [
  { "label_en": "Pickup", "label_es": "Pastilla", "val1": "Noiseless P-Bass", "val2": "Neodymium humbucker" },
  { "label_en": "Electronics", "label_es": "Electrónica", "val1": "Passive", "val2": "Active 18V" },
  { "label_en": "Weight", "label_es": "Peso", "val1": "~8.5 lbs", "val2": "~7.5 lbs" }
]

# ── pro-synths ──────────────────────────────
g = find_guide('pro-synths')
g['verdictProsCons'] = [
  {
    "name": "Moog One 16-Voice",
    "name_es": "Moog One 16 Voces",
    "pros": [
      "16 voices of pure analog polyphony — the most powerful Moog ever made",
      "Tri-timbral: play three independent synth parts simultaneously",
      "3 triangle-core VCOs per voice with incredibly fat and warm oscillators",
      "Dual analog filters (Moog ladder + state-variable) — best of both worlds",
      "Built-in Eventide reverb and effects — studio-quality without external gear"
    ],
    "pros_es": [
      "16 voces de polifonía analógica pura — el Moog más potente jamás creado",
      "Tri-tímbrico: toca tres partes independientes simultáneamente",
      "3 VCOs triangle-core por voz con osciladores increíblemente gordos y cálidos",
      "Filtros analógicos duales (Moog ladder + state-variable) — lo mejor de ambos mundos",
      "Reverb y efectos Eventide integrados — calidad de estudio sin equipo externo"
    ],
    "cons": [
      "Extremely expensive at $9,999 — the most expensive analog poly synth on the market",
      "Very heavy and large — not designed for portability or small studios",
      "Complex architecture can be overwhelming for new synthesizer users",
      "Limited to 16 voices — voice-hungry patches eat polyphony quickly"
    ],
    "cons_es": [
      "Extremadamente caro a $9,999 — el sintetizador polifónico analógico más caro del mercado",
      "Muy pesado y grande — no diseñado para portabilidad o estudios pequeños",
      "La arquitectura compleja puede ser abrumadora para usuarios nuevos",
      "Limitado a 16 voces — los patches que consumen mucha voz agotan la polifonía rápido"
    ]
  },
  {
    "name": "Sequential Prophet-10",
    "name_es": "Sequential Prophet-10",
    "pros": [
      "10-voice true analog polyphony — double the original Prophet-5",
      "Faithful reissue of the legendary Prophet-5 — the sound that defined 80s music",
      "Vintage control emulates oscillator drift for that classic analog character",
      "Switchable filter chips (SSM 2040 vs SSI 2140) for two distinct filter flavors",
      "More immediate and intuitive programming than the Moog One"
    ],
    "pros_es": [
      "10 voces de polifonía analógica verdadera — el doble del Prophet-5 original",
      "Reedición fiel del legendario Prophet-5 — el sonido que definió la música de los 80",
      "Control Vintage que emula el drift de osciladores para ese carácter analógico clásico",
      "Chips de filtro seleccionables (SSM 2040 vs SSI 2140) para dos sabores de filtro",
      "Programación más inmediata e intuitiva que el Moog One"
    ],
    "cons": [
      "Only 10 voices vs the Moog One's 16 — fewer notes for complex pads",
      "Mono-timbral — can only play one sound at a time",
      "Single filter type per voice (switchable but not dual like the Moog One)",
      "No built-in studio-quality effects (no Eventide reverbs)",
      "VCOs are based on CEM 3340 (authentic but less complex than Moog's triangle-core)"
    ],
    "cons_es": [
      "Solo 10 voces vs las 16 del Moog One — menos notas para pads complejos",
      "Mono-tímbrico — solo puede tocar un sonido a la vez",
      "Un solo tipo de filtro por voz (seleccionable pero no dual como el Moog One)",
      "Sin efectos de calidad de estudio integrados (sin reverbs Eventide)",
      "VCOs basados en CEM 3340 (auténticos pero menos complejos que los triangle-core de Moog)"
    ]
  }
]

g['comparison'] = {
  "rows": [
    { "label": "Polyphony", "label_es": "Polifonía", "val1": "16 voices", "val2": "10 voices", "val1_es": "16 voces", "val2_es": "10 voces" },
    { "label": "Timbrality", "label_es": "Timbre", "val1": "Tri-timbral (3 parts)", "val2": "Mono-timbral", "val1_es": "Tri-tímbrico (3 partes)", "val2_es": "Mono-tímbrico" },
    { "label": "Oscillators per Voice", "label_es": "Osciladores por Voz", "val1": "3 triangle-core VCOs", "val2": "2 CEM 3340 VCOs", "val1_es": "3 VCOs triangle-core", "val2_es": "2 VCOs CEM 3340" },
    { "label": "Filter", "label_es": "Filtro", "val1": "Dual: Moog ladder + state-variable", "val2": "Single: SSM 2040 or SSI 2140 (switchable)", "val1_es": "Dual: Moog ladder + state-variable", "val2_es": "Simple: SSM 2040 o SSI 2140 (seleccionable)" },
    { "label": "LFOs", "label_es": "LFOs", "val1": "4 per voice", "val2": "2 per voice" },
    { "label": "Envelopes", "label_es": "Envolventes", "val1": "3 DAHDSR per voice", "val2": "2 ADSR per voice" },
    { "label": "Effects", "label_es": "Efectos", "val1": "Built-in Eventide (reverb, delay, etc.)", "val2": "None (external only)", "val1_es": "Eventide integrado (reverb, delay, etc.)", "val2_es": "Ninguno (solo externo)" },
    { "label": "Keyboard", "label_es": "Teclado", "val1": "61-key Fatar TP-8S", "val2": "61-key Fatar with velocity/aftertouch" },
    { "label": "Rating", "label_es": "Puntuación", "val1": "4.8/5", "val2": "4.9/5" },
    { "label": "Price", "label_es": "Precio", "val1": "$9,999", "val2": "$4,399" }
  ]
}

g['featuredSnippet']['specs'] = [
  { "label_en": "Polyphony", "label_es": "Polifonía", "val1": "16 voices", "val2": "10 voices" },
  { "label_en": "Timbrality", "label_es": "Timbre", "val1": "Tri-timbral", "val2": "Mono-timbral" },
  { "label_en": "Filter", "label_es": "Filtro", "val1": "Dual analog", "val2": "Single (switchable)" }
]

with open('data/guides.json', 'w', encoding='utf-8') as f:
    json.dump(guides, f, indent=2, ensure_ascii=False)

print('Done — added comparison tables and pros/cons to all 7 pro guides')
