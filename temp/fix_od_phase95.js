const fs = require('fs');
const DIR = 'C:/Users/Daniel/projects/topmusiciangear/';
const G = JSON.parse(fs.readFileSync(DIR + 'data/guides.json', 'utf8'));
const g = G.find(v => v.id === 'best-overdrive-distortion');
if (!g) throw new Error('guide not found');
const t = g.productTable;
if (t.columns.some(c => c.title === 'MXR Phase 95')) throw new Error('col exists');
if (t.columns.length !== 8) throw new Error('expected 8 cols, got ' + t.columns.length);
t.columns.push({ title: 'MXR Phase 95', title_es: 'MXR Phase 95' });
const V = (value, value_es) => ({ value, value_es });
const put = (label, en, es) => {
  const r = t.rows.find(rr => rr.label === label);
  if (!r) throw new Error('no row ' + label);
  if (r.values.length !== 8) throw new Error('row ' + label + ' has ' + r.values.length);
  r.values.push(V(en, es));
};
put('Best For', 'Live rock textures on small boards', 'Texturas rock en directo con poco espacio');
put('Estimated Price', '$108.57–$115.99', '$108.57–$115.99');
put('Type', 'Phaser', 'Phaser');
put('Controls', 'Speed, 45/90/Phase 95 switch', 'Speed, switch 45/90/Phase 95');
put('Bypass', 'True Bypass', 'True Bypass');
put('Power', '9V battery/DC', 'Pila 9V/DC');
put('Current Draw', '4 mA', '4 mA');
put('Size', 'Mini (50 x 94 x 57 mm)', 'Mini (50 x 94 x 57 mm)');
put('Standout Feature', 'Script/Block 45 & 90 modes', 'Modos Script/Block 45 y 90');
console.log('Phase 95 column added');
// verdict
if (g.verdictProsCons.some(x => x.name === 'MXR Phase 95')) throw new Error('verdict exists');
g.verdictProsCons.push({
  name: 'MXR Phase 95', name_es: 'MXR Phase 95',
  pros: ['Script + Block circuits in one mini box', 'Adds movement before or after drive', 'Simple one-knob operation', 'Tiny footprint, battery or adapter'],
  cons: ['One knob only, no depth control', 'Subtle at slow speeds on some rigs', 'Gets buried before heavy distortion for some players', 'No tap tempo or presets'],
  pros_es: ['Circuitos Script + Block en caja mini', 'Añade movimiento antes o después del drive', 'Operación simple de un mando', 'Huella mínima, pila o adaptador'],
  cons_es: ['Un solo mando, sin control de depth', 'Sutil a velocidades lentas en algunos equipos', 'Se pierde antes de distorsión fuerte para algunos', 'Sin tap tempo ni presets']
});
console.log('Phase 95 verdict added');
fs.writeFileSync(DIR + 'data/guides.json', JSON.stringify(G, null, 2) + '\n');
console.log('guides.json written');
