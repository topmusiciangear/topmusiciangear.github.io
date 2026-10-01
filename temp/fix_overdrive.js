// best-overdrive-distortion: expand from 3 to 8 products
const fs = require('fs');
const G = JSON.parse(fs.readFileSync('data/guides.json', 'utf8'));
const P = JSON.parse(fs.readFileSync('data/products.json', 'utf8'));
const V = (value, value_es) => ({ value, value_es });
const W = (t) => ({ title: t, title_es: t });

const g = G.find(x => x.id === 'best-overdrive-distortion');

const currentTitles = g.productTable.columns.map(c => c.title);
const newProducts = [
  'Fulltone OCD v2',
  'Wampler Tumnus Deluxe',
  'JHS Morning Glory V4',
  'MXR Distortion+',
  'Boss BD-2W Blues Driver Waza Craft'
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
  V('Transparent low-gain, touch-sensitive', 'Low-gain transparente, sensible tacto'),
  V('Klon-style, 3-band EQ, buffer switch', 'Estilo Klon, EQ 3 bandas, switch buffer'),
  V('Transparent overdrive, JFET design', 'Overdrive transparente, diseño JFET'),
  V('Classic 70s distortion, simple', 'Distorsión 70s clásica, simple'),
  V('Waza Craft BD-2, 2 modes, premium', 'BD-2 Waza Craft, 2 modos, premium')
]);
put('Type', [
  V('Overdrive', 'Overdrive'),
  V('Overdrive', 'Overdrive'),
  V('Overdrive', 'Overdrive'),
  V('Distortion', 'Distorsión'),
  V('Overdrive', 'Overdrive')
]);
put('Controls', [
  V('Volume, Drive, Tone', 'Volumen, Drive, Tono'),
  V('Volume, Gain, Treble, Mid, Bass, Buffer', 'Volumen, Gain, Agudos, Medios, Graves, Buffer'),
  V('Volume, Drive, Tone', 'Volumen, Drive, Tono'),
  V('Output, Distortion', 'Salida, Distorsión'),
  V('Level, Tone, Drive, Mode switch', 'Nivel, Tono, Drive, Switch modo')
]);
put('Bypass', [
  V('True Bypass', 'True Bypass'),
  V('Buffered / True Bypass switchable', 'Buffered / True Bypass conmutable'),
  V('True Bypass', 'True Bypass'),
  V('True Bypass', 'True Bypass'),
  V('Buffered / True Bypass switchable', 'Buffered / True Bypass conmutable')
]);
put('Power', [
  V('9V DC / Battery', '9V DC / Batería'),
  V('9V DC', '9V DC'),
  V('9V DC / Battery', '9V DC / Batería'),
  V('9V DC / Battery', '9V DC / Batería'),
  V('9V DC', '9V DC')
]);
put('Current Draw', [
  V('15 mA', '15 mA'),
  V('30 mA', '30 mA'),
  V('8 mA', '8 mA'),
  V('5 mA', '5 mA'),
  V('25 mA', '25 mA')
]);
put('Size', [
  V('112 x 60 x 50 mm', '112 x 60 x 50 mm'),
  V('112 x 60 x 50 mm', '112 x 60 x 50 mm'),
  V('112 x 60 x 50 mm', '112 x 60 x 50 mm'),
  V('73 x 111 x 50 mm', '73 x 111 x 50 mm'),
  V('112 x 60 x 50 mm', '112 x 60 x 50 mm')
]);
put('Standout Feature', [
  V('Mosfet clipping, amp-like feel', 'Clipping MOSFET, sensación amp'),
  V('3-band EQ + buffer switch', 'EQ 3 bandas + switch buffer'),
  V('JFET input, transparent boost', 'Entrada JFET, boost transparente'),
  V('Germanium-style clipping, simple', 'Clipping estilo germanio, simple'),
  V('Standard/Custom modes, premium parts', 'Modos Standard/Custom, partes premium')
]);

const VD = (name, pros, cons, pros_es, cons_es) => ({ name, name_es: name, pros, cons, pros_es, cons_es });
g.verdictProsCons = [
  VD('Ibanez TS9 Tube Screamer',
    ['The classic mid-hump overdrive', 'Cuts through mix perfectly', 'Simple 3-knob operation', 'Industry standard for decades'],
    ['Mid-hump not for everyone', 'No bass control', 'Buffer can affect some fuzz pedals'],
    ['El overdrive mid-hump clásico', 'Corta la mezcla perfectamente', 'Operación 3 perillas simple', 'Estándar industria décadas'],
    ['Mid-hump no para todos', 'Sin control graves', 'Buffer puede afectar algunos fuzz']),
  VD('Boss BD-2 Blues Driver',
    ['Transparent, amp-like breakup', 'Huge gain range, cleans up with volume', 'Great as clean boost or dirt', 'Affordable workhorse'],
    ['Can sound harsh at high gain', 'No mid control', 'Buffer always on'],
    ['Transparente, breakup tipo amp', 'Enorme rango ganancia, limpia con volumen', 'Genial como clean boost o dirt', 'Caballo de batalla asequible'],
    ['Puede sonar duro alta ganancia', 'Sin control medios', 'Buffer siempre activo']),
  VD('ProCo RAT 2',
    ['Iconic distortion, versatile gain range', 'Filter knob = powerful tone shaping', 'Legendary on bass and synths too', 'Built like a tank'],
    ['Can be noisy at high gain', 'No true bypass (buffered)', 'No mid control'],
    ['Distorsión icónica, rango ganancia versátil', 'Filter knob = moldeo tono poderoso', 'Legendaria en bajo y sintes también', 'Construida como tanque'],
    ['Puede ser ruidosa alta ganancia', 'No true bypass (buffered)', 'Sin control medios']),
  VD('Fulltone OCD v2',
    ['MOSFET clipping feels like tube amp', 'Touch-sensitive, cleans up beautifully', 'High/Low peak switch for voicing', 'Huge headroom'],
    ['Large footprint', 'Expensive', 'v1/v2 confusion in used market'],
    ['Clipping MOSFET siente como amp tubo', 'Sensible al tacto, limpia hermoso', 'Switch High/Low peak para voicing', 'Enorme headroom'],
    ['Huella grande', 'Caro', 'Confusión v1/v2 mercado segunda mano']),
  VD('Wampler Tumnus Deluxe',
    ['Klon Centaur circuit, 3-band EQ', 'Buffer switch (on/off/auto)', 'Transparent, musical, versatile', 'Top-tier build quality'],
    ['Pricey for overdrive', 'Can be too transparent for some', 'Large for pedalboard'],
    ['Circuito Klon Centaur, EQ 3 bandas', 'Switch buffer (on/off/auto)', 'Transparente, musical, versátil', 'Calidad construcción top-tier'],
    ['Caro para overdrive', 'Puede ser demasiado transparente', 'Grande para pedalboard']),
  VD('JHS Morning Glory V4',
    ['JFET design, ultra-transparent', 'Red remote switch for gain boost', 'Incredible as always-on boost', 'Small footprint'],
    ['Low gain only', 'No tone control (fixed)', 'Red remote sold separately'],
    ['Diseño JFET, ultra-transparente', 'Switch remoto rojo para boost ganancia', 'Increíble como boost always-on', 'Huella pequeña'],
    ['Solo low-gain', 'Sin control tono (fijo)', 'Remote rojo se vende por separado']),
  VD('MXR Distortion+',
    ['Classic 70s hard-clipping distortion', 'Simple 2-knob operation', 'Used by Randy Rhoads, Jerry Garcia', 'Tiny, affordable'],
    ['No tone control', 'Can be fizzy/harsh', 'Single gain stage'],
    ['Distorsión hard-clipping 70s clásica', 'Operación 2 perillas simple', 'Usada por Randy Rhoads, Jerry Garcia', 'Pequeña, asequible'],
    ['Sin control tono', 'Puede ser fizzy/duro', 'Solo una etapa ganancia']),
  VD('Boss BD-2W Blues Driver Waza Craft',
    ['Two modes: Standard (BD-2) + Custom', 'Custom = smoother, more midrange', 'Premium components, made in Japan', 'Buffered/True bypass switch'],
    ['Twice the price of standard BD-2', 'Custom mode less "Blues Driver" character', 'Still no mid control'],
    ['Dos modos: Standard (BD-2) + Custom', 'Custom = más suave, más medios', 'Componentes premium, hecho en Japón', 'Switch Buffered/True bypass'],
    ['Doble precio BD-2 estándar', 'Modo Custom menos carácter "Blues Driver"', 'Todavía sin control medios'])
];

fs.writeFileSync('data/guides.json', JSON.stringify(G, null, 2));
console.log('best-overdrive-distortion: cols=' + g.productTable.columns.length + ' rows=' + g.productTable.rows.length + ' verdict=' + g.verdictProsCons.length);
console.log('Products:', g.productTable.columns.map(c => c.title).join(', '));