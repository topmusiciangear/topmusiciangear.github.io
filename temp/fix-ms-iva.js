var fs = require('fs');
var src = fs.readFileSync('build-guides.js','utf8');

// Find the TEST_SHOP_BTN block
var i = src.indexOf('const TEST_SHOP_BTN');
var rest = src.substring(i);
var lines = rest.split('\n');
var endIdx = 0;
for (var k = 1; k < lines.length; k++) {
  if (lines[k].trim() === '}' || lines[k].trim().startsWith('}\n')) {
    endIdx = k;
    break;
  }
}

// Process each line: find musicstore prices and divide by 1.19
var fixed = 0;
var details = [];
for (var k = 0; k < endIdx; k++) {
  var line = lines[k];
  var idMatch = line.match(/(\d+):\s*\{/);
  if (!idMatch) continue;
  var id = idMatch[1];
  
  // Find musicstore price
  var msMatch = line.match(/musicstore:"(€?)([\d,.]+)"/);
  if (!msMatch) continue;
  
  var currency = msMatch[1];
  var priceStr = msMatch[2];
  var price = parseFloat(priceStr.replace(/,/g, ''));
  
  if (isNaN(price) || price <= 0) continue;
  
  // Only fix EUR prices (skip $ prices - those are separate bugs)
  if (currency !== '€') {
    details.push('SKIP id=' + id + ' currency=' + currency + ' price=' + priceStr);
    continue;
  }
  
  // Divide by 1.19 to remove IVA
  var newPrice = price / 1.19;
  
  // Format: round to 2 decimals, use comma for thousands
  var newPriceStr;
  if (newPrice >= 1000) {
    newPriceStr = '€' + newPrice.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  } else {
    newPriceStr = '€' + newPrice.toFixed(2);
  }
  
  // Replace in line
  var oldStr = 'musicstore:"' + currency + priceStr + '"';
  var newStr = 'musicstore:"' + newPriceStr + '"';
  lines[k] = line.replace(oldStr, newStr);
  
  if (Math.abs(price - newPrice) > 0.5) {
    details.push('FIX id=' + id + ': ' + currency + priceStr + ' -> ' + newPriceStr);
    fixed++;
  }
}

// Reconstruct the file
var newBlock = lines.slice(0, endIdx + 1).join('\n');
var newSrc = src.substring(0, i) + newBlock + src.substring(i + rest.indexOf('\n}\n') + 3);

fs.writeFileSync('build-guides.js', newSrc);
console.log('Fixed ' + fixed + ' prices');
console.log('\nDetails:');
details.forEach(function(d) { console.log(d); });
