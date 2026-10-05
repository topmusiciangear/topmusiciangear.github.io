const fs = require('fs');
const DIR = 'C:/Users/Daniel/projects/topmusiciangear/';
const G = require(DIR + 'data/guides.json');
let ok = 0, miss = 0;
// [guide, name fragment, label fragment, newEn, newEs] — works on productTable AND comparison
const F = [
  ['hs8-vs-rokit-7', 'Rokit', 'Frequency', '45 Hz – 36 kHz (±3 dB)', '45 Hz – 36 kHz (±3 dB)'],
  ['hs8-vs-rokit-7', 'Rokit', 'Max SPL', '110 dB', '110 dB'],
  ['hs8-vs-rokit-7', 'Rokit', 'Power', '145W RMS (97W LF + 48W HF)', '145W RMS (97W LF + 48W HF)'],
  ['hs8-vs-rokit-7', 'HS8', 'Max SPL', 'Not published', 'No publicado'],
  ['m50x-vs-mdr7506', '7506', 'Cable', 'Fixed coiled cable (3 m extended)', 'Cable fijo en espiral (3 m extendido)'],
  ['k371-vs-mdr7506', '7506', 'Cable', 'Fixed coiled cable (3 m extended)', 'Cable fijo en espiral (3 m extendido)'],
  ['xr18-vs-m32r', 'M32R', 'Weight', '31.5 lbs (14.3 kg)', '31,5 lb (14,3 kg)'],
  ['pro-mixers', 'M32R', 'Weight', '31.5 lbs (14.3 kg)', '31,5 lb (14,3 kg)'],
  ['xr18-vs-m32r', 'M32R', 'Year', '2016', '2016'],
  ['xr18-vs-cq18t', 'XR18', 'Wi-Fi', 'Built-in Tri-Mode Wi-Fi (2.4 GHz)', 'Wi-Fi trimodo integrado (2,4 GHz)'],
  ['pro-basses', 'Ultra II Precision', 'Electronics', 'Active/passive switchable (S-1), 3-band active EQ', 'Conmutable activo/pasivo (S-1), EQ activo de 3 bandas']
];
for (const [gid, nameFrag, labelFrag, en, es] of F) {
  const g = G.find(x => x.id === gid);
  let done = false;
  const tryRows = (rows, getVals, setVals, names) => {
    rows.forEach(r => {
      const lbl = r.label || r.label_en || '';
      if (!lbl.toLowerCase().includes(labelFrag.toLowerCase())) return;
      names.forEach((nm, i) => {
        if (nm && nm.toLowerCase().includes(nameFrag.toLowerCase())) {
          const v = getVals(r, i);
          if (v) { setVals(r, i, en, es); done = true; }
        }
      });
    });
  };
  if (g.productTable) tryRows(g.productTable.rows,
    (r, i) => r.values[i],
    (r, i, a, b) => { r.values[i].value = a; r.values[i].value_es = b; },
    g.productTable.columns.map(c => c.title));
  if (g.comparison && g.featuredSnippet) {
    const names = [g.featuredSnippet.name1_en, g.featuredSnippet.name2_en];
    tryRows(g.comparison.rows,
      (r, i) => ({ v: i === 0 ? r.val1 : r.val2 }),
      (r, i, a, b) => { if (i === 0) { r.val1 = a; r.val1_es = b; } else { r.val2 = a; r.val2_es = b; } },
      names);
  }
  console.log((done ? 'OK ' : 'MISS ') + gid + ' ' + nameFrag + ' ' + labelFrag);
  if (!done) miss++; else ok++;
}
fs.writeFileSync(DIR + 'data/guides.json', JSON.stringify(G, null, 2));
console.log('DONE ok=' + ok + ' miss=' + miss);