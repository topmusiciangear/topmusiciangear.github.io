const fs = require('fs');
const g = require('C:/Users/Daniel/projects/topmusiciangear/data/guides.json');
const d = g.find(x => x.title === 'Best Grooveboxes & Compact Drum Machines');
const c = Object.assign({}, d);
c.sections = d.sections.map(s => ({ heading: s.heading, keys: Object.keys(s) }));
c.productTable = { title: d.productTable.title, ncols: d.productTable.columns.length, nrows: d.productTable.rows.length, rowlabels: d.productTable.rows.map(r => r.label) };
fs.writeFileSync('C:/Users/Daniel/projects/topmusiciangear/temp/groove_dump.json', JSON.stringify(c, null, 1));
console.log('dumped');
