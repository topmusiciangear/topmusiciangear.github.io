const fs=require("fs");
const build=fs.readFileSync("build-guides.js","utf8");
const ids=["280","281","287","300","301"];
ids.forEach(id=>{
  const re=new RegExp(id+":\\s*\\{prices:\\{([^}]+)\\}");
  const m=build.match(re);
  if(m) console.log(`${id}: {prices:{${m[1]}}}`);
  else console.log(`${id}: NOT FOUND`);
});
