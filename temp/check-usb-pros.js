const fs=require("fs");
const g=JSON.parse(fs.readFileSync("data/guides.json","utf8"));
const guide=g.find(x=>x.id==="budget-usb-mics");

guide.sections.forEach((s,i)=>{
  const proLen=s.pros?s.pros.length:0;
  const conLen=s.cons?s.cons.length:0;
  const prodLen=s.products?s.products.length:0;
  console.log(`Section ${i}: ${prodLen} products, ${proLen} pros, ${conLen} cons`);
  if(s.pros) console.log(`  Pros: ${JSON.stringify(s.pros)}`);
  if(s.cons) console.log(`  Cons: ${JSON.stringify(s.cons)}`);
});
