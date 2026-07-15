const fs = require('fs');
const data = JSON.parse(fs.readFileSync('data/guides.json', 'utf8'));

const translations = {
  'Dynamic': 'Dinámico',
  'Condenser': 'Condensador',
  'Closed-back': 'Cerrados',
  'Open-back': 'Abiertos',
  'Cardioid': 'Cardioide',
  'N/A': 'N/D',
  'N/A (dynamic)': 'N/D (dinámico)',
  'N/A (modeling)': 'N/D (modelado)',
  'mic pre': 'preamp',
  'Woofer': 'Woofer',
  'Tweeter': 'Tweeter',
  'Driver': 'Driver',
  'Potencia': 'Potencia',
  'Peso': 'Peso',
  'Cuerpo': 'Cuerpo',
  'Mástil': 'Mástil',
  'Pastillas': 'Pastillas',
  'Diapasón': 'Diapasón',
  'Canales': 'Canales',
  'Altavoz': 'Altavoz',
  'Válvulas': 'Válvulas',
  'Efectos': 'Efectos',
  'Pistas de audio': 'Pistas de audio',
  'Pistas MIDI': 'Pistas MIDI',
  'Instrumentos incluidos': 'Instrumentos incluidos',
  'Tapa': 'Tapa',
  'Fondo y aros': 'Fondo y aros',
  'Formatos': 'Formatos',
  'Delay compensación': 'Delay compensación',
  'Plugins incluidos': 'Plugins incluidos',
};

function translateVal(val) {
  if (!val || typeof val !== 'string') return val;
  if (translations[val]) return translations[val];
  if (val.startsWith('$')) return val;
  if (/^[\d.,\s\/%()kKHzdBWlbs]+$/.test(val.replace(/[–-]/g,''))) return val;
  return null;
}

const keyFeatureTranslations = {
  'The Instrument Standard': 'El Estándar Instrumental',
  'The Vocal Workhorse': 'El Caballo de Batalla Vocal',
  'The Tracking King': 'El Rey del Seguimiento',
  'The Mixing Master': 'El Maestro de la Mezcla',
  'The Truth-Teller': 'El Que Dice la Verdad',
  'The Flatterer': 'El Adulador',
  "The Producer's Favorite": 'El Favorito de los Productores',
  'The Broadcast Standard': 'El Estándar de Radiodifusión',
  'The Power of Unison Preamps and Real-Time UAD Processing': 'El Poder de los Preamplificadores Unison y el Procesamiento UAD en Tiempo Real',
  'Rock-Solid Stability, TotalMix FX, and Unmatched Driver Performance': 'Estabilidad Sólida, TotalMix FX y Rendimiento de Driver Inigualable',
  'The Refined All-Rounder with Air Mode': 'El Todo Terreno Refinado con Modo Air',
  'Vintage Analog Character with the Vintage Mic Pre Mode': 'Carácter Analógico Vintage con el Modo Vintage Mic Pre',
  'Console-Quality Preamps and Advanced Monitoring': 'Preamplificadores de Calidad de Consola y Monitoreo Avanzado',
  'Benchmark Converters and Hardware Loopback': 'Convertidores de Referencia y Loopback por Hardware',
  'The Air Motion Transformer Tweeter and Modern Precision': 'El Tweeter de Transformador de Movimiento de Aire y Precisión Moderna',
  'The Finnish Metal Dome and Uncompromising Accuracy': 'El Domo Metálico Finlandés y Precisión Sin Compromisos',
  'Cinema-Proven Workhorse with Image Control Waveguide': 'Caballo de Batalla Probado en Cine con Waveguide de Control de Imagen',
  'Boundary EQ and the Three-Dimensional Soundstage': 'EQ de Límite y el Escenario Sonoro Tridimensional',
  'The Reference Standard for Natural Frequency Response': 'El Estándar de Referencia para Respuesta de Frecuencia Natural',
  'The Exciting V-Shape with Treble Energy': 'La Emocionante Forma de V con Energía en Agudos',
  'Detailed and Fun Response for Production': 'Respuesta Detallada y Divertida para Producción',
  'Comfortable Workhorse for Long Sessions': 'Caballo de Batalla Cómodo para Sesiones Largas',
  'The Harman-Tuned Modern Reference for Accurate Mixing': 'La Referencia Moderna Sintonizada por Harman para Mezclas Precisas',
  'The 30-Year Industry Standard for Critical Listening': 'El Estándar de la Industria por 30 Años para Escucha Crítica',
  'The Broadcast Legend with Smooth, Forgiving Capture': 'La Leyenda de la Radiodifusión con Captura Suave y Tolerante',
  'The Ultra-Low Noise Condenser for Detailed Vocal Capture': 'El Condensador de Ultra Bajo Ruido para Captura Vocal Detallada',
  'The Indestructible Workhorse for Every Instrument': 'El Caballo de Batalla Indestructible para Cada Instrumento',
  'The Legendary Rock Guitar and Kick Drum Specialist': 'El Especialista Legendario en Guitarra Rock y Bombo',
  'The Gold Standard of Studio Vocal Recording': 'El Estándar de Oro de la Grabación Vocal de Estudio',
  'The Versatile Precision Instrument': 'El Instrumento de Precisión Versátil',
  'The Variable-D Broadcast Standard': 'El Estándar de Radiodifusión Variable-D',
  'The Intimate, Warm Voice of Modern Broadcast': 'La Voz Íntima y Cálida de la Radiodifusión Moderna',
  'The RF King with Superior Range': 'El Rey de RF con Alcance Superior',
  'Digital Clarity and Wireless Workbench': 'Claridad Digital y Wireless Workbench',
  'The Budget Champion with DSP Versatility': 'El Campeón de Presupuesto con Versatilidad DSP',
  'The Professional Standard with Class-D Power': 'El Estándar Profesional con Potencia Clase D',
  'Powered Speaker with Legendary Reliability': 'Altavoz Amplificado con Fiabilidad Legendaria',
  'All-In-One Column Array with Built-In Mixer': 'Sistema de Columna Todo en Uno con Mezclador Integrado',
  'Iconic Design with Modern Playability': 'Diseño Icónico con Tocabilidad Moderna',
  'The Budget Guitar That Beats Its Price': 'La Guitarra Económica que Supera Su Precio',
  'Versatility and Modern Refinement': 'Versatilidad y Refinamiento Moderno',
  'Power, Sustain, and Legendary Humbucker Tone': 'Potencia, Sustain y el Sonido Legendario de Humbucker',
  'The Dreadnought That Defined Acoustic Music': 'El Dreadnought que Definió la Música Acústica',
  'Modern Grand Auditorium with Expression System': 'Grand Auditorium Moderno con Expression System',
  'The Session View and Performance Powerhouse': 'La Vista de Sesión y Potencia en Vivo',
  'Pattern-Based Workflow and Lifetime Updates': 'Flujo de Trabajo Basado en Patrones y Actualizaciones de por Vida',
  'The Industry Standard for Recording and Mixing': 'El Estándar de la Industria para Grabación y Mezcla',
  "The Composer's Powerhouse with Integrated Scoring": 'La Potencia del Compositor con Partituras Integradas',
  'Affordable All-Tube American Tone': 'Sonido Americano Todo-Válvulas Asequible',
  'The British Invasion Sound with Chime and Top-Boost': 'El Sonido de la Invasión Británica con Brillantez y Top-Boost',
  'The Versatile Modeling Amp': 'El Amplificador de Modelado Versátil',
  'Authentic All-Tube Marshall Tone': 'Sonido Marshall Auténtico Todo-Válvulas',
  'The Gold Standard for Surgical Mixing': 'El Estándar de Oro para Mezcla Quirúrgica',
  'AI-Assisted Mastering Suite': 'Suite de Masterización Asistida por IA',
};

function translateKeyFeature(val) {
  if (!val || typeof val !== 'string') return val;
  if (keyFeatureTranslations[val]) return keyFeatureTranslations[val];
  return null;
}

function translateDesc(val) {
  if (!val || typeof val !== 'string') return val;

  const descTranslations = {
    '2 x Scarlett mic pre': '2 x preamp Scarlett',
    '2 x SSL 4K legacy pre': '2 x preamp SSL 4K legacy',
    '2 x Unison mic pre': '2 x preamp Unison',
    '2 x mic pre, 76 dB gain': '2 x preamp mic, 76 dB de ganancia',
    '2 x Audient Class-A pre': '2 x preamp Clase A Audient',
    '2 x mic pre': '2 x preamp mic',
    '116 dB (mic) / 120 dB (output)': '116 dB (mic) / 120 dB (salida)',
    '126 dB (DA)': '126 dB (DA)',
    '120 dB (ESS Sabre32)': '120 dB (ESS Sabre32)',
    '129 dB (monitor output)': '129 dB (salida monitor)',
    '118 dBA (output)': '118 dBA (salida)',
    '1 x Vintage Mic Preamp': '1 x Preamp Vintage',
    '115 dB': '115 dB',
    'Thunderbolt 3': 'Thunderbolt 3',
    'USB 2.0 (bus powered)': 'USB 2.0 (alimentado por bus)',
    'UAD DUO / QUAD': 'UAD DUO / QUAD',
    'Yes (TotalMix FX)': 'Sí (TotalMix FX)',
    '1" dome': '1" domo',
    '1" silk dome': '1" domo de seda',
    'S-ART ribbon': 'S-ART cinta',
    '1" metal dome': '1" domo metálico',
    '8" cone': '8" cono',
    '7" Kevlar': '7" Kevlar',
    '45 mm CCAW': '45 mm CCAW',
    '40 mm dynamic': '40 mm dinámico',
    '42 mm dynamic': '42 mm dinámico',
    '45 mm dynamic': '45 mm dinámico',
    '50 mm titanium-coated': '50 mm recubierto de titanio',
    '40 Hz – 15 kHz': '40 Hz – 15 kHz',
    '50 Hz – 20 kHz': '50 Hz – 20 kHz',
    '50 Hz – 15 kHz': '50 Hz – 15 kHz',
    '5 Hz – 35 kHz': '5 Hz – 35 kHz',
    '38 Hz – 30 kHz': '38 Hz – 30 kHz',
    '45 Hz – 36 kHz': '45 Hz – 36 kHz',
    '15 Hz – 28 kHz': '15 Hz – 28 kHz',
    '10 Hz – 20 kHz': '10 Hz – 20 kHz',
    '44 Hz – 50 kHz': '44 Hz – 50 kHz',
    '48 Hz – 20 kHz': '48 Hz – 20 kHz',
    '49 Hz – 20 kHz': '49 Hz – 20 kHz',
    '39 Hz – 25 kHz': '39 Hz – 25 kHz',
    '12 Hz – 40.5 kHz': '12 Hz – 40.5 kHz',
    '20 Hz – 20 kHz': '20 Hz – 20 kHz',
    '30 Hz – 17 kHz': '30 Hz – 17 kHz',
    '45 Hz – 18 kHz': '45 Hz – 18 kHz',
    '5 Hz – 40 kHz': '5 Hz – 40 kHz',
    '20 Hz – 20 kHz': '20 Hz – 20 kHz',
    '5 dBA': '5 dBA',
    '6 dBA': '6 dBA',
    '12 dBA (cardioid)': '12 dBA (cardioide)',
    '9 selectable patterns': '9 patrones seleccionables',
    'Omni / Cardioid / Figure-8': 'Omni / Cardioide / Figura-8',
    'UHF (multiple bands)': 'UHF (múltiples bandas)',
    'UHF (G50 band)': 'UHF (banda G50)',
    'E 935 (dynamic cardioid)': 'E 935 (dinámico cardioide)',
    'SM58 (dynamic cardioid)': 'SM58 (dinámico cardioide)',
    '1,000W (peak)': '1,000W (pico)',
    '2,000W (peak)': '2,000W (pico)',
    '1,100W (950W LF + 150W HF)': '1,100W (950W LF + 150W HF)',
    '1,300W (class D)': '1,300W (clase D)',
    '35.5 lbs': '16.1 kg',
    '37.9 lbs': '17.2 kg',
    '45.6 lbs': '20.7 kg',
    '55.1 lbs': '25 kg',
    'Alder': 'Aliso',
    'Maple Modern C': 'Arce Moderno C',
    'Maple Deep C': 'Arce Deep C',
    'Mahogany SlimTaper': 'Caoba SlimTaper',
    'Mahogany with maple top': 'Caoba con tapa de arce',
    '3 x Player Alnico V Single-Coil': '3 x Single-Coil Alnico V Player',
    'HSS (1 humbucker + 2 single-coil)': 'HSS (1 humbucker + 2 single-coil)',
    '3 x V-Mod II Single-Coil': '3 x Single-Coil V-Mod II',
    '2 x Burstbucker': '2 x Burstbucker',
    'Rosewood or maple': 'Palo de rosa o arce',
    'Rosewood': 'Palo de rosa',
    'Ebony': 'Ébano',
    'Mahogany': 'Caoba',
    'Solid Sitka spruce': 'Pícea sólida de Sitka',
    'Solid East Indian rosewood': 'Palo de rosa sólido de la India Oriental',
    'Tasmanian blackwood': 'Madera negra de Tasmania',
    '1 with FAT switch': '1 con interruptor FAT',
    '2 (Normal, Top Boost)': '2 (Normal, Top Boost)',
    'Spring reverb, effects loop': 'Reverb de muelle, bucle de efectos',
    'Spring reverb, tremolo': 'Reverb de muelle, trémolo',
    '1 x 12" Celestion A-Type': '1 x 12" Celestion A-Type',
    '2 x 12" Celestion Greenback': '2 x 12" Celestion Greenback',
    '1 x 12" custom': '1 x 12" personalizado',
    '1 x 12" Celestion V-Type': '1 x 12" Celestion V-Type',
    '4 x ECC83, 2 x EL34': '4 x ECC83, 2 x EL34',
    '5 (Acoustic, Clean, Crunch, Lead, Brown)': '5 (Acoustic, Clean, Crunch, Lead, Brown)',
    '2 (Classic Gain, Ultra Gain) each w/2 modes': '2 (Classic Gain, Ultra Gain) c/u con 2 modos',
    'Booster, Mod, FX, Delay, Reverb': 'Booster, Mod, FX, Delay, Reverb',
    'Digital reverb, series effects loop': 'Reverb digital, bucle de efectos en serie',
    '50W': '50W',
    '40W (power reduction to 20W)': '40W (reducción de potencia a 20W)',
    'Unlimited': 'Ilimitadas',
    '70+ (Wavetable, Operator, Sampler, Analog, etc.)': '70+ (Wavetable, Operator, Sampler, Analog, etc.)',
    '30+ (Sytrus, Harmless, Sakura, etc.)': '30+ (Sytrus, Harmless, Sakura, etc.)',
    'Celemony Melodyne 5, SoundFlow': 'Celemony Melodyne 5, SoundFlow',
    '60+ (HALion, Groove Agent, Padshop, etc.)': '60+ (HALion, Groove Agent, Padshop, etc.)',
    'N/A (3rd-party)': 'N/D (terceros)',
    '90+ (includes track FX, Channel Strip, etc.)': '90+ (incluye FX de pista, Channel Strip, etc.)',
    '10 (Pro-Q 4, Pro-C 3, Pro-L 2, Pro-R 2, Saturn 2, Timeless 3, Volcano 3, Twin 3, etc.)': '10 (Pro-Q 4, Pro-C 3, Pro-L 2, Pro-R 2, Saturn 2, Timeless 3, Volcano 3, Twin 3, etc.)',
    '20+ modules (Stem EQ, Clarity, Stabilizer, Maximizer, Tonal Balance, etc.)': '20+ módulos (Stem EQ, Clarity, Stabilizer, Maximizer, Tonal Balance, etc.)',
    'AAX, AU, VST, VST3': 'AAX, AU, VST, VST3',
    'Yes (Plugin Delay Compensation)': 'Sí (Compensación de Delay)',
    '12" + 1.5" array': '12" + array de 1.5"',
    '12"': '12"',
    'Maple': 'Arce',
    '192 kHz / 24-bit': '192 kHz / 24-bit',
    '192 kHz / 32-bit': '192 kHz / 32-bit',
    'USB-C': 'USB-C',
  };

  if (descTranslations[val]) return descTranslations[val];

  if (val.includes(' kHz') || val.includes(' Hz') || val.includes(' dB')) {
    return val;
  }

  return null;
}

let count = 0;
data.forEach(g => {
  if (g.comparison && g.comparison.rows) {
    g.comparison.rows.forEach(r => {
      if (!r.val1_es && r.val1 && typeof r.val1 === 'string') {
        let t = translateKeyFeature(r.val1) || translateDesc(r.val1) || translateVal(r.val1);
        if (t) { r.val1_es = t; count++; }
      }
      if (!r.val2_es && r.val2 && typeof r.val2 === 'string') {
        let t = translateKeyFeature(r.val2) || translateDesc(r.val2) || translateVal(r.val2);
        if (t) { r.val2_es = t; count++; }
      }
    });
  }
});

fs.writeFileSync('data/guides.json', JSON.stringify(data, null, 2), 'utf8');
console.log(`Added ${count} Spanish translations`);
