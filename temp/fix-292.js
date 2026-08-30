const fs=require("fs");
let build=fs.readFileSync("build-guides.js","utf8");

// Replace the 292 entry
const oldEntry = '292: {prices:{gear4music:"£85.30",amazon:"$103.00",zzounds:"$105.00",andertons:"£85.00",musicstore:"€109.00"}}';
const newEntry = '292: {prices:{amazon:"$103.00",zzounds:"$105.00",reverb:"$49.81",gear4music:"£89.50",andertons:"£85.00",musicstore:"€89.00"}}';

if(build.includes(oldEntry)) {
  build = build.replace(oldEntry, newEntry);
  fs.writeFileSync("build-guides.js", build, "utf8");
  console.log("Updated 292 entry");
} else {
  console.log("ERROR: old entry not found");
  // Show what's there
  const idx=build.indexOf("292:");
  console.log("Current:", build.substring(idx, idx+150).split("\n")[0]);
}
