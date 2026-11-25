const fs = require('fs');
const guides = JSON.parse(fs.readFileSync('data/guides.json', 'utf8'));
const products = JSON.parse(fs.readFileSync('data/products.json', 'utf8'));
const productMap = {};
products.forEach(p => { productMap[p.id] = p; });

const issues = [];
let totalGuides = guides.length;
let totalFeatured = 0;
let totalTableCols = 0;
let totalVpc = 0;

guides.forEach(g => {
  // Check featuredProducts
  if (g.featuredProducts && Array.isArray(g.featuredProducts)) {
    g.featuredProducts.forEach(pid => {
      totalFeatured++;
      if (!productMap[pid]) {
        issues.push({ guide: g.id, type: 'FEATURED_MISSING', detail: 'featuredProducts references non-existent product ID ' + pid });
      }
    });
  }
  
  // Check productTable columns
  if (g.productTable && g.productTable.columns) {
    g.productTable.columns.forEach(col => {
      totalTableCols++;
      const title = col.title;
      // Find product with matching title
      const matchingProduct = products.find(p => p.title === title || p.title_es === title);
      if (!matchingProduct) {
        // Check if it's a known non-product column (like "Best For" etc.)
        issues.push({ guide: g.id, type: 'TABLE_COL_NO_MATCH', detail: 'Column title "' + title + '" does not match any product title in products.json' });
      }
    });
  }
  
  // Check verdictProsCons
  if (g.verdictProsCons && Array.isArray(g.verdictProsCons)) {
    g.verdictProsCons.forEach(vpc => {
      totalVpc++;
      if (vpc.product) {
        const matchingProduct = products.find(p => p.title === vpc.product || p.title_es === vpc.product);
        if (!matchingProduct) {
          issues.push({ guide: g.id, type: 'VPC_NO_MATCH', detail: 'verdictProsCons product "' + vpc.product + '" does not match any product title' });
        }
      }
    });
  }
});

console.log('=== AUDIT RESULTS ===');
console.log('Total guides:', totalGuides);
console.log('Total featuredProducts references:', totalFeatured);
console.log('Total productTable columns:', totalTableCols);
console.log('Total verdictProsCons entries:', totalVpc);
console.log('Total issues found:', issues.length);
console.log('');

// Group issues by type
const byType = {};
issues.forEach(i => {
  if (!byType[i.type]) byType[i.type] = [];
  byType[i.type].push(i);
});

Object.keys(byType).forEach(type => {
  console.log('--- ' + type + ' (' + byType[type].length + ') ---');
  byType[type].forEach(i => {
    console.log('  Guide: ' + i.guide + ' | ' + i.detail);
  });
  console.log('');
});