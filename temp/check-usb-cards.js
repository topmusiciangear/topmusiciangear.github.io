const fs=require("fs");
const html=fs.readFileSync("guides/budget-usb-mics.html","utf8");

// Find all product card headers
const cardRegex=/guide-product-card[^"]*"[^>]*>[\s\S]*?<h3[^>]*>(.*?)<\/h3>/g;
let match;
const cards=[];
while((match=cardRegex.exec(html))!==null) {
  cards.push(match[1].replace(/<[^>]+>/g,"").trim());
}
console.log("Product cards found:", cards.length);
cards.forEach((c,i)=>console.log(`  ${i+1}. ${c}`));

// Check pros/cons sections
const prosRegex=/pros-list/g;
const consRegex=/cons-list/g;
let prosCount=0, consCount=0;
while(prosRegex.exec(html)) prosCount++;
while(consRegex.exec(html)) consCount++;
console.log("\nPros lists:", prosCount);
console.log("Cons lists:", consCount);
