const fs=require('fs');
const p='data/products.json';
const d=JSON.parse(fs.readFileSync(p,'utf8'));
let changed=0;
d.forEach(prod=>{
  if(prod.category==='keyboards' && prod.facts){
    prod.facts.forEach(f=>{
      if(f.label && (f.label.en==='Keys' || f.label.es==='Teclas') && f.icon==='keyboard'){
        f.icon='piano';
        changed++;
      }
    });
  }
});
fs.writeFileSync(p, JSON.stringify(d,null,2)+'\n');
console.log('changed',changed);
