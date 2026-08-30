const fs=require("fs");
const g=JSON.parse(fs.readFileSync("data/guides.json","utf8"));
const guide=g.find(x=>x.id==="budget-usb-mics");
// Get product IDs from sections
const productIds = guide.sections.map(s=>{
  const m = (s.content||"").match(/data-product-id="([^"]+)"/);
  return m ? m[1] : null;
}).filter(Boolean);
console.log("Product IDs:", productIds);

// Check TEST_SHOP_BTN for prices
const buildContent = fs.readFileSync("build-guides.js","utf8");
const btnMatch = buildContent.match(/TEST_SHOP_BTN\s*=\s*([\s\S]*?);\s*return\s+shopBtn/);
if(btnMatch) {
  const btnCode = btnMatch[1];
  productIds.forEach(id => {
    const regex = new RegExp(`"${id}"[^}]*?price:\\s*"?([^",}]+)"?`);
    const m = btnCode.match(regex);
    console.log(`${id}: price=${m ? m[1] : "NOT FOUND"}`);
  });
}
