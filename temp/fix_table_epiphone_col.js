const fs = require('fs');
const B = 'C:/Users/Daniel/projects/topmusiciangear/';
const p = B + 'data/guides.json';
const g = JSON.parse(fs.readFileSync(p, 'utf8'));
const guide = g.find(x => x.id === 'best-beginner-electric-guitar');

// Add Epiphone column at position 3 (between Squier Sonic Stratocaster HT and Jet Guitars JS-300)
const epiphoneColumn = {
  title: 'Epiphone Les Paul Special-II E1',
  title_es: 'Epiphone Les Paul Special-II E1'
};

guide.productTable.columns.splice(3, 0, epiphoneColumn);

// Verify
console.log('Columns after insert:', guide.productTable.columns.length);
guide.productTable.columns.forEach((c, i) => console.log('  Col ' + i + ': ' + c.title));

fs.writeFileSync(p, JSON.stringify(g, null, 2), 'utf8');
console.log('data/guides.json actualizado');
