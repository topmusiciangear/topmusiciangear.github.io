const fs=require("fs");
const build=fs.readFileSync("build-guides.js","utf8");
// Find ALL occurrences of "300:" in the TEST_SHOP_BTN area
const testShopBtnStart = build.indexOf("const TEST_SHOP_BTN = {");
const testShopBtnEnd = build.indexOf("\n};", testShopBtnStart);
const section = build.substring(testShopBtnStart, testShopBtnEnd);

const re = /\b300:\s*\{prices:\{[^}]+\}\}/g;
let m;
while((m=re.exec(section))!==null) {
  console.log(`Found at offset ${m.index}: ${m[0].substring(0,120)}`);
}
