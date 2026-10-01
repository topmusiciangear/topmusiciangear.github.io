// best-reverb-delay: expand from 3 to 8 products
const fs = require('fs');
const G = JSON.parse(fs.readFileSync('data/guides.json', 'utf8'));
const P = JSON.parse(fs.readFileSync('data/products.json', 'utf8'));
const V = (value, value_es) => ({ value, value_es });
const W = (t) => ({ title: t, title_es: t });

const g = G.find(x => x.id === 'best-reverb-delay');

const currentTitles = g.productTable.columns.map(c => c.title);
const newProducts = [
  'Strymon TimeLine',
  'Meris LVX',
  'Chase Bliss Habit',
  'Eventide TimeFactor',
  'Source Audio Nemesis'
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
  V('The gold standard delay pedal', 'El estándar oro pedal delay'),
  V('Modular reverb/delay workstation', 'Workstation reverb/delay modular'),
  V('Experimental delay, collecting sounds', 'Delay experimental, coleccionar sonidos'),
  V('Classic rack delay in pedal form', 'Delay rack clásico en pedal'),
  V('Deep editing, Neuro app, stereo', 'Edición profunda, app Neuro, estéreo')
]);
put('Type', [
  V('Delay', 'Delay'),
  V('Reverb / Delay', 'Reverb / Delay'),
  V('Delay / Looper', 'Delay / Looper'),
  V('Delay', 'Delay'),
  V('Delay', 'Delay')
]);
put('Controls', [
  V('12 knobs + 2 footswitches + display', '12 perillas + 2 footswitches + display'),
  V('8 knobs + 3 footswitches + display', '8 perillas + 3 footswitches + display'),
  V('6 knobs + 3 footswitches + display', '6 perillas + 3 footswitches + display'),
  V('10 knobs + 3 footswitches + display', '10 perillas + 3 footswitches + display'),
  V('4 knobs + 3 footswitches + display', '4 perillas + 3 footswitches + display')
]);
put('Bypass', [
  V('Buffered / True Bypass selectable', 'Buffered / True Bypass seleccionable'),
  V('Buffered', 'Buffered'),
  V('Buffered', 'Buffered'),
  V('Buffered', 'Buffered'),
  V('Buffered / True Bypass selectable', 'Buffered / True Bypass seleccionable')
]);
put('Power', [
  V('9V DC (300 mA)', '9V DC (300 mA)'),
  V('9V DC (300 mA)', '9V DC (300 mA)'),
  V('9V DC (150 mA)', '9V DC (150 mA)'),
  V('9V DC (400 mA)', '9V DC (400 mA)'),
  V('9V DC (200 mA)', '9V DC (200 mA)')
]);
put('Current Draw', [
  V('300 mA', '300 mA'),
  V('300 mA', '300 mA'),
  V('150 mA', '150 mA'),
  V('400 mA', '400 mA'),
  V('200 mA', '200 mA')
]);
put('Size', [
  V('112 x 112 x 55 mm', '112 x 112 x 55 mm'),
  V('112 x 112 x 55 mm', '112 x 112 x 55 mm'),
  V('112 x 60 x 50 mm', '112 x 60 x 50 mm'),
  V('112 x 112 x 55 mm', '112 x 112 x 55 mm'),
  V('112 x 60 x 50 mm', '112 x 60 x 50 mm')
]);
put('Standout Feature', [
  V('12 delay machines, 200 presets, MIDI', '12 máquinas delay, 200 presets, MIDI'),
  V('Structures: combine reverb+delay', 'Structures: combinar reverb+delay'),
  V('Habit: records everything, scan/loop', 'Habit: graba todo, escanear/loop'),
  V('10 delay types, looper, MIDI', '10 tipos delay, looper, MIDI'),
  V('Neuro app deep edit, 27 engines', 'App Neuro edición profunda, 27 motores')
]);

const VD = (name, pros, cons, pros_es, cons_es) => ({ name, name_es: name, pros, cons, pros_es, cons_es });
g.verdictProsCons = [
  VD('Boss DD-8 Digital Delay',
    ['11 delay modes in compact box', 'Looper (40 sec), tap tempo, carryover', 'Stereo I/O, MIDI, expression pedal', 'Great value for features'],
    ['Menu diving for deep params', 'No dedicated knobs per param', 'Looper basic vs dedicated'],
    ['11 modos delay en caja compacta', 'Looper (40 seg), tap tempo, carryover', 'I/O estéreo, MIDI, pedal expresión', 'Gran valor por features'],
    ['Menu diving params profundos', 'Sin perillas dedicadas por param', 'Looper básico vs dedicado']),
  VD('TC Electronic Hall of Fame 2',
    ['10 reverb algorithms, TonePrint', 'MASH footswitch = expressive control', 'Stereo I/O, true bypass option', 'Great value'],
    ['No dedicated delay section', 'Editor required for deep editing', 'Single footswitch limited'],
    ['10 algoritmos reverb, TonePrint', 'MASH footswitch = control expresivo', 'I/O estéreo, opción true bypass', 'Gran valor'],
    ['Sin sección delay dedicada', 'Editor requerido edición profunda', 'Footswitch único limitado']),
  VD('Strymon BigSky MX',
    ['12 reverb machines, studio quality', 'MIDI, 300 presets, stereo I/O', 'New: cabinet modeling, freeze enhancements', 'The reverb pedal benchmark'],
    ['Expensive', 'Large footprint', 'Complex menu system'],
    ['12 máquinas reverb, calidad estudio', 'MIDI, 300 presets, I/O estéreo', 'Nuevo: cabinet modeling, freeze mejorado', 'El pedal reverb referencia'],
    ['Caro', 'Huella grande', 'Sistema menús complejo']),
  VD('Strymon TimeLine',
    ['12 delay machines, 200 presets', 'Looper (30 sec), MIDI, stereo I/O', 'Filter, grit, modulation per machine', 'Delay gold standard'],
    ['Very expensive', 'Large, complex', 'No dedicated tap tempo footswitch'],
    ['12 máquinas delay, 200 presets', 'Looper (30 seg), MIDI, I/O estéreo', 'Filtro, grit, modulación por máquina', 'Estándar oro delay'],
    ['Muy caro', 'Grande, complejo', 'Sin footswitch tap tempo dedicado']),
  VD('Meris LVX',
    ['Structures: modular reverb+delay', '8 simultaneous engines, stereo', 'MIDI, 99 presets, expression control', 'Unique sound design tool'],
    ['Steep learning curve', 'No dedicated knobs per param', 'Expensive'],
    ['Structures: modular reverb+delay', '8 motores simultáneos, estéreo', 'MIDI, 99 presets, control expresión', 'Herramienta diseño sonoro única'],
    ['Curva aprendizaje pronunciada', 'Sin perillas dedicadas por param', 'Caro']),
  VD('Chase Bliss Habit',
    ['Records everything, scan/loop past', 'Experimental delay/looper hybrid', 'MIDI, dip switches, expression', 'Inspires happy accidents'],
    ['Very niche workflow', 'Expensive', 'Can be confusing live'],
    ['Graba todo, escanear/loop pasado', 'Híbrido delay/looper experimental', 'MIDI, dip switches, expresión', 'Inspira accidentes felices'],
    ['Flujo trabajo muy nicho', 'Caro', 'Puede ser confuso en vivo']),
  VD('Eventide TimeFactor',
    ['10 delay types, vintage + modern', 'Looper (12 sec), MIDI, stereo', 'Modulation, filtering per algorithm', 'Classic rack sound in pedal'],
    ['Older platform, larger', 'No USB, limited preset management', 'High current draw (400 mA)'],
    ['10 tipos delay, vintage + moderno', 'Looper (12 seg), MIDI, estéreo', 'Modulación, filtrado por algoritmo', 'Sonido rack clásico en pedal'],
    ['Plataforma antigua, más grande', 'Sin USB, gestión presets limitada', 'Consumo alto (400 mA)']),
  VD('Source Audio Nemesis',
    ['27 delay engines, Neuro app deep edit', 'Stereo I/O, MIDI, expression', 'Compact, 128 presets onboard', 'Best value for tweakers'],
    ['App required for deep editing', 'Small knobs, tight spacing', 'No dedicated looper'],
    ['27 motores delay, app Neuro edición profunda', 'I/O estéreo, MIDI, expresión', 'Compacto, 128 presets onboard', 'Mejor valor para tweakers'],
    ['App requerida edición profunda', 'Perillas pequeñas, espaciado ajustado', 'Sin looper dedicado'])
];

fs.writeFileSync('data/guides.json', JSON.stringify(G, null, 2));
console.log('best-reverb-delay: cols=' + g.productTable.columns.length + ' rows=' + g.productTable.rows.length + ' verdict=' + g.verdictProsCons.length);
console.log('Products:', g.productTable.columns.map(c => c.title).join(', '));