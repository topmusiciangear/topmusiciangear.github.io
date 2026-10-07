const fs = require('fs');
const DIR = 'C:/Users/Daniel/projects/topmusiciangear/';
const gFile = DIR + 'data/guides.json';
const G = JSON.parse(fs.readFileSync(gFile, 'utf8'));
const g = G.find(x => x.id === 'sidechain-modulation-plugins');
const t = g.comparison;
const trow = l => t.rows.find(rr => rr.label === l);
const V = (r, k, exp) => {
  if (r[k] !== exp) throw new Error(r.label + '.' + k + ' changed: ' + JSON.stringify(r[k]).slice(0, 60));
};
// ---- Price row ----
let r = trow('Estimated Price');
V(r, 'val1', '~$99');
r.val = '~$99'; r.val_es = '~$99';
r.val2 = '~$99'; r.val2_es = '~$99';
r.val3 = '~$12'; r.val3_es = '~$12';
r.val4 = '~$129'; r.val4_es = '~$129';
r.val5 = '~$129.99'; r.val5_es = '~$129.99';
delete r.val1; delete r.val1_es;
console.log('price fixed');
// ---- Type: RC-20 from orphan val1 ----
r = trow('Type');
V(r, 'val1', 'Vintage color chain');
r.val2 = r.val1; r.val2_es = r.val1_es;
delete r.val1; delete r.val1_es;
console.log('type fixed');
// ---- Modulation ----
r = trow('Modulation');
V(r, 'val3', 'Simple on/off');
V(r, 'val5', 'Envelope-following');
r.val2 = 'Flux Engine (random drift)';
r.val2_es = 'Flux Engine (deriva aleatoria)';
r.val3 = 'Fade in/out + Band Split';
r.val3_es = 'Fades + divisi\u00f3n por bandas';
r.val5 = 'Step LFOs + trigger sequencer';
r.val5_es = 'LFOs por pasos + secuenciador';
delete r.val1; delete r.val1_es;
console.log('modulation fixed');
// ---- Tracks: add RC-20 ----
r = trow('Tracks');
r.val2 = 'Per-instance';
r.val2_es = 'Por instancia';
console.log('tracks fixed');
// ---- Best For: RC-20 from orphan ----
r = trow('Best For');
V(r, 'val1', 'Lo-fi, vinyl, tape character');
r.val2 = r.val1; r.val2_es = r.val1_es;
delete r.val1; delete r.val1_es;
console.log('bestfor fixed');
// ---- New rows after Modulation ----
const mi = t.rows.findIndex(rr => rr.label === 'Modulation');
const mk = (label, label_es, vals) => {
  const o = { label, label_es };
  ['val', 'val2', 'val3', 'val4', 'val5'].forEach((k, i) => {
    o[k] = vals[i][0];
    o[k + '_es'] = vals[i][1];
  });
  return o;
};
t.rows.splice(mi + 1, 0,
  mk('Included Effects', 'Efectos incluidos', [
    ['9 Shapers + tools', '9 Shapers + herramientas'],
    ['6 modules', '6 m\u00f3dulos'],
    ['1 (half-speed effect)', '1 (efecto de media velocidad)'],
    ['28 modules', '28 m\u00f3dulos'],
    ['54 modules', '54 m\u00f3dulos']
  ]),
  mk('Multiband', 'Multibanda', [
    ['Yes (3-band per Shaper)', 'S\u00ed (3 bandas por Shaper)'],
    ['No', 'No'],
    ['Band Split focus only', 'Solo enfoque por bandas'],
    ['OTT module only', 'Solo m\u00f3dulo OTT'],
    ['\u2014', '\u2014']
  ])
);
console.log('rows added');
// ---- Sections: 28 -> 54 ----
const s2 = g.sections[2];
const rep1 = (txt, from, to) => {
  const c = txt.split(from).length - 1;
  if (c !== 1) throw new Error('found ' + c + 'x: ' + from.slice(0, 60));
  return txt.split(from).join(to);
};
s2.content = rep1(s2.content, 'with 28 effect modules and a powerful sequencer', 'with 54 effect modules and a powerful sequencer');
s2.content_es = rep1(s2.content_es, 'es un secuenciador de 28 efectos con un pad XY', 'es un secuenciador de 54 efectos con un pad XY');
// ---- Verdict ----
const v = g.verdictProsCons.find(x => /Infiltrator/.test(x.name));
v.pros = v.pros.map(x => x === '28 effect modules with a powerful step sequencer' ? '54 effect modules with a powerful step sequencer' : x);
v.pros_es = v.pros_es.map(x => x === '28 m\u00f3dulos de efectos con un potente secuenciador por pasos' ? '54 m\u00f3dulos de efectos con un potente secuenciador por pasos' : x);
if (!v.pros.some(x => x.startsWith('54 effect'))) throw new Error('verdict not fixed');
console.log('sections + verdict fixed');
fs.writeFileSync(gFile, JSON.stringify(G, null, 2) + '\n');
console.log('guides.json written');
