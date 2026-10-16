const fs = require('fs');
const B = 'C:/Users/Daniel/projects/topmusiciangear/';
let bg = fs.readFileSync(B + 'build-guides.js', 'utf8');

// Remove the wrongly inserted entries (they're after a FAQ array closing, not in TEST_SHOP_BTN)
const wrongPattern = /\n  1001: \{prices:\{pluginboutique:"\\\$199\.00"\}\},\n  1002: \{prices:\{pluginboutique:"\\\$179\.00"\}\},\n  1003: \{prices:\{pluginboutique:"\\\$199\.00"\}\},\n  1004: \{prices:\{pluginboutique:"\\\$249\.00"\}\},\n  1005: \{prices:\{pluginboutique:"\\\$189\.00"\}\},\n  1006: \{prices:\{pluginboutique:"\\\$199\.00"\}\},\n  1007: \{prices:\{pluginboutique:"\\\$99\.00"\}\},\n  1008: \{prices:\{pluginboutique:"\\\$99\.00"\}\},\n  1009: \{prices:\{pluginboutique:"\\€130\.08"\}\},\n  1010: \{prices:\{pluginboutique:"\\\$89\.00"\}\},\n  1011: \{prices:\{pluginboutique:"\\\$99\.00"\}\},\n  1012: \{prices:\{pluginboutique:"\\\$149\.00"\}\},\n  1013: \{prices:\{pluginboutique:"\\\$399\.00"\}\},\n  1014: \{prices:\{pluginboutique:"\\\$299\.00"\}\},\n  1015: \{prices:\{pluginboutique:"\\\$699\.00"\}\},\n  1016: \{prices:\{pluginboutique:"\\\$99\.00"\}\},\n  1017: \{prices:\{pluginboutique:"\\€399\.00"\}\},\n  1018: \{prices:\{pluginboutique:"\\\$149\.00"\}\},\n  1019: \{prices:\{pluginboutique:"\\\$199\.99"\}\},\n  1020: \{prices:\{pluginboutique:"\\\$299\.00"\}\},\n  1021: \{prices:\{pluginboutique:"\\\$149\.00"\}\},\n  1022: \{prices:\{pluginboutique:"\\\$269\.00"\}\},\n  1023: \{prices:\{pluginboutique:"\\\$99\.00"\}\},\n  1024: \{prices:\{pluginboutique:"\\\$199\.00"\}\},\n  1025: \{prices:\{pluginboutique:"\\\$199\.00"\}\},\n  1026: \{prices:\{pluginboutique:"\\\$249\.00"\}\},\n  1027: \{prices:\{pluginboutique:"\\\$129\.00"\}\},\n  1028: \{prices:\{pluginboutique:"\\\$99\.00"\}\},\n  1029: \{prices:\{pluginboutique:"\\\$249\.00"\}\},\n  1030: \{prices:\{pluginboutique:"\\\$269\.00"\}\},\n  1031: \{prices:\{pluginboutique:"\\\$250\.00"\}\},\n  1032: \{prices:\{pluginboutique:"\\\$99\.00"\}\},\n  1033: \{prices:\{pluginboutique:"\\\$499\.00"\}\},\n  1034: \{prices:\{pluginboutique:"\\\$519\.00"\}\},\n  1035: \{prices:\{pluginboutique:"\\\$249\.00"\}\},\n  1036: \{prices:\{pluginboutique:"\\\$499\.00"\}\},/;

if (wrongPattern.test(bg)) {
  bg = bg.replace(wrongPattern, '\n');
  console.log('Removed wrongly inserted entries via regex');
} else {
  // Fallback: find and remove by line range
  const lines = bg.split('\n');
  const startIdx = lines.findIndex(l => l.includes('1001:') && l.includes('pluginboutique'));
  if (startIdx !== -1) {
    let endIdx = startIdx;
    while (endIdx < lines.length && lines[endIdx].includes('pluginboutique')) endIdx++;
    lines.splice(startIdx, endIdx - startIdx);
    bg = lines.join('\n');
    console.log('Removed via line splice: ' + (endIdx - startIdx) + ' lines');
  } else {
    console.log('ERROR: Could not find entries to remove');
  }
}

// Now insert into the real TEST_SHOP_BTN block
// Find the last entry in TEST_SHOP_BTN (the block ends with `};function hollyDefaultRegion()`)
const insertPoint = bg.indexOf('};function hollyDefaultRegion()');
if (insertPoint !== -1) {
  const entries = `\n  1001: {prices:{pluginboutique:"$199.00"}},\n  1002: {prices:{pluginboutique:"$179.00"}},\n  1003: {prices:{pluginboutique:"$199.00"}},\n  1004: {prices:{pluginboutique:"$249.00"}},\n  1005: {prices:{pluginboutique:"$189.00"}},\n  1006: {prices:{pluginboutique:"$199.00"}},\n  1007: {prices:{pluginboutique:"$99.00"}},\n  1008: {prices:{pluginboutique:"$99.00"}},\n  1009: {prices:{pluginboutique:"€130.08"}},\n  1010: {prices:{pluginboutique:"$89.00"}},\n  1011: {prices:{pluginboutique:"$99.00"}},\n  1012: {prices:{pluginboutique:"$149.00"}},\n  1013: {prices:{pluginboutique:"$399.00"}},\n  1014: {prices:{pluginboutique:"$299.00"}},\n  1015: {prices:{pluginboutique:"$699.00"}},\n  1016: {prices:{pluginboutique:"$99.00"}},\n  1017: {prices:{pluginboutique:"€399.00"}},\n  1018: {prices:{pluginboutique:"$149.00"}},\n  1019: {prices:{pluginboutique:"$199.99"}},\n  1020: {prices:{pluginboutique:"$299.00"}},\n  1021: {prices:{pluginboutique:"$149.00"}},\n  1022: {prices:{pluginboutique:"$269.00"}},\n  1023: {prices:{pluginboutique:"$99.00"}},\n  1024: {prices:{pluginboutique:"$199.00"}},\n  1025: {prices:{pluginboutique:"$199.00"}},\n  1026: {prices:{pluginboutique:"$249.00"}},\n  1027: {prices:{pluginboutique:"$129.00"}},\n  1028: {prices:{pluginboutique:"$99.00"}},\n  1029: {prices:{pluginboutique:"$249.00"}},\n  1030: {prices:{pluginboutique:"$269.00"}},\n  1031: {prices:{pluginboutique:"$250.00"}},\n  1032: {prices:{pluginboutique:"$99.00"}},\n  1033: {prices:{pluginboutique:"$499.00"}},\n  1034: {prices:{pluginboutique:"$519.00"}},\n  1035: {prices:{pluginboutique:"$249.00"}},\n  1036: {prices:{pluginboutique:"$499.00"}},`;
  bg = bg.substring(0, insertPoint) + entries + '\n' + bg.substring(insertPoint);
  console.log('Inserted 36 entries into real TEST_SHOP_BTN');
} else {
  console.log('ERROR: Could not find insertion point');
}

fs.writeFileSync(B + 'build-guides.js', bg, 'utf8');

// Verify syntax
try {
  new Function(bg);
  console.log('SYNTAX OK');
} catch(e) {
  console.log('SYNTAX ERROR: ' + e.message);
}
