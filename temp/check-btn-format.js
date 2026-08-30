const fs=require("fs");
const build=fs.readFileSync("build-guides.js","utf8");
const idx=build.indexOf("var TEST_SHOP_BTN");
console.log(build.substring(idx, idx+500));
