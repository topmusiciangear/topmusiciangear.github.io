// monitor-setup: complete guide with proper products, specs, verdicts
const fs = require('fs');
const G = JSON.parse(fs.readFileSync('data/guides.json', 'utf8'));
const V = (value, value_es) => ({ value, value_es });
const W = (t) => ({ title: t, title_es: t });

const g = G.find(x => x.id === 'monitor-setup');

// Replace with proper product columns
const products = [
  'Yamaha HS8',
  'K&M Monitor Stands (Pair)',
  'ISO Acoustics ISO-200 (Pair)',
  'Sonarworks SoundID Reference',
  'MiniDSP UMIK-1',
  'Genelec GLM Kit',
  'Auralex MoPADs (4-pack)',
  'Ultimate Support MS-100 (Pair)'
];
g.productTable.columns = products.map(W);

// Replace rows with comprehensive specs
const rows = [
  { label: 'Category', values: [
    V('Studio Monitor', 'Monitor de estudio'),
    V('Monitor Stands', 'Soportes de monitor'),
    V('Isolation Stands', 'Soportes de aislamiento'),
    V('Room Correction SW', 'SW corrección sala'),
    V('Measurement Mic', 'Micrófono medición'),
    V('Room Calibration Kit', 'Kit calibración sala'),
    V('Isolation Pads', 'Almohadillas aislamiento'),
    V('Monitor Stands', 'Soportes de monitor')
  ]},
  { label: 'Best For', values: [
    V('Reference mixing in untreated rooms', 'Mezcla de referencia en salas sin tratar'),
    V('Ear-level positioning on desk/floor', 'Posicionamiento a altura de oído'),
    V('Decoupling monitors from desk resonance', 'Desacoplar monitores de resonancia mesa'),
    V('Flattening frequency response at listen pos', 'Aplanar respuesta en posición escucha'),
    V('Measuring room response accurately', 'Medir respuesta sala con precisión'),
    V('Auto-calibrating Genelec SAM monitors', 'Auto-calibrar monitores Genelec SAM'),
    V('Budget decoupling for small monitors', 'Desacoplo económico monitores pequeños'),
    V('Heavy monitors up to 100 lb each', 'Monitores pesados hasta 45 kg cada uno')
  ]},
  { label: 'Key Feature', values: [
    V('8" woofer, 120 W bi-amp, room control', 'Woofer 8", 120 W bi-amp, control sala'),
    V('Height 35.4–53.1", 40 lb capacity', 'Altura 90–135 cm, capacidad 18 kg'),
    V('Patented isolator, tilt -6.5° to +8.5°', 'Aislador patentado, inclinación -6,5° a +8,5°'),
    V('500+ headphone profiles, measurement mic incl', '500+ perfiles auriculares, mic medición incl'),
    V('Omnidirectional, calibrated, 20 Hz–20 kHz', 'Omnidireccional, calibrado, 20 Hz–20 kHz'),
    V('Network-controlled, 20+ filter groups', 'Control en red, 20+ grupos filtro'),
    V('High-density foam, 4° or 8° tilt', 'Espuma alta densidad, inclinación 4° u 8°'),
    V('Height 36–54", 100 lb capacity, cable mgmt', 'Altura 91–137 cm, capacidad 45 kg, gestión cables')
  ]},
  { label: 'Price (approx.)', values: [
    V('$399 each', '$399 c/u'),
    V('$149 pair', '$149 par'),
    V('$299 pair', '$299 par'),
    V('$299 (mic included)', '$299 (mic incluido)'),
    V('$79', '$79'),
    V('$349', '$349'),
    V('$49 (4-pack)', '$49 (pack 4)'),
    V('$299 pair', '$299 par')
  ]}
];
g.productTable.rows = rows;

// Verdicts for all 8 products
const VD = (name, pros, cons, pros_es, cons_es) => ({ name, name_es: name, pros, cons, pros_es, cons_es });
g.verdictProsCons = [
  VD('Yamaha HS8',
    ['Honest midrange reveals mix flaws', 'Room Control / High Trim adapt to placement', 'Legendary reliability, 10+ year track record', 'Wide sweet spot for collaborative sessions'],
    ['Bass roll-off below 50 Hz needs sub', 'Bright tweeter fatigues at high SPL', 'Large footprint for small desks', 'No DSP or room correction built-in'],
    ['Medios honestos revelan fallos de mezcla', 'Room Control / High Trim se adaptan a colocación', 'Fiabilidad legendaria, 10+ años probados', 'Punto dulce amplio para sesiones colaborativas'],
    ['Roll-off de graves bajo 50 Hz pide sub', 'Tweeter brillante fatiga a alto SPL', 'Gran huella para escritorios pequeños', 'Sin DSP ni corrección de sala integrada']),
  VD('K&M Monitor Stands (Pair)',
    ['Steel construction, rock-solid stability', 'Height range covers sit/stand positions', 'Cable management clips keep runs tidy', 'Fits most 5–8" monitors securely'],
    ['No isolation — transmits desk vibration', 'Base feet can scratch hardwood floors', 'Assembly required, tools not included', 'Fixed top plate angle (no tilt)'],
    ['Construcción acero, estabilidad a prueba de bombas', 'Rango altura cubre posiciones sentado/de pie', 'Clips gestión cables mantienen orden', 'Acepta la mayoría monitores 5–8"'],
    ['Sin aislamiento — transmite vibración mesa', 'Patas base pueden rayar suelos madera', 'Requiere montaje, herramientas no incluidas', 'Placa superior ángulo fijo (sin inclinación)']),
  VD('ISO Acoustics ISO-200 (Pair)',
    ['Patented isolator kills desk resonance', 'Continuous tilt -6.5° to +8.5° for alignment', 'Supports up to 60 lb per stand', 'Immediate stereo imaging improvement'],
    ['Premium price vs basic stands', 'Limited height range (fixed)', 'Plastic housings feel less premium', 'Large footprint on small desks'],
    ['Aislador patentado elimina resonancia mesa', 'Inclinación continua -6,5° a +8,5° para alinear', 'Soporta hasta 27 kg por soporte', 'Mejora inmediata imagen estéreo'],
    ['Precio premium vs soportes básicos', 'Rango altura limitado (fijo)', 'Carcasas plástico se sienten menos premium', 'Gran huella en escritorios pequeños']),
  VD('Sonarworks SoundID Reference',
    ['Flattens response to ±0.5 dB at listen pos', '500+ headphone calibration profiles', 'Includes measurement mic (OMNI)', 'Works with any monitors/headphones'],
    ['Software-only — no hardware fix', 'Subscription model for updates', 'Cannot fix deep nulls from room modes', 'Latency added in DAW (monitoring path)'],
    ['Aplana respuesta a ±0,5 dB en posición escucha', '500+ perfiles calibración auriculares', 'Incluye micrófono medición (OMNI)', 'Funciona con cualquier monitor/auriculares'],
    ['Solo software — sin corrección hardware', 'Modelo suscripción para actualizaciones', 'No corrige nulos profundos por modos sala', 'Latencia añadida en DAW (ruta monitoreo)']),
  VD('MiniDSP UMIK-1',
    ['Individually calibrated, calibration file included', 'USB plug-and-play, no interface needed', 'Omnidirectional, 20 Hz–20 kHz ±1 dB', 'Works with REW, Sonarworks, Dirac'],
    ['Requires software (REW/Sonarworks) to use', 'Single mic — no multi-point averaging', 'Build quality feels lightweight', 'Cable length only 2 m'],
    ['Calibrado individualmente, archivo incluido', 'USB plug-and-play, sin interfaz necesaria', 'Omnidireccional, 20 Hz–20 kHz ±1 dB', 'Funciona con REW, Sonarworks, Dirac'],
    ['Requiere software (REW/Sonarworks) para usar', 'Un solo mic — sin promediado multi-punto', 'Calidad construcción se siente ligera', 'Longitud cable solo 2 m']),
  VD('Genelec GLM Kit',
    ['Auto-calibrates Genelec SAM monitors in minutes', 'Network control of 20+ filter groups', 'Stores multiple room profiles', 'Phase-aligned multi-sub integration'],
    ['Only works with Genelec SAM series', 'Requires GLM network adapter (extra cost)', 'Proprietary ecosystem lock-in', 'Overkill for stereo-only setups'],
    ['Auto-calibra monitores Genelec SAM en minutos', 'Control red de 20+ grupos filtro', 'Almacena múltiples perfiles sala', 'Integración multi-sub alineada fase'],
    ['Solo funciona con serie Genelec SAM', 'Requiere adaptador red GLM (costo extra)', 'Bloqueo ecosistema propietario', 'Excesivo para setups solo estéreo']),
  VD('Auralex MoPADs (4-pack)',
    ['Ultra-affordable decoupling solution', 'Two angle options (4° or 8°)', 'High-density foam absorbs vibration', 'Fits under any small monitor'],
    ['Compresses under heavy monitors', 'No height adjustment', 'Foam degrades over years', 'Less effective than true isolators'],
    ['Solución desacoplo ultra-económica', 'Dos opciones ángulo (4° u 8°)', 'Espuma alta densidad absorbe vibración', 'Cabe bajo cualquier monitor pequeño'],
    ['Se comprime bajo monitores pesados', 'Sin ajuste altura', 'Espuma degrada con los años', 'Menos efectivo que aisladores verdaderos']),
  VD('Ultimate Support MS-100 (Pair)',
    ['Massive 100 lb capacity per stand', 'Height 36–54" with fine adjustment', 'Integrated cable management channels', 'Locking casters for mobile rigs'],
    ['Industrial look, not studio aesthetic', 'Heavy (35 lb each) — hard to move', 'Overkill for 5–6" nearfields', 'Premium price'],
    ['Capacidad masiva 45 kg por soporte', 'Altura 91–137 cm con ajuste fino', 'Canales gestión cables integrados', 'Ruedas con freno para racks móviles'],
    ['Estética industrial, no de estudio', 'Pesados (16 kg c/u) — difíciles mover', 'Excesivo para nearfields 5–6"', 'Precio premium'])
];

fs.writeFileSync('data/guides.json', JSON.stringify(G, null, 2));
console.log('monitor-setup: cols=' + g.productTable.columns.length + ' rows=' + g.productTable.rows.length + ' verdict=' + g.verdictProsCons.length);