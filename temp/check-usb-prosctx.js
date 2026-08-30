const fs=require("fs");
const html=fs.readFileSync("guides/budget-usb-mics.html","utf8");
// Find a pros-list and show surrounding context
const idx=html.indexOf("pros-list");
if(idx>-1) {
  console.log(html.substring(idx-200,idx+200));
}
