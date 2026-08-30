const fs=require("fs");
let build=fs.readFileSync("build-guides.js","utf8");

// Replace 300 with 429 (Yeti Nano) and 301 with 430 (T669) in TEST_SHOP_BTN
// Current: 300: {prices:{amazon:"$75.99",...}},
// New: 429: {prices:{amazon:"$75.99",...}},
build=build.replace(/300: \{prices:\{amazon:"\$75\.99"/g, '429: {prices:{amazon:"$75.99"');
build=build.replace(/301: \{prices:\{amazon:"\$39\.99"/g, '430: {prices:{amazon:"$39.99"');

fs.writeFileSync("build-guides.js", build, "utf8");
console.log("build-guides.js updated");

// Verify
const match300=build.match(/\b429:\s*\{prices/);
const match301=build.match(/\b430:\s*\{prices/);
console.log("429 found:", !!match300);
console.log("430 found:", !!match301);
