const fs=require("fs");

// 1. Add Blue Yeti Nano and FIFINE T669 to products.json
const p=JSON.parse(fs.readFileSync("data/products.json","utf8"));

// Check if already exists
const yetExists=p.find(x=>x.id===300);
const t669Exists=p.find(x=>x.id===301);

if(!yetExists) {
  p.push({
    id: 300,
    name: "Blue Yeti Nano",
    price: 76,
    stores: {
      amazon: "https://www.amazon.com/dp/B07DTTGZ7M"
    }
  });
  console.log("Added Blue Yeti Nano (id=300)");
}

if(!t669Exists) {
  p.push({
    id: 301,
    name: "FIFINE T669",
    price: 40,
    stores: {
      amazon: "https://www.amazon.com/dp/B07Y1C6GDS"
    }
  });
  console.log("Added FIFINE T669 (id=301)");
}

fs.writeFileSync("data/products.json", JSON.stringify(p, null, 2), "utf8");
console.log("products.json updated");
