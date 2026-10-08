const fs = require('fs');
const DIR = 'C:/Users/Daniel/projects/topmusiciangear/';
const h = fs.readFileSync(DIR + 'guides/best-samplers-drum-computers.html', 'utf8');
// how many comp tables?
const tables = (h.match(/guide-comp-table/g) || []).length;
console.log('guide-comp-table occurrences:', tables);
// is productTable data embedded?
console.log('has productTable JSON:', h.includes('productTable'));
// filler script?
const i = h.indexOf('guide-comp-table');
console.log(h.slice(Math.max(0, i - 300), i + 100).replace(/\n/g, ' ').slice(0, 400));
