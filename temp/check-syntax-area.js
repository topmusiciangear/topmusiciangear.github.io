const fs=require("fs");
const build=fs.readFileSync("build-guides.js","utf8");
const lines=build.split("\n");
// Check lines 548-560 for syntax issues
for(let i=547;i<560;i++) {
  const line=lines[i];
  // Count open/close braces, brackets, quotes
  const open=(line.match(/{/g)||[]).length;
  const close=(line.match(/}/g)||[]).length;
  const quotes=(line.match(/"/g)||[]).length;
  console.log(`Line ${i+1} [${open}o/${close}c/${quotes}q]: ${line.substring(0,120)}`);
}
