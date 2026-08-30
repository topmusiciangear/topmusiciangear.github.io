const fs=require("fs");
const build=fs.readFileSync("build-guides.js","utf8");
// Find the productCard function
const idx=build.indexOf("function productCard");
if(idx>-1) {
  const context=build.substring(idx, idx+1500);
  console.log(context);
}
