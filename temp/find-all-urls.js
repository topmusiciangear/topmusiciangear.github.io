const fs=require("fs");
const html=fs.readFileSync("guides/budget-usb-mics.html","utf8");

// Find all shop-btn-primary links
const matches=[...html.matchAll(/class="shop-btn-primary"[^>]*href="([^"]+)"/g)];
console.log("Shop button URLs:");
matches.slice(0,15).forEach((m,i)=>{
  console.log(`  ${i+1}. ${m[1].substring(0,100)}`);
});
