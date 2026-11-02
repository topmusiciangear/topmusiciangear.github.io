const fs = require('fs');
const path = 'C:/Users/Daniel/projects/topmusiciangear/data';
const guides = JSON.parse(fs.readFileSync(`${path}/guides.json`, 'utf8'));
const products = JSON.parse(fs.readFileSync(`${path}/products.json`, 'utf8'));

const productById = {};
products.forEach(p => { if(p.id) productById[p.id] = p; });

function normalize(s){ return s.toLowerCase().replace(/[^a-z0-9]+/g,' '); }

const productMap = {};
products.forEach(p=>{
  [p.title, p.title_es].filter(Boolean).forEach(t=>{
    productMap[normalize(t)] = p;
  });
});

function findProduct(title){
  const n = normalize(title);
  if(productMap[n]) return productMap[n];
  // contains
  for(const key in productMap){
    if(key.includes(n) || n.includes(key)) return productMap[key];
  }
  return null;
}

let unmapped = [];
let totalUpdated = 0;
guides.forEach(g=>{
  if(!g.productTable) return;
  const pt = g.productTable;
  if(!pt.rows || !pt.columns) return;
  // Move Best For first
  const bestIdx = pt.rows.findIndex(r=> (r.label||'').toLowerCase()==='best for' || (r.label_es||'').toLowerCase()==='ideal para');
  if(bestIdx>0){
    const [row]=pt.rows.splice(bestIdx,1);
    pt.rows.unshift(row);
    totalUpdated++;
  }
  // Check approx price row exists
  const hasPrice = pt.rows.some(r=> (r.label||'').toLowerCase()==='approx price');
  if(!hasPrice){
    const values = pt.columns.map(col=>{
      const prod = findProduct(col.title);
      if(!prod){
        unmapped.push({guide:g.id, guideTitle:g.title, column:col.title});
        return {value:'N/A', value_es:'N/D'};
      }
      const price = prod.price ? `$${prod.price}` : 'N/A';
      return {value:price, value_es:price};
    });
    pt.rows.push({label:'Approx Price', label_es:'Precio aprox.', values});
    totalUpdated++;
  }
});

fs.writeFileSync(`${path}/guides.json.tmp`, JSON.stringify(guides,null,2));
fs.writeFileSync(`${path}/producttable_unmapped.json`, JSON.stringify(unmapped,null,2));
console.log('Guides processed', guides.filter(g=>g.productTable).length);
console.log('Unmapped count', unmapped.length);
console.log('Wrote guides.json.tmp');
