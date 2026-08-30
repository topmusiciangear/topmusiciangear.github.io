const fs=require("fs");
const g=JSON.parse(fs.readFileSync("data/guides.json","utf8"));
const guide=g.find(x=>x.id==="budget-usb-mics");
const p=JSON.parse(fs.readFileSync("data/products.json","utf8"));

// Check each section for title and content
guide.sections.forEach((s,i)=>{
  const hasTitle = s.title && s.title.length > 5;
  const hasContent = s.content && s.content.length > 20;
  const prodIds = s.products || [];
  const prodNames = prodIds.map(id => {
    const prod = p.find(x=>x.id===id);
    return prod ? `${id}:${prod.title.split(" ").slice(0,2).join(" ")}` : `${id}:?`;
  });
  console.log(`Section ${i}: title=${hasTitle}, content=${hasContent}, products=[${prodNames.join(", ")}]`);
  if(hasTitle) console.log(`  Title: "${s.title.substring(0,80)}"`);
  if(hasContent) console.log(`  Content: "${s.content.substring(0,80)}..."`);
});
