const fs=require('fs');
const p=JSON.parse(fs.readFileSync("data/products.json","utf8"));
// Search for IEM-related products
const keywords=["in.ear","iem","earphone","se215","se425","se535","se846","ie100","ie200","ie300","ie400","ie500","ie600","ie900","ath.e40","ath.e50","ath.e70","dt70","mach60","prophile","er4","kz as16","kz as10","moondrop","7hz","tin hifi","tribrid","hybrid iem"];
for(const kw of keywords){
  const found=p.filter(x=>x.title.toLowerCase().includes(kw.toLowerCase()) || x.title_es.toLowerCase().includes(kw.toLowerCase()));
  if(found.length){
    console.log(`\n=== ${kw} ===`);
    found.forEach(f=>console.log(`  ${f.id} | ${f.title} | ${f.title_es} | cat: ${f.category}`));
  }
}
