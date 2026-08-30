const fs=require("fs");
const html=fs.readFileSync("guides/budget-usb-mics.html","utf8");
// Search for product IDs in the HTML
const pidMatches = html.match(/data-product-id="(\d+)"/g);
console.log("data-product-id:", pidMatches);
// Search for any numeric references near product sections
const sections = html.split(/<section/i);
console.log("Sections:", sections.length);
// Look at section 2 (first product after intro)
if(sections.length > 2) {
  const s2 = sections[2];
  const ids2 = s2.match(/\d+/g);
  const dataIds = s2.match(/data-\w+="\d+"/g);
  console.log("Section 2 data attrs:", dataIds);
  console.log("Section 2 first 500:", s2.substring(0,500).replace(/<[^>]+>/g,"").substring(0,200));
}
