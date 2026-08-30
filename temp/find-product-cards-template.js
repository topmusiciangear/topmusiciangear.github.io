const fs=require("fs");
const build=fs.readFileSync("build-guides.js","utf8");
// Search for where guide products are listed
const idx=build.indexOf("guide-products-cards");
const bigSearch=build.substring(idx, idx+2000);
// Find the function that generates product cards
const funcIdx=bigSearch.indexOf("function");
const htmlIdx=bigSearch.indexOf("guide-products-cards>");
console.log(bigSearch.substring(0, 500));
