const fs=require("fs");
const html=fs.readFileSync("guides/budget-usb-mics.html","utf8");

// Find all product card titles
const titles=[...html.matchAll(/guide-product-card-title">([^<]+)</g)];
console.log("All product card titles:");
titles.forEach((m,i)=>console.log(`  ${i+1}. ${m[1]}`));

// Check if shop buttons exist anywhere
const shopBtns=[...html.matchAll(/shop-btn-primary/g)];
console.log("\nTotal shop-btn-primary occurrences:", shopBtns.length);

// Check if there are any storeChips rendered
const storeChips=[...html.matchAll(/shop-btn/g)];
console.log("Total shop-btn occurrences:", storeChips.length);
