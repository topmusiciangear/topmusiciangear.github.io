var fs = require('fs');
var g = require('../data/guides.json');
var i = g.findIndex(x => x.id === 'budget-usb-mics');
var guide = g[i];

// Update conclusion to reference SoloCast instead of XCM-50
if (guide.conclusion) {
  guide.conclusion = guide.conclusion
    .replace(/the compact Rode XCM-50 as an elegant alternative/g, 'the compact HyperX SoloCast as an elegant alternative')
    .replace(/Rode XCM-50/g, 'HyperX SoloCast');
}

// Also update conclusion_es if it exists
if (guide.conclusion_es) {
  guide.conclusion_es = guide.conclusion_es
    .replace(/Rode XCM-50/g, 'HyperX SoloCast');
}

console.log('Updated conclusion (first 200 chars):', guide.conclusion.substring(0, 200));

fs.writeFileSync('./data/guides.json', JSON.stringify(g, null, 2));
console.log('guides.json updated');
