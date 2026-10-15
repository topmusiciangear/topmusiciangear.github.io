const fs = require('fs');
const BASE = 'C:/Users/Daniel/projects/topmusiciangear/';
const guides = JSON.parse(fs.readFileSync(BASE+'data/guides.json','utf8'));
const g = guides.find(x=>x.id==='yamaha-mg-vs-behringer-xenyx');
console.log('claves de la guia: ' + Object.keys(g).join(', '));
console.log('\ncomparison: ' + JSON.stringify(g.comparison, null, 1).slice(0,700));
console.log('\nproductTable: ' + (g.productTable ? g.productTable.columns.map(c=>c.title).join(' | ') : 'NO'));
console.log('\nverdictProsCons: ' + (g.verdictProsCons||[]).map(v=>v.name||v.title).join(' | '));
const ids = new Set();
(g.featuredProducts||[]).forEach(i=>ids.add(i));
g.sections.forEach(s=>(s.products||[]).forEach(i=>ids.add(i)));
console.log('\nproductos: ' + [...ids].join(', '));
const P = JSON.parse(fs.readFileSync(BASE+'data/products.json','utf8'));
const arr = Array.isArray(P)?P:P.products;
[...ids].forEach(i=>{const p=arr.find(x=>x.id===i);console.log('   id '+i+' '+p.title);});
console.log('\nprimeras secciones:');
g.sections.forEach((s,i)=>console.log('  '+i+'. '+(s.heading||s.h)+'  products='+JSON.stringify(s.products||[])));

// como el build saca los titulos de la tabla de una guia vs
const b = fs.readFileSync(BASE+'build-guides.js','utf8');
const idx = b.indexOf('compTitle');
console.log('\n--- build: donde se eligen los titulos de la tabla vs ---');
const i2 = b.indexOf('comparison');
console.log(b.slice(Math.max(0,i2-200), i2 + 1500).slice(0, 1600));