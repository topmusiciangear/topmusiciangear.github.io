const fs=require("fs");
const build=fs.readFileSync("build-guides.js","utf8");
const lines=build.split("\n");
// Show line 553 in hex
const line553=lines[552];
console.log("Line 553:", line553);
// Check for broken characters
for(let i=0;i<line553.length;i++) {
  const code=line553.charCodeAt(i);
  if(code>127) console.log(`  pos ${i}: char=${line553[i]} code=U+${code.toString(16).toUpperCase()}`);
}
