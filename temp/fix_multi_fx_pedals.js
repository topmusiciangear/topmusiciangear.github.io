// best-multi-effects-pedals: expand from 4 to 8 products
const fs = require('fs');
const G = JSON.parse(fs.readFileSync('data/guides.json', 'utf8'));
const P = JSON.parse(fs.readFileSync('data/products.json', 'utf8'));
const V = (value, value_es) => ({ value, value_es });
const W = (t) => ({ title: t, title_es: t });

const g = G.find(x => x.id === 'best-multi-effects-pedals');

const currentTitles = g.productTable.columns.map(c => c.title);
const newProducts = [
  'Zoom G11',
  'Boss GT-1000 Core',
  'Neural DSP Quad Cortex',
  'Moore GE300'
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
  V('All-in-one floor unit, great value', 'Todo-en-uno suelo, gran valor'),
  V('Pro floor unit, GT engine', 'Unidad suelo pro, motor GT'),
  V('Pro capture/modeling, plugin integration', 'Captura/modelado pro, integración plugins'),
  V('Budget all-in-one, touchscreen', 'Todo-en-uno presupuesto, táctil')
]);
put('Type', [
  V('Multi-FX / Amp Modeler', 'Multi-FX / Modelador Amps'),
  V('Multi-FX / Amp Modeler', 'Multi-FX / Modelador Amps'),
  V('Amp Modeler / Capture System', 'Modelador Amps / Sistema Captura'),
  V('Multi-FX / Amp Modeler', 'Multi-FX / Modelador Amps')
]);
put('Controls', [
  V('5 footswitches + expression + touchscreen', '5 footswitches + expresión + táctil'),
  V('7 footswitches + 2 expression + knobs', '7 footswitches + 2 expresión + perillas'),
  V('3 footswitches + rotary + touchscreen', '3 footswitches + rotary + táctil'),
  V('5 footswitches + expression + touchscreen', '5 footswitches + expresión + táctil')
]);
put('Bypass', [
  V('Buffered / True Bypass selectable', 'Buffered / True Bypass seleccionable'),
  V('Buffered / True Bypass selectable', 'Buffered / True Bypass seleccionable'),
  V('Buffered / True Bypass selectable', 'Buffered / True Bypass seleccionable'),
  V('Buffered / True Bypass selectable', 'Buffered / True Bypass seleccionable')
]);
put('Power', [
  V('9V DC (adapter included)', '9V DC (adaptador incluido)'),
  V('9V DC (adapter included)', '9V DC (adaptador incluido)'),
  V('12V DC (adapter included)', '12V DC (adaptador incluido)'),
  V('9V DC (adapter included)', '9V DC (adaptador incluido)')
]);
put('Current Draw', [
  V('500 mA', '500 mA'),
  V('1000 mA', '1000 mA'),
  V('2000 mA', '2000 mA'),
  V('600 mA', '600 mA')
]);
put('Size', [
  V('273 x 164 x 60 mm', '273 x 164 x 60 mm'),
  V('337 x 176 x 63 mm', '337 x 176 x 63 mm'),
  V('225 x 130 x 55 mm', '225 x 130 x 55 mm'),
  V('295 x 165 x 55 mm', '295 x 165 x 55 mm')
]);
put('Standout Feature', [
  V('200+ amps/FX, 5" touchscreen, looper', '200+ amps/FX, 5" táctil, looper'),
  V('AIRD modeling, 32-bit/96kHz, 2 expr', 'AIRD modelado, 32-bit/96kHz, 2 expr'),
  V('Neural Capture, plugin ecosystem, WiFi', 'Captura Neural, ecosistema plugins, WiFi'),
  V('180+ amps/FX, 4.3" touchscreen, IR loader', '180+ amps/FX, 4.3" táctil, cargador IR')
]);

const VD = (name, pros, cons, pros_es, cons_es) => ({ name, name_es: name, pros, cons, pros_es, cons_es });
g.verdictProsCons = [
  VD('Line 6 Helix HX Stomp',
    ['HX modeling in ultra-compact box', '3 blocks + IR, MIDI, USB audio', 'Great for fly rigs / pedalboards', 'Helix edit software deep editing'],
    ['Only 3 blocks (DSP limit)', 'Small screen, menu diving', 'No expression pedal input (TRS only)'],
    ['Modelado HX en caja ultra-compacta', '3 bloques + IR, MIDI, USB audio', 'Genial para fly rigs / pedalboards', 'Helix edit software edición profunda'],
    ['Solo 3 bloques (límite DSP)', 'Pantalla pequeña, menu diving', 'Sin entrada pedal expresión (solo TRS)']),
  VD('Boss GX-1',
    ['Boss GT engine at entry price', '24-bit/96 kHz, 99 patches', 'Compact, battery or 9V', 'Boss Tone Studio editor'],
    ['No expression pedal input', 'Limited routing vs GT-1000', 'No IR loading'],
    ['Motor GT Boss a precio entrada', '24-bit/96 kHz, 99 parches', 'Compacto, bateria o 9V', 'Boss Tone Studio editor'],
    ['Sin entrada pedal expresión', 'Routing limitado vs GT-1000', 'Sin carga IR']),
  VD('Boss ME-90',
    ['Touchscreen UI, 9 footswitches', 'GT engine, 196 amps/FX', 'Looper, rhythm guide, USB audio', 'Expression pedal input'],
    ['No IR loader', 'Plastic build feels cheap', 'No MIDI I/O'],
    ['UI táctil, 9 footswitches', 'Motor GT, 196 amps/FX', 'Looper, guía ritmo, USB audio', 'Entrada pedal expresión'],
    ['Sin cargador IR', 'Construcción plástico se siente barata', 'Sin MIDI I/O']),
  VD('HeadRush Flex Prime',
    ['Touchscreen, 11 amp models + IRs', 'Compact, great for grab-and-go', 'WiFi updates, cloud sharing', '120W amp in the floor unit'],
    ['Limited amp models vs competitors', 'No expression pedal input', 'Smaller community/support'],
    ['Táctil, 11 modelos amp + IRs', 'Compacto, genial grab-and-go', 'Actualizaciones WiFi, cloud sharing', '120W amp en unidad suelo'],
    ['Modelos amp limitados vs competencia', 'Sin entrada pedal expresión', 'Comunidad/soporte menor']),
  VD('Zoom G11',
    ['200+ amps/FX, 5" touchscreen', 'Looper 45 sec, 68 rhythm patterns', 'MIDI I/O, USB audio interface', 'Expression pedal input'],
    ['UI can lag', 'Plastic chassis', 'Zoom tone divisive'],
    ['200+ amps/FX, 5" táctil', 'Looper 45 seg, 68 patrones ritmo', 'MIDI I/O, interfaz audio USB', 'Entrada pedal expresión'],
    ['UI puede tener lag', 'Chasis plástico', 'Tono Zoom divisivo']),
  VD('Boss GT-1000 Core',
    ['AIRD modeling, 32-bit/96 kHz', '2 expression pedals, 7 footswitches', 'IR loader, MIDI, USB audio', 'Boss Tone Studio deep editing'],
    ['No touchscreen', 'Larger than HX Stomp', 'Complex for beginners'],
    ['Modelado AIRD, 32-bit/96 kHz', '2 pedales expresión, 7 footswitches', 'Cargador IR, MIDI, USB audio', 'Boss Tone Studio edición profunda'],
    ['Sin pantalla táctil', 'Más grande que HX Stomp', 'Complejo para principiantes']),
  VD('Neural DSP Quad Cortex',
    ['Neural Capture = clone any amp', 'Plugin ecosystem (Cortex Cloud)', 'WiFi, touchscreen, 2GHz quad-core', 'Incredible sound quality'],
    ['Very expensive', 'Large, needs power supply', 'Learning curve for captures'],
    ['Neural Capture = clona cualquier amp', 'Ecosistema plugins (Cortex Cloud)', 'WiFi, táctil, quad-core 2GHz', 'Calidad sonido increíble'],
    ['Muy caro', 'Grande, necesita fuente', 'Curva aprendizaje captures']),
  VD('Moore GE300',
    ['180+ amps/FX, 4.3" touchscreen', 'IR loader, 20 min looper', 'MIDI I/O, USB audio, expression pedal', 'Great value for features'],
    ['Less known brand', 'Smaller community', 'Footswitches feel clicky'],
    ['180+ amps/FX, 4.3" táctil', 'Cargador IR, looper 20 min', 'MIDI I/O, USB audio, pedal expresión', 'Gran valor por features'],
    ['Marca menos conocida', 'Comunidad menor', 'Footswitches se sienten clickey'])
];

fs.writeFileSync('data/guides.json', JSON.stringify(G, null, 2));
console.log('best-multi-effects-pedals: cols=' + g.productTable.columns.length + ' rows=' + g.productTable.rows.length + ' verdict=' + g.verdictProsCons.length);
console.log('Products:', g.productTable.columns.map(c => c.title).join(', '));