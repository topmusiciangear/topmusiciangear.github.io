const fs = require('fs');
const DIR = 'C:/Users/Daniel/projects/topmusiciangear/';
const G = JSON.parse(fs.readFileSync(DIR + 'data/guides.json', 'utf8'));
const g = G.find(v => v.id === 'best-reverb-delay');
// Del-Verb is column idx 9 (0-based): DD-8, HoF2, BigSky, TL, LVX, Habit, TF, Nemesis, Caverns, Del-Verb, ...
const row = g.productTable.rows.find(r => r.label === 'Estimated Price');
console.log('col9 title: ' + g.productTable.columns[9].title);
console.log('col9 price: ' + row.values[9].value);
if (row.values[9].value !== '$349.00') throw new Error('unexpected');
row.values[9].value = '$399.00'; row.values[9].value_es = '$399.00';
fs.writeFileSync(DIR + 'data/guides.json', JSON.stringify(G, null, 2) + '\n');
console.log('Del-Verb table price -> $399.00');
