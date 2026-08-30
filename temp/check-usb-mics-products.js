const fs=require("fs");
const g=JSON.parse(fs.readFileSync("data/guides.json","utf8"));
const guide=g.find(x=>x.id==="budget-usb-mics");
guide.sections.forEach((s,i)=>{
  const ids=(s.content||"").match(/data-product-id="([^"]+)"/g);
  const names=(s.content||"").match(/<strong>([^<]+)<\/strong>/g);
  if(ids) console.log(`Section ${i}: product IDs = ${ids.join(", ")}`);
  if(names && names.length>0) console.log(`Section ${i}: product names = ${names.slice(0,2).join(", ")}`);
});
// Also check products array
console.log("\nGuide products:", guide.products);
// Check comparison
if(guide.comparison) {
  console.log("\nComparison:", JSON.stringify(guide.comparison, null, 2).substring(0, 500));
}
