const fs=require("fs");
const html=fs.readFileSync("guides/budget-usb-mics.html","utf8");

// Find all button anchors with data-store
const btns=[...html.matchAll(/<a\s+data-store="([^"]+)"\s+href="([^"]+)"/g)];
console.log("Total store buttons:", btns.length);

// Group by store
const byStore={};
btns.forEach(m=>{byStore[m[1]]=(byStore[m[1]]||0)+1;});
console.log("By store:", JSON.stringify(byStore));

// Find buttons for Amazon (primary)
const amazonBtns=btns.filter(m=>m[1]==="zzounds");
console.log("\nzzounds buttons (primary):", amazonBtns.length);

// Check if there are any Amazon buttons (primary store)
const primaryBtns=[...html.matchAll(/<a\s+data-store="amazon"/g)];
console.log("Amazon primary buttons:", primaryBtns.length);
