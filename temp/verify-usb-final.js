const fs=require("fs");
const html=fs.readFileSync("guides/budget-usb-mics.html","utf8");
// Count product cards with "Buy at"
const buyAt=html.match(/Buy at/g);
console.log("Product cards (Buy at):", buyAt?buyAt.length:0);
// Check for Yeti Nano and T669 text
console.log("Yeti Nano review:", html.includes("Yeti Nano is the compact condenser")?"YES":"MISSING");
console.log("T669 review:", html.includes("T669 is the complete starter kit")?"YES":"MISSING");
