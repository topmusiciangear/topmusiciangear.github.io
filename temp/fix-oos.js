const fs = require('fs');
const path = require('path');

const file = path.join(__dirname, '..', 'build-guides.js');
let content = fs.readFileSync(file, 'utf8');

// All fixes: {id, store, action: 'remove_oos'|'add_price', price}
const fixes = [
  // === ZZOUNDS false OOS (21 items) ===
  {id:22, store:'zzounds', action:'remove_oos_add_price', price:'$339.14'},
  {id:68, store:'zzounds', action:'remove_oos_add_price', price:'$229.99'},
  {id:100, store:'zzounds', action:'remove_oos_add_price', price:'$101.60'},
  {id:102, store:'zzounds', action:'remove_oos_add_price', price:'$89.00'},
  {id:116, store:'zzounds', action:'remove_oos_add_price', price:'$599.99'},
  {id:119, store:'zzounds', action:'remove_oos_add_price', price:'$549.00'},
  {id:148, store:'zzounds', action:'remove_oos_add_price', price:'$159.00'},
  {id:150, store:'zzounds', action:'remove_oos_add_price', price:'$99.95'},
  {id:151, store:'zzounds', action:'remove_oos_add_price', price:'$79.00'},
  {id:154, store:'zzounds', action:'remove_oos_add_price', price:'$199.99'},
  {id:157, store:'zzounds', action:'remove_oos_add_price', price:'$109.00'},
  {id:158, store:'zzounds', action:'remove_oos_add_price', price:'$369.99'},
  {id:166, store:'zzounds', action:'remove_oos_add_price', price:'$699.00'},
  {id:209, store:'zzounds', action:'remove_oos_add_price', price:'$159.99'},
  {id:215, store:'zzounds', action:'remove_oos_add_price', price:'$224.99'},
  {id:216, store:'zzounds', action:'remove_oos_add_price', price:'$299.99'},
  {id:330, store:'zzounds', action:'remove_oos_add_price', price:'$169.00'},
  {id:338, store:'zzounds', action:'remove_oos_add_price', price:'$2,099.99'},
  {id:354, store:'zzounds', action:'remove_oos_add_price', price:'$439.00'},
  {id:355, store:'zzounds', action:'remove_oos_add_price', price:'$190.00'},
  {id:396, store:'zzounds', action:'remove_oos_add_price', price:'$799.99'},

  // === ANDERTONS false OOS (45 items) ===
  {id:26, store:'andertons', action:'remove_oos_add_price', price:'£199.00'},
  {id:62, store:'andertons', action:'remove_oos_add_price', price:'£119.00'},
  {id:63, store:'andertons', action:'remove_oos_add_price', price:'£139.00'},
  {id:92, store:'andertons', action:'remove_oos_add_price', price:'£489.00'},  // zzounds stays OOS
  {id:112, store:'andertons', action:'remove_oos_add_price', price:'£85.00'},
  {id:120, store:'andertons', action:'remove_oos_add_price', price:'£535.00'},
  {id:122, store:'andertons', action:'remove_oos_add_price', price:'£1,299.00'},
  {id:125, store:'andertons', action:'remove_oos_add_price', price:'£799.00'},  // zzounds stays OOS
  {id:165, store:'andertons', action:'remove_oos_add_price', price:'£599.00'},
  {id:167, store:'andertons', action:'remove_oos_add_price', price:'£399.00'},
  {id:173, store:'andertons', action:'remove_oos_add_price', price:'£79.99'},
  {id:178, store:'andertons', action:'remove_oos_add_price', price:'£109.99'},
  {id:180, store:'andertons', action:'remove_oos_add_price', price:'£74.99'},
  {id:181, store:'andertons', action:'remove_oos_add_price', price:'£89.99'},
  {id:190, store:'andertons', action:'remove_oos_add_price', price:'£103.00'},
  {id:195, store:'andertons', action:'remove_oos_add_price', price:'£182.00'},
  {id:203, store:'andertons', action:'remove_oos_add_price', price:'£219.00'},
  {id:220, store:'andertons', action:'remove_oos_add_price', price:'£175.00'},
  {id:221, store:'andertons', action:'remove_oos_add_price', price:'£227.00'},
  {id:223, store:'andertons', action:'remove_oos_add_price', price:'£269.00'},
  {id:224, store:'andertons', action:'remove_oos_add_price', price:'£1,675.00'},
  {id:260, store:'andertons', action:'remove_oos_add_price', price:'£849.00'},  // zzounds stays OOS
  {id:261, store:'andertons', action:'remove_oos_add_price', price:'£469.00'},
  {id:264, store:'andertons', action:'remove_oos_add_price', price:'£444.00'},
  {id:274, store:'andertons', action:'remove_oos_add_price', price:'£249.00'},
  {id:276, store:'andertons', action:'remove_oos_add_price', price:'£103.00'},
  {id:277, store:'andertons', action:'remove_oos_add_price', price:'£103.00'},
  {id:280, store:'andertons', action:'remove_oos_add_price', price:'£69.00'},
  {id:281, store:'andertons', action:'remove_oos_add_price', price:'£439.00'},
  {id:284, store:'andertons', action:'remove_oos_add_price', price:'£79.00'},
  {id:290, store:'andertons', action:'remove_oos_add_price', price:'£173.00'},
  {id:294, store:'andertons', action:'remove_oos_add_price', price:'£272.00'},
  {id:295, store:'andertons', action:'remove_oos_add_price', price:'£381.00'},
  {id:309, store:'andertons', action:'remove_oos_add_price', price:'£254.00'},
  {id:310, store:'andertons', action:'remove_oos_add_price', price:'£152.00'},
  {id:325, store:'andertons', action:'remove_oos_add_price', price:'£299.00'},
  {id:336, store:'andertons', action:'remove_oos_add_price', price:'£379.00'},
  {id:343, store:'andertons', action:'remove_oos_add_price', price:'£1,610.00'},  // gear4music stays OOS
  {id:346, store:'andertons', action:'remove_oos_add_price', price:'£1,599.00'},
  {id:358, store:'andertons', action:'remove_oos_add_price', price:'£1,525.00'},

  // === MUSICSTORE false OOS (17 items) ===
  {id:32, store:'musicstore', action:'remove_oos_add_price', price:'€1,000.00'},
  {id:161, store:'musicstore', action:'remove_oos_add_price', price:'€155.00'},
  {id:163, store:'musicstore', action:'remove_oos_add_price', price:'€498.00'},
  {id:164, store:'musicstore', action:'remove_oos_add_price', price:'€399.00'},
  {id:326, store:'musicstore', action:'remove_oos_add_price', price:'€289.00'},
  {id:329, store:'musicstore', action:'remove_oos_add_price', price:'€329.00'},
  {id:335, store:'musicstore', action:'remove_oos_add_price', price:'€449.00'},
  {id:350, store:'musicstore', action:'remove_oos_add_price', price:'€1,552.90'},
  {id:357, store:'musicstore', action:'remove_oos_add_price', price:'€1,679.00'},
];

// Multi-store fixes (where removing from oos for multiple stores at once)
const multiStoreFixes = [
  // ID 61: remove oos ["andertons","musicstore"] → add both prices
  {id:61, stores:['andertons','musicstore'], prices:{andertons:'£115.00', musicstore:'€162.00'}},
  // ID 177: remove oos ["andertons","musicstore"] → add both prices
  {id:177, stores:['andertons','musicstore'], prices:{andertons:'£99.99', musicstore:'€93.00'}},
  // ID 253: remove oos ["andertons","musicstore"] → add both prices
  {id:253, stores:['andertons','musicstore'], prices:{andertons:'£171.00', musicstore:'€239.00'}},
  // ID 270: remove oos ["andertons","musicstore"] → add both prices
  {id:270, stores:['andertons','musicstore'], prices:{andertons:'£475.00', musicstore:'€545.00'}},
  // ID 327: remove oos ["andertons","musicstore"] → add both prices
  {id:327, stores:['andertons','musicstore'], prices:{andertons:'£329.00', musicstore:'€399.00'}},
  // ID 353: remove oos ["andertons","musicstore"] → add both prices
  {id:353, stores:['andertons','musicstore'], prices:{andertons:'£1,959.00', musicstore:'€2,199.00'}},
  // ID 356: remove oos ["andertons","musicstore"] → keep andertons OOS, add musicstore
  {id:356, stores:['musicstore'], prices:{musicstore:'€3,549.00'}, keepOos:['andertons']},
  // ID 360: remove oos ["andertons","musicstore"] → keep andertons OOS, add musicstore
  {id:360, stores:['musicstore'], prices:{musicstore:'€747.90'}, keepOos:['andertons']},
];

// Process line by line
const lines = content.split('\n');
let changes = 0;

for (let i = 0; i < lines.length; i++) {
  const line = lines[i];
  
  // Match entries like "  22: {...}," or "  22: {...}"
  const idMatch = line.match(/^\s+(\d+):\s*(\{.*)$/);
  if (!idMatch) continue;
  
  const id = parseInt(idMatch[1]);
  
  // Check single-store fixes
  const singleFixes = fixes.filter(f => f.id === id);
  // Check multi-store fixes
  const multiFix = multiStoreFixes.find(f => f.id === id);
  
  if (singleFixes.length === 0 && !multiFix) continue;
  
  let modified = line;
  
  // Apply single-store fixes
  for (const fix of singleFixes) {
    if (fix.action === 'remove_oos_add_price') {
      // Remove store from oos array
      const oosRegex = new RegExp(`oos:\\[([^\\]]*)\\]`);
      const oosMatch = modified.match(oosRegex);
      if (oosMatch) {
        let oosContent = oosMatch[1];
        // Remove the store from oos
        oosContent = oosContent.replace(new RegExp(`['"]${fix.store}['"],?\\s*`), '').replace(/,\s*$/, '');
        if (oosContent.trim()) {
          modified = modified.replace(oosRegex, `oos:[${oosContent}]`);
        } else {
          modified = modified.replace(/,?oos:\[[^\]]*\]/, '');
        }
      }
      
      // Add price to prices object
      const pricesRegex = /prices:\{([^}]*)\}/;
      const pricesMatch = modified.match(pricesRegex);
      if (pricesMatch) {
        let pricesContent = pricesMatch[1];
        if (pricesContent.trim()) {
          pricesContent += `,${fix.store}:"${fix.price}"`;
        } else {
          pricesContent = `${fix.store}:"${fix.price}"`;
        }
        modified = modified.replace(pricesRegex, `prices:{${pricesContent}}`);
      } else {
        // No prices object exists, create one before oos or at end
        modified = modified.replace(/\}/, `prices:{${fix.store}:"${fix.price}"}}`);
      }
      
      changes++;
    }
  }
  
  // Apply multi-store fix
  if (multiFix) {
    // Remove stores from oos
    const oosRegex = /oos:\[([^\]]*)\]/;
    const oosMatch = modified.match(oosRegex);
    if (oosMatch) {
      let oosContent = oosMatch[1];
      for (const store of multiFix.stores) {
        oosContent = oosContent.replace(new RegExp(`['"]${store}['"],?\\s*`), '').replace(/,\s*$/, '');
      }
      // Add back any keepOos
      if (multiFix.keepOos && multiFix.keepOos.length) {
        if (oosContent.trim()) {
          oosContent = oosContent + ',' + multiFix.keepOos.join(',');
        } else {
          oosContent = multiFix.keepOos.join(',');
        }
      }
      if (oosContent.trim()) {
        modified = modified.replace(oosRegex, `oos:[${oosContent}]`);
      } else {
        modified = modified.replace(/,?oos:\[[^\]]*\]/, '');
      }
    }
    
    // Add prices
    const pricesRegex = /prices:\{([^}]*)\}/;
    const pricesMatch = modified.match(pricesRegex);
    if (pricesMatch) {
      let pricesContent = pricesMatch[1];
      for (const [store, price] of Object.entries(multiFix.prices)) {
        pricesContent += `,${store}:"${price}"`;
      }
      modified = modified.replace(pricesRegex, `prices:{${pricesContent}}`);
    }
    
    changes++;
  }
  
  lines[i] = modified;
}

content = lines.join('\n');

// Clean up any double commas or trailing commas before }
content = content.replace(/,,+/g, ',');
content = content.replace(/,\s*\}/g, '}');

fs.writeFileSync(file, content, 'utf8');
console.log(`Applied ${changes} fixes to ${file}`);

// Verify
const verify = fs.readFileSync(file, 'utf8');
const remainingOOS = {};
const stores = ['zzounds','reverb','amazon','musicstore','pluginboutique','gear4music','andertons'];
stores.forEach(s => {
  const regex = new RegExp(`oos:\\[([^\\]]*['"]${s}['"][^\\]]*)\\]`, 'g');
  let m;
  const ids = [];
  while ((m = regex.exec(verify)) !== null) {
    // Find the ID on the same or preceding line
    const before = verify.substring(Math.max(0, m.index - 200), m.index);
    const idMatch = before.match(/(\d+):\s*\{[^{]*$/);
    if (idMatch) ids.push(parseInt(idMatch[1]));
  }
  remainingOOS[s] = ids;
});

console.log('\nRemaining OOS per store:');
stores.forEach(s => {
  console.log(`  ${s}: ${remainingOOS[s].length} → [${remainingOOS[s].join(',')}]`);
});
