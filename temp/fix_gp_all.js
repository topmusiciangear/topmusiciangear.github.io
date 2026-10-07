const fs = require('fs');
const DIR = 'C:/Users/Daniel/projects/topmusiciangear/';
const G = JSON.parse(fs.readFileSync(DIR + 'data/guides.json', 'utf8'));
const g = G.find(v => v.id === 'guitar-pedals');
function rep1(txt, from, to) {
  const c = txt.split(from).length - 1;
  if (c !== 1) throw new Error('found ' + c + 'x: ' + from.slice(0, 70));
  return txt.split(from).join(to);
}
let t = JSON.stringify(g);
// ---- TABLE: bypass row + GCB95 standout ----
t = JSON.parse(t);
const brow = t.productTable.rows.find(r => r.label === 'Bypass');
const exp = ['True bypass', 'True bypass', 'True bypass', 'True bypass', 'True bypass', 'True bypass', 'True bypass', 'True / Buffered selectable'];
brow.values.forEach((c, i) => { if (c.value !== exp[i]) throw new Error('bypass[' + i + ']: ' + c.value); });
const setB = (i, en, es) => { brow.values[i].value = en; brow.values[i].value_es = es; };
setB(0, 'Buffered', 'Buffered');
setB(1, 'Buffered', 'Buffered');
setB(2, 'Buffered', 'Buffered');
setB(3, 'Hardwire', 'Hardwire');
const srow = t.productTable.rows.find(r => r.label === 'Standout Feature');
if (srow.values[3].value !== 'Classic Fasel inductor') throw new Error('standout: ' + srow.values[3].value);
srow.values[3].value = 'Industry-standard wah, rugged build';
srow.values[3].value_es = 'Wah estándar de la industria, construcción robusta';
t = JSON.stringify(t);
console.log('table fixed');
// ---- SECTIONS ----
t = rep1(t, 'switches with true bypass, and carries the TS808 lineage', 'switches with buffered bypass, and carries the TS808 lineage');
t = rep1(t, 'conmuta con true bypass y porta el linaje TS808', 'conmuta con buffered bypass y porta el linaje TS808');
t = rep1(t, 'houses the Fasel-voiced sweep, sipping 1 mA from a 9-volt battery, with true bypass preserving dry tone when parked',
  'houses the classic Crybaby sweep, sipping 1 mA from a 9-volt battery, with hardwire bypass');
t = rep1(t, 'alberga el barrido de voz Fasel, con consumo de 1 mA a 9 voltios por pila y true bypass que respeta el tono en reposo',
  'alberga el clásico barrido Crybaby, con consumo de 1 mA a 9 voltios por pila y bypass hardwire');
t = rep1(t, 'Los pedales digitales modernos como Strymon Timeline ($400)', 'Los pedales digitales modernos como Strymon Timeline ($449)');
console.log('sections fixed');
// ---- VERDICT (short) ----
t = rep1(t, 'Boss SD-1 for overdrive, Boss CE-2W for modulation, Boss DD-8 for delay, TC Electronic PolyTune 3 for tuning, Strymon Timeline for premium delay.',
  'If you are building your first pro pedalboard, this selection covers every essential: the Ibanez TS9 brings the definitive drive push, MXR and EHX phasers inject psychedelic modulation, the Boss DD-8 and TC HOF 2 handle atmosphere, and the Strymon BigSky MX crowns it all as the definitive studio-grade ambient brain. All of it protected and calibrated from the start by the industry-standard Boss TU-3 and the expressive Crybaby GCB95.');
t = rep1(t, 'Si estás empezando un pedalboard, estos pedales lo cubren todo: el Boss SD-1 para overdrive, el Boss CE-2W para modulación, el Boss DD-8 para delay, el TC Electronic PolyTune 3 para afinar, y el Strymon Timeline para delay premium.',
  'Si estás armando tu primera pedalera profesional, esta selección cubre todos los pilares: el Ibanez TS9 aporta el empuje definitivo, los phasers de MXR y EHX inyectan modulación psicodélica, el Boss DD-8 y el TC HOF 2 resuelven la atmósfera, y el Strymon BigSky MX corona el equipo como cerebro ambiental definitivo de estudio. Todo protegido y calibrado desde el inicio por el estándar Boss TU-3 y el expresivo Crybaby GCB95.');
console.log('verdict fixed');
// ---- CONCLUSION ----
t = rep1(t, 'Start with a tuner (PolyTune 3), overdrive (Boss SD-1), modulation (Boss CE-2W), and delay (Boss DD-8).',
  'To build a balanced, pro pedalboard, start by setting the essential pillars: a precise tuner (like the PolyTune 3), a dynamic overdrive to push your amp (like the Boss SD-1), integrated analog modulation (like the Boss CE-2W) and a versatile time-based delay (like the Boss DD-8).');
t = rep1(t, 'Add reverb, compression, and wah as you discover your sound.',
  'From that solid base, add spatial reverbs, compressors or mechanical expression pedals like the wah as your repertoire demands.');
t = rep1(t, ' Build your pedalboard gradually — don\'t buy everything at once.', '');
t = rep1(t, 'Empieza con un afinador (PolyTune 3), overdrive (Boss SD-1), modulación (Boss CE-2W) y delay (Boss DD-8). Agrega reverb, compresión y wah a medida que descubras el sonido. Construye tu pedalboard gradualmente — no compres todo de una vez.',
  'Para construir una pedalera equilibrada y profesional, empieza asentando los pilares esenciales: un afinador preciso (como el PolyTune 3), un overdrive dinámico para empujar tu ampli (como el Boss SD-1), modulación analógica integrada (como el Boss CE-2W) y un delay polivalente (como el Boss DD-8). Desde esa base sólida, suma reverbs espaciales, compresores o pedales de expresión mecánicos como el wah a medida que tu repertorio lo exija.');
console.log('conclusion fixed');
G[G.findIndex(v => v.id === 'guitar-pedals')] = JSON.parse(t);
fs.writeFileSync(DIR + 'data/guides.json', JSON.stringify(G, null, 2) + '\n');
console.log('guides.json written');
