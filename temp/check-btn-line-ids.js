const fs=require("fs");
const build=fs.readFileSync("build-guides.js","utf8");
const idx=build.indexOf("const TEST_SHOP_BTN");
const section=build.substring(idx, idx+3000);
// find all ids and their line numbers
const lines=section.split("\n");
lines.forEach((l,i)=>{
  if(l.match(/^\s*\d+:/)) console.log(`Line ${i}: ${l.trim().substring(0, 80)}`);
});
