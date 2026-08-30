const fs=require("fs");
const html=fs.readFileSync("guides/budget-usb-mics.html","utf8");

// Find product cards
const cardMatches=[...html.matchAll(/data-product-id/g)];
console.log("data-product-id occurrences:", cardMatches.length);

// Find product titles in cards
const titleMatches=[...html.matchAll(/guide-product-card-title">([^<]+)</g)];
console.log("Product titles in cards:");
titleMatches.forEach(m=>console.log("  -", m[1]));
