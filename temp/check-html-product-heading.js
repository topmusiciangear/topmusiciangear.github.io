const fs=require("fs");
const html=fs.readFileSync("guides/budget-usb-mics.html","utf8");
// Find the actual product sections
const matches = html.match(/data-id="(\d+)"/g);
console.log("data-id:", matches);
// Find product-card or product sections
const prodCard = html.match(/product-card/g);
console.log("product-card:", prodCard ? prodCard.length : 0);
// Find where shop buttons appear relative to products
const shopBtnPositions = [];
let pos = 0;
while((pos = html.indexOf("shop-btn-primary", pos)) !== -1) {
  shopBtnPositions.push(pos);
  pos += 20;
}
console.log("shop-btn-primary positions:", shopBtnPositions.length);
// Get the text before each shop button to identify the product
shopBtnPositions.forEach((p, i) => {
  const preceding = html.substring(Math.max(0, p-2000), p);
  const prodName = preceding.match(/<h[23][^>]*>([^<]+)<\/h[23]>/g);
  if(prodName) {
    const lastH = prodName[prodName.length-1];
    console.log(`Btn ${i}: near heading "${lastH.replace(/<[^>]+>/g, '')}"`);
  }
});
