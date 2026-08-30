const fs=require("fs");
const sb=fs.readFileSync("js/shop-buttons.js","utf8");
const ids=["276","277","278","279","280","281","284","287","289","290","292"];
ids.forEach(id=>{
  const re=new RegExp(`"${id}":\\s*\\{([^}]{0,200})`);
  const m=sb.match(re);
  if(m) {
    console.log(`${id}: ${m[0].substring(0,150)}`);
  } else {
    console.log(`${id}: NOT FOUND`);
  }
});
