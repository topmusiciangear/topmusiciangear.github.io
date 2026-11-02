const fs = require('fs');
const path = require('path');

const guidesPath = 'C:\\Users\\Daniel\\projects\\topmusiciangear\\data\\guides.json';
const productsPath = 'C:\\Users\\Daniel\\projects\\topmusiciangear\\data\\products.json';
const outGuidesPath = 'C:\\Users\\Daniel\\projects\\topmusiciangear\\data\\guides.json.updated';
const reportPath = 'C:\\Users\\Daniel\\projects\\topmusiciangear\\temp\\comparison_audit_report.txt';

const guidesData = JSON.parse(fs.readFileSync(guidesPath, 'utf8'));
const productsData = JSON.parse(fs.readFileSync(productsPath, 'utf8'));

const productMap = new Map();
productsData.forEach(p => {
  productMap.set(String(p.id), p);
});

let totalGuides = guidesData.length;
let guidesWithComparison = 0;
let tablesUpdated = 0;
let missingPriceCount = 0;
const missingEntries = [];

function formatPrice(price) {
  if (price === undefined || price === null) return null;
  // price may be number or string
  const num = Number(price);
  if (isNaN(num)) return null;
  // format with comma thousands
  return `$${num.toLocaleString('en-US')}`;
}

guidesData.forEach(guide => {
  if (!guide.comparison || !Array.isArray(guide.comparison.rows)) {
    return;
  }
  guidesWithComparison++;
  let rows = guide.comparison.rows;
  // Find Best for row
  const bestIdx = rows.findIndex(r => {
    const label = (r.label || '').toLowerCase();
    const label_es = (r.label_es || '').toLowerCase();
    return label === 'best for' || label_es === 'ideal para';
  });
  let moved = false;
  if (bestIdx !== -1) {
    const bestRow = rows.splice(bestIdx, 1)[0];
    rows.unshift(bestRow);
    moved = true;
  }
  // Determine products for Approx Price
  let prodIds = [];
  if (Array.isArray(guide.featuredProducts) && guide.featuredProducts.length === 2) {
    prodIds = guide.featuredProducts.slice(0,2);
  } else if (Array.isArray(guide.featuredProducts) && guide.featuredProducts.length > 0) {
    // try to get unique first two
    const uniq = [...new Set(guide.featuredProducts)];
    prodIds = uniq.slice(0,2);
  } else {
    // infer from sections
    const ids = new Set();
    if (Array.isArray(guide.sections)) {
      guide.sections.forEach(s => {
        if (Array.isArray(s.products)) {
          s.products.forEach(id => ids.add(id));
        }
      });
    }
    prodIds = Array.from(ids).slice(0,2);
  }
  // If still less than 2, try verdictProsCons names mapping? skip
  const priceInfo = [];
  prodIds.forEach(id => {
    const prod = productMap.get(String(id));
    if (prod && prod.price !== undefined && prod.price !== null) {
      priceInfo.push({id, name: prod.title || String(id), price: prod.price});
    } else {
      priceInfo.push({id, name: prod ? prod.title : String(id), price: null});
      missingEntries.push({guideId: guide.id, productId: id, productName: prod ? prod.title : String(id)});
    }
  });
  // Build Approx Price row
  const val1 = priceInfo[0] ? (priceInfo[0].price !== null ? formatPrice(priceInfo[0].price) : 'N/A') : 'N/A';
  const val2 = priceInfo[1] ? (priceInfo[1].price !== null ? formatPrice(priceInfo[1].price) : 'N/A') : 'N/A';
  const val1_es = priceInfo[0] ? (priceInfo[0].price !== null ? formatPrice(priceInfo[0].price) : 'N/D') : 'N/D';
  const val2_es = priceInfo[1] ? (priceInfo[1].price !== null ? formatPrice(priceInfo[1].price) : 'N/D') : 'N/D';

  if (priceInfo.some(p => p.price === null)) {
    missingPriceCount++;
  }

  const approxRow = {
    label: 'Approx Price',
    label_es: 'Precio aprox.',
    val1,
    val2,
    val1_es,
    val2_es
  };
  rows.push(approxRow);
  tablesUpdated++;
});

fs.writeFileSync(outGuidesPath, JSON.stringify(guidesData, null, 2), 'utf8');

let report = '';
report += `Total guides processed: ${totalGuides}\n`;
report += `Guides with comparison tables: ${guidesWithComparison}\n`;
report += `Tables updated: ${tablesUpdated}\n`;
report += `Guides with missing prices: ${missingPriceCount}\n`;
report += `\nMissing price entries:\n`;
if (missingEntries.length === 0) {
  report += `None\n`;
} else {
  // deduplicate by guideId+productId
  const seen = new Set();
  missingEntries.forEach(e => {
    const key = `${e.guideId}-${e.productId}`;
    if (seen.has(key)) return;
    seen.add(key);
    report += `- Guide: ${e.guideId}, Product ID: ${e.productId}, Product Name: ${e.productName}, price missing\n`;
  });
}
fs.writeFileSync(reportPath, report, 'utf8');
console.log(report);