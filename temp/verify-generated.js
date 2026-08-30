const fs=require("fs");
const html=fs.readFileSync("guides/budget-usb-mics.html","utf8");

// Check product IDs in the page
const productIds=[...html.matchAll(/data-product-id="(\d+)"/g)].map(m=>parseInt(m[1]));
console.log("Product IDs in page:", JSON.stringify([...new Set(productIds)]));

// Check for AT2020USB-X or Profile Streaming
if(html.includes("AT2020USB")) console.log("WARNING: AT2020USB still in page");
if(html.includes("Profile Streaming")) console.log("WARNING: Profile Streaming still in page");

// Check for Blue Yeti Nano and FIFINE T669
if(html.includes("Yeti Nano")) console.log("Blue Yeti Nano found in page");
if(html.includes("T669")) console.log("FIFINE T669 found in page");
