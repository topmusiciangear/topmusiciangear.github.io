const fs = require('fs');
const DIR = 'C:/Users/Daniel/projects/topmusiciangear/';
const gFile = DIR + 'data/guides.json';
const G = JSON.parse(fs.readFileSync(gFile, 'utf8'));
const g = G.find(x => x.id === 'best-drum-machine');
const t = g.productTable;
const ci = {};
t.columns.forEach((c, i) => { ci[c.title] = i; });
const wrow = t.rows.find(r => r.label === 'Weight');
const setW = (col, en, es) => {
  const i = ci[col];
  if (wrow.values[i].value === en) { console.log(col + ' weight already ' + en); return; }
  wrow.values[i].value = en;
  wrow.values[i].value_es = es;
  console.log(col + ' weight -> ' + en);
};
setW('Arturia DrumBrute Impact', '1.84 kg', '1,84 kg');
setW('Behringer RD-8', '3.0 kg', '3 kg');
setW('Elektron Analog Rytm MKII', '2.4 kg', '2,4 kg');
setW('Polyend Tracker', '1.2 kg', '1,2 kg');
const prow = t.rows.find(r => r.label === 'Estimated Price');
const ti = ci['Roland TR-6S'];
if (prow.values[ti].value !== '~$469.99') throw new Error('TR-6S price changed: ' + prow.values[ti].value);
prow.values[ti].value = '~$453.99';
prow.values[ti].value_es = '~$453.99';
console.log('TR-6S price -> ~$453.99');
fs.writeFileSync(gFile, JSON.stringify(G, null, 2) + '\n');
console.log('guides.json written');
