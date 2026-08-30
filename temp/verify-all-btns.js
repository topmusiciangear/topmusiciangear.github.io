const fs=require("fs");
const html=fs.readFileSync("guides/budget-usb-mics.html","utf8");

// Find shop buttons for each product by looking at the card sections
const cards=html.split("guide-product-card-title");
console.log("Product shop buttons:");
cards.slice(1).forEach((card,i)=>{
  const titleMatch=card.match(/^>([^<]+)/);
  const title=titleMatch?titleMatch[1]:"unknown";
  // Find shop-btn-primary href in this card section
  const btnMatch=card.match(/shop-btn-primary[^>]*href="([^"]+)"/);
  const url=btnMatch?btnMatch[1]:"no button";
  console.log(`  ${i+1}. ${title.substring(0,40)}: ${url.substring(0,80)}`);
});
