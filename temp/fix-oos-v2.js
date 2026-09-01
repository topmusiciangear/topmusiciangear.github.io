const fs = require('fs');
const path = require('path');
const file = path.join(__dirname, '..', 'build-guides.js');
let content = fs.readFileSync(file, 'utf8');
const lines = content.split('\n');
let changes = 0;

// Only CORRECT zzounds fixes (verified product name matches)
const zzoundsFixes = [
  {id:22, price:'$339.14'},
  {id:68, price:'$229.99'},
  {id:100, price:'$101.60'},
  {id:102, price:'$89.00'},
  {id:116, price:'$599.99'},
  {id:119, price:'$549.00'},
  {id:148, price:'$159.00'},
  {id:150, price:'$99.95'},
  {id:154, price:'$199.99'},
  {id:157, price:'$109.00'},
  {id:158, price:'$369.99'},
  {id:166, price:'$699.00'},
  {id:209, price:'$159.99'},
  {id:215, price:'$224.99'},
  {id:216, price:'$299.99'},
  {id:271, price:'$849.00'},
  {id:330, price:'$169.00'},
  {id:338, price:'$2,099.99'},
  {id:354, price:'$439.00'},
  {id:355, price:'$190.00'},
];

// Only CORRECT andertons/musicstore fixes (verified product name matches)
const andertonsFixes = [
  {id:62, store:'andertons', price:'£119.00'},
  {id:63, store:'andertons', price:'£139.00'},
  {id:112, store:'andertons', price:'£85.00'},
  {id:120, store:'andertons', price:'£535.00'},
  {id:122, store:'andertons', price:'£1,299.00'},
  {id:125, store:'andertons', price:'£799.00'},
  {id:203, store:'andertons', price:'£219.00'},
  {id:224, store:'andertons', price:'£1,675.00'},
];

const allFixes = [...zzoundsFixes.map(f => ({...f, store:'zzounds'})), ...andertonsFixes];

for (let i = 0; i < lines.length; i++) {
  const line = lines[i];
  const idMatch = line.match(/^\s+(\d+):\s*\{/);
  if (!idMatch) continue;
  const id = parseInt(idMatch[1]);
  
  const fix = allFixes.find(f => f.id === id);
  if (!fix) continue;
  
  let modified = line;
  
  // Remove store from oos
  const oosRegex = /oos:\[([^\]]*)\]/;
  const oosMatch = modified.match(oosRegex);
  if (oosMatch && oosMatch[1].includes(fix.store)) {
    let oosContent = oosMatch[1];
    // Remove the store from oos array
    oosContent = oosContent.replace(new RegExp("['\"]" + fix.store + "['\"],?\\s*"), '');
    oosContent = oosContent.replace(/,\s*$/, '').trim();
    if (oosContent) {
      modified = modified.replace(oosRegex, 'oos:[' + oosContent + ']');
    } else {
      modified = modified.replace(/,?\s*oos:\[[^\]]*\]/, '');
    }
  }
  
  // Add price to prices object
  const pricesRegex = /prices:\{([^}]*)\}/;
  const pricesMatch = modified.match(pricesRegex);
  if (pricesMatch) {
    let prices = pricesMatch[1];
    if (prices.trim()) {
      prices += ',' + fix.store + ':"' + fix.price + '"';
    } else {
      prices = fix.store + ':"' + fix.price + '"';
    }
    modified = modified.replace(pricesRegex, 'prices:{' + prices + '}');
  }
  
  lines[i] = modified;
  changes++;
}

content = lines.join('\n');
content = content.replace(/,,+/g, ',');
content = content.replace(/,\s*\}/g, '}');
fs.writeFileSync(file, content, 'utf8');
console.log('Applied ' + changes + ' fixes');

// Verify
const verify = fs.readFileSync(file, 'utf8');
const tbMatch = verify.match(/const TEST_SHOP_BTN\s*=\s*(\{[\s\S]*?\n\});/);
const tb = eval('(' + tbMatch[1] + ')');
['zzounds','reverb','amazon','musicstore','pluginboutique','gear4music','andertons'].forEach(function(s) {
  var oos = Object.keys(tb).filter(function(k) { return tb[k].oos && tb[k].oos.includes(s); });
  console.log(s + ': OOS=' + oos.length);
});
