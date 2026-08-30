const fs=require("fs");
const build=fs.readFileSync("build-guides.js","utf8");
const re=/300:\s*\{prices:\{([^}]+)\}/g;
let m;
let count=0;
while((m=re.exec(build))!==null) {
  count++;
  console.log(`Match ${count} at pos ${m.index}: {prices:{${m[1]}}}`);
}
if(count===0) console.log("No matches found");
