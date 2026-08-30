const fs=require("fs");
const build=fs.readFileSync("build-guides.js","utf8");
const idx=build.indexOf("allProductIds");
let idx2=idx;
let count=0;
while((idx2=build.indexOf("allProductIds",idx2))!==-1 && count<10) {
  const line=build.substring(0,idx2).split("\n").length;
  const context=build.substring(idx2-50, idx2+100).replace(/\n/g," ");
  console.log(`Line ${line}: ...${context}...`);
  idx2+=13;
  count++;
}
