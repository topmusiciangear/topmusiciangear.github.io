const fs=require("fs");
let build=fs.readFileSync("build-guides.js","utf8");

// Remove the incorrectly inserted 300 and 301 entries
build=build.replace(/\n\s*300:\s*\{prices:\{[^}]+\}\},\n/g, '\n');
build=build.replace(/\n\s*301:\s*\{prices:\{[^}]+\}\},\n/g, '\n');
console.log("Removed incorrect 300 and 301 entries");

// Find the end of TEST_SHOP_BTN object
const testShopBtnStart = build.indexOf("const TEST_SHOP_BTN = {");
const testShopBtnEnd = build.indexOf("\n};", testShopBtnStart);

// Find the last entry before the closing }
const lastEntry = build.lastIndexOf("},", testShopBtnEnd);
const insertPos = lastEntry + 2; // After the },

const yetiEntry = "\n  300: {prices:{amazon:\"$75.99\",zzounds:\"$79.99\",reverb:\"$75.99\",gear4music:\"£69.00\",andertons:\"£69.00\",musicstore:\"€75.00\"}},";
const t669Entry = "\n  301: {prices:{amazon:\"$39.99\",zzounds:\"$39.99\",reverb:\"$39.99\",gear4music:\"£35.00\",andertons:\"£35.00\",musicstore:\"€38.00\"}},";

build = build.slice(0, insertPos) + yetiEntry + t669Entry + build.slice(insertPos);
console.log("Added Blue Yeti Nano (300) and FIFINE T669 (301) to TEST_SHOP_BTN");

fs.writeFileSync("build-guides.js", build, "utf8");
console.log("build-guides.js updated");

// Verify
const ids=["300","301"];
ids.forEach(id=>{
  const re=new RegExp(id+":\\s*\\{prices:\\{([^}]+)\\}");
  const m=build.match(re);
  if(m) console.log(`Verify ${id}: {prices:{${m[1]}}}`);
  else console.log(`${id}: NOT FOUND`);
});
