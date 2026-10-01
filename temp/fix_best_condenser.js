// best-condenser-mics: complete with 9 products across 3 tiers
const fs = require('fs');
const G = JSON.parse(fs.readFileSync('data/guides.json', 'utf8'));
const P = JSON.parse(fs.readFileSync('data/products.json', 'utf8'));
const V = (value, value_es) => ({ value, value_es });
const W = (t) => ({ title: t, title_es: t });

const g = G.find(x => x.id === 'best-condenser-mics');

// Full product list from user + catalog
const products = [
  'Audio-Technica AT2020',
  'Rode NT1 Signature Series',
  'Lewitt LCT 440 PURE',
  'Neumann TLM 102',
  'Neumann TLM 103',
  'AKG C414 XLII',
  'Warm Audio WA-8000',
  'Neumann U 87 Ai'
];

// Find IDs
const ids = products.map(t => {
  const p = P.find(x => x.title === t);
  return p ? p.id : null;
}).filter(x => x !== null);

g.productTable.columns = products.map(W);

// Spec rows with proper data
const rows = [
  { label: 'Price Tier', values: [
    V('Budget (<$250)', 'Presupuesto (<$250)'),
    V('Budget (<$250)', 'Presupuesto (<$250)'),
    V('Mid-Range ($300-800)', 'Medio ($300-800)'),
    V('Mid-Range ($300-800)', 'Medio ($300-800)'),
    V('Pro ($900-3500)', 'Pro ($900-3500)'),
    V('Pro ($900-3500)', 'Pro ($900-3500)'),
    V('Pro ($900-3500)', 'Pro ($900-3500)'),
    V('Pro ($900-3500)', 'Pro ($900-3500)')
  ]},
  { label: 'Type', values: [
    V('Condenser, Cardioid', 'Condensador, Cardioide'),
    V('Condenser, Cardioid', 'Condensador, Cardioide'),
    V('Condenser, Cardioid', 'Condensador, Cardioide'),
    V('Condenser, Cardioid', 'Condensador, Cardioide'),
    V('Condenser, Cardioid', 'Condensador, Cardioide'),
    V('Condenser, Multi-pattern (9)', 'Condensador, Multi-patrón (9)'),
    V('Tube Condenser, Cardioid', 'Condensador de Tubo, Cardioide'),
    V('Condenser, Multi-pattern (3)', 'Condensador, Multi-patrón (3)')
  ]},
  { label: 'Polar Pattern', values: [
    V('Cardioid', 'Cardioide'),
    V('Cardioid', 'Cardioide'),
    V('Cardioid', 'Cardioide'),
    V('Cardioid', 'Cardioide'),
    V('Cardioid', 'Cardioide'),
    V('9 patterns: Omni, Wide Cardioid, Cardioid, Hypercardioid, Figure-8 + 4 intermediates', '9 patrones: Omni, Wide Cardioid, Cardioide, Hypercardioide, Figura-8 + 4 intermedios'),
    V('Cardioid', 'Cardioide'),
    V('Cardioid, Omni, Figure-8', 'Cardioide, Omni, Figura-8')
  ]},
  { label: 'Frequency Response', values: [
    V('20 Hz – 20 kHz', '20 Hz – 20 kHz'),
    V('20 Hz – 20 kHz', '20 Hz – 20 kHz'),
    V('20 Hz – 20 kHz', '20 Hz – 20 kHz'),
    V('20 Hz – 20 kHz', '20 Hz – 20 kHz'),
    V('20 Hz – 20 kHz', '20 Hz – 20 kHz'),
    V('20 Hz – 20 kHz', '20 Hz – 20 kHz'),
    V('20 Hz – 18 kHz', '20 Hz – 18 kHz'),
    V('20 Hz – 20 kHz', '20 Hz – 20 kHz')
  ]},
  { label: 'Sensitivity', values: [
    V('-37 dBV/Pa (14.1 mV)', '-37 dBV/Pa (14,1 mV)'),
    V('-29 dBV/Pa (35 mV)', '-29 dBV/Pa (35 mV)'),
    V('-32 dBV/Pa (25 mV)', '-32 dBV/Pa (25 mV)'),
    V('-33 dBV/Pa (22 mV)', '-33 dBV/Pa (22 mV)'),
    V('-26 dBV/Pa (50 mV)', '-26 dBV/Pa (50 mV)'),
    V('-34 dBV/Pa (20 mV)', '-34 dBV/Pa (20 mV)'),
    V('-36 dBV/Pa (16 mV)', '-36 dBV/Pa (16 mV)'),
    V('-37 dBV/Pa (14 mV)', '-37 dBV/Pa (14 mV)')
  ]},
  { label: 'Self-Noise', values: [
    V('12 dB-A', '12 dB-A'),
    V('4 dB-A', '4 dB-A'),
    V('7 dB-A', '7 dB-A'),
    V('11 dB-A', '11 dB-A'),
    V('7 dB-A', '7 dB-A'),
    V('6 dB-A', '6 dB-A'),
    V('7 dB-A (tube)', '7 dB-A (tubo)'),
    V('12 dB-A', '12 dB-A')
  ]},
  { label: 'Max SPL', values: [
    V('144 dB', '144 dB'),
    V('132 dB', '132 dB'),
    V('140 dB', '140 dB'),
    V('144 dB', '144 dB'),
    V('138 dB', '138 dB'),
    V('140 dB (0 dB pad)', '140 dB (pad 0 dB)'),
    V('134 dB', '134 dB'),
    V('127 dB (0 dB pad)', '127 dB (pad 0 dB)')
  ]},
  { label: 'Pad & High-Pass', values: [
    V('None', 'Ninguno'),
    V('None', 'Ninguno'),
    V('None', 'Ninguno'),
    V('None', 'Ninguno'),
    V('None', 'Ninguno'),
    V('-6/-12/-18 dB pads, 40/80/160 Hz HPF', '-6/-12/-18 dB pads, 40/80/160 Hz corte alto'),
    V('None', 'Ninguno'),
    V('-10 dB pad, 80 Hz HPF', '-10 dB pad, 80 Hz corte alto')
  ]},
  { label: 'Phantom Power', values: [
    V('48 V', '48 V'),
    V('48 V', '48 V'),
    V('48 V', '48 V'),
    V('48 V', '48 V'),
    V('48 V', '48 V'),
    V('48 V', '48 V'),
    V('48 V + dedicated PSU', '48 V + fuente dedicada'),
    V('48 V', '48 V')
  ]},
  { label: 'Best For', values: [
    V('Entry standard for home studios', 'Estándar entrada home studios'),
    V('Lowest noise budget mic, complete kit', 'Menor ruido presupuesto, kit completo'),
    V('Modern clarity, high SPL handling', 'Claridad moderna, alto SPL'),
    V('Neumann entry, compact, smooth highs', 'Entrada Neumann, compacto, agudos suaves'),
    V('K103 capsule, vocal presence boost', 'Cápsula K103, presencia vocal'),
    V('Maximum versatility, 9 patterns', 'Máxima versatilidad, 9 patrones'),
    V('Sony C800G tube clone, harmonic warmth', 'Clon Sony C800G tubo, calidez armónica'),
    V('The legend, flat response, investment', 'La leyenda, respuesta plana, inversión')
  ]}
];
g.productTable.rows = rows;

// Verdicts for all 8 products
const VD = (name, pros, cons, pros_es, cons_es) => ({ name, name_es: name, pros, cons, pros_es, cons_es });
g.verdictProsCons = [
  VD('Audio-Technica AT2020',
    ['Absolute entry standard for home studios', 'Excellent transient handling', 'Unbeatable price', 'Durable build'],
    ['Self-noise could be better (12 dBA)', 'No shockmount included (only rigid adapter)', 'Rolled-off bass response'],
    ['Estándar absoluto para iniciar home studio', 'Excelente manejo de transitorios', 'Precio imbatible', 'Construcción duradera'],
    ['Ruido propio mejorable (12 dBA)', 'No incluye araña antichoque (solo adaptador rígido)', 'Respuesta de graves recortada']),
  VD('Rode NT1 Signature Series',
    ['Ridiculously low self-noise (4 dBA)', 'Complete kit with premium shockmount & pop filter', 'Balanced 1" capsule', 'Great value'],
    ['Fixed cardioid pattern', 'No physical pad or high-pass switches'],
    ['Nivel de ruido propio ridículamente bajo (4 dBA)', 'Incluye kit completo con montura antichoque y filtro antipop premium', 'Cápsula 1" muy equilibrada'],
    ['Patrón polar cardioide fijo', 'Carece de interruptores físicos para atenuador (pad) o filtro de corte de graves']),
  VD('Lewitt LCT 440 PURE',
    ['Modern crystalline clarity', 'Excellent signal-to-noise ratio', 'Handles 140 dB SPL without distortion'],
    ['Can sound too analytical/cold for vintage warmth', 'Angular modern aesthetic not for everyone'],
    ['Claridad moderna y cristalina', 'Excelente relación señal/ruido', 'Soporta hasta 140 dB SPL sin distorsionar'],
    ['Puede resultar demasiado analítico o frío para calidez vintage', 'Estética angular muy moderna']),
  VD('Neumann TLM 102',
    ['Most affordable entry to Neumann brand', 'Compact size for flexible placement', 'Smooth high-frequency presence flatters vocals'],
    ['Slightly smaller capsule than TLM 103/U87', 'Lower dynamic range than bigger siblings'],
    ['Punto entrada más económico a marca alemana', 'Tamaño compacto ideal para colocación', 'Presencia suave en agudos embellece voces'],
    ['Cápsula ligeramente menor que TLM 103/U87', 'Rango dinámico menor que hermanos mayores']),
  VD('Neumann TLM 103',
    ['K103 capsule derived from legendary U87 K87', 'Massive mid-high presence cuts through dense mixes', 'Transformerless circuit, ultra-quiet (7 dBA)'],
    ['No pad or high-pass switch', 'Official kit with shockmount adds significant cost'],
    ['Cápsula K103 derivada de legendaria K87 U87', 'Empuje masivo en medias-altas resalta voces', 'Circuito sin transformador ultra silencioso (7 dBA)'],
    ['Carece de atenuador o corte de graves', 'Kit oficial con suspensión eleva coste notablemente']),
  VD('AKG C414 XLII',
    ['Maximum versatility with 9 selectable polar patterns', 'LED overload indicators', 'Three pads (-6/-12/-18 dB) + three high-pass filters'],
    ['High-frequency response can be harsh on strings/brass', 'Digital button interface prone to long-term wear'],
    ['Máxima versatilidad con 9 patrones polares', 'Indicadores LED de saturación', 'Atenuación tres niveles (-6/-12/-18 dB) y tres filtros corte'],
    ['Respuesta agudos puede ser estridente en cuerdas/metales', 'Interfaz botones digitales propensa a desgaste largo plazo']),
  VD('Warm Audio WA-8000',
    ['Exact circuit clone of mythical Sony C800G', 'Tube condenser (6AU6) for unique harmonic warmth', 'External heatsink for component stability'],
    ['Heavy, needs heavy-duty mic stand', 'Tube requires warm-up time before recording'],
    ['Clon exacto a nivel circuito del mítico Sony C800G', 'Condensador tubo (válvula 6AU6) calidez armónica única', 'Disipador térmico externo estabilidad componentes'],
    ['Sistema robusto y pesado requiere pie alta resistencia', 'Tubo requiere tiempo calentamiento previo']),
  VD('Neumann U 87 Ai',
    ['Most famous studio condenser in history', 'Exceptionally flat frequency response works on anything', 'Retains resale value better than any gear'],
    ['Prohibitive capital investment', 'Requires impeccably treated room for true potential'],
    ['Micrófono condensador estudio más famoso historia', 'Respuesta frecuencia excepcionalmente plana', 'Retiene valor comercial mejor que cualquier equipo'],
    ['Inversión capital sumamente prohibitiva', 'Requiere sala con tratamiento acústico impecable'])
];

fs.writeFileSync('data/guides.json', JSON.stringify(G, null, 2));
console.log('best-condenser-mics: cols=' + g.productTable.columns.length + ' rows=' + g.productTable.rows.length + ' verdict=' + g.verdictProsCons.length);
console.log('Products:', g.productTable.columns.map(c => c.title).join(', '));