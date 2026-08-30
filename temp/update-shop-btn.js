const fs=require("fs");
let build=fs.readFileSync("build-guides.js","utf8");

// 1. Update Razer Seiren V3 Mini (280): $60 -> $41
build=build.replace(/280:\s*\{prices:\{[^}]+\}/, '280: {prices:{amazon:"$41.00",zzounds:"$39.99",reverb:"$39.99",gear4music:"£36.00",andertons:"£36.00",musicstore:"€39.00"}}');
console.log("Updated Razer Seiren V3 Mini (280) price");

// 2. Update HyperX SoloCast 2 (281): $60 -> $45
build=build.replace(/281:\s*\{prices:\{[^}]+\}/, '281: {prices:{amazon:"$45.00",zzounds:"$44.99",reverb:"$44.99",gear4music:"£39.00",andertons:"£39.00",musicstore:"€42.00"}}');
console.log("Updated HyperX SoloCast 2 (281) price");

// 3. Update TONOR TC-777 (287): $35 -> $20
build=build.replace(/287:\s*\{prices:\{[^}]+\}/, '287: {prices:{amazon:"$19.99",zzounds:"$19.99",reverb:"$19.99",gear4music:"£17.00",andertons:"£17.00",musicstore:"€19.00"}}');
console.log("Updated TONOR TC-777 (287) price");

// 4. Add Blue Yeti Nano (300)
const yetiEntry = '\n  300: {prices:{amazon:"$75.99",zzounds:"$79.99",reverb:"$75.99",gear4music:"£69.00",andertons:"£69.00",musicstore:"€75.00"}},';
const lastEntry = build.lastIndexOf('};');
build = build.slice(0, lastEntry) + yetiEntry + '\n' + build.slice(lastEntry);
console.log("Added Blue Yeti Nano (300) to TEST_SHOP_BTN");

// 5. Add FIFINE T669 (301)
const t669Entry = '\n  301: {prices:{amazon:"$39.99",zzounds:"$39.99",reverb:"$39.99",gear4music:"£35.00",andertons:"£35.00",musicstore:"€38.00"}},';
build = build.replace(yetiEntry, yetiEntry + t669Entry);
console.log("Added FIFINE T669 (301) to TEST_SHOP_BTN");

fs.writeFileSync("build-guides.js", build, "utf8");
console.log("build-guides.js updated");
