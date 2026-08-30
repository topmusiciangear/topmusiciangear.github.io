const fs=require("fs");
const build=fs.readFileSync("build-guides.js","utf8");
// Find getResolvedStores function
const idx=build.indexOf("function getResolvedStores");
if(idx>-1) {
  const context=build.substring(idx, idx+800);
  console.log(context);
}
