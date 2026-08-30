const fs=require("fs");
const build=fs.readFileSync("build-guides.js","utf8");
// Search for where AT2020USB-X (291) or Profile Streaming Set (299) are referenced
const re=/\b291\b|\b299\b/g;
let m;
while((m=re.exec(build))!==null) {
  const context=build.substring(Math.max(0,m.index-50), Math.min(build.length, m.index+50));
  if(!context.includes("test") && !context.includes("Test")) {
    console.log(`Line ~${build.substring(0,m.index).split("\n").length}: ${context.replace(/\n/g,"").substring(0,100)}`);
  }
}
