const fs=require("fs");
const build=fs.readFileSync("build-guides.js","utf8");
const idx=build.indexOf("const TEST_SHOP_BTN");
const section=build.substring(idx, idx+5000);
// Search for each USB mic ID
const ids=["276","277","278","279","280","281","284","287","289","290","292"];
ids.forEach(id=>{
  const re=new RegExp(`^\\s*${id}:`, "m");
  const match=section.match(re);
  if(match) {
    const start=section.indexOf(match[0]);
    console.log(`${id}: FOUND at offset ${start}`);
    console.log(`  ${section.substring(start, start+120).replace(/\n/g,"")}`);
  } else {
    console.log(`${id}: NOT FOUND`);
  }
});
