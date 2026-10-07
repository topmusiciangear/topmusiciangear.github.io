const fs = require('fs');
const DIR = 'C:/Users/Daniel/projects/topmusiciangear/';
const G = JSON.parse(fs.readFileSync(DIR + 'data/guides.json', 'utf8'));
const g = G.find(v => v.id === 'best-multi-effects-pedals');
function rep1(txt, from, to) {
  const c = txt.split(from).length - 1;
  if (c !== 1) throw new Error('found ' + c + 'x: ' + from.slice(0, 70));
  return txt.split(from).join(to);
}
let t = JSON.stringify(g);
// ---- TABLE ----
const T = (label, i, enFrom, enTo, esFrom, esTo) => {
  t = JSON.parse(t);
  const gg = { productTable: t.productTable };
  const r = gg.productTable.rows.find(rr => rr.label === label);
  if (r.values[i].value !== enFrom) throw new Error(label + '[' + i + '] EN: ' + r.values[i].value);
  if (r.values[i].value_es !== esFrom) throw new Error(label + '[' + i + '] ES: ' + r.values[i].value_es);
  r.values[i].value = enTo; r.values[i].value_es = esTo;
  t = JSON.stringify({ sections: t.sections, featuredProducts: t.featuredProducts, productTable: gg.productTable, verdictProsCons: t.verdictProsCons, intro: t.intro, intro_es: t.intro_es, conclusion: t.conclusion, conclusion_es: t.conclusion_es, verdict: t.verdict, verdict_es: t.verdict_es, featuredSnippet: t.featuredSnippet });
  t = JSON.stringify(g);
};
// simpler: operate on parsed object directly
let o = JSON.parse(t);
const row = l => o.productTable.rows.find(r => r.label === l);
const cell = (l, i, en, es) => {
  const r = row(l);
  if (r.values[i].value !== en[0]) throw new Error(l + '[' + i + '] EN: ' + r.values[i].value);
  if (r.values[i].value_es !== es[0]) throw new Error(l + '[' + i + '] ES: ' + r.values[i].value_es);
  r.values[i].value = en[1]; r.values[i].value_es = es[1];
};
// HX: controls + bypass (Line 6 manual: LCD, knobs, 3 touch FS; analog/DSP bypass)
cell('Controls', 0, ['Touchscreen, footswitches', 'LCD + knobs, 3 touch footswitches'], ['Pantalla táctil, footswitches', 'LCD + mandos, 3 footswitches táctiles']);
cell('Bypass', 0, ['True bypass', 'Analog / DSP (trails)'], ['True bypass', 'Analógico / DSP (trails)']);
// GX-1: controls, current, size, power (Boss official: LCD+buttons, 250mA, 307x149x56, 4xAA/USB/AC)
cell('Controls', 1, ['Model knob, footswitch', 'Switches + knobs + expression'], ['Mando Model, footswitch', 'Switches + mandos + expresión']);
cell('Current Draw', 1, ['115 mA', '250 mA'], ['115 mA', '250 mA']);
cell('Size', 1, ['Compact (189 x 158 x 51 mm)', '307 x 149 x 56 mm'], ['Compacto (189 x 158 x 51 mm)', '307 x 149 x 56 mm']);
cell('Power', 1, ['6x AA batteries/AC', '4x AA / USB / AC'], ['6x AA / AC', '4x AA / USB / AC']);
// ME-90: controls, size, bypass, power, current, standout (Boss official: 8FS+exp, 443x220x67, 4xAA/AC, 190mA, 97 FX)
cell('Controls', 2, ['4 footswitches, knobs', '8 footswitches + expression, knobs'], ['4 footswitches, mandos', '8 footswitches + expresión, mandos']);
cell('Size', 2, ['Compact (223 x 168 x 61 mm)', '443 x 220 x 67 mm'], ['Compacto (223 x 168 x 61 mm)', '443 x 220 x 67 mm']);
cell('Bypass', 2, ['True bypass', 'Buffered'], ['True bypass', 'Buffered']);
cell('Power', 2, ['DC 9V (550 mA)', '4x AA / adapter'], ['DC 9V (550 mA)', '4x AA / adaptador']);
cell('Current Draw', 2, ['550 mA', '190 mA'], ['550 mA', '190 mA']);
cell('Standout Feature', 2, ['31 amp models, 32 FX slots', '97 effects, hands-on control'], ['31 modelos de ampli, 32 slots FX', '97 efectos, control directo']);
// Flex: controls, power, current, size (HeadRush official: 12V/3A, 295x150x70, built-in expression)
cell('Controls', 3, ['Touchscreen, 4 footswitches', 'Touchscreen, 4 FS + expression'], ['Pantalla táctil, 4 footswitches', 'Táctil, 4 FS + expresión']);
cell('Power', 3, ['DC 9V (1.2A)', 'DC 12V (3A)'], ['DC 9V (1,2A)', 'DC 12V (3A)']);
cell('Current Draw', 3, ['1200 mA', '3000 mA'], ['1200 mA', '3000 mA']);
cell('Size', 3, ['Compact (229 x 139 x 75 mm)', '295 x 150 x 70 mm'], ['Compacto (229 x 139 x 75 mm)', '295 x 150 x 70 mm']);
// QC current: 12V/3A supply (G4M verified)
cell('Current Draw', 6, ['2000 mA', '3000 mA'], ['2000 mA', '3000 mA']);
// GE300: display is NOT touch -> 'display'
cell('Standout Feature', 7, ['108 amps + 164 FX, 5" touchscreen, IR loader', '108 amps + 164 FX, 5" display, IR loader'], ['108 amps + 164 FX, táctil 5", cargador IR', '108 amps + 164 FX, pantalla 5", cargador IR']);
console.log('table fixed');
// ---- VERDICTS ----
const vd = n => o.verdictProsCons.find(x => x.name === n);
let v = vd('Line 6 Helix HX Stomp');
v.pros[1] = 'Up to 8 blocks + IR, MIDI, USB audio';
v.cons[0] = 'DSP runs out before 8 blocks fill';
v.cons[2] = 'Needs external switches/pedal for full control';
v.pros_es[1] = 'Hasta 8 bloques + IR, MIDI, USB audio';
v.cons_es[0] = 'El DSP se agota antes de llenar los 8 bloques';
v.cons_es[2] = 'Pide switches/pedal externos para control total';
v = vd('Boss GX-1');
v.pros[1] = '48 kHz engine, 99+99 patches';
v.cons[2] = 'Compact screen for deep editing';
v.pros_es[1] = 'Motor 48 kHz, 99+99 patches';
v.cons_es[2] = 'Pantalla compacta para edición profunda';
v = vd('Boss ME-90');
v.pros[0] = 'Knob-per-function, 8 footswitches';
v.cons[0] = 'Small LED display, no touchscreen';
v.cons[1] = 'Only 36 user memories';
v.pros_es[0] = 'Mandos directos, 8 footswitches';
v.cons_es[0] = 'Display LED pequeño, sin táctil';
v.cons_es[1] = 'Solo 36 memorias de usuario';
v = vd('HeadRush Flex Prime');
v.cons[1] = 'Requires 12V/3A dedicated supply';
v.cons_es[1] = 'Requiere fuente dedicada 12V/3A';
v = vd('Mooer GE300');
v.pros[0] = '108 amps + 164 FX, 5" display';
v.pros_es[0] = '108 amps + 164 FX, pantalla 5"';
console.log('verdicts fixed');
// ---- SECTIONS ----
const sec = i => o.sections[i];
sec(1).content = sec(1).content.replace('with up to six blocks chained', 'with up to eight blocks chained');
sec(1).content_es = sec(1).content_es.replace('con hasta seis bloques encadenados', 'con hasta ocho bloques encadenados');
// Flex section: built-in expression + wifi
sec(4).content = sec(4).content.replace('the built-in expression pedal, drum machine and long looper turn it into a practice station',
  'the built-in expression pedal, drum machine, generous looper and Wi-Fi preset downloads turn it into a practice station');
sec(4).content_es = sec(4).content_es.replace('el pedal de expresión, la caja de ritmos y el looper generoso lo convierten en una estación de práctica',
  'el pedal de expresión integrado, la caja de ritmos, el looper generoso y el Wi-Fi con presets en la nube lo convierten en una estación de práctica');
// ---- INTRO ----
o.intro = o.intro.replace('The HX Stomp is the professional-grade choice with 300+ amps, cabs, and effects.',
  'The HX Stomp is the compact pro choice with the full Helix engine.');
o.intro_es = o.intro_es.replace('El HX Stomp es la opción profesional con más de 300 amplificadores, cabs y efectos.',
  'El HX Stomp es la opción pro compacta con el motor Helix completo.');
// ---- FAQ (featuredSnippet 6 blocks -> 8) ----
const fq = (k, from, to) => {
  if (o.featuredSnippet[k] !== from) throw new Error('faq ' + k + ': ' + o.featuredSnippet[k]);
  o.featuredSnippet[k] = to;
};
fq('faq_a1_en', 'Yes, the Line 6 Helix HX Stomp delivers 300+ Helix amps, cabs, and effects with up to 6 simultaneous blocks and an integrated looper.',
  'Yes, the Line 6 Helix HX Stomp delivers 300+ Helix amps, cabs, and effects with up to 8 simultaneous blocks and an integrated looper.');
fq('faq_a1_es', 'Sí, el Line 6 Helix HX Stomp ofrece más de 300 amplificadores, cabs y efectos del Helix con hasta 6 bloques simultáneos y looper integrado.',
  'Sí, el Line 6 Helix HX Stomp ofrece más de 300 amplificadores, cabs y efectos del Helix con hasta 8 bloques simultáneos y looper integrado.');
G[G.findIndex(x => x.id === 'best-multi-effects-pedals')] = o;
fs.writeFileSync(DIR + 'data/guides.json', JSON.stringify(G, null, 2) + '\n');
console.log('guides.json written');
