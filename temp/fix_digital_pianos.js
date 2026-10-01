// best-digital-pianos: expand from 3 to 8 products
const fs = require('fs');
const G = JSON.parse(fs.readFileSync('data/guides.json', 'utf8'));
const P = JSON.parse(fs.readFileSync('data/products.json', 'utf8'));
const V = (value, value_es) => ({ value, value_es });
const W = (t) => ({ title: t, title_es: t });

const g = G.find(x => x.id === 'best-digital-pianos');

const currentTitles = g.productTable.columns.map(c => c.title);
const newProducts = [
  'Kawai ES120',
  'Roland FP-90X',
  'Kawai MP11SE',
  'Yamaha CP88',
  'Nord Grand 2'
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
  V('Entry portable, great key action', 'Portátil entrada, gran acción teclas'),
  V('Stage piano, pro sounds, Bluetooth', 'Piano escenario, sonidos pro, Bluetooth'),
  V('Flagship portable, Grand Feel action', 'Portátil insignia, acción Grand Feel'),
  V('Stage/workstation, pro interface', 'Escenario/workstation, interfaz pro'),
  V('Premium stage, dual engine', 'Escenario premium, dual engine')
]);
put('Keys', [
  V('88, Responsive Hammer Compact II', '88, Responsive Hammer Compact II'),
  V('88, PHA-50 Hybrid', '88, PHA-50 Hybrid'),
  V('88, Grand Feel Compact', '88, Grand Feel Compact'),
  V('88, NWX (wood)', '88, NWX (madera)'),
  V('88, Kawai Grand Feel (wood)', '88, Kawai Grand Feel (madera)')
]);
put('Sound Engine', [
  V('Harmonic Imaging XL', 'Harmonic Imaging XL'),
  V('SuperNATURAL Piano + Zen-Core', 'SuperNATURAL Piano + Zen-Core'),
  V('Shigeru Kawai SK-EX + SK-5', 'Shigeru Kawai SK-EX + SK-5'),
  V('Yamaha CFX + Bosendorfer + CP', 'Yamaha CFX + Bosendorfer + CP'),
  V('Nord Piano Library + Sample Synth', 'Nord Piano Library + Sample Synth')
]);
put('Polyphony', [
  V('256', '256'),
  V('256', '256'),
  V('256', '256'),
  V('256', '256'),
  V('120 (piano) + 34 (synth)', '120 (piano) + 34 (synth)')
]);
put('Effects', [
  V('Reverb, chorus, master EQ', 'Reverb, chorus, master EQ'),
  V('Reverb, chorus, delay, master comp', 'Reverb, chorus, delay, master comp'),
  V('Reverb, effects section', 'Reverb, sección efectos'),
  V('VCM effects, master EQ', 'Efectos VCM, master EQ'),
  V('Reverb, delay, compression, EQ', 'Reverb, delay, compresión, EQ')
]);
put('Presets', [
  V('25 sounds', '25 sonidos'),
  V('350+ sounds', '350+ sonidos'),
  V('40 sounds', '40 sonidos'),
  V('100+ sounds', '100+ sonidos'),
  V('400+ programs', '400+ programas')
]);
put('Sequencer', [
  V('2-track recorder', 'Grabador 2 pistas'),
  V('16-track MIDI recorder', 'Grabador MIDI 16 pistas'),
  V('2-track recorder', 'Grabador 2 pistas'),
  V('16-track MIDI recorder', 'Grabador MIDI 16 pistas'),
  V('None (live performance focused)', 'Ninguno (enfoque directo vivo)')
]);
put('Connectivity', [
  V('USB, MIDI I/O, Bluetooth Audio/MIDI', 'USB, MIDI I/O, Bluetooth Audio/MIDI'),
  V('USB, MIDI I/O, Bluetooth, XLR out', 'USB, MIDI I/O, Bluetooth, XLR out'),
  V('USB, MIDI I/O, XLR out', 'USB, MIDI I/O, XLR out'),
  V('USB, MIDI I/O, XLR out', 'USB, MIDI I/O, XLR out'),
  V('USB, MIDI I/O, XLR out', 'USB, MIDI I/O, XLR out')
]);
put('Weight', [
  V('12.2 kg', '12.2 kg'),
  V('23.3 kg', '23.3 kg'),
  V('14.5 kg', '14.5 kg'),
  V('18.6 kg', '18.6 kg'),
  V('15.9 kg', '15.9 kg')
]);

const VD = (name, pros, cons, pros_es, cons_es) => ({ name, name_es: name, pros, cons, pros_es, cons_es });
g.verdictProsCons = [
  VD('Yamaha P-225',
    ['Graded Hammer Compact action feels great', 'Yamaha CFX + Bosendorfer samples', 'Bluetooth Audio + MIDI', 'Lightweight, portable'],
    ['Only 256 polyphony (shared)', 'Limited sound set (25)', 'No XLR outs'],
    ['Acción Graded Hammer Compact se siente genial', 'Samples Yamaha CFX + Bosendorfer', 'Bluetooth Audio + MIDI', 'Ligero, portátil'],
    ['Solo 256 polifonía (compartida)', 'Set sonidos limitado (25)', 'Sin salidas XLR']),
  VD('Roland FP-30X',
    ['PHA-4 Standard action at entry price', 'SuperNATURAL Piano, 350+ sounds', 'Bluetooth MIDI + Audio', 'Great speaker system'],
    ['Plastic key tops feel cheap', 'No XLR outs', 'Menu diving for effects'],
    ['Acción PHA-4 Standard precio entrada', 'SuperNATURAL Piano, 350+ sonidos', 'Bluetooth MIDI + Audio', 'Gran sistema altavoces'],
    ['Tapas teclas plástico se sienten baratas', 'Sin salidas XLR', 'Menu diving para efectos']),
  VD('Nord Stage 4 88',
    ['Dual piano + synth engines', 'Seamless transitions, no load times', 'OLED display, physical controls', 'Industry standard for touring'],
    ['Very expensive', 'Heavy (23 kg)', 'Only 120 voice polyphony'],
    ['Dual engine piano + sintetizador', 'Transiciones seamless, sin load times', 'Display OLED, controles físicos', 'Estándar industria para giras'],
    ['Muy caro', 'Pesado (23 kg)', 'Solo 120 voces polifonía']),
  VD('Kawai ES120',
    ['Responsive Hammer Compact II = best entry action', 'Harmonic Imaging XL, beautiful tone', 'Bluetooth Audio/MIDI, 256 poly', 'Lightweight (12 kg)'],
    ['Only 25 sounds', 'No XLR outs', 'Speaker system basic'],
    ['Responsive Hammer Compact II = mejor acción entrada', 'Harmonic Imaging XL, tono hermoso', 'Bluetooth Audio/MIDI, 256 polifonía', 'Ligero (12 kg)'],
    ['Solo 25 sonidos', 'Sin salidas XLR', 'Sistema altavoces básico']),
  VD('Roland FP-90X',
    ['PHA-50 Hybrid = flagship feel', 'Zen-Core + SuperNATURAL = huge soundset', 'XLR outs, Bluetooth, 16-track recorder', 'Best portable for pros'],
    ['Expensive for portable', 'Heavy (23 kg)', 'Complex menu'],
    ['PHA-50 Hybrid = sensación insignia', 'Zen-Core + SuperNATURAL = enorme set sonidos', 'XLR out, Bluetooth, grabador 16 pistas', 'Mejor portátil para pros'],
    ['Caro para portátil', 'Pesado (23 kg)', 'Menú complejo']),
  VD('Kawai MP11SE',
    ['Grand Feel Compact = wooden keys, best action', 'Shigeru Kawai SK-EX + SK-5 samples', 'XLR outs, MIDI, 256 poly', 'Pure piano focus'],
    ['Only 40 sounds (no synth)', 'No Bluetooth', 'Heavy (14.5 kg)'],
    ['Grand Feel Compact = teclas madera, mejor acción', 'Samples Shigeru Kawai SK-EX + SK-5', 'XLR out, MIDI, 256 polifonía', 'Enfoque puro piano'],
    ['Solo 40 sonidos (sin synth)', 'Sin Bluetooth', 'Pesado (14.5 kg)']),
  VD('Yamaha CP88',
    ['NWX wood keys, amazing feel', 'CFX + Bosendorfer + CP80 electric pianos', 'XLR outs, master EQ, VCM effects', 'Stage piano benchmark'],
    ['Heavy (18.6 kg)', 'Menu system dated', 'Expensive'],
    ['Teclas madera NWX, sensación increíble', 'CFX + Bosendorfer + CP80 pianos eléctricos', 'XLR out, master EQ, efectos VCM', 'Referencia piano escenario'],
    ['Pesado (18.6 kg)', 'Sistema menús anticuado', 'Caro']),
  VD('Nord Grand 2',
    ['Kawai Grand Feel wood action', 'Nord Piano Library + Sample Synth', 'Seamless sound switching', 'OLED, physical knobs'],
    ['120/34 split polyphony limiting', 'Heavy (15.9 kg)', 'No built-in recorder'],
    ['Acción Kawai Grand Feel madera', 'Nord Piano Library + Sample Synth', 'Cambio sonido seamless', 'OLED, perillas físicas'],
    ['Polifonía 120/34 split limitante', 'Pesado (15.9 kg)', 'Sin grabador integrado'])
];

fs.writeFileSync('data/guides.json', JSON.stringify(G, null, 2));
console.log('best-digital-pianos: cols=' + g.productTable.columns.length + ' rows=' + g.productTable.rows.length + ' verdict=' + g.verdictProsCons.length);
console.log('Products:', g.productTable.columns.map(c => c.title).join(', '));