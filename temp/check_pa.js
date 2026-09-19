const fs = require("fs");
const h = fs.readFileSync("guides/best-pa-speakers.html", "utf8");
const t = (h.match(/<title>(.*?)<\/title>/) || [])[1];
const og = (h.match(/property="og:title" content="(.*?)"/) || [])[1];
const tw = (h.match(/name="twitter:title" content="(.*?)"/) || [])[1];
console.log("title:   " + t);
console.log("og:      " + og);
console.log("twitter: " + tw);
console.log("og decoded == title: " + (og.replace(/&quot;/g, '"') === t));