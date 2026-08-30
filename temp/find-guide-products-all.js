const fs=require("fs");
const build=fs.readFileSync("build-guides.js","utf8");
// Find where guide-products-grid or guide-products-cards appears in the HTML template
const allIdxs=[];
let idx=0;
while((idx=build.indexOf("guide-products", idx))!==-1) {
  allIdxs.push(idx);
  idx+=10;
}
console.log("Found guide-products at offsets:", allIdxs.length);
// Show context for each
allIdxs.forEach(i=>{
  const line=build.substring(0,i).split("\n").length;
  const context=build.substring(i,i+100).replace(/\n/g,"");
  console.log(`Line ${line}: ${context.substring(0,80)}`);
});
