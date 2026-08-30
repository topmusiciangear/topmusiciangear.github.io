const fs=require("fs");
const html=fs.readFileSync("guides/budget-usb-mics.html","utf8");
// Find product cards or shop button sections
const productCards=html.match(/data-product-id="\d+"/g);
console.log("Product IDs in HTML:", productCards);
// Find all prices in shop buttons
const shopBtns=html.match(/shop-btn[\s\S]{0,500}?\$[\d,.]+/g);
if(shopBtns) shopBtns.slice(0,10).forEach((b,i)=>console.log(`\nBtn ${i}:`, b.substring(0,200)));
