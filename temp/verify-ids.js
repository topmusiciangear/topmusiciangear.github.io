const fs=require("fs");
const build=fs.readFileSync("build-guides.js","utf8");
// Find entries for 429 and 430
const match429=build.match(/429:\s*\{[^}]+\}/);
const match430=build.match(/430:\s*\{[^}]+\}/);
console.log("429 entry:", match429?match429[0]:"NOT FOUND");
console.log("430 entry:", match430?match430[0]:"NOT FOUND");
