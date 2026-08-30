const fs=require("fs");
const html=fs.readFileSync("guides/best-shotgun-mics.html","utf8");
// Find the product card for AT875R by looking for the product name in h3
const h3Regex=/<h3[^>]*>([^<]*AT875R[^<]*)<\/h3>/g;
let match;
while((match=h3Regex.exec(html))!==null) {
  const start=html.lastIndexOf("guide-product-card",match.index);
  const end=html.indexOf("</div>",match.index+500);
  const card=html.substring(start,end+10);
  // Find all img in this card
  const imgs=card.match(/<img[^>]+>/g);
  if(imgs) {
    imgs.forEach(img=>{
      const src=img.match(/src="([^"]+)"/);
      console.log("Product card image:", src?src[1]:"no src");
    });
  } else {
    console.log("No img in card. Card snippet:", card.substring(0,300));
  }
}
