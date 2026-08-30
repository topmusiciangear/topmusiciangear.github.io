const fs=require("fs");
let html=fs.readFileSync("index.html","utf8");
html=html.replace(
  `<div class="crawl-guides">\n\n<a href="/guides/starter-studio.html"`,
  `<div class="crawl-guides">\n<!-- CRAWLABLE_GUIDE_LINKS -->\n\n<a href="/guides/starter-studio.html"`
);
fs.writeFileSync("index.html", html);
console.log("DONE - marker added");
