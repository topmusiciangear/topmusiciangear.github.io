const fs = require('fs');
const path = 'C:/Users/Daniel/projects/topmusiciangear/data';
const guides = JSON.parse(fs.readFileSync(`${path}/guides.json`, 'utf8'));
const products = JSON.parse(fs.readFileSync(`${path}/products.json`, 'utf8'));

// Build product map by title (lowercase)
const productMap = {};
products.forEach(p => {
  const names = [p.title, p.title_es].filter(Boolean).map(s => s.toLowerCase());
  names.forEach(n => productMap[n] = p);
});

function findProduct(title) {
  const n = title.toLowerCase();
  // exact match
  if (productMap[n]) return productMap[n];
  // contains match
  for (const [key, p] of Object.entries(productMap)) {
    if (key.includes(n) || n.includes(key)) return p;
  }
  return null;
}

// Aliases for known mappings
const aliases = {
  'yamaha c40 classical nylon guitar': 'yamaha c40ii classical nylon guitar',
  'casio px-s1100': 'caso privia px-s1100 digital piano',
  'sennheiser e906': 'sennheiser e 906'
};

let report = {
  totalProductsChecked: 0,
  productsWithSWorGC: 0,
  productsWithoutPrice: 0,
  details: []
};

const ptGuides = guides.filter(g => g.productTable);

ptGuides.forEach(g => {
  const pt = g.productTable;
  if (!pt || !pt.rows || !pt.columns) return;
  
  report.totalProductsChecked += pt.columns.length;
  
  // Check if approx price row exists
  const hasPriceRow = pt.rows.some(r => (r.label || '').toLowerCase() === 'approx price');
  
  if (!hasPriceRow) {
    // Need to add Approx Price row
    const values = pt.columns.map(col => {
      const prod = findProduct(col.title);
      report.totalProductsChecked++;
      
      if (!prod) {
        report.details.push({
          guide: g.id,
          guideTitle: g.title,
          column: col.title,
          status: 'no-product-found',
          price: 'N/A',
          sweetwater: false,
          guitarCenter: false
        });
        return { value: 'N/A', value_es: 'N/D' };
      }
      
      // Check for sweetwater/guitarcenter stores
      const hasSW = !!prod.stores && prod.stores.sweetwater;
      const hasGC = !!prod.stores && prod.stores.guitarcenter;
      
      if (hasSW || hasGC) {
        report.productsWithSWorGC++;
      }
      
      const price = prod.price ? `$${prod.price}` : 'N/A';
      
      report.details.push({
        guide: g.id,
        guideTitle: g.title,
        column: col.title,
        status: hasSW || hasGC ? 'has-sw-gc' : 'no-sw-gc',
        price: price,
        sweetwater: hasSW,
        guitarCenter: hasGC
      });
      
      return { value: price, value_es: price };
    });
    
    pt.rows.push({
      label: 'Approx Price',
      label_es: 'Precio aprox.',
      values
    });
  } else {
    // Row exists, just verify/collect data
    pt.columns.forEach((col, i) => {
      report.totalProductsChecked++;
      const val = pt.rows.find(r => (r.label || '').toLowerCase() === 'approx price')?.values?.[i];
      if (val && val.value !== 'N/A') {
        const prod = findProduct(col.title);
        if (prod && (prod.stores?.sweetwater || prod.stores?.guitarcenter)) {
          report.productsWithSWorGC++;
        }
      }
    });
  }
});

fs.writeFileSync(`${path}/sw_gc_audit_report.json`, JSON.stringify(report, null, 2));
console.log('Audit complete');
console.log('Total products checked:', report.totalProductsChecked);
console.log('Products with Sweetwater/Guitar Center store:', report.productsWithSWorGC);
console.log('Details written to sw_gc_audit_report.json');