const fs = require('fs');
const DIR = 'C:/Users/Daniel/projects/topmusiciangear/';
const G = JSON.parse(fs.readFileSync(DIR + 'data/guides.json', 'utf8'));
const g = G.find(v => v.id === 'best-multi-effects-pedals');
if (!g) throw new Error('guide not found');
const H = (en, es) => {
  const sec = g.sections.find(s => s.heading === en.from);
  if (!sec) throw new Error('heading not found: ' + en.from);
  sec.heading = en.to;
  const secEs = g.sections.find(s => s.heading_es === es.from);
  if (!secEs) throw new Error('heading_es not found: ' + es.from);
  secEs.heading_es = es.to;
};
H(
  { from: 'Is the Line 6 Helix HX Stomp the Best Pedal for Your Pedalboard?', to: 'Helix Tone in a Stompbox: Is the HX Stomp Worth It?' },
  { from: '¿Es el line 6 helix hX stomp el mejor pedal para tu pedalera?', to: 'Tono Helix en un stompbox: ¿vale la pena el HX Stomp?' }
);
H(
  { from: 'Is the Boss GX-1 the Best Pedal for Your Pedalboard?', to: 'First Multi-Effects? Why the GX-1 Makes Starting Easy' },
  { from: '¿Es el Boss gX-1 el mejor pedal para tu pedalera?', to: '¿Primer multiefectos? Por qué el GX-1 facilita empezar' }
);
H(
  { from: 'Is the Boss ME-90 the Best Pedal for Your Pedalboard?', to: 'Knobs Instead of Menus: The ME-90 Way' },
  { from: '¿Es el Boss ME-90 el mejor pedal para tu pedalera?', to: 'Perillas en vez de menús: el camino del ME-90' }
);
H(
  { from: 'Is the HeadRush Flex Prime the Best Pedal for Your Pedalboard?', to: 'Touchscreen Tones: What the Flex Prime Does Differently' },
  { from: '¿Es el HeadRush Flex Prime el mejor pedal para tu pedalera?', to: 'Sonido táctil: qué hace distinto el Flex Prime' }
);
H(
  { from: 'Is the Zoom G11 the Best Pedal for Your Pedalboard?', to: 'Zoom\u2019s Flagship Floorboard: Who Is the G11 For?' },
  { from: '¿Es el Zoom G11 el mejor pedal para tu pedalera?', to: 'La insignia de Zoom: ¿para quién es el G11?' }
);
H(
  { from: 'Is the Boss GT-1000CORE the Best Pedal for Your Pedalboard?', to: 'Flagship Boss Power in a Stompbox: The GT-1000CORE' },
  { from: '¿Es el Boss GT-1000CORE el mejor pedal para tu pedalera?', to: 'Potencia Boss insignia en un stompbox: el GT-1000CORE' }
);
H(
  { from: 'Is the Neural DSP Quad Cortex the Best Pedal for Your Pedalboard?', to: 'Clone Your Amp: Is the Quad Cortex the Future?' },
  { from: '¿Es el Neural DSP Quad Cortex el mejor pedal para tu pedalera?', to: 'Clona tu ampli: ¿es el Quad Cortex el futuro?' }
);
H(
  { from: 'Is the Mooer GE300 the Best Pedal for Your Pedalboard?', to: 'Maximum Features per Dollar: The GE300 Case' },
  { from: '¿Es el Mooer GE300 el mejor pedal para tu pedalera?', to: 'Máximas funciones por euro: el caso del GE300' }
);
fs.writeFileSync(DIR + 'data/guides.json', JSON.stringify(G, null, 2) + '\n');
console.log('headings rewritten');
