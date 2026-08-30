const fs=require("fs");
const html=fs.readFileSync("guides/budget-usb-mics.html","utf8");

// Find the Blue Yeti Nano card and show the full card HTML
const yetinoIdx=html.indexOf("Blue Yeti Nano");
if(yetinoIdx>-1) {
  // Go back to find the card start
  let start=html.lastIndexOf("guide-product-card", yetinoIdx);
  if(start===-1) start=yetinoIdx-200;
  // Find card end
  let end=html.indexOf("</div>", yetinoIdx+500);
  const cardHtml=html.substring(start, end+10);
  console.log("Blue Yeti Nano card HTML (first 800 chars):");
  console.log(cardHtml.substring(0, 800));
}
