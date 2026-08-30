const fs=require("fs");
const html=fs.readFileSync("guides/budget-usb-mics.html","utf8");
// Find shop buttons
const btnMatches=html.match(/shop-btn[^"]*"[^>]*>[^<]*<[^>]*>[^<]*<[^>]*>[^<]*/g);
if(btnMatches) btnMatches.forEach((b,i)=>console.log(`${i}: ${b.substring(0,200)}`));
// Find price mentions
const priceMatches=html.match(/\$\d+/g);
console.log("\nPrices found:", priceMatches);
