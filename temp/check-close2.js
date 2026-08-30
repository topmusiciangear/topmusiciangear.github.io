const fs=require("fs");
const build=fs.readFileSync("build-guides.js","utf8");
// Find where TEST_SHOP_BTN starts
const idx=build.indexOf("const TEST_SHOP_BTN");
console.log("TEST_SHOP_BTN starts at:", idx);
// Find the closing of the object
const after=build.slice(idx, idx+50);
console.log("First 50 chars:", JSON.stringify(after));
// Find "function shopButtonsTest"
const fnIdx=build.indexOf("function shopButtonsTest");
console.log("function shopButtonsTest at:", fnIdx);
// Show characters between last entry and function
const between=build.slice(fnIdx-50, fnIdx+20);
console.log("Before function:", JSON.stringify(between));
