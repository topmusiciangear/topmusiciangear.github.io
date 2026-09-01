const fs = require('fs');
const path = require('path');
const file = path.join(__dirname, '..', 'data', 'guides.json');
const guides = JSON.parse(fs.readFileSync(file, 'utf8'));

// Mapping: old ID -> new ID
const idMap = {
  64: 440,   // Fender American Ultra Strat -> Ultra II
  66: 441,   // Fender Player Precision Bass -> Player II
  67: 442,   // Fender Player Jazz Bass -> Player II
  101: 443,  // EHX Small Stone -> Nano Small Stone
  125: 444   // Fender Player Telecaster -> Player II
};

// Guides to update
const guideIds = [
  'fender-guide',
  'best-electric-guitar',
  'best-beginner-electric-guitar',
  'beginner-guitar',
  'precision-vs-jazz',
  'fender-bass-guide',
  'budget-bass-like-expensive',
  'beginner-bass-guitars',
  'pro-guitars',
  'pro-basses',
  'guitar-pedals'
];

let totalReplacements = 0;

guideIds.forEach(function(guideId) {
  const guide = guides.find(function(x) { return x.id === guideId; });
  if (!guide) {
    console.log('NOT FOUND: ' + guideId);
    return;
  }
  
  let guideReplacements = 0;
  
  // Replace in sections' products arrays
  if (guide.sections) {
    guide.sections.forEach(function(section) {
      if (section.products && Array.isArray(section.products)) {
        for (let i = 0; i < section.products.length; i++) {
          const oldId = section.products[i];
          if (idMap[oldId]) {
            section.products[i] = idMap[oldId];
            guideReplacements++;
          }
        }
      }
    });
  }
  
  // Replace in featuredProducts
  if (guide.featuredProducts && Array.isArray(guide.featuredProducts)) {
    for (let i = 0; i < guide.featuredProducts.length; i++) {
      const oldId = guide.featuredProducts[i];
      if (idMap[oldId]) {
        guide.featuredProducts[i] = idMap[oldId];
        guideReplacements++;
      }
    }
  }
  
  // Replace in productTable
  if (guide.productTable && Array.isArray(guide.productTable)) {
    guide.productTable.forEach(function(row) {
      if (row.id && idMap[row.id]) {
        row.id = idMap[row.id];
        guideReplacements++;
      }
    });
  }
  
  // Replace in verdictProsCons
  if (guide.verdictProsCons && Array.isArray(guide.verdictProsCons)) {
    guide.verdictProsCons.forEach(function(vpc) {
      if (vpc.id && idMap[vpc.id]) {
        vpc.id = idMap[vpc.id];
        guideReplacements++;
      }
    });
  }
  
  totalReplacements += guideReplacements;
  console.log(guideId + ': ' + guideReplacements + ' replacements');
});

console.log('Total replacements: ' + totalReplacements);

// Write back
fs.writeFileSync(file, JSON.stringify(guides, null, 2), 'utf8');
console.log('Guides updated successfully');
