const fs = require('fs');
const DIR = 'C:/Users/Daniel/projects/topmusiciangear/';
const G = require(DIR + 'data/guides.json');
function cell(guideId, label, colTitle, en, es) {
  const g = G.find(x => x.id === guideId);
  const row = g.productTable.rows.find(r => r.label === label);
  const i = g.productTable.columns.findIndex(c => c.title === colTitle);
  if (!row || i === -1) { console.log('MISS ' + guideId + ' ' + label + ' ' + colTitle); process.exitCode = 1; return; }
  row.values[i].value = en; row.values[i].value_es = es;
  console.log('OK ' + guideId + ' ' + colTitle);
}
cell('best-monitors', 'Power', 'Neumann KH 80 DSP', '140W (90W + 50W)', '140W (90W + 50W)');
cell('usb-mics', 'Weight', 'Shure MV7', '550 g', '550 g');
fs.writeFileSync(DIR + 'data/guides.json', JSON.stringify(G, null, 2));
console.log('DONE exit=' + (process.exitCode || 0));