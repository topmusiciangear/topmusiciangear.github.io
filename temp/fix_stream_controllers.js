// stream-controllers: expand products and specs
const fs = require('fs');
const G = JSON.parse(fs.readFileSync('data/guides.json', 'utf8'));
const P = JSON.parse(fs.readFileSync('data/products.json', 'utf8'));
const V = (value, value_es) => ({ value, value_es });
const W = (t) => ({ title: t, title_es: t });

const g = G.find(x => x.id === 'stream-controllers');

const currentTitles = g.productTable.columns.map(c => c.title);
const newProducts = [
  'Elgato Stream Deck MK.2',
  'Razer Stream Controller X',
  'BEACN Mix',
  'Loupeedeck Live S',
  'Tascam Stream Controller'
];

newProducts.forEach(t => {
  if (!currentTitles.includes(t)) {
    g.productTable.columns.push(W(t));
    currentTitles.push(t);
  }
});

const rows = {};
g.productTable.rows.forEach(r => { rows[r.label] = r; });
const put = (label, arr) => rows[label].values.push(...arr);

put('Best For', [
  V('Entry Stream Deck, 15 keys', 'Stream Deck entrada, 15 teclas'),
  V('Budget 15-key controller', 'Controlador 15 teclas presupuesto'),
  V('Audio-focused, 4 faders + knobs', 'Enfoque audio, 4 faders + perillas'),
  V('Creative workflow, touch + dials', 'Flujo creativo, touch + diales'),
  V('Broadcast-style, motorized faders', 'Estilo broadcast, faders motorizados')
]);
put('Type', [
  V('15 LCD keys', '15 teclas LCD'),
  V('15 LCD keys', '15 teclas LCD'),
  V('4 faders + 8 knobs + 8 keys', '4 faders + 8 perillas + 8 teclas'),
  V('Touchscreen + 6 dials + 8 keys', 'Pantalla táctil + 6 diales + 8 teclas'),
  V('5 motorized faders + 10 keys', '5 faders motorizados + 10 teclas')
]);
put('Mic Gain', [
  V('N/A (no audio interface)', 'N/A (sin interfaz audio)'),
  V('N/A (no audio interface)', 'N/A (sin interfaz audio)'),
  V('Analog preamp control (0-60 dB)', 'Control preamp analógico (0-60 dB)'),
  V('Software-controlled', 'Controlado por software'),
  V('Software-controlled', 'Controlado por software')
]);
put('Video Capture', [
  V('No', 'No'),
  V('No', 'No'),
  V('No', 'No'),
  V('No', 'No'),
  V('No', 'No')
]);
// Add more rows for stream controllers
const newRows = [
  { label: 'Keys / Controls', values: [
    V('15 LCD keys', '15 teclas LCD'),
    V('15 LCD keys', '15 teclas LCD'),
    V('4 faders, 8 knobs, 8 keys', '4 faders, 8 perillas, 8 teclas'),
    V('Touchscreen, 6 dials, 8 keys', 'Táctil, 6 diales, 8 teclas'),
    V('5 motorized faders, 10 keys', '5 faders motorizados, 10 teclas')
  ]},
  { label: 'Connectivity', values: [
    V('USB-C', 'USB-C'),
    V('USB-C', 'USB-C'),
    V('USB-C', 'USB-C'),
    V('USB-C', 'USB-C'),
    V('USB-C', 'USB-C')
  ]},
  { label: 'Software', values: [
    V('Stream Deck App', 'Stream Deck App'),
    V('Razer Synapse', 'Razer Synapse'),
    V('BEACN App', 'BEACN App'),
    V('Loupeedeck Software', 'Loupeedeck Software'),
    V('Tascam Stream Controller App', 'Tascam Stream Controller App')
  ]},
  { label: 'Price', values: [
    V('$149', '$149'),
    V('$149', '$149'),
    V('$199', '$199'),
    V('$269', '$269'),
    V('$299', '$299')
  ]}
];
newRows.forEach(r => g.productTable.rows.push(r));

// Verdicts
const VD = (name, pros, cons, pros_es, cons_es) => ({ name, name_es: name, pros, cons, pros_es, cons_es });
g.verdictProsCons = [
  VD('Elgato Stream Deck+',
    ['Tactile dial + touchstrip add analog feel', 'Iconic Stream Deck ecosystem/plugins', 'Infinitely customizable per app', 'Solid build quality'],
    ['No audio interface built in', 'Pricey for 8 keys + dial', 'Software Windows/Mac only'],
    ['Dial táctil + touchstrip añaden tacto analógico', 'Ecosistema/iconico Stream Deck plugins', 'Infinitamente personalizable por app', 'Calidad construcción sólida'],
    ['Sin interfaz de audio integrada', 'Caro para 8 teclas + dial', 'Software solo Windows/Mac']),
  VD('Rode Streamer X',
    ['All-in-one: capture card + audio interface + controller', '4K30/1080p60 capture, XLR preamp', 'Smart pads for scenes/samples', 'Great value for streamers'],
    ['Large footprint', 'Rode Central software Windows/Mac only', 'Only 4 smart pads'],
    ['Todo-en-uno: capture + interfaz audio + controlador', 'Captura 4K30/1080p60, preamp XLR', 'Smart pads para escenas/samples', 'Gran valor para streamers'],
    ['Huella grande', 'Rode Central solo Windows/Mac', 'Solo 4 smart pads']),
  VD('BEACN Mix Create',
    ['Dedicated audio mixer: 4 faders + submix', 'Submix per app (game/chat/music)', 'Physical knobs for quick adjustments', 'Great for dual-PC setups'],
    ['No video capture', 'No LCD keys for scenes', 'BEACN App learning curve', 'Requires PC (no standalone)'],
    ['Mezclador audio dedicado: 4 faders + submix', 'Submix por app (juego/chat/música)', 'Perillas físicas ajustes rápidos', 'Genial para setups dual-PC'],
    ['Sin captura video', 'Sin teclas LCD para escenas', 'Curva aprendizaje BEACN App', 'Requiere PC (no standalone)']),
  VD('Elgato Wave XLR MK.2',
    ['XLR preamp with 75 dB gain', 'Clipguard prevents digital clipping', 'Works with Stream Deck ecosystem', 'Compact desktop form'],
    ['Single channel only', 'No physical faders', 'Elgato Wave Link software required'],
    ['Preamp XLR con 75 dB ganancia', 'Clipguard evita clipping digital', 'Funciona con ecosistema Stream Deck', 'Formato escritorio compacto'],
    ['Solo un canal', 'Sin faders físicos', 'Requiere Elgato Wave Link software']),
  VD('Elgato Stream Deck MK.2',
    ['Classic 15 keys, infinite pages', 'Massive plugin ecosystem', 'USB-C, detachable stand', 'Most supported by streaming tools'],
    ['No dial/touchstrip', 'No audio interface', 'Keys can feel mushy'],
    ['15 teclas clásicas, páginas infinitas', 'Ecosistema plugins masivo', 'USB-C, soporte desmontable', 'Más soportado por herramientas streaming'],
    ['Sin dial/touchstrip', 'Sin interfaz audio', 'Teclas pueden sentirse blandas']),
  VD('Razer Stream Controller X',
    ['15 LCD keys at lower price', 'Razer Synapse integration', 'Haptic feedback on keys', 'Compact'],
    ['Synapse software required', 'Fewer plugins than Stream Deck', 'Build quality feels cheaper'],
    ['15 teclas LCD precio menor', 'Integración Razer Synapse', 'Feedback háptico teclas', 'Compacto'],
    ['Requiere Synapse', 'Menos plugins que Stream Deck', 'Calidad construcción se siente más barata']),
  VD('BEACN Mix',
    ['Simplified Mix Create: 4 faders, 8 knobs', 'Same submix power, lower price', 'Great for single-PC streamers', 'Compact'],
    ['No LCD keys', 'No audio interface (separate)', 'App required for setup'],
    ['Mix Create simplificado: 4 faders, 8 perillas', 'Mismo poder submix, menor precio', 'Genial streamers single-PC', 'Compacto'],
    ['Sin teclas LCD', 'Sin interfaz audio (separada)', 'App requerida para setup']),
  VD('Loupeedeck Live S',
    ['Touchscreen + dials = tactile + visual', 'Deep DAW/creative app integration', 'Custom workspaces per app', 'Great for editors/streamers'],
    ['Premium price', 'Steeper learning curve', 'Software can be resource heavy'],
    ['Táctil + diales = táctil + visual', 'Integración profunda DAW/apps creativas', 'Workspaces personalizados por app', 'Genial editores/streamers'],
    ['Precio premium', 'Curva aprendizaje pronunciada', 'Software puede ser pesado recursos']),
  VD('Tascam Stream Controller',
    ['Motorized faders = pro broadcast feel', '5 faders + 10 keys + 8 knobs', 'Tascam audio heritage', 'Standalone operation possible'],
    ['Highest price', 'Large desktop footprint', 'Software less mature than Elgato'],
    ['Faders motorizados = sensación broadcast pro', '5 faders + 10 teclas + 8 perillas', 'Herencia audio Tascam', 'Operación standalone posible'],
    ['Precio más alto', 'Huella escritorio grande', 'Software menos maduro que Elgato'])
];

fs.writeFileSync('data/guides.json', JSON.stringify(G, null, 2));
console.log('stream-controllers: cols=' + g.productTable.columns.length + ' rows=' + g.productTable.rows.length + ' verdict=' + g.verdictProsCons.length);
console.log('Products:', g.productTable.columns.map(c => c.title).join(', '));