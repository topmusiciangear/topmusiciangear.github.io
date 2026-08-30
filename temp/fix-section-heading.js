var fs = require('fs');
var g = require('../data/guides.json');
var i = g.findIndex(x => x.id === 'budget-usb-mics');
var guide = g[i];

// Update section [10] heading to reference HyperX SoloCast
guide.sections[10].heading = "Is the HyperX SoloCast a Good Compact USB Mic?";
guide.sections[10].heading_es = "¿Es el HyperX SoloCast un buen micrófono USB compacto?";

// Update the content to reference SoloCast instead of XCM-50
guide.sections[10].content = guide.sections[10].content
  .replace(/XCM-50/g, 'SoloCast')
  .replace(/Rode's answer to a compact premium condenser/g, "HyperX's answer to a compact budget condenser")
  .replace(/the XCM-50 is/g, 'the SoloCast is')
  .replace(/the XCM-50 is the compact pick/g, 'the SoloCast is the compact pick');

// Also update ES content if it exists
if (guide.sections[10].content_es) {
  guide.sections[10].content_es = guide.sections[10].content_es
    .replace(/XCM-50/g, 'SoloCast');
}

console.log('Updated section [10] heading:', guide.sections[10].heading);

fs.writeFileSync('./data/guides.json', JSON.stringify(g, null, 2));
console.log('guides.json updated');
