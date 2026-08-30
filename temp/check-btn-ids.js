const fs=require("fs");
const build=fs.readFileSync("build-guides.js","utf8");
const btnStart=build.indexOf("var TEST_SHOP_BTN");
const btnEnd=build.indexOf("return shopBtn", btnStart);
const btnSection=build.substring(btnStart, btnEnd);
// Find all product IDs in TEST_SHOP_BTN
const allIds=[...btnSection.matchAll(/(\d+):\s*\{/g)].map(m=>parseInt(m[1]));
console.log("All IDs in TEST_SHOP_BTN:", allIds.length);
// Check for USB mic IDs
const usbMicIds=[276,277,278,279,280,281,284,287,289,290,292];
usbMicIds.forEach(id=>{
  if(allIds.includes(id)) console.log(`${id}: FOUND`);
  else console.log(`${id}: MISSING`);
});
