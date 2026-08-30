const fs=require("fs");
const build=fs.readFileSync("build-guides.js","utf8");
// Search for where products are filtered for a guide
const matches=build.match(/products\.filter|guide\.products|guideProducts|productIds/g);
console.log("Product filter references:", matches);
// Search for where the product list is built for guide pages
const idx=build.indexOf("guide-products-cards");
if(idx>-1) {
  console.log("\nContext around guide-products-cards:");
  console.log(build.substring(Math.max(0,idx-200), idx+200));
}
