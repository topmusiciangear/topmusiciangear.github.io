const fs=require("fs");
const html=fs.readFileSync("guides/best-shotgun-mics.html","utf8");
const idx=html.indexOf("at875r_1_sq");
const context=html.substring(Math.max(0,idx-300),idx+100);
console.log("Context:", context.substring(0,400));
