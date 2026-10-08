const fs = require('fs');
const DIR = 'C:/Users/Daniel/projects/topmusiciangear/';
['guides/best-drum-machine.html', 'guides/compact-rhythm-devices.html', 'guides/best-samplers-drum-computers.html'].forEach(f => {
  const h = fs.readFileSync(DIR + f, 'utf8');
  const i = h.indexOf('guide-comp-table');
  const chunk = h.slice(i, i + 600);
  const ths = (chunk.match(/<th>/g) || []).length;
  console.log(f, '| th in first 600 chars:', ths, '|', chunk.slice(0, 200).replace(/\n/g, ' '));
});
// how does the drum guide store values?
const g = JSON.parse(fs.readFileSync(DIR + 'data/guides.json', 'utf8'));
const d = g.find(x => x.title && x.title.includes('Best Drum Machine'));
console.log('drum cols:', d.productTable.columns.length);
console.log('drum row0:', JSON.stringify(d.productTable.rows[0]).slice(0, 300));
