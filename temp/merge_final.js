const fs = require('fs');
const path = 'C:/Users/Daniel/projects/topmusiciangear/data';
const guides = JSON.parse(fs.readFileSync(`${path}/guides.json`, 'utf8'));
const products = JSON.parse(fs.readFileSync(`${path}/products.json`, 'utf8'));

const aliases = {
  'Yamaha C40 Classical (Nylon) Guitar': 'Yamaha C40II Classical (Nylon) Guitar',
  'Casio PX-S1100': 'Casio Privia PX-S1100 Digital Piano',
  'Yamaha YDP-146': 'Yamaha Arius YDP-146 Digital Piano',
  'Yamaha YDP-166': 'Yamaha Arius YDP-166',
  'Yamaha CLP-835': 'Yamaha Clavinova CLP-835',
  'Sennheiser e906': 'Sennheiser e 906',
  'Akai MPC Key 37 Gen 2': 'Akai Professional MPC Key 37 Gen 2'
};

const productMap = {};
products.forEach(p=>{
  [p.title, p.title_es].filter(Boolean).forEach(t=>{
    const key = t.toLowerCase().replace(/[^a-z0-9]+/g,' ');
    productMap[key] = p;
  });
});

function findByTitle(title){
  const alias = aliases[title];
  const searchTitle = alias || title;
  const key = searchTitle.toLowerCase().replace(/[^a-z0-9]+/g,' ');
  if(productMap[key]) return productMap[key];
  // fuzzy contains
  for(const k in productMap){
    if(k.includes(key) || key.includes(k)) return productMap[k];
  }
  return null;
}

let unmapped = [];
guides.forEach(g=>{
  if(!g.productTable) return;
  const pt = g.productTable;
  if(!pt.rows || !pt.columns) return;
  // move Best For
  const bestIdx = pt.rows.findIndex(r=> (r.label||'').toLowerCase()==='best for' || (r.label_es||'').toLowerCase()==='ideal para');
  if(bestIdx>0){
    const [row]=pt.rows.splice(bestIdx,1);
    pt.rows.unshift(row);
  }
  // ensure Approx Price
  if(!pt.rows.some(r=> (r.label||'').toLowerCase()==='approx price')){
    const values = pt.columns.map(col=>{
      const prod = findByTitle(col.title);
      if(!prod){
        unmapped.push({guide:g.id, column:col.title});
        return {value:'N/A', value_es:'N/D'};
      }
      const price = prod.price ? `$${prod.price}` : 'N/A';
      return {value:price, value_es:price};
    });
    pt.rows.push({label:'Approx Price', label_es:'Precio aprox.', values});
  }
});

fs.writeFileSync(`${path}/guides.json`, JSON.stringify(guides,null,2));
fs.writeFileSync(`${path}/producttable_unmapped_final.json`, JSON.stringify(unmapped,null,2));
console.log('Unmapped remaining:', unmapped.length);
console.log('Unmapped:', unmapped);
