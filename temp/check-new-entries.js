const fs=require("fs");
const build=fs.readFileSync("build-guides.js","utf8");
const lines=build.split("\n");
for(let i=685;i<700;i++) {
  console.log(`Line ${i+1}: ${lines[i].substring(0,120)}`);
}
