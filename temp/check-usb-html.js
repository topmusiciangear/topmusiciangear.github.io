const fs=require("fs");
const html=fs.readFileSync("guides/budget-usb-mics.html","utf8");

// Count product cards
const cards=html.match(/guide-product-card/g);
console.log("Product cards:", cards?cards.length:0);

// Check for pros/cons
const pros=html.match(/pros-list/g);
const cons=html.match(/cons-list/g);
console.log("Pros lists:", pros?pros.length:0);
console.log("Cons lists:", cons?cons.length:0);

// Check title
const titleMatch=html.match(/<h1[^>]*>(.*?)<\/h1>/);
console.log("Title:", titleMatch?titleMatch[1].substring(0,80):"NOT FOUND");

// Check for product names
const prodNames=["Samson Q2U","FIFINE AM8","HyperX SoloCast","Rode NT-USB Mini","Maono PM461","TONOR TC-777","Blue Yeti Nano","Maono PD200X","FIFINE K688","FIFINE T669","Razer Seiren V3 Mini","Rode XCM-50","FIFINE A6V"];
prodNames.forEach(name=>{
  if(html.includes(name)) console.log("OK:", name);
  else console.log("MISSING:", name);
});
