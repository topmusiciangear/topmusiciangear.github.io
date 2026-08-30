const fs=require("fs");
const html=fs.readFileSync("guides/budget-usb-mics.html","utf8");
// Find the first product section with shop buttons
const idx=html.indexOf("Samson Q2U");
if(idx===-1) {
  // Try searching for any product mention
  const sections = html.split("shop-btn");
  console.log("Number of shop-btn occurrences:", sections.length-1);
  // Look at content around section 1
  const firstBtn = html.indexOf("shop-btn-primary");
  console.log("First shop-btn at:", firstBtn);
  console.log(html.substring(Math.max(0,firstBtn-200), firstBtn+300).replace(/<[^>]+>/g,""));
}
