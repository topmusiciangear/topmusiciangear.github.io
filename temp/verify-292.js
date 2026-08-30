const fs=require("fs");
const html=fs.readFileSync("guides/budget-usb-mics.html","utf8");
// Find NT-USB Mini card and check prices
const idx=html.indexOf("NT-USB Mini");
const card=html.substring(idx,idx+3000);
const prices=card.match(/\$[\d,.]+/g);
console.log("Prices found in NT-USB Mini area:", prices);
