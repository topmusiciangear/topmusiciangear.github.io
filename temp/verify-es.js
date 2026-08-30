const fs=require("fs");
const es=fs.readFileSync("guides/budget-usb-mics_es.html","utf8");
const titleEs=es.match(/<h1[^>]*>(.*?)<\/h1>/);
console.log("Title ES:", titleEs?titleEs[1].substring(0,100):"NOT FOUND");
const verdictsEs=es.match(/verdict-product-name/g);
console.log("Verdict products ES:", verdictsEs?verdictsEs.length:0);
