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

// No additional zzounds fixes needed

for (let i = 0; i < lines.length; i++) {
  const line = lines[i];
  const idMatch = line.match(/^\s+(\d+):\s*(\{.*)$/);
  if (!idMatch) continue;
  const id = parseInt(idMatch[1]);
  
  let modified = line;
  let changed = false;
  
  // Apply zzounds fix
  const zzFix = zzoundsFixes.find(f => f.id === id);
  if (zzFix) {
    // Remove zzounds from oos
    const oosMatch = modified.match(/oos:\[([^\]]*)\]/);
    if (oosMatch && oosMatch[1].includes('zzounds')) {
      let oos = oosMatch[1].replace(/['"]zzounds['"],?\s*/, '').replace(/,\s*$/, '').trim();
      if (oos) {
        modified = modified.replace(/oos:\[[^\]]*\]/, `oos:[${oos}]`);
      } else {
        modified = modified.replace(/,?\s*oos:\[[^\]]*\]/, '');
      }
    }
    // Add zzounds price
    const pricesMatch = modified.match(/prices:\{([^}]*)\}/);
    if (pricesMatch) {
      let prices = pricesMatch[1];
      if (prices.trim()) {
        prices += `,zzounds:"${zzFix.price}"`;
      } else {
        prices = `zzounds:"${zzFix.price}"`;
      }
      modified = modified.replace(/prices:\{[^}]*\}/, `prices:{${prices}}`);
    }
    changed = true;
  }
  
  // Apply andertons fix
  const andFix = andertonsFixes.find(f => f.id === id);
  if (andFix) {
    // Remove andertons from oos
    const oosMatch = modified.match(/oos:\[([^\]]*)\]/);
    if (oosMatch && oosMatch[1].includes('andertons')) {
      let oos = oosMatch[1].replace(/['"]andertons['"],?\s*/, '').replace(/,\s*$/, '').trim();
      if (oos) {
        modified = modified.replace(/oos:\[[^\]]*\]/, `oos:[${oos}]`);
      } else {
        modified = modified.replace(/,?\s*oos:\[[^\]]*\]/, '');
      }
    }
    // Add andertons price
    const pricesMatch = modified.match(/prices:\{([^}]*)\}/);
    if (pricesMatch) {
      let prices = pricesMatch[1];
      if (prices.trim()) {
        prices += `,${andFix.store}:"${andFix.price}"`;
      } else {
        prices = `${andFix.store}:"${andFix.price}"`;
      }
      modified = modified.replace(/prices:\{[^}]*\}/, `prices:{${prices}}`);
    }
    changed = true;
  }
  
  if (changed) {
    lines[i] = modified;
    changes++;
  }
}

content = lines.join('\n');
content = content.replace(/,,+/g, ',').replace(/,\s*\}/g, '}');
fs.writeFileSync(file, content, 'utf8');
console.log(`Applied ${changes} fixes`);

// Verify
const verify = fs.readFileSync(file, 'utf8');
const tbMatch = verify.match(/const TEST_SHOP_BTN\s*=\s*(\{[\s\S]*?\n\});/);
const tb = eval('(' + tbMatch[1] + ')');
const stores = ['zzounds','reverb','amazon','musicstore','pluginboutique','gear4music','andertons'];
stores.forEach(s => {
  const oos = Object.keys(tb).filter(k => tb[k].oos && tb[k].oos.includes(s));
  console.log(`${s}: OOS=${oos.length}`);
});
