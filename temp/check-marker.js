const fs=require("fs");
let html=fs.readFileSync("index.html","utf8");
// Check if marker exists
console.log("Marker exists:", html.includes("<!-- CRAWLABLE_GUIDE_LINKS -->"));
// Check the crawl-guides div
const idx = html.indexOf('<div class="crawl-guides">');
if(idx >= 0){
  console.log("crawl-guides div at:", idx);
  console.log("Next 200 chars:", html.substring(idx, idx+200));
}
