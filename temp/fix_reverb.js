const fs = require('fs');
const DIR = 'C:/Users/Daniel/projects/topmusiciangear/';
const gFile = DIR + 'data/guides.json';
const G = JSON.parse(fs.readFileSync(gFile, 'utf8'));
const g = G.find(x => x.id === 'best-reverb-delay');
const t = g.productTable;
const ci = {};
t.columns.forEach((c, i) => { ci[c.title] = i; });
const trow = l => t.rows.find(rr => rr.label === l);
const rep1 = (txt, from, to) => {
  const c = txt.split(from).length - 1;
  if (c !== 1) throw new Error('found ' + c + 'x: ' + from.slice(0, 70));
  return txt.split(from).join(to);
};
const setCell = (label, col, en, es) => {
  const r = trow(label);
  r.values[ci[col]].value = en;
  r.values[ci[col]].value_es = es;
};
// Prices
setCell('Estimated Price', 'Strymon TimeLine', '~$449', '~$449');
setCell('Estimated Price', 'Meris LVX', '~$599', '~$599');
setCell('Estimated Price', 'Chase Bliss Habit', '~$399', '~$399');
setCell('Estimated Price', 'Eventide TimeFactor', '~$499', '~$499');
setCell('Estimated Price', 'Source Audio Nemesis', '~$349', '~$349');
console.log('prices filled');
// Types
setCell('Type', 'Meris LVX', 'Modular delay workstation', 'Workstation modular de delay');
setCell('Type', 'Chase Bliss Habit', 'Delay / Looper (discontinued)', 'Delay / Looper (descatalogado)');
console.log('types fixed');
// LVX bypass
setCell('Bypass', 'Meris LVX', 'Buffered / True Bypass selectable', 'Buffered / True Bypass seleccionable');
// Sizes
setCell('Size', 'Strymon TimeLine', '171 x 127 x 47 mm', '171 x 127 x 47 mm');
setCell('Size', 'Meris LVX', '184 x 114 x 51 mm', '184 x 114 x 51 mm');
setCell('Size', 'Strymon BigSky MX', 'Wide (172 x 127 x 48 mm)', 'Ancho (172 x 127 x 48 mm)');
setCell('Size', 'Chase Bliss Habit', '73 x 124 x 58 mm', '73 x 124 x 58 mm');
setCell('Size', 'Eventide TimeFactor', '190 x 122 x 54 mm', '190 x 122 x 54 mm');
setCell('Size', 'Source Audio Nemesis', '117 x 112 x 56 mm', '117 x 112 x 56 mm');
console.log('sizes fixed');
// Nemesis standout
setCell('Standout Feature', 'Source Audio Nemesis', '26 delay engines, full MIDI, 128 presets, Neuro app', '26 motores delay, MIDI total, 128 presets, app Neuro');
console.log('standout fixed');
// DSP row after Current Draw
const di = t.rows.findIndex(rr => rr.label === 'Current Draw');
const dsp = {
  label: 'DSP / Processing', label_es: 'DSP / Procesamiento',
  values: [
    { value: '\u2014', value_es: '\u2014' },
    { value: '\u2014', value_es: '\u2014' },
    { value: 'ARM tri-core 800 MHz, 32-bit float', value_es: 'ARM tri-core 800 MHz, 32 bits flotantes' },
    { value: '\u2014', value_es: '\u2014' },
    { value: 'ARM, 32-bit float', value_es: 'ARM, 32 bits flotantes' },
    { value: '\u2014', value_es: '\u2014' },
    { value: '\u2014', value_es: '\u2014' },
    { value: '\u2014', value_es: '\u2014' }
  ]
};
t.rows.splice(di + 1, 0, dsp);
console.log('DSP row added');
// Verdict 27 -> 26
const v = g.verdictProsCons.find(x => /Nemesis/.test(x.name));
v.pros = v.pros.map(x => x === '27 delay engines, Neuro app deep edit' ? '26 delay engines, full MIDI, 128 presets, Neuro app' : x);
v.pros_es = v.pros_es.map(x => x === '27 motores delay, app Neuro edici\u00f3n profunda' ? '26 motores delay, MIDI total, 128 presets, app Neuro' : x);
if (!v.pros.some(x => x.startsWith('26 delay'))) throw new Error('verdict not fixed');
console.log('verdict fixed');
fs.writeFileSync(gFile, JSON.stringify(G, null, 2) + '\n');
console.log('guides.json written');
