const fs=require("fs");
const html=fs.readFileSync("guides/budget-usb-mics.html","utf8");
const titleMatch=html.match(/<h1[^>]*>(.*?)<\/h1>/);
console.log("Title:", titleMatch?titleMatch[1].substring(0,100):"NOT FOUND");
const pros=html.match(/pros-list/g);
console.log("Pros lists:", pros?pros.length:0);
const es=fs.readFileSync("guides/budget-usb-mics_es.html","utf8");
const titleEs=es.match(/<h1[^>]*>(.*?)<\/h1>/);
console.log("Title ES:", titleEs?titleEs[1].substring(0,100):"NOT FOUND");
