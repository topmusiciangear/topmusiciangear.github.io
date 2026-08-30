const fs=require("fs");
const build=fs.readFileSync("build-guides.js","utf8");
const idx=build.indexOf("productCards");
let idx2=idx;
let count=0;
while((idx2=build.indexOf("productCards",idx2))!==-1 && count<15) {
  const line=build.substring(0,idx2).split("\n").length;
  const context=build.substring(idx2-30, idx2+80).replace(/\n/g," ");
  console.log(`Line ${line}: ...${context}...`);
  idx2+=12;
  count++;
}
