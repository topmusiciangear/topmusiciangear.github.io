const fs=require("fs");
const html=fs.readFileSync("guides/budget-usb-mics.html","utf8");
// Find shop button area for NT-USB Mini
const idx=html.indexOf("NT-USB Mini");
const area=html.substring(idx,idx+5000);
// Find all price mentions
const priceRegex=/shop-price[^>]*>([^<]+)/g;
let m;
let count=0;
while((m=priceRegex.exec(area))!==null && count<10) {
  console.log("Price:", m[1].trim());
  count++;
}
