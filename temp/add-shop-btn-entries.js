const fs=require("fs");
let build=fs.readFileSync("build-guides.js","utf8");

// Find the last entry before the closing of TEST_SHOP_BTN
// Add new entries for IDs 431-438
const newEntries = `
  431: {prices:{amazon:"$63.99",gear4music:"£92.80",andertons:"£79.00",reverb:"$105.00"}},
  432: {prices:{amazon:"$99.99"}},
  433: {prices:{amazon:"$143.39",zzounds:"$149.99",reverb:"$149.99"}},
  434: {prices:{amazon:"$79.99",reverb:"$80.00",gear4music:"£95.00",andertons:"£99.00"}},
  435: {prices:{amazon:"$39.90",gear4music:"£26.70",reverb:"$35.00"}},
  436: {prices:{amazon:"$49.99"}},
  437: {prices:{amazon:"$37.99"}},
  438: {prices:{amazon:"$79.99",reverb:"$40.00",gear4music:"£50.00",andertons:"£69.00"}},`;

// Insert before the last entry closing
// Find "428:" entry and add after it
const insertAfter = build.lastIndexOf("428:");
if (insertAfter > -1) {
  // Find the end of the 428 entry line
  const lineEnd = build.indexOf("\n", insertAfter);
  build = build.slice(0, lineEnd + 1) + newEntries + build.slice(lineEnd + 1);
  fs.writeFileSync("build-guides.js", build, "utf8");
  console.log("Added TEST_SHOP_BTN entries for 431-438");
} else {
  console.log("ERROR: Could not find insertion point");
}
