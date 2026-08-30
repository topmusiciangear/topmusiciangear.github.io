const fs=require("fs");
const html=fs.readFileSync("guides/budget-usb-mics.html","utf8");

// Find first shop-btn-primary and show surrounding context
const idx=html.indexOf("shop-btn-primary");
if(idx>-1) {
  console.log("First shop-btn-primary context:");
  console.log(html.substring(idx-50, idx+200));
}
