const fs=require("fs");
let build=fs.readFileSync("build-guides.js","utf8");

// Remove the first incorrect 300 entry (at pos 62888)
const incorrectEntry = '300: {prices:{gear4music:"£499.00",reverb:"$599.00",amazon:"$599.00",zzounds:"$599.00",andertons:"£499.00"}},';
build = build.replace(incorrectEntry, '');

fs.writeFileSync("build-guides.js", build, "utf8");
console.log("Removed incorrect 300 entry");

// Verify only one 300 remains
const re=/300:\s*\{prices:\{([^}]+)\}/g;
let m;
let count=0;
while((m=re.exec(build))!==null) {
  count++;
  console.log(`Match ${count} at pos ${m.index}: {prices:{${m[1]}}}`);
}
console.log("Total 300 entries:", count);
