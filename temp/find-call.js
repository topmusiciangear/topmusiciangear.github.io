const fs=require("fs");
const build=fs.readFileSync("build-guides.js","utf8");
// Find where shopButtonsTest is called in the build process
const idx=build.indexOf("shopButtonsTest(p, lang)");
if(idx>-1) {
  const context=build.substring(idx-100, idx+200);
  console.log("Context around shopButtonsTest call:");
  console.log(context);
}
