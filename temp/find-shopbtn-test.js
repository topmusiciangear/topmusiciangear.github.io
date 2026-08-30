const fs=require("fs");
const build=fs.readFileSync("build-guides.js","utf8");
// Find the shopButtonsTest function
const idx=build.indexOf("function shopButtonsTest");
if(idx>-1) {
  const context=build.substring(idx, idx+200);
  console.log(context);
}
