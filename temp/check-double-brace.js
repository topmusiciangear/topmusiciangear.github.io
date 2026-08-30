const fs=require("fs");
const build=fs.readFileSync("build-guides.js","utf8");
const lines=build.split("\n");
// Check for double }} before ,oos
for(let i=547;i<600;i++) {
  const line=lines[i];
  if(line.includes("}},oos:")) {
    console.log(`Line ${i+1}: ${line.substring(0,100)}`);
  }
}
