const fs=require("fs");
const build=fs.readFileSync("build-guides.js","utf8");
const lines=build.split("\n");
for(let i=695;i<702;i++) {
  console.log(`Line ${i+1}: ${lines[i]}`);
}
// Check if line 696 has the closing
console.log(`Line 696: "${lines[695]}"`);
console.log(`Line 697: "${lines[696]}"`);
