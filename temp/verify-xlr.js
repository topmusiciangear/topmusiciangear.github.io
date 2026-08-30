const fs=require("fs");
const html=fs.readFileSync("guides/budget-mics.html","utf8");

const removed=["AT2020USB-X","TC-777","PM461","NT-USB Mini","PodMic USB","XCM-50","NT1 5th Gen","Procaster"];
removed.forEach(name=>{
  if(html.includes(name)) console.log("STILL FOUND:", name);
  else console.log("OK removed:", name);
});

const btns=html.match(/shop-btn-primary/g);
console.log("\nShop buttons:", btns?btns.length:0);

const newProds=["sE Electronics V7","Elgato Wave DX","Samson Q9U","AKG P120","Behringer B 906","MAONO PD100","FIFINE K669D","Samson C01"];
newProds.forEach(name=>{
  if(html.includes(name)) console.log("OK found:", name);
  else console.log("MISSING:", name);
});
