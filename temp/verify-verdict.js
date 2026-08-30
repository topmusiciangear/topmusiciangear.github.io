const fs=require("fs");
const html=fs.readFileSync("guides/budget-usb-mics.html","utf8");
const verdicts=html.match(/verdict-product-name/g);
console.log("Verdict products:", verdicts?verdicts.length:0);
const nameRegex=/verdict-product-name[^>]*>([^<]+)/g;
let m;
while((m=nameRegex.exec(html))!==null) console.log(" ", m[1]);
