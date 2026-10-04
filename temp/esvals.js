const fs = require('fs');
const F = 'C:/Users/Daniel/projects/topmusiciangear/data/guides.json';
const G = require(F);
const PAIRS = [
  ['Digital UHF', 'UHF digital'],
  ['N/A (software mixer)', 'N/D (mezclador por software)'],
  ['2-way bi-amp, bass-reflex', '2 vías biamplificado, bass-reflex'],
  ['2-way, rear-port', '2 vías, puerto trasero'],
  ['2-way, front-port', '2 vías, puerto delantero'],
  ['105 dB @1m (115 dB pair)', '105 dB a 1 m (115 dB el par)'],
  ['-6/-12/-18 dB pads + bass cut', 'Pads -6/-12/-18 dB + corte de graves'],
  ['Smartgain, SmartClick, bus power', 'Smartgain, SmartClick, alimentación por bus'],
  ['USB, MIDI, Audio Out', 'USB, MIDI, salida de audio'],
  ['2x TRS monitor + 1x HP', '2x TRS de monitor + 1x de auriculares'],
  ['2x monitor TRS + 2x line out + 1x HP', '2x TRS de monitor + 2x salidas de línea + 1x de auriculares'],
  ['2x combo XLR/TRS mic/line/inst + Legacy 4K', '2x combos XLR/TRS micro/línea/inst + Legacy 4K'],
  ['2x combo XLR/TRS (Vintage pre ch 1)', '2x combos XLR/TRS (previo Vintage canal 1)']
];
let n = 0;
function fixEs(obj) {
  if (!obj || typeof obj !== 'object') return;
  if (Array.isArray(obj)) { obj.forEach(fixEs); return; }
  Object.keys(obj).forEach(k => {
    const v = obj[k];
    if (typeof v === 'string') {
      if (/_es$/.test(k)) {
        PAIRS.forEach(([en, es]) => {
          if (v.includes(en)) { obj[k] = v.split(en).join(es); n++; }
        });
      }
    } else fixEs(v);
  });
}
G.forEach(g => fixEs(g));
fs.writeFileSync(F, JSON.stringify(G, null, 2));
console.log('valores ES traducidos (ocurrencias):', n);