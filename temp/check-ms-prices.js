var fs = require('fs');
var src = fs.readFileSync('build-guides.js','utf8');
var block = src.substring(src.indexOf('const TEST_SHOP_BTN'), src.indexOf('\n}\n', src.indexOf('const TEST_SHOP_BTN')) + 3);
var lines = block.split('\n');
var results = [];
for (var i = 0; i < lines.length; i++) {
  var line = lines[i];
  var idM = line.match(/^\s*(\d+):\s*\{/);
  if (!idM) continue;
  var id = idM[1];
  var msM = line.match(/musicstore:"([^"]+)"/);
  if (msM) {
    results.push({ id: id, price: msM[1] });
  }
}
// Known correct prices (verified by user): NT1=199, SSL2+=295, Rokit7=266
// Known correct rule: international price x 1.19 = price with IVA
// Flag suspicious prices where musicstore is drastically different from other stores
var allLines = block.split('\n');
for (var i = 0; i < allLines.length; i++) {
  var line = allLines[i];
  var idM = line.match(/^\s*(\d+):\s*\{/);
  if (!idM) continue;
  var id = idM[1];
  var msM = line.match(/musicstore:"([^"]+)"/);
  if (!msM) continue;
  var msPrice = parseFloat(msM[1].replace(/[€$,]/g,''));
  // Get amazon price for comparison
  var amM = line.match(/amazon:"([^"]+)"/);
  var zzM = line.match(/zzounds:"([^"]+)"/);
  var g4M = line.match(/gear4music:"([^"]+)"/);
  var anM = line.match(/andertons:"([^"]+)"/);
  var refs = [];
  if (amM) refs.push({ store: 'amazon', price: parseFloat(amM[1].replace(/[$,]/g,'')), currency: '$' });
  if (zzM) refs.push({ store: 'zzounds', price: parseFloat(zzM[1].replace(/[$,]/g,'')), currency: '$' });
  if (g4M) refs.push({ store: 'gear4music', price: parseFloat(g4M[1].replace(/[£,]/g,'')), currency: '£' });
  if (anM) refs.push({ store: 'andertons', price: parseFloat(anM[1].replace(/[£,]/g,'')), currency: '£' });
  
  // Rough USD equivalent of musicstore price (€)
  var msUSD = msPrice * 1.08; // rough EUR->USD
  // Check if musicstore price is suspiciously low compared to others
  for (var j = 0; j < refs.length; j++) {
    var r = refs[j];
    var refUSD = r.currency === '$' ? r.price : r.price * 1.27; // rough GBP->USD
    if (refUSD > 50 && msUSD < refUSD * 0.5) {
      console.log('SUSPECT id=' + id + ' musicstore=' + msM[1] + ' vs ' + r.store + '=' + r.price + r.currency + ' (MS ~$' + Math.round(msUSD) + ' vs ~$' + Math.round(refUSD) + ')');
    }
  }
}
console.log('\nAll Music Store prices:');
results.forEach(function(r) { console.log('  id=' + r.id + ': ' + r.price); });
console.log('Total: ' + results.length);
