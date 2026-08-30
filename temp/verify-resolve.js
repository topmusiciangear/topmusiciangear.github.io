const fs=require("fs");
const p=JSON.parse(fs.readFileSync("data/products.json","utf8"));
const yetinano=p.find(x=>x.id===429);
const t669=p.find(x=>x.id===430);
console.log("Yeti Nano stores:", JSON.stringify(yetinano.stores));
console.log("T669 stores:", JSON.stringify(t669.stores));

// Check if getResolvedStores would return anything
// The function needs stores in products.json
const html=fs.readFileSync("guides/budget-usb-mics.html","utf8");
// Search for shop-btn near the product cards
const cardArea=html.substring(html.indexOf("guide-products-cards"), html.indexOf("guide-products-cards")+5000);
const shopBtns=[...cardArea.matchAll(/shop-btn-primary/g)];
console.log("Shop buttons in product cards area:", shopBtns.length);
