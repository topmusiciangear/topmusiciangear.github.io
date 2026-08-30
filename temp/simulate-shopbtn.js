const fs=require("fs");
const build=fs.readFileSync("build-guides.js","utf8");
const p=JSON.parse(fs.readFileSync("data/products.json","utf8"));

// Simulate the shopButtonsTest function for product 429
const prod=p.find(x=>x.id===429);
console.log("Product 429:", prod.title);
console.log("  stores:", JSON.stringify(prod.stores));

// Check TEST_SHOP_BTN entry
const testMatch=build.match(/429:\s*\{[^}]+\}/);
console.log("  TEST_SHOP_BTN entry:", testMatch?testMatch[0]:"NOT FOUND");

// Check if the entry has urls property
const fullMatch=build.match(/429:\s*\{[^}]+\}/);
if(fullMatch) {
  const hasUrls=fullMatch[0].includes("urls:");
  console.log("  Has urls:", hasUrls);
}
