const fs=require("fs");
const p=JSON.parse(fs.readFileSync("data/products.json","utf8"));
const yetinano=p.find(x=>x.id===429);
const t669=p.find(x=>x.id===430);
console.log("Yeti Nano:", yetinano?`ID=${yetinano.id}, title=${yetinano.title}`:"NOT FOUND");
console.log("T669:", t669?`ID=${t669.id}, title=${t669.title}`:"NOT FOUND");

// Check if they're in the generated HTML
const html=fs.readFileSync("guides/budget-usb-mics.html","utf8");
const yetinoCard=html.indexOf("Blue Yeti Nano");
const t669Card=html.indexOf("FIFINE T669");
console.log("Yeti Nano card at:", yetinoCard);
console.log("T669 card at:", t669Card);

// Check shop button area for Yeti Nano
if(yetinoCard>-1) {
  const section=html.substring(yetinoCard, yetinoCard+1000);
  const hasShopBtn=section.includes("shop-btn-primary");
  console.log("Yeti Nano has shop-btn-primary:", hasShopBtn);
  // Find the first href after the card
  const hrefMatch=section.match(/href="([^"]+)"/);
  console.log("First href in section:", hrefMatch?hrefMatch[1]:"none");
}
