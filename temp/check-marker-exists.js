const fs=require("fs");
let html=fs.readFileSync("index.html","utf8");
console.log("Marker exists:", html.includes("<!-- CRAWLABLE_GUIDE_LINKS -->"));
console.log("crawl-guides div exists:", html.includes("<div class=\"crawl-guides\">"));
