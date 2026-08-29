const fs=require('fs');
const guides=JSON.parse(fs.readFileSync("data/guides.json","utf8"));
const products=JSON.parse(fs.readFileSync("data/products.json","utf8"));
const byId=Object.fromEntries(products.map(p=>[p.id,p]));
// TEST_SHOP_BTN
const src=fs.readFileSync("build-guides.js","utf8");
const ob=src.indexOf("{",src.indexOf("const TEST_SHOP_BTN"));
let d=0,e=-1;for(let i=ob;i<src.length;i++){if(src[i]==="{")d++;else if(src[i]==="}"){d--;if(d===0){e=i;break;}}}
const TS=eval("("+src.slice(ob,e+1)+")");

// Collect all product IDs referenced in all guides
const allGuideProds=new Set();
for(const g of guides){
  (g.featuredProducts||[]).forEach(id=>allGuideProds.add(id));
  (g.sections||[]).forEach(s=>(s.products||[]).forEach(p=>allGuideProds.add(p?.product??p?.id??p)));
}
console.log("Total unique products in guides:", allGuideProds.size);

const stores=["amazon","zzounds","reverb","gear4music","andertons","musicstore"];
const issues=[];
for(const id of allGuideProds){
  const p=byId[id]; if(!p) continue;
  const cfg=TS[id];
  const prices=cfg?.prices||{};
  const oos=cfg?.oos||[];
  const urls=cfg?.urls||{};
  const st=p.stores||{};
  
  for(const k of stores){
    const hasUrl=urls[k]||st[k];
    const hasPrice=prices[k];
    const inOos=oos.includes(k);
    
    if(hasUrl && !hasPrice && !inOos && k!=="reverb"){
      issues.push({id, product:p.title, store:k, issue:"URL sin precio -> Agotado"});
    }else if(hasUrl && !hasPrice && !inOos && k==="reverb"){
      issues.push({id, product:p.title, store:k, issue:"URL sin precio -> Verificar precio"});
    }else if(!hasUrl && hasPrice){
      issues.push({id, product:p.title, store:k, issue:"Precio SIN URL"});
    }
  }
}

console.log("\n=== ISSUES: productos en guías con problemas de precio ===");
const byProd={};
for(const i of issues){ (byProd[i.id]=byProd[i.id]||[]).push(i); }
for(const [id, iss] of Object.entries(byProd)){
  console.log(`\n${id} | ${byId[id]?.title}`);
  iss.forEach(x=>console.log(`  ${x.store}: ${x.issue}`));
}
console.log("\nTotal issues:", issues.length, "| productos afectados:", Object.keys(byProd).length);
