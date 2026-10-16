const fs = require('fs');
const B = 'C:/Users/Daniel/projects/topmusiciangear/';
const products = JSON.parse(fs.readFileSync(B + 'data/products.json', 'utf8'));

// Find the TEST_SHOP_BTN block in build-guides.js
let bg = fs.readFileSync(B + 'build-guides.js', 'utf8');

// New entries for the 30 products
const newEntries = {
  1001: { prices: { pluginboutique: '$199.00' } },
  1002: { prices: { pluginboutique: '$179.00' } },
  1003: { prices: { pluginboutique: '$199.00' } },
  1004: { prices: { pluginboutique: '$249.00' } },
  1005: { prices: { pluginboutique: '$189.00' } },
  1006: { prices: { pluginboutique: '$199.00' } },
  1007: { prices: { pluginboutique: '$99.00' } },
  1008: { prices: { pluginboutique: '$99.00' } },
  1009: { prices: { pluginboutique: '€130.08' } },
  1010: { prices: { pluginboutique: '$89.00' } },
  1011: { prices: { pluginboutique: '$99.00' } },
  1012: { prices: { pluginboutique: '$149.00' } },
  1013: { prices: { pluginboutique: '$399.00' } },
  1014: { prices: { pluginboutique: '$299.00' } },
  1015: { prices: { pluginboutique: '$699.00' } },
  1016: { prices: { pluginboutique: '$99.00' } },
  1017: { prices: { pluginboutique: '€399.00' } },
  1018: { prices: { pluginboutique: '$149.00' } },
  1019: { prices: { pluginboutique: '$199.99' } },
  1020: { prices: { pluginboutique: '$299.00' } },
  1021: { prices: { pluginboutique: '$149.00' } },
  1022: { prices: { pluginboutique: '$269.00' } },
  1023: { prices: { pluginboutique: '$99.00' } },
  1024: { prices: { pluginboutique: '$199.00' } },
  1025: { prices: { pluginboutique: '$199.00' } },
  1026: { prices: { pluginboutique: '$249.00' } },
  1027: { prices: { pluginboutique: '$129.00' } },
  1028: { prices: { pluginboutique: '$99.00' } },
  1029: { prices: { pluginboutique: '$249.00' } },
  1030: { prices: { pluginboutique: '$269.00' } },
};

// Find the closing of TEST_SHOP_BTN
const closeIdx = bg.lastIndexOf('\n};');
if (closeIdx === -1) {
  console.log('ERROR: Could not find TEST_SHOP_BTN closing');
  process.exit(1);
}

// Build the new entries string
let entriesStr = '';
Object.entries(newEntries).forEach(([id, cfg]) => {
  entriesStr += `  ${id}: {prices:{pluginboutique:"${cfg.prices.pluginboutique}"}},\n`;
});

// Insert before the closing
bg = bg.substring(0, closeIdx) + entriesStr + bg.substring(closeIdx);

fs.writeFileSync(B + 'build-guides.js', bg, 'utf8');
console.log('Added ' + Object.keys(newEntries).length + ' TEST_SHOP_BTN entries');
