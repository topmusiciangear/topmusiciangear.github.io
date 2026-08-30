const fs=require("fs");
const html=fs.readFileSync("guides/budget-usb-mics_es.html","utf8");

// Check for AT2020USB-X or Profile Streaming
if(html.includes("AT2020USB")) console.log("WARNING: AT2020USB still in ES page");
if(html.includes("Profile Streaming")) console.log("WARNING: Profile Streaming still in ES page");

// Check for Blue Yeti Nano and FIFINE T669
if(html.includes("Yeti Nano")) console.log("Blue Yeti Nano found in ES page");
if(html.includes("T669")) console.log("FIFINE T669 found in ES page");

// Count product cards
const titles=[...html.matchAll(/guide-product-card-title">([^<]+)</g)];
console.log("ES product cards:", titles.length);
