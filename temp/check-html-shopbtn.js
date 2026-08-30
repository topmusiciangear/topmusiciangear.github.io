const fs=require("fs");
const html=fs.readFileSync("guides/budget-usb-mics.html","utf8");
console.log("File size:", html.length);
// Look for shop button sections
const shopBtnIdx = html.indexOf("shop-btn-primary");
console.log("First shop-btn-primary at char:", shopBtnIdx);
if(shopBtnIdx > -1) {
  // Get context around first shop button
  const start = Math.max(0, shopBtnIdx - 500);
  const context = html.substring(start, shopBtnIdx + 200);
  console.log("\nContext:", context.substring(0, 800));
}
