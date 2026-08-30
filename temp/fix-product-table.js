var fs = require('fs');
var g = require('../data/guides.json');
var i = g.findIndex(x => x.id === 'budget-usb-mics');
var guide = g[i];

// Replace Rode XCM-50 Compact with HyperX SoloCast in productTable columns
guide.productTable.columns[11] = {
  title: "HyperX SoloCast",
  title_es: "HyperX SoloCast"
};

// Also update the rows that reference XCM-50
if (guide.productTable.rows) {
  guide.productTable.rows.forEach(row => {
    if (row.cells && row.cells[11]) {
      // Keep the same values, just update the header reference
    }
  });
}

console.log('Updated productTable columns:');
guide.productTable.columns.forEach((c, j) => console.log('[' + j + ']', c.title));

fs.writeFileSync('./data/guides.json', JSON.stringify(g, null, 2));
console.log('guides.json updated');
