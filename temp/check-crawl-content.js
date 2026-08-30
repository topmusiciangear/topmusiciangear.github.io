const fs=require("fs");
let html=fs.readFileSync("index.html","utf8");
const start = html.indexOf("<div class=\"crawl-guides\">");
const end = html.indexOf("</div>", html.indexOf("<div class=\"crawl-guides\">"));
const section = html.substring(start, end + 6);
console.log("Crawl-guides section length:", section.length);
console.log("First 500 chars:", section.substring(0, 500));
