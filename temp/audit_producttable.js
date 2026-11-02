const fs = require('fs');
const guidesPath = 'C:\\Users\\Daniel\\projects\\topmusiciangear\\data\\guides.json';
const productsPath = 'C:\\Users\\Daniel\\projects\\topmusiciangear\\data\\products.json';
const outGuidesPath = 'C:\\Users\\Daniel\\projects\\topmusiciangear\\data\\guides_producttable_updated.json';
const reportPath = 'C:\\Users\\Daniel\\projects\\topmusiciangear\\temp\\producttable_audit_report.txt';

const guidesData = JSON.parse(fs.readFileSync(guidesPath, 'utf8'));
const productsData = JSON.parse(fs.readFileSync(productsPath, 'utf8'));

function normalize(str){ return (str||'').toLowerCase(); }
function containsIgnoreCase(hay, needle){ return normalize(hay).includes(normalize(needle)); }

const productsById = new Map();
productsData.forEach(p => productsById.set(p.id, p));

const productList = productsData.map(p => ({
  id: p.id,
  title: p.title || '',
  title_es: p.title_es || '',
}));

let totalGuidesWithTable = 0;
let guidesUpdated = 0;
let totalColumnsMapped = 0;
let totalColumnsUnmapped = 0;
const unmappedEntries = [];

guidesData.forEach(guide => {
  if (!guide.productTable || !Array.isArray(guide.productTable.columns) || !Array.isArray(guide.productTable.rows)){
    return;
  }
  totalGuidesWithTable++;
  const pt = guide.productTable;
  const columns = pt.columns;
  const rows = pt.rows.slice();

  let bestForIdx = -1;
  for (let i=0;i<rows.length;i++){
    const r = rows[i];
    if ( (r.label && normalize(r.label)==='best for') || (r.label_es && normalize(r.label_es)==='ideal para') ){
      bestForIdx = i;
      break;
    }
  }
  if (bestForIdx > -1){
    const [bestRow] = rows.splice(bestForIdx,1);
    rows.unshift(bestRow);
  }

  const columnMaps = [];
  columns.forEach(col => {
    const title = col.title || col.title_es || '';
    let match = productList.find(p => normalize(p.title)===normalize(title) || normalize(p.title_es)===normalize(title));
    if (!match){
      match = productList.find(p => containsIgnoreCase(p.title, title) || containsIgnoreCase(p.title_es, title));
    }
    if (!match){
      match = productList.find(p => containsIgnoreCase(title, p.title) || containsIgnoreCase(title, p.title_es));
    }
    if (match){
      totalColumnsMapped++;
      columnMaps.push({productId: match.id, product: productsById.get(match.id), title});
    } else {
      totalColumnsUnmapped++;
      columnMaps.push({productId: null, product: null, title});
      unmappedEntries.push({guideId: guide.id, guideTitle: guide.title, columnTitle: title});
    }
  });

  const priceValues = columnMaps.map(cm => {
    if (!cm.product || typeof cm.product.price !== 'number'){
      return {value:'N/A', value_es:'N/A'};
    }
    const priceStr = `$${cm.product.price}`;
    return {value: priceStr, value_es: priceStr};
  });
  const approxPriceRow = {
    label: 'Approx Price',
    label_es: 'Precio aprox.',
    values: priceValues
  };
  rows.push(approxPriceRow);
  guide.productTable.rows = rows;
  guidesUpdated++;
});

const reportLines = [];
reportLines.push(`Total guides with productTable: ${totalGuidesWithTable}`);
reportLines.push(`Guides updated: ${guidesUpdated}`);
reportLines.push(`Total columns mapped: ${totalColumnsMapped}`);
reportLines.push(`Total columns unmapped: ${totalColumnsUnmapped}`);
reportLines.push('');
reportLines.push('Unmapped columns details:');
unmappedEntries.forEach(e=>{
  reportLines.push(`- Guide ID: ${e.guideId} | Title: ${e.guideTitle} | Column: ${e.columnTitle}`);
});

fs.writeFileSync(outGuidesPath, JSON.stringify(guidesData, null, 2));
fs.writeFileSync(reportPath, reportLines.join('\n'));

console.log('Done');
console.log('totalGuidesWithTable', totalGuidesWithTable);
console.log('guidesUpdated', guidesUpdated);
console.log('mapped', totalColumnsMapped, 'unmapped', totalColumnsUnmapped);
