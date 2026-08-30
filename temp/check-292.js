const fs=require("fs");
const build=fs.readFileSync("build-guides.js","utf8");
// Find the entry for 292
const idx=build.indexOf("292:");
const line=build.substring(idx, idx+200);
console.log("Current entry:", line.substring(0,line.indexOf("\n")));
