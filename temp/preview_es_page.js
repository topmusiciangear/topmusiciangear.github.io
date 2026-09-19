const fs = require("fs");
const h = fs.readFileSync("guides/wireless-intercom-systems_es.html", "utf8");
const text = h.replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").trim();
console.log("TEXTO:"); 
console.log(text.slice(0, 3500));