const fs=require("fs");
const html=fs.readFileSync("guides/budget-usb-mics.html","utf8");

// Find actual button elements (not CSS)
const idx=html.indexOf("<a", html.indexOf("shop-btn-primary", html.indexOf("shop-btn-primary")+1));
if(idx>-1) {
  console.log("First button element:");
  console.log(html.substring(idx, idx+300));
}
