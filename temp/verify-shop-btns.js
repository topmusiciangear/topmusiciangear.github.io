const fs=require("fs");
const html=fs.readFileSync("guides/budget-usb-mics.html","utf8");

// Find shop buttons for the new products
const yetinoIdx=html.indexOf("Blue Yeti Nano");
const t669Idx=html.indexOf("FIFINE T669");

// Get shop button section around Yeti Nano
const yetinoSection=html.substring(yetinoIdx, yetinoIdx+500);
const shopBtnMatch=yetinoSection.match(/shop-btn-primary[^>]*href="([^"]+)"/);
console.log("Yeti Nano primary button URL:", shopBtnMatch?shopBtnMatch[1]:"NOT FOUND");

// Get shop button section around T669
const t669Section=html.substring(t669Idx, t669Idx+500);
const t669BtnMatch=t669Section.match(/shop-btn-primary[^>]*href="([^"]+)"/);
console.log("T669 primary button URL:", t669BtnMatch?t669BtnMatch[1]:"NOT FOUND");
