const fs = require('fs');
const DIR = 'C:/Users/Daniel/projects/topmusiciangear/';
const gFile = DIR + 'data/guides.json';
const G = JSON.parse(fs.readFileSync(gFile, 'utf8'));
const rep1 = (txt, from, to) => {
  const c = txt.split(from).length - 1;
  if (c !== 1) throw new Error('found ' + c + 'x: ' + from.slice(0, 60));
  return txt.split(from).join(to);
};
const gw = G.find(x => x.id === 'best-wireless-iems');

// ---------- TABLE best-wireless-iems ----------
const t = gw.productTable;
const lat = t.rows.find(r => r.label === 'Latency');
[0, 1, 2, 5, 6].forEach(i => {
  if (lat.values[i].value !== (i === 5 ? '~6 ms' : '<5 ms')) throw new Error('lat EN changed @' + i);
  lat.values[i].value = '0 ms (analog)';
  lat.values[i].value_es = '0 ms (anal\u00f3gico)';
});
console.log('table latency fixed');
const rng = t.rows.find(r => r.label === 'Range');
if (rng.values[0].value_es !== '90 m' || rng.values[2].value_es !== '90 m' || rng.values[5].value_es !== '49 m') throw new Error('range ES changed');
rng.values[0].value_es = '100 m';
rng.values[2].value_es = '100 m';
rng.values[5].value_es = '50 m';
console.log('table range ES fixed');
const pow = t.rows.find(r => r.label === 'Power');
[3, 4].forEach(i => {
  if (pow.values[i].value !== 'USB-C rechargeable') throw new Error('power EN changed @' + i);
  pow.values[i].value = 'Micro-USB rechargeable';
  pow.values[i].value_es = 'Recargable Micro-USB';
});
console.log('table power fixed');

// ---------- VERDICTS best-wireless-iems ----------
const V = n => {
  const v = gw.verdictProsCons.find(x => x.name === n);
  if (!v) throw new Error('verdict missing: ' + n);
  return v;
};
let v = V('Shure PSM 300 Twin Pack Pro');
v.cons = v.cons.map(x => x === 'Transmitter housing is plastic rather than metal' ? 'Both Twin Pro packs share a single stereo mix \u2014 independent mixes need a second transmitter' : x);
v.cons_es = v.cons_es.map(x => x === 'El transmisor es pl\u00e1stico en vez de met\u00e1lico' ? 'Ambos packs del Twin Pro comparten una sola mezcla est\u00e9reo \u2014 para mezclas independientes hace falta un segundo transmisor' : x);
if (!v.cons.some(x => x.includes('single stereo mix'))) throw new Error('PSM con not replaced');
v = V('Xvive U4');
v.pros = v.pros.map(x => x === 'USB-C rechargeable batteries eliminate disposable cells' ? 'Micro-USB rechargeable batteries (Y-cable included) eliminate disposable cells' : x);
v.pros_es = v.pros_es.map(x => x === 'Bater\u00edas recargables USB-C eliminan las pilas desechables' ? 'Bater\u00edas recargables Micro-USB (cable en Y incluido) eliminan las pilas desechables' : x);
if (!v.pros.some(x => x.includes('Micro-USB'))) throw new Error('U4 pro not replaced');
v = V('Xvive U4R4');
v.pros = v.pros.map(x => x === 'USB-C charging across every unit eliminates disposable batteries' ? 'Micro-USB charging across every unit (Y-cable included) eliminates disposable batteries' : x);
v.pros_es = v.pros_es.map(x => x === 'Carga USB-C en cada unidad elimina las pilas desechables' ? 'Carga Micro-USB en cada unidad (cable en Y incluido) elimina las pilas desechables' : x);
if (!v.pros.some(x => x.includes('Micro-USB'))) throw new Error('U4R4 pro not replaced');
v = V('Phenyx Pro PTM-10');
v.cons = v.cons.map(x => x === '~6 ms latency trails the sub-5 ms competition' ? '60 Hz\u201316 kHz response rolls off deep sub-bass' : x);
v.cons_es = v.cons_es.map(x => x === 'La latencia de ~6 ms va detr\u00e1s de la competencia de menos de 5 ms' ? 'La respuesta de 60 Hz\u201316 kHz recorta los subgraves profundos' : x);
if (!v.cons.some(x => x.includes('60 Hz'))) throw new Error('PTM con not replaced');
v = V('Sennheiser XSW IEM');
v.cons = v.cons.map(x => x === "Official 164 ft range trails the EW IEM G4's 330 ft" ? "Official 164 ft range trails the EW IEM G4's 300 ft" : x);
v.cons = v.cons.map(x => x === 'No Dante or network audio input onboard' ? '45 Hz\u201315 kHz response is narrower than higher Sennheiser tiers' : x);
v.cons_es = v.cons_es.map(x => x === 'Sin entrada de audio en red ni Dante' ? 'La respuesta de 45 Hz\u201315 kHz es m\u00e1s estrecha que en gamas superiores de Sennheiser' : x);
if (!v.cons.some(x => x.includes('300 ft')) || !v.cons.some(x => x.includes('45 Hz'))) throw new Error('XSW cons not replaced');
console.log('verdicts fixed');

// ---------- FAQ A3 + CONCLUSION ----------
const f = gw.featuredSnippet;
f.faq_a3_en = rep1(f.faq_a3_en, 'Every system in this guide sits at or under 5 ms.',
  'The analog UHF systems in this guide (Sennheiser, Shure, Phenyx) run at effectively 0 ms of latency \u2014 radio waves in real time. The digital 2.4 GHz systems (Xvive) convert the signal but stay safely under 5 ms, which still feels instant.');
f.faq_a3_es = rep1(f.faq_a3_es, 'Cada sistema de esta gu\u00eda est\u00e1 en 5 ms o menos.',
  'Los sistemas anal\u00f3gicos UHF de esta gu\u00eda (Sennheiser, Shure, Phenyx) trabajan a 0 ms efectivos \u2014 ondas de radio en tiempo real. Los digitales de 2,4 GHz (Xvive) convierten la se\u00f1al pero se mantienen por debajo de 5 ms, que tambi\u00e9n se siente instant\u00e1neo.');
gw.conclusion = rep1(gw.conclusion, 'the Shure PSM 300 twin pack.',
  'the Shure PSM 300 twin pack (both packs share one mix \u2014 separate mixes need a second transmitter).');
gw.conclusion_es = rep1(gw.conclusion_es, 'el Shure PSM 300 twin pack.',
  'el Shure PSM 300 twin pack (ambos receptores comparten una mezcla \u2014 para mezclas independientes hace falta un segundo transmisor).');
console.log('FAQ + conclusion fixed');

// ---------- SECTIONS sec0 + sec5 ----------
const s0 = gw.sections[0], s5 = gw.sections[5];
s0.content = rep1(s0.content, 'Latency under 5 ms feels instant; anything over 10 ms starts to pull singers off tempo.',
  'Digital systems under 5 ms feel instant; the analog UHF systems here (Sennheiser, Shure, Phenyx) run at effectively 0 ms \u2014 radio waves in real time.');
s0.content_es = rep1(s0.content_es, 'Una latencia menor a 5 ms se siente instant\u00e1nea; m\u00e1s de 10 ms empieza a descolocar a los cantantes.',
  'En sistemas digitales, menos de 5 ms se siente instant\u00e1neo; los sistemas UHF anal\u00f3gicos de esta gu\u00eda (Sennheiser, Shure, Phenyx) trabajan a 0 ms efectivos \u2014 ondas de radio en tiempo real.');
s5.content = rep1(s5.content, 'charges over USB like phones', 'charges over Micro-USB with the included Y-cable');
s5.content_es = rep1(s5.content_es, 'cargan por USB como tel\u00e9fonos', 'se recargan por Micro-USB con el cable en Y incluido');
console.log('sections fixed');

// ---------- best-in-ear-monitors: same false cells ----------
const gm = G.find(x => x.id === 'best-in-ear-monitors');
const tm = gm.productTable;
const mlat = tm.rows.find(r => r.label === 'Latency');
[1, 3].forEach(i => {
  if (mlat.values[i].value !== '<5 ms') throw new Error('monitors lat changed @' + i);
  mlat.values[i].value = '0 ms (analog)';
  mlat.values[i].value_es = '0 ms (anal\u00f3gico)';
});
const mpow = tm.rows.find(r => r.label === 'Power');
if (mpow.values[2].value !== 'USB-C rechargeable') throw new Error('monitors power changed');
mpow.values[2].value = 'Micro-USB rechargeable';
mpow.values[2].value_es = 'Recargable Micro-USB';
console.log('monitors table fixed');
fs.writeFileSync(gFile, JSON.stringify(G, null, 2) + '\n');
console.log('guides.json written');
