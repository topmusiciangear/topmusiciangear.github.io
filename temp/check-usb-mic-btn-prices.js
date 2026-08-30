const fs=require("fs");
const build=fs.readFileSync("build-guides.js","utf8");
const btnStart=build.indexOf("TEST_SHOP_BTN");
const btnSection=build.substring(btnStart, btnStart+50000);
const ids=["276","277","281","278","279","280","289","292","290","287","284"];
ids.forEach(id=>{
  const re=new RegExp(`"${id}":\\s*\\{([^}]+)\\}`);
  const m=btnSection.match(re);
  if(m){
    const block=m[1];
    const priceMatch=block.match(/price:\s*"?(\$?\d[\d,.]*)"?/);
    const imgMatch=block.match(/img:\s*"([^"]+)"/);
    console.log(`${id}: price=${priceMatch?priceMatch[1]:"MISSING"} img=${imgMatch?"ok":"MISSING"}`);
    // Get all prices for this id
    const allPrices=[...block.matchAll(/price:\s*"?(\$?\d[\d,.]*)"?/g)];
    if(allPrices.length>1) console.log(`  All prices: ${allPrices.map(p=>p[1]).join(", ")}`);
  } else {
    console.log(`${id}: NOT IN TEST_SHOP_BTN`);
  }
});
