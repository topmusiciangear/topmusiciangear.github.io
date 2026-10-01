// fx-plugins: expand from 2 to 10+ products with full specs
const fs = require('fs');
const G = JSON.parse(fs.readFileSync('data/guides.json', 'utf8'));
const V = (value, value_es) => ({ value, value_es });
const W = (t) => ({ title: t, title_es: t });

const g = G.find(x => x.id === 'fx-plugins');

// Replace with comprehensive product list
const products = [
  'Soundtoys 5.5 Bundle',
  'Eventide Blackhole',
  'FabFilter Pro-Q 4',
  'FabFilter Pro-R 2',
  'Valhalla VintageVerb',
  'Soundtoys Decapitator',
  'Slate Digital VerbSuite Classics',
  'Waves H-Reverb',
  'D16 Group Toraverb 2',
  'Kush Audio Goldplate',
  'Eventide UltraChannel'
];
g.productTable.columns = products.map(W);

// Comprehensive spec rows
const rows = [
  { label: 'Category', values: [
    V('Multi-fx Bundle', 'Bundle multi-fx'),
    V('Reverb', 'Reverb'),
    V('EQ', 'EQ'),
    V('Reverb', 'Reverb'),
    V('Reverb', 'Reverb'),
    V('Saturation/Distortion', 'Saturación/Distorsión'),
    V('Reverb Bundle', 'Bundle Reverb'),
    V('Reverb', 'Reverb'),
    V('Reverb', 'Reverb'),
    V('Saturation/EQ', 'Saturación/EQ'),
    V('Channel Strip', 'Tira de canal')
  ]},
  { label: 'Best For', values: [
    V('Creative sound design, all-in-one', 'Diseño sonoro creativo, todo en uno'),
    V('Massive spaces, sound design, ambient', 'Espacios masivos, diseño sonoro, ambient'),
    V('Surgical EQ, mastering, mixing', 'EQ quirúrgico, mastering, mezcla'),
    V('Natural reverb tails, mixing, post', 'Colas reverb naturales, mezcla, post'),
    V('Instant classic reverb sounds', 'Sonidos reverb clásicos instantáneos'),
    V('Analog-style saturation, drums, vocals', 'Saturación estilo analógico, bateria, voces'),
    V('Classic hardware emulations in one', 'Emulaciones hardware clásico en uno'),
    V('Hybrid algorithmic/convolution reverb', 'Reverb híbrido algorítmico/convolución'),
    V('Vintage plate/spring/hall algorithms', 'Algoritmos vintage plate/spring/hall'),
    V('Tube-style saturation + 3-band EQ', 'Saturación estilo tubo + EQ 3 bandas'),
    V('All-in-one channel strip, mixing', 'Tira canal todo-en-uno, mezcla')
  ]},
  { label: 'Format', values: [
    V('VST/AU/AAX', 'VST/AU/AAX'),
    V('VST/AU/AAX', 'VST/AU/AAX'),
    V('VST/AU/AAX/CLAP', 'VST/AU/AAX/CLAP'),
    V('VST/AU/AAX/CLAP', 'VST/AU/AAX/CLAP'),
    V('VST/AU/AAX', 'VST/AU/AAX'),
    V('VST/AU/AAX', 'VST/AU/AAX'),
    V('VST/AU/AAX', 'VST/AU/AAX'),
    V('VST/AU/AAX', 'VST/AU/AAX'),
    V('VST/AU/AAX', 'VST/AU/AAX'),
    V('VST/AU/AAX', 'VST/AU/AAX'),
    V('VST/AU/AAX', 'VST/AU/AAX')
  ]},
  { label: 'Price', values: [
    V('$499', '$499'),
    V('$199', '$199'),
    V('$199', '$199'),
    V('$199', '$199'),
    V('$50', '$50'),
    V('$99', '$99'),
    V('$199', '$199'),
    V('$199', '$199'),
    V('$99', '$99'),
    V('$149', '$149'),
    V('$299', '$299')
  ]},
  { label: 'Key Feature', values: [
    V('21 effects, modulation matrix, preset browser', '21 efectos, matriz modulación, navegador presets'),
    V('Gravity/Blackhole algorithms, 500+ presets', 'Algoritmos Gravity/Blackhole, 500+ presets'),
    V('24-band dynamic EQ, spectrum analyzer', 'EQ dinámico 24 bandas, analizador espectro'),
    V('Decay rate EQ, stereo width, modulation', 'EQ tasa decaimiento, ancho estéreo, modulación'),
    V('18 algorithms, 3-color UI, modulation', '18 algoritmos, UI 3 colores, modulación'),
    V('5 analog models, tone shaping, mix knob', '5 modelos analógicos, moldeo tono, mix knob'),
    V('7 classic plates/halls/chambers', '7 placas/salas/cámaras clásicas'),
    V('FIR engine, hybrid algos, 150+ presets', 'Motor FIR, algos híbridos, 150+ presets'),
    V('12 algorithms, modulation, early/late', '12 algoritmos, modulación, early/late'),
    V('3 saturation models, 3-band EQ, auto-gain', '3 modelos saturación, EQ 3 bandas, auto-ganancia'),
    V('Comp/EQ/Gate/Comp, soft-sat, 200+ presets', 'Comp/EQ/Gate/Comp, soft-sat, 200+ presets')
  ]}
];
g.productTable.rows = rows;

// Verdicts for all 11 products
const VD = (name, pros, cons, pros_es, cons_es) => ({ name, name_es: name, pros, cons, pros_es, cons_es });
g.verdictProsCons = [
  VD('Soundtoys 5.5 Bundle',
    ['21 creative effects in one bundle', 'Powerful modulation with rhythm sync', 'Excellent preset browser with search', 'Industry standard for creative FX'],
    ['Expensive upfront cost', 'No individual plugin purchases', 'CPU heavy with multiple instances', 'Learning curve for deep features'],
    ['21 efectos creativos en un bundle', 'Modulación potente con sincronía rítmica', 'Navegador presets excelente con búsqueda', 'Estándar de la industria para FX creativos'],
    ['Costoso pago inicial', 'No venta plugins individuales', 'Pesado en CPU con múltiples instancias', 'Curva aprendizaje funciones profundas']),
  VD('Eventide Blackhole',
    ['Unique massive spaces impossible in hardware', 'Gravity modulation creates evolving textures', '500+ presets cover all genres', 'Ribbon controller for live performance'],
    ['Niche sound — not for realistic rooms', 'No early reflections control', 'Can overwhelm dense mixes', 'No VST3/CLAP (VST2/AU/AAX only)'],
    ['Espacios masivos únicos imposibles en hardware', 'Modulación Gravity crea texturas evolutivas', '500+ presets cubren todos géneros', 'Control Ribbon para actuación en vivo'],
    ['Sonido nicho — no para salas realistas', 'Sin control reflexiones tempranas', 'Puede abrumar mezclas densas', 'Sin VST3/CLAP (solo VST2/AU/AAX)']),
  VD('FabFilter Pro-Q 4',
    ['24 bands with dynamic EQ per band', 'Stunning spectrum analyzer with collision detect', 'Natural phase / linear phase / zero latency', 'Intuitive drag-and-drop workflow'],
    ['No saturation/color — purely surgical', 'Pricey for "just an EQ"', 'No mid/side per band (global only)', 'Overkill for simple tonal shaping'],
    ['24 bandas con EQ dinámico por banda', 'Analizador espectro impresionante con detección colisión', 'Fase natural / lineal / latencia cero', 'Flujo trabajo intuitivo arrastrar-soltar'],
    ['Sin saturación/color — puramente quirúrgico', 'Caro para "solo un EQ"', 'Sin mid/side por banda (solo global)', 'Excesivo para moldeo tonal simple']),
  VD('FabFilter Pro-R 2',
    ['Decay Rate EQ shapes reverb tail musically', 'Stereo width and distance controls', 'Natural phase, zero latency mode', 'Beautiful, musical reverb out of the box'],
    ['Less tweakable than algorithmic verbs', 'No convolution/IR loading', 'Higher CPU than basic reverbs', 'Limited creative sound design'],
    ['EQ Tasa Decaimiento moldea cola musicalmente', 'Controles ancho estéreo y distancia', 'Fase natural, modo latencia cero', 'Reverb hermoso, musical desde el inicio'],
    ['Menos ajustable que verbs algorítmicos', 'Sin carga convolución/IR', 'CPU superior a reverbs básicos', 'Diseño sonoro creativo limitado']),
  VD('Valhalla VintageVerb',
    ['18 algorithms covering classics', 'Incredible value at $50', 'Three color modes (Modern/Vintage/Dirty)', 'Low CPU, instant loading'],
    ['UI looks dated (by design)', 'No convolution/IR support', 'Limited modulation vs premium verbs', 'No surround/Atmos support'],
    ['18 algoritmos cubriendo clásicos', 'Valor increíble a $50', 'Tres modos color (Modern/Vintage/Dirty)', 'CPU bajo, carga instantánea'],
    ['UI parece antigua (por diseño)', 'Sin soporte convolución/IR', 'Modulación limitada vs verbs premium', 'Sin soporte surround/Atmos']),
  VD('Soundtoys Decapitator',
    ['5 distinct analog saturation models', 'Punish button for extreme distortion', 'Tone shaping with high/low cut', 'Mix knob for parallel processing'],
    ['Single effect — not a bundle', 'No mid/side processing', 'Can alias at high sample rates', 'Less versatile than full bundle'],
    ['5 modelos saturación analógica distintos', 'Botón Punish para distorsión extrema', 'Moldeo tono con corte alto/bajo', 'Mix knob para procesamiento paralelo'],
    ['Efecto único — no es bundle', 'Sin procesamiento mid/side', 'Puede hacer aliasing sample rates altos', 'Menos versátil que bundle completo']),
  VD('Slate Digital VerbSuite Classics',
    ['7 legendary hardware emulations', 'Fusion IR technology sounds authentic', 'Modulation and stereo controls', 'Great value for classic verb tones'],
    ['Only reverb — no other FX types', 'No algorithmic engine (IR only)', 'Higher CPU than algorithmic verbs', 'Limited creative parameters'],
    ['7 emulaciones hardware legendarias', 'Tecnología Fusion IR suena auténtica', 'Controles modulación y estéreo', 'Gran valor por tonos verb clásicos'],
    ['Solo reverb — sin otros tipos FX', 'Sin motor algorítmico (solo IR)', 'CPU superior a verbs algorítmicos', 'Parámetros creativos limitados']),
  VD('Waves H-Reverb',
    ['FIR engine = pristine, hybrid algorithms', '150+ presets from top engineers', 'Advanced modulation section', 'Finite Impulse Response = no aliasing'],
    ['Waves license system (Waves Central)', 'Subscription model for updates', 'Complex UI for beginners', 'High CPU on large sessions'],
    ['Motor FIR = pristino, algorítmicos híbridos', '150+ presets de ingenieros top', 'Sección modulación avanzada', 'Respuesta Impulso Finita = sin aliasing'],
    ['Sistema licencias Waves (Waves Central)', 'Modelo suscripción para actualizaciones', 'UI compleja para principiantes', 'CPU alto en sesiones grandes']),
  VD('D16 Group Toraverb 2',
    ['12 algorithms: plates, halls, springs, rooms', 'Independent early/late modulation', 'Mid/side processing built-in', 'Affordable vintage flavor'],
    ['UI can feel cluttered', 'No convolution/IR', 'Less polished than premium verbs', 'Manual somewhat sparse'],
    ['12 algoritmos: placas, salas, springs, rooms', 'Modulación early/late independiente', 'Procesamiento mid/side integrado', 'Sabor vintage asequible'],
    ['UI puede sentirse recargada', 'Sin convolución/IR', 'Menos pulido que verbs premium', 'Manual algo escaso']),
  VD('Kush Audio Goldplate',
    ['Tube-style saturation + 3-band EQ in one', 'Auto-gain compensates level changes', 'Silky high-end from "Silk" circuit', 'Great on vocals, drums, mix bus'],
    ['Only 3 saturation models', 'No mid/side or multi-band', 'No presets (by design)', 'Niche use case'],
    ['Saturación estilo tubo + EQ 3 bandas en uno', 'Auto-ganancia compensa cambios nivel', 'Agudos sedosos del circuito "Silk"', 'Genial en voces, bateria, bus mezcla'],
    ['Solo 3 modelos saturación', 'Sin mid/side ni multi-banda', 'Sin presets (por diseño)', 'Caso uso nicho']),
  VD('Eventide UltraChannel',
    ['Complete channel strip: Gate/Comp/EQ/Comp', 'Soft saturation (tube/tape/transformer)', 'Micro pitch shift for widening', '200+ presets from hit records'],
    ['Overkill for simple tasks', 'Complex routing options', 'Eventide iLok authorization', 'Higher CPU than strip plugins'],
    ['Tira canal completa: Gate/Comp/EQ/Comp', 'Saturación suave (tubo/cinta/transformador)', 'Micro pitch shift para ensanchar', '200+ presets de discos exitosos'],
    ['Excesivo para tareas simples', 'Opciones ruteo complejas', 'Autorización iLok Eventide', 'CPU superior a plugins strip'])
];

fs.writeFileSync('data/guides.json', JSON.stringify(G, null, 2));
console.log('fx-plugins: cols=' + g.productTable.columns.length + ' rows=' + g.productTable.rows.length + ' verdict=' + g.verdictProsCons.length);